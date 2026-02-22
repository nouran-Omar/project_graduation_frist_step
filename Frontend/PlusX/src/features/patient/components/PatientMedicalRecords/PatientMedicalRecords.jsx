import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PatientMedicalRecords.module.css';
import { LuFilePlus, LuClipboardList, LuTrash2, LuFileText } from "react-icons/lu";
import { HiOutlineUpload, HiOutlineArrowRight } from "react-icons/hi";
import { MdOutlineMedicalServices } from "react-icons/md";
import { RiRocketLine } from "react-icons/ri";

const PatientMedicalRecords = () => {
  const navigate = useNavigate();
  
  // 1. إدارة الملفات (Dynamic List)
  const [documents, setDocuments] = useState([
    { id: 1, name: "BloodT", type: "PNG", size: "29 KB", date: "18/10/2025", category: "ECG" },
    { id: 2, name: "BPdf", type: "PDF", size: "1 MB", date: "01/09/2025", category: "ECG" },
  ]);

  // 2. إدارة الإحصائيات (Dynamic Stats)
  const stats = {
    total: documents.length,
    ecg: documents.filter(d => d.category === 'ECG').length,
    xray: documents.filter(d => d.category === 'Radiology').length,
    medical: documents.filter(d => d.category === 'Medical File').length,
    lastDate: documents[0]?.date || "N/A"
  };

  // مراجع للـ File Inputs المخفية
  const ecgInput = useRef(null);
  const xrayInput = useRef(null);
  const otherInput = useRef(null);

  // 3. الأكشن: رفع ملف حقيقي (Browse Logic)
  const handleUpload = (e, category) => {
    const file = e.target.files[0];
    if (file) {
      const newDoc = {
        id: Date.now(),
        name: file.name.split('.')[0],
        type: file.name.split('.').pop().toUpperCase(),
        size: (file.size / 1024).toFixed(1) + " KB",
        date: new Date().toLocaleDateString('en-GB'),
        category: category
      };
      setDocuments([newDoc, ...documents]);
    }
  };

  // 4. الأكشن: مسح ملف
  const handleDelete = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  return (
    <div className={styles.mainWrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className="flex items-center gap-3">
          <LuClipboardList className="text-3xl text-[#010218]" />
          <h1 className={styles.title}>Medical Records</h1>
        </div>
        <p className={styles.subtitle}>Upload and view your medical health easily.</p>
      </header>

      {/* Upload Section - 3 Cards */}
      <div className={styles.uploadGrid}>
        <UploadCard title="ECG" desc="Keep track of your latest ECG results." icon={<MdOutlineMedicalServices />} onBrowse={() => ecgInput.current.click()} />
        <UploadCard title="Radiology" desc="Upload your X-rays or CT (Optional)." icon={<LuFilePlus />} onBrowse={() => xrayInput.current.click()} />
        <UploadCard title="Other Medical Files" desc="Upload lab results or scans." icon={<LuFileText />} onBrowse={() => otherInput.current.click()} />
        
        {/* Hidden Inputs */}
        <input type="file" ref={ecgInput} className="hidden" onChange={(e) => handleUpload(e, 'ECG')} />
        <input type="file" ref={xrayInput} className="hidden" onChange={(e) => handleUpload(e, 'Radiology')} />
        <input type="file" ref={otherInput} className="hidden" onChange={(e) => handleUpload(e, 'Medical File')} />
      </div>

      <div className={styles.contentLayout}>
        {/* Document List Table */}
        <div className={styles.listSection}>
          <div className={styles.listHeader}>
            <HiOutlineUpload className="text-blue-600 text-xl" />
            <h3>Document List</h3>
          </div>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th>File name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Uploaded Date</th>
                <th>Record Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map(doc => (
                <tr key={doc.id}>
                  <td className={styles.fileName}><LuFileText /> {doc.name}</td>
                  <td>{doc.type}</td>
                  <td className="text-gray-400">{doc.size}</td>
                  <td className="text-gray-400">{doc.date}</td>
                  <td className="text-gray-400">{doc.category}</td>
                  <td><button onClick={() => handleDelete(doc.id)} className={styles.deleteBtn}><LuTrash2 /></button></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bottom Call to Action */}
          <div className={styles.qrCallout}>
            <div className="text-center">
              <h4>All your medical files are ready!</h4>
              <p>Generate your personal QR code to access them anytime.</p>
              <button className={styles.rocketBtn} onClick={() => navigate('/patient/qr')}>
                <RiRocketLine /> Generate QR Code <HiOutlineArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Sidebar Card */}
        <aside className={styles.statsCard}>
          <div className={styles.statsTitle}><div className={styles.statIconMain}><LuFileText /></div> Statistics</div>
          <div className={styles.statItems}>
            <StatRow label="Total Files Uploaded" val={stats.total} color="blue" />
            <StatRow label="ECG Files" val={stats.ecg} color="green" />
            <StatRow label="X-rays Files" val={stats.xray} color="purple" />
            <StatRow label="Medical files" val={stats.medical} color="yellow" />
            <div className={styles.lastUpload}>
              <span>Last Upload</span>
              <span className="text-orange-500 font-bold">{stats.lastDate}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

// مكونات فرعية لتنظيف الكود
const UploadCard = ({ title, desc, icon, onBrowse }) => (
  <div className={styles.uploadCard}>
    <div className={styles.cardHeader}>
      <div className={styles.cardIcon}>{icon}</div>
      <div><h4>{title}</h4><p>{desc}</p></div>
    </div>
    <div className={styles.dropZone}>
      <div className={styles.uploadCircle}><HiOutlineUpload /></div>
      <p>Drag & drop files or <span onClick={onBrowse}>Browse</span></p>
      <span className={styles.formats}>Supported formats: JPEG, PNG</span>
    </div>
  </div>
);

const StatRow = ({ label, val, color }) => (
  <div className={`${styles.statRow} ${styles[color]}`}>
    <span>{label}</span>
    <span className={styles.statVal}>{val}</span>
  </div>
);

export default PatientMedicalRecords;
