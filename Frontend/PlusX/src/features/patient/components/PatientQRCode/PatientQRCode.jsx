import React, { useState, useEffect } from 'react';
import styles from './PatientQRCode.module.css';
import { QRCodeSVG } from 'qrcode.react'; // لتوليد الكود ديناميكياً
import { jsPDF } from "jspdf"; // لتوليد الـ PDF
import { LuQrCode, LuCalendarDays } from "react-icons/lu";
import { HiOutlineCheckCircle, HiOutlineLightBulb } from "react-icons/hi2";
import { RiNumbersLine } from "react-icons/ri";

const PatientQRCode = () => {
  // داتا وهمية (هتيجي من الباك إند - خالد)
  const [userData, setUserData] = useState({
    name: "Nouran Omar", //
    generatedDate: "19/10/2024",
    totalFiles: 8,
    // لينكات الصور اللي المفروض تنزل في الـ PDF
    medicalImages: [
      "https://images.unsplash.com/photo-1530026405186-ed1f1305b3c2?w=500", 
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500"
    ]
  });

  // الأكشن: توليد الـ PDF وتحميله
  const downloadPDF = async () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(`Medical Report: ${userData.name}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Generated on: ${userData.generatedDate}`, 20, 30);

    // إضافة الصور للـ PDF (تحويل URL لـ Base64)
    for (let i = 0; i < userData.medicalImages.length; i++) {
      doc.addPage();
      doc.text(`Medical Document ${i + 1}`, 20, 10);
      doc.addImage(userData.medicalImages[i], 'JPEG', 15, 20, 180, 160);
    }

    doc.save(`PulseX_Records_${userData.name}.pdf`);
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.header}>
        <div className="flex items-center gap-3">
          <LuQrCode className="text-3xl text-[#010218]" />
          <h1 className={styles.title}>Your Personal QR Code</h1>
        </div>
        <p className={styles.subtitle}>Access all your medical records instantly by scanning this code.</p>
      </header>

      <div className={styles.mainGrid}>
        {/* Left Side: QR Card */}
        <div className={styles.qrCard}>
          <div className={styles.qrWrapper}>
            <QRCodeSVG value={`https://pulsex-app.com/records/${userData.name}`} size={224} />
          </div>
          
          <div className={styles.qrInfo}>
            <div className={styles.infoRow}>
              <LuCalendarDays className="text-[#333CF5] text-2xl" />
              <span>Generated on: {userData.generatedDate}</span>
            </div>
            <div className={styles.infoRow}>
              <RiNumbersLine className="text-[#333CF5] text-2xl" />
              <span>Total Files: {userData.totalFiles}</span>
            </div>
          </div>

          <button className={styles.downloadBtn} onClick={downloadPDF}>
            Download PDF
          </button>
        </div>

        {/* Right Side: Details & Tips */}
        <div className={styles.detailsColumn}>
          <div className={styles.contentCard}>
            <h3>What’s inside your QR Code?</h3>
            <ul className={styles.checkList}>
              <li><HiOutlineCheckCircle /> Blood Test Results</li>
              <li><HiOutlineCheckCircle /> Radiology Scans</li>
              <li><HiOutlineCheckCircle /> Medication Reports</li>
            </ul>
          </div>

          <div className={styles.tipBox}>
            <div className="flex items-center gap-2 mb-2">
              <HiOutlineLightBulb className="text-yellow-400 text-2xl" />
              <span className="font-bold">Tip:</span>
            </div>
            <p>Show this QR code to your doctor during appointments — it gives instant access to all your records securely.</p>
          </div>
        </div>
      </div>

      {/* Robot Icon */}
      <img src="https://placehold.co/71x71" alt="PulseX Bot" className={styles.botIcon} />
    </div>
  );
};

export default PatientQRCode;
