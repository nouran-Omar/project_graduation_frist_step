import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAppointments } from '../../services/patientService';
// الأيقونات
import { FiCalendar, FiClock, FiMapPin, FiCreditCard, FiXCircle, FiCheck, FiCheckCircle } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

const Appointments = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming'); // للتحكم في التابات (upcoming أو completed)

  useEffect(() => {
    fetchAppointments().then(setData);
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Schedule...</div>;

  // تحديد القائمة اللي هتتعرض بناءً على التاب المختار
  const displayedAppointments = activeTab === 'upcoming' ? data.upcoming : data.completed;

  return (
    <div className="pb-12 animate-fade-in font-sans relative min-h-screen">
      
      {/* 1. Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          My Appointments <FiCalendar className="text-lg" />
        </h1>
        <p className="text-gray-500 text-sm mt-1">View your scheduled and completed appointments.</p>
      </motion.div>

      {/* 2. Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        {/* Upcoming Count Card */}
        <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 flex items-center gap-6 relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-500 text-3xl shadow-sm">
                <FiCalendar />
            </div>
            <div>
                <p className="text-gray-500 font-medium mb-1">Upcoming Appointments</p>
                <h3 className="text-4xl font-bold text-blue-600">{data.stats.upcomingCount}</h3>
            </div>
            {/* زخرفة خلفية */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-green-50 rounded-full opacity-50"></div>
        </div>

        {/* Completed Count Card */}
        <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 flex items-center gap-6 relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 text-3xl shadow-sm">
                <FiCheckCircle />
            </div>
            <div>
                <p className="text-gray-500 font-medium mb-1">Completed Appointments</p>
                <h3 className="text-4xl font-bold text-purple-600">{data.stats.completedCount}</h3>
            </div>
             {/* زخرفة خلفية */}
             <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-purple-50 rounded-full opacity-50"></div>
        </div>
      </div>

      {/* 3. Tabs (Upcoming / Completed) */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'upcoming' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Upcoming
            {activeTab === 'upcoming' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full" />}
          </button>
          
          <button 
            onClick={() => setActiveTab('completed')}
            className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'completed' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Completed
            {activeTab === 'completed' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full" />}
          </button>
      </div>

      {/* 4. Appointments List */}
      <div className="space-y-6">
        <AnimatePresence mode='wait'>
            {displayedAppointments.length > 0 ? (
                displayedAppointments.map((app) => (
                    <motion.div 
                        key={app.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-md transition-shadow group"
                    >
                        {/* Doctor Image */}
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
                            <img src={app.img} alt={app.doctorName} className="w-full h-full object-cover" />
                        </div>

                        {/* Details Section */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                            
                            {/* Doctor Info */}
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg">{app.doctorName}</h3>
                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                    <FiMapPin /> {app.specialty}
                                </p>
                            </div>

                            {/* Date & Time */}
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                    <FiCalendar className="text-blue-500" /> {app.date}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 font-medium mt-1">
                                    <FiClock className="text-blue-500" /> {app.time}
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                                <FiCreditCard className="text-gray-400" /> {app.payment}
                            </div>
                        </div>

                        {/* Action Button (Cancel or Status) */}
                        <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 text-right">
                            {activeTab === 'upcoming' ? (
                                <button className="flex items-center gap-2 text-red-500 hover:text-red-700 font-bold text-sm bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors w-full md:w-auto justify-center">
                                    <FiXCircle /> Cancel Appointment
                                </button>
                            ) : (
                                <span className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-full w-full md:w-auto justify-center">
                                    <FiCheck /> Completed
                                </span>
                            )}
                        </div>

                    </motion.div>
                ))
            ) : (
                <div className="text-center py-20 text-gray-400">
                    <p>No appointments found in this category.</p>
                </div>
            )}
        </AnimatePresence>
      </div>

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

export default Appointments;