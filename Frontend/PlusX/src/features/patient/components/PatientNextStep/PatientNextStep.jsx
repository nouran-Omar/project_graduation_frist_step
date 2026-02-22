import React from 'react';
import styles from './PatientNextStep.module.css';
import { HiOutlineHeart, HiOutlineArrowRight } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';

const PatientNextStep = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.gradientCard}>
      <div className={styles.content}>
        <HiOutlineHeart className={styles.heartIcon} />
        <h2 className={styles.mainTitle}>Take the Next Step</h2>
        <p className={styles.subTitle}>Get a comprehensive heart health assessment with our advanced AI analysis</p>
        
        <button 
          className={styles.actionBtn}
          onClick={() => navigate('/patient/heart-risk')}
        >
          Proceed to Full Assessment <HiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PatientNextStep;
