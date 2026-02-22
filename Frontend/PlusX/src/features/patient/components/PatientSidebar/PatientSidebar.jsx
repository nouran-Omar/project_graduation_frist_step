import React, { useState } from 'react'; // 👈 ضيفنا useState هنا
import { NavLink, useNavigate } from 'react-router-dom'; // 👈 ضيفنا useNavigate للتحويل بعد الخروج
import styles from './PatientSidebar.module.css';
import { LuLayoutDashboard, LuClipboardList, LuQrCode } from 'react-icons/lu';
import { FaHeartPulse, FaUserDoctor } from 'react-icons/fa6';
import { HiOutlineCalendarDays, HiOutlineChatBubbleLeftRight, HiOutlineCog6Tooth, HiOutlineArrowLeftOnRectangle } from 'react-icons/hi2';
import { MdOutlineMedicalInformation } from "react-icons/md";
import ConfirmModal from '../../../admin/components/ConfirmModal/ConfirmModal';
import { Label } from 'recharts';

const PatientSidebar = () => {
  const navigate = useNavigate();
  // 1. تعريف الـ State للمودال (Validation & UI Logic)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // 2. الأكشن: تنفيذ الخروج الفعلي (Handling Logout)
  const confirmLogout = () => {
    console.log("User logged out");
    // هنا ممكن تمسحي الـ Token لو موجود
    setIsLogoutModalOpen(false);
    navigate('/login'); // التحويل لصفحة تسجيل الدخول
  };

  const MENU_ITEMS = [
    { label: 'Dashboard', path: '/patient/dashboard', icon: <LuLayoutDashboard /> },
    { label: 'Health Survey', path: '/patient/survey', icon: <LuClipboardList /> },
    { label: 'Heart Risk Assessment', path: '/patient/heart-risk', icon: <FaHeartPulse /> },
    { label: 'Doctor List', path: '/patient/doctors', icon: <FaUserDoctor /> },
    { label: 'Appointments', path: '/patient/appointments', icon: <HiOutlineCalendarDays /> },
    { label: 'Messages', path: '/patient/messages', icon: <HiOutlineChatBubbleLeftRight /> },
    { label: 'Medical Records', path: '/patient/records', icon: <MdOutlineMedicalInformation /> },
    { label: 'Stories', path: '/patient/stories', icon: <LuClipboardList /> },
    { label: 'Prescription', path: '/patient/prescription', icon: <LuClipboardList /> },
    
    { label: 'QR Code', path: '/patient/qr', icon: <LuQrCode /> },
  ];

  return (
    <aside className={`${styles.sidebarContainer} w-[310px] fixed left-[18px] top-[24px]`}>
      <div className={styles.sidebarContent}>
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <div className="flex items-center gap-2 px-6 pt-6">
            <span className="text-black text-2xl font-bold">Pulse<span className="text-[#333CF5]">X</span></span>
          </div>
        </div>

        <nav className="mt-10 px-4">
          <p className={styles.sectionLabel}>Menu</p>
          <ul className="space-y-2">
            {MENU_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  <span className={styles.labelText}>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className={styles.sectionLabel}>General</p>
            <NavLink to="/patient/settings" className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}>
              <span className={styles.icon}><HiOutlineCog6Tooth /></span>
              <span className={styles.labelText}>Settings & Profile</span>
            </NavLink>
            
            {/* الأكشن: فتح المودال عند الضغط */}
            <button 
              onClick={() => setIsLogoutModalOpen(true)} 
              className={`${styles.navLink} mt-2 w-full text-left border-none bg-transparent cursor-pointer`}
            >
              <span className={styles.icon}><HiOutlineArrowLeftOnRectangle /></span>
              <span className={styles.labelText}>Log out</span>
            </button>
          </div>
        </nav>
      </div>

      {/* مودال التأكيد */}
      <ConfirmModal 
        isOpen={isLogoutModalOpen}
        title="Log Out?"
        desc="Are you sure you want to log out of your account?"
        onConfirm={confirmLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </aside>
  );
};

export default PatientSidebar;
