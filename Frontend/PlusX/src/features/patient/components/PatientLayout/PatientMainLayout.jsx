import React from 'react';
import { Outlet } from 'react-router-dom';
import PatientSidebar from '../PatientSidebar/PatientSidebar';
import PatientHeader from '../PatientHeader/PatientHeader';
import styles from './PatientMainLayout.module.css';

/* ─────────────────────────────────────────────────────
   PatientMainLayout
   ┌──────────────────────────────────────────────────┐
   │  [Sidebar 310px]  │  [Header sticky]             │
   │                   │  [<Outlet /> — page content] │
   └──────────────────────────────────────────────────┘
───────────────────────────────────────────────────── */
const PatientMainLayout = () => {
  return (
    <div className={styles.root}>

      {/* ── Fixed Sidebar ── */}
      <aside className={styles.sidebar}>
        <PatientSidebar />
      </aside>

      {/* ── Right Column ── */}
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

export default PatientMainLayout;
