import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // 👈 استيراد التنقل
import { fetchStories } from '../../services/patientService';
// الأيقونات
import { FiStar, FiArrowRight, FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  
  const navigate = useNavigate(); // 👈 تفعيل التنقل

  useEffect(() => {
    fetchStories().then(setStories);
  }, []);

  // --- منطق التقليب (Pagination Logic) ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStories = stories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(stories.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (stories.length === 0) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Inspiring Stories...</div>;

  return (
    <div className="pb-12 animate-fade-in font-sans relative min-h-screen">
      
      {/* 1. Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Patient Stories <span className="bg-black text-white p-1 rounded-full text-xs"><FiStar /></span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Read and share inspiring patient journeys.</p>
      </motion.div>

      {/* 2. Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentStories.map((story) => (
            <motion.div 
                key={story.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 transition-all hover:shadow-xl group flex flex-col justify-between"
            >
                {/* Author Info */}
                <div className="flex items-center gap-4 mb-4">
                    <img src={story.img} alt={story.author} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm">{story.author}</h4>
                        <p className="text-[10px] text-gray-400">{story.date}</p>
                    </div>
                </div>

                {/* Content */}
                <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {story.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {story.excerpt}
                    </p>
                </div>

                {/* Footer: Tags & Read More */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-2">
                        {story.tags.map((tag, idx) => (
                            <span 
                                key={idx} 
                                className={`text-[10px] font-bold px-3 py-1.5 rounded-full 
                                ${story.tagColor === 'orange' ? 'bg-orange-50 text-orange-600' : 
                                  story.tagColor === 'purple' ? 'bg-purple-50 text-purple-600' :
                                  story.tagColor === 'green' ? 'bg-green-50 text-green-600' :
                                  'bg-blue-50 text-blue-600'}`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    
                    {/* زرار قراءة القصة - ينقلك للتفاصيل */}
                    <button 
                        onClick={() => navigate(`/patient/stories/${story.id}`)}
                        className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:gap-2 transition-all"
                    >
                        Read Story <FiArrowRight />
                    </button>
                </div>
            </motion.div>
        ))}
      </div>

      {/* 3. Pagination */}
      <div className="flex justify-center mt-12 gap-2">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${currentPage === 1 ? 'bg-gray-100 text-gray-300' : 'bg-white hover:border-blue-500 hover:text-blue-500'}`}><FiChevronLeft /></button>
          
          {[...Array(totalPages)].map((_, index) => (
             <button key={index} onClick={() => handlePageChange(index + 1)} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all shadow-md ${currentPage === index + 1 ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-white border border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-500'}`}>{index + 1}</button>
          ))}

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${currentPage === totalPages ? 'bg-gray-100 text-gray-300' : 'bg-white hover:border-blue-500 hover:text-blue-500'}`}><FiChevronRight /></button>
      </div>

      {/* 4. Bottom Actions (Floating) */}
      <div className="fixed bottom-8 right-8 flex items-end gap-4 z-50">
         
         {/* زرار كتابة قصة - ينقلك لصفحة الكتابة */}
         <button 
            onClick={() => navigate('/patient/stories/new')}
            className="bg-gradient-to-r from-blue-600 to-red-500 text-white px-6 py-3 rounded-full font-bold shadow-xl shadow-blue-200 flex items-center gap-2 hover:scale-105 transition-transform"
         >
            <FiPlus className="text-xl" /> Write Story
         </button>

         {/* Robot Helper */}
         <div className="animate-bounce cursor-pointer relative">
            <span className="bg-cyan-400 text-white text-[10px] px-2 py-0.5 rounded-full absolute -top-2 -right-2 font-bold z-10">Hi!</span>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <RiRobot2Line className="text-2xl" />
            </div>
         </div>
      </div>

    </div>
  );
};

export default Stories;