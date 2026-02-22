import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WriteStory.module.css';
import { HiOutlineCloudUpload, HiOutlinePencilAlt } from "react-icons/hi";
import SuccessPopup from '../../../admin/components/SuccessPopup/SuccessPopup';

const WriteStory = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 1. States للإدارة
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 2. الأكشن: اختيار صورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 3. الأكشن: النشر والتحويل التلقائي (Logic Check)
  const handlePublish = () => {
    if (!title.trim() || !story.trim()) {
      alert("Please fill in the title and your story!");
      return;
    }

    // إظهار الـ Popup
    setIsPopupOpen(true); 

    // الانتظار لمدة 3 ثواني (الفترة المعينة) ثم الرجوع لصفحة القصص
    setTimeout(() => {
      setIsPopupOpen(false); // إخفاء البوبب
      navigate('/patient/stories'); // الرجوع لصفحة الـ Stories أوتوماتيك
    }, 3000); 
  };

  return (
    <div className={styles.pageWrapper}>
      {/* استدعاء البوبب الديناميكي */}
      <SuccessPopup 
        isOpen={isPopupOpen} 
        title="Story Published Successfully" 
        desc="Your changes have been saved successfully" 
      />

      <div className={styles.mainFrame}>
        <header className={styles.header}>
          <div className="flex items-center gap-3">
            <HiOutlinePencilAlt className="text-3xl text-[#010218]" />
            <h1 className={styles.mainTitle}>Write Story</h1>
          </div>
          <p className={styles.subtitle}>Share your personal health journey to inspire others.</p>
        </header>

        {/* Input Title */}
        <div className={styles.inputGroup}>
          <label>Story Title <span className="text-red-600">*</span></label>
          <input 
            type="text" 
            placeholder="Give your story a compelling title..." 
            className={styles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Upload Section */}
        <div className={styles.uploadGroup}>
          <label>Cover Image <span>(Optional)</span></label>
          <div className={styles.dropZone} onClick={() => fileInputRef.current.click()}>
            {imagePreview ? (
              <img src={imagePreview} className={styles.previewImg} alt="Preview" />
            ) : (
              <div className={styles.uploadContent}>
                <HiOutlineCloudUpload className={styles.uploadIcon} />
                <h3>Drag and drop your image here</h3>
                <p>or click to browse files</p>
                <span className={styles.formats}>Supported formats: JPG, PNG, GIF (Max 5MB)</span>
              </div>
            )}
            <input type="file" ref={fileInputRef} hidden onChange={handleImageChange} accept="image/*" />
          </div>
        </div>

        {/* Your Story Section */}
        <div className={styles.inputGroup}>
          <label>Your Story</label>
          <textarea 
            placeholder="Share your health journey in detail..." 
            className={styles.storyArea}
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <footer className={styles.footer}>
          <button className={styles.cancelBtn} onClick={() => navigate('/patient/stories')}>
            Cancel
          </button>
          <button className={styles.publishBtn} onClick={handlePublish}>
            Publish Story
          </button>
        </footer>
      </div>
    </div>
  );
};

export default WriteStory;