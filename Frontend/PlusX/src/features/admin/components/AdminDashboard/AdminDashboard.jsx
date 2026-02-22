import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AdminDashboard.module.css';

/* ── Icons ── */
import { LuStethoscope, LuUsers, LuUserPlus, LuUserX } from 'react-icons/lu';
import { MdPersonAddAlt } from 'react-icons/md';

/* ─── Mock data — fallback لو الـ API مش شغال ──────────────── */
const MOCK_STATS = { totalDoctors: 214, totalPatients: 1467, newDoctors: 12, newPatients: 154 };

const MOCK_DOCTORS = [
  { id: 1, name: 'Dr. Michael Chen',   email: 'michael.chen@pulsex.com',   image: 'https://i.pravatar.cc/150?u=dr1' },
  { id: 2, name: 'Dr. Sarah Williams', email: 'sarah.williams@pulsex.com', image: 'https://i.pravatar.cc/150?u=dr2' },
  { id: 3, name: 'Dr. James Rodriguez',email: 'james.rodriguez@pulsex.com',image: 'https://i.pravatar.cc/150?u=dr3' },
];

const MOCK_PATIENTS = [
  { id: 101, name: 'Emma Thompson',   email: 'emma.thompson@email.com',   image: 'https://i.pravatar.cc/150?u=p1' },
  { id: 102, name: 'David Martinez',  email: 'david.martinez@email.com',  image: 'https://i.pravatar.cc/150?u=p2' },
  { id: 103, name: 'Olivia Anderson', email: 'olivia.anderson@email.com', image: 'https://i.pravatar.cc/150?u=p3' },
];

/* ─── StatCard ──────────────────────────────────────────────── */
const StatCard = ({ icon, label, value, sub, gradient }) => (
  <div className={styles.statCard}>
    <div className={styles.iconWrapper} style={{ background: gradient }}>
      {icon}
    </div>
    <div className={styles.statBody}>
      <span className={styles.statValue}>{(value ?? 0).toLocaleString()}</span>
      <span className={styles.statLabel}>{label}</span>
      <span className={styles.statSub}>{sub}</span>
    </div>
  </div>
);

/* ─── AdminDashboard ─────────────────────────────────────────── */
export default function AdminDashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    stats: { totalDoctors: 0, totalPatients: 0, newDoctors: 0, newPatients: 0 },
    doctors: [],
    patients: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [stats, docs, pats] = await Promise.all([
          axios.get('/api/admin/stats', config).catch(() => ({ data: MOCK_STATS })),
          axios.get('/api/admin/recent-doctors', config).catch(() => ({ data: MOCK_DOCTORS })),
          axios.get('/api/admin/recent-patients', config).catch(() => ({ data: MOCK_PATIENTS })),
        ]);

        setData({
          stats: stats.data ?? MOCK_STATS,
          doctors: Array.isArray(docs.data) ? docs.data : MOCK_DOCTORS,
          patients: Array.isArray(pats.data) ? pats.data : MOCK_PATIENTS,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>

      {/* ══ Welcome Card ════════════════════════════════════════ */}
      <div className={styles.welcomeCard}>
        {/* دوائر الخلفية */}
        <div className={styles.circle1} />
        <div className={styles.circle2} />

        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeTitle}>Welcome Back 👋</h1>
          <p className={styles.welcomeSub}>Manage doctors and patients across the PulseX platform.</p>

          <div className={styles.actions}>
            <button
              onClick={() => navigate('/admin/AddDoctorBtn')}
              className={styles.btnAddDoctor}
            >
              <MdPersonAddAlt className={styles.btnIcon} />
              Add Doctor
            </button>
            <button
              onClick={() => navigate('/admin/AddPatientBtn')}
              className={styles.btnAddPatient}
            >
              <MdPersonAddAlt className={styles.btnIcon} />
              Add Patient
            </button>
          </div>

          {/* ── الإحصاءات داخل الكارت ── */}
          <div className={styles.statsGrid}>
            <StatCard
              icon={<LuStethoscope />}
              label="Total Doctors"
              value={data.stats.totalDoctors}
              sub="Active practitioners"
              gradient="linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)"
            />
            <StatCard
              icon={<LuUsers />}
              label="Total Patients"
              value={data.stats.totalPatients}
              sub="Registered users"
              gradient="linear-gradient(135deg, #34D399 0%, #059669 100%)"
            />
            <StatCard
              icon={<LuUserPlus />}
              label="New Doctors"
              value={data.stats.newDoctors}
              sub="Last 7 days"
              gradient="linear-gradient(135deg, #C084FC 0%, #9333EA 100%)"
            />
            <StatCard
              icon={<LuUserPlus />}
              label="New Patients"
              value={data.stats.newPatients}
              sub="Last 7 days"
              gradient="linear-gradient(135deg, #FB923C 0%, #EA580C 100%)"
            />
          </div>
        </div>
      </div>

      {/* ══ Recent Doctors + Recent Patients ══════════════════ */}
      <div className={styles.mainContent}>

        {/* ── Recent Doctors ── */}
        <div className={styles.sectionCard}>
          <div className={styles.headerRow}>
            <h2 className={styles.sectionTitle}>Recent Doctors</h2>
            <span
              className={styles.viewAll}
              onClick={() => navigate('/admin/doctor-management')}
            >
              View All
            </span>
          </div>

          {loading ? (
            <div className={styles.loadingList}>
              {[1, 2, 3].map(i => <div key={i} className={styles.skeleton} />)}
            </div>
          ) : data.doctors.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon} style={{ color: '#8EC5FF', background: '#EFF6FF' }}>
                <LuUserX />
              </div>
              <h3 className={styles.emptyTitle}>No Doctors Added Yet</h3>
              <p className={styles.emptyDesc}>
                Start building your medical team by adding doctors to the PulseX platform.
              </p>
              <button
                onClick={() => navigate('/admin/AddDoctorBtn')}
                className={styles.emptyBtnBlue}
              >
                <MdPersonAddAlt /> Add First Doctor
              </button>
            </div>
          ) : (
            <div className={styles.list}>
              {data.doctors.map(doc => (
                <div key={doc.id} className={styles.listItem}>
                  <div className={styles.listItemLeft}>
                    <img
                      src={doc.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=EFF6FF&color=155DFC`}
                      className={styles.avatar}
                      alt={doc.name}
                    />
                    <div>
                      <p className={styles.itemName}>{doc.name}</p>
                      <p className={styles.itemEmail}>{doc.email}</p>
                    </div>
                  </div>
                  <button
                    className={styles.editBtn}
                    onClick={() => navigate(`/admin/edit-doctor/${doc.id}`)}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Recent Patients ── */}
        <div className={styles.sectionCard}>
          <div className={styles.headerRow}>
            <h2 className={styles.sectionTitle}>Recent Patients</h2>
            <span
              className={styles.viewAll}
              onClick={() => navigate('/admin/patient-management')}
            >
              View All
            </span>
          </div>

          {loading ? (
            <div className={styles.loadingList}>
              {[1, 2, 3].map(i => <div key={i} className={styles.skeleton} />)}
            </div>
          ) : data.patients.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon} style={{ color: '#00A63E', background: '#F0FDF4' }}>
                <LuUsers />
              </div>
              <h3 className={styles.emptyTitle}>No Patients Registered</h3>
              <p className={styles.emptyDesc}>
                Your patient list is empty. Start by adding patients to the PulseX platform.
              </p>
              <button
                onClick={() => navigate('/admin/AddPatientBtn')}
                className={styles.emptyBtnGreen}
              >
                <MdPersonAddAlt /> Add First Patient
              </button>
            </div>
          ) : (
            <div className={styles.list}>
              {data.patients.map(p => (
                <div key={p.id} className={styles.listItem}>
                  <div className={styles.listItemLeft}>
                    <img
                      src={p.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=F0FDF4&color=059669`}
                      className={styles.avatar}
                      alt={p.name}
                    />
                    <div>
                      <p className={styles.itemName}>{p.name}</p>
                      <p className={styles.itemEmail}>{p.email}</p>
                    </div>
                  </div>
                  <button
                    className={styles.editBtn}
                    onClick={() => navigate(`/admin/edit-patient/${p.id}`)}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
