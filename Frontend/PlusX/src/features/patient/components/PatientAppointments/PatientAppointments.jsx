import React, { useState } from 'react';
import styles from './PatientAppointments.module.css';
import { HiOutlineCalendarDays, HiOutlineCheckBadge, HiOutlineClock, HiOutlineMapPin, HiOutlineBanknotes, HiOutlineXCircle } from "react-icons/hi2";
import { MdOutlineEventNote } from "react-icons/md";

const PatientAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'completed'

  // داتا وهمية كتير وشاملة لكل الحالات (Upcoming, Completed, Cancelled)
  const allAppointments = [
    { id: 1, doc: "Dr. Jehan Osama", date: "22 Oct 2025", time: "03:30 PM", method: "Cash at Clinic", loc: "Cairo Heart Center", status: "Upcoming", img: "https://images.unsplash.com/photo-1559839734-2b71f1536780?w=100&q=80" },
    { id: 2, doc: "Dr. Ahmed Hassan", date: "25 Oct 2025", time: "10:00 AM", method: "Online Payment", loc: "Medical City Hospital", status: "Upcoming", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&q=80" },
    { id: 3, doc: "Dr. Noha Mohamed", date: "28 Oct 2025", time: "02:15 PM", method: "Online Payment", loc: "Skin Care Clinic", status: "Upcoming", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&q=80" },
    { id: 4, doc: "Dr. Walid Ali", date: "15 Oct 2025", time: "05:30 PM", method: "Cash at Clinic", loc: "Cairo Heart Center", status: "Completed", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&q=80" },
    { id: 5, doc: "Dr. Sarah Johnson", date: "10 Oct 2025", time: "09:00 AM", method: "Online Payment", loc: "City Medical Center", status: "Cancelled", img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=100&q=80" },
  ];

  // فلترة المواعيد بناءً على الـ Tab المختار
  const filteredData = allAppointments.filter(app => 
    activeTab === 'upcoming' ? app.status === 'Upcoming' : app.status !== 'Upcoming'
  );

  const upcomingCount = allAppointments.filter(a => a.status === 'Upcoming').length;
  const completedCount = allAppointments.filter(a => a.status === 'Completed').length;

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className="flex items-center gap-3">
          <MdOutlineEventNote className="text-3xl text-[#010218]" />
          <h1 className={styles.title}>My Appointments</h1>
        </div>
        <p className={styles.subtitle}>View your scheduled and completed appointments</p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.greenStat}`}>
          <div className={styles.statIcon}><HiOutlineCalendarDays /></div>
          <div>
            <p>Upcoming Appointments</p>
            <h3>{upcomingCount}</h3>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.indigoStat}`}>
          <div className={styles.statIcon}><HiOutlineCheckBadge /></div>
          <div>
            <p>Completed Appointments</p>
            <h3>{completedCount}</h3>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'upcoming' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'completed' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
      </div>

      {/* Appointment List */}
      <div className={styles.appointmentsList}>
        {filteredData.map(app => (
          <div key={app.id} className={styles.appCard}>
            <div className={styles.cardMain}>
              <img src={app.img} alt={app.doc} className={styles.docImg} />
              <div className={styles.info}>
                <h4 className={styles.docName}>{app.doc}</h4>
                <div className={styles.detailsRow}>
                  <div className={styles.detail}><HiOutlineCalendarDays /> {app.date} – {app.time}</div>
                  <div className={styles.detail}><HiOutlineBanknotes /> {app.method}</div>
                </div>
                <div className={styles.detail}><HiOutlineMapPin /> {app.loc}</div>
              </div>
            </div>
            
            <div className={styles.cardActions}>
              <span className={`${styles.badge} ${styles[app.status.toLowerCase()]}`}>
                {app.status}
              </span>
              {app.status === 'Upcoming' && (
                <button className={styles.cancelBtn}>
                  <HiOutlineXCircle /> Cancel Appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientAppointments;
