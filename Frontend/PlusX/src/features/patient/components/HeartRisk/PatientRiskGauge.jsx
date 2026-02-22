import React from 'react';
import styles from './PatientRiskGauge.module.css';
// غيري LuAlertTriangle لـ LuTriangleAlert
import { LuTriangleAlert } from "react-icons/lu";

const PatientRiskGauge = ({ percentage = 84 }) => {
  // حساب زاوية الدوران بناءً على النسبة المئوية (نص دائرة = 180 درجة)
  const rotationAngle = (percentage / 100) * 180;

  return (
    <div className={styles.gaugeContainer}>
      <div className={styles.gaugeWrapper}>
        <div className={styles.gaugeBackground}></div>
        <div 
          className={styles.gaugeProgress} 
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        ></div>
        <div className={styles.gaugeValue}>
          <span className={styles.number}>{percentage}%</span>
        </div>
      </div>
      
      <div className={styles.statusLabel}>
        <LuTriangleAlert className="text-yellow-500 text-2xl" />
        <span className={styles.statusText}>High Risk</span>
      </div>
    </div>
  );
};

export default PatientRiskGauge;
