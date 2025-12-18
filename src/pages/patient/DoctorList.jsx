import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // 👈 1. استيراد أداة التنقل
import { fetchDoctorsList } from '../../services/patientService';
import { FiUsers, FiUserCheck, FiMonitor, FiSearch, FiFilter, FiMapPin, FiStar, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { FaUserMd } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";

const DoctorList = () => {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const navigate = useNavigate(); // 👈 2. تفعيل التنقل

  useEffect(() => {
    fetchDoctorsList().then(setData);
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Finding Specialists...</div>;

  // --- منطق التقليب (Pagination Logic) ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDoctors = data.doctors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.doctors.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-12 animate-fade-in font-sans relative">
      
      {/* 1. Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Doctor List <FaUserMd className="text-lg" />
        </h1>
        <p className="text-gray-500 text-sm mt-1">Find and connect with heart specialists easily.</p>
      </motion.div>

      {/* 2. Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 text-2xl"><FiUsers /></div>
            <div><p className="text-xs text-gray-400 font-medium">Total Doctors</p><h3 className="text-2xl font-bold text-blue-600">{data.stats.totalDoctors}</h3></div>
        </div>
        <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 text-2xl"><FiUserCheck /></div>
            <div><p className="text-xs text-gray-400 font-medium">Top Rated</p><h3 className="text-2xl font-bold text-yellow-500">{data.stats.topRated}</h3></div>
        </div>
        <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-500 text-2xl"><FiMonitor /></div>
            <div><p className="text-xs text-gray-400 font-medium">Active Now</p><h3 className="text-2xl font-bold text-purple-600">{data.stats.activeNow}</h3></div>
        </div>
      </div>

      {/* 3. Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-3">
              {['Highest Rated', 'Most Reviewed'].map(opt => <select key={opt} className="bg-white border border-gray-200 text-gray-500 text-sm rounded-full px-4 py-2.5 outline-none hover:border-blue-400 cursor-pointer"><option>{opt}</option></select>)}
              <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-200">Filter <FiFilter /></button>
          </div>
          <div className="relative w-full lg:w-72">
              <FiSearch className="absolute left-4 top-3 text-gray-400" />
              <input type="text" placeholder="Search doctor" className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-blue-500 transition-all"/>
          </div>
      </div>

      {/* 4. Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentDoctors.map((doc) => (
            <motion.div 
                key={doc.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 text-center flex flex-col items-center hover:shadow-xl transition-all duration-300"
            >
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-white shadow-md">
                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{doc.name}</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1 mb-3"><FiMapPin /> {doc.specialty}</p>
                <div className="flex items-center gap-1 text-yellow-400 text-xs mb-1">
                    {[...Array(5)].map((_, i) => <FiStar key={i} className={i < doc.rating ? "fill-current" : "text-gray-200"} />)}
                    <span className="text-gray-400 ml-1">({doc.reviews} reviews)</span>
                </div>
                <div className="text-sm font-bold text-gray-800 mb-6">${doc.price} <span className="text-xs text-gray-400 font-normal">/ session</span></div>
                
                {/* 👇 3. هنا الزرار بقى شغال وبينقل للصفحة */}
                <button 
                    onClick={() => navigate(`/patient/book/${doc.id}`)}
                    className="w-full bg-blue-600 text-white py-3 rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                    Book Now
                </button>

            </motion.div>
        ))}
      </div>

      {/* 5. Pagination */}
      <div className="flex justify-center mt-12 gap-2">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${currentPage === 1 ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white hover:border-blue-500 hover:text-blue-500'}`}
          >
            <FiChevronLeft />
          </button>

          {[...Array(totalPages)].map((_, index) => (
             <button 
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-md ${
                    currentPage === index + 1 
                    ? 'bg-blue-600 text-white shadow-blue-200' 
                    : 'bg-white border border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-500'
                }`}
             >
                {index + 1}
             </button>
          ))}

          <button 
             onClick={() => handlePageChange(currentPage + 1)}
             disabled={currentPage === totalPages}
             className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${currentPage === totalPages ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-white hover:border-blue-500 hover:text-blue-500'}`}
          >
            <FiChevronRight />
          </button>
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

export default DoctorList;