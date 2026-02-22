import React from 'react';
import styles from './SuccessPopup.module.css';
import { HiOutlineCheckCircle } from "react-icons/hi2";

const SuccessPopup = ({ isOpen, title, desc }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.toast}>
        <div className={styles.iconBox}>
          <HiOutlineCheckCircle className={styles.checkIcon} />
        </div>
        <div className={styles.textBlock}>
          <div className={styles.contentTitle}>{title}</div>
          <div className={styles.contentSub}>{desc}</div>
        </div>
        <div className={styles.bottomAccent} />
      </div>
    </div>
  );
};

export default SuccessPopup; // 👈 اتأكدي إن السطر ده موجود في الآخر