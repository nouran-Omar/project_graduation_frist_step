import React from 'react';
import styles from './PatientAIAlert.module.css';
import { HiOutlineLightningBolt } from 'react-icons/hi';

const PatientAIAlert = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <div className={styles.iconBox}>
          <HiOutlineLightningBolt className={styles.icon} />
        </div>
        <div className={styles.textColumn}>
          <h3 className={styles.title}>AI Detection Alert</h3>
          <p className={styles.desc}>Our AI detected a high probability of heart-related issues based on your responses.</p>
        </div>
      </div>
      <div className={styles.infoBox}>
        <p className={styles.infoText}>
          *Higher accuracy required. Complete your full profile in the Heart Risk Assessment section for deeper medical insights.
        </p>
      </div>
    </div>
  );
};

export default PatientAIAlert;
