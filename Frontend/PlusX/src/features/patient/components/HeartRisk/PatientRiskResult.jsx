import React from 'react';
import styles from './PatientRiskResult.module.css';
import PatientRiskGauge from './PatientRiskGauge';
import PatientCriticalAlert from './PatientCriticalAlert';

const PatientRiskResult = () => {
  return (
    <div className={styles.resultContainer}>
      <div className="mb-12">
        <PatientRiskGauge percentage={84} />
      </div>
      <PatientCriticalAlert />
    </div>
  );
};

export default PatientRiskResult;
