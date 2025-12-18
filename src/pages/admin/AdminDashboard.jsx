import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchAdminDashboardData } from '../../services/adminService';
// الأيقونات
import { FiPlus, FiUser, FiUsers, FiUserPlus, FiActivity } from "react-icons/fi";
import { FaUserMd, FaHeartbeat } from "react-icons/fa";

const AdminDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAdminDashboardData().then(setData);
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center text-blue-800 font-bold animate-pulse">Loading Admin Panel...</div>;

  return (
    <div className="pb-12 animate-fade-in font-sans space-y-8">
      
      {/* 1. Welcome Banner (Blue) */}
      <div className="bg-blue-600 rounded-[30px] p-8 text-white shadow-xl shadow-blue-200 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
          
          <div className="relative z-10 mb-6 md:mb-0">
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  Welcome Back, {data.adminName} 👋
              </h1>
              <p className="text-blue-100 text-sm opacity-90">Manage doctors and patients across the PulseX platform.</p>
          </div>

          <div className="flex gap-4 relative z-10">
              <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white hover:text-blue-600 transition-all flex items-center gap-2">
                  <FiPlus className="text-lg" /> Add Doctor
              </button>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2">
                  <FiPlus className="text-lg" /> Add Patient
              </button>
          </div>
      </div>

      {/* 2. Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Doctors */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                      <FaUserMd className="text-2xl" />
                  </div>
                  <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-full font-bold">+12%</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{data.stats.totalDoctors}</h3>
              <p className="text-gray-400 text-xs font-medium">Total Doctors</p>
          </motion.div>

          {/* Total Patients */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                      <FiUsers className="text-2xl" />
                  </div>
                  <span className="text-[10px] bg-green-50 text-green-600 px-2 py-1 rounded-full font-bold">+24%</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{data.stats.totalPatients.toLocaleString()}</h3>
              <p className="text-gray-400 text-xs font-medium">Total Patients</p>
          </motion.div>

          {/* New Doctors */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                      <FiUserPlus className="text-2xl" />
                  </div>
                  <span className="text-xs text-gray-400">Last 7 days</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{data.stats.newDoctors}</h3>
              <p className="text-gray-400 text-xs font-medium">New Doctors</p>
          </motion.div>

          {/* New Patients */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                      <FaHeartbeat className="text-2xl" />
                  </div>
                  <span className="text-xs text-gray-400">Last 7 days</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{data.stats.newPatients}</h3>
              <p className="text-gray-400 text-xs font-medium">New Patients</p>
          </motion.div>
      </div>

      {/* 3. Recent Lists (Side by Side) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Doctors List */}
          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-bold text-gray-900">Recent Doctors</h3>
                  <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>
              </div>
              <div className="space-y-6">
                  {data.recentDoctors.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                          <div className="flex items-center gap-4">
                              <img src={doc.img} alt={doc.name} className="w-12 h-12 rounded-full object-cover" />
                              <div>
                                  <h4 className="text-sm font-bold text-gray-900">{doc.name}</h4>
                                  <p className="text-[10px] text-gray-500">{doc.email}</p>
                              </div>
                          </div>
                          <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                              Edit
                          </button>
                      </div>
                  ))}
              </div>
          </div>

          {/* Recent Patients List */}
          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-bold text-gray-900">Recent Patients</h3>
                  <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>
              </div>
              <div className="space-y-6">
                  {data.recentPatients.map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                          <div className="flex items-center gap-4">
                              <img src={patient.img} alt={patient.name} className="w-12 h-12 rounded-full object-cover" />
                              <div>
                                  <h4 className="text-sm font-bold text-gray-900">{patient.name}</h4>
                                  <p className="text-[10px] text-gray-500">{patient.email}</p>
                              </div>
                          </div>
                          <button className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
                              Edit
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      </div>

    </div>
  );
};

export default AdminDashboard;