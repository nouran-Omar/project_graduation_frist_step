import React, { useState, useEffect } from 'react';
import styles from './ActivityLogs.module.css';
import { 
  HiPlus, HiPencil, HiArrowRightOnRectangle, 
  HiArrowLeftOnRectangle, HiTrash, HiMagnifyingGlass,
  HiChevronLeft, HiChevronRight, HiClipboardDocumentList 
} from "react-icons/hi2";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // دالة جلب البيانات باستخدام async/await لمحاكاة الـ API
  const fetchLogs = async () => {
    setIsLoading(true);
    try {
      // محاكاة تأخير الشبكة (Network Delay)
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // داتا كتير (35 عنصر) لتجربة السليدر
      const mockData = Array.from({ length: 35 }, (_, i) => ({
        id: i + 1,
        type: ['Created', 'Updated', 'Deleted', 'Login', 'Logout'][i % 5],
        title: [
          'Added new patient', 'Doctor profile updated', 'User login', 
          'Appointment rescheduled', 'New prescription created', 'Appointment cancelled'
        ][i % 6],
        description: `This is a detailed description for system activity #${i + 1} regarding patient records and updates.`,
        time: i === 0 ? '2 minutes ago' : `${i + 1} hours ago`,
        iconType: ['plus', 'pencil', 'login', 'pencil', 'plus', 'trash'][i % 6]
      }));
      
      setLogs(mockData);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // منطق الفلترة والبحث
  const filteredData = logs.filter(log => {
    const matchesFilter = filter === 'All' || log.type === filter;
    const matchesSearch = log.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // حساب الـ Pagination (عرض 10 في كل صفحة)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentLogs = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getIcon = (type) => {
    switch(type) {
      case 'plus': return <HiPlus className={styles.iconPlus} />;
      case 'pencil': return <HiPencil className={styles.iconPencil} />;
      case 'login': return <HiArrowRightOnRectangle className={styles.iconLogin} />;
      case 'logout': return <HiArrowLeftOnRectangle className={styles.iconLogout} />;
      case 'trash': return <HiTrash className={styles.iconTrash} />;
      default: return <HiPlus />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <h2>Activity Logs <HiClipboardDocumentList className={styles.titleIcon} /></h2>
          <p>Track recent changes, updates, and system activity.</p>
        </div>
      </div>

      {/* شريط التحكم (Filters & Search) */}
      <div className={styles.controls}>
        <div className={styles.filterButtons}>
          {['All', 'Created', 'Updated', 'Deleted', 'Login', 'Logout'].map(btn => (
            <button 
              key={btn} 
              className={filter === btn ? styles.activeFilter : styles.filterBtn}
              onClick={() => {setFilter(btn); setCurrentPage(1);}}
            > 
              {btn} 
            </button>
          ))}
        </div>
        <div className={styles.searchWrapper}>
          <HiMagnifyingGlass className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search logs..." 
            value={searchQuery} 
            onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}} 
          />
        </div>
      </div>

      {/* عرض الداتا أو حالة التحميل */}
      <div className={styles.logsList}>
        {isLoading ? (
          <div className={styles.loadingArea}>
            <div className={styles.spinner}></div>
            <p>Loading activities...</p>
          </div>
        ) : currentLogs.length > 0 ? (
          currentLogs.map(log => (
            <div key={log.id} className={styles.logItem}>
              <div className={`${styles.iconWrapper} ${styles[log.iconType]}`}>
                {getIcon(log.iconType)}
              </div>
              <div className={styles.logContent}>
                <div className={styles.logMain}>
                  <h4>{log.title}</h4>
                  <p>{log.description}</p>
                </div>
                <span className={styles.logTime}>{log.time}</span>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noData}>No logs found matching your criteria.</div>
        )}
      </div>

      {/* الـ Pagination (السليدر) */}
      {!isLoading && totalPages > 1 && (
        <div className={styles.pagination}>
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(p => p - 1)} 
            className={styles.pageArrow}
          >
            <HiChevronLeft />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button 
              key={page} 
              onClick={() => setCurrentPage(page)} 
              className={page === currentPage ? styles.activePage : styles.pageBtn}
            >
              {page}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(p => p + 1)} 
            className={styles.pageArrow}
          >
            <HiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
