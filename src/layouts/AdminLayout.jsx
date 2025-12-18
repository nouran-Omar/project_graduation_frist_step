import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import Header from '../components/common/Header';

const AdminLayout = () => {
  return (
    <div className="flex bg-[#F5F7FA] min-h-screen">
      
      {/* 1. السايد بار برول أدمن */}
      <Sidebar role="admin" />

      <div className="flex-1 ml-72">
        {/* 2. الهيدر برول أدمن */}
        <Header role="admin" /> 

        {/* 3. المحتوى */}
        <main className="p-8 pt-2">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
};

export default AdminLayout;