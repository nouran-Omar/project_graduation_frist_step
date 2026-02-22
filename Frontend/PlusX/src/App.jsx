import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'

// ─── Layouts ───────────────────────────────────────────────────
// الـ AdminLayout خاص بلوحة تحكم الأدمن
import AdminLayout      from './features/admin/components/AdminLayout/AdminLayout'
// الـ PatientMainLayout خاص بلوحة تحكم المريض
import PatientMainLayout from './features/patient/components/PatientLayout/PatientMainLayout'
// الـ DoctorLayout خاص بلوحة تحكم الدكتور
import DoctorLayout     from './features/doctor/components/DoctorLayout/DoctorLayout'
import Layout           from './components/Layout/Layout'
// ─── Home & Auth pages ─────────────────────────────────────────
import Home             from './features/home/pages/Home/Home'
import Login            from './features/auth/pages/Login/Login'
import Register         from './features/auth/pages/Register/Register'
import ForgotPassword   from './features/auth/pages/ForgotPassword/ForgotPassword'
// صفحة 404 — موجودة داخل features/admin
import NotFound         from './features/admin/components/NotFound/NotFound'

// ─── Admin feature pages ───────────────────────────────────────
import AdminDashboard    from './features/admin/components/AdminDashboard/AdminDashboard'
import DoctorManagement  from './features/admin/components/DoctorManagement/DoctorManagement'
import PatientManagement from './features/admin/components/PatientManagement/PatientManagement'
import StoriesManagement from './features/admin/components/StoriesManagement/StoriesManagement'
import ActivityLogs      from './features/admin/components/ActivityLogs/ActivityLogs'
import SettingsProfile   from './features/admin/components/SettingsProfile/SettingsProfile'
import AddDoctorBtn      from './features/admin/components/AddDoctorBtn/AddDoctorBtn'
import AddPatientBtn     from './features/admin/components/AddPatientBtn/AddPatientBtn'
import EditPatient       from './features/admin/components/EditPatient/EditPatient'
import EditDoctor        from './features/admin/components/EditDoctor/EditDoctor'
import AdminReports      from './features/admin/components/AdminReports/AdminReports'
import StoryDetails      from './features/admin/components/StoryDetails/StoryDetails'
import StoryAllComments  from './features/admin/components/StoryAllComments/StoryAllComments'

// ─── Patient feature pages ─────────────────────────────────────
import PatientDashboard       from './features/patient/pages/PatientDashboard/PatientDashboard'
import PatientLifestyleSurvey from './features/patient/components/PatientLifestyleSurvey/PatientLifestyleSurvey'
import PatientHeartRisk       from './features/patient/components/HeartRisk/PatientHeartRisk'
import PatientDoctorList      from './features/patient/components/PatientDoctorList/PatientDoctorList'
import PatientDoctorProfile   from './features/patient/components/PatientDoctorProfile/PatientDoctorProfile'
import PatientBooking         from './features/patient/components/PatientBooking/PatientBooking'
import PatientPayment         from './features/patient/components/PatientPayment/PatientPayment'
import PatientAppointments    from './features/patient/components/PatientAppointments/PatientAppointments'
import PatientQRCode          from './features/patient/components/PatientQRCode/PatientQRCode'
import PatientMessages        from './features/patient/components/PatientMessages/PatientMessages'
import PatientMedicalRecords  from './features/patient/components/PatientMedicalRecords/PatientMedicalRecords'
import PatientStories         from './features/patient/components/PatientStories/PatientStories'
import PatientStoryDetails    from './features/patient/components/PatientStoryDetails/PatientStoryDetails'
import WriteStory             from './features/patient/components/WriteStory/WriteStory'
import PatientPrescriptions   from './features/patient/components/PatientPrescriptions/PatientPrescriptions'
import PrescriptionDetail     from './features/patient/components/PrescriptionDetail/PrescriptionDetail'
import PrescriptionDetailModal from './features/patient/components/PrescriptionDetailModal/PrescriptionDetailModal'

// ─── Doctor feature pages ──────────────────────────────────────
import DoctorDashboard from './features/doctor/pages/DoctorDashboard/DoctorDashboard'

function App() {
  const routing = createBrowserRouter([
    // 1. المسار الأساسي (Landing Page) — Home تعرض Navbar/Footer بنفسها
    {
      path: "/",
      element: <Layout />,  
      children: [{ index: true, element: <Home/>}]
    },

    // 2. صفحات الـ Auth (Standalone - تملأ الشاشة)
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },

    // 3. مسارات لوحة تحكم الأدمن (بداخل AdminLayout)
    {
      path: "/admin",
      element: <AdminLayout />, 
      children: [
        { index: true, element: <AdminDashboard /> }, 
        { path: "dashboard", element: <AdminDashboard /> }, 
        { path: "doctor-management", element: <DoctorManagement /> },
        { path: "patient-management", element: <PatientManagement /> },
        { path: "stories-management", element: <StoriesManagement /> },
        { path: "activity-logs", element: <ActivityLogs /> },
        { path: "settings", element: <SettingsProfile /> },
        { path: "/admin/AddDoctorBtn", element: <AddDoctorBtn /> }, 
        { path: "/admin/AddPatientBtn", element: <AddPatientBtn /> },
        { path: "edit-doctor/:id", element: <EditDoctor /> },
        { path: "edit-patient/:id", element: <EditPatient /> },
        { path: "reports", element: <AdminReports /> },
        { path: "stories/:id", element: <StoryDetails /> },
        { path: "stories/:id/comments", element: <StoryAllComments /> },
      ]
    },

    // 4. لوحة تحكم المريض (داخل PatientMainLayout)
    {
      path: "/patient",
      element: <PatientMainLayout />,
      children: [
        { index: true,                   element: <PatientDashboard /> },
        { path: "dashboard",             element: <PatientDashboard /> },
        { path: "survey",                element: <PatientLifestyleSurvey /> },
        { path: "heart-risk",            element: <PatientHeartRisk /> },
        { path: "doctors",               element: <PatientDoctorList /> },
        { path: "doctor-profile/:id",    element: <PatientDoctorProfile /> },
        { path: "booking/:id",           element: <PatientBooking /> },
        { path: "payment/:id",           element: <PatientPayment /> },
        { path: "appointments",          element: <PatientAppointments /> },
        { path: "qr",                    element: <PatientQRCode /> },
        { path: "settings",              element: <SettingsProfile /> },
        { path: "messages",              element: <PatientMessages /> },
        { path: "records",               element: <PatientMedicalRecords /> },
        { path: "stories",               element: <PatientStories /> },
        { path: "stories/:id",           element: <PatientStoryDetails /> },
        { path: "write-story",           element: <WriteStory /> },
        { path: "prescription",          element: <PatientPrescriptions /> },
        { path: "prescription/:id",      element: <PrescriptionDetail /> },
      ]
    },

    // 5. لوحة تحكم الأطباء (داخل DoctorLayout)
    {
      path: "/doctor",
      element: <DoctorLayout />,
      children: [
        { index: true,       element: <DoctorDashboard /> },
        { path: "dashboard", element: <DoctorDashboard /> },
      ]
    },

    // 6. الـ Global Catch-all (NotFound)
    { path: "*", element: <NotFound /> }
  ]);

  return (
    <RouterProvider router={routing} />
  )
}

export default App;