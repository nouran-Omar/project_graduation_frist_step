import React, { useEffect, useState } from 'react';
import { fetchAdminProfile, updateAdminProfileService, changePasswordService } from '../../services/adminService';
import { FiSettings, FiCamera, FiCalendar, FiMapPin, FiLock, FiBell, FiMoon, FiUser, FiCheckCircle, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from 'framer-motion';

const AdminSettings = () => {
  const [loading, setLoading] = useState(true);
  
  // Forms State
  const [formData, setFormData] = useState({});
  const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });

  // Modals & Toasts State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notification, setNotification] = useState(null); // { title: '', msg: '' }

  useEffect(() => {
    fetchAdminProfile().then(data => {
        setFormData(data);
        setLoading(false);
    });
  }, []);

  // --- Handlers ---

  const showToast = (title, msg) => {
    setNotification({ title, msg });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    await updateAdminProfileService(formData);
    showToast("Profile Updated Successfully", "Your personal information has been saved.");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
        alert("New passwords do not match!"); 
        return;
    }
    await changePasswordService(passwordData);
    setShowPasswordModal(false);
    setPasswordData({ current: "", new: "", confirm: "" }); // Reset form
    showToast("Password Changed Successfully", "Your account password has been updated securely.");
  };

  const handleLogoutConfirm = () => {
    // هنا تحطي لوجيك الخروج الحقيقي (مسح التوكن وتوجيه لصفحة الدخول)
    window.location.href = '/'; 
  };

  // --- Components (Modals & Toast) ---

  // 1. Success Toast (زي الصورة بالظبط)
  const Toast = () => (
    <motion.div 
      initial={{ x: 100, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      exit={{ x: 100, opacity: 0 }} 
      className="fixed top-8 right-8 bg-white border-l-4 border-green-500 shadow-2xl p-4 rounded-lg flex items-center gap-3 z-[60] min-w-[350px]"
    >
      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-sm">
        <FiCheckCircle className="text-xl" />
      </div>
      <div>
        <h4 className="font-bold text-gray-900 text-sm">{notification?.title}</h4>
        <p className="text-[11px] text-gray-500 mt-0.5">{notification?.msg}</p>
      </div>
      <button onClick={() => setNotification(null)} className="ml-auto text-gray-400 hover:text-gray-600"><FiX /></button>
    </motion.div>
  );

  // 2. Change Password Modal
  const PasswordModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[30px] p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2"><FiLock /> Change Password</h3>
            <button onClick={() => setShowPasswordModal(false)} className="text-gray-400 hover:text-gray-600"><FiX className="text-lg" /></button>
        </div>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">Current Password</label>
                <input required type="password" value={passwordData.current} onChange={e => setPasswordData({...passwordData, current: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">New Password</label>
                <input required type="password" value={passwordData.new} onChange={e => setPasswordData({...passwordData, new: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">Confirm New Password</label>
                <input required type="password" value={passwordData.confirm} onChange={e => setPasswordData({...passwordData, confirm: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100" placeholder="••••••••" />
            </div>

            <div className="flex gap-3 justify-end mt-6">
                <button type="button" onClick={() => setShowPasswordModal(false)} className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-3 rounded-full bg-blue-600 text-white font-bold text-xs shadow-lg shadow-blue-200 hover:bg-blue-700">Update Password</button>
            </div>
        </form>
      </motion.div>
    </div>
  );

  // 3. Logout Modal (Design from image)
  const LogoutModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[30px] p-8 max-w-sm w-full shadow-2xl text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Log Out?</h3>
        <p className="text-sm text-gray-500 mb-8">Are you sure you want to log out of your account?</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => setShowLogoutModal(false)} className="px-8 py-3 rounded-full border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50">No, Cancel</button>
          <button onClick={handleLogoutConfirm} className="px-8 py-3 rounded-full bg-[#3b36db] text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-800">Yes, Confirm</button>
        </div>
      </motion.div>
    </div>
  );

  if (loading) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Profile...</div>;

  return (
    <div className="pb-12 animate-fade-in font-sans relative">
      
      {/* Popups Area */}
      <AnimatePresence>
        {notification && <Toast />}
        {showPasswordModal && <PasswordModal />}
        {showLogoutModal && <LogoutModal />}
      </AnimatePresence>

      {/* 1. Page Header */}
      <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
             Settings & Profile <FiSettings className="text-lg animate-spin-slow text-gray-600" />
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage your personal details, health data, and account preferences.</p>
      </div>

      <div className="space-y-8">
          
          {/* 2. Personal Information Card */}
          <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
                  <FiUser className="text-blue-600" /> Personal Information
              </h3>

              <div className="flex flex-col md:flex-row gap-8">
                  {/* Photo */}
                  <div className="flex flex-col items-center gap-4">
                      <img src={formData.img} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm" />
                      <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
                          <FiCamera /> Change Photo
                      </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleProfileUpdate} className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 flex items-center gap-2"><FiUser /> First Name</label>
                          <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 flex items-center gap-2"><FiUser /> Last Name</label>
                          <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 flex items-center gap-2">✉️ Email Address</label>
                          <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 flex items-center gap-2">📞 Phone Number</label>
                          <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 flex items-center gap-2"><FiCalendar /> Date of Birth</label>
                          <input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 transition-all" />
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-500 flex items-center gap-2"><FiMapPin /> Location</label>
                          <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-3.5 text-sm outline-none focus:ring-blue-500 focus:border-blue-500 transition-all" />
                      </div>

                      <div className="md:col-span-2 flex justify-end mt-4">
                          <button type="submit" className="bg-[#3b36db] text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-blue-200 hover:bg-[#2c28b1] transition-all">
                              Save Personal Info
                          </button>
                      </div>
                  </form>
              </div>
          </div>

          {/* 3. Account Settings Card */}
          <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
                  <FiSettings className="text-blue-600" /> Account Settings
              </h3>

              <div className="space-y-6">
                  {/* Change Password Row */}
                  <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                      <div className="flex items-center gap-3">
                          <FiLock className="text-gray-400" />
                          <span className="text-sm font-bold text-gray-700">Change Password</span>
                      </div>
                      <button 
                        onClick={() => setShowPasswordModal(true)} 
                        className="text-blue-600 text-xs font-bold hover:underline"
                      >
                          Change
                      </button>
                  </div>

                  {/* Notifications Row */}
                  <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                      <div className="flex items-center gap-3">
                          <FiBell className="text-gray-400" />
                          <span className="text-sm font-bold text-gray-700">Email Notifications</span>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" name="toggle" id="toggle-notif" checked={formData.notifications} onChange={() => setFormData({...formData, notifications: !formData.notifications})} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-5" />
                          <label htmlFor="toggle-notif" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${formData.notifications ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                      </div>
                  </div>

                  {/* Dark Mode Row */}
                  <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                      <div className="flex items-center gap-3">
                          <FiMoon className="text-gray-400" />
                          <span className="text-sm font-bold text-gray-700">Dark Mode</span>
                      </div>
                      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                          <input type="checkbox" name="toggle" id="toggle-dark" checked={formData.darkMode} onChange={() => setFormData({...formData, darkMode: !formData.darkMode})} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-5" />
                          <label htmlFor="toggle-dark" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${formData.darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}></label>
                      </div>
                  </div>

                  {/* Logout Row (Optional Button) */}
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <FiUser className="text-red-400" />
                          <span className="text-sm font-bold text-red-500">Log Out</span>
                      </div>
                      <button 
                         onClick={() => setShowLogoutModal(true)}
                         className="px-4 py-2 border border-red-100 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100"
                      >
                          Log Out
                      </button>
                  </div>

              </div>
          </div>
      </div>
    </div>
  );
};

export default AdminSettings;