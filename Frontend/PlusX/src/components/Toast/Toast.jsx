/**
 * Toast — Global reusable success/error/info toast notification
 *
 * Figma spec: bg-gray-100 (#F3F4F5), dark icon circle (#303746),
 * green check (#01E17B), green bottom bar, green radial glow,
 * slide-in from right, auto-dismiss after `duration` ms.
 *
 * Props:
 *  visible   {boolean}  — show/hide the toast
 *  title     {string}   — bold main line  (e.g. "Doctor Created Successfully")
 *  message   {string}   — sub-line        (e.g. "Your changes have been saved successfully")
 *  type      {string}   — 'success' | 'error' | 'info'  (default: 'success')
 *  duration  {number}   — ms before auto-hide            (default: 4000)
 *  onClose   {fn}       — called when toast hides
 *
 * Usage:
 *   const [toast, setToast] = useState({ visible: false, title: '', message: '' });
 *
 *   // show:
 *   setToast({ visible: true, title: 'Doctor Created Successfully',
 *              message: 'Your changes have been saved successfully' });
 *
 *   // in JSX:
 *   <Toast {...toast} onClose={() => setToast(t => ({ ...t, visible: false }))} />
 */
import React, { useEffect, useRef, useState } from 'react';
import styles from './Toast.module.css';
import { IoCheckmarkCircleSharp } from "react-icons/io5";

export default function Toast({
  visible = false,
  title   = 'Password Changed Successfully',
  message = 'Your changes have been saved successfully',
  duration = 4000,
  onClose,
}) {
  const timerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  // التحكم في وقت الاختفاء التلقائي
  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      if (duration > 0) {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
          onClose?.();
        }, duration);
      }
    } else {
      setShouldRender(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [visible, duration, onClose]);

  // لو مش visible مش هنعرض حاجة خالص
  if (!shouldRender) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.toast}>
        
        {/* الشعاع الدائري */}
        <div className={styles.glowBeam} />

        {/* الأيقونة */}
        <div className={styles.iconCircle}>
          <IoCheckmarkCircleSharp className={styles.icon} />
        </div>

        {/* النصوص */}
        <div className={styles.textBlock}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.sub}>{message}</p>
        </div>

      </div>
    </div>
  );
}