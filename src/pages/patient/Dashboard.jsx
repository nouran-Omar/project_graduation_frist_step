import React from 'react';
import { motion } from 'framer-motion';
// الأيقونات
import { FiActivity, FiHeart, FiCalendar, FiArrowRight } from "react-icons/fi";
import { FaHeartbeat, FaWalking, FaFire } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="pb-12 animate-fade-in font-sans">
      
      {/* 1. Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-[30px] p-8 text-white shadow-xl shadow-blue-200 mb-8 relative overflow-hidden"
      >
          <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Welcome Back, Mohamed! 👋</h1>
              <p className="text-blue-100 opacity-90">Here is your daily health update.</p>
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
      </motion.div>

      {/* 2. Health Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Heart Rate */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                  <FaHeartbeat className="text-2xl animate-pulse" />
              </div>
              <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Heart Rate</p>
                  <h3 className="text-2xl font-bold text-gray-800">72 <span className="text-sm font-normal text-gray-400">bpm</span></h3>
              </div>
          </motion.div>

          {/* Blood Pressure */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                  <FiActivity className="text-2xl" />
              </div>
              <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Blood Pressure</p>
                  <h3 className="text-2xl font-bold text-gray-800">120/80 <span className="text-sm font-normal text-gray-400">mmHg</span></h3>
              </div>
          </motion.div>

          {/* Steps */}
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                  <FaWalking className="text-2xl" />
              </div>
              <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">Daily Steps</p>
                  <h3 className="text-2xl font-bold text-gray-800">4,250 <span className="text-sm font-normal text-gray-400">steps</span></h3>
              </div>
          </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 3. Upcoming Appointments */}
          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg text-gray-800">Upcoming Appointments</h3>
                  <button className="text-blue-600 text-xs font-bold hover:underline">See All</button>
              </div>
              
              <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                      <div className="bg-white p-3 rounded-xl text-center min-w-[60px] shadow-sm">
                          <span className="block text-xs font-bold text-blue-600">OCT</span>
                          <span className="block text-xl font-bold text-gray-800">24</span>
                      </div>
                      <div>
                          <h4 className="font-bold text-gray-900 text-sm">Dr. Noha Salem</h4>
                          <p className="text-xs text-gray-500">Cardiologist • 10:00 AM</p>
                      </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent">
                       <div className="bg-white p-3 rounded-xl text-center min-w-[60px] shadow-sm">
                          <span className="block text-xs font-bold text-gray-400">NOV</span>
                          <span className="block text-xl font-bold text-gray-800">02</span>
                      </div>
                      <div>
                          <h4 className="font-bold text-gray-900 text-sm">Dr. Ahmed Ali</h4>
                          <p className="text-xs text-gray-500">Dentist • 02:30 PM</p>
                      </div>
                  </div>
              </div>
          </div>

          {/* 4. Quick Actions */}
          <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg text-gray-800 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all text-left group">
                      <FiCalendar className="text-2xl mb-2 text-gray-400 group-hover:text-blue-600" />
                      <span className="text-sm font-bold block">Book Appointment</span>
                  </button>
                  <button className="p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all text-left group">
                      <FiActivity className="text-2xl mb-2 text-gray-400 group-hover:text-blue-600" />
                      <span className="text-sm font-bold block">View Records</span>
                  </button>
                  <button className="p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all text-left group">
                      <FiHeart className="text-2xl mb-2 text-gray-400 group-hover:text-blue-600" />
                      <span className="text-sm font-bold block">Heart Risk Test</span>
                  </button>
                  <button className="p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 hover:text-blue-600 transition-all text-left group">
                      <FaFire className="text-2xl mb-2 text-gray-400 group-hover:text-blue-600" />
                      <span className="text-sm font-bold block">Daily Tips</span>
                  </button>
              </div>
          </div>

      </div>

    </div>
  );
};

export default Dashboard;