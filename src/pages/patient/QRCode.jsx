import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchQRCodeData } from '../../services/patientService';
// الأيقونات
import { BsQrCode, BsFileEarmarkBarGraph } from "react-icons/bs";
import { FiCalendar, FiDownload, FiCheckCircle } from "react-icons/fi";
import { FaLightbulb } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";

const QRCodePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchQRCodeData().then(setData);
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Generating Secure QR...</div>;

  return (
    <div className="pb-12 animate-fade-in font-sans relative min-h-screen">
      
      {/* 1. Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Your Personal QR Code <BsQrCode className="text-lg" />
        </h1>
        <p className="text-gray-500 text-sm mt-1">Access all your medical records instantly by scanning this code.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* 2. Main QR Card (Left Side) */}
        <div className="lg:col-span-2 bg-white rounded-[30px] shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
            {/* الخلفية الديكورية (اختياري عشان الشكل الجمالي) */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>

            {/* QR Image Frame */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-8">
                {/* بنعرض صورة QR حقيقية بناءً على الداتا */}
                <img src={data.qrCodeUrl} alt="Patient QR Code" className="w-64 h-64 object-contain opacity-90" />
            </div>

            {/* Details */}
            <div className="space-y-4 w-full max-w-md">
                <div className="flex items-center gap-4 text-gray-700 font-bold text-lg border-b border-gray-50 pb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <FiCalendar />
                    </div>
                    <span>Generated on: {data.generatedDate}</span>
                </div>
                
                <div className="flex items-center gap-4 text-gray-700 font-bold text-lg pb-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <BsFileEarmarkBarGraph />
                    </div>
                    <span>Total Files: {data.totalFiles}</span>
                </div>
            </div>

            {/* Download Button */}
            <button className="w-full max-w-md mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3">
                Download PDF <FiDownload className="text-xl" />
            </button>
        </div>

        {/* 3. Info Side (Right Side) */}
        <div className="space-y-6">
            
            {/* What's inside Card */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6 text-lg">What's inside your QR Code?</h3>
                <ul className="space-y-4">
                    {data.contents.map((item, index) => (
                        <li key={index} className="flex items-center gap-3 text-gray-600 font-medium">
                            <FiCheckCircle className="text-green-500 text-xl flex-shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tip Card (Blue) */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-[30px] shadow-lg shadow-blue-200 text-white relative overflow-hidden">
                {/* دائرة ديكورية شفافة */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
                
                <div className="flex items-center gap-2 mb-3">
                    <FaLightbulb className="text-yellow-300 text-xl animate-pulse" />
                    <h3 className="font-bold text-lg">Tip:</h3>
                </div>
                <p className="text-sm leading-relaxed opacity-90 font-medium">
                    {data.tip}
                </p>
            </div>

        </div>

      </div>

      {/* Floating Robot */}
      <div className="fixed bottom-8 right-8 animate-bounce cursor-pointer z-50">
         <span className="bg-cyan-400 text-white text-[10px] px-2 py-0.5 rounded-full absolute -top-2 -right-2 font-bold z-10">Hi!</span>
         <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110">
            <RiRobot2Line className="text-2xl" />
         </div>
      </div>

    </div>
  );
};

export default QRCodePage;