import React from 'react';
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import styles from './DataTable.module.css';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
export default function DataTable({ 
  data, 
  selectedItems, 
  onToggle, 
  onEdit, 
  onDeleteIndividual,
  onBulkDelete,
  onClearSelection 
}) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // دالة لتحديد/إلغاء تحديد كل العناصر في الصفحة الحالية
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      currentItems.forEach(item => {
        if (!selectedItems.includes(item.id)) onToggle(item.id);
      });
    } else {
      onClearSelection();
    }
  };

  return (
  
<div className={styles.tableContainer}>
      {/* الـ Div العائم - يظهر فقط عند التحديد */}
      {selectedItems.length > 0 && (
        <div className={styles.bulkFloatingBar}>
          <div className={styles.bulkInfo}>
            <input 
              type="checkbox" 
              checked={true} 
              onChange={onClearSelection} 
              className={styles.checkbox} 
            />
            <span className={styles.countText}>{selectedItems.length} Selected</span>
          </div>
          <div className={styles.bulkButtons}>
            <button className={styles.bulkDeleteBtn} onClick={onBulkDelete}>Delete Selected</button>
            <button className={styles.bulkCancelBtn} onClick={onClearSelection}>Cancel</button>
          </div>
        </div>
      )}

      <table className={styles.mainTable}>
        <thead>
          <tr className={styles.headerRow}>
            <th>
              <input 
                type="checkbox" 
                className={styles.checkbox} 
                onChange={(e) => e.target.checked ? currentItems.forEach(i => !selectedItems.includes(i.id) && onToggle(i.id)) : onClearSelection()}
                checked={currentItems.length > 0 && currentItems.every(i => selectedItems.includes(i.id))}
              />
            </th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Price</th>
            <th>Joined Date</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className={selectedItems.includes(item.id) ? styles.selectedRow : ''}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedItems.includes(item.id)} 
                  onChange={() => onToggle(item.id)}
                  className={styles.checkbox} 
                />
              </td>
              <td className={styles.userCell}>
                <img src={item.image || `https://ui-avatars.com/api/?name=${item.fullName}`} alt="avatar" />
                {item.fullName}
              </td>
              <td className='text-gray-text-dim2'>{item.email}</td>
              <td className={styles.priceText}>${item.price}</td>
              <td className='text-gray-text-dim2'>{item.joinedDate}</td>
             <td style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                  <FiEdit3 className={styles.editIcon} onClick={() => onEdit(item)} />
                  <FiTrash2 className={styles.deleteIcon} onClick={() => onDeleteIndividual(item)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.paginationArea}>
        <button 
          className={styles.arrowBtn} 
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        > <FaAngleLeft className='text-[#374151]' /> </button>
        
        {[...Array(totalPages)].map((_, i) => (
          <button 
            key={i} 
            className={currentPage === i + 1 ? styles.activePage : styles.pageBtn}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button 
          className={styles.arrowBtn} 
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        ><FaAngleRight className='text-[#374151]' /> </button>
      </div>
    </div>
  );
}