import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchDoctorDashboardData } from '../../services/doctorService';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
// الأيقونات
import { FiTrendingUp, FiTrendingDown, FiMoreHorizontal, FiArrowRight, FiCalendar } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

// مكون مخصص للـ Tooltip عشان يطلع زي الصورة (أزرق ومربع)
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#4F46E5] text-white p-3 rounded-xl shadow-xl border-none text-center min-w-[80px]">
        <p className="text-[10px] opacity-80 mb-1">Visits</p>
        <p className="text-xl font-bold">{payload[0].value}</p>
        {/* السهم الصغير تحت الـ Tooltip */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-3 h-3 bg-[#4F46E5] rotate-45"></div>
      </div>
    );
  }
  return null;
};

const DoctorDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDoctorDashboardData().then(setData);
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading PulseX Dashboard...</div>;

  return (
    <div className="pb-12 animate-fade-in font-sans space-y-6">
      
      {/* 1. HERO BANNER (Pixel Perfect) */}
      <div className="relative w-full h-[280px] bg-gradient-to-r from-[#AEE2FF] via-[#93C5FD] to-[#4F46E5] rounded-[40px] p-8 overflow-hidden shadow-xl shadow-blue-100/50 flex flex-col justify-center">
          
          <div className="relative z-10 w-full md:w-2/3 pl-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                  Good Morning <span className="text-[#2563EB]">Dr. {data.doctorName}!</span>
              </h1>
              
              {/* Stats Cards Inside Banner */}
              <div className="flex gap-4">
                  {/* Total Patients */}
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl w-40 shadow-sm border border-white/50">
                      <p className="text-xs font-bold text-gray-600 mb-2">Total Patients</p>
                      <div className="flex items-end justify-between">
                          <span className="text-3xl font-bold text-[#4F46E5]">{data.stats.patients.value}</span>
                          <span className="bg-[#D1FAE5] text-[#059669] text-[10px] font-bold px-2 py-1 rounded-md flex items-center">
                              {data.stats.patients.trend} <FiTrendingUp className="ml-1" />
                          </span>
                      </div>
                  </div>
                  {/* Critical Cases */}
                  <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl w-40 shadow-sm border border-white/50">
                      <p className="text-xs font-bold text-gray-600 mb-2">Critical Cases</p>
                      <div className="flex items-end justify-between">
                          <span className="text-3xl font-bold text-[#4F46E5]">{data.stats.critical.value}</span>
                          <span className="bg-[#FEE2E2] text-[#DC2626] text-[10px] font-bold px-2 py-1 rounded-md flex items-center">
                              {data.stats.critical.trend} <FiTrendingDown className="ml-1" />
                          </span>
                      </div>
                  </div>
                   {/* Appointments */}
                   <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl w-40 shadow-sm border border-white/50">
                      <p className="text-xs font-bold text-gray-600 mb-2">Appointments</p>
                      <div className="flex items-end justify-between">
                          <span className="text-3xl font-bold text-[#4F46E5]">{data.stats.appointments.value}</span>
                          <span className="bg-[#D1FAE5] text-[#059669] text-[10px] font-bold px-2 py-1 rounded-md flex items-center">
                              {data.stats.appointments.trend} <FiTrendingUp className="ml-1" />
                          </span>
                      </div>
                  </div>
              </div>
          </div>

          {/* Doctor Image (Right Side) */}
          <div className="absolute right-0 bottom-0 h-full w-1/3 flex items-end justify-end pointer-events-none">
             <img 
                src="https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-portrait-of-a-beautiful-female-doctor-png-image_12530962.png" 
                alt="Dr. Noha" 
                className="h-[115%] object-contain mr-8 drop-shadow-[-10px_0_20px_rgba(0,0,0,0.1)]" 
             />
          </div>
      </div>

      {/* 2. MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* --- Weekly Overview Chart --- */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                  <h3 className="font-bold text-lg text-gray-800">Weekly Overview</h3>
                  <button className="text-gray-400 hover:text-gray-600"><FiMoreHorizontal size={24} /></button>
              </div>
              
              <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.chartData}>
                          <defs>
                              <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#C7D2FE" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                              </linearGradient>
                          </defs>
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11, dy: 10}} interval={0} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 11}} />
                          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#4F46E5', strokeWidth: 1, strokeDasharray: '5 5' }} />
                          <Area type="monotone" dataKey="visits" stroke="#818CF8" strokeWidth={4} fill="url(#colorVisits)" />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
          </div>

          {/* --- Patient Messages --- */}
          <div className="bg-white p-6 rounded-[40px] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-800 text-lg">Patient Messages</h3>
                  <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">3</span>
              </div>
              <div className="space-y-4">
                  {data.messages.map((msg) => (
                      <div key={msg.id} className="flex gap-3 p-3 bg-gray-50/50 hover:bg-gray-100 rounded-[20px] transition-all cursor-pointer relative group items-center">
                          <div className="relative">
                              <img src={msg.img} alt={msg.name} className="w-10 h-10 rounded-full object-cover" />
                              {/* Online Dot */}
                              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-baseline">
                                  <h4 className="text-sm font-bold text-gray-900">{msg.name}</h4>
                                  <span className="text-[10px] text-gray-400">{msg.time}</span>
                              </div>
                              <p className="text-[11px] text-gray-500 truncate mt-0.5">{msg.msg}</p>
                          </div>
                          {/* Close X (Visual only) */}
                          <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">X</div>
                      </div>
                  ))}
              </div>
              <button className="w-full mt-6 bg-[#4F46E5] text-white py-3.5 rounded-full text-xs font-bold hover:bg-[#4338ca] transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                  View All Messages <FiArrowRight />
              </button>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* 3. TODAY APPOINTMENTS (The Blue Card) */}
          <div className="bg-[#7B9AF3] text-white p-8 rounded-[40px] shadow-xl shadow-blue-200 relative overflow-hidden">
              <div className="flex justify-between items-center mb-8 relative z-10">
                  <h3 className="font-bold text-lg flex items-center gap-2">Today Appointments <FiCalendar /></h3>
              </div>

              <div className="space-y-6 relative z-10">
                  {/* Dashed Line */}
                  <div className="absolute left-[26px] top-6 bottom-6 w-[2px] border-l-2 border-dashed border-white/40"></div>
                  
                  {data.appointments.map((app, index) => (
                      <div key={app.id} className="relative flex items-center gap-6 z-10">
                          {/* Time */}
                          <div className="text-[10px] font-medium w-12 text-blue-100 text-right">{app.time.split(' ')[0]}</div>
                          
                          {/* Card */}
                          <div className={`flex-1 p-3 rounded-2xl flex items-center gap-3 shadow-sm border border-white/20 backdrop-blur-sm
                              ${index === 0 ? 'bg-[#F9A8D4] text-[#831843]' : // Pink
                                index === 1 ? 'bg-[#D1FAE5] text-[#064E3B]' : // Green
                                'bg-[#BFDBFE] text-[#1E3A8A]'}             // Light Blue
                          `}>
                              <img src={app.img} className="w-9 h-9 rounded-full object-cover" alt="pat" />
                              <div>
                                  <h4 className="text-xs font-bold">{app.name}</h4>
                                  <p className="text-[9px] opacity-80 flex items-center gap-1">⏰ {app.time}</p>
                              </div>
                          </div>
                      </div>
                  ))}
                  
                  {/* Break Time Button */}
                  <div className="flex justify-center ml-12">
                      <button className="bg-[#1e1b4b] text-white text-[10px] px-5 py-2 rounded-full font-bold shadow-md hover:scale-105 transition-transform">
                          Break Time
                      </button>
                  </div>
              </div>
          </div>

          {/* 4. CRITICAL PATIENTS */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-800 text-lg">Critical Patients</h3>
                  <button className="text-xs font-bold text-gray-500 hover:text-gray-900 flex items-center gap-1">View More <FiArrowRight /></button>
              </div>
              <div className="space-y-4">
                  {data.criticalPatients.map((patient) => (
                      <div key={patient.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-all group">
                          <div className="flex items-center gap-4">
                              <img src={patient.img} alt={patient.name} className="w-12 h-12 rounded-full object-cover" />
                              <div>
                                  <h4 className="text-sm font-bold text-gray-900">{patient.name}</h4>
                                  <p className="text-[10px] text-gray-400 font-medium">Oct 30</p>
                              </div>
                          </div>
                          
                          <div className="flex items-center gap-8">
                              <span className={`text-[10px] font-bold px-4 py-1.5 rounded-full border 
                                  ${patient.statusColor === 'green' ? 'bg-[#D1FAE5] text-[#059669] border-[#A7F3D0]' : 
                                    patient.statusColor === 'yellow' ? 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]' : 
                                    'bg-[#FEE2E2] text-[#DC2626] border-[#FECACA]'}`}
                              >
                                  {patient.status}
                              </span>
                              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-900 hover:text-white transition-all">
                                  <FiArrowRight />
                              </button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

      </div>

      {/* Floating Robot (AI Helper) */}
      <div className="fixed bottom-8 right-8 animate-bounce cursor-pointer z-50">
         <span className="bg-[#4F46E5] text-white text-[10px] px-3 py-1 rounded-full absolute -top-3 -right-2 font-bold z-10 shadow-md">AI Insights</span>
         <div className="w-14 h-14 bg-gradient-to-br from-[#4F46E5] to-[#818CF8] rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-300 hover:scale-110 transition-transform">
            <RiRobot2Line className="text-2xl" />
         </div>
      </div>

    </div>
  );
};

export default DoctorDashboard;