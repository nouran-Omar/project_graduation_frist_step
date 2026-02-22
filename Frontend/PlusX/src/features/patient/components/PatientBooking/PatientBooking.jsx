import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PatientBooking.module.css';
import { HiStar, HiChevronLeft, HiChevronRight, HiOutlineCalendar, HiOutlineClock, HiOutlineCreditCard } from "react-icons/hi2";
import { MdLocationOn } from "react-icons/md";

const PatientBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. States لإدارة الاختيارات (Dynamic Logic)
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState(null);

  // بيانات الدكتور (تأتي من الباك إند لاحقاً)
  const doctor = {
    name: "DR. Walid Ali",
    title: "Specialist Doctor",
    rate: 4.9,
    reviews: 127,
    price: 200,
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80"
  };

  const timeSlots = ["05:30 PM", "06:30 PM", "07:30 PM", "08:30 PM", "09:30 PM"];

  // الأكشن: عند الضغط على تأكيد الحجز
  const handleConfirm = () => {
    if (!selectedTime) {
      alert("Please select a time slot first!");
      return;
    }
    // إرسال البيانات للباك إند هنا ثم التوجه للدفع
    console.log(`Booking for Doctor ${id} on Oct ${selectedDate} at ${selectedTime}`);
    navigate(`/patient/payment/${id}`);
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.bookingCard}>
        
        {/* المكون الجانبي (Sidebar) - تفاصيل الدكتور والخطوات */}
        <div className={styles.sidebar}>
          <div className={styles.docInfo}>
            <img src={doctor.img} alt={doctor.name} className={styles.docImg} />
            <div className="mt-2 text-left">
              <span className={styles.tag}>{doctor.title}</span>
              <h3 className={styles.docName}>{doctor.name}</h3>
            </div>
            <div className={styles.ratingRow}>
              <HiStar className="text-yellow-400" /> {doctor.rate} ({doctor.reviews} reviews)
            </div>
            <div className={styles.priceRow}>
              <span>${doctor.price}</span> / session
            </div>
          </div>

          {/* Stepper Animation (الخطوات) */}
          <div className={styles.stepper}>
            <div className={`${styles.step} ${styles.activeStep}`}>
              <div className={styles.iconCircle}><HiOutlineCalendar /></div>
              <p>15 Oct, 2025</p>
            </div>
            <div className={styles.line}></div>
            <div className={`${styles.step} ${selectedTime ? styles.activeStep : styles.inactiveStep}`}>
              <div className={styles.iconCircle}><HiOutlineClock /></div>
              <p>{selectedTime || "Time"}</p>
            </div>
            <div className={styles.line}></div>
            <div className={`${styles.step} ${styles.inactiveStep}`}>
              <div className={styles.iconCircle}><HiOutlineCreditCard /></div>
              <p>Payment Type</p>
            </div>
          </div>

          <div className={styles.locationBox}>
            <MdLocationOn /> City Medical Center
          </div>
        </div>

        {/* المكون الرئيسي - التقويم والمواعيد */}
        <div className={styles.mainContent}>
          <h2 className={styles.mainTitle}>Select date & time</h2>
          
          <div className={styles.selectionGrid}>
            {/* Calendar UI */}
            <div className={styles.calendarSection}>
              <div className={styles.monthHeader}>
                <button className={styles.navBtn}><HiChevronLeft /></button>
                <span>October 2025</span>
                <button className={styles.navBtn}><HiChevronRight /></button>
              </div>
              <div className={styles.daysGrid}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d} className={styles.dayLabel}>{d}</span>)}
                {[...Array(30)].map((_, i) => (
                  <button 
                    key={i} 
                    className={`${styles.dayBtn} ${selectedDate === i + 1 ? styles.activeDay : ''}`}
                    onClick={() => setSelectedDate(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.divider}></div>

            {/* Time Slots UI */}
            <div className={styles.timeSection}>
              <p className={styles.dateLabel}>Monday, {selectedDate}. October</p>
              <div className={styles.slotsList}>
                {timeSlots.map(time => (
                  <button 
                    key={time} 
                    className={`${styles.timeBtn} ${selectedTime === time ? styles.activeTime : ''}`}
                    onClick={() => setSelectedTime(time)}
                  >
                    <div className={styles.radioCircle}></div>
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* زرار التأكيد النهائي */}
      <button className={styles.confirmFullBtn} onClick={handleConfirm}>
        Confirm Appointment
      </button>
    </div>
  );
};

export default PatientBooking;
