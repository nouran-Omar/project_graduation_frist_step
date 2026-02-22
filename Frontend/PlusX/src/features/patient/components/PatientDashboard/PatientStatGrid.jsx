import React from 'react';
import styles from './PatientStatGrid.module.css';
import { FaHeartPulse } from 'react-icons/fa6';
import {
  HiOutlineBeaker,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
} from 'react-icons/hi2';
import { TbDroplet, TbLungs } from 'react-icons/tb';

/* ─── Single stat card ──────────────────────────── */
const StatCard = ({ label, value, unit, status, trend, gradientFrom, gradientTo, icon }) => {
  const isUp = trend && trend.startsWith('+');
  const isDown = trend && trend.startsWith('-');

  return (
    <div className={styles.card}>
      {/* Colour strip */}
      <div
        className={styles.strip}
        style={{
          background: `linear-gradient(160deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
        }}
      />

      <div className={styles.cardInner}>
        {/* Icon bubble */}
        <div
          className={styles.iconBubble}
          style={{ background: `${gradientFrom}18`, color: gradientFrom }}
        >
          {icon}
        </div>

        {/* Value */}
        <div className={styles.valueRow}>
          <span className={styles.value}>{value}</span>
          <span className={styles.unit}>{unit}</span>
        </div>

        {/* Label */}
        <p className={styles.label}>{label}</p>

        {/* Status + trend */}
        <div className={styles.footer}>
          <span
            className={styles.statusBadge}
            style={{ background: `${gradientFrom}15`, color: gradientFrom }}
          >
            {status}
          </span>

          {trend && trend !== '0' && (
            <span
              className={styles.trend}
              style={{ color: isDown ? '#F59E0B' : '#00A63E' }}
            >
              {isUp ? (
                <HiOutlineArrowTrendingUp className={styles.trendIcon} />
              ) : (
                <HiOutlineArrowTrendingDown className={styles.trendIcon} />
              )}
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Grid ──────────────────────────────────────── */
const PatientStatGrid = ({ vitals }) => {
  if (!vitals) return null;

  const cards = [
    {
      label: 'Heart Rate',
      value: vitals.heartRate.value,
      unit: vitals.heartRate.unit,
      status: vitals.heartRate.status,
      trend: vitals.heartRate.trend,
      gradientFrom: vitals.heartRate.gradientFrom,
      gradientTo: vitals.heartRate.gradientTo,
      icon: <FaHeartPulse />,
    },
    {
      label: 'Blood Pressure',
      value: vitals.bloodPressure.display,
      unit: vitals.bloodPressure.unit,
      status: vitals.bloodPressure.status,
      trend: vitals.bloodPressure.trend,
      gradientFrom: vitals.bloodPressure.gradientFrom,
      gradientTo: vitals.bloodPressure.gradientTo,
      icon: <TbDroplet />,
    },
    {
      label: 'Blood Sugar',
      value: vitals.bloodSugar.value,
      unit: vitals.bloodSugar.unit,
      status: vitals.bloodSugar.status,
      trend: vitals.bloodSugar.trend,
      gradientFrom: vitals.bloodSugar.gradientFrom,
      gradientTo: vitals.bloodSugar.gradientTo,
      icon: <HiOutlineBeaker />,
    },
    {
      label: 'Oxygen Level',
      value: vitals.oxygenLevel.value,
      unit: vitals.oxygenLevel.unit,
      status: vitals.oxygenLevel.status,
      trend: vitals.oxygenLevel.trend,
      gradientFrom: vitals.oxygenLevel.gradientFrom,
      gradientTo: vitals.oxygenLevel.gradientTo,
      icon: <TbLungs />,
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  );
};

export default PatientStatGrid;
