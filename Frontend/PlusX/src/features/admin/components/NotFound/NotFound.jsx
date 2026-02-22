import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowSmallLeft } from "react-icons/hi2";
import styles from './NotFound.module.css';

const astronautImg = '/image/Astronaut.svg';

const NotFound = () => {
  return (
    <div className="fixed inset-0 min-h-screen w-full bg-white flex items-center justify-center font-inter z-[9999]">
      <div className="text-center px-6">
        
        {/* الجزء الخاص بالرسمة (404 مع رائد الفضاء) */}
        <div className="relative mb-10 flex justify-center items-center">
          {/* لو عندك الصورة جاهزة حطيها هنا، لو مش عندك تقدري تستخدمي placeholder */}
          <img 
            src={astronautImg} 
            alt="404 Astronaut" 
            className="max-w-[350px] md:max-w-[500px] h-auto object-contain"
          />
        </div>

        {/* النصوص التوضيحية مطابق للصورة بالظبط */}
        <h2 className="text-[28px] md:text-[32px] font-extrabold text-[#010218] mb-3">
          Page Not Found
        </h2>
        
        <p className="text-[#64748B] text-[15px] md:text-[16px] max-w-[400px] mx-auto leading-relaxed mb-10">
          This page doesn't exist or was removed! <br />
          We suggest you go back to home.
        </p>

        {/* زرار العودة للوحة التحكم */}
        <Link 
          to="/admin/dashboard" 
          className="bg-[#333CF5] hover:bg-[#252CBF] text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-[#333CF5]/20 transition-all active:scale-95 inline-flex items-center gap-2"
        >
          <HiArrowSmallLeft className="text-xl" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;