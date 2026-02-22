import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PatientStories.module.css';
import { HiOutlineArrowRight, HiOutlinePencilAlt, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { SiMicrodotblog } from "react-icons/si";

const PatientStories = () => {
  const navigate = useNavigate();

  // 1. داتا وهمية كتير (Fake Data) عشان السلايدر يشتغل بجد
  const allStories = [
    { id: 1, author: "Sarah M.", date: "March 15, 2024", title: "Nutrition Changes That Transformed My Health", tags: ["Lifestyle", "Health"], img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    { id: 2, author: "Salem R.", date: "March 12, 2024", title: "Overcoming Heart Surgery Recovery", tags: ["Challenges", "Health"], img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
    { id: 3, author: "Noha Ali.", date: "March 15, 2024", title: "Overcoming Anxiety During Treatment", tags: ["Success Story", "Lifestyle"], img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" },
    { id: 4, author: "Nour R.", date: "March 12, 2024", title: "Finding Balance: Work and Chronic Pain", tags: ["Challenges", "Health"], img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" },
    { id: 5, author: "Sondos M.", date: "March 15, 2024", title: "Building a Support Network", tags: ["Lifestyle", "Health"], img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
    { id: 6, author: "Mohamed S.", date: "March 12, 2024", title: "My Journey to Recovery", tags: ["Success Story", "Lifestyle"], img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    { id: 7, author: "Ali K.", date: "Feb 20, 2024", title: "Life After Pacemaker Surgery", tags: ["Health"], img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100" },
    { id: 8, author: "Mona H.", date: "Jan 10, 2024", title: "Mental Strength in Recovery", tags: ["Lifestyle"], img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
    { id: 9, author: "Khaled J.", date: "Dec 05, 2023", title: "Running a Marathon with Heart Health", tags: ["Success Story"], img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" },
    { id: 10, author: "Rana W.", date: "Nov 15, 2023", title: "How Daily Walking Saved Me", tags: ["Lifestyle"], img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" },
    { id: 11, author: "Youssef T.", date: "Oct 12, 2023", title: "Managing High Blood Pressure", tags: ["Health"], img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" },
    { id: 12, author: "Alaa Z.", date: "Sep 30, 2023", title: "Healthy Eating for a Stronger Heart", tags: ["Lifestyle", "Health"], img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" },
  ];

  // 2. منطق السلايدر (Dynamic Logic)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // عرض 4 قصص فقط في المرة

  const totalPages = Math.ceil(allStories.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStories = allStories.slice(indexOfFirst, indexOfLast);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className="flex items-center gap-3">
          <SiMicrodotblog className="text-3xl text-[#010218]" />
          <h1 className={styles.title}>Stories</h1>
        </div>
        <p className={styles.subtitle}>Read and share inspiring patient journeys.</p>
      </header>

      {/* Grid using Flex as requested */}
      <div className={styles.storiesGrid}>
        {currentStories.map(story => (
          <div key={story.id} className={styles.storyCard}>
            <div className={styles.authorInfo}>
              <img src={story.img} alt={story.author} className={styles.avatar} />
              <div>
                <h4>{story.author}</h4>
                <span>{story.date}</span>
              </div>
            </div>
            <h3 className={styles.storyTitle}>{story.title}</h3>
            <p className={styles.excerpt}>
              "Last year, my heart health was at a critical point. Thanks to the right care and community support, I transformed my life..."
            </p>
            <div className={styles.cardFooter}>
              <div className={styles.tags}>
                {story.tags.map(tag => (
                  <span key={tag} className={`${styles.tag} ${tag === 'Lifestyle' ? styles.orange : styles.blue}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <button className={styles.readBtn} onClick={() => navigate(`/patient/stories/${story.id}`)}>
                Read Story <HiOutlineArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Slider/Pagination Navigation */}
      <div className={styles.paginationRow}>
        <div className={styles.pagination}>
          <button 
            className={styles.pageBtn} 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <HiOutlineChevronLeft />
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i + 1} 
              className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.activePage : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button 
            className={styles.pageBtn} 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <HiOutlineChevronRight />
          </button>
        </div>
        
        <button className={styles.writeBtn} onClick={() => navigate('/patient/write-story')}>
          <HiOutlinePencilAlt /> Write Story
        </button>
      </div>
    </div>
  );
};

export default PatientStories;
