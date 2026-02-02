"""
OCR Service for Lab Test Analysis using EasyOCR
Extracts text from lab test images and analyzes medical values
"""

import easyocr
import re
import numpy as np
from PIL import Image
import io
from typing import Dict, List, Tuple
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class OCRService:
    """Service for analyzing lab test documents using OCR"""
    
    def __init__(self):
        """Initialize the OCR service with EasyOCR"""
        try:
            # Initialize EasyOCR reader with English language
            self.reader = easyocr.Reader(['en'], gpu=False)  # Set gpu=True if CUDA is available
            logger.info("EasyOCR initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing EasyOCR: {str(e)}")
            raise
        
        # Define normal ranges for common cardiovascular tests
        self.normal_ranges = {
            'cholesterol': {
                'total': (0, 200),      # mg/dL
                'ldl': (0, 100),        # mg/dL
                'hdl': (40, 1000),      # mg/dL (higher is better)
                'triglycerides': (0, 150)  # mg/dL
            },
            'blood_pressure': {
                'systolic': (90, 120),   # mmHg
                'diastolic': (60, 80)    # mmHg
            },
            'blood_sugar': {
                'fasting': (70, 100),    # mg/dL
                'random': (70, 140)      # mg/dL
            },
            'heart_rate': (60, 100),     # bpm
            'hemoglobin': {
                'male': (13.5, 17.5),    # g/dL
                'female': (12.0, 15.5)   # g/dL
            }
        }
    
    async def analyze_lab_test(self, image_bytes: bytes, filename: str) -> Dict:
        """
        Analyze lab test image using OCR
        
        Args:
            image_bytes: Image file bytes
            filename: Name of the file
            
        Returns:
            Dictionary containing extracted text, parsed values, and recommendations
        """
        try:
            # Load image
            image = Image.open(io.BytesIO(image_bytes))
            
            # Convert to RGB if necessary
            if image.mode != 'RGB':
                image = image.convert('RGB')
            
            # Convert to numpy array for EasyOCR
            image_np = np.array(image)
            
            # Perform OCR
            logger.info(f"Performing OCR on {filename}")
            ocr_results = self.reader.readtext(image_np)
            
            # Extract text
            extracted_text = [text[1] for text in ocr_results]
            full_text = "\n".join(extracted_text)
            
            # Parse medical values
            parsed_values = self._parse_medical_values(full_text)
            
            # Analyze values and generate recommendations
            analysis = self._analyze_values(parsed_values)
            
            result = {
                "filename": filename,
                "extracted_text": full_text,
                "parsed_values": parsed_values,
                "analysis": analysis,
                "risk_factors": analysis.get("risk_factors", []),
                "risk_level": analysis.get("risk_level", "low"),
                "recommendations": self._generate_lab_recommendations(analysis),
                "confidence": self._calculate_ocr_confidence(ocr_results)
            }
            
            logger.info(f"Lab test analyzed: {filename}")
            
            return result
            
        except Exception as e:
            logger.error(f"Error analyzing lab test: {str(e)}")
            raise
    
    def _parse_medical_values(self, text: str) -> Dict:
        """
        Parse medical values from extracted text
        
        Args:
            text: Extracted text from OCR
            
        Returns:
            Dictionary of parsed medical values
        """
        values = {}
        
        # Normalize text
        text_lower = text.lower()
        
        # Parse cholesterol values
        cholesterol_patterns = {
            'total_cholesterol': r'total\s*cholesterol[:\s]*(\d+\.?\d*)',
            'ldl': r'ldl[:\s]*(\d+\.?\d*)',
            'hdl': r'hdl[:\s]*(\d+\.?\d*)',
            'triglycerides': r'triglyceride[s]?[:\s]*(\d+\.?\d*)'
        }
        
        for key, pattern in cholesterol_patterns.items():
            match = re.search(pattern, text_lower)
            if match:
                try:
                    values[key] = float(match.group(1))
                except ValueError:
                    pass
        
        # Parse blood pressure
        bp_pattern = r'(\d{2,3})\s*/\s*(\d{2,3})'
        bp_match = re.search(bp_pattern, text)
        if bp_match:
            values['blood_pressure'] = {
                'systolic': int(bp_match.group(1)),
                'diastolic': int(bp_match.group(2))
            }
        
        # Parse blood sugar
        sugar_patterns = {
            'fasting_glucose': r'fasting\s*glucose[:\s]*(\d+\.?\d*)',
            'blood_sugar': r'blood\s*sugar[:\s]*(\d+\.?\d*)',
            'glucose': r'glucose[:\s]*(\d+\.?\d*)'
        }
        
        for key, pattern in sugar_patterns.items():
            match = re.search(pattern, text_lower)
            if match:
                try:
                    values['blood_sugar'] = float(match.group(1))
                    break
                except ValueError:
                    pass
        
        # Parse heart rate
        hr_pattern = r'heart\s*rate[:\s]*(\d+\.?\d*)'
        hr_match = re.search(hr_pattern, text_lower)
        if hr_match:
            try:
                values['heart_rate'] = float(hr_match.group(1))
            except ValueError:
                pass
        
        # Parse hemoglobin
        hb_pattern = r'hemoglobin[:\s]*(\d+\.?\d*)'
        hb_match = re.search(hb_pattern, text_lower)
        if hb_match:
            try:
                values['hemoglobin'] = float(hb_match.group(1))
            except ValueError:
                pass
        
        return values
    
    def _analyze_values(self, values: Dict) -> Dict:
        """
        Analyze parsed medical values
        
        Args:
            values: Dictionary of parsed medical values
            
        Returns:
            Analysis results with risk factors and recommendations
        """
        analysis = {
            "normal": [],
            "abnormal": [],
            "risk_factors": [],
            "risk_level": "low"
        }
        
        # Analyze cholesterol
        if 'total_cholesterol' in values:
            cholesterol = values['total_cholesterol']
            if cholesterol <= self.normal_ranges['cholesterol']['total'][1]:
                analysis['normal'].append(f"Total Cholesterol: {cholesterol} mg/dL (Normal)")
            elif cholesterol <= 239:
                analysis['abnormal'].append(f"Total Cholesterol: {cholesterol} mg/dL (Borderline High)")
                analysis['risk_factors'].append("Borderline high cholesterol")
                analysis['risk_level'] = "medium"
            else:
                analysis['abnormal'].append(f"Total Cholesterol: {cholesterol} mg/dL (High)")
                analysis['risk_factors'].append("High cholesterol")
                analysis['risk_level'] = "high"
        
        # Analyze LDL
        if 'ldl' in values:
            ldl = values['ldl']
            if ldl <= self.normal_ranges['cholesterol']['ldl'][1]:
                analysis['normal'].append(f"LDL: {ldl} mg/dL (Normal)")
            elif ldl <= 129:
                analysis['abnormal'].append(f"LDL: {ldl} mg/dL (Near Optimal)")
                analysis['risk_factors'].append("Near optimal LDL")
                if analysis['risk_level'] == "low":
                    analysis['risk_level'] = "medium"
            else:
                analysis['abnormal'].append(f"LDL: {ldl} mg/dL (High)")
                analysis['risk_factors'].append("High LDL cholesterol")
                analysis['risk_level'] = "high"
        
        # Analyze HDL
        if 'hdl' in values:
            hdl = values['hdl']
            if hdl >= self.normal_ranges['cholesterol']['hdl'][0]:
                analysis['normal'].append(f"HDL: {hdl} mg/dL (Normal)")
            else:
                analysis['abnormal'].append(f"HDL: {hdl} mg/dL (Low)")
                analysis['risk_factors'].append("Low HDL cholesterol (protective factor)")
                if analysis['risk_level'] == "low":
                    analysis['risk_level'] = "medium"
        
        # Analyze blood pressure
        if 'blood_pressure' in values:
            bp = values['blood_pressure']
            systolic = bp['systolic']
            diastolic = bp['diastolic']
            
            if (systolic <= self.normal_ranges['blood_pressure']['systolic'][1] and 
                diastolic <= self.normal_ranges['blood_pressure']['diastolic'][1]):
                analysis['normal'].append(f"Blood Pressure: {systolic}/{diastolic} mmHg (Normal)")
            elif systolic <= 129 and diastolic < 80:
                analysis['abnormal'].append(f"Blood Pressure: {systolic}/{diastolic} mmHg (Elevated)")
                analysis['risk_factors'].append("Elevated blood pressure")
                if analysis['risk_level'] == "low":
                    analysis['risk_level'] = "medium"
            elif systolic <= 139 or diastolic <= 89:
                analysis['abnormal'].append(f"Blood Pressure: {systolic}/{diastolic} mmHg (Stage 1 Hypertension)")
                analysis['risk_factors'].append("Stage 1 Hypertension")
                analysis['risk_level'] = "high"
            else:
                analysis['abnormal'].append(f"Blood Pressure: {systolic}/{diastolic} mmHg (Stage 2 Hypertension)")
                analysis['risk_factors'].append("Stage 2 Hypertension")
                analysis['risk_level'] = "high"
        
        # Analyze blood sugar
        if 'blood_sugar' in values:
            sugar = values['blood_sugar']
            if sugar <= self.normal_ranges['blood_sugar']['fasting'][1]:
                analysis['normal'].append(f"Blood Sugar: {sugar} mg/dL (Normal)")
            elif sugar <= 125:
                analysis['abnormal'].append(f"Blood Sugar: {sugar} mg/dL (Prediabetes)")
                analysis['risk_factors'].append("Prediabetes")
                if analysis['risk_level'] == "low":
                    analysis['risk_level'] = "medium"
            else:
                analysis['abnormal'].append(f"Blood Sugar: {sugar} mg/dL (Diabetes)")
                analysis['risk_factors'].append("Diabetes")
                analysis['risk_level'] = "high"
        
        # Analyze heart rate
        if 'heart_rate' in values:
            hr = values['heart_rate']
            min_hr, max_hr = self.normal_ranges['heart_rate']
            if min_hr <= hr <= max_hr:
                analysis['normal'].append(f"Heart Rate: {hr} bpm (Normal)")
            elif hr < min_hr:
                analysis['abnormal'].append(f"Heart Rate: {hr} bpm (Low)")
                analysis['risk_factors'].append("Bradycardia (low heart rate)")
                if analysis['risk_level'] == "low":
                    analysis['risk_level'] = "medium"
            else:
                analysis['abnormal'].append(f"Heart Rate: {hr} bpm (High)")
                analysis['risk_factors'].append("Tachycardia (high heart rate)")
                if analysis['risk_level'] == "low":
                    analysis['risk_level'] = "medium"
        
        return analysis
    
    def _generate_lab_recommendations(self, analysis: Dict) -> List[str]:
        """
        Generate recommendations based on lab test analysis
        
        Args:
            analysis: Analysis results
            
        Returns:
            List of recommendation strings
        """
        recommendations = []
        risk_level = analysis.get('risk_level', 'low')
        risk_factors = analysis.get('risk_factors', [])
        
        if risk_level == "high":
            recommendations.extend([
                "🚨 High-risk factors detected in lab tests",
                "🏥 Immediate medical consultation is strongly recommended",
                "💊 Follow your doctor's prescribed treatment plan",
                "📊 Regular monitoring of key health metrics is essential"
            ])
        elif risk_level == "medium":
            recommendations.extend([
                "⚠️ Some risk factors detected",
                "👨‍⚕️ Schedule a follow-up appointment with your doctor",
                "📈 Monitor your health metrics regularly"
            ])
        else:
            recommendations.extend([
                "✅ Lab values are within normal ranges",
                "💚 Continue maintaining healthy lifestyle habits"
            ])
        
        # Specific recommendations based on risk factors
        if "High cholesterol" in risk_factors or "Borderline high cholesterol" in risk_factors:
            recommendations.extend([
                "🥗 Follow a low-cholesterol diet (reduce saturated fats)",
                "🏃 Increase physical activity (30-60 minutes daily)",
                "🥑 Include healthy fats (omega-3, nuts, avocados)"
            ])
        
        if "Hypertension" in str(risk_factors) or "Elevated blood pressure" in risk_factors:
            recommendations.extend([
                "🧂 Reduce sodium intake (less than 2,300 mg daily)",
                "😌 Practice stress management techniques",
                "⚖️ Maintain healthy body weight",
                "🚭 Quit smoking if applicable"
            ])
        
        if "Diabetes" in risk_factors or "Prediabetes" in risk_factors:
            recommendations.extend([
                "🍎 Monitor carbohydrate intake",
                "🏋️ Regular exercise helps control blood sugar",
                "⚖️ Maintain healthy body weight",
                "📊 Regular blood sugar monitoring"
            ])
        
        # General cardiovascular health recommendations
        recommendations.extend([
            "🥗 Eat a balanced diet rich in fruits, vegetables, and whole grains",
            "💧 Stay well hydrated (8 glasses of water daily)",
            "😴 Get adequate sleep (7-9 hours nightly)",
            "📅 Schedule regular health check-ups"
        ])
        
        return recommendations
    
    def _calculate_ocr_confidence(self, ocr_results: List) -> float:
        """
        Calculate average confidence score from OCR results
        
        Args:
            ocr_results: OCR results from EasyOCR
            
        Returns:
            Average confidence score
        """
        if not ocr_results:
            return 0.0
        
        confidence_scores = [result[2] for result in ocr_results]
        return round(sum(confidence_scores) / len(confidence_scores), 4)
