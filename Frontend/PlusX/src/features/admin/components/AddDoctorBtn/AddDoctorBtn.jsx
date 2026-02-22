import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import axios from 'axios'; // TODO: uncomment when API is ready
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './AddDoctorBtn.module.css';

/* ── Shared Components ── */
import { GenderToggle } from '../shared';

/* ── React Icons ── */
import { LuUpload, LuUser } from 'react-icons/lu';
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineCalendarDays,
  HiOutlineLockClosed,
  HiOutlineMapPin,
  HiOutlineCurrencyDollar,
  HiOutlineExclamationCircle,
  HiMiniUserPlus,
} from 'react-icons/hi2';

/* ── Validation Schema ── */
const validationSchema = Yup.object({
  firstName:   Yup.string().required('First name is required'),
  lastName:    Yup.string().required('Last name is required'),
  email:       Yup.string().email('Invalid email format').required('Email is required'),
  phone:       Yup.string().matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number').required('Phone number is required'),
  dateOfBirth: Yup.date().nullable().required('Date of birth is required'),
  password:    Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  location:    Yup.string().required('Location is required'),
  price:       Yup.number().typeError('Must be a number').positive('Must be positive').required('Consultation price is required'),
  gender:      Yup.string().required('Gender is required'),
});

/* ── Error message sub-component ── */
const FieldError = ({ msg }) =>
  msg ? (
    <span className={styles.errorText}>
      <HiOutlineExclamationCircle className={styles.errorIcon} />
      {msg}
    </span>
  ) : null;

/* ── Reusable InputField ── */
const InputField = ({ label, name, type = 'text', formik, placeholder, icon: Icon }) => {
  const hasError = formik.touched[name] && formik.errors[name];
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label}>
        {label} <span className={styles.required}>*</span>
      </label>
      <div className={`${styles.inputWrapper} ${hasError ? styles.inputError : ''}`}>
        {Icon && <Icon className={styles.inputIcon} />}
        <input
          type={type}
          className={`${styles.inputField} ${Icon ? styles.inputWithIcon : ''}`}
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
        />
      </div>
      <FieldError msg={hasError ? formik.errors[name] : ''} />
    </div>
  );
};

/* ════════════════════════════════════════════════
   AddDoctorBtn — Main Component
════════════════════════════════════════════════ */
export default function AddDoctorBtn() {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: '', lastName: '', email: '', phone: '',
      dateOfBirth: null, password: '', location: '', price: '',
      gender: 'Male', image: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        /* ── TODO: Replace mock with real API call when backend is ready ──
        const formData = new FormData();
        Object.entries(values).forEach(([k, v]) => {
          if (v !== null && v !== undefined) {
            formData.append(k, k === 'dateOfBirth' && v instanceof Date
              ? v.toISOString().split('T')[0]
              : v);
          }
        });
        const token = localStorage.getItem('token');
        await axios.post('/api/doctors/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        ── END TODO ── */

        // Mock: simulate network delay
        await new Promise((res) => setTimeout(res, 800));

        navigate('/admin/doctor-management', { state: { success: true } });
      } catch (err) {
        console.error('Error adding doctor:', err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (!file) return;
    formik.setFieldValue('image', file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className={styles.container}>

      {/* ══ Header ══════════════════════════════════════════ */}
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <HiMiniUserPlus className="text-white text-2xl" />
        </div>
        <div>
          <h1 className={styles.headerTitle}>Add New Doctor</h1>
          <p className={styles.headerSub}>View, edit, and manage all registered Doctors.</p>
        </div>
      </header>

      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formBody}>

          {/* ── Upload Photo ── */}
          <div className={styles.uploadCol}>
            <p className={styles.uploadLabel}>Upload Photo</p>
            <label className={styles.uploadBox}>
              <input type="file" accept="image/png,image/jpeg" hidden onChange={handleImageChange} />
              {imagePreview ? (
                <img src={imagePreview} className={styles.previewImg} alt="Doctor preview" />
              ) : (
                <>
                  <div className={styles.uploadIconBox}>
                    <LuUpload className="text-blue-600 text-3xl" />
                  </div>
                  <p className={styles.uploadTitle}>Click to upload photo</p>
                  <p className={styles.uploadHint}>PNG, JPG up to 10MB</p>
                </>
              )}
            </label>
          </div>

          {/* ── Personal Information ── */}
          <div className={styles.personalInfo}>
            <div className={styles.sectionHeading}>
              <LuUser className="text-blue-600 text-xl" />
              <span>Personal Information</span>
            </div>

            <div className={styles.gridInputs}>
              <InputField label="First Name"  name="firstName" formik={formik} placeholder="Enter first name" />
              <InputField label="Last Name"   name="lastName"  formik={formik} placeholder="Enter last name" />
              <InputField label="Email Address" name="email" type="email" formik={formik} placeholder="doctor@pulsex.com" icon={HiOutlineEnvelope} />
              <InputField label="Phone Number"  name="phone" formik={formik} placeholder="+20 1000000000" icon={HiOutlinePhone} />

              {/* Date of Birth — react-datepicker */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Date of Birth <span className={styles.required}>*</span>
                </label>
                <div className={`${styles.inputWrapper} ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? styles.inputError : ''}`}>
                  <HiOutlineCalendarDays className={styles.inputIcon} />
                  <DatePicker
                    selected={formik.values.dateOfBirth}
                    onChange={(date) => formik.setFieldValue('dateOfBirth', date)}
                    onBlur={() => formik.setFieldTouched('dateOfBirth', true)}
                    placeholderText="Select date"
                    dateFormat="MMM dd, yyyy"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={80}
                    maxDate={new Date()}
                    className={`${styles.inputField} ${styles.inputWithIcon}`}
                    wrapperClassName={styles.datePickerWrapper}
                  />
                </div>
                <FieldError msg={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? formik.errors.dateOfBirth : ''} />
              </div>

              <InputField label="Password" name="password" type="password" formik={formik} placeholder="Create a strong password" icon={HiOutlineLockClosed} />
              <InputField label="Location" name="location" formik={formik} placeholder="Enter doctor location" icon={HiOutlineMapPin} />
              <InputField label="Consultation Price" name="price" type="number" formik={formik} placeholder="Enter consultation price" icon={HiOutlineCurrencyDollar} />
            </div>

            {/* Gender — shared reusable component */}
            <GenderToggle
              value={formik.values.gender}
              onChange={(val) => formik.setFieldValue('gender', val)}
              error={formik.touched.gender && formik.errors.gender ? formik.errors.gender : ''}
            />
          </div>
        </div>

        {/* ══ Footer Buttons ══════════════════════════════ */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={() => navigate('/admin/doctor-management')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={styles.btnSubmit}
            disabled={formik.isSubmitting}
          >
            <HiMiniUserPlus className="text-lg" />
            {formik.isSubmitting ? 'Creating...' : 'Create Doctor'}
          </button>
        </div>
      </form>
    </div>
  );
}
