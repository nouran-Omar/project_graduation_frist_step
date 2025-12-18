import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

const PatientLayout = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FE] font-sans">
      <Sidebar />
      <Header />
      
      <main className="pl-80 pr-8 pb-8 pt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default PatientLayout;