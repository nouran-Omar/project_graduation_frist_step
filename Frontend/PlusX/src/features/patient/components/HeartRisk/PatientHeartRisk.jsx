import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuSearch, LuCloudUpload, LuCircleCheck } from "react-icons/lu";
import { HiOutlineXMark, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { MdOutlineMonitorHeart, MdOutlineSettingsInputAntenna } from "react-icons/md";
import styles from './PatientHeartRisk.module.css';
import PatientUploadCard from '../PatientUploadCard/PatientUploadCard';
import PatientRiskResult from './PatientRiskResult';

const PatientHeartRisk = () => {
  const navigate = useNavigate();
  const [isUploaded, setIsUploaded] = useState(false); // هل الملف اترفع؟
  const [showFullResult, setShowFullResult] = useState(false); // هل أظهر النتيجة النهائية؟

  const handleUploadComplete = () => {
    setIsUploaded(true);
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.pageHeader}>
        <div className="flex items-center gap-3">
          <LuSearch className="text-3xl text-[#010218]" />
          <h1 className={styles.title}>Heart Risk Assessment</h1>
        </div>
        <p className={styles.subtitle}>Upload and view your medical health easily.</p>
      </header>

      {/* الخطوة 1: كروت الرفع */}
      <div className="grid grid-cols-2 gap-8 mt-10">
        <PatientUploadCard 
          title="ECG" 
          icon={MdOutlineMonitorHeart} 
          onUpload={handleUploadComplete} 
        />
        <PatientUploadCard 
          title="Radiology" 
          icon={MdOutlineSettingsInputAntenna} 
          onUpload={() => {}} 
        />
      </div>

      {/* الخطوة 2: زرار View Result يظهر بعد الرفع */}
      {isUploaded && !showFullResult && (
        <div className="flex justify-center mt-12 animate-bounce">
          <button 
            className={styles.viewResultBtn}
            onClick={() => setShowFullResult(true)}
          >
            View Result 🚀
          </button>
        </div>
      )}

      {/* الخطوة 3: التحليل والـ Critical Alert */}
      {showFullResult && (
        <div className="mt-12">
          <PatientRiskResult />
        </div>
      )}
    </div>
  );
};

export default PatientHeartRisk;
