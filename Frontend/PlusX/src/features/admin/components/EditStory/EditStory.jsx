import React, { useState } from 'react';
import styles from './EditStory.module.css';
import { HiOutlineXMark, HiOutlinePhoto } from 'react-icons/hi2';

const TAG_OPTIONS = ['Recovery', 'Mental Health', 'Lifestyle', 'Cancer', 'Heart', 'Health'];
const STATUS_OPTIONS = ['Published', 'Hidden'];

export default function EditStory({ story, onSave, onClose }) {
  const [form, setForm] = useState({
    title:  story.title  || '',
    desc:   story.desc   || '',
    status: story.status === 'Deleted' ? 'Published' : (story.status || 'Published'),
    tags:   story.tags   || [],
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleTag = (tag) => {
    setForm(prev => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({ ...story, ...form });
  };

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>Edit Story</h2>
            <p className={styles.modalSubtitle}>Update story information and settings</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose} type="button">
            <HiOutlineXMark />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Cover preview */}
          <div className={styles.coverPreviewWrap}>
            <div
              className={styles.coverPreview}
              style={{ backgroundImage: `url(${story.coverFull || story.cover})` }}
            >
              <div className={styles.coverOverlay}>
                <HiOutlinePhoto className={styles.coverIcon} />
                <span className={styles.coverLabel}>Story Cover</span>
              </div>
            </div>
          </div>

          {/* Author info (read-only) */}
          <div className={styles.authorRow}>
            <img src={story.avatar} alt={story.author} className={styles.authorAvatar} />
            <div>
              <p className={styles.authorName}>{story.author}</p>
              <p className={styles.authorMeta}>Author · {story.date}</p>
            </div>
          </div>

          {/* Title */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Story Title <span className={styles.required}>*</span></label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className={styles.input}
              placeholder="Enter story title…"
              required
            />
          </div>

          {/* Description */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Short Description</label>
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="Brief description shown in the story list…"
              rows={3}
            />
          </div>

          {/* Status */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Status</label>
            <select name="status" value={form.status} onChange={handleChange} className={styles.select}>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Tags */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Tags</label>
            <div className={styles.tagsWrap}>
              {TAG_OPTIONS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  className={`${styles.tagChip} ${form.tags.includes(tag) ? styles.tagChipActive : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className={styles.btnRow}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.saveBtn}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
