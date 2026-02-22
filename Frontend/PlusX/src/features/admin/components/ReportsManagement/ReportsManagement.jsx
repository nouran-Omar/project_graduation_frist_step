import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ReportsManagement.module.css';
import {
  HiOutlineFlag,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineTrash,
  HiOutlineEye,
  HiExclamationTriangle,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineBookOpen,
  HiArrowPath,
} from 'react-icons/hi2';
import { FiCheckCircle } from "react-icons/fi";
import { HiOutlineX } from "react-icons/hi";
import Toast from '../../../../components/Toast/Toast';
import { MOCK_REPORTS } from './reportsMockData';

// ── Delete Content Confirm Modal ────────────────────────────────
function DeleteContentModal({ report, onConfirm, onCancel }) {
  if (!report) return null;
  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className={styles.deleteModal}>
        {/* Icon */}
        <div className={styles.deleteIconWrap}>
          <HiExclamationTriangle className={styles.deleteIcon} />
        </div>

        <h2 className={styles.deleteTitle}>Delete Content</h2>
        <p className={styles.deleteSubtitle}>This action cannot be undone</p>

        {/* Content preview */}
        <div className={styles.deletePreview}>
          <p className={styles.deletePreviewLine}>
            <strong>Type:</strong> {report.contentType.toLowerCase()}
          </p>
          <p className={styles.deletePreviewLine}>
            <strong>Author:</strong> {report.contentAuthor}
          </p>
          <p className={styles.deletePreviewQuote}>{report.contentText}</p>
        </div>

        <p className={styles.deleteWarning}>
          Are you sure you want to permanently delete this content?
          This will remove it from the platform and notify the author.
        </p>

        <div className={styles.deleteBtnRow}>
          <button className={styles.deleteCancelBtn} onClick={onCancel}>Cancel</button>
          <button className={styles.deleteConfirmBtn} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────
export default function ReportsManagement() {
  const navigate = useNavigate();
  const [reports, setReports] = useState(MOCK_REPORTS);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState({ visible: false, title: '', message: '' });

  const showToast = (title, message) => {
    setToast({ visible: true, title, message });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
  };

  // ── Live stats ───────────────────────────────────────────────
  const stats = useMemo(() => ({
    total:     reports.length,
    pending:   reports.filter(r => r.status === 'Pending').length,
    reviewed:  reports.filter(r => r.status === 'Reviewed').length,
    dismissed: reports.filter(r => r.status === 'Dismissed').length,
  }), [reports]);

  // ── Actions ──────────────────────────────────────────────────
  const handleMarkReviewed = (id) => {
    setReports(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'Reviewed' } : r)
    );
    showToast('Marked as Reviewed', 'The report has been marked as reviewed.');
  };

  const handleDismiss = (id) => {
    setReports(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'Dismissed' } : r)
    );
    showToast('Report Dismissed', 'The report has been dismissed successfully.');
  };

  const handleReopen = (id) => {
    setReports(prev =>
      prev.map(r => r.id === id ? { ...r, status: 'Pending' } : r)
    );
    showToast('Report Reopened', 'The report has been moved back to Pending.');
  };

  const handleDeleteClick = (report) => {
    setDeleteTarget(report);
  };

  const handleDeleteConfirm = () => {
    setReports(prev => prev.filter(r => r.id !== deleteTarget.id));
    setDeleteTarget(null);
    showToast('Content Deleted', 'The reported content has been permanently removed.');
  };

  const handleViewContent = (report) => {
    if (report.storyId) {
      navigate(`/admin/stories/${report.storyId}`);
    }
  };

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
      <DeleteContentModal
        report={deleteTarget}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* ── Page Header ──────────────────────────── */}
      <div className={styles.pageHeader}>
        <div className={styles.titleRow}>
          <HiOutlineFlag className={styles.titleIcon} />
          <h1 className={styles.pageTitle}>Reports Management</h1>
        </div>
        <p className={styles.pageSubtitle}>Review and manage reported content from the community</p>
      </div>

      {/* ── Stat Cards ──────────────────────────────── */}
      <div className={styles.statsRow}>
        <StatCard
          label="Total Reports"
          value={stats.total}
          icon={<HiOutlineFlag />}
          bg="linear-gradient(135deg, #333cf5 0%, #5b62f7 100%)"
          trendIcon={<span className={styles.trendUp}>↗</span>}
        />
        <StatCard
          label="Pending Review"
          value={stats.pending}
          icon={<HiOutlineClock />}
          bg="linear-gradient(135deg, #f97316 0%, #fb923c 100%)"
          trendIcon={<HiExclamationTriangle className={styles.trendWarn} />}
        />
        <StatCard
          label="Reviewed"
          value={stats.reviewed}
          icon={< FiCheckCircle/>}
          bg="linear-gradient(135deg, #16a34a 0%, #22c55e 100%)"
       />
        <StatCard
          label="Dismissed"
          value={stats.dismissed}
          icon={<HiOutlineX  />}
          bg="linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)"
        />
      </div>

      {/* ── Reports List ─────────────────────────────── */}
      <div className={styles.reportsList}>
        {reports.length === 0 ? (
          <div className={styles.empty}>No reports found.</div>
        ) : (
          reports.map(report => (
            <ReportCard
              key={report.id}
              report={report}
              onMarkReviewed={() => handleMarkReviewed(report.id)}
              onDismiss={() => handleDismiss(report.id)}
              onReopen={() => handleReopen(report.id)}
              onDelete={() => handleDeleteClick(report)}
              onView={() => handleViewContent(report)}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ── StatCard ────────────────────────────────────────────────────
function StatCard({ label, value, icon, bg, trendIcon }) {
  return (
    <div className={styles.statCard} style={{ background: bg }}>
      <div className={styles.statTop}>
        <span className={styles.statIcon}>{icon}</span>
        {trendIcon}
      </div>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
    </div>
  );
}

// ── ReportCard ──────────────────────────────────────────────────
function ReportCard({ report, onMarkReviewed, onDismiss, onReopen, onDelete, onView }) {
  const isPending   = report.status === 'Pending';
  const isReviewed  = report.status === 'Reviewed';
  const isDismissed = report.status === 'Dismissed';

  const contentTypeIcon =
    report.contentType === 'Comment' ? <HiOutlineChatBubbleOvalLeft /> :
    report.contentType === 'Reply'   ? <HiOutlineChatBubbleOvalLeft /> :
    <HiOutlineBookOpen />;

  return (
    <div className={styles.reportCard}>
      {/* ── Reporter Row ────────── */}
      <div className={styles.reporterRow}>
        {report.reporterAvatar ? (
          <img src={report.reporterAvatar} alt={report.reportedBy} className={styles.reporterAvatar} />
        ) : (
          <div className={styles.reporterAvatarFallback}>
            <HiOutlineFlag />
          </div>
        )}

        <div className={styles.reporterInfo}>
          <span className={styles.reporterName}>Reported by {report.reportedBy}</span>
          <span className={styles.reporterTime}>{report.reporterTime}</span>
        </div>

        <div className={styles.badgesRow}>
          {/* Status badge */}
          <span className={
            isPending   ? styles.badgePending   :
            isReviewed  ? styles.badgeReviewed  :
            styles.badgeDismissed
          }>
            {report.status}
          </span>

          {/* Category badge */}
          <span className={styles.badgeCategory}>{report.category}</span>

          {/* Content type badge */}
          <span className={styles.badgeType}>
            {contentTypeIcon} {report.contentType}
          </span>
        </div>
      </div>

      {/* ── Story reference ─────── */}
      <p className={styles.storyRef}>
        In story: <em>"{report.storyTitle}"</em>
      </p>

      {/* ── Flagged Content Box ──── */}
      <div className={styles.contentBox}>
        <p className={styles.contentBoxAuthor}>
          <HiExclamationTriangle className={styles.warnIcon} />
          Content by {report.contentAuthor}:
        </p>
        <p className={styles.contentBoxText}>{report.contentText}</p>
      </div>

      {/* ── Report Reason ───────── */}
      <div className={styles.reasonBox}>
        <p className={styles.reasonLabel}>Report Reason:</p>
        <p className={styles.reasonText}>{report.reportReason}</p>
      </div>

      {/* ── Action Buttons ──────── */}
      <div className={styles.actionsRow}>
        {/* View Content — always shown */}
        <button className={styles.btnView} onClick={onView}>
          <HiOutlineEye /> View Content
        </button>

        {/* Pending actions */}
        {isPending && (
          <>
            <button className={styles.btnDelete} onClick={onDelete}>
              <HiOutlineTrash /> Delete Content
            </button>
            <button className={styles.btnReviewed} onClick={onMarkReviewed}>
              <HiOutlineCheckCircle /> Mark Reviewed
            </button>
            <button className={styles.btnDismiss} onClick={onDismiss}>
              <HiOutlineXCircle /> Dismiss
            </button>
          </>
        )}

        {/* Reviewed: can dismiss or reopen */}
        {isReviewed && (
          <>
            <button className={styles.btnDelete} onClick={onDelete}>
              <HiOutlineTrash /> Delete Content
            </button>
            <button className={styles.btnDismiss} onClick={onDismiss}>
              <HiOutlineXCircle /> Dismiss
            </button>
            <button className={styles.btnReopen} onClick={onReopen}>
              <HiArrowPath /> Reopen
            </button>
          </>
        )}

        {/* Dismissed: can reopen */}
        {isDismissed && (
          <button className={styles.btnReopen} onClick={onReopen}>
            <HiArrowPath /> Re-open
          </button>
        )}
      </div>
    </div>
  );
}
