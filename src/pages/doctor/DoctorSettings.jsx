import React, { useEffect, useState } from 'react';
import { fetchDoctorSettings } from '../../services/doctorService';
import { FiSettings, FiCamera, FiCalendar, FiMapPin, FiLock, FiBell, FiMoon, FiUser } from "react-icons/fi";

const DoctorSettings = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    dob: "", location: "", img: "",
    notifications: true, darkMode: false
  });

  useEffect(() => {
    fetchDoctorSettings().then(data => {
        setFormData(data);
        setLoading(false);
    });
  }, []);

  // التعامل مع تغيير البيانات
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // التعامل مع أزرار التبديل (Toggle)
  const handleToggle = (key) => {
    setFormData({ ...formData, [key]: !formData[key] });
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Settings...</div>;

  return (
    <div className="pb-12 animate-fade-in font-sans">
      
      {/* 1. Page Header */}
      <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
             Settings & Profile <FiSettings className="text-lg animate-spin-slow" />
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage your personal details, health data, and account preferences.</p>
      </div>

      <div className="space-y-8">
          
          {/* 2. Personal Information Card */}
          <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
                  <FiUser className="text-blue-600" /> Personal Information
              </h3>

              {/* Photo Upload */}
              <div className="flex items-center gap-6 mb-8">
                  <img src={formData.img} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm" />
                  <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1">Profile Photo</h4>
                      <p className="text-[10px] text-gray-400 mb-3">JPG, PNG or GIF. Max size 5MB</p>
                      <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full text-xs font-bold hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm">
                          <FiCamera /> Upload New Photo
                      </button>
                  </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  
                  {/* First Name */}
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 flex items-center gap-2"><FiUser /> First Name</label>
                      <input 
                        type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3.5 outline-none transition-all"
                      />
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 flex items-center gap-2"><FiUser /> Last Name</label>
                      <input 
                        type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3.5 outline-none transition-all"
                      />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 flex items-center gap-2">✉️ Email Address</label>
                      <input 
                        type="email" name="email" value={formData.email} onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3.5 outline-none transition-all"
                      />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 flex items-center gap-2">📞 Phone Number</label>
                      <input 
                        type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3.5 outline-none transition-all"
                      />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 flex items-center gap-2"><FiCalendar /> Date of Birth</label>
                      <div className="relative">
                          <input 
                            type="date" name="dob" value={formData.dob} onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3.5 outline-none transition-all"
                          />
                      </div>
                  </div>

                  {/* Location (New Field for Doctor) */}
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 flex items-center gap-2"><FiMapPin /> Location</label>
                      <input 
                        type="text" name="location" value={formData.location} onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3.5 outline-none transition-all"
                      />
                  </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                  <button className="bg-[#4F46E5] text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-blue-200 hover:bg-[#4338ca] transition-all">
                      Save Personal Info
                  </button>
              </div>
          </div>

          {/* 3. Account Settings Card */}
          <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
                  <FiSettings className="text-blue-600" /> Account Settings
              </h3>

              <div className="space-y-6">
                  
                  {/* Change Password */}
                  <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                      <div className="flex items-center gap-3">
                          <FiLock className="text-gray-400" />
                          <span className="text-sm font-bold text-gray-700">Change Password</span>
                      </div>
                      <button className="text-blue-600 text-xs font-bold hover:underline">Change</button>
                  </div>

                  {/* Email Notifications Toggle */}
                  <div className="flex items-center justify-between pb-6 border-b border-gray-50">
                      <div className="flex items-center gap-3">
                          <FiBell className="text-gray-400" />
                          <span className="text-sm font-bold text-gray-700">Email Notifications</span>
                      </div>
                      {/* Toggle Switch */}
                      <button 
                        onClick={() => handleToggle('notifications')}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${formData.notifications ? 'bg-blue-600' : 'bg-gray-200'}`}
                      >
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-sm ${formData.notifications ? 'left-7' : 'left-1'}`}></div>
                      </button>
                  </div>

                  {/* Dark Mode Toggle */}
                  <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                          <FiMoon className="text-gray-400" />
                          <span className="text-sm font-bold text-gray-700">Dark Mode</span>
                      </div>
                      {/* Toggle Switch */}
                      <button 
                        onClick={() => handleToggle('darkMode')}
                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${formData.darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
                      >
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-sm ${formData.darkMode ? 'left-7' : 'left-1'}`}></div>
                      </button>
                  </div>

              </div>
          </div>

      </div>

    </div>
  );
};

export default DoctorSettings;