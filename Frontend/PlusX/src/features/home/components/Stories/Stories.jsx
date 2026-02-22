import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import { MdVerified } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa"; // أيقونة الاقتباس المطابقة
import { LuQuote } from "react-icons/lu";
import Container from '../HomeSectionWrapper/HomeSectionWrapper';
import styles from './Stories.module.css';

const STORIES_DATA = [
    {
        id: 1,
        name: "Ghada Ali",
        age: "70",
        condition: "Hypertension",
        quote: "After my heart attack scare, Pulse AI became my lifeline. The AI risk assessment showed I was at high risk, but with the personalized recommendations and regular doctor follow-ups, I've reduced my risk score from 85% to just 23% in 8 months. The medication reminders and emergency QR code give me peace of mind every day.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
        stats: { risk: "-62%", time: "8 months", bpm: "-15 BPM" },
        progress: 62,
        tags: ["high risk", "recovery", "lifestyle change"]
    },
    {
        id: 2,
        name: "Ghada Ali",
        age: "70",
        condition: "Hypertension",
        quote: "After my heart attack scare, Pulse AI became my lifeline. The AI risk assessment showed I was at high risk, but with the personalized recommendations and regular doctor follow-ups, I've reduced my risk score from 85% to just 23% in 8 months. The medication reminders and emergency QR code give me peace of mind every day.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
        stats: { risk: "-62%", time: "8 months", bpm: "-15 BPM" },
        progress: 62,
        tags: ["High Risk", "Recovery", "Lifestyle Change"]
    },
    {
        id: 3,
        name: "Ghada Ali",
        age: "70",
        condition: "Hypertension",
        quote: "After my heart attack scare, Pulse AI became my lifeline. The AI risk assessment showed I was at high risk, but with the personalized recommendations and regular doctor follow-ups, I've reduced my risk score from 85% to just 23% in 8 months. The medication reminders and emergency QR code give me peace of mind every day.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=400",
        stats: { risk: "-62%", time: "8 months", bpm: "-15 BPM" },
        progress: 62,
        tags: ["High Risk", "Recovery", "Lifestyle Change"]
    },
    {
        id: 4,
        name: "Ahmed Hassan",
        age: "55",
        condition: "Arrhythmia",
        quote: "I never realized how irregular my heartbeat was until I used the ECG feature. The instant alerts helped me seek medical attention right before a critical episode. PulseX truly saved my life.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400",
        stats: { risk: "-45%", time: "6 months", bpm: "Stable" },
        progress: 85,
        tags: ["Early Detection", "Monitoring"]
    }
];

const Stories = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        if (currentIndex < STORIES_DATA.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    const story = STORIES_DATA[currentIndex];

    return (
        <section id="stories" className={styles.section}>
            <Container>
        <motion.div
          className="text-center mb-16 space-y-3 font-inter"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-bold text-[#010218]">Recovery Stories</h2>
          <p className="text-[#757575] text-lg">Real patients, real results — inspiring journeys to better heart health</p>
        </motion.div>

                <motion.div
                  className="relative max-w-[1050px] mx-auto font-inter"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                >
                    {/* الكارد الرئيسي */}
                    <div className={styles.card}>
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col md:flex-row items-center h-full p-8 md:p-14 gap-12"
                            >
                                {/* الجزء الأيسر: بيانات المريض */}
                                <div className="w-full md:w-1/3 flex flex-col items-center text-center space-y-5 border-b md:border-b-0 md:border-r border-gray-100 pb-8 md:pb-0 md:pr-12">
                                    <div className="relative">
                                        <img src={story.image} alt={story.name} className={styles.patientImage} />
                                        <div className={styles.verifiedBadge}>
                                            <MdVerified size={18} />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-extrabold text-[#010218]">{story.name}</h3>
                                        <p className="text-[#757575] font-medium">Age {story.age}</p>
                                        <p className="text-[#333CF5] font-bold text-lg">{story.condition}</p>
                                    </div>
                                    <div className="flex  justify-center text-[#333CF5] ">
                                        {story.tags.map((tag, i) => (
                                            <span key={i} className={styles.tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* الجزء الأيمن: القصة والإحصائيات */}
                                <div className="w-full md:w-2/3 space-y-8 relative">
                                    <div className="relative">
                                        <LuQuote className="text-[#333CF5] w-12 h-12 absolute -top-8 -left-10" />
                                        <p className="text-lg text-[#010218] leading-relaxed font-medium italic">
                                            "{story.quote}"
                                        </p>
                                    </div>

                                    {/* الإحصائيات الملونة */}
                                    <div className="flex justify-between items-center py-6">
                                        <StatBlock label="Risk Reduction" value={story.stats.risk} color="text-[#059669]" />
                                        <StatBlock label="Recovery Time" value={story.stats.time} color="text-[#333CF5]" />
                                        <StatBlock label="BPM Improved" value={story.stats.bpm} color="text-[#D97706]" />
                                    </div>

                                    {/* بار التقدم */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <span className="text-xs font-bold text-[#757575] tracking-[0.15em]">Recovery Progress</span>
                                            <span className="text-sm font-bold text-[#010218]">{story.progress}%</span>
                                        </div>
                                        <div className={styles.progressBarBase}>
                                            <motion.div 
                                                className={styles.progressBarFill} 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${story.progress}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 text-[#10B981] font-bold text-xs">
                                            <MdVerified size={16} />
                                            <span>Verified Patient Story</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* أزرار التنقل الدائرية */}
                    <button onClick={prevSlide} className={`${styles.navBtn} left-[-55px] ${currentIndex === 0 ? 'opacity-0' : 'opacity-100'}`}>
                        <HiChevronLeft size={24} />
                    </button>
                    <button onClick={nextSlide} className={`${styles.navBtn} right-[-55px] ${currentIndex === STORIES_DATA.length - 1 ? 'opacity-0' : 'opacity-100'}`}>
                        <HiChevronRight size={24} />
                    </button>
                </motion.div>

                {/* المستطيلات تحت السلايدر (Dots) */}
                <div className="flex flex-col items-center mt-10 space-y-4">
                    <div className="flex gap-2">
                        {STORIES_DATA.map((_, i) => (
                            <div 
                                key={i} 
                                onClick={() => setCurrentIndex(i)}
                                className={`${styles.barDot} ${currentIndex === i ? styles.barDotActive : styles.barDotInactive}`}
                            />
                        ))}
                    </div>
                    <span className="text-[#757575] text-sm font-medium">{currentIndex + 1} of {STORIES_DATA.length} stories</span>
                </div>
            </Container>
        </section>
    );
};

const StatBlock = ({ label, value, color }) => (
    <div className="space-y-1 font-inter">
        <p className={`text-3xl font-black ${color}`}>{value}</p>
        <p className="text-[10px] text-[#757575] font-bold  tracking-widest">{label}</p>
    </div>
);

export default Stories;