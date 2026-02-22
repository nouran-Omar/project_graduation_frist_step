import React from 'react';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({ isOpen, title, desc, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modalCard}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{desc}</p>
        <div className={styles.btnGroup}>
          <button className={styles.noBtn} onClick={onCancel}>No, Cancel</button>
          <button className={styles.yesBtn} onClick={onConfirm}>Yes, Confirm</button>
        </div>
      </div>
    </div>
  );
}