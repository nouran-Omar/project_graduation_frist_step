import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PrescriptionDetail.module.css';
import { 
  HiOutlineArrowLeft, HiOutlineArrowUpTray, HiOutlineExclamationTriangle, 
  HiOutlineCalendar, HiOutlineUser, HiOutlineClock, HiOutlineTrash 
} from "react-icons/hi2";
import { TbStethoscope, TbCapsule, TbClipboardText, TbFileText, TbCheck } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

const PrescriptionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRefs = useRef({});

  // 1. States لإدارة البيانات والتحميل
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [labUploads, setLabUploads] = useState({});
  const [loading, setLoading] = useState(true);

  // 2. محاكاة جلب البيانات من الباك إند (Mock API Fetch)
  useEffect(() => {
    const fetchPrescription = async () => {
      setLoading(true);
      // محاكاة تأخير الشبكة
      setTimeout(() => {
        setPrescriptionData({
          id: id || "RX-2026-0210-4523",
          doc: "Dr. Emily Rodriguez",
          spec: "internal Medicine",
          date: "February 10, 2026",
          time: "02:30 PM",
          patientName: "Nouran Omar Hammad", //
          patientID: "PX-2024-7891",
          medications: [
            { name: "Amoxicillin 500mg", dose: "500mg", freq: "3 times daily", dur: "7 days" },
            { name: "Paracetamol", dose: "500mg", freq: "Every 6 hours", dur: "5 days" },
            { name: "Vitamin D3", dose: "1000 IU", freq: "Once daily", dur: "30 days" }
          ],
          labs: [
            { id: 'l1', name: "Complete Blood Count (CBC)", note: "Fasting required - 8-12 hours" },
            { id: 'l2', name: "Lipid Profile", note: "Fasting required" },
            { id: 'l3', name: "Chest X-Ray", note: "Standard procedure" }
          ]
        });
        setLoading(false);
      }, 800);
    };
    fetchPrescription();
  }, [id]);

  // 3. الأكشن: رفع الصورة للباك إند (Simulated POST)
  const handleFileUpload = async (e, labId) => {
    const file = e.target.files[0];
    if (file) {
      // إظهار المعاينة فوراً للمستخدم
      const previewUrl = URL.createObjectURL(file);
      setLabUploads(prev => ({ ...prev, [labId]: { url: previewUrl, name: file.name, size: (file.size / 1024 / 1024).toFixed(2) } }));

      // محاكاة إرسال FormData للباك إند
      const formData = new FormData();
      formData.append('file', file);
      formData.append('labId', labId);
      console.log(`Sending file ${file.name} to Backend...`);
    };
  };

  // 4. الأكشن: حذف الصورة المرفوعة
  const handleRemoveFile = (labId) => {
    setLabUploads(prev => {
      const updated = { ...prev };
      delete updated[labId];
      return updated;
    });
  };

  if (loading) return <div className={styles.loader}>Loading PulseX Prescription...</div>;

  return (
    <div className={styles.pageWrapper}>
      <button className={styles.backBtn} onClick={() => navigate('/patient/prescription')}>
        <HiOutlineArrowLeft /> Back to History
      </button>

      <div className={styles.mainCard}>
        {/* ── Blue Header Section ── */}
        <div className={styles.blueHeader}>
          <div className={styles.headerInfo}>
            <div className={styles.infoBlock}>
              <div className={styles.iconCircle}><TbStethoscope /></div>
              <div><span>Prescribed by</span><h4>{prescriptionData.doc}</h4><p>{prescriptionData.spec}</p></div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.iconCircle}><HiOutlineUser /></div>
              <div><span>Patient</span><h4>{prescriptionData.patientName}</h4><p>ID: {prescriptionData.patientID}</p></div>
            </div>
            <div className={styles.infoBlock}>
              <div className={styles.iconCircle}><HiOutlineCalendar /></div>
              <div><span>Date Issued</span><h4>{prescriptionData.date}</h4><p>{prescriptionData.time}</p></div>
            </div>
          </div>
        </div>

        <div className={styles.scrollBody}>
          {/* ── Medications Section ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeaderPurple}><TbCapsule /> Prescribed Medications</div>
            <div className={styles.medGrid}>
              {prescriptionData.medications?.map((med, i) => (
                <div key={i} className={styles.medCard}>
                  <div className={styles.medIndex}>{i + 1}</div>
                  <div className={styles.medContent}>
                    <h5>{med.name}</h5>
                    <p className={styles.dosageLabel}>Dosage: {med.dose}</p>
                    <div className={styles.metaRow}>
                      <div className={styles.metaBox}><span>Frequency</span><strong>{med.freq}</strong></div>
                      <div className={styles.metaBox}><span>Duration</span><strong>{med.dur}</strong></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Labs & Uploads ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeaderGreen}><TbClipboardText /> Lab & Radiology Requests</div>
            <div className={styles.labList}>
              {prescriptionData.labs?.map((lab, i) => (
                <div key={lab.id} className={styles.labItemCard}>
                  <div className={styles.labTopRow}>
                    <div className="flex items-center gap-4">
                      <div className={styles.labNum}>{i + 1}</div>
                      <div><h6>{lab.name}</h6><p>{lab.note}</p></div>
                    </div>
                    <button className={styles.uploadBtn} onClick={() => fileInputRefs.current[lab.id].click()}>
                      <HiOutlineArrowUpTray /> Upload Result
                    </button>
                    <input type="file" hidden accept="image/*" ref={el => fileInputRefs.current[lab.id] = el} onChange={(e) => handleFileUpload(e, lab.id)} />
                  </div>

                  {/* شكل كرت المعاينة الاحترافي الجديد */}
                  <AnimatePresence>
                    {labUploads[lab.id] && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }} className={styles.previewCard}>
                        <div className={styles.previewLeft}>
                          <img src={labUploads[lab.id].url} alt="Result" className={styles.thumb} />
                          <div className={styles.fileDetails}>
                            <span className={styles.fileName}>{labUploads[lab.id].name}</span>
                            <span className={styles.fileSize}>{labUploads[lab.id].size} MB • Attached</span>
                            <span className={styles.successBadge}><TbCheck /> Verified Result</span>
                          </div>
                        </div>
                        <button className={styles.removeBtn} onClick={() => handleRemoveFile(lab.id)}><HiOutlineTrash /></button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>

          {/* ── Clinical Notes ── */}
          <section className={styles.section}>
            <div className={styles.sectionHeaderOrange}><TbFileText /> Clinical Notes & Instructions</div>
            <div className={styles.notesBox}>
              <p>Continue medications as prescribed. Ensure rest and hydration. Follow up in 1 week.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetail;