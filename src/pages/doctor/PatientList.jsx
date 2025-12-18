import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchPatientsList } from '../../services/doctorService';
import { FiSearch, FiFilter, FiUser, FiArrowRight, FiChevronDown } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
const PatientList = () => {
    const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");

  useEffect(() => {
    fetchPatientsList().then(data => {
        setPatients(data);
        setLoading(false);
    });
  }, []);

  // منطق الفلترة (Search + Dropdown)
  const filteredPatients = patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRisk = riskFilter === "All" || patient.risk === riskFilter;
      return matchesSearch && matchesRisk;
  });

  if (loading) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Patients...</div>;

  return (
    <div className="pb-12 animate-fade-in font-sans">
      
      {/* 1. Page Header */}
      <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
             Patient List <FiUser className="text-lg" />
          </h1>
          <p className="text-gray-500 text-sm mt-1">View and manage all your patients easily.</p>
      </div>

      {/* 2. Filters Bar */}
      <div className="bg-gray-100/50 p-2 rounded-[20px] mb-8 flex flex-col md:flex-row gap-4 items-center">
          
          {/* Risk Level Filter */}
          <div className="relative group w-full md:w-48">
              <span className="absolute left-4 top-3.5 text-xs font-bold text-gray-500 z-10">Risk Level:</span>
              <select 
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full bg-white pl-20 pr-8 py-3 rounded-full text-sm font-bold text-gray-800 shadow-sm appearance-none outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
              >
                  <option value="All">All</option>
                  <option value="High">High</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Low">Low</option>
              </select>
              <FiChevronDown className="absolute right-4 top-4 text-gray-400" />
          </div>

          {/* Blood Pressure Filter (Static for UI) */}
          <div className="relative group w-full md:w-56">
              <span className="absolute left-4 top-3.5 text-xs font-bold text-gray-500 z-10">Blood Pressure:</span>
              <select className="w-full bg-white pl-28 pr-8 py-3 rounded-full text-sm font-bold text-gray-800 shadow-sm appearance-none outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
                  <option>Normal</option>
                  <option>Elevated</option>
              </select>
              <FiChevronDown className="absolute right-4 top-4 text-gray-400" />
          </div>

          {/* Last Visit Filter (Static for UI) */}
          <div className="relative group w-full md:w-48">
              <span className="absolute left-4 top-3.5 text-xs font-bold text-gray-500 z-10">Last Visit:</span>
              <select className="w-full bg-white pl-20 pr-8 py-3 rounded-full text-sm font-bold text-gray-800 shadow-sm appearance-none outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer">
                  <option>Today</option>
                  <option>This Week</option>
              </select>
              <FiChevronDown className="absolute right-4 top-4 text-gray-400" />
          </div>

          {/* Search Bar (Right Aligned) */}
          <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
              <input 
                type="text" 
                placeholder="Search by name" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white rounded-full text-sm shadow-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 placeholder-gray-300"
              />
          </div>
      </div>

      {/* 3. Patients Table */}
      <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                  {/* Table Header (Blue) */}
                  <thead>
                      <tr className="bg-[#4F46E5] text-white text-left">
                          <th className="py-5 px-6 font-bold text-sm rounded-tl-[30px]">Patient Name</th>
                          <th className="py-5 px-6 font-bold text-sm">Age</th>
                          <th className="py-5 px-6 font-bold text-sm">Gender</th>
                          <th className="py-5 px-6 font-bold text-sm">Blood Pressure</th>
                          <th className="py-5 px-6 font-bold text-sm">Heart Rate</th>
                          <th className="py-5 px-6 font-bold text-sm">Risk Level</th>
                          <th className="py-5 px-6 font-bold text-sm">Last Visit</th>
                          <th className="py-5 px-6 font-bold text-sm rounded-tr-[30px] text-center">Action</th>
                      </tr>
                  </thead>
                  
                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-50">
                      {filteredPatients.map((patient) => (
                          <tr key={patient.id} className="hover:bg-blue-50/30 transition-colors group">
                              <td className="py-5 px-6">
                                  <div className="flex items-center gap-3">
                                      <img src={patient.img} alt={patient.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                                      <span className="font-bold text-gray-900 text-sm">{patient.name}</span>
                                  </div>
                              </td>
                              <td className="py-5 px-6 text-sm text-gray-600 font-medium">{patient.age}</td>
                              <td className="py-5 px-6 text-sm text-gray-600 font-medium">{patient.gender}</td>
                              <td className="py-5 px-6 text-sm text-gray-600 font-medium">{patient.bp}</td>
                              <td className="py-5 px-6 text-sm text-gray-600 font-medium">{patient.heartRate}</td>
                              
                              {/* Risk Badge */}
                              <td className="py-5 px-6">
                                  <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full inline-block min-w-[70px] text-center
                                      ${patient.risk === 'Low' ? 'bg-green-50 text-green-600' : 
                                        patient.risk === 'Moderate' ? 'bg-yellow-50 text-yellow-600' : 
                                        'bg-red-50 text-red-600'}`}
                                  >
                                      {patient.risk}
                                  </span>
                              </td>
                              
                              <td className="py-5 px-6 text-sm text-gray-500 font-medium">{patient.lastVisit}</td>
                              
                              {/* Action Button */}
                              <td className="py-5 px-6 text-center">
  <button 
    onClick={() => navigate(`/doctor/patients/${patient.id}`)} 
    className="text-blue-600 font-bold text-xs flex items-center justify-center gap-1 hover:gap-2 transition-all mx-auto"
>
    View Record <FiArrowRight />
</button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          
          {/* Empty State */}
          {filteredPatients.length === 0 && (
              <div className="p-12 text-center text-gray-400">
                  No patients found matching your search.
              </div>
          )}
      </div>

    </div>
  );
};

export default PatientList;