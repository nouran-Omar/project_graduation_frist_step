import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchSettingsData, updateProfile } from '../../services/patientService';
// الأيقونات
import { FiUser, FiMail, FiPhone, FiCalendar, FiUpload, FiSettings, FiLock, FiBell, FiMoon, FiActivity, FiCheck, FiX, FiEye, FiEyeOff, FiChevronDown, FiHeart } from "react-icons/fi";
import { FaRulerVertical, FaWeight } from "react-icons/fa";
import { MdBloodtype } from "react-icons/md";
import { RiRobot2Line } from "react-icons/ri";

const Settings = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // States for UI Controls
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  // State for Modes
  const [isEditingHealth, setIsEditingHealth] = useState(false); // 👈 للتحكم في وضع التعديل

  // State for Modal & Toast
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [toast, setToast] = useState({ show: false, title: '', message: '' });

  // Password Visibility
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false });

  useEffect(() => {
    fetchSettingsData().then((res) => {
        setData(res);
        setNotifications(res.preferences.notifications);
        setDarkMode(res.preferences.darkMode);
    });
  }, []);

  const showSuccessToast = (title, message) => {
      setToast({ show: true, title, message });
      setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  const handleSaveGeneral = async () => {
      setLoading(true);
      await updateProfile(data.personalInfo);
      setLoading(false);
      showSuccessToast("Saved Successfully", "Personal information updated successfully.");
  };

  const handleSaveHealth = async () => {
      // هنا بنحفظ بيانات الصحة ونرجع لوضع القراءة
      setLoading(true);
      await updateProfile(data.healthInfo); // محاكاة
      setLoading(false);
      setIsEditingHealth(false); // 👈 رجعنا لوضع الكروت
      showSuccessToast("Health Data Updated", "Your health metrics have been saved.");
  };

  const handleSavePassword = () => {
      setShowPasswordModal(false);
      setTimeout(() => {
          showSuccessToast("Password Changed Successfully", "Your password has been updated securely.");
      }, 500);
  };

  if (!data) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Profile...</div>;

  return (
    <div className="pb-12 animate-fade-in font-sans relative min-h-screen">
      
      {/* --- Notification Toast --- */}
      <AnimatePresence>
        {toast.show && (
            <motion.div 
                initial={{ opacity: 0, y: -20, x: 20 }} 
                animate={{ opacity: 1, y: 0, x: 0 }} 
                exit={{ opacity: 0, y: -20, x: 20 }}
                className="fixed top-24 right-8 z-50 bg-white w-[380px] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-50"
            >
                <div className="flex items-start gap-4 p-5 relative">
                    <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-md shadow-green-200">
                        <FiCheck className="text-lg font-bold" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm mb-1">{toast.title}</h4>
                        <p className="text-[11px] text-gray-400 leading-relaxed w-5/6">{toast.message}</p>
                    </div>
                </div>
                <div className="h-1 w-full bg-[#10B981]"></div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Settings & Profile <FiSettings className="text-lg animate-spin-slow" />
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage your personal details, health data, and account preferences.</p>
      </motion.div>

      <div className="space-y-8">
          
          {/* --- 1. Personal Information --- */}
          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
              <h3 className="text-blue-900 font-bold flex items-center gap-2 mb-6">
                  <FiUser className="text-blue-600" /> Personal Information
              </h3>

              <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-100">
                      <img src={data.personalInfo.img} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div>
                      <p className="font-bold text-gray-800 text-sm">Profile Photo</p>
                      <p className="text-[10px] text-gray-400 mb-3">JPG, PNG or GIF. Max size 5MB</p>
                      <button className="bg-gray-50 text-gray-600 px-4 py-2 rounded-full text-xs font-bold border border-gray-200 hover:bg-gray-100 flex items-center gap-2 transition-all">
                          <FiUpload /> Upload New Photo
                      </button>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 flex items-center gap-1"><FiUser /> First Name</label>
                      <input type="text" defaultValue={data.personalInfo.firstName} className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 flex items-center gap-1"><FiUser /> Last Name</label>
                      <input type="text" defaultValue={data.personalInfo.lastName} className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 flex items-center gap-1"><FiMail /> Email Address</label>
                      <input type="email" defaultValue={data.personalInfo.email} className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-600 flex items-center gap-1"><FiPhone /> Phone Number</label>
                      <input type="tel" defaultValue={data.personalInfo.phone} className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all" />
                  </div>
                  <div className="col-span-1 md:col-span-2 space-y-2">
                      <label className="text-xs font-bold text-gray-600 flex items-center gap-1"><FiCalendar /> Date of Birth</label>
                      <input type="date" defaultValue={data.personalInfo.dob} className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all text-gray-600" />
                  </div>
              </div>

              <div className="flex justify-end">
                  <button onClick={handleSaveGeneral} disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50">
                      {loading ? 'Saving...' : 'Save Personal Info'}
                  </button>
              </div>
          </div>

          {/* --- 2. Health Information Section (Dynamic Switching) --- */}
          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
              <h3 className="text-blue-900 font-bold flex items-center gap-2 mb-6">
                  <FiActivity className="text-blue-600" /> Health Information
              </h3>
              
              {!isEditingHealth ? (
                  /* --- VIEW MODE: Cards (الشكل العام) --- */
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                          <div className="bg-gray-50 p-5 rounded-[20px]">
                              <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1 mb-2"><FaRulerVertical /> Height</p>
                              <h4 className="text-xl font-bold text-gray-800">{data.healthInfo.height}</h4>
                          </div>
                          <div className="bg-gray-50 p-5 rounded-[20px]">
                              <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1 mb-2"><FaWeight /> Weight</p>
                              <h4 className="text-xl font-bold text-gray-800">{data.healthInfo.weight}</h4>
                          </div>
                          <div className="bg-gray-50 p-5 rounded-[20px]">
                              <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1 mb-2"><MdBloodtype /> Blood Pressure</p>
                              <h4 className="text-xl font-bold text-gray-800">{data.healthInfo.bloodPressure}</h4>
                          </div>
                          <div className="bg-gray-50 p-5 rounded-[20px]">
                              <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1 mb-2">🩸 Blood Sugar</p>
                              <h4 className="text-xl font-bold text-gray-800">{data.healthInfo.bloodSugar}</h4>
                          </div>
                          <div className="bg-gray-50 p-5 rounded-[20px]">
                              <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1 mb-2">🧪 Blood Count</p>
                              <h4 className="text-xl font-bold text-gray-800">{data.healthInfo.bloodCount}</h4>
                          </div>
                          <div className="bg-gray-50 p-5 rounded-[20px]">
                              <p className="text-[10px] text-gray-400 font-bold flex items-center gap-1 mb-2"><FiHeart /> Heart Rate</p>
                              <h4 className="text-xl font-bold text-gray-800">{data.healthInfo.heartRate}</h4>
                          </div>
                      </div>
                      <button 
                        onClick={() => setIsEditingHealth(true)} 
                        className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full text-sm font-bold hover:bg-blue-50 transition-all"
                      >
                          Update Health Data
                      </button>
                  </motion.div>
              ) : (
                  /* --- EDIT MODE: Form (لما تضغطي Update) --- */
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="text-center mb-8">
                          <h4 className="text-lg font-bold text-gray-900">Updating Health Data</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-8">
                          {/* Left Column */}
                          <div className="space-y-6">
                              <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-800">Heart Rate <span className="text-red-500">*</span></label>
                                  <div className="relative">
                                      <select className="w-full bg-white border border-gray-200 rounded-full px-6 py-3.5 text-sm appearance-none focus:border-blue-500 outline-none text-gray-500">
                                          <option>Select your heart rate range</option>
                                          <option selected>72 bpm</option>
                                          <option>80 bpm</option>
                                      </select>
                                      <FiChevronDown className="absolute right-6 top-4 text-gray-400" />
                                  </div>
                              </div>
                              <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-800">Blood Pressure <span className="text-red-500">*</span></label>
                                  <div className="relative">
                                      <select className="w-full bg-white border border-gray-200 rounded-full px-6 py-3.5 text-sm appearance-none focus:border-blue-500 outline-none text-gray-500">
                                          <option>Select range</option>
                                          <option selected>120/80</option>
                                      </select>
                                      <FiChevronDown className="absolute right-6 top-4 text-gray-400" />
                                  </div>
                              </div>
                              <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-800">Blood Count <span className="text-red-500">*</span></label>
                                  <div className="relative">
                                      <select className="w-full bg-white border border-gray-200 rounded-full px-6 py-3.5 text-sm appearance-none focus:border-blue-500 outline-none text-gray-500">
                                          <option>Select range</option>
                                          <option selected>14.5 g/dL</option>
                                      </select>
                                      <FiChevronDown className="absolute right-6 top-4 text-gray-400" />
                                  </div>
                              </div>
                          </div>
                          {/* Right Column */}
                          <div className="space-y-6">
                              <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-800">Height <span className="text-red-500">*</span></label>
                                  <input type="text" defaultValue="175" className="w-full bg-white border border-gray-200 rounded-full px-6 py-3.5 text-sm outline-none focus:border-blue-500" />
                              </div>
                              <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-800">Blood Sugar <span className="text-red-500">*</span></label>
                                  <input type="text" defaultValue="95" className="w-full bg-white border border-gray-200 rounded-full px-6 py-3.5 text-sm outline-none focus:border-blue-500" />
                              </div>
                              <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-800">Weight <span className="text-red-500">*</span></label>
                                  <input type="text" defaultValue="75" className="w-full bg-white border border-gray-200 rounded-full px-6 py-3.5 text-sm outline-none focus:border-blue-500" />
                              </div>
                          </div>
                      </div>
                      <div className="flex justify-center gap-4">
                          <button onClick={() => setIsEditingHealth(false)} className="px-8 py-3.5 rounded-full border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50">Cancel</button>
                          <button onClick={handleSaveHealth} className="bg-blue-600 text-white px-12 py-3.5 rounded-full font-bold text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all">Save Changes</button>
                      </div>
                  </motion.div>
              )}
          </div>

          {/* --- 3. Account Settings --- */}
          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
              <h3 className="text-blue-900 font-bold flex items-center gap-2 mb-6">
                  <FiSettings className="text-blue-600" /> Account Settings
              </h3>
              <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                      <div className="flex items-center gap-3">
                          <FiLock className="text-gray-400" /><span className="text-sm font-bold text-gray-800">Change Password</span>
                      </div>
                      <button onClick={() => setShowPasswordModal(true)} className="text-blue-600 text-xs font-bold hover:underline">Change</button>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                      <div className="flex items-center gap-3">
                          <FiBell className="text-gray-400" /><span className="text-sm font-bold text-gray-800">Email Notifications</span>
                      </div>
                      <div onClick={() => setNotifications(!notifications)} className={`w-10 h-5 rounded-full cursor-pointer relative transition-colors ${notifications ? 'bg-blue-600' : 'bg-gray-300'}`}>
                          <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${notifications ? 'left-6' : 'left-1'}`}></div>
                      </div>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <FiMoon className="text-gray-400" /><span className="text-sm font-bold text-gray-800">Dark Mode</span>
                      </div>
                      <div onClick={() => setDarkMode(!darkMode)} className={`w-10 h-5 rounded-full cursor-pointer relative transition-colors ${darkMode ? 'bg-blue-600' : 'bg-gray-300'}`}>
                          <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${darkMode ? 'left-6' : 'left-1'}`}></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* --- Password Modal --- */}
      <AnimatePresence>
        {showPasswordModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPasswordModal(false)} className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[30px] p-8 w-full max-w-md relative z-10 shadow-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <div><h2 className="text-xl font-bold text-gray-900">Change Password</h2><p className="text-xs text-gray-500 mt-1">Update your password securely</p></div>
                        <button onClick={() => setShowPasswordModal(false)} className="text-gray-400 hover:text-gray-600"><FiX /></button>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 ml-1">Current Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                                <input type={showPass.current ? "text" : "password"} placeholder="Enter current password" class="w-full border border-gray-200 rounded-full py-3 pl-10 pr-10 text-sm focus:border-blue-500 outline-none" />
                                <button onClick={() => setShowPass({...showPass, current: !showPass.current})} className="absolute right-4 top-3.5 text-gray-400">{showPass.current ? <FiEyeOff /> : <FiEye />}</button>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 ml-1">New Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                                <input type={showPass.new ? "text" : "password"} placeholder="Enter new password" class="w-full border border-gray-200 rounded-full py-3 pl-10 pr-10 text-sm focus:border-blue-500 outline-none" />
                                <button onClick={() => setShowPass({...showPass, new: !showPass.new})} className="absolute right-4 top-3.5 text-gray-400">{showPass.new ? <FiEyeOff /> : <FiEye />}</button>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 ml-1">Confirm New Password</label>
                            <div className="relative">
                                <FiLock className="absolute left-4 top-3.5 text-gray-400 text-sm" />
                                <input type={showPass.confirm ? "text" : "password"} placeholder="Confirm new password" class="w-full border border-gray-200 rounded-full py-3 pl-10 pr-10 text-sm focus:border-blue-500 outline-none" />
                                <button onClick={() => setShowPass({...showPass, confirm: !showPass.confirm})} className="absolute right-4 top-3.5 text-gray-400">{showPass.confirm ? <FiEyeOff /> : <FiEye />}</button>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl space-y-2 mt-2">
                            <p className="text-[10px] text-gray-500 font-bold mb-2">Password Requirements:</p>
                            <div className="flex items-center gap-2 text-[10px] text-green-600"><FiCheck className="text-xs" /> At least 8 characters long</div>
                            <div className="flex items-center gap-2 text-[10px] text-green-600"><FiCheck className="text-xs" /> Contains uppercase and lowercase letters</div>
                            <div className="flex items-center gap-2 text-[10px] text-green-600"><FiCheck className="text-xs" /> Contains at least one number</div>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-8">
                        <button onClick={() => setShowPasswordModal(false)} className="flex-1 py-3 rounded-full border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50">Cancel</button>
                        <button onClick={handleSavePassword} className="flex-1 py-3 rounded-full bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700">Save Password</button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      {/* Floating Robot */}
      <div className="fixed bottom-8 right-8 animate-bounce cursor-pointer z-50">
         <span className="bg-cyan-400 text-white text-[10px] px-2 py-0.5 rounded-full absolute -top-2 -right-2 font-bold z-10">Hi!</span>
         <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110">
            <RiRobot2Line className="text-2xl" />
         </div>
      </div>

    </div>
  );
};

export default Settings;