import React, { useEffect, useState } from 'react';
import { fetchActivityLogs } from '../../services/adminService';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiLogIn, FiLogOut, FiChevronLeft, FiChevronRight, FiFileText } from "react-icons/fi";
import { BiClipboard } from "react-icons/bi"; // أيقونة السجلات

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 9; // عدد العناصر في الصفحة زي الصورة

  useEffect(() => {
    setLoading(true);
    fetchActivityLogs().then(data => {
      setLogs(data);
      setLoading(false);
    });
  }, []);

  // --- Helper to style logs based on type ---
  const getIconAndColor = (type, actionName) => {
    // منطق متقدم لتحديد الأيقونة واللون بناءً على النوع واسم النشاط
    if (type === 'Created' || actionName.includes('Added') || actionName.includes('New')) {
      return { icon: <FiPlus className="text-xl" />, bg: "bg-green-50", text: "text-green-600" };
    }
    if (type === 'Updated' || actionName.includes('updated') || actionName.includes('rescheduled') || actionName.includes('modified')) {
      return { icon: <FiEdit2 className="text-xl" />, bg: "bg-blue-50", text: "text-blue-600" };
    }
    if (type === 'Deleted' || actionName.includes('cancelled') || actionName.includes('deleted')) {
      return { icon: <FiTrash2 className="text-xl" />, bg: "bg-red-50", text: "text-red-500" };
    }
    if (type === 'Login') {
      return { icon: <FiLogIn className="text-xl" />, bg: "bg-purple-50", text: "text-purple-600" };
    }
    if (type === 'Logout') {
      return { icon: <FiLogOut className="text-xl" />, bg: "bg-gray-100", text: "text-gray-600" };
    }
    return { icon: <BiClipboard className="text-xl" />, bg: "bg-gray-50", text: "text-gray-500" };
  };

  // --- Filtering Logic ---
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || log.type === filterType;
    return matchesSearch && matchesType;
  });

  // --- Pagination Logic ---
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredLogs.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredLogs.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="pb-12 animate-fade-in font-sans">
      
      {/* 1. Header */}
      <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
             Activity Logs <BiClipboard className="text-lg text-gray-700" />
          </h1>
          <p className="text-gray-500 text-sm mt-1">Track recent changes, updates, and system activity.</p>
      </div>

      {/* 2. Filters & Search Bar */}
      <div className="bg-white p-4 rounded-[24px] shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Tabs Filter */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              {['All', 'Created', 'Updated', 'Deleted', 'Login', 'Logout'].map((type) => (
                  <button
                      key={type}
                      onClick={() => { setFilterType(type); setCurrentPage(1); }}
                      className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap
                          ${filterType === type 
                              ? 'bg-[#3b36db] text-white shadow-md shadow-blue-200' 
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                      {type}
                  </button>
              ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search logs..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-100 bg-white text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
              />
          </div>
      </div>

      {/* 3. Logs List */}
      <div className="space-y-4 mb-8">
          {loading ? (
              <div className="text-center py-12 text-blue-600 font-bold">Loading Activity...</div>
          ) : currentRows.length > 0 ? (
              currentRows.map((log) => {
                  const style = getIconAndColor(log.type, log.action);
                  return (
                      <div key={log.id} className="bg-white p-5 rounded-[24px] border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow group">
                          {/* Icon Box */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${style.bg} ${style.text}`}>
                              {style.icon}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {log.action}
                                  </h4>
                                  <span className="text-[10px] text-gray-400 font-medium whitespace-nowrap ml-2">
                                      {log.time}
                                  </span>
                              </div>
                              <p className="text-xs text-gray-500 leading-relaxed truncate md:whitespace-normal">
                                  {log.desc}
                              </p>
                          </div>
                      </div>
                  );
              })
          ) : (
              <div className="text-center py-12 text-gray-400">No logs found matching your criteria.</div>
          )}
      </div>

      {/* 4. Pagination */}
      {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 select-none">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  <FiChevronLeft className="text-gray-600" />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                  <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`w-10 h-10 rounded-full text-xs font-bold transition-all
                          ${currentPage === i + 1 
                              ? 'bg-[#3b36db] text-white shadow-lg shadow-blue-200' 
                              : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
                  >
                      {i + 1}
                  </button>
              ))}
              
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  <FiChevronRight className="text-gray-600" />
              </button>
          </div>
      )}

    </div>
  );
};

export default ActivityLogs;