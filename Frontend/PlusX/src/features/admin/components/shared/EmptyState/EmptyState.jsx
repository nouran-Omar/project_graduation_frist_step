import React from 'react';
import styles from './EmptyState.module.css';

/**
 * Reusable EmptyState component for admin pages.
 *
 * Props:
 *  icon        – React element (e.g. <FaUserDoctor />)
 *  title       – Bold heading
 *  description – Subtitle / helper text
 *  buttonLabel – (optional) CTA button text
 *  onAction    – (optional) CTA click handler
 *  accentColor – (optional) icon background tint, defaults to '#EFF6FF'
 *  iconColor   – (optional) icon color, defaults to '#2563EB'
 */
export default function EmptyState({
  icon,
  title,
  description,
  buttonLabel,
  onAction,
  accentColor = '#EFF6FF',
  iconColor   = '#2563EB',
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {icon && (
          <div
            className={styles.iconBox}
            style={{ background: accentColor, color: iconColor }}
          >
            {icon}
          </div>
        )}

        <h2 className={styles.title}>{title}</h2>

        {description && (
          <p className={styles.description}>{description}</p>
        )}

        {buttonLabel && onAction && (
          <button
            className={styles.actionBtn}
            style={{ background: iconColor }}
            onClick={onAction}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
}
