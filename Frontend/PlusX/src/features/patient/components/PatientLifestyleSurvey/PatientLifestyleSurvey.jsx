import React, { useState } from 'react';
import styles from './PatientLifestyleSurvey.module.css';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { MdOutlineBloodtype, MdOutlineFavorite } from 'react-icons/md';
import { LuMoonStar, LuBeer, LuActivity } from 'react-icons/lu';
import { FaSmoking, FaUsers } from 'react-icons/fa';
import PatientAIAlert from '../HeartRisk/PatientAIAlert';
import PatientNextStep from '../PatientNextStep/PatientNextStep';

const PatientLifestyleSurvey = () => {
  // 1. الأكشن: إدارة حالة الإجابات (Actions/State)
  const [formData, setFormData] = useState({
    cholesterol: '',
    sleepHours: '',
    smoking: '',
    alcohol: '',
    activity: '',
    prevIssues: '',
    familyHistory: ''
  });

  const [showResults, setShowResults] = useState(false);

  // 2. الأكشن: تحديث الإجابات عند الضغط
  const handleSelect = (question, value) => {
    setFormData(prev => ({ ...prev, [question]: value }));
  };

  // 3. الأكشن: إرسال البيانات (Submit Action)
  const handleSubmit = () => {
    console.log("Data to be sent to Backend:", formData);
    // هنا الباك إند هيستلم الـ Object ده
    setShowResults(true);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.surveyCard}>
        
        {/* Header */}
        <div className={styles.header}>
          <HiOutlineClipboardDocumentList className={styles.headerIcon} />
          <h2 className={styles.title}>Health Lifestyle Survey</h2>
        </div>
        <p className={styles.subtitle}>Answer these quick questions about your daily habits to help our AI analyze your heart health baseline.</p>

        <div className={styles.questionsGrid}>
          
          {/* Q1: Cholesterol Level */}
          <div className={styles.questionSection}>
            <div className={styles.labelRow}><MdOutlineBloodtype className="text-red-500" /> Cholesterol Level</div>
            <p className={styles.questionText}>Select your latest cholesterol level:</p>
            <div className={styles.optionsRow}>
              {['Normal (<200 mg/dL)', 'Borderline (200–239 mg/dL)', 'High (≥240 mg/dL)'].map(opt => (
                <button 
                  key={opt}
                  className={`${styles.optionBtn} ${formData.cholesterol === opt ? styles.active : ''}`}
                  onClick={() => handleSelect('cholesterol', opt)}
                >
                  <span className={styles.dot}></span> {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Q2 & Q3: Sleep & Smoking (Row) */}
          <div className={styles.flexRow}>
            <div className={styles.questionSection}>
              <div className={styles.labelRow}><LuMoonStar className="text-purple-600" /> Sleep Hours Per Day</div>
              <p className={styles.questionText}>How many hours do you sleep per day?</p>
              <div className={styles.optionsRow}>
                {['Less than 6 hours', '6–8 hours', 'More than 8 hours'].map(opt => (
                  <button key={opt} className={`${styles.optionBtn} ${formData.sleepHours === opt ? styles.active : ''}`} onClick={() => handleSelect('sleepHours', opt)}><span className={styles.dot}></span> {opt}</button>
                ))}
              </div>
            </div>
            <div className={styles.questionSection}>
              <div className={styles.labelRow}><FaSmoking className="text-gray-500" /> Smoking</div>
              <p className={styles.questionText}>Do you smoke?</p>
              <div className={styles.optionsRow}>
                {['Yes', 'No'].map(opt => (
                  <button key={opt} className={`${styles.optionBtn} ${formData.smoking === opt ? styles.active : ''}`} onClick={() => handleSelect('smoking', opt)}><span className={styles.dot}></span> {opt}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Q4 & Q5: Alcohol & Activity (Row) */}
          <div className={styles.flexRow}>
            <div className={styles.questionSection}>
              <div className={styles.labelRow}><LuBeer className="text-blue-400" /> Alcohol Consumption</div>
              <p className={styles.questionText}>How often do you drink alcohol?</p>
              <div className={styles.optionsRow}>
                {['Low', 'Medium', 'High'].map(opt => (
                  <button key={opt} className={`${styles.optionBtn} ${formData.alcohol === opt ? styles.active : ''}`} onClick={() => handleSelect('alcohol', opt)}><span className={styles.dot}></span> {opt}</button>
                ))}
              </div>
            </div>
            <div className={styles.questionSection}>
              <div className={styles.labelRow}><LuActivity className="text-teal-500" /> Physical Activity</div>
              <p className={styles.questionText}>How active are you during the week?</p>
              <div className={styles.optionsRow}>
                {['Low', 'Medium', 'High'].map(opt => (
                  <button key={opt} className={`${styles.optionBtn} ${formData.activity === opt ? styles.active : ''}`} onClick={() => handleSelect('activity', opt)}><span className={styles.dot}></span> {opt}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Q6 & Q7: Heart Issues & Family History (Row) */}
          <div className={styles.flexRow}>
            <div className={styles.questionSection}>
              <div className={styles.labelRow}><MdOutlineFavorite className="text-red-600" /> Previous Heart Issues</div>
              <p className={styles.questionText}>Have you ever had any heart-related issues before?</p>
              <div className={styles.optionsRow}>
                {['Yes', 'No'].map(opt => (
                  <button key={opt} className={`${styles.optionBtn} ${formData.prevIssues === opt ? styles.active : ''}`} onClick={() => handleSelect('prevIssues', opt)}><span className={styles.dot}></span> {opt}</button>
                ))}
              </div>
            </div>
            <div className={styles.questionSection}>
              <div className={styles.labelRow}><FaUsers className="text-stone-600" /> Family History</div>
              <p className={styles.questionText}>Has anyone in your family had heart-related diseases?</p>
              <div className={styles.optionsRow}>
                {['Yes', 'No'].map(opt => (
                  <button key={opt} className={`${styles.optionBtn} ${formData.familyHistory === opt ? styles.active : ''}`} onClick={() => handleSelect('familyHistory', opt)}><span className={styles.dot}></span> {opt}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <button className={styles.submitBtn} onClick={handleSubmit}>View Results</button>
          </div>
        </div>

        {/* Results Sections */}
        {showResults && (
          <div className="mt-16 space-y-12 fade-in">
            <PatientAIAlert />
            <PatientNextStep />
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientLifestyleSurvey;
