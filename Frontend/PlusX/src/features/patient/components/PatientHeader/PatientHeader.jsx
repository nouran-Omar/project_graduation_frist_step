import React from 'react';
import styles from './PatientHeader.module.css';
import { HiOutlineBell, HiOutlineEnvelope } from 'react-icons/hi2';
import { LuCalendarDays, LuClock } from 'react-icons/lu';

const PatientHeader = () => {
  return (
    <header className={`${styles.headerWrapper}  px-8`}>
      <div className={styles.leftSection}>
        <div className={styles.dateChip}>
          <LuCalendarDays className={styles.chipIcon} />
          <span className={styles.chipText}>Sunday, February 15, 2026</span>
        </div>
        <div className={styles.timeChip}>
          <LuClock className={styles.chipIcon} />
          <span className={styles.chipText}>02:09 AM</span>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.notifWrapper}>
          <button className={styles.bellBtn}><HiOutlineEnvelope className={styles.bellIcon} /></button>
        </div>
        <div className={styles.notifWrapper}>
          <button className={styles.bellBtn}>
            <HiOutlineBell className={styles.bellIcon} />
            <span className={styles.badge}>3</span>
          </button>
        </div>
        
        <div className={styles.avatarWrapper}>
          <img src="https://placehold.co/40x40" alt="Avatar" className={styles.avatar} />
          <div className={styles.avatarInfo}>
            <span className={styles.avatarName}>Mohamed Salem</span>
            <span className={styles.avatarRole}>Patient</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PatientHeader;
