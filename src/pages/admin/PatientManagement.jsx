import React, { useEffect, useState } from 'react';
import { fetchPatients, createPatient, updatePatient, deletePatientService } from '../../services/adminService';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiChevronLeft, FiChevronRight, FiCamera, FiCheck, FiCheckCircle } from "react-icons/fi";
import { BiExport } from "react-icons/bi";
import { motion, AnimatePresence } from 'framer-motion';

const PatientManagement = () => {
  // --- States ---
  const [view, setView] = useState('list'); // 'list', 'add', 'edit'
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Modal & Notification
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [notification, setNotification] = useState(null);

  // Form State
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    setLoading(true);
    fetchPatients().then(data => {
      setPatients(data);
      setLoading(false);
    });
  };

  // --- Handlers ---
  const showNotification = (msg) => {
    setNotification({ type: 'success', msg });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddClick = () => {
    setFormData({ firstName: "", lastName: "", email: "", password: "", phone: "", dob: "", gender: "Male", img: "" });
    setView('add');
  };

  const handleEditClick = (patient) => {
    const [first, last] = patient.name.split(" ");
    setFormData({ ...patient, firstName: first, lastName: last || "" });
    setView('edit');
  };

  const handleDeleteClick = (patient) => {
    setSelectedPatient(patient);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedPatient) {
      await deletePatientService(selectedPatient.id);
      loadPatients();
      setShowDeleteModal(false);
      showNotification("Patient Deleted Successfully");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const fullName = `${formData.firstName} ${formData.lastName}`;
    const avatar = formData.img || `https://i.pravatar.cc/150?u=${Math.random()}`;
    
    if (view === 'add') {
      await createPatient({ ...formData, name: fullName, img: avatar });
      showNotification("Patient Created Successfully");
    } else {
      await updatePatient({ ...formData, name: fullName, id: formData.id });
      showNotification("Patient Updated Successfully");
    }

    setLoading(false);
    setView('list');
    loadPatients();
  };

  // --- Logic ---
  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredPatients.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredPatients.length / rowsPerPage);

  // --- Components ---

  const Toast = () => (
    <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className="fixed top-8 right-8 bg-white border-l-4 border-green-500 shadow-2xl p-4 rounded-lg flex items-center gap-3 z-50 min-w-[300px]">
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600"><FiCheckCircle className="text-xl" /></div>
      <div><h4 className="font-bold text-gray-800 text-sm">{notification?.msg}</h4></div>
    </motion.div>
  );

  const DeleteModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[30px] p-8 max-w-sm w-full shadow-2xl text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Delete User?</h3>
        <p className="text-sm text-gray-500 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => setShowDeleteModal(false)} className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50">No, Cancel</button>
          <button onClick={handleConfirmDelete} className="px-6 py-2.5 rounded-full bg-red-600 text-white font-bold text-sm shadow-lg shadow-red-200 hover:bg-red-700">Yes, Confirm</button>
        </div>
      </motion.div>
    </div>
  );

  const PatientForm = () => (
    <div className="bg-white rounded-[30px] p-8 shadow-sm border border-gray-100 animate-fade-in">
        <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-bold text-gray-900">
                {view === 'add' ? 'Add New Patient' : 'Edit Patient'}
                {view === 'add' ? <FiPlus className="inline ml-2" /> : <FiEdit2 className="inline ml-2" />}
            </h2>
        </div>
        <form onSubmit={handleFormSubmit} className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-xs font-bold text-gray-700">First Name <span className="text-red-500">*</span></label><input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-gray-700">Last Name <span className="text-red-500">*</span></label><input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-gray-700">Email Address <span className="text-red-500">*</span></label><input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100" /></div>
                {view === 'add' && <div className="space-y-2"><label className="text-xs font-bold text-gray-700">Password <span className="text-red-500">*</span></label><input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100" /></div>}
                <div className="space-y-2"><label className="text-xs font-bold text-gray-700">Phone Number <span className="text-red-500">*</span></label><input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-gray-700">Date of Birth <span className="text-red-500">*</span></label><input type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-blue-100" /></div>
                
                <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-700">Gender</label>
                     <div className="flex border border-gray-200 rounded-full p-1 w-fit">
                        <button type="button" onClick={() => setFormData({...formData, gender: 'Male'})} className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${formData.gender === 'Male' ? 'bg-white text-green-600 shadow-sm border border-gray-100' : 'text-gray-500'}`}>♂ Male</button>
                        <button type="button" onClick={() => setFormData({...formData, gender: 'Female'})} className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${formData.gender === 'Female' ? 'bg-white text-pink-600 shadow-sm border border-gray-100' : 'text-gray-500'}`}>♀ Female</button>
                     </div>
                </div>
            </div>
            <div className="w-full lg:w-80">
                <label className="text-xs font-bold text-gray-700 mb-2 block">Upload Photo</label>
                {view === 'add' ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-48 cursor-pointer hover:bg-gray-50">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3"><FiCamera className="text-xl" /></div>
                      <p className="text-xs font-bold text-gray-800">Click to upload photo</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                      <img src={formData.img} className="w-24 h-24 rounded-2xl object-cover border border-gray-200" alt="pat" />
                      <button type="button" className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-700">Change photo</button>
                  </div>
                )}
            </div>
        </form>
        <div className="flex justify-end gap-3 mt-8 border-t border-gray-100 pt-6">
            <button onClick={() => setView('list')} className="px-6 py-3 rounded-full border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50">Cancel</button>
            <button onClick={handleFormSubmit} className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 flex items-center gap-2">
                {view === 'add' ? <><FiPlus /> Create Patient</> : <><FiCheck /> Save Changes</>}
            </button>
        </div>
    </div>
  );

  return (
    <div className="pb-12 animate-fade-in font-sans relative">
      <AnimatePresence>
        {notification && <Toast />}
        {showDeleteModal && <DeleteModal />}
      </AnimatePresence>

      {view === 'list' ? (
        <>
          <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">Patient Management <span className="text-gray-400 text-lg"><FiEdit2 /></span></h1>
              <p className="text-gray-500 text-sm mt-1">View, edit, and manage all registered patients.</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
              <div className="relative w-full md:w-96">
                  <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
                  <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white rounded-full text-sm outline-none border border-gray-100 focus:ring-2 focus:ring-blue-100 shadow-sm" />
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                  <button className="px-6 py-3 rounded-full border border-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center gap-2 bg-white"><BiExport className="text-lg" /> Export</button>
                  <button onClick={handleAddClick} className="px-6 py-3 rounded-full bg-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 flex items-center justify-center gap-2"><FiPlus className="text-lg" /> Add Patient</button>
              </div>
          </div>
          <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden mb-6">
              <table className="w-full min-w-[900px]">
                  <thead>
                      <tr className="bg-[#4338CA] text-white text-left text-xs uppercase tracking-wider">
                          <th className="p-4 w-12 text-center"><input type="checkbox" className="rounded text-blue-600" /></th>
                          <th className="p-4 font-bold">Full Name</th>
                          <th className="p-4 font-bold">Email</th>
                          <th className="p-4 font-bold">Phone Number</th>
                          <th className="p-4 font-bold text-center">Age</th>
                          <th className="p-4 font-bold text-center">Gender</th>
                          <th className="p-4 font-bold text-center">Actions</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-sm">
                      {loading ? (
                          <tr><td colSpan="7" className="p-8 text-center text-blue-600 font-bold">Loading...</td></tr>
                      ) : (
                          currentRows.map(patient => (
                              <tr key={patient.id} className="hover:bg-blue-50/30 transition-colors group">
                                  <td className="p-4 text-center"><input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></td>
                                  <td className="p-4">
                                      <div className="flex items-center gap-3">
                                          <img src={patient.img} alt="" className="w-9 h-9 rounded-full object-cover border border-gray-100" />
                                          <span className="font-bold text-gray-900">{patient.name}</span>
                                      </div>
                                  </td>
                                  <td className="p-4 text-gray-500">{patient.email}</td>
                                  <td className="p-4 text-gray-500">{patient.phone}</td>
                                  <td className="p-4 text-center text-gray-500">{patient.age}</td>
                                  <td className="p-4 text-center">
                                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${patient.gender === 'Female' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                          {patient.gender}
                                      </span>
                                  </td>
                                  <td className="p-4">
                                      <div className="flex items-center justify-center gap-3">
                                          <button onClick={() => handleEditClick(patient)} className="text-gray-400 hover:text-blue-600 transition-colors"><FiEdit2 className="text-lg" /></button>
                                          <button onClick={() => handleDeleteClick(patient)} className="text-gray-400 hover:text-red-500 transition-colors"><FiTrash2 className="text-lg" /></button>
                                      </div>
                                  </td>
                              </tr>
                          ))
                      )}
                  </tbody>
              </table>
              {!loading && currentRows.length === 0 && <div className="p-8 text-center text-gray-400">No patients found.</div>}
          </div>
          
          <div className="flex items-center justify-between">
             <span className="text-xs text-blue-600 font-bold">Rows per page: <span className="bg-white px-2 py-1 rounded border border-blue-100 mx-1">{rowsPerPage}</span> of {filteredPatients.length} rows</span>
             <div className="flex items-center gap-2">
                 <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50"><FiChevronLeft /></button>
                 {[...Array(totalPages || 1)].map((_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>{i + 1}</button>
                 ))}
                 <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50"><FiChevronRight /></button>
             </div>
          </div>
        </>
      ) : <PatientForm />}
    </div>
  );
};

export default PatientManagement;