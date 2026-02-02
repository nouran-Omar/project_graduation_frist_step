"""
X-ray Analysis Service using DenseNet121
Analyzes chest X-ray images for heart disease detection
"""

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import io
import numpy as np
from typing import Dict, List
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class XRayService:
    """Service for analyzing chest X-ray images"""
    
    def __init__(self):
        """Initialize the X-ray analysis service with DenseNet121 model"""
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        logger.info(f"Using device: {self.device}")
        
        # Load pre-trained DenseNet121 model
        self.model = self._load_model()
        self.model.eval()
        
        # Define image preprocessing transforms
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.Grayscale(num_output_channels=3),  # Convert grayscale to 3-channel
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        
        # Class labels for predictions
        self.class_labels = ["normal", "abnormal"]
        
    def _load_model(self) -> nn.Module:
        """
        Load and configure DenseNet121 model
        
        Returns:
            Configured PyTorch model
        """
        try:
            # Load pre-trained DenseNet121
            model = models.densenet121(weights=models.DenseNet121_Weights.DEFAULT)
            
            # Modify the classifier for binary classification
            num_features = model.classifier.in_features
            model.classifier = nn.Sequential(
                nn.Linear(num_features, 512),
                nn.ReLU(),
                nn.Dropout(0.3),
                nn.Linear(512, 2)  # Binary classification: normal vs abnormal
            )
            
            model = model.to(self.device)
            logger.info("DenseNet121 model loaded successfully")
            
            return model
            
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise
    
    async def analyze_xray(self, image_bytes: bytes, filename: str) -> Dict:
        """
        Analyze chest X-ray image
        
        Args:
            image_bytes: Image file bytes
            filename: Name of the file
            
        Returns:
            Dictionary containing prediction, confidence, and recommendations
        """
        try:
            # Load and preprocess image
            image = Image.open(io.BytesIO(image_bytes))
            
            # Convert RGBA to RGB if necessary
            if image.mode == 'RGBA':
                image = image.convert('RGB')
            
            # Preprocess image
            input_tensor = self.transform(image).unsqueeze(0).to(self.device)
            
            # Make prediction
            with torch.no_grad():
                outputs = self.model(input_tensor)
                probabilities = torch.nn.functional.softmax(outputs, dim=1)
                confidence, predicted = torch.max(probabilities, 1)
                
            # Get prediction results
            prediction_label = self.class_labels[predicted.item()]
            confidence_score = confidence.item()
            
            # Generate detailed results
            result = {
                "filename": filename,
                "prediction": prediction_label,
                "confidence": round(confidence_score, 4),
                "probabilities": {
                    "normal": round(probabilities[0][0].item(), 4),
                    "abnormal": round(probabilities[0][1].item(), 4)
                },
                "recommendations": self._generate_xray_recommendations(
                    prediction_label, 
                    confidence_score
                ),
                "risk_level": self._determine_risk_level(prediction_label, confidence_score)
            }
            
            logger.info(f"X-ray analyzed: {filename} - {prediction_label} ({confidence_score:.2%})")
            
            return result
            
        except Exception as e:
            logger.error(f"Error analyzing X-ray: {str(e)}")
            raise
    
    def _determine_risk_level(self, prediction: str, confidence: float) -> str:
        """
        Determine risk level based on prediction and confidence
        
        Args:
            prediction: Prediction label (normal/abnormal)
            confidence: Confidence score
            
        Returns:
            Risk level string
        """
        if prediction == "abnormal":
            if confidence > 0.85:
                return "high"
            elif confidence > 0.65:
                return "medium"
            else:
                return "low"
        else:
            return "low"
    
    def _generate_xray_recommendations(self, prediction: str, confidence: float) -> List[str]:
        """
        Generate recommendations based on X-ray analysis
        
        Args:
            prediction: Prediction label
            confidence: Confidence score
            
        Returns:
            List of recommendation strings
        """
        recommendations = []
        
        if prediction == "abnormal":
            if confidence > 0.85:
                recommendations.extend([
                    "⚠️ Abnormalities detected in chest X-ray with high confidence",
                    "🏥 Immediate consultation with a cardiologist is strongly recommended",
                    "📋 Additional tests (ECG, Echo) may be required",
                    "💊 Follow prescribed medication if any",
                    "🚭 Avoid smoking and maintain a healthy lifestyle"
                ])
            elif confidence > 0.65:
                recommendations.extend([
                    "⚠️ Possible abnormalities detected in chest X-ray",
                    "👨‍⚕️ Schedule an appointment with your doctor for further evaluation",
                    "📊 Additional imaging tests may be recommended",
                    "💪 Maintain regular exercise and healthy diet",
                    "📝 Monitor any symptoms and report to your doctor"
                ])
            else:
                recommendations.extend([
                    "ℹ️ Minor concerns detected in chest X-ray",
                    "👨‍⚕️ Routine follow-up with your doctor is advised",
                    "🏃 Continue regular physical activity",
                    "🥗 Maintain a heart-healthy diet",
                    "😌 Manage stress levels effectively"
                ])
        else:
            recommendations.extend([
                "✅ Chest X-ray appears normal",
                "💚 Continue maintaining healthy lifestyle habits",
                "🏃 Regular exercise (at least 30 minutes daily)",
                "🥗 Balanced diet rich in fruits and vegetables",
                "📅 Schedule routine check-ups as recommended by your doctor",
                "🚭 Avoid smoking and limit alcohol consumption"
            ])
        
        return recommendations
