import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPatientDetails } from '../../services/doctorService';
import { FiMessageSquare, FiFileText, FiDownload } from "react-icons/fi";
import { BiInjection } from "react-icons/bi";
import { FaHeartbeat, FaLightbulb } from "react-icons/fa";
import { MdBloodtype, MdMonitorHeart } from "react-icons/md";
import { TbActivityHeartbeat } from "react-icons/tb";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    fetchPatientDetails(id).then(setPatient);
  }, [id]);

  if (!patient) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Details...</div>;

  return (
    <div className="pb-12 animate-fade-in font-sans">
      
      {/* 1. Header Section */}
      <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-6">
              <img src={patient.img} alt={patient.name} className="w-20 h-20 rounded-full object-cover border-4 border-gray-50" />
              <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{patient.name}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{patient.age} years old</span>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span>{patient.gender}</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold ml-2">{patient.risk}</span>
                  </div>
              </div>
          </div>
          <button 
             onClick={() => navigate('/doctor/messages')}
             className="mt-4 md:mt-0 bg-[#4F46E5] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-blue-200 hover:bg-[#4338ca] transition-all flex items-center gap-2"
          >
              <FiMessageSquare className="text-lg" /> Message Patient
          </button>
      </div>

      {/* 2. Vital Signs Cards */}
      <h3 className="font-bold text-gray-900 text-lg mb-4">Vital Signs</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {/* Heart Rate */}
          <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center"><FaHeartbeat /></div>
                  <span className="text-[10px] font-bold text-gray-400">Heart Rate</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900">{patient.vitals.heartRate}</h4>
              <span className="text-xs text-gray-400">bpm</span>
          </div>

          {/* Blood Pressure */}
          <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><MdBloodtype /></div>
                  <span className="text-[10px] font-bold text-gray-400">Blood Pressure</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900">{patient.vitals.bp}</h4>
              <span className="text-xs text-gray-400">mmHg</span>
          </div>

          {/* Blood Sugar */}
          <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center"><BiInjection /></div>
                  <span className="text-[10px] font-bold text-gray-400">Blood Sugar</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900">{patient.vitals.sugar}</h4>
              <span className="text-xs text-gray-400">mg/dL</span>
          </div>

          {/* Cholesterol */}
          <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center"><TbActivityHeartbeat /></div>
                  <span className="text-[10px] font-bold text-gray-400">Cholesterol</span>
              </div>
              <h4 className="text-xl font-bold text-gray-900">{patient.vitals.cholesterol}</h4>
              <span className="text-xs text-gray-400">mg/dL</span>
          </div>

           {/* Blood Count */}
           <div className="bg-white p-5 rounded-[24px] shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center"><MdMonitorHeart /></div>
                  <span className="text-[10px] font-bold text-gray-400">Blood Count</span>
              </div>
              <h4 className="text-xl font-bold text-green-600">{patient.vitals.bloodCount}</h4>
              <span className="text-xs text-gray-400">CBC</span>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 3. Medical Records (Takes 2 Columns) */}
          <div className="lg:col-span-2 bg-white rounded-[30px] p-8 shadow-sm border border-gray-100 h-fit">
              <h3 className="font-bold text-gray-900 text-lg mb-6">Medical Records</h3>
              
              <div className="overflow-x-auto">
                  <table className="w-full">
                      <thead>
                          <tr className="text-left text-xs font-bold text-gray-400 border-b border-gray-50">
                              <th className="pb-4 pl-2">File Name</th>
                              <th className="pb-4">Type</th>
                              <th className="pb-4">Upload Date</th>
                              <th className="pb-4 text-right pr-2">Action</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                          {patient.records.map((rec) => (
                              <tr key={rec.id} className="group hover:bg-gray-50 transition-colors">
                                  <td className="py-4 pl-2 flex items-center gap-3">
                                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600"><FiFileText /></div>
                                      <span className="text-sm font-bold text-gray-800">{rec.name}</span>
                                  </td>
                                  <td className="py-4">
                                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md 
                                          ${rec.type === 'Blood Test' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                          {rec.type}
                                      </span>
                                  </td>
                                  <td className="py-4 text-xs text-gray-500">{rec.date}</td>
                                  <td className="py-4 text-right pr-2">
                                      <button className="text-blue-600 text-xs font-bold hover:underline">View</button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>

          {/* 4. Patient QR Code (Takes 1 Column) */}
          <div className="space-y-6">
              
              {/* QR Card */}
              <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                  <h3 className="font-bold text-gray-900 text-lg mb-6 self-start">Patient QR Code</h3>
                  
                  <div className="bg-white p-2 border-2 border-dashed border-gray-200 rounded-xl mb-6">
                      {/* Fake QR Code Image */}
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PulseX-Patient-Details" alt="QR" className="w-32 h-32" />
                  </div>

                  <div className="w-full space-y-3 mb-6">
                      <div className="flex justify-between text-xs">
                          <span className="font-bold text-gray-500 flex items-center gap-2">🗓 Generated on:</span>
                          <span className="font-bold text-gray-900">{patient.qr.date}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                          <span className="font-bold text-gray-500 flex items-center gap-2">📊 Total Files:</span>
                          <span className="font-bold text-gray-900">{patient.qr.files}</span>
                      </div>
                  </div>

                  <button className="w-full bg-[#4F46E5] text-white py-3 rounded-full text-xs font-bold shadow-lg shadow-blue-200 hover:bg-[#4338ca] transition-all flex items-center justify-center gap-2">
                      <FiDownload /> Download PDF
                  </button>
              </div>

              {/* Tip Box */}
              <div className="bg-[#5C60F5] rounded-[24px] p-6 text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
                   <div className="relative z-10 flex gap-4">
                      <div className="mt-1">
                          <FaLightbulb className="text-yellow-300 text-xl" />
                      </div>
                      <div>
                          <h4 className="font-bold text-sm mb-1">Tip</h4>
                          <p className="text-[10px] opacity-90 leading-relaxed">
                              Scan or download this code to access all uploaded records instantly.
                          </p>
                      </div>
                   </div>
                   {/* Decoration */}
                   <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
              </div>

          </div>

      </div>

    </div>
  );
};

export default PatientDetails;