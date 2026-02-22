import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PatientStoryDetails.module.css';
// import { LuBookFilled } from "react-icons/lu";
// PatientStoryDetails.jsx

// 1. تأكدي من استدعاء الأيقونة الصحيحة من مكتبة tb
import { TbBook } from "react-icons/tb"; 
import { 
  HiOutlineHeart, 
  HiHeart, 
  HiOutlineChatBubbleOvalLeft, 
  HiOutlineShare, 
  HiOutlineChevronLeft, 
  HiOutlinePencilSquare 
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

const PatientStoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. الداتا الوهمية (المحاكاة للباك إند)
  const storyData = {
    id: 1,
    author: "Sarah M.",
    date: "March 12, 2024",
    title: "Nutrition Changes That Transformed My Health",
    content: [
      "When I first joined PulseX six months ago, I was struggling with chronic fatigue and brain fog...",
      "The turning point came when my care coordinator suggested a comprehensive nutrition plan...",
      "Three months into my new plan, the changes were remarkable. My energy levels stabilized."
    ],
    mainImg: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800",
    likes: 132,
    commentsCount: 89,
    shares: 24
  };

  // 2. States للتفاعل
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(storyData.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Dr. Walid", text: "Amazing progress Sarah! Keep it up.", time: "2h ago" },
    { id: 2, user: "Mohamed S.", text: "This inspired me to start my own journey.", time: "5h ago" }
  ]);

  // 3. الأكشنز
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert("Story link copied to clipboard!");
  };

  const addComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const commentObj = { id: Date.now(), user: "Nouran Omar", text: newComment, time: "Just now" };
    setComments([commentObj, ...comments]);
    setNewComment("");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContainer}>
        
        {/* Header Section */}
    <header className={styles.header}>
  <div className="flex items-center gap-3">
    <TbBook className="text-3xl text-[#010218]" /> {/* 👈 التعديل هنا */}
    <h1 className={styles.title}>Patient Story Details</h1>
  </div>
  <p className={styles.subtitle}>Read full patient journey and shared experiences.</p>
</header>
        {/* Author Info Card */}
        <div className={styles.authorCard}>
          <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" alt="Sarah" className={styles.avatar} />
          <div className={styles.authorMeta}>
            <h3>{storyData.author}</h3>
            <p>Shared publicly to inspire other patients</p>
            <span>{storyData.date}</span>
          </div>
        </div>

        {/* Story Content */}
        <article className={styles.article}>
          <h2 className={styles.storyTitle}>{storyData.title}</h2>
          <div className={styles.textBody}>
            <p>{storyData.content[0]}</p>
            <p>{storyData.content[1]}</p>
            <img src={storyData.mainImg} className={styles.mainImg} alt="Healthy Food" />
            <p>{storyData.content[2]}</p>
          </div>
        </article>

        {/* Engagement Bar (Like, Comment, Share) */}
        <div className={styles.engagementBar}>
          <button className={`${styles.actionBtn} ${isLiked ? styles.activeHeart : ''}`} onClick={handleLike}>
            {isLiked ? <HiHeart /> : <HiOutlineHeart />} <span>{likesCount}</span>
          </button>
          
          <button className={styles.actionBtn} onClick={() => setShowComments(!showComments)}>
            <HiOutlineChatBubbleOvalLeft /> <span>{comments.length + storyData.commentsCount}</span>
          </button>

          <button className={styles.actionBtn} onClick={handleShare}>
            <HiOutlineShare /> <span>{storyData.shares}</span>
          </button>
        </div>

        {/* Comments Section Drawer */}
        <AnimatePresence>
          {showComments && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className={styles.commentsSection}>
              <form onSubmit={addComment} className={styles.commentInputRow}>
                <input type="text" placeholder="Write a comment..." value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                <button type="submit">Post</button>
              </form>
              <div className={styles.commentsList}>
                {comments.map(c => (
                  <div key={c.id} className={styles.commentItem}>
                    <strong>{c.user}</strong> <span>{c.time}</span>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* You May Also Like Section */}
        <div className={styles.relatedSection}>
          <h3 className={styles.relatedTitle}>You may also like</h3>
          <div className={styles.relatedGrid}>
            <RelatedCard title="How Exercise Became Medicine" author="Michael R." tag="Fitness" color="orange" />
            <RelatedCard title="Managing Stress Mindfulness" author="Emma L." tag="Mental Health" color="purple" />
            <RelatedCard title="Sleep Quality Changed" author="David K." tag="Sleep" color="indigo" />
          </div>
        </div>

        {/* Footer Navigation */}
        <footer className={styles.footer}>
          <button className={styles.backBtn} onClick={() => navigate('/patient/stories')}>
            <HiOutlineChevronLeft /> Back to Stories
          </button>
   <button className={styles.writeBtn} onClick={() => navigate('/patient/write-story')}>
  <HiOutlinePencilSquare /> Write Story
</button>
        </footer>

      </div>
    </div>
  );
};

// مكون فرعي للكروت الجانبية
const RelatedCard = ({ title, author, tag, color }) => (
  <div className={styles.relCard}>
    <div className="flex gap-3 mb-4">
      <div className={styles.smallAvatar}></div>
      <div><h6>{author}</h6><span>March 8, 2024</span></div>
    </div>
    <h4>{title}</h4>
    <span className={`${styles.tag} ${styles[color]}`}>{tag}</span>
    <button className={styles.readMore}>Read Story →</button>
  </div>
);

export default PatientStoryDetails;
