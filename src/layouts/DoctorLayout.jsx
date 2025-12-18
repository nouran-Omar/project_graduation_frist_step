import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

const DoctorLayout = () => {
  return (
    <div className="flex bg-[#F5F7FA] min-h-screen">
      
      {/* بنبعت role="doctor" عشان السايد بار يعرض قوائم الدكتور */}
      <Sidebar role="doctor" />

      <div className="flex-1 ml-72">
        {/* بنبعت role="doctor" عشان الهيدر يعرض صورة الدكتور */}
        <Header role="doctor" /> 

        {/* هنا بتظهر صفحات الدكتور (Dashboard, Patients, etc.) */}
        <main className="p-8 pt-2">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default DoctorLayout;