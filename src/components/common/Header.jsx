import React from 'react';
import { FiSearch, FiBell, FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // 1. استيراد هوك التنقل

const Header = () => {
  const navigate = useNavigate(); // 2. تفعيل الهوك

  return (
    // هنا حافظنا على pl-80 عشان يبعد عن السايد بار وميغطيش اللوجو
    <header className="pl-80 pr-8 py-4 flex items-center justify-between bg-[#F8F9FE]  top-0 z-0">
      
      {/* Search Bar */}
      <div className="relative w-96">
        <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-12 pr-4 py-3 bg-white rounded-full text-sm shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all placeholder-gray-400"
        />
      </div>

      {/* Right Icons & Profile */}
      <div className="flex items-center gap-4">
        
        {/* 3. زرار الرسائل (تم تفعيله) */}
        <button 
          onClick={() => navigate('/patient/messages')} 
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-blue-600 transition-all"
        >
          <FiMessageSquare className="text-lg" />
        </button>

        {/* زرار الإشعارات */}
        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-500 hover:text-blue-600 transition-all relative">
          <FiBell className="text-lg" />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4">
          <img 
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=60" 
            alt="Mohamed Salem" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div className="hidden md:block">
            <h4 className="text-sm font-bold text-gray-800">Mohamed Salem</h4>
            <p className="text-xs text-gray-500">Patient</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;