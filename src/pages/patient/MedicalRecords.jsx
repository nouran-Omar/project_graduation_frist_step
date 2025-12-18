import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchMedicalRecords } from '../../services/patientService';
// الأيقونات اللي هنحتاجها عشان نطلع نفس الشكل
import { FiUploadCloud, FiTrash2, FiFileText, FiImage, FiActivity, FiArrowRight } from 'react-icons/fi'; 
import { FaFilePdf, FaFileImage } from "react-icons/fa6"; // أيقونات الملفات الملونة
import { BiTestTube, BiImages } from "react-icons/bi"; // أيقونات التحاليل والأشعة
import { BsQrCodeScan } from "react-icons/bs"; // أيقونة الـ QR

const MedicalRecords = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchMedicalRecords().then(setData);
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Records...</div>;

  return (
    <div className="space-y-8 pb-12 animate-fade-in font-sans">
      
      {/* 1. Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Medical Records <span className="text-gray-400 text-lg">📑</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Upload and view your medical health easily.</p>
      </motion.div>

      {/* 2. Upload Section (Two Dashed Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Blood Test */}
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
           <div className="flex items-center gap-3 mb-4">
              <BiTestTube className="text-2xl text-gray-700" />
              <div>
                  <h3 className="font-bold text-gray-800">BloodTest files</h3>
                  <p className="text-[10px] text-gray-400">"Keep track of your latest lab results."</p>
              </div>
           </div>
           
           <div className="border-2 border-dashed border-blue-200 bg-blue-50/30 rounded-2xl h-48 flex flex-col items-center justify-center text-center p-4 transition-colors hover:bg-blue-50 hover:border-blue-400 cursor-pointer group">
              <FiUploadCloud className="text-4xl text-blue-300 group-hover:text-blue-500 transition-colors mb-3" />
              <p className="text-xs text-gray-600 font-medium">
                Drag & drop BloodTest files or <span className="text-blue-600 underline">Browse</span>
              </p>
              <p className="text-[10px] text-gray-400 mt-2">Supported formats: JPEG, PNG, PDF</p>
           </div>
           
           <button className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-200">
              Upload
           </button>
        </div>

        {/* Card 2: Radiology */}
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100">
           <div className="flex items-center gap-3 mb-4">
              <BiImages className="text-2xl text-gray-700" />
              <div>
                  <h3 className="font-bold text-gray-800">Radiology</h3>
                  <p className="text-[10px] text-gray-400">"Upload your X-rays, CT, or MRI scans."</p>
              </div>
           </div>
           
           <div className="border-2 border-dashed border-blue-200 bg-blue-50/30 rounded-2xl h-48 flex flex-col items-center justify-center text-center p-4 transition-colors hover:bg-blue-50 hover:border-blue-400 cursor-pointer group">
              <FiUploadCloud className="text-4xl text-blue-300 group-hover:text-blue-500 transition-colors mb-3" />
              <p className="text-xs text-gray-600 font-medium">
                Drag & drop Radiology files or <span className="text-blue-600 underline">Browse</span>
              </p>
              <p className="text-[10px] text-gray-400 mt-2">Supported formats: JPEG, PNG, PDF</p>
           </div>
           
           <button className="w-full mt-4 bg-blue-600 text-white py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-200">
              Upload
           </button>
        </div>
      </div>

      {/* 3. Document List Table */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6">
         <div className="mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
               <FiFileText /> Document List
            </h3>
            <p className="text-xs text-gray-400 mt-1">"Manage and operate your document files."</p>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="text-xs text-gray-400 border-b border-gray-100">
                     <th className="pb-3 pl-4 font-medium"><input type="checkbox" className="rounded border-gray-300" /></th>
                     <th className="pb-3 font-medium">File name</th>
                     <th className="pb-3 font-medium">Type</th>
                     <th className="pb-3 font-medium">Size</th>
                     <th className="pb-3 font-medium">Uploaded Date</th>
                     <th className="pb-3 font-medium">Record Type</th>
                     <th className="pb-3 font-medium text-center"><FiTrash2 className="mx-auto text-red-400" /></th>
                  </tr>
               </thead>
               <tbody className="text-sm">
                  {data.files.map((file) => (
                     <tr key={file.id} className="group hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                        <td className="py-4 pl-4"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></td>
                        <td className="py-4 font-bold text-gray-800 flex items-center gap-2">
                           {file.type === 'PDF' ? <FaFilePdf className="text-red-500" /> : <FaFileImage className="text-blue-500" />}
                           {file.name}
                        </td>
                        <td className="py-4 text-gray-500 font-medium text-xs uppercase">{file.type}</td>
                        <td className="py-4 text-gray-400 text-xs">{file.size}</td>
                        <td className="py-4 text-gray-400 text-xs">{file.date}</td>
                        <td className="py-4 text-gray-500 text-xs">{file.category}</td>
                        <td className="py-4 text-center">
                           <button className="text-gray-300 hover:text-red-500 transition-colors">
                              <FiTrash2 />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* 4. Bottom Section (QR & Statistics) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
         {/* Left: QR Generator Call to Action */}
         <div className="flex flex-col items-center justify-center text-center p-8">
            <h3 className="font-bold text-gray-800 mb-2">All your medical files are ready!</h3>
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-6">
               <BsQrCodeScan className="text-blue-500 text-2xl" />
               <div className="text-left">
                  <p>Your reports are now organized</p>
                  <p>Generate your personal QR code to access them anytime.</p>
               </div>
            </div>
            
            <button className="bg-gradient-to-r from-blue-800 to-red-600 text-white px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 hover:shadow-lg transition-all">
               <BsQrCodeScan /> Generate QR Code <FiArrowRight />
            </button>
         </div>

         {/* Right: Overview Statistics */}
         <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 relative overflow-hidden">
             {/* Decorative Robot Icon (Optional) */}
             <div className="absolute bottom-2 right-2 opacity-100">
                <span className="bg-cyan-400 text-white text-[9px] px-1.5 py-0.5 rounded-full absolute -top-1 -right-1 z-10">Hi!</span>
                {/* استبدلي دي بأيقونة الروبوت لو عندك الصورة */}
                <div className="text-3xl">🤖</div> 
             </div>

             <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FiActivity className="text-purple-500" /> Overview Statistics
             </h3>
             
             <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-600 font-medium">Total Files Uploaded:</span>
                   <span className="font-bold text-green-500">{data.stats.totalFiles}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-600 font-medium">Last Upload:</span>
                   <span className="font-bold text-blue-600">{data.stats.lastUpload}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-2">
                   <span className="text-gray-600 font-medium">BloodTest Files:</span>
                   <span className="font-bold text-red-500">{data.stats.bloodCount}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-600 font-medium">Radiology Files:</span>
                   <span className="font-bold text-yellow-500">{data.stats.radiologyCount}</span>
                </div>
             </div>
         </div>
      </div>

    </div>
  );
};

export default MedicalRecords;