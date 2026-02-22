/**
 * DoctorLayout — Reusable Layout for Doctor role
 * ─────────────────────────────────────────────────────────────
 * يستخدم مؤقتاً PatientSidebar و PatientHeader حتى يتم إنشاء
 * UnifiedSidebar / DashboardHeader كـ shared components لاحقاً.
 * ─────────────────────────────────────────────────────────────
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
// مؤقتاً نستخدم sidebar وheader الـ patient — استبدليهم بـ shared components لو أنشأتِهم
import PatientSidebar from '../../../patient/components/PatientSidebar/PatientSidebar';
import PatientHeader  from '../../../patient/components/PatientHeader/PatientHeader';
import styles from './DoctorLayout.module.css';

const DoctorLayout = () => {
  return (
    <div className={styles.root}>
      {/* Fixed Sidebar */}
      <aside className={styles.sidebar}>
        <PatientSidebar />
      </aside>

      {/* Right Column */}
      <div className={styles.rightCol}>
        {/* Sticky Header */}
        <header className={styles.header}>
          <PatientHeader />
        </header>

        {/* Page Content */}
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DoctorLayout;
