import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// --- 1. Landing Page Components (من المشروع القديم) ---
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import DoctorSection from './components/sections/DoctorSection';
import Features from './components/sections/Features';
import JourneyTimeline from './components/sections/JourneyTimeline';
import RecoveryStories from './components/sections/RecoveryStories';

// --- 2. Auth Pages (من المشروع القديم) ---
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyCode from './pages/auth/VerifyCode';
import ResetPassword from './pages/auth/ResetPassword';
import PasswordChanged from './pages/auth/PasswordChanged';

// --- 3. Layouts (من مشروع الداشبورد) ---
import PatientLayout from './layouts/PatientLayout';
import DoctorLayout from './layouts/DoctorLayout';
import AdminLayout from './layouts/AdminLayout';

// --- 4. Patient Pages ---
import Dashboard from './pages/patient/Dashboard';
import Records from './pages/patient/MedicalRecords';
import RiskAssessment from './pages/patient/HeartRiskAssessment';
import QRCodePage from './pages/patient/QRCode';
import DoctorList from './pages/patient/DoctorList';
import BookingPage from './pages/patient/BookingPage';
import PaymentPage from './pages/patient/PaymentPage';
import Appointments from './pages/patient/Appointments';
import Messages from './pages/patient/Messages';
import Stories from './pages/patient/Stories';
import StoryDetails from './pages/patient/StoryDetails';
import WriteStory from './pages/patient/WriteStory';
import Settings from './pages/patient/Settings';

// --- 5. Doctor Pages ---
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import PatientList from './pages/doctor/PatientList';
import PatientDetails from './pages/doctor/PatientDetails';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorMessages from './pages/doctor/DoctorMessages';
import PatientStories from './pages/doctor/PatientStories';
import DoctorSettings from './pages/doctor/DoctorSettings';

// --- 6. Admin Pages ---
import AdminDashboard from './pages/admin/AdminDashboard';
import DoctorManagement from './pages/admin/DoctorManagement';
import PatientManagement from './pages/admin/PatientManagement';
import StoriesManagement from './pages/admin/StoriesManagement';
import ActivityLogs from './pages/admin/ActivityLogs';
import AdminSettings from './pages/admin/AdminSettings';

// مكون الصفحة الرئيسية (Landing Page Assembly)
const Home = () => (
    <main className="overflow-hidden">
        <Navbar />
        <Hero />
        <DoctorSection />
        <Features />
        <RecoveryStories />
        <JourneyTimeline />
        <Footer />
    </main>
);

// مكون للصفحات التي لم تكتمل بعد
const Placeholder = ({ title }) => (
  <div className="p-10 text-center">
    <h2 className="text-2xl font-bold text-gray-400">{title} Page Coming Soon...</h2>
  </div>
);

export default function App() {
    
    // تفعيل الأنيميشن AOS
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        });
        AOS.refresh();
    }, []);

    return (
        // استخدمنا HashRouter عشان يشتغل على GitHub Pages بدون مشاكل
        <HashRouter>
            <div className="font-sans text-slate-900 antialiased bg-white">
                <Routes>
                    {/* ================= PUBLIC ROUTES ================= */}
                    <Route path="/" element={<Home />} />
                    
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/verify-code" element={<VerifyCode />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/password-changed" element={<PasswordChanged />} />

                    {/* ================= PATIENT DASHBOARD ================= */}
                    <Route path="/patient" element={<PatientLayout />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="records" element={<Records />} />
                        <Route path="risk" element={<RiskAssessment />} />
                        <Route path="qr" element={<QRCodePage />} />
                        <Route path="doctors" element={<DoctorList />} />
                        <Route path="book/:id" element={<BookingPage />} />
                        <Route path="payment" element={<PaymentPage />} />
                        <Route path="appointments" element={<Appointments />} />
                        <Route path="messages" element={<Messages />} />
                        <Route path="stories" element={<Stories />} />
                        <Route path="stories/:id" element={<StoryDetails />} />
                        <Route path="stories/new" element={<WriteStory />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>

                    {/* ================= DOCTOR DASHBOARD ================= */}
                    <Route path="/doctor" element={<DoctorLayout />}>
                        <Route path="dashboard" element={<DoctorDashboard />} />
                        <Route path="patients" element={<PatientList />} />
                        <Route path="patients/:id" element={<PatientDetails />} />
                        <Route path="appointments" element={<DoctorAppointments />} />
                        <Route path="reports" element={<Placeholder title="Reports" />} />
                        <Route path="messages" element={<DoctorMessages />} />
                        <Route path="stories" element={<PatientStories />} />
                        <Route path="settings" element={<DoctorSettings />} />
                    </Route>

                    {/* ================= ADMIN DASHBOARD ================= */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="doctors" element={<DoctorManagement />} />
                        <Route path="patients" element={<PatientManagement />} />
                        <Route path="stories" element={<StoriesManagement />} />
                        <Route path="logs" element={<ActivityLogs />} />
                        <Route path="settings" element={<AdminSettings />} />
                    </Route>

                    {/* صفحة 404 */}
                    <Route path="*" element={<div className="flex h-screen items-center justify-center text-xl font-bold">404 - Page Not Found</div>} />
                </Routes>
            </div>
        </HashRouter>
    );
}