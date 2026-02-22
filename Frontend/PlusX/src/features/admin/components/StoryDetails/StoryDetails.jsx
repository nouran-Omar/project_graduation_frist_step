import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './StoryDetails.module.css';
import {
  HiArrowLeft,
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineShare,
  HiOutlineEyeSlash,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePencilSquare,
} from 'react-icons/hi2';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Toast from '../../../../components/Toast/Toast';
import { MOCK_STORIES, MOCK_COMMENTS } from '../StoriesManagement/storiesMockData';

export default function StoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stories, setStories] = useState(MOCK_STORIES);
  const story = stories.find(s => String(s.id) === String(id));

  const [comments, setComments] = useState(MOCK_COMMENTS[id] || []);
  const [deleteModal, setDeleteModal] = useState(false);
  const [hideModal, setHideModal]     = useState(false);
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  const showToast = (title, message) => {
    setToast({ visible: true, title, message });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
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

  const handleDeleteConfirm = () => {
    setStories(prev => prev.map(s => s.id === story.id ? { ...s, status: 'Deleted' } : s));
    setDeleteModal(false);
    showToast('Story Deleted Successfully', 'Your changes have been saved successfully.');
    setTimeout(() => navigate('/admin/stories-management'), 1500);
  };

  const handleHideConfirm = () => {
    const newStatus = story.status === 'Hidden' ? 'Published' : 'Hidden';
    setStories(prev => prev.map(s => s.id === story.id ? { ...s, status: newStatus } : s));
    setHideModal(false);
    showToast(
      newStatus === 'Hidden' ? 'Story Hidden Successfully' : 'Story Unhidden Successfully',
      'Your changes have been saved successfully.'
    );
  };

  const previewComments = comments.slice(0, 2);
  const totalComments = comments.length;

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

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={deleteModal}
        title="Delete Story?"
        desc="Are you sure you want to delete this story? This action is permanent and cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal(false)}
      />

      {/* Hide / Unhide Modal */}
      <ConfirmModal
        isOpen={hideModal}
        title={story.status === 'Hidden' ? 'Unhide Story?' : 'Hide Story?'}
        desc={
          story.status === 'Hidden'
            ? 'This story will become visible to the public again.'
            : 'This story will be hidden from public view.'
        }
        onConfirm={handleHideConfirm}
        onCancel={() => setHideModal(false)}
      />

      {/* ── Page Header ──────────────────────────── */}
      <div className={styles.pageHeader}>
        <div className={styles.headerLeft}>
          <h1 className={styles.pageTitle}>
            <span className={styles.bookIcon}>📖</span>
            Patient Story Details
          </h1>
          <p className={styles.pageSubtitle}>Read full patient journey and shared experiences.</p>
        </div>
      </div>

      {/* ── Author Card ───────────────────────────── */}
      <div className={styles.authorCard}>
        <img src={story.avatar} alt={story.author} className={styles.authorAvatar} />
        <div className={styles.authorInfo}>
          <h3 className={styles.authorName}>{story.author}</h3>
          <p className={styles.authorMeta}>Shared publicly to inspire other patients</p>
          <p className={styles.storyDate}>{story.date}</p>
          <div className={styles.tagsRow}>
            {(story.tags || []).map(tag => (
              <span key={tag} className={styles.tagChip}>{tag}</span>
            ))}
            {!story.tags?.length && (
              <>
                <span className={styles.tagChipSuccess}>Success Story</span>
                <span className={styles.tagChipBlue}>Lifestyle</span>
                <span className={styles.tagChipRed}>Health</span>
              </>
            )}
          </div>
        </div>
        <div className={styles.statusBadgeWrap}>
          <span className={
            story.status === 'Published' ? styles.badgePublished :
            story.status === 'Hidden'    ? styles.badgeHidden    :
            styles.badgeDeleted
          }>
            {story.status}
          </span>
        </div>
      </div>

      {/* ── Story Content ─────────────────────────── */}
      <div className={styles.contentCard}>
        <h2 className={styles.storyTitle}>{story.title}</h2>

        <div className={styles.storyBody}>
          {(story.content || story.desc).split('\n\n').map((paragraph, i) => (
            paragraph.trim() ? <p key={i} className={styles.paragraph}>{paragraph.trim()}</p> : null
          ))}
        </div>

        {story.coverFull && (
          <img
            src={story.coverFull}
            alt={story.title}
            className={styles.storyImage}
          />
        )}
      </div>

      {/* ── Engagement Bar ────────────────────────── */}
      <div className={styles.engagementBar}>
        <div className={styles.engagementItem}>
          <HiOutlineHeart className={styles.engagementIconHeart} />
          <span>{story.likes || 132}</span>
        </div>
        <div className={styles.engagementItem}>
          <HiOutlineChatBubbleOvalLeft className={styles.engagementIconComment} />
          <span>{totalComments}</span>
        </div>
        <div className={styles.engagementItem}>
          <HiOutlineShare className={styles.engagementIconShare} />
          <span>{story.shares || 24}</span>
        </div>
      </div>

      {/* ── Comments Preview ──────────────────────── */}
      <div className={styles.commentsCard}>
        <div className={styles.commentsHeader}>
          <h3 className={styles.commentsTitle}>Comments ({totalComments})</h3>
          <button
            className={styles.viewAllBtn}
            onClick={() => navigate(`/admin/stories/${id}/comments`)}
          >
            View All →
          </button>
        </div>

        <div className={styles.commentsList}>
          {previewComments.length === 0 ? (
            <p className={styles.noComments}>No comments yet.</p>
          ) : (
            previewComments.map(comment => (
              <div key={comment.id} className={styles.commentItem}>
                {comment.avatar ? (
                  <img src={comment.avatar} alt={comment.author} className={styles.commentAvatar} />
                ) : (
                  <div className={styles.commentAvatarFallback}>
                    {comment.author[0]}
                  </div>
                )}
                <div className={styles.commentBody}>
                  <div className={styles.commentTop}>
                    <span className={styles.commentAuthor}>{comment.author}</span>
                    <span className={styles.commentTime}>{comment.time}</span>
                  </div>
                  <p className={styles.commentText}>{comment.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Action Buttons Footer ─────────────────── */}
      <div className={styles.actionsFooter}>
        <button className={styles.backBtn} onClick={() => navigate('/admin/stories-management')}>
          <HiArrowLeft /> Back to Stories
        </button>

        <div className={styles.rightActions}>
          {/* Hide / Unhide */}
          <button
            className={styles.hideBtn}
            onClick={() => setHideModal(true)}
            disabled={story.status === 'Deleted'}
          >
            {story.status === 'Hidden'
              ? <><HiOutlineEye /> Unhide Story</>
              : <><HiOutlineEyeSlash /> Hide Story</>
            }
          </button>

          {/* Delete */}
          <button
            className={styles.deleteBtn}
            onClick={() => setDeleteModal(true)}
            disabled={story.status === 'Deleted'}
          >
            <HiOutlineTrash />
            Delete Story
          </button>
        </div>
      </div>
    </div>
  );
}
