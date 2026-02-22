import React, { useState, useRef } from 'react';
import { 
  LuUser, LuSettings, LuLock, LuBell, LuMoon, 
  LuMail, LuPhone, LuCalendar, LuMapPin, LuCheck,
  LuEye, LuEyeOff, LuShieldCheck
} from "react-icons/lu";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { GenderToggle } from '../shared';
import Toast from '../../../../components/Toast/Toast';

/* ─────────────────────────────────────────────────────────
   Password requirements checker
───────────────────────────────────────────────────────── */
function checkReqs(val) {
  return {
    length:  val.length >= 8,
    mixed:   /[a-z]/.test(val) && /[A-Z]/.test(val),
    number:  /\d/.test(val),
  };
}

export default function SettingsProfile() {
  /* ── Toast ── */
  const [toast, setToast] = useState({ visible: false, title: '', msg: '' });
  const showToast = (title, msg) => {
    setToast({ visible: true, title, msg });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 3500);
  };

  /* ── Profile photo ── */
  const fileRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto(url);
    showToast('Photo Updated', 'Your profile photo has been changed successfully.');
  };

  /* ── Personal info form ── */
  const [form, setForm] = useState({
    firstName: 'Tayem',
    lastName: 'Zayed',
    email: 'Mohamed.salem@pulsex.com',
    phone: '+20 1234567890',
    dob: '1985-06-15',
    location: 'Cairo, Egypt',
    gender: 'male',
  });
  const handleField = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const handleSaveProfile = () => showToast('Saved Successfully', 'Your changes have been saved successfully.');

  /* ── Change Password modal ── */
  const [pwModal, setPwModal]   = useState(false);
  const [showPw, setShowPw]     = useState({ current: false, newPw: false, confirm: false });
  const [pwForm, setPwForm]     = useState({ current: '', newPw: '', confirm: '' });
  const [pwError, setPwError]   = useState('');
  const reqs = checkReqs(pwForm.newPw);

  const handleSavePassword = () => {
    if (!pwForm.current) { setPwError('Please enter your current password.'); return; }
    if (!reqs.length || !reqs.mixed || !reqs.number) { setPwError('New password does not meet requirements.'); return; }
    if (pwForm.newPw !== pwForm.confirm) { setPwError('Passwords do not match.'); return; }
    setPwModal(false);
    setPwForm({ current: '', newPw: '', confirm: '' });
    setPwError('');
    showToast('Password Changed Successfully', 'Your changes have been saved successfully.');
  };

  /* ── Toggles ── */
  const [emailNotif, setEmailNotif] = useState(true);
  const [darkMode,   setDarkMode]   = useState(false);

  /* ─────────── render ─────────── */
  return (
    <div className="p-10 bg-[#f9fafb] min-h-screen relative">

      {/* ══ Toast ══════════════════════════════════════════════ */}
      <Toast
        visible={toast.visible}
        title={toast.title}
        message={toast.msg}
        type="success"
        onClose={() => setToast(t => ({ ...t, visible: false }))}
      />

      {/* ══ Page heading ══════════════════════════════════════ */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold flex items-center gap-3 text-[#010218]">
          <HiOutlineCog6Tooth className="text-gray-600" /> Settings &amp; Profile
        </h1>
        <p className="text-gray-500 mt-1 text-base">Manage your personal details, health data, and account preferences.</p>
      </div>

      {/* ══ Personal Information card ══════════════════════════ */}
      <div className="bg-white rounded-[28px] border border-gray-200 shadow-sm mb-8 overflow-hidden">

        {/* card header */}
      <div 
  className="flex items-center gap-2 px-6 py-4 border-b border-[#E5E7EB]" 
  style={{
    background: 'linear-gradient(to right, #EFF6FF, #EEF2FF)'
  }}
>
  <LuUser size={20} className="text-[#155DFC]" />
  <span className="text-[#101828] text-lg font-bold">Personal Information</span>
</div>

        <div className="p-8">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-32 h-32 rounded-3xl overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors relative group"
                onClick={() => fileRef.current.click()}
              >
                <img
                  src={photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(form.firstName + ' ' + form.lastName)}&background=333CF5&color=fff`}
                  className="w-full h-full object-cover"
                  alt="Profile"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">Change</span>
                </div>
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              <span className="text-[10px] text-gray-400 text-center w-32">JPG, PNG or GIF<br />Max size 5MB</span>
            </div>

            {/* Form grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
<InputField 
  label={<>First Name <span className="text-red-500 text-sm font-bold font-['inter']">*</span></>} 
  icon={<LuUser />} 
  value={form.firstName} 
  onChange={v => handleField('firstName', v)} 
/>

<InputField 
  label={<>Last Name <span className="text-red-500 text-sm font-bold font-['inter']">*</span></>} 
  icon={<LuUser />} 
  value={form.lastName} 
  onChange={v => handleField('lastName', v)} 
/>

<InputField 
  label={<>Email Address <span className="text-red-500 text-sm font-bold font-['inter']">*</span></>} 
  icon={<LuMail />} 
  value={form.email} 
  onChange={v => handleField('email', v)} 
/>

<InputField 
  label={<>Phone Number <span className="text-red-500 text-sm font-bold font-['inter']">*</span></>} 
  icon={<LuPhone />} 
  value={form.phone} 
  onChange={v => handleField('phone', v)} 
/>

<InputField 
  label={<>Date of Birth <span className="text-red-500 text-sm font-bold font-['inter']">*</span></>} 
  icon={<LuCalendar />} 
  value={form.dob} 
  onChange={v => handleField('dob', v)} 
/>

<InputField 
  label={<>Location <span className="text-red-500 text-sm font-bold font-['inter']">*</span></>} 
  icon={<LuMapPin />} 
  value={form.location} 
  onChange={v => handleField('location', v)} 
/>
           <div  className="mt-2">
            <GenderToggle
              value={form.gender === 'male' ? 'Male' : 'Female'}
              onChange={(val) => handleField('gender', val.toLowerCase())}
            />
          </div> </div>
          </div>

          {/* Gender */}
          

          {/* Save button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSaveProfile}
              className="bg-[#333CF5] hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-colors"
            >
              <LuCheck /> Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* ══ Account Settings card ══════════════════════════════ */}
      <div className="bg-white rounded-[28px] border border-gray-200 shadow-sm overflow-hidden">

        {/* card header */}
       <div 
  className="flex items-center gap-2 px-6 py-4 border-b border-[#E5E7EB] rounded-t-2xl" 
  style={{
    background: 'linear-gradient(to right, #FFF7ED, #FEF2F2)'
  }}
>
  <HiOutlineCog6Tooth size={20} className="text-[#F54900]" />
  <span className="text-[#101828] text-lg font-bold">Account Settings</span>
</div>

        <div className="p-8 space-y-0 divide-y divide-gray-50">
          <SettingRow
            icon={<LuLock />}
            title="Change Password"
            desc="Update your password regularly for security"
            action={
              <button
                onClick={() => { setPwError(''); setPwModal(true); }}
                className="text-blue-600 font-bold text-sm hover:underline"
              >
                Change
              </button>
            }
          />
          <SettingRow
            icon={<LuBell />}
            title="Email Notifications"
            desc="Receive email updates about your account"
            action={<Toggle checked={emailNotif} onChange={() => setEmailNotif(v => !v)} />}
          />
          <SettingRow
            icon={<LuMoon />}
            title="Dark Mode"
            desc="Switch to dark theme"
            action={<Toggle checked={darkMode} onChange={() => setDarkMode(v => !v)} />}
          />
        </div>
      </div>

      {/* ══ Change Password Modal ══════════════════════════════ */}
      {pwModal && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(2px)' }}
          onClick={e => { if (e.target === e.currentTarget) setPwModal(false); }}
        >
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8 relative" style={{ animation: 'slideIn .3s ease' }}>

            {/* close */}
            <button
              onClick={() => setPwModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold transition-colors"
            >
              ✕
            </button>

            {/* heading */}
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Change Password</h2>
            <p className="text-gray-500 text-sm mb-6">Update your password securely</p>

            {/* error */}
            {pwError && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                {pwError}
              </div>
            )}

            {/* Current Password */}
            <PasswordField
              label="Current Password"
              placeholder="Enter current password"
              value={pwForm.current}
              show={showPw.current}
              onToggle={() => setShowPw(s => ({ ...s, current: !s.current }))}
              onChange={v => setPwForm(f => ({ ...f, current: v }))}
            />

            {/* New Password */}
            <PasswordField
              label="New Password"
              placeholder="Enter new password"
              value={pwForm.newPw}
              show={showPw.newPw}
              onToggle={() => setShowPw(s => ({ ...s, newPw: !s.newPw }))}
              onChange={v => setPwForm(f => ({ ...f, newPw: v }))}
            />

            {/* Confirm New Password */}
            <PasswordField
              label="Confirm New Password"
              placeholder="Confirm new password"
              value={pwForm.confirm}
              show={showPw.confirm}
              onToggle={() => setShowPw(s => ({ ...s, confirm: !s.confirm }))}
              onChange={v => setPwForm(f => ({ ...f, confirm: v }))}
            />

            {/* Requirements */}
            <div className="mt-4 mb-6 bg-gray-50 rounded-2xl p-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Password Requirements:</p>
              <ul className="space-y-1">
                <ReqItem met={reqs.length} text="At least 8 characters long" />
                <ReqItem met={reqs.mixed}  text="Contains uppercase and lowercase letters" />
                <ReqItem met={reqs.number} text="Contains at least one number" />
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setPwModal(false)}
                className="flex-1 py-3 rounded-2xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePassword}
                className="flex-1 py-3 rounded-2xl bg-[#333CF5] text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
              >
                <LuShieldCheck size={18} /> Save Password
              </button>
            </div>

          </div>
        </div>
      )}

      <style>{`@keyframes slideIn { from { transform: translateY(-20px) scale(.97); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }`}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────────────────── */

function InputField({ label, icon, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-bold text-gray-700">{label}</label>
      <div className="flex items-center bg-[#f9fafb] border border-gray-200 rounded-2xl px-4 py-3 gap-3 focus-within:border-blue-400 transition-colors">
        <span className="text-gray-400 shrink-0">{icon}</span>
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="bg-transparent outline-none w-full text-sm text-gray-800"
        />
      </div>
    </div>
  );
}

function PasswordField({ label, placeholder, value, show, onToggle, onChange }) {
  return (
    <div className="mb-4">
      <label className="text-sm font-bold text-gray-700 mb-1.5 block">{label}</label>
      <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-4 py-3 gap-3 focus-within:border-blue-400 transition-colors">
        <LuLock size={16} className="text-gray-400 shrink-0" />
        <input
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="outline-none w-full text-sm text-gray-800 bg-transparent"
        />
        <button type="button" onClick={onToggle} className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
          {show ? <LuEyeOff size={16} /> : <LuEye size={16} />}
        </button>
      </div>
    </div>
  );
}

function ReqItem({ met, text }) {
  return (
    <li className={`flex items-center gap-2 text-xs ${met ? 'text-green-600' : 'text-gray-400'}`}>
      <LuCheck size={13} className={met ? 'text-green-500' : 'text-gray-300'} />
      {text}
    </li>
  );
}

function SettingRow({ icon, title, desc, action }) {
  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex items-center gap-4">
        <div className="text-gray-400 text-xl shrink-0">{icon}</div>
        <div>
          <h4 className="font-bold text-[15px] text-gray-900">{title}</h4>
          <p className="text-gray-400 text-xs mt-0.5">{desc}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />
    </label>
  );
}

