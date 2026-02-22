import React from 'react';
import styles from './ToastNotification.module.css';
// استخدام LuCheck كبديل مضمون 100% لتجنب أخطاء Vite
import { LuCheck } from "react-icons/lu";

export default function ToastNotification({ message, subMessage }) {
  if (!message) return null;

  return (
    <div className={styles.toastContainer}>
      <div className={styles.toastContent}>
        <div className={styles.iconWrapper}>
          <LuCheck className={styles.icon} />
        </div>
        <div className={styles.textWrapper}>
          <h4 className={styles.title}>{message}</h4>
          <p className={styles.subtitle}>{subMessage}</p>
        </div>
      </div>
    </div>
  );
}
