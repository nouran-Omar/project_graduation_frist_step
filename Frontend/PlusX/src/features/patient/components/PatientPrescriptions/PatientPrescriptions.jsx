import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 استيراد التنقل
import styles from './PatientPrescriptions.module.css';
import { jsPDF } from "jspdf";
import { HiOutlineEye, HiOutlineArrowDownTray, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { MdOutlineMedicalServices } from "react-icons/md";

const PatientPrescriptions = () => {
  const navigate = useNavigate(); // 👈 هوك التنقل

  const [allPrescriptions] = useState([
    { id: "RX-2026-0210-4523", doc: "Dr. Sarah Mitchell", spec: "internal Medicine", date: "February 10, 2026", status: "Active", meds: 3, tests: 2 },
    { id: "RX-2026-0205-3891", doc: "Dr. Michael Chen", spec: "Cardiology", date: "February 5, 2026", status: "Active", meds: 2, tests: 1 },
    { id: "RX-2026-0128-2147", doc: "Dr. Emily Rodriguez", spec: "Dermatology", date: "January 28, 2026", status: "Completed", meds: 1, tests: 0 },
  ]);

  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState("");

  const filteredData = allPrescriptions.filter(item => {
    const matchesFilter = filter === 'All' || item.status === filter;
    const matchesSearch = item.doc.toLowerCase().includes(search.toLowerCase()) || item.id.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={styles.pageWrapper}>
      {/* الإحصائيات (Stats Row) */}
      <div className={styles.statsRow}>
        <StatCard label="Total Prescriptions" val={allPrescriptions.length} color="blue" />
        <StatCard label="Active" val={allPrescriptions.filter(p => p.status === 'Active').length} color="green" />
        <StatCard label="Completed" val={allPrescriptions.filter(p => p.status === 'Completed').length} color="gray" />
      </div>

      {/* شريط البحث والفلترة */}
      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <HiOutlineMagnifyingGlass />
          <input type="text" placeholder="Search by Doctor or Date..." onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className={styles.tabButtons}>
           {['All', 'Active', 'Completed'].map(t => (
             <button key={t} className={filter === t ? styles.activeTab : ''} onClick={() => setFilter(t)}>{t}</button>
           ))}
        </div>
      </div>

      {/* شبكة الكروت (Prescriptions Grid) */}
      <div className={styles.grid}>
        {filteredData.map(item => (
          <div key={item.id} className={styles.card}>
            <div className={`${styles.cardHeader} ${styles[item.status.toLowerCase()]}`}>
              <div className="flex gap-3">
                <div className={styles.avatar}><MdOutlineMedicalServices /></div>
                <div><h4>{item.doc}</h4><p>{item.spec}</p></div>
              </div>
              <span className={styles.statusBadge}>{item.status}</span>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.infoRow}><span>Medications</span> <strong>{item.meds} items</strong></div>
              <div className={styles.infoRow}><span>Tests Requested</span> <strong>{item.tests} items</strong></div>
              <p className={styles.presID}>ID: {item.id}</p>
              <div className={styles.actions}>
                {/* 👈 تم تغيير الأكشن هنا ليروح لصفحة التفاصيل */}
                <button 
                  className={styles.viewBtn} 
                  onClick={() => navigate(`/patient/prescription/${item.id}`, { state: { prescription: item } })}
                >
                  <HiOutlineEye /> View
                </button>
                <button className={styles.downloadBtn}><HiOutlineArrowDownTray /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ label, val, color }) => (
  <div className={`${styles.statCard} ${styles[color]}`}>
    <p>{label}</p>
    <h3>{val}</h3>
  </div>
);

export default PatientPrescriptions;