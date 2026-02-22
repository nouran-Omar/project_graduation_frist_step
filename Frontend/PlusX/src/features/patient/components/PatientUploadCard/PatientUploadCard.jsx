import React, { useRef, useState } from 'react';
import styles from './PatientUploadCard.module.css';
// غيري LuCheckCircle2 للاسم المعتمد وهو LuCircleCheck
// import { LuCloudUpload, LuCircleCheck } from "react-icons/lu";
import { LuCloudUpload, LuCircleCheck } from "react-icons/lu";
import { HiOutlineXMark } from "react-icons/hi2";

const PatientUploadCard = ({ title, desc, icon: Icon, onUpload }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className={styles.uploadCard}>
      <div className={styles.cardHeader}>
        <div className={styles.iconBox}><Icon className="text-white text-2xl" /></div>
        <div className={styles.headerText}>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      </div>

      <div className={styles.dropZone} onClick={() => fileInputRef.current.click()}>
        <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*" />
        <div className={styles.uploadIconCircle}><LuCloudUpload/></div>
        <p className="mt-4 text-gray-700">Drag & drop files or <span className={styles.browseLink}>Browse</span></p>
        <p className="text-xs text-gray-400 mt-1">Supported: JPEG, PNG</p>
      </div>

      {file && (
        <div className={styles.filePreview}>
          <LuCircleCheck className="text-green-500" />
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
          </div>
          <button onClick={() => setFile(null)} className={styles.removeBtn}><HiOutlineXMark /></button>
        </div>
      )}

      <button 
        className={`${styles.mainBtn} ${file ? styles.btnActive : ''}`}
        disabled={!file}
        onClick={() => onUpload(file)}
      >
        Upload
      </button>
    </div>
  );
};

export default PatientUploadCard;
