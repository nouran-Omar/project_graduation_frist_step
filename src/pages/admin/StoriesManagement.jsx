


import React, { useEffect, useState } from 'react';
import { fetchAllStories, toggleStoryStatusService, deleteStoryService } from '../../services/adminService';
import { FiSearch, FiTrash2, FiEye, FiEyeOff, FiChevronLeft, FiChevronRight, FiCheckCircle, FiBookOpen } from "react-icons/fi";
import { FaPenFancy } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

const StoriesManagement = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Modal & Notification
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    fetchAllStories().then(data => {
      setStories(data);
      setLoading(false);
    });
  };

  // --- Stats Calculation ---
  const stats = {
    total: stories.length,
    published: stories.filter(s => s.status === 'Published').length,
    hidden: stories.filter(s => s.status === 'Hidden').length,
    deleted: 26 // رقم ثابت للمحاكاة زي الصورة
  };

  // --- Handlers ---
  const handleToggleStatus = async (id) => {
    // تحديث واجهة المستخدم فوراً (Optimistic UI update)
    const updatedStories = stories.map(s => 
       s.id === id ? { ...s, status: s.status === 'Published' ? 'Hidden' : 'Published' } : s
    );
    setStories(updatedStories);

    // استدعاء الـ API
    await toggleStoryStatusService(id);
    
    // إظهار نوتيفيكيشن
    const newStatus = updatedStories.find(s => s.id === id).status;
    showNotification(`Story is now ${newStatus}`);
  };

  const handleDeleteClick = (story) => {
    setStoryToDelete(story);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (storyToDelete) {
      await deleteStoryService(storyToDelete.id);
      setStories(prev => prev.filter(s => s.id !== storyToDelete.id));
      setShowDeleteModal(false);
      showNotification("Story deleted successfully");
    }
  };

  const showNotification = (msg) => {
    setNotification({ type: 'success', msg });
    setTimeout(() => setNotification(null), 3000);
  };

  // --- Pagination & Filter ---
  const filteredStories = stories.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredStories.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredStories.length / rowsPerPage);

  // --- Components ---
  const Toast = () => (
    <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className="fixed top-8 right-8 bg-white border-l-4 border-green-500 shadow-2xl p-4 rounded-lg flex items-center gap-3 z-50 min-w-[300px]">
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600"><FiCheckCircle className="text-xl" /></div>
      <div><h4 className="font-bold text-gray-800 text-sm">{notification?.msg}</h4></div>
    </motion.div>
  );

  const DeleteModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[30px] p-8 max-w-md w-full shadow-2xl text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Story?</h3>
        <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this user? This action is permanent and cannot be undone.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => setShowDeleteModal(false)} className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50">No, Cancel</button>
          <button onClick={confirmDelete} className="px-6 py-2.5 rounded-full bg-red-600 text-white font-bold text-sm shadow-lg shadow-red-200 hover:bg-red-700">Yes, Confirm</button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="pb-12 animate-fade-in font-sans relative">
      <AnimatePresence>
        {notification && <Toast />}
        {showDeleteModal && <DeleteModal />}
      </AnimatePresence>

      {/* 1. Header */}
      <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
             Patient Stories <FaPenFancy className="text-lg text-gray-800" />
          </h1>
          <p className="text-gray-500 text-sm mt-1">Read and share inspiring patient journeys.</p>
      </div>

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center justify-between">
             <div><p className="text-xs text-gray-500 font-bold">Total Stories</p><h3 className="text-3xl font-bold text-gray-900">{stats.total.toLocaleString()}</h3></div>
             <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600"><FiBookOpen /></div>
          </div>
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center justify-between">
             <div><p className="text-xs text-gray-500 font-bold">Published Stories</p><h3 className="text-3xl font-bold text-gray-900">{stats.published.toLocaleString()}</h3></div>
             <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600"><FiEye /></div>
          </div>
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center justify-between">
             <div><p className="text-xs text-gray-500 font-bold">Hidden Stories</p><h3 className="text-3xl font-bold text-gray-900">{stats.hidden}</h3></div>
             <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600"><FiEyeOff /></div>
          </div>
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 flex items-center justify-between">
             <div><p className="text-xs text-gray-500 font-bold">Deleted Stories</p><h3 className="text-3xl font-bold text-gray-900">{stats.deleted}</h3></div>
             <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600"><FiTrash2 /></div>
          </div>
      </div>

      {/* 3. Filters Bar */}
      <div className="bg-gray-100/50 p-2 rounded-[20px] mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex gap-4 w-full md:w-auto overflow-x-auto px-2">
             <div className="relative group min-w-[120px]"><span className="absolute left-3 top-3 text-[10px] font-bold text-gray-500 z-10">Tags:</span><select className="w-full bg-gray-200/50 pl-12 pr-4 py-2.5 rounded-xl text-xs font-bold outline-none"><option>All</option></select></div>
             <div className="relative group min-w-[120px]"><span className="absolute left-3 top-3 text-[10px] font-bold text-gray-500 z-10">Status:</span><select className="w-full bg-gray-200/50 pl-14 pr-4 py-2.5 rounded-xl text-xs font-bold outline-none"><option>All</option></select></div>
             <div className="relative group min-w-[120px]"><span className="absolute left-3 top-3 text-[10px] font-bold text-gray-500 z-10">Sort by:</span><select className="w-full bg-gray-200/50 pl-14 pr-4 py-2.5 rounded-xl text-xs font-bold outline-none"><option>Normal</option></select></div>
          </div>
          <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-4 top-3 text-gray-400" />
              <input type="text" placeholder="Search by name" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-200/50 rounded-xl text-xs font-bold outline-none placeholder-gray-400" />
          </div>
      </div>

      {/* 4. Stories Table */}
      <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden mb-6">
          <table className="w-full min-w-[900px]">
              <thead>
                  <tr className="bg-[#3b36db] text-white text-left text-xs font-bold">
                      <th className="p-5 w-[40%]">Story</th>
                      <th className="p-5">Author</th>
                      <th className="p-5">Date Published</th>
                      <th className="p-5">Status</th>
                      <th className="p-5 text-center">Actions</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                  {loading ? (
                      <tr><td colSpan="5" className="p-8 text-center text-blue-600 font-bold">Loading...</td></tr>
                  ) : (
                      currentRows.map(story => (
                          <tr key={story.id} className="hover:bg-blue-50/20 transition-colors group">
                              <td className="p-5">
                                  <div className="flex gap-4 items-center">
                                      <img src={story.img} alt="" className="w-12 h-12 rounded-xl object-cover shadow-sm" />
                                      <div>
                                          <h4 className="font-bold text-gray-900 text-sm mb-1">{story.title}</h4>
                                          <p className="text-[10px] text-gray-400 line-clamp-1 max-w-[250px]">{story.excerpt}</p>
                                      </div>
                                  </div>
                              </td>
                              <td className="p-5">
                                  <div className="flex items-center gap-3">
                                      <img src={story.authorImg} alt="" className="w-8 h-8 rounded-full object-cover" />
                                      <span className="font-bold text-gray-800 text-xs">{story.author}</span>
                                  </div>
                              </td>
                              <td className="p-5 text-xs text-gray-500 font-medium">{story.date}</td>
                              <td className="p-5">
                                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold 
                                      ${story.status === 'Published' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                      {story.status}
                                  </span>
                              </td>
                              <td className="p-5">
                                  <div className="flex items-center justify-center gap-4">
                                      {/* زرار العين 👁️ */}
                                      <button 
                                        onClick={() => handleToggleStatus(story.id)}
                                        className={`transition-colors text-lg ${story.status === 'Published' ? 'text-blue-600 hover:text-blue-800' : 'text-gray-400 hover:text-gray-600'}`}
                                        title={story.status === 'Published' ? 'Hide Story' : 'Publish Story'}
                                      >
                                          {story.status === 'Published' ? <FiEye /> : <FiEyeOff />}
                                      </button>
                                      
                                      {/* زرار الحذف */}
                                      <button onClick={() => handleDeleteClick(story)} className="text-red-500 hover:text-red-700 transition-colors text-lg"><FiTrash2 /></button>
                                  </div>
                              </td>
                          </tr>
                      ))
                  )}
              </tbody>
          </table>
      </div>

      {/* 5. Pagination */}
      <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 font-medium">Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredStories.length)} of {filteredStories.length} stories</span>
          <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50"><FiChevronLeft /></button>
              {[...Array(totalPages || 1)].map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all ${currentPage === i + 1 ? 'bg-[#3b36db] text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50"><FiChevronRight /></button>
          </div>
      </div>

    </div>
  );
};

export default StoriesManagement;