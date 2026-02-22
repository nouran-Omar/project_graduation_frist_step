import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./PatientManagement.module.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import EmptyState from "../shared/EmptyState/EmptyState";
import { Toast } from "../../../../components";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FiSearch, FiUpload, FiPlus, FiEdit3, FiTrash2 } from "react-icons/fi";
import { MdManageAccounts } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiChevronLeft, HiChevronRight, HiChevronDown } from "react-icons/hi2";

const DUMMY_PATIENTS = [
  { id: 1,  fullName: "Nada Aql",           email: "nada.aql@gmail.com",           phone: "+201008205312", age: 29, gender: "Female", image: "https://randomuser.me/api/portraits/women/12.jpg" },
  { id: 2,  fullName: "Hazem Abdelmajid",   email: "hazem.abdelmajid@gmail.com",   phone: "+201012020766", age: 33, gender: "Male",   image: "https://randomuser.me/api/portraits/men/23.jpg"   },
  { id: 3,  fullName: "Hoda Bakry",         email: "hoda.bakry@gmail.com",         phone: "+201012020766", age: 59, gender: "Female", image: "https://randomuser.me/api/portraits/women/34.jpg" },
  { id: 4,  fullName: "Ola Ashour",         email: "ola.ashour@gmail.com",         phone: "+201122626940", age: 45, gender: "Female", image: "https://randomuser.me/api/portraits/women/45.jpg" },
  { id: 5,  fullName: "Hanaa Khalil",       email: "hanaa.khalil@gmail.com",       phone: "+201005521587", age: 37, gender: "Female", image: "https://randomuser.me/api/portraits/women/56.jpg" },
  { id: 6,  fullName: "Sajda Hafez",        email: "sajda.hafez@gmail.com",        phone: "+201006865699", age: 52, gender: "Female", image: "https://randomuser.me/api/portraits/women/67.jpg" },
  { id: 7,  fullName: "Mohamed Abdelkader", email: "mohamed.abdelkader@gmail.com", phone: "+201140092221", age: 30, gender: "Male",   image: "https://randomuser.me/api/portraits/men/8.jpg"    },
  { id: 8,  fullName: "Tarek El-Moghawry",  email: "tarek.moghawry@gmail.com",     phone: "+201111269301", age: 60, gender: "Male",   image: "https://randomuser.me/api/portraits/men/17.jpg"   },
  { id: 9,  fullName: "Reem Saleh",         email: "reem.saleh@gmail.com",         phone: "+201001842794", age: 48, gender: "Female", image: "https://randomuser.me/api/portraits/women/78.jpg" },
  { id: 10, fullName: "Abdelmohsen Salem",  email: "abdelmohsen.salem@gmail.com",  phone: "+201003738387", age: 27, gender: "Male",   image: "https://randomuser.me/api/portraits/men/29.jpg"   },
  { id: 11, fullName: "Amjad Hussein",      email: "amjad.hussein@gmail.com",      phone: "+201090986990", age: 40, gender: "Male",   image: "https://randomuser.me/api/portraits/men/38.jpg"   },
  { id: 12, fullName: "Sara Mohsen",        email: "sara.mohsen@gmail.com",        phone: "+201012345678", age: 31, gender: "Female", image: "https://randomuser.me/api/portraits/women/89.jpg" },
  { id: 13, fullName: "Khaled Nour",        email: "khaled.nour@gmail.com",        phone: "+201198765432", age: 44, gender: "Male",   image: "https://randomuser.me/api/portraits/men/47.jpg"   },
  { id: 14, fullName: "Mona Farouk",        email: "mona.farouk@gmail.com",        phone: "+201011223344", age: 38, gender: "Female", image: "https://randomuser.me/api/portraits/women/5.jpg"  },
  { id: 15, fullName: "Ahmed Saber",        email: "ahmed.saber@gmail.com",        phone: "+201055667788", age: 55, gender: "Male",   image: "https://randomuser.me/api/portraits/men/59.jpg"   },
  { id: 16, fullName: "Dina El-Sayed",      email: "dina.elsayed@gmail.com",       phone: "+201099887766", age: 26, gender: "Female", image: "https://randomuser.me/api/portraits/women/16.jpg" },
  { id: 17, fullName: "Omar Galal",         email: "omar.galal@gmail.com",         phone: "+201033445566", age: 34, gender: "Male",   image: "https://randomuser.me/api/portraits/men/71.jpg"   },
  { id: 18, fullName: "Yasmin Taha",        email: "yasmin.taha@gmail.com",        phone: "+201077889900", age: 42, gender: "Female", image: "https://randomuser.me/api/portraits/women/27.jpg" },
  { id: 19, fullName: "Mostafa Hamdy",      email: "mostafa.hamdy@gmail.com",      phone: "+201021343546", age: 50, gender: "Male",   image: "https://randomuser.me/api/portraits/men/82.jpg"   },
  { id: 20, fullName: "Nour Eldin Hassan",  email: "nour.hassan@gmail.com",        phone: "+201087654321", age: 36, gender: "Male",   image: "https://randomuser.me/api/portraits/men/93.jpg"   },
  { id: 21, fullName: "Mariam Youssef",     email: "mariam.youssef@gmail.com",     phone: "+201091122334", age: 28, gender: "Female", image: "https://randomuser.me/api/portraits/women/38.jpg" },
  { id: 22, fullName: "Karim Zaki",         email: "karim.zaki@gmail.com",         phone: "+201062233445", age: 41, gender: "Male",   image: "https://randomuser.me/api/portraits/men/14.jpg"   },
  { id: 23, fullName: "Salma Ibrahim",      email: "salma.ibrahim@gmail.com",      phone: "+201053344556", age: 35, gender: "Female", image: "https://randomuser.me/api/portraits/women/49.jpg" },
  { id: 24, fullName: "Bassem Wael",        email: "bassem.wael@gmail.com",        phone: "+201044455667", age: 47, gender: "Male",   image: "https://randomuser.me/api/portraits/men/66.jpg"   },
  { id: 25, fullName: "Noha Ramzy",         email: "noha.ramzy@gmail.com",         phone: "+201035566778", age: 32, gender: "Female", image: "https://randomuser.me/api/portraits/women/60.jpg" },
  { id: 26, fullName: "Sherif Ragab",       email: "sherif.ragab@gmail.com",       phone: "+201026677889", age: 53, gender: "Male",   image: "https://randomuser.me/api/portraits/men/37.jpg"   },
  { id: 27, fullName: "Doaa Fawzy",         email: "doaa.fawzy@gmail.com",         phone: "+201017788990", age: 39, gender: "Female", image: "https://randomuser.me/api/portraits/women/71.jpg" },
  { id: 28, fullName: "Islam Magdy",        email: "islam.magdy@gmail.com",        phone: "+201008899001", age: 44, gender: "Male",   image: "https://randomuser.me/api/portraits/men/55.jpg"   },
  { id: 29, fullName: "Rana Ashraf",        email: "rana.ashraf@gmail.com",        phone: "+201099900112", age: 26, gender: "Female", image: "https://randomuser.me/api/portraits/women/82.jpg" },
  { id: 30, fullName: "Adel Samir",         email: "adel.samir@gmail.com",         phone: "+201080011223", age: 58, gender: "Male",   image: "https://randomuser.me/api/portraits/men/91.jpg"   },
  { id: 31, fullName: "Heba Mansour",       email: "heba.mansour@gmail.com",       phone: "+201071122334", age: 33, gender: "Female", image: "https://randomuser.me/api/portraits/women/93.jpg" },
  { id: 32, fullName: "Magdy El-Gohary",    email: "magdy.elgohary@gmail.com",     phone: "+201062233445", age: 49, gender: "Male",   image: "https://randomuser.me/api/portraits/men/43.jpg"   },
  { id: 33, fullName: "Amira Soltan",       email: "amira.soltan@gmail.com",       phone: "+201053344556", age: 31, gender: "Female", image: "https://randomuser.me/api/portraits/women/22.jpg" },
  { id: 34, fullName: "Waleed Fares",       email: "waleed.fares@gmail.com",       phone: "+201044455667", age: 45, gender: "Male",   image: "https://randomuser.me/api/portraits/men/6.jpg"    },
  { id: 35, fullName: "Samah Gad",          email: "samah.gad@gmail.com",          phone: "+201035566778", age: 37, gender: "Female", image: "https://randomuser.me/api/portraits/women/33.jpg" },
  { id: 36, fullName: "Tarek Sharaf",       email: "tarek.sharaf@gmail.com",       phone: "+201026677889", age: 54, gender: "Male",   image: "https://randomuser.me/api/portraits/men/77.jpg"   },
  { id: 37, fullName: "Rania Fouad",        email: "rania.fouad@gmail.com",        phone: "+201017788990", age: 29, gender: "Female", image: "https://randomuser.me/api/portraits/women/44.jpg" },
  { id: 38, fullName: "Hassan Shehata",     email: "hassan.shehata@gmail.com",     phone: "+201008899001", age: 62, gender: "Male",   image: "https://randomuser.me/api/portraits/men/88.jpg"   },
  { id: 39, fullName: "Eman Lotfy",         email: "eman.lotfy@gmail.com",         phone: "+201099900112", age: 43, gender: "Female", image: "https://randomuser.me/api/portraits/women/55.jpg" },
  { id: 40, fullName: "Mahmoud El-Refaay",  email: "mahmoud.refaay@gmail.com",     phone: "+201080011223", age: 36, gender: "Male",   image: "https://randomuser.me/api/portraits/men/62.jpg"   },
];

const ROWS_OPTIONS = [5, 10, 20, 50];

export default function PatientManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  const [patients,    setPatients]    = useState(DUMMY_PATIENTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showRPPMenu, setShowRPPMenu] = useState(false);
  const [modal,       setModal]       = useState({ open: false, type: "single", targetId: null });
  const [toast,       setToast]       = useState({ visible: false, title: "", message: "" });

  useEffect(() => {
    if (location.state?.success) {
      setToast({
        visible: true,
        title:   location.state.title   || "Done Successfully",
        message: location.state.message || "Your changes have been saved.",
      });
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filtered = patients.filter((p) =>
    p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.phone.includes(searchQuery)
  );

  const totalRows  = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const safePage   = Math.min(currentPage, totalPages);
  const pageStart  = (safePage - 1) * rowsPerPage;
  const pageItems  = filtered.slice(pageStart, pageStart + rowsPerPage);

  const allPageSelected =
    pageItems.length > 0 && pageItems.every((p) => selectedIds.includes(p.id));

  const toggleSelect = (id) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const toggleSelectAll = (chk) => {
    if (chk) setSelectedIds((prev) => [...new Set([...prev, ...pageItems.map((p) => p.id)])]);
    else     setSelectedIds((prev) => prev.filter((id) => !pageItems.find((p) => p.id === id)));
  };

  const openSingleDeleteModal = (patient) =>
    setModal({ open: true, type: "single", targetId: patient.id });

  const openBulkDeleteModal = () =>
    setModal({ open: true, type: "bulk", targetId: null });

  const handleDeleteConfirm = () => {
    if (modal.type === "single") {
      setPatients((prev) => prev.filter((p) => p.id !== modal.targetId));
      setSelectedIds((prev) => prev.filter((id) => id !== modal.targetId));
      setToast({
        visible: true,
        title: "Deleted Successfully",
        message: "Patient has been removed from the platform.",
      });
    } else {
      const count = selectedIds.length;
      setPatients((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      setSelectedIds([]);
      setToast({
        visible: true,
        title: "Deleted Successfully",
        message: `${count} patients have been removed.`,
      });
    }
    setModal({ open: false, type: "single", targetId: null });
  };

  const handleExport = async () => {
    try {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Patients");
      sheet.columns = [
        { header: "Full Name", key: "fullName", width: 30 },
        { header: "Email",     key: "email",    width: 35 },
        { header: "Phone",     key: "phone",    width: 20 },
        { header: "Age",       key: "age",      width: 10 },
        { header: "Gender",    key: "gender",   width: 12 },
      ];
      patients.forEach((p) => sheet.addRow(p));
      saveAs(new Blob([await workbook.xlsx.writeBuffer()]), "PulseX_Patients.xlsx");
    } catch (e) {
      console.error("Export failed", e);
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 4) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 2)   return [1, 2, 3, 4];
    if (safePage >= totalPages - 1)
      return [totalPages - 3, totalPages - 2, totalPages - 1, totalPages].filter((n) => n > 0);
    return [safePage - 1, safePage, safePage + 1, safePage + 2];
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className={styles.page}>

      <Toast
        visible={toast.visible}
        title={toast.title}
        message={toast.message}
        type="success"
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <div className={styles.header}>
        <div className={styles.titleInfo}>
          <div className={styles.titleWithIcon}>
            <MdManageAccounts className={styles.iconSetting} />
            <h1>Patient Management</h1>
          </div>
          <p>View, edit, and manage all registered patients.</p>
        </div>
      </div>

      <div className={styles.search}>
        <div className={styles.topActions}>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button className={styles.exportBtn} onClick={handleExport}>
              <FiUpload style={{ marginRight: 6 }} /> Export
            </button>
            <button className={styles.addBtn} onClick={() => navigate("/admin/AddPatientBtn")}>
              <FiPlus style={{ marginRight: 6 }} /> Add Patient
            </button>
          </div>
        </div>
      </div>

      {selectedIds.length > 0 && (
        <div className={styles.bulkBar}>
          <input
            type="checkbox"
            checked
            onChange={() => setSelectedIds([])}
            className={styles.checkbox}
          />
          <span className={styles.bulkCount}>{selectedIds.length} Selected</span>
          <button className={styles.bulkDeleteBtn} onClick={openBulkDeleteModal}>
            Delete Selected
          </button>
          <button className={styles.bulkCancelBtn} onClick={() => setSelectedIds([])}>
            Cancel
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={<HiOutlineUsers />}
          title="No Patients Found"
          description="No patients have been registered on the platform yet."
          buttonLabel="+ Add Patient"
          onAction={() => navigate("/admin/AddPatientBtn")}
          accentColor="#F0FDF4"
          iconColor="#059669"
        />
      ) : (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thCheck}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={allPageSelected}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th className={styles.th}>Full Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Phone Number</th>
                  <th className={`${styles.th} ${styles.thCenter}`}>Age</th>
                  <th className={`${styles.th} ${styles.thCenter}`}>Gender</th>
                  <th className={`${styles.th} ${styles.thCenter}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageItems.map((patient, idx) => {
                  const isMale     = patient.gender?.toLowerCase() === "male";
                  const isSelected = selectedIds.includes(patient.id);
                  return (
                    <tr
                      key={patient.id}
                      className={`${styles.tr} ${idx % 2 === 0 ? styles.trEven : styles.trOdd}${isSelected ? " " + styles.trSelected : ""}`}
                    >
                      <td className={styles.tdCheck}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={isSelected}
                          onChange={() => toggleSelect(patient.id)}
                        />
                      </td>
                      <td className={styles.td}>
                        <div className={styles.nameCell}>
                          <img
                            src={patient.image}
                            alt={patient.fullName}
                            className={styles.avatar}
                          />
                          <span className={styles.nameText}>{patient.fullName}</span>
                        </div>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.mutedText}>{patient.email}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.mutedText}>{patient.phone}</span>
                      </td>
                      <td className={`${styles.td} ${styles.tdCenter}`}>
                        <span className={styles.mutedText}>{patient.age}</span>
                      </td>
                      <td className={`${styles.td} ${styles.tdCenter}`}>
                        <span className={isMale ? styles.badgeMale : styles.badgeFemale}>
                          {patient.gender}
                        </span>
                      </td>
                      <td className={`${styles.td} ${styles.tdCenter}`}>
                        <div className={styles.actionsCell}>
                          <button
                            className={styles.editBtn}
                            onClick={() => navigate(`/admin/edit-patient/${patient.id}`)}
                            title="Edit"
                          >
                            <FiEdit3 size={16} />
                          </button>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => openSingleDeleteModal(patient)}
                            title="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.paginationBar}>
            <div className={styles.rppGroup}>
              <span className={styles.rppLabel}>Rows per page</span>
              <div className={styles.rppSelect} onClick={() => setShowRPPMenu((v) => !v)}>
                <span>{rowsPerPage}</span>
                <HiChevronDown size={14} />
                {showRPPMenu && (
                  <ul className={styles.rppMenu}>
                    {ROWS_OPTIONS.map((opt) => (
                      <li
                        key={opt}
                        className={opt === rowsPerPage ? styles.rppActive : ""}
                        onClick={() => {
                          setRowsPerPage(opt);
                          setCurrentPage(1);
                          setShowRPPMenu(false);
                        }}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <span className={styles.rppTotal}>of {totalRows} rows</span>
            </div>

            <div className={styles.pages}>
              <button
                className={styles.pageArrow}
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              >
                <HiChevronLeft size={16} />
              </button>
              {getPageNumbers().map((n) => (
                <button
                  key={n}
                  className={n === safePage ? styles.pageActive : styles.pageBtn}
                  onClick={() => setCurrentPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                className={styles.pageArrow}
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              >
                <HiChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      <ConfirmModal
        isOpen={modal.open}
        title={
          modal.type === "bulk"
            ? `Delete ${selectedIds.length} Patients?`
            : "Delete Patient?"
        }
        desc={
          modal.type === "bulk"
            ? `Are you sure you want to delete ${selectedIds.length} patients? This action is permanent and cannot be undone.`
            : "Are you sure you want to delete this patient? This action is permanent and cannot be undone."
        }
        onCancel={() => setModal({ open: false, type: "single", targetId: null })}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
