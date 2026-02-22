import React from 'react';
import styles from './PatientDashboard.module.css';
import usePatientData from '../../../../PatientHooks/usePatientData';
import PatientStatGrid from '../../components/PatientDashboard/PatientStatGrid';
import PatientWeeklyChart from '../../components/PatientDashboard/PatientWeeklyChart';
import PatientSummaryCard from '../../components/PatientDashboard/PatientSummaryCard';
import PatientChatbot from '../../components/PatientChatbot/PatientChatbot';
import { HiOutlineCalendarDays, HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { FaHeartPulse } from 'react-icons/fa6';

/* ─────────────────────────────────────────────────────
   PatientDashboard Page
   Route: /patient/dashboard  (rendered inside PatientMainLayout)
───────────────────────────────────────────────────── */
const PatientDashboard = () => {
  const { patient, isLoading } = usePatientData();

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <FaHeartPulse className={styles.loaderIcon} />
        <p>Loading your health data…</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* ── Section: Welcome banner ── */}
      <div className={styles.banner}>
        <div className={styles.bannerLeft}>
          <FaHeartPulse className={styles.bannerIcon} />
          <div>
            <h2 className={styles.bannerTitle}>
              Welcome back, <span className={styles.bannerName}>{patient.name}</span>
            </h2>
            <p className={styles.bannerSub}>
              {patient.lastUpdated} &nbsp;·&nbsp; Last updated: today
            </p>
          </div>
        </div>

        <div className={styles.bannerRight}>
          <div className={styles.bannerChip}>
            <HiOutlineCalendarDays />
            <span>Blood Type: <strong>{patient.bloodType}</strong></span>
          </div>
          <div className={styles.bannerChip}>
            <HiOutlineClipboardDocumentCheck />
            <span>ID: <strong>{patient.id}</strong></span>
          </div>
        </div>
      </div>

      {/* ── Section: Vital Signs ── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Vital Signs</h3>
          <span className={styles.sectionBadge}>Live</span>
        </div>
        <PatientStatGrid vitals={patient.vitals} />
      </section>

      {/* ── Section: Chart + Summary side by side ── */}
      <section className={styles.section}>
        <div className={styles.splitRow}>
          {/* Weekly chart — takes ~65% */}
          <div className={styles.chartCol}>
            <PatientWeeklyChart weeklyData={patient.weeklyData} />
          </div>

          {/* AI Summary — takes ~35% */}
          <div className={styles.summaryCol}>
            <PatientSummaryCard aiRisk={patient.aiRisk} />
          </div>
        </div>
      </section>

      {/* ── Section: Upcoming appointments ── */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Upcoming Appointments</h3>
        </div>
        <div className={styles.appointmentGrid}>
          {patient.appointments.map((apt) => (
            <div key={apt.id} className={styles.aptCard}>
              <div className={styles.aptAvatar}>
                {apt.doctor.charAt(apt.doctor.indexOf(' ') + 1)}
              </div>
              <div className={styles.aptInfo}>
                <p className={styles.aptDoctor}>{apt.doctor}</p>
                <p className={styles.aptSpecialty}>{apt.specialty}</p>
                <p className={styles.aptDateTime}>
                  <HiOutlineCalendarDays />
                  {apt.date} &nbsp;·&nbsp; {apt.time}
                </p>
              </div>
              <span
                className={styles.aptStatus}
                style={{
                  background: apt.status === 'Confirmed' ? '#00A63E18' : '#F59E0B18',
                  color: apt.status === 'Confirmed' ? '#00A63E' : '#F59E0B',
                }}
              >
                {apt.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Floating Chatbot ── */}
      <PatientChatbot />
    </div>
  );
};

export default PatientDashboard;

