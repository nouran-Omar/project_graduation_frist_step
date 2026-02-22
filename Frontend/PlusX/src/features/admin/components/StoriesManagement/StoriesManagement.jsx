import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './StoriesManagement.module.css';
import { FaTrash } from "react-icons/fa";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlinePencilSquare,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineEyeSlash,
} from 'react-icons/hi2';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdOutlineAutoStories } from 'react-icons/md';
import { FaBookOpen } from 'react-icons/fa6';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Toast from '../../../../components/Toast/Toast';
import EmptyState from '../shared/EmptyState/EmptyState';
import {
  MOCK_STORIES as INITIAL_STORIES,
  TAG_OPTIONS,
  STATUS_OPTIONS,
  SORT_OPTIONS,
} from './storiesMockData';

const PAGE_SIZE_REAL = 10;
const MAX_VISIBLE_PAGES = 5;

export default function StoriesManagement() {
  const navigate = useNavigate();

  const [stories, setStories]   = useState(INITIAL_STORIES);
  const [tag, setTag]           = useState('All');
  const [status, setStatus]     = useState('All');
  const [sort, setSort]         = useState('Normal');
  const [search, setSearch]     = useState('');
  const [page, setPage]         = useState(1);

  // Modals
  const [deleteModal, setDeleteModal] = useState({ open: false, story: null });

  // Toast
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  const showToast = (title, message) => {
    setToast({ visible: true, title, message });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  // ── Derived lists ──────────────────────────────────────────
  const filtered = useMemo(() => {
    let list = [...stories];
    if (status !== 'All') list = list.filter(s => s.status === status);
    if (search.trim())    list = list.filter(s =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.author.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === 'Newest') list = list.reverse();
    if (sort === 'Oldest') list = [...list].reverse();
    return list;
  }, [stories, status, search, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE_REAL);
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE_REAL, page * PAGE_SIZE_REAL);

  const handlePageChange = (p) => {
    if (p >= 1 && p <= totalPages) setPage(p);
  };

  // ── Smart pagination: show first 5 pages, then "..." then last page
  const buildPageNums = () => {
    if (totalPages <= MAX_VISIBLE_PAGES) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages = Array.from({ length: MAX_VISIBLE_PAGES }, (_, i) => i + 1);
    if (page > MAX_VISIBLE_PAGES && totalPages > MAX_VISIBLE_PAGES) {
      return [...pages, '...', totalPages];
    }
    return [...pages, '...', totalPages];
  };
  const pageNums = buildPageNums();

  // ── Actions ────────────────────────────────────────────────
  const handleRowClick = (story) => {
    navigate(`/admin/stories/${story.id}`);
  };

  const handleToggleHide = (e, story) => {
    e.stopPropagation();
    const newStatus = story.status === 'Hidden' ? 'Published' : 'Hidden';
    setStories(prev => prev.map(s => s.id === story.id ? { ...s, status: newStatus } : s));
    if (newStatus === 'Hidden') {
      showToast('Story Hidden Successfully', 'Your changes have been saved successfully.');
    } else {
      showToast('Story Unhidden Successfully', 'Your changes have been saved successfully.');
    }
  };

  const handleDeleteClick = (e, story) => {
    e.stopPropagation();
    setDeleteModal({ open: true, story });
  };

  const handleDeleteConfirm = () => {
    const story = deleteModal.story;
    setStories(prev => prev.map(s => s.id === story.id ? { ...s, status: 'Deleted' } : s));
    setDeleteModal({ open: false, story: null });
    showToast('Story Deleted Successfully', 'Your changes have been saved successfully.');
  };

  // Live stat counts from state
  const liveStats = useMemo(() => ({
    total:     stories.length,
    published: stories.filter(s => s.status === 'Published').length,
    hidden:    stories.filter(s => s.status === 'Hidden').length,
    deleted:   stories.filter(s => s.status === 'Deleted').length,
  }), [stories]);

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
        title="Delete Story?"
        desc="Are you sure you want to delete this story? This action is permanent and cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteModal({ open: false, story: null })}
      />

      {/* ── Page Header ──────────────────────────────── */}
      <div className={styles.pageHeader}>
        <div>
          <div className={styles.titleRow}>
             <HiOutlinePencilSquare className={styles.editIcon} />
            <h1 className={styles.pageTitle}>Patient Stories</h1>
           </div>
          <p className={styles.pageSubtitle}>Read and share inspiring patient journeys.</p>
        </div>
      </div>

      {/* ── Stat Cards ───────────────────────────────── */}
      <div className={styles.statsRow}>
        <StatCard label="Total Stories"     value={liveStats.total}     icon={<FaBookOpen />} iconBg="#EEF2FF" iconColor="#333CF5" />
        <StatCard label="Published Stories" value={liveStats.published} icon={<FaEye/>} iconBg="#ECFDF5" iconColor="#16A34A" />
        <StatCard label="Hidden Stories"    value={liveStats.hidden}    icon={ <FaEyeSlash/>} iconBg="#FFF7ED" iconColor="#757575" />
        <StatCard label="Deleted Stories"   value={liveStats.deleted}   icon={<FaTrash />}       iconBg="#FEF2F2" iconColor="#EF4444" />
      </div>

      {/* ── Filters Bar ──────────────────────────────── */}
      <div className={styles.filtersBar}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Tags:</label>
          <select className={styles.select} value={tag} onChange={e => { setTag(e.target.value); setPage(1); }}>
            {TAG_OPTIONS.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Status:</label>
          <select className={styles.select} value={status} onChange={e => { setStatus(e.target.value); setPage(1); }}>
            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Sort By:</label>
          <select className={styles.select} value={sort} onChange={e => setSort(e.target.value)}>
            {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className={styles.searchBox}>
          <HiOutlineMagnifyingGlass className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name"
            className={styles.searchInput}
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      {/* ── Table ────────────────────────────────────── */}
      <div className={styles.tableCard}>
        {paginated.length === 0 ? (
          <EmptyState
            icon={<FaBookOpen />}
            title="No Stories Yet"
            description="No stories have been submitted by patients. They will appear here once published."
            accentColor="#FFF7ED"
            iconColor="#EA580C"
          />
        ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Story</th>
              <th>Author</th>
              <th>Date Published</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map(story => (
                <tr
                  key={story.id}
                  className={styles.clickableRow}
                  onClick={() => handleRowClick(story)}
                >
                  {/* Story col */}
                  <td>
                    <div className={styles.storyCell}>
                      <img src={story.cover} alt={story.title} className={styles.storyCover} />
                      <div className={styles.storyInfo}>
                        <p className={styles.storyTitle}>{story.title}</p>
                        <p className={styles.storyDesc}>{story.desc}</p>
                      </div>
                    </div>
                  </td>

                  {/* Author col */}
                  <td>
                    <div className={styles.authorCell}>
                      <img src={story.avatar} alt={story.author} className={styles.authorAvatar} />
                      <span className={styles.authorName}>{story.author}</span>
                    </div>
                  </td>

                  {/* Date col */}
                  <td className={styles.dateCell}>{story.date}</td>

                  {/* Status col */}
                  <td>
                    <span className={
                      story.status === 'Published' ? styles.badgePublished :
                      story.status === 'Hidden'    ? styles.badgeHidden    :
                      styles.badgeDeleted
                    }>
                      {story.status}
                    </span>
                  </td>

                  {/* Actions col */}
                  <td onClick={e => e.stopPropagation()}>
                    <div className={styles.actions}>
                      {/* Hide / Unhide */}
                      <button
                        className={`${styles.actionBtn} ${story.status === 'Hidden' ? styles.actionUnhide : styles.actionHide}`}
                        title={story.status === 'Hidden' ? 'Unhide Story' : 'Hide Story'}
                        onClick={(e) => handleToggleHide(e, story)}
                        disabled={story.status === 'Deleted'}
                        style={{
                          color: story.status === 'Hidden' ? '#8B8C8D' : '#333CF5',
                          background: story.status === 'Hidden' ? '#f3f4f6' : '#eef2ff',
                        }}
                      >
                        {story.status === 'Hidden' ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                      </button>

                      {/* Delete */}
                      <button
                        className={`${styles.actionBtn} ${styles.actionDelete}`}
                        title="Delete Story"
                        onClick={(e) => handleDeleteClick(e, story)}
                        disabled={story.status === 'Deleted'}
                      >
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        )}

        {/* ── Pagination ─────────────────────────────── */}
        <div className={styles.pagination}>
          <span className={styles.paginationInfo}>
            Showing {paginated.length === 0 ? 0 : (page - 1) * PAGE_SIZE_REAL + 1} to {Math.min(page * PAGE_SIZE_REAL, filtered.length)} of {filtered.length} stories
          </span>
          <div className={styles.paginationControls}>
            <button
              className={styles.pageArrow}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              <HiChevronLeft />
            </button>

            {pageNums.map((n, idx) =>
              n === '...' ? (
                <span key={`ellipsis-${idx}`} className={styles.ellipsis}>...</span>
              ) : (
                <button
                  key={n}
                  className={`${styles.pageBtn} ${page === n ? styles.pageBtnActive : ''}`}
                  onClick={() => handlePageChange(n)}
                >
                  {n}
                </button>
              )
            )}

            <button
              className={styles.pageArrow}
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages || totalPages === 0}
            >
              <HiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── StatCard sub-component ─────────────────────────────────────
function StatCard({ label, value, icon, iconBg, iconColor }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statInfo}>
        <p className={styles.statLabel}>{label}</p>
        <p className={styles.statValue}>{value.toLocaleString()}</p>
      </div>
      <div className={styles.statIconWrap} style={{ background: iconBg, color: iconColor }}>
        {icon}
      </div>
    </div>
  );
}


