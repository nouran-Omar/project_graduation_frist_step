import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
// استيراد الأيقونات (تم اختيارها لتطابق الصور)
import { 
  FiGrid, FiActivity, FiHeart, FiMaximize, FiUser, FiUsers, 
  FiCalendar, FiMessageSquare, FiBookOpen, FiSettings, FiLogOut,
  FiBriefcase, FiClock, FiShield
} from 'react-icons/fi';
import { RiHeartPulseFill } from "react-icons/ri";
// افترض وجود دالة لتسجيل الخروج
// import { logoutUser } from '../../services/authService'; 

const Sidebar = ({ role = 'patient' }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ================= تعريف القوائم لكل دور =================

  // 1️⃣ قائمة المريض (مطابقة للصورة الأولى)
  const patientMenu = [
    { name: 'Dashboard', path: '/patient/dashboard', icon: FiGrid },
    { name: 'Medical Records', path: '/patient/records', icon: FiActivity },
    { name: 'Heart Risk Assessment', path: '/patient/risk', icon: FiHeart },
    { name: 'QR Code', path: '/patient/qr', icon: FiMaximize },
    { name: 'Doctor List', path: '/patient/doctors', icon: FiUser },
    { name: 'Appointments', path: '/patient/appointments', icon: FiCalendar },
    { name: 'Messages', path: '/patient/messages', icon: FiMessageSquare },
    { name: 'Stories', path: '/patient/stories', icon: FiBookOpen },
  ];

  // 2️⃣ قائمة الدكتور (بناءً على هيكل التطبيق المعتاد)
  const doctorMenu = [
    { name: 'Dashboard', path: '/doctor/dashboard', icon: FiGrid },
    { name: 'Patient List', path: '/doctor/patients', icon: FiUsers },
    { name: 'Appointments', path: '/doctor/appointments', icon: FiCalendar },
    { name: 'Messages', path: '/doctor/messages', icon: FiMessageSquare },
    { name: 'Patient Stories', path: '/doctor/stories', icon: FiBookOpen },
  ];

  // 3️⃣ قائمة الأدمن (مطابقة للصورة الثانية)
  const adminMenu = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: FiGrid },
    { name: 'Doctor Management', path: '/admin/doctors', icon: FiBriefcase },
    { name: 'Patient Management', path: '/admin/patients', icon: FiUsers },
    { name: 'Stories Management', path: '/admin/stories', icon: FiBookOpen },
    { name: 'Activity Logs', path: '/admin/logs', icon: FiClock },
  ];

  // ================= تحديد القائمة الحالية بناءً على الرول =================
  let currentMenu;
  let basePath;
  switch (role) {
    case 'admin':
      currentMenu = adminMenu;
      basePath = '/admin';
      break;
    case 'doctor':
      currentMenu = doctorMenu;
      basePath = '/doctor';
      break;
    case 'patient':
    default:
      currentMenu = patientMenu;
      basePath = '/patient';
      break;
  }

  // دالة تسجيل الخروج (محاكاة)
  const handleLogout = async () => {
      // await logoutUser(); // إلغاء التعليق عند الربط بالباك اند
      setShowLogoutModal(false);
      console.log("Logged out successfully");
      navigate('/login'); 
  };

  return (
    <>
      {/* السايد بار الرئيسي */}
      <div className="w-72 h-screen bg-white fixed left-0 top-0 flex flex-col z-40 font-sans border-r border-gray-100/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        
        {/* 1. الشعار (Logo) */}
        <div className="p-8 flex items-center gap-3">
          <RiHeartPulseFill className="text-4xl text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-none">PulseX</h1>
            {/* عرض الدور الحالي تحت اللوجو (اختياري) */}
            <span className="text-[10px] uppercase text-gray-400 tracking-widest font-medium ml-0.5">{role} Portal</span>
          </div>
        </div>

        {/* 2. عناصر القائمة (Menu Items) */}
        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4 px-8">Menu</p>
          
          <div className="space-y-1">
            {currentMenu.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                // دالة تحديد الستايل بناءً على هل الرابط نشط أم لا
                className={({ isActive }) => `
                  relative flex items-center gap-4 px-8 py-3.5 transition-all duration-300 group my-1 font-medium
                  ${isActive 
                    ? 'text-blue-600 bg-blue-50'  // ستايل النشط
                    : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50' // ستايل غير النشط
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {/* الشريط الأزرق الجانبي (يظهر فقط عند النشاط) */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600 rounded-r-lg"></div>
                    )}
                    
                    {/* الأيقونة والنص */}
                    <item.icon className={`text-[22px] relative z-10 transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'}`} />
                    <span className="text-sm relative z-10">{item.name}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* 3. القسم السفلي (General) */}
        <div className="p-4 pb-8 space-y-3 mt-auto">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-4">General</p>
          
          {/* رابط الإعدادات */}
          <NavLink 
            to={`${basePath}/settings`}
            className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'}`}
          >
              <FiSettings className="text-[22px]" />
              <span className="text-sm">Settings & Profile</span>
          </NavLink>
          
          {/* زر تسجيل الخروج */}
          <button 
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all text-left group font-medium"
          >
              <FiLogOut className="text-[22px] group-hover:text-red-600 transition-colors" />
              <span className="text-sm">Log out</span>
          </button>
        </div>
      </div>

      {/* نافذة تأكيد تسجيل الخروج (Modal) */}
      <AnimatePresence>
        {showLogoutModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLogoutModal(false)} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white rounded-[30px] p-8 w-full max-w-sm shadow-2xl relative z-10 text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiLogOut className="text-3xl text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Log Out?</h3>
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">Are you sure you want to log out of your account? You'll need to login again to access your data.</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => setShowLogoutModal(false)} className="px-6 py-3 rounded-full border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all flex-1">Cancel</button>
                        <button onClick={handleLogout} className="px-6 py-3 rounded-full bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex-1">Yes, Logout</button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;