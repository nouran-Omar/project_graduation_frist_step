import React from 'react';
import styles from './PatientSummaryCard.module.css';
import { HiOutlineSparkles, HiOutlineCheckCircle } from 'react-icons/hi2';
import { FaHeartPulse } from 'react-icons/fa6';

/* ─── Radial progress ring ───────────────────────── */
const RiskRing = ({ score, color }) => {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference - (score / 100) * circumference;

  return (
    <div className={styles.ringWrapper}>
      <svg width="110" height="110" viewBox="0 0 110 110">
        {/* Track */}
        <circle
          cx="55" cy="55" r={radius}
          fill="none"
          stroke="#f1f3f5"
          strokeWidth="8"
        />
        {/* Progress */}
        <circle
          cx="55" cy="55" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={filled}
          transform="rotate(-90 55 55)"
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      {/* Centre text */}
      <div className={styles.ringCenter}>
        <span className={styles.ringScore} style={{ color }}>{score}%</span>
        <span className={styles.ringLabel}>Risk</span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────── */
const PatientSummaryCard = ({ aiRisk }) => {
  if (!aiRisk) return null;

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <div className={styles.iconBubble}>
            <HiOutlineSparkles />
          </div>
          <div>
            <h3 className={styles.title}>AI Risk Score</h3>
            <p className={styles.subtitle}>Powered by PulseX Intelligence</p>
          </div>
        </div>

        <span
          className={styles.levelBadge}
          style={{ background: aiRisk.color + '15', color: aiRisk.color }}
        >
          <FaHeartPulse />
          {aiRisk.level} Risk
        </span>
      </div>

      {/* Body */}
      <div className={styles.body}>
        {/* Ring */}
        <RiskRing score={aiRisk.score} color={aiRisk.color} />

        {/* Recommendations */}
        <div className={styles.recommendations}>
          <p className={styles.recTitle}>Smart Recommendations</p>
          <ul className={styles.recList}>
            {aiRisk.recommendations.map((rec, i) => (
              <li key={i} className={styles.recItem}>
                <HiOutlineCheckCircle
                  className={styles.recIcon}
                  style={{ color: aiRisk.color }}
                />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientSummaryCard;
