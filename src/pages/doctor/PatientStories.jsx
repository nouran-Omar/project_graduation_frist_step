import React, { useEffect, useState } from 'react';
import { fetchPatientStories } from '../../services/doctorService';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaPenFancy } from "react-icons/fa";

const PatientStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 4; // عرض 4 كروت في الصفحة زي الصورة

  useEffect(() => {
    fetchPatientStories().then(data => {
        setStories(data);
        setLoading(false);
    });
  }, []);

  // --- Logic for Pagination ---
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);
  const totalPages = Math.ceil(stories.length / storiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // --- Helper for Tag Colors (Pixel Perfect) ---
  const getTagColor = (tag) => {
      switch(tag) {
          case 'Lifestyle': return 'bg-orange-100 text-orange-600';
          case 'Health': return 'bg-blue-100 text-blue-600';
          case 'Success Story': return 'bg-green-100 text-green-600';
          case 'Challenges': return 'bg-purple-100 text-purple-600';
          default: return 'bg-gray-100 text-gray-600';
      }
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Stories...</div>;

  return (
    <div className="pb-12 animate-fade-in font-sans">
      
      {/* 1. Header */}
      <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
             Patient Stories <FaPenFancy className="text-lg text-gray-700" />
          </h1>
          <p className="text-gray-500 text-sm mt-1">Read and share inspiring patient journeys.</p>
      </div>

      {/* 2. Stories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {currentStories.map((story) => (
              <div key={story.id} className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  
                  {/* Author Header */}
                  <div className="flex items-center gap-4 mb-4">
                      <img src={story.img} alt={story.author} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                          <h4 className="text-sm font-bold text-gray-900">{story.author}</h4>
                          <p className="text-[10px] text-gray-400">{story.date}</p>
                      </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 leading-tight min-h-[50px]">
                      {story.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 line-clamp-3">
                      {story.excerpt}
                  </p>

                  {/* Footer (Tags & Action) */}
                  <div className="flex items-center justify-between mt-auto">
                      <div className="flex gap-2">
                          {story.tags.map((tag, index) => (
                              <span key={index} className={`text-[10px] font-bold px-3 py-1.5 rounded-full ${getTagColor(tag)}`}>
                                  {tag}
                              </span>
                          ))}
                      </div>
                      <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                          Read Story <FiArrowRight />
                      </button>
                  </div>
              </div>
          ))}
      </div>

      {/* 3. Pagination Slider (Bottom) */}
      <div className="flex justify-center items-center gap-3 select-none">
          {/* Previous Arrow */}
          <button 
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 transition-colors
                ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'}`}
          >
              <FiChevronLeft />
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages || 1)].map((_, i) => (
              <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-10 h-10 rounded-full text-xs font-bold transition-all
                      ${currentPage === i + 1 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                          : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'}`}
              >
                  {i + 1}
              </button>
          ))}
          
          {/* Next Arrow */}
          <button 
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 transition-colors
                ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'}`}
          >
              <FiChevronRight />
          </button>
      </div>

    </div>
  );
};

export default PatientStories;