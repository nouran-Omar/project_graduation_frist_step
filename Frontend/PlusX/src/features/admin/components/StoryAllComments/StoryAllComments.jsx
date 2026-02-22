import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './StoryAllComments.module.css';
import {
  HiArrowLeft,
  HiOutlineTrash,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineHandThumbUp,
  HiOutlineArrowUturnLeft,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Toast from '../../../../components/Toast/Toast';
import { MOCK_STORIES, MOCK_COMMENTS } from '../StoriesManagement/storiesMockData';

export default function StoryAllComments() {
  const { id } = useParams();
  const navigate = useNavigate();

  const story = MOCK_STORIES.find(s => String(s.id) === String(id));

  // Seed comments — if no specific ones exist, use story #1's as fallback
  const seedComments = MOCK_COMMENTS[id] || MOCK_COMMENTS[1] || [];
  const [comments, setComments] = useState(seedComments);

  const [deleteModal, setDeleteModal] = useState({ open: false, commentId: null });
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  const showToast = (title, message) => {
    setToast({ visible: true, title, message });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  const handleDeleteClick = (commentId) => {
    setDeleteModal({ open: true, commentId });
  };

  const handleDeleteConfirm = () => {
    setComments(prev => prev.filter(c => c.id !== deleteModal.commentId));
    setDeleteModal({ open: false, commentId: null });
    showToast('Comment Deleted', 'The comment has been removed successfully.');
  };

  if (!story) {
    return (
      <div className={styles.notFound}>
        <h2>Story not found.</h2>
        <button className={styles.backBtn} onClick={() => navigate('/admin/stories-management')}>
          <HiArrowLeft /> Back to Stories
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>

      {/* Toast */}
      <Toast
        visible={toast.visible}
        title={toast.title}
        message={toast.message}
        type="success"
        onClose={() => setToast(t => ({ ...t, visible: false }))}
      />

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteModal.open}
        title="Delete Comment?"
        desc="Are you sure you want to delete this comment? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ open: false, commentId: null })}
      />

      {/* ── Back + Header ─────────────────────────── */}
      <button className={styles.backBtn} onClick={() => navigate(`/admin/stories/${id}`)}>
        <HiArrowLeft /> Back to Story
      </button>

      <div className={styles.pageHeader}>
        <div className={styles.titleRow}>
          <HiOutlineChatBubbleOvalLeft className={styles.titleIcon} />
          <h1 className={styles.pageTitle}>All Comments</h1>
        </div>
        <p className={styles.pageSubtitle}>
          {comments.length} comments on &ldquo;{story.title}&rdquo;
        </p>
      </div>

      {/* ── Comments List ─────────────────────────── */}
      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <div className={styles.empty}>No comments yet.</div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className={`${styles.commentCard} ${comment.flagged ? styles.commentFlagged : ''}`}>

              {/* Flagged Banner */}
              {comment.flagged && (
                <div className={styles.flaggedBanner}>
                  <HiOutlineExclamationTriangle className={styles.flagIcon} />
                  Flagged for Review – Potentially Inappropriate Content
                </div>
              )}

              {/* Comment Body */}
              <div className={styles.commentInner}>
                {/* Avatar */}
                {comment.avatar ? (
                  <img src={comment.avatar} alt={comment.author} className={styles.commentAvatar} />
                ) : (
                  <div className={styles.commentAvatarFallback}>
                    {comment.author[0]}
                  </div>
                )}

                {/* Content */}
                <div className={styles.commentContent}>
                  <div className={styles.commentTop}>
                    <div className={styles.commentMeta}>
                      <span className={styles.commentAuthor}>{comment.author}</span>
                      {comment.role && (
                        <span className={`${styles.roleChip} ${comment.role === 'Doctor' ? styles.roleDoctor : styles.rolePatient}`}>
                          {comment.role}
                        </span>
                      )}
                    </div>
                    <button
                      className={styles.deleteCommentBtn}
                      title="Delete comment"
                      onClick={() => handleDeleteClick(comment.id)}
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>

                  <div className={styles.commentTime}>
                    <span className={styles.timeIcon}>📅</span>
                    {comment.time}
                  </div>

                  <p className={styles.commentText}>{comment.text}</p>

                  {/* Likes + Replies */}
                  <div className={styles.commentActions}>
                    <span className={styles.commentAction}>
                      <HiOutlineHandThumbUp className={styles.actionIcon} />
                      {comment.likes}
                    </span>
                    <span className={styles.commentAction}>
                      <HiOutlineArrowUturnLeft className={styles.actionIcon} />
                      {comment.replies} {comment.replies === 1 ? 'reply' : 'replies'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
