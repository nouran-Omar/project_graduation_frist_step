import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchDoctorAppointments } from '../../services/doctorService';
import { FiCalendar, FiCheckCircle, FiClock, FiCoffee, FiXCircle, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const DoctorAppointments = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('Upcoming');
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctorAppointments().then(setData);
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Schedule...</div>;

  return (
    <div className="pb-12 animate-fade-in font-sans">
      
      {/* 1. Page Header */}
      <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
             Appointments <FiCalendar className="text-lg" />
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage and view all your scheduled visits easily.</p>
      </div>

      {/* 2. Top Stats & Calendar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Left: Stats Cards */}
          <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                  {/* Upcoming Card */}
                  <div className="bg-white flex-1 p-6 rounded-[30px] shadow-sm border border-gray-100 flex items-center gap-4">
                      <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                          <FiCalendar className="text-2xl" />
                      </div>
                      <div>
                          <p className="text-xs text-gray-500 font-bold mb-1">Upcoming Appointments</p>
                          <h3 className="text-3xl font-bold text-blue-600">{data.stats.upcoming}</h3>
                      </div>
                  </div>
                  {/* Completed Card */}
                  <div className="bg-white flex-1 p-6 rounded-[30px] shadow-sm border border-gray-100 flex items-center gap-4">
                      <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
                          <FiCheckCircle className="text-2xl" />
                      </div>
                      <div>
                          <p className="text-xs text-gray-500 font-bold mb-1">Completed Appointments</p>
                          <h3 className="text-3xl font-bold text-purple-600">{data.stats.completed}</h3>
                      </div>
                  </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-4">
                  <button 
                    onClick={() => setActiveTab('Upcoming')}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${activeTab === 'Upcoming' ? 'bg-[#3b36db] text-white shadow-blue-200' : 'bg-white text-gray-500 border border-gray-100'}`}
                  >
                      Upcoming
                  </button>
                  <button 
                    onClick={() => setActiveTab('Completed')}
                    className={`px-8 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${activeTab === 'Completed' ? 'bg-[#3b36db] text-white shadow-blue-200' : 'bg-white text-gray-500 border border-gray-100'}`}
                  >
                      Completed
                  </button>
              </div>
          </div>

          {/* Right: Mini Calendar (Static UI for matching design) */}
          <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-gray-800 text-sm">JANUARY 2026</h4>
                  <div className="flex gap-2 text-gray-400">
                      <FiChevronLeft className="cursor-pointer hover:text-gray-600" />
                      <FiChevronRight className="cursor-pointer hover:text-gray-600" />
                  </div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-bold text-gray-400 mb-2">
                  <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-gray-600">
                  <span className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md">1</span>
                  <span className="w-7 h-7 flex items-center justify-center">2</span>
                  <span className="w-7 h-7 flex items-center justify-center">3</span>
                  <span className="w-7 h-7 flex items-center justify-center">4</span>
                  <span className="w-7 h-7 flex items-center justify-center">5</span>
                  <span className="w-7 h-7 flex items-center justify-center">6</span>
                  <span className="w-7 h-7 flex items-center justify-center">7</span>
                  {/* ... Rest of dates simulated */}
                  <span className="w-7 h-7 flex items-center justify-center">8</span>
                  <span className="w-7 h-7 flex items-center justify-center">9</span>
                  <span className="w-7 h-7 flex items-center justify-center">10</span>
                  <span className="w-7 h-7 flex items-center justify-center">11</span>
                  <span className="w-7 h-7 flex items-center justify-center">12</span>
                  <span className="w-7 h-7 flex items-center justify-center">13</span>
                  <span className="w-7 h-7 flex items-center justify-center">14</span>
              </div>
          </div>
      </div>

      {/* 3. Timeline Section */}
      <div className="relative pl-4">
          {/* Vertical Line */}
          <div className="absolute left-[28px] top-4 bottom-10 w-[2px] bg-gray-200"></div>

          <div className="space-y-8">
              {data.timeline.map((item) => (
                  <div key={item.id} className="relative flex gap-8">
                      
                      {/* Time Bubble / Icon */}
                      <div className="relative z-10 flex-shrink-0">
                          {item.type === 'break' ? (
                              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 shadow-sm mt-4">
                                  <FiCoffee className="text-lg" />
                              </div>
                          ) : (
                              <div className="w-10 h-10 bg-[#1e1b4b] rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md ring-4 ring-gray-50">
                                  {item.time}
                              </div>
                          )}
                      </div>

                      {/* Content Card */}
                      <div className="flex-1">
                          {item.type === 'break' ? (
                              <div className="bg-gray-100 rounded-2xl p-4 flex items-center gap-3 mt-4">
                                  <FiCoffee className="text-gray-400" />
                                  <span className="text-sm font-bold text-gray-600">Break Time</span>
                                  <span className="text-xs text-gray-400">{item.duration}</span>
                              </div>
                          ) : (
                              <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between hover:shadow-lg transition-shadow">
                                  {/* Patient Info */}
                                  <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                                      <img src={item.img} alt={item.patient} className="w-14 h-14 rounded-full object-cover" />
                                      <div>
                                          <div className="flex items-center gap-2 mb-1">
                                              <h4 className="font-bold text-gray-900">{item.patient}</h4>
                                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${item.tagColor}`}>{item.tag}</span>
                                          </div>
                                          <p className="text-xs text-gray-500">Today • {item.room}</p>
                                      </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex flex-col items-end gap-3">
                                      <button className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors">
                                          <FiXCircle /> Cancel Appointment
                                      </button>
                                      <button 
                                        onClick={() => navigate('/doctor/patients/1')} // Assuming ID 1 for demo
                                        className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:gap-2 transition-all"
                                      >
                                          View Record <FiArrowRight />
                                      </button>
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
              ))}
          </div>
      </div>

    </div>
  );
};

export default DoctorAppointments;