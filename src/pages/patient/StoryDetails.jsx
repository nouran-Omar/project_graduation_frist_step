import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchStoryDetails } from '../../services/patientService';
import { motion } from 'framer-motion';
// الأيقونات
import { FiArrowLeft, FiHeart, FiMessageCircle, FiShare2, FiBookOpen } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";

const StoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);

  useEffect(() => {
    setStory(null); 
    fetchStoryDetails(id).then(setStory);
  }, [id]);

  if (!story) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Story...</div>;

  return (
    <div className="pb-12 animate-fade-in font-sans relative min-h-screen">
      
      {/* 1. Header & Title */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
           Patient Story Details <FiBookOpen className="text-lg" />
        </h1>
        <p className="text-gray-500 text-sm mt-1">Read full patient journey and shared experiences.</p>
      </motion.div>

      {/* Main Content Card */}
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 lg:p-12">
          
          {/* Author Header */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-50">
              <img src={story.author.img} alt={story.author.name} className="w-14 h-14 rounded-full object-cover border border-gray-100" />
              <div>
                  <h3 className="font-bold text-gray-900">{story.author.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">{story.author.role}</p>
                  <p className="text-[10px] text-gray-400 font-medium">{story.author.date}</p>
              </div>
          </div>

          {/* Story Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight">
              {story.title}
          </h2>

          {/* Text Paragraph 1 */}
          <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
              {story.content[0]}
          </p>
          
          <p className="text-gray-600 leading-relaxed mb-8 text-sm md:text-base">
              {story.content[1]}
          </p>

          {/* Main Image */}
          <div className="w-full h-64 md:h-96 rounded-[30px] overflow-hidden mb-8 shadow-sm relative group">
              <img src={story.mainImage} alt="Healthy Food" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {/* Robot Hint */}
              <div className="absolute top-4 right-4 animate-bounce">
                  <span className="bg-cyan-400 text-white text-[10px] px-2 py-0.5 rounded-full absolute -top-2 -right-2 font-bold z-10">Hi!</span>
                  <RiRobot2Line className="text-3xl text-blue-600 drop-shadow-md" />
              </div>
          </div>

          {/* Text Paragraph 2 */}
          <p className="text-gray-600 leading-relaxed mb-12 text-sm md:text-base">
              {story.content[2]}
          </p>

          {/* Engagement Stats */}
          <div className="flex items-center gap-6 py-6 border-y border-gray-50 mb-12">
              <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                  <FiHeart className="text-lg" /> <span className="text-sm font-bold">{story.stats.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <FiMessageCircle className="text-lg" /> <span className="text-sm font-bold">{story.stats.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <FiShare2 className="text-lg" /> <span className="text-sm font-bold">{story.stats.shares}</span>
              </button>
          </div>

          {/* "You may also like" Section */}
          <div className="mb-12">
              <h3 className="text-lg font-bold text-gray-900 mb-6">You may also like</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {story.relatedStories.map((item) => (
                      <div key={item.id} className="border border-gray-100 rounded-[24px] p-5 hover:shadow-lg transition-all cursor-pointer bg-white">
                          <div className="flex items-center gap-3 mb-4">
                              <img src={item.img} alt={item.author} className="w-10 h-10 rounded-full object-cover" />
                              <div>
                                  <h4 className="text-xs font-bold text-gray-900">{item.author}</h4>
                                  <p className="text-[10px] text-gray-400">{item.date}</p>
                              </div>
                          </div>
                          <h4 className="font-bold text-gray-800 mb-3 text-sm line-clamp-2">{item.title}</h4>
                          <div className="flex gap-2 mb-4">
                              {item.tags.map(tag => (
                                  <span key={tag} className="bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-1 rounded-full">{tag}</span>
                              ))}
                          </div>
                          <button className="text-blue-600 text-xs font-bold hover:underline">Read Story →</button>
                      </div>
                  ))}
              </div>
          </div>

          {/* Bottom Actions Buttons */}
          <div className="flex justify-end gap-4">
              <button 
                  onClick={() => navigate('/patient/stories')}
                  className="px-8 py-3 rounded-full border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
              >
                  Back to Stories
              </button>
              <button 
                  onClick={() => navigate('/patient/stories/new')}
                  className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2"
              >
                  <FaPlus /> Write Story
              </button>
          </div>

      </div>
    </div>
  );
};

export default StoryDetails;