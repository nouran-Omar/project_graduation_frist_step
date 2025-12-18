import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { processBooking } from '../../services/patientService';
// الأيقونات
import { FiCreditCard, FiCheck, FiCalendar, FiClock, FiUser, FiArrowLeft } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5"; // أيقونة المحفظة
import { RiMastercardFill, RiVisaLine } from "react-icons/ri"; // أيقونات الفيزا

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // استلام البيانات من الصفحة السابقة
  // لو مفيش بيانات (حد فتح الصفحة مباشر) بنحط قيم افتراضية عشان الكود مايضربش
  const { doctor, date, time } = location.state || { 
      doctor: { name: "Dr. Unknown", specialty: "--", price: 0, image: "" }, 
      date: "--", time: "--" 
  };

  const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'card'
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // دالة الدفع
  const handlePayNow = async () => {
    setLoading(true);
    // نكلم الـ API
    await processBooking({ doctorId: doctor.id, date, time, method: paymentMethod });
    setLoading(false);
    setShowSuccessModal(true); // نظهر رسالة النجاح
  };

  return (
    <div className="pb-12 animate-fade-in font-sans relative min-h-screen">
      
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all">
            <FiArrowLeft />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
           Select Payment Method <span className="text-2xl">💸</span>
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* 1. Left Side: Payment Options */}
        <div className="flex-1 space-y-6">
            
            {/* Option 1: Cash */}
            <div 
                onClick={() => setPaymentMethod('cash')}
                className={`p-6 rounded-[24px] border-2 cursor-pointer transition-all flex items-center gap-6 ${
                    paymentMethod === 'cash' 
                    ? 'border-blue-600 bg-blue-50/50' 
                    : 'border-gray-100 bg-white hover:border-blue-200'
                }`}
            >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${paymentMethod === 'cash' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    <IoWalletOutline />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">Cash at Clinic</h3>
                    <p className="text-xs text-gray-500">Pay directly at the clinic during your visit</p>
                </div>
                {/* Radio Circle */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cash' ? 'border-blue-600' : 'border-gray-300'}`}>
                    {paymentMethod === 'cash' && <div className="w-3 h-3 rounded-full bg-blue-600" />}
                </div>
            </div>

            {/* Option 2: Card */}
            <div 
                onClick={() => setPaymentMethod('card')}
                className={`p-6 rounded-[24px] border-2 cursor-pointer transition-all ${
                    paymentMethod === 'card' 
                    ? 'border-blue-600 bg-blue-50/50' 
                    : 'border-gray-100 bg-white hover:border-blue-200'
                }`}
            >
                <div className="flex items-center gap-6 mb-2">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${paymentMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <FiCreditCard />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg">Credit / Debit Card</h3>
                        <p className="text-xs text-gray-500">Pay securely with your credit or debit card</p>
                    </div>
                     {/* Radio Circle */}
                     <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-blue-600' : 'border-gray-300'}`}>
                        {paymentMethod === 'card' && <div className="w-3 h-3 rounded-full bg-blue-600" />}
                    </div>
                </div>

                {/* Card Form (يظهر فقط لو اختارت فيزا) */}
                <AnimatePresence>
                    {paymentMethod === 'card' && (
                        <motion.div 
                            initial={{ height: 0, opacity: 0 }} 
                            animate={{ height: 'auto', opacity: 1 }} 
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden mt-6 pt-6 border-t border-blue-200 space-y-4"
                        >
                             <div className="flex items-center gap-2 mb-2">
                                <RiMastercardFill className="text-3xl text-red-500" />
                                <RiVisaLine className="text-3xl text-blue-800" />
                                <span className="text-xs text-gray-400 ml-auto">Encrypted & Secure</span>
                             </div>

                             <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-600 ml-1">Card Holder Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-600 ml-1">Card Number</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-600 ml-1">Expiry Date</label>
                                        <input type="text" placeholder="MM/YY" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-600 ml-1">CVV</label>
                                        <input type="text" placeholder="123" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 outline-none" />
                                    </div>
                                </div>
                             </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* 2. Right Side: Booking Summary */}
        <div className="w-full lg:w-96">
            <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 p-8 sticky top-8">
                <h3 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Booking Summary</h3>
                
                {/* Doctor */}
                <div className="flex items-center gap-4 pb-6 border-b border-gray-50 mb-6">
                    <img src={doctor.image} alt="doc" className="w-12 h-12 rounded-full object-cover" />
                    <div>
                        <p className="text-xs text-gray-400">Doctor</p>
                        <h4 className="font-bold text-gray-800 text-sm">{doctor.name}</h4>
                        <p className="text-[10px] text-gray-500">{doctor.specialty}</p>
                    </div>
                </div>

                {/* Details */}
                <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2"><FiCalendar /> Date</span>
                        <span className="font-bold text-gray-800">{date}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2"><FiClock /> Time</span>
                        <span className="font-bold text-gray-800">{time}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-2"><IoWalletOutline /> Method</span>
                        <span className="font-bold text-blue-600">{paymentMethod === 'cash' ? 'Cash at Clinic' : 'Credit Card'}</span>
                    </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between text-lg font-bold text-gray-900 mb-8 pt-6 border-t border-gray-50">
                    <span>Total Amount</span>
                    <span>${doctor.price}.00</span>
                </div>

                {/* Pay Button */}
                <button 
                    onClick={handlePayNow}
                    disabled={loading}
                    className="w-full bg-blue-900 text-white py-4 rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-800 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:scale-100"
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </div>

      </div>

      {/* 3. Success Modal (Overlay) */}
      <AnimatePresence>
        {showSuccessModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                {/* Background Blur */}
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                {/* Modal Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8, y: 50 }} 
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    className="bg-white w-full max-w-sm p-8 rounded-[40px] shadow-2xl relative z-10 text-center"
                >
                    {/* Green Check Icon */}
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
                        <FiCheck className="text-white text-4xl" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {paymentMethod === 'card' ? 'Payment Successful' : 'Booking Confirmed'}
                    </h2>
                    
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                        {paymentMethod === 'card' 
                            ? "Your payment has been processed successfully. Thank you for your purchase." 
                            : "Your appointment has been successfully booked by Cashing at Clinic."}
                    </p>

                    <button 
                        onClick={() => navigate('/patient/appointments')}
                        className="w-full bg-blue-600 text-white py-3.5 rounded-full font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                    >
                        Done
                    </button>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default PaymentPage;