import React from 'react';
import styles from './PatientCriticalAlert.module.css';
import { HiOutlineMagnifyingGlass, HiOutlineXCircle } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

const PatientCriticalAlert = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.alertCard}>
      <div className={styles.iconCircle}>
        <HiOutlineXCircle className="text-red-600 text-4xl" />
      </div>
      
      <h2 className={styles.alertTitle}>Critical Alert: Medical Consultation Recommended</h2>
      
      <p className={styles.alertDesc}>
        Based on our AI analysis of your uploaded X-rays, we have detected indicators that require immediate medical attention. Your health is our priority; we have curated a list of top cardiologists available on PulseX to help you right now.
      </p>

      <button 
        className={styles.actionBtn}
        onClick={() => navigate('/patient/doctors')} // الأكشن: رويتينج لقائمة الدكاترة
      >
        Find Doctors <HiOutlineMagnifyingGlass className="text-xl" />
      </button>
    </div>
  );
};

export default PatientCriticalAlert;
