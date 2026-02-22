import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Features.module.css';
import Container from '../HomeSectionWrapper/HomeSectionWrapper';

// الأيقونات
import { 
  HiOutlineHeart, 
  HiOutlineQrCode, 
  HiOutlineBell, 
  HiOutlineDocumentText 
} from "react-icons/hi2";
import { LuVideo, LuSparkles } from "react-icons/lu";
import { RiPulseFill } from "react-icons/ri";

// الصور
import RiskScore from "../../../../assets/Images/f1.png";
import QRCodes from "../../../../assets/Images/f2.png";
import Medication from "../../../../assets/Images/f3.png";
import Records from "../../../../assets/Images/f4.png";
import DoctorFollowups from "../../../../assets/Images/f5.png";

const FEATURES_DATA = [
  {
    id: 0,
    title: "Ai Heart Risk Score",
    description: "Advanced machine learning algorithms analyze your vital signs, lifestyle factors, and medical history to provide a comprehensive risk assessment with 95% accuracy.",
    accuracy: "95%",
    dataPoints: "50+",
    updates: "Real-time",
    icon: <HiOutlineHeart />,
    image: RiskScore,
    activeColor: "#2564EB" // لون القلب
  },
  {
    id: 1,
    title: "Emergency QR Codes",
    description: "Instant access to your complete medical profile for emergency responders. Critical information available in seconds when every moment counts.",
    accuracy: "Instant",
    dataPoints: "Global",
    updates: "24/7 Safe",
    icon: <HiOutlineQrCode />,
    image: QRCodes,
    activeColor: "#E94242" // لون الـ QR
  },
  {
    id: 2,
    title: "Medication Reminders", 
    description: "Smart medication management with personalized reminders, drug interaction alerts, and adherence tracking to optimize your treatment plan.",
    accuracy: "98%",
    dataPoints: "Daily",
    updates: "Smart",
    icon: <HiOutlineBell />,
    image: Medication,
    activeColor: "#D0791D" // لون التذكير
  },
  {
    id: 3,
    title: "Full Medical Records",
    description: "Comprehensive digital health records with secure cloud storage, easy sharing with healthcare providers, and complete medical history tracking.",
    accuracy: "Secure",
    dataPoints: "100%",
    updates: "Cloud Sync",
    icon: <HiOutlineDocumentText />,
    image: Records,
    activeColor: "#0891B2" // لون السجلات
  },
  {
    id: 4,
    title: "Doctor Follow-ups",
    description: "Virtual consultations with certified cardiologists, regular check-ins, and personalized care plans tailored to your specific heart health needs.",
    accuracy: "Expert",
    dataPoints: "HD",
    updates: "Direct Chat",
    icon: <LuVideo />,
    image: DoctorFollowups,
    activeColor: "#13D486" // لون الفيديو
  }
];

const Features = () => {
  const [activeTab, setActiveTab] = useState(0);
  const current = FEATURES_DATA[activeTab];

  return (
    <section id="features" className={styles.section}>
      <Container>
        {/* العناوين العلوية */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[32px] md:text-4xl font-bold text-[#010218] mb-4">
            Comprehensive Heart Health Features
          </h2>
          <p className="text-[#757575] text-lg max-w-2xl mx-auto font-medium">
            Advanced AI-powered tools for complete cardiovascular monitoring and care
          </p>
        </motion.div>

        {/* الكارد الرئيسي */}
        <motion.div
          className={styles.mainCard}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className={styles.contentGrid}>
            
            {/* المحتوى النصي (يسار) */}
            <div className={styles.textContent}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={styles.titleArea}>
                    {/* تحديث الأيقونة بجانب العنوان لتأخذ نفس لون الأكتيف */}
                    <div 
                      className={styles.titleIcon} 
                      style={{ color: current.activeColor, borderColor: `${current.activeColor}33` }}
                    >
                      {current.icon}
                    </div>
                    <h3>{current.title}</h3>
                  </div>

                  <p className={styles.desc}>
                    {current.description}
                  </p>

                  <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                      <span className={styles.statVal}>{current.accuracy}</span>
                      <span className={styles.statLbl}>Accuracy</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statVal}>{current.dataPoints}</span>
                      <span className={styles.statLbl}>Data points</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statVal}>{current.updates}</span>
                      <span className={styles.statLbl}>Updates</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className={styles.progressWrapper}>
                    <div className={styles.progressText}>
                      <span>Feature {activeTab + 1} of 5</span>
                      <span>{(activeTab + 1) * 20}%</span>
                    </div>
                    <div className={styles.track}>
                      <motion.div 
                        className={styles.bar}
                        style={{ backgroundColor: current.activeColor }} // شريط التحميل يأخذ لون التبويب
                        initial={{ width: 0 }}
                        animate={{ width: `${(activeTab + 1) * 20}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* الجزء البصري (يمين) */}
    {/* الجزء البصري (يمين) */}
<div className={styles.imageBox}>
  <img 
    src={current.image} 
    alt={current.title}
    className="w-full h-full object-cover"
  />  

  {/* الأيقونة العلوية - حركة خفيفة للأعلى والأسفل */}
  <motion.div 
    className={styles.badgeTop} 
    style={{ color: current.activeColor }}
    animate={{ y: [0, -8, 0] }} // بتتحرك 8 بكسل لفوق وبترجع
    transition={{ 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
  >
    <RiPulseFill />
  </motion.div>

  {/* الأيقونة السفلية - حركة مع Delay عشان ميبقوش زي بعض بالظبط */}
  <motion.div 
    className={styles.badgeBottom}
    animate={{ y: [0, 8, 0] }} // بتتحرك 8 بكسل لتحت وبترجع
    transition={{ 
      duration: 3, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay: 0.5 // الـ Delay اللي طلبتيه عشان الحركة تبان طبيعية ومختلفة
    }}
  >
    <LuSparkles />
  </motion.div>
</div>
          </div>

          {/* التابات العائمة بالأسفل */}
      {/* التابات العائمة بالأسفل */}
<div className={styles.tabsContainer}>
  <div className={styles.tabsList}>
    {FEATURES_DATA.map((feat, index) => {
      const isActive = activeTab === index;
      return (
        <button
          key={index}
          onClick={() => setActiveTab(index)}
          className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''}`}
          style={{
            // الخلفية تتلون بلون الأكتيف، وغير النشط يظل أبيض
            backgroundColor: isActive ? feat.activeColor : "white",
            // الأيقونة تكون بيضاء في النشط، ورمادي شفاف في غير النشط
            color: isActive ? "white" : "#1F293780",
            // الحدود تأخذ لون الأكتيف لتكون متناسقة
            borderColor: isActive ? feat.activeColor : "#E5E7EB",
          }}
        >
          {feat.icon}
        </button>
      );
    })}
  </div>
</div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Features;