import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PatientPayment.module.css';
// غيري HiOutlineCash لـ HiOutlineBanknotes
import { HiOutlineBanknotes, HiOutlineCreditCard, HiOutlineCheckCircle } from "react-icons/hi2";
import { MdSecurity, MdOutlineNavigateNext } from "react-icons/md";

const PatientPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [method, setMethod] = useState('cash'); // 'cash' or 'credit'
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardData, setCardData] = useState({ name: '', number: '', date: '', cvv: '' });

  // الأكشن: إرسال البيانات للباك إند
  const handlePayment = (e) => {
    e.preventDefault();
    if (method === 'credit' && cardData.number.length < 16) {
      alert("Please enter a valid card number!");
      return;
    }
    // Simulation لربط الباك إند
    console.log("Sending to Backend:", { doctorId: id, method, cardData });
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.successModal}>
          <HiOutlineCheckCircle className={styles.successIcon} />
          <h2>Booking Confirmed!</h2>
          <p>Your appointment has been successfully booked by {method === 'cash' ? 'Cashing at Clinic' : 'Credit Card'}.</p>
          <button className={styles.doneBtn} onClick={() => navigate('/patient/appointments')}>Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.paymentSection}>
          <h1 className={styles.title}>Select Payment Method</h1>
          
          <div className={styles.methodsList}>
            {/* Cash Option */}
            <div 
              className={`${styles.methodCard} ${method === 'cash' ? styles.activeMethod : ''}`}
              onClick={() => setMethod('cash')}
            >
              <div className={styles.methodIcon}><HiOutlineBanknotes /></div>
              <div className={styles.methodText}>
                <h3>Cash at Clinic</h3>
                <p>Pay directly at the clinic during your visit</p>
              </div>
              <div className={styles.radio}>{method === 'cash' && <div className={styles.radioDot} />}</div>
            </div>

            {/* Credit Option */}
            <div 
              className={`${styles.methodCard} ${method === 'credit' ? styles.activeMethod : ''}`}
              onClick={() => setMethod('credit')}
            >
              <div className={styles.methodIcon}><HiOutlineCreditCard /></div>
              <div className={styles.methodText}>
                <h3>Credit / Debit Card</h3>
                <p>Pay securely with your credit or debit card</p>
              </div>
              <div className={styles.radio}>{method === 'credit' && <div className={styles.radioDot} />}</div>
            </div>
          </div>

          {/* Dynamic Card Form - يظهر فقط عند اختيار Credit */}
          {method === 'credit' && (
            <div className={styles.cardForm}>
              <div className={styles.inputGroup}>
                <label>Card Holder Name</label>
                <input type="text" placeholder="John Doe" onChange={(e) => setCardData({...cardData, name: e.target.value})} />
              </div>
              <div className={styles.inputGroup}>
                <label>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" maxLength="16" onChange={(e) => setCardData({...cardData, number: e.target.value})} />
              </div>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" onChange={(e) => setCardData({...cardData, date: e.target.value})} />
                </div>
                <div className={styles.inputGroup}>
                  <label>CVV</label>
                  <input type="password" placeholder="123" maxLength="3" onChange={(e) => setCardData({...cardData, cvv: e.target.value})} />
                </div>
              </div>
              <p className={styles.securityNote}><MdSecurity /> Your payment information is encrypted and secure</p>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div className={styles.summarySidebar}>
          <h2 className={styles.summaryTitle}>Booking Summary</h2>
          <div className={styles.summaryContent}>
            <SummaryItem label="Doctor" value="Dr. Sarah Johnson" sub="Cardiologist" />
            <SummaryItem label="Date" value="December 8, 2025" />
            <SummaryItem label="Time" value="10:30 AM" />
            <SummaryItem label="Payment Method" value={method === 'cash' ? 'Cash at Clinic' : 'Credit Card'} />
            <div className={styles.totalRow}>
              <span>Total Amount</span>
              <span className={styles.amount}>$150.00</span>
            </div>
          </div>
          <button className={styles.payNowBtn} onClick={handlePayment}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

const SummaryItem = ({ label, value, sub }) => (
  <div className={styles.summaryItem}>
    <p className={styles.summaryLabel}>{label}</p>
    <p className={styles.summaryValue}>{value}</p>
    {sub && <p className={styles.summarySub}>{sub}</p>}
  </div>
);

export default PatientPayment;
