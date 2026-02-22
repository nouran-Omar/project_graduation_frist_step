import React, { useState } from 'react';
import styles from './PatientDoctorList.module.css';
import { FaUserDoctor } from "react-icons/fa6";
import { HiUsers, HiOutlineLocationMarker, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { MdStars, MdMonitor, MdSearch } from "react-icons/md";
import PatientDoctorCard from '../PatientDoctorCard/PatientDoctorCard';

const PatientDoctorList = () => {
  // 1. بيانات حقيقية (Real-world Data) - استبدلنا الـ Placeholder بصور طبية واقعية
  const allDoctors = [
    { id: 1, name: "Dr. Walid Ali", loc: "Cairo", rate: 5, reviews: 142, price: 200, img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Dr. Tamer Megahd", loc: "Giza", rate: 5, reviews: 98, price: 80, img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Dr. Jehan Osama", loc: "Menoufia", rate: 4, reviews: 210, price: 400, img: "https://images.unsplash.com/photo-1559839734-2b71f1536780?auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Dr. Ali Ramez", loc: "Cairo", rate: 5, reviews: 88, price: 300, img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "Dr. Noha Ahmed", loc: "Alexandria", rate: 4, reviews: 156, price: 85, img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=300&q=80" },
    { id: 6, name: "Dr. Zena Mahmoud", loc: "Fayoum", rate: 5, reviews: 76, price: 120, img: "https://images.unsplash.com/photo-1623854767233-243a6496667a?auto=format&fit=crop&w=300&q=80" },
    { id: 7, name: "Dr. Ahmed Hassan", loc: "Cairo", rate: 5, reviews: 120, price: 150, img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=300&q=80" },
    { id: 8, name: "Dr. Sara Khalil", loc: "Giza", rate: 4, reviews: 85, price: 100, img: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=300&q=80" },
  ];

  // 2. منطق السلايدر والصفحات (Dynamic Logic)
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6; // عرض 6 دكاترة في الصفحة الواحدة

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = allDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.mainContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className="flex items-center gap-3">
          <FaUserDoctor className="text-2xl text-[#010218]" />
          <h1 className={styles.title}>Doctor List</h1>
        </div>
        <p className={styles.subtitle}>Find and connect with heart specialists easily.</p>
      </div>

      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <div className={`${styles.statIcon} bg-green-100 text-green-600`}><HiUsers /></div>
          <div><p className={styles.statLabel}>Total Doctors</p><p className={styles.statValue}>{allDoctors.length}+</p></div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statItem}>
          <div className={`${styles.statIcon} bg-yellow-100 text-yellow-600`}><MdStars /></div>
          <div><p className={styles.statLabel}>Top Rated</p><p className={styles.statValue}>89%</p></div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.statItem}>
          <div className={`${styles.statIcon} bg-blue-100 text-blue-600`}><MdMonitor /></div>
          <div><p className={styles.statLabel}>Active Now</p><p className={styles.statValue}>32</p></div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className={styles.filterBar}>
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-2"><span>Rating:</span> <select className={styles.select}><option>Highest Rated</option></select></div>
          <div className="flex items-center gap-2"><span>Location:</span> <select className={styles.select}><option>All Cities</option></select></div>
          <div className="flex items-center gap-2"><span>Price:</span> <select className={styles.select}><option>All Ranges</option></select></div>
        </div>
        <div className={styles.searchBox}>
          <MdSearch className={styles.searchIcon} />
          <input type="text" placeholder="Search by name" className={styles.searchInput} />
        </div>
      </div>

      {/* Grid Section - Using Flex as requested */}
      <div className={styles.doctorGrid}>
        {currentDoctors.map(doc => (
          <PatientDoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>

      {/* Pagination Slider Controls */}
      <div className={styles.pagination}>
        <button 
          className={styles.pageBtn} 
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <HiChevronLeft />
        </button>
        
        {[1, 2].map(number => (
          <button 
            key={number} 
            className={`${styles.pageBtn} ${currentPage === number ? styles.activePage : ''}`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}

        <button 
          className={styles.pageBtn} 
          onClick={() => indexOfLastDoctor < allDoctors.length && paginate(currentPage + 1)}
          disabled={indexOfLastDoctor >= allDoctors.length}
        >
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default PatientDoctorList;
