
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import AdminHeader from '../AdminHeader/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="   min-h-screen bg-[#F6F7F8] font-inter p-5 flex">
      <div className="flex items-start"> {/* الأب */}
   
  <aside className="sticky top-1 w-[270px] h-[650px] bg-white shadow-sm rounded-[24px] overflow-hidden border border-gray-100/50 flex flex-col z-50">
        <Sidebar />
      </aside>
 </div>
      {/* 2. الجزء الأيمن */}
      <div className=" overflow-x-auto flex-1 ml-[20px] flex flex-col gap-5">
        
        {/* الهيدر - Sticky */}
        {/* الـ top-0 هنا عشان لما تسكرولي يلزق فوق علطول، وممكن تسيبي top-0 لو عايزة الفراغ يختفي وأنتِ نازلة */}
      <header className="sticky top-1 h-[72px] bg-white shadow-sm rounded-[20px] px-8 flex items-center justify-between border border-gray-100/50 z-40">
  <AdminHeader />
</header>

        {/* محتوى الصفحة */}
        {/* شيلنا الـ mt-[92px] عشان الـ sticky header واخد مكانه طبيعي */}
      <main className="bg-white shadow-sm rounded-[24px] border border-gray-100/50 min-h-[calc(100vh-112px)] p-5 min-w-[700px]">
  <Outlet /> 
</main>
      </div>
    </div>
  );
};

export default AdminLayout;
