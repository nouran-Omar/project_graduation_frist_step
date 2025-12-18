import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publishNewStory } from '../../services/patientService';
import { motion, AnimatePresence } from 'framer-motion';
// الأيقونات
import { FiPenTool, FiUploadCloud, FiX, FiCheck } from "react-icons/fi";
import { RiRobot2Line, RiSparklingFill } from "react-icons/ri";

const WriteStory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // التحكم في ظهور الإشعار
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // دالة رفع الصورة
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // دالة النشر
  const handlePublish = async () => {
    if (!title || !content) {
        alert("Please fill in the title and your story!");
        return;
    }
    setLoading(true);
    
    // 1. محاكاة الإرسال
    await publishNewStory({ title, content, image: imagePreview });
    
    setLoading(false);
    
    // 2. إظهار الإشعار
    setShowSuccess(true); 

    // 3. التوجيه بعد ثانيتين ونصف
    setTimeout(() => {
        navigate('/patient/stories');
    }, 2500);
  };

  // مساعد الذكاء الاصطناعي
  const handleAIAssist = () => {
      setContent(prev => prev + "\n[AI Suggestion]: Start by describing how you felt before the treatment, then mention the turning point...");
  };

  return (
    <div className="pb-12 animate-fade-in font-sans relative min-h-screen">
      
      {/* الكارت الأساسي */}
      <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 lg:p-12 relative overflow-hidden">
          
          {/* --- Notification Toast (تصميم مطابق للصورة) --- */}
          <AnimatePresence>
            {showSuccess && (
                <motion.div 
                    initial={{ opacity: 0, y: -50, x: 0 }} 
                    animate={{ opacity: 1, y: 0, x: 0 }} 
                    exit={{ opacity: 0, y: -50 }}
                    // التمركز: Absolute بالنسبة للكارت، فوق على اليمين
                    className="absolute top-8 right-8 z-50 bg-white w-[350px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden"
                >
                    <div className="flex items-start gap-4 p-5">
                        {/* الأيقونة الخضراء */}
                        <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center text-white flex-shrink-0 mt-1">
                            <FiCheck className="text-lg font-bold" />
                        </div>
                        
                        {/* النص */}
                        <div>
                            <h4 className="font-bold text-gray-900 text-base mb-1">Story Published Successfully</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">Your changes have been saved successfully</p>
                        </div>
                    </div>
                    
                    {/* الشريط الأخضر اللي تحت */}
                    <div className="h-1.5 w-full bg-[#10B981]"></div>
                </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                 Write Story <FiPenTool className="text-lg" />
              </h1>
              <p className="text-gray-500 text-sm mt-1">Share your personal health journey to inspire others.</p>
          </div>

          <div className="space-y-8">
              
              {/* 1. Title Input */}
              <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-800 ml-1">Story Title <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your story a compelling title..." 
                    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-gray-300" 
                  />
              </div>

              {/* 2. Cover Image Upload */}
              <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-800 ml-1">Cover Image <span className="text-gray-400 font-normal">(Optional)</span></label>
                  
                  <div className="relative w-full h-64 border-2 border-dashed border-gray-200 bg-gray-50 rounded-[30px] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 hover:border-blue-300 transition-all group overflow-hidden">
                      <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer z-20" />
                      
                      {imagePreview ? (
                          <>
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                                onClick={(e) => { e.preventDefault(); setImagePreview(null); }}
                                className="absolute top-4 right-4 bg-white/80 p-2 rounded-full text-red-500 hover:bg-white z-30"
                            >
                                <FiX />
                            </button>
                          </>
                      ) : (
                          <div className="space-y-2 group-hover:scale-105 transition-transform duration-300">
                              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mx-auto text-gray-400 group-hover:text-blue-500">
                                  <FiUploadCloud className="text-xl" />
                              </div>
                              <h4 className="font-bold text-gray-600 text-sm">Drag and drop your image here</h4>
                              <p className="text-xs text-gray-400">or click to browse files</p>
                              <p className="text-[10px] text-gray-300 mt-4">Supported formats: JPG, PNG, GIF (Max 5MB)</p>
                          </div>
                      )}
                  </div>
              </div>

              {/* 3. Story Content */}
              <div className="space-y-2 relative">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-gray-800 ml-1">Your Story</label>
                    <button onClick={handleAIAssist} className="flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors">
                        <RiSparklingFill /> AI Help
                    </button>
                  </div>
                  
                  <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your health journey in detail. What challenges did you face? How did you overcome them? What was your experience like?"
                    className="w-full h-80 bg-gray-50/50 border border-gray-100 rounded-[30px] p-6 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all resize-none placeholder-gray-300 leading-relaxed"
                  ></textarea>
              </div>

          </div>

          {/* Footer Actions */}
          <div className="mt-12 pt-6 border-t border-gray-50 flex justify-end gap-4">
              <button 
                  onClick={() => navigate(-1)}
                  className="px-8 py-3 rounded-full border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
              >
                  Cancel
              </button>
              <button 
                  onClick={handlePublish}
                  disabled={loading}
                  className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-70 flex items-center gap-2"
              >
                  {loading ? 'Publishing...' : 'Publish Story'}
              </button>
          </div>

          {/* Robot Helper */}
          <div className="absolute bottom-32 right-8 animate-bounce cursor-pointer z-50">
             <div className="w-10 h-10 bg-white border border-blue-100 rounded-full flex items-center justify-center text-blue-600 shadow-sm">
                <RiRobot2Line className="text-xl" />
             </div>
          </div>

      </div>
    </div>
  );
};

export default WriteStory;