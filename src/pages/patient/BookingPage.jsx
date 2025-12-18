import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // استيراد useNavigate
import { fetchDoctorSlots } from '../../services/patientService';
import { motion } from 'framer-motion';
// الأيقونات
import { FiCalendar, FiClock, FiMapPin, FiStar, FiChevronLeft, FiChevronRight, FiCreditCard } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

const BookingPage = () => {
  const { id } = useParams(); // ID الدكتور من الرابط
  const navigate = useNavigate(); // تفعيل أداة التنقل
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(15); // افتراضياً يوم 15
  const [selectedTime, setSelectedTime] = useState("05:30 PM"); // افتراضياً

  useEffect(() => {
    // جلب بيانات الدكتور والمواعيد
    fetchDoctorSlots(id).then(setData);
  }, [id]);

  // --- دالة التأكيد والانتقال للدفع ---
  const handleConfirmClick = () => {
    // هنا بنجمع البيانات ونبعتها لصفحة الدفع
    navigate('/patient/payment', { 
        state: { 
            doctor: data.doctor, 
            date: `October ${selectedDate}, 2025`, // التاريخ المختار
            time: selectedTime 
        } 
    });
  };

  if (!data) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Schedule...</div>;

  return (
    <div className="pb-12 animate-fade-in font-sans relative min-h-screen">
      
      {/* Container Card */}
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
        
        {/* 1. Left Sidebar (Doctor Info & Steps) */}
        <div className="w-full lg:w-1/3 p-8 border-r border-gray-100 flex flex-col">
            
            {/* Doctor Profile */}
            <div className="mb-10">
                <img src={data.doctor.image} alt={data.doctor.name} className="w-20 h-20 rounded-full object-cover mb-4 shadow-sm" />
                <p className="text-xs text-gray-500 font-medium">{data.doctor.specialty}</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{data.doctor.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                    <FiStar className="text-yellow-400 fill-current" />
                    <span className="font-bold text-gray-800">{data.doctor.rating}</span>
                    <span className="text-gray-400 text-xs">({data.doctor.reviews} reviews)</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                    ${data.doctor.price} <span className="text-xs text-gray-400 font-normal">/ session</span>
                </div>
            </div>

            {/* Vertical Timeline Steps */}
            <div className="flex-1 space-y-8 relative">
                {/* الخط المنقط */}
                <div className="absolute left-[15px] top-8 bottom-8 w-0.5 border-l-2 border-dashed border-blue-200"></div>

                {/* Step 1: Date (Active) */}
                <div className="relative flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center z-10 shadow-lg shadow-blue-200">
                        <FiCalendar />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="text-sm font-bold text-blue-600">{selectedDate} Oct, 2025</p>
                    </div>
                </div>

                {/* Step 2: Time (Selected) */}
                <div className="relative flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${selectedTime ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-200 text-gray-500'}`}>
                        <FiClock />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Time</p>
                        <p className={`text-sm font-bold ${selectedTime ? 'text-blue-600' : 'text-gray-600'}`}>{selectedTime || 'Select Time'}</p>
                    </div>
                </div>

                 {/* Step 3: Payment (Pending) */}
                 <div className="relative flex items-center gap-4 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center z-10">
                        <FiCreditCard />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400">Payment Type</p>
                        <p className="text-sm font-bold text-gray-600">--</p>
                    </div>
                </div>
            </div>

            {/* Location Box */}
            <div className="mt-8 bg-gray-50 p-4 rounded-2xl flex items-center gap-3 text-gray-600 text-sm font-medium">
                <FiMapPin className="text-lg" /> {data.doctor.location}
            </div>
        </div>

        {/* 2. Right Content (Calendar & Time) */}
        <div className="w-full lg:w-2/3 p-8 lg:p-12 relative">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Select date & time</h2>

            <div className="flex flex-col xl:flex-row gap-12">
                
                {/* Calendar Section */}
                <div className="flex-1">
                    {/* Month Navigator */}
                    <div className="flex items-center justify-between mb-6">
                        <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100"><FiChevronLeft /></button>
                        <h3 className="font-bold text-lg text-gray-800">October {selectedDate}</h3>
                        <button className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md"><FiChevronRight /></button>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-y-6 gap-x-2 text-center mb-8">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                            <span key={d} className="text-xs text-gray-400 font-medium mb-2">{d}</span>
                        ))}
                        
                        {/* Days Logic */}
                        {data.calendarDays.map((d, i) => (
                            <button 
                                key={i}
                                disabled={d.disabled}
                                onClick={() => setSelectedDate(d.day)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all mx-auto
                                    ${d.day === selectedDate 
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                        : d.disabled ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'
                                    }
                                `}
                            >
                                {d.day}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Time Slots Section */}
                <div className="w-full xl:w-64 border-l border-gray-100 xl:pl-12 pt-4 xl:pt-0">
                    <h4 className="text-sm font-bold text-gray-500 mb-6">Monday, {selectedDate}. October</h4>
                    <div className="space-y-4">
                        {data.availableTimeSlots.map((time) => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`w-full py-3 px-6 rounded-full text-sm font-bold border transition-all flex items-center gap-3
                                    ${selectedTime === time 
                                        ? 'border-blue-600 text-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                                        : 'border-gray-200 text-gray-400 hover:border-blue-300'
                                    }
                                `}
                            >
                                {/* Radio Circle */}
                                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedTime === time ? 'border-blue-600' : 'border-gray-300'}`}>
                                    {selectedTime === time && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                                </div>
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Confirm Button (Updated Logic) */}
            <div className="mt-12 flex justify-center">
                <button 
                    onClick={handleConfirmClick}
                    className="bg-blue-600 text-white px-12 py-4 rounded-full font-bold text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all"
                >
                    Confirm Appointment
                </button>
            </div>

            {/* Floating Robot */}
            <div className="absolute bottom-8 right-8 animate-bounce cursor-pointer z-50">
                <span className="bg-cyan-400 text-white text-[10px] px-2 py-0.5 rounded-full absolute -top-2 -right-2 font-bold z-10">Hi!</span>
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    <RiRobot2Line className="text-2xl" />
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default BookingPage;