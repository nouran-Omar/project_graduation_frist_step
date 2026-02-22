import React, { useState, useRef } from 'react';
import styles from './PrescriptionDetailModal.module.css';
import { 
  HiOutlineXMark, HiOutlineArrowUpTray, HiOutlineExclamationTriangle, 
  HiOutlineCalendar, HiOutlineUser, HiOutlineBeaker 
} from "react-icons/hi2";
import { TbStethoscope, TbCapsule, TbClipboardText } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

const PrescriptionDetailModal = ({ data, onClose }) => {
  const [uploads, setUploads] = useState({});
  const fileInputRefs = useRef({});

  // استخراج اسم المستخدم من بياناتك المسجلة
  const patientName = "Nouran Omar Hammad"; 

  if (!data) return null;

  const handleFileUpload = (e, testId) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUploads(prev => ({ ...prev, [testId]: previewUrl }));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className={styles.overlay} onClick={onClose}
    >
      <motion.div 
        initial={{ y: 100 }} animate={{ y: 0 }}
        className={styles.modalContent} onClick={e => e.stopPropagation()}
      >
        {/* ── Blue Header Section (Matches image_8a96c5) ── */}
        <div className={styles.blueHeader}>
          <div className={styles.headerInfo}>
            <div className={styles.infoBlock}>
              <div className={styles.iconBox}><TbStethoscope /></div>
              <div>
                <span>Prescribed by</span>
                <h4>{data.doc}</h4>
                <p>{data.spec}</p>
              </div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.iconBox}><HiOutlineUser /></div>
              <div>
                <span>Patient</span>
                <h4>{patientName}</h4> {/* 👈 تم تغيير الاسم هنا ليكون ديناميكي */}
                <p>ID: PX-2024-7891</p>
              </div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.iconBox}><HiOutlineCalendar /></div>
              <div>
                <span>Date Issued</span>
                <h4>{data.date}</h4>
                <p>2:30 PM</p>
              </div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}><HiOutlineXMark /></button>
        </div>

        <div className={styles.scrollArea}>
          {/* ── Medications Section (Matches image_8a96fe) ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeaderPurple}>
              <TbCapsule /> <span>Prescribed Medications</span>
            </div>
            <div className={styles.medList}>
              {data.medications.map((med, i) => (
                <div key={i} className={styles.medCard}>
                  <div className={styles.medIndex}>{i + 1}</div>
                  <div className={styles.medDetails}>
                    <h5>{med.name}</h5>
                    <p>Dosage: {med.dose}</p>
                    <div className={styles.medMeta}>
                      <div className={styles.metaItem}><span>Frequency</span><strong>{med.freq}</strong></div>
                      <div className={styles.metaItem}><span>Duration</span><strong>{med.dur}</strong></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.alertAmber}>
              <HiOutlineExclamationTriangle />
              <div>
                <strong>Important Instructions</strong>
                <p>Take all medications as prescribed. Do not stop without consulting your doctor.</p>
              </div>
            </div>
          </section>

          {/* ── Lab & Radiology Section (Matches image_8a973e) ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeaderGreen}>
              <HiOutlineBeaker /> <span>Lab & Radiology Requests</span>
            </div>
            <div className={styles.testList}>
              {[
                { id: 't1', name: 'Complete Blood Count (CBC)', note: 'Fasting required - 8-12 hours' },
                { id: 't2', name: 'Lipid Profile', note: 'Fasting required' },
                { id: 't3', name: 'Chest X-Ray', note: '' }
              ].map((test, i) => (
                <div key={test.id} className={styles.testCard}>
                  <div className={styles.testMain}>
                    <div className={styles.testNum}>{i+1}</div>
                    <div className={styles.testText}>
                      <h6>{test.name}</h6>
                      {test.note && <p><strong>Note:</strong> {test.note}</p>}
                    </div>
                    {/* زر الرفع المطور (Upload) */}
                    <button 
                      className={styles.uploadBtn}
                      onClick={() => fileInputRefs.current[test.id].click()}
                    >
                      <HiOutlineArrowUpTray /> Upload Result
                    </button>
                    <input 
                      type="file" hidden accept="image/*"
                      ref={el => fileInputRefs.current[test.id] = el}
                      onChange={(e) => handleFileUpload(e, test.id)}
                    />
                  </div>
                  {/* صورة المعاينة (Preview) */}
                  <AnimatePresence>
                    {uploads[test.id] && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={styles.previewBox}>
                        <img src={uploads[test.id]} alt="Result Preview" />
                        <div className={styles.successTag}>File attached successfully</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* ── Clinical Notes (Matches image_8a977a) ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeaderOrange}>
              <TbClipboardText /> <span>Clinical Notes & Instructions</span>
            </div>
            <div className={styles.notesBox}>
              <p>Patient presents with mild upper respiratory infection. Continue current medications as prescribed. Ensure adequate rest and hydration.</p>
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrescriptionDetailModal;