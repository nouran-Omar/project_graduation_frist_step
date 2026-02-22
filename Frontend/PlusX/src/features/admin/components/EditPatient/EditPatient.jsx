import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './EditPatient.module.css';

/* ── Shared Components ── */
import { GenderToggle } from '../shared';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

/* ── React Icons ── */
import { LuUpload, LuUser } from 'react-icons/lu';
import { TbTrash } from 'react-icons/tb';
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineCalendarDays,
  HiOutlineLockClosed,
  HiOutlineExclamationCircle,
  HiMiniUserPlus,
  HiOutlineCheckCircle,
} from 'react-icons/hi2';

/* ── Validation Schema ── */
const validationSchema = Yup.object({
  firstName:   Yup.string().required('First name is required'),
  lastName:    Yup.string().required('Last name is required'),
  email:       Yup.string().email('Invalid email format').required('Email is required'),
  phone:       Yup.string().required('Phone number is required'),
  dateOfBirth: Yup.date().nullable().required('Date of birth is required'),
  password:    Yup.string().min(8, 'At least 8 characters'),
  gender:      Yup.string().required('Gender is required'),
});

const FieldError = ({ msg }) =>
  msg ? (
    <span className={styles.errorText}>
      <HiOutlineExclamationCircle className={styles.errorIcon} />
      {msg}
    </span>
  ) : null;

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

export default function EditPatient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  /* ── Mock Data ── */
  useEffect(() => {
    const mockData = {
      firstName: 'Nouran',
      lastName:  'Mahdy',
      email:     'patient@pulsex.com',
      phone:     '+20 1100000000',
      dateOfBirth: new Date('1995-05-20'),
      gender:    'Female',
      image:     'https://placehold.co/150x150',
    };
    formik.setValues({ ...mockData, password: 'password123' });
    setImagePreview(mockData.image);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const formik = useFormik({
    initialValues: {
      firstName: '', lastName: '', email: '', phone: '',
      dateOfBirth: null, password: '', gender: 'Female', image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Updating Patient:', values);
      await new Promise((res) => setTimeout(res, 800));
      navigate('/admin/patient-management', {
        state: { success: true, title: 'Updated Successfully', message: 'Patient details have been updated.' },
      });
    },
  });

  const handleDeleteConfirm = async () => {
    console.log('Deleting Patient ID:', id);
    setIsDeleteModalOpen(false);
    navigate('/admin/patient-management', {
      state: { success: true, title: 'Deleted Successfully', message: 'Patient has been removed.' },
    });
  };

  const handleImageChange = (e) => {
    const file = e.currentTarget.files[0];
    if (!file) return;
    formik.setFieldValue('image', file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <div className={styles.container}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <HiMiniUserPlus className="text-white text-2xl" />
        </div>
        <div>
          <h1 className={styles.headerTitle}>Edit Patient</h1>
          <p className={styles.headerSub}>View, edit, and manage all registered Patients.</p>
        </div>
      </header>

      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formBody}>

          {/* ── Upload Photo ── */}
          <div className={styles.uploadCol}>
            <p className={styles.uploadLabel}>Upload Photo</p>
            <label className={styles.uploadBox}>
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              {imagePreview ? (
                <img src={imagePreview} className={styles.previewImg} alt="Patient" />
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
              <InputField label="First Name"    name="firstName"   formik={formik} placeholder="Enter first name" />
              <InputField label="Last Name"     name="lastName"    formik={formik} placeholder="Enter last name" />
              <InputField label="Email Address" name="email"       formik={formik} placeholder="patient@pulsex.com" icon={HiOutlineEnvelope} />
              <InputField label="Phone Number"  name="phone"       formik={formik} placeholder="+20 1000000000"    icon={HiOutlinePhone} />

              {/* Date of Birth */}
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Date of Birth <span className={styles.required}>*</span>
                </label>
                <div className={`${styles.inputWrapper} ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? styles.inputError : ''}`}>
                  <HiOutlineCalendarDays className={styles.inputIcon} />
                  <DatePicker
                    selected={formik.values.dateOfBirth}
                    onChange={(date) => formik.setFieldValue('dateOfBirth', date)}
                    className={styles.inputField}
                    placeholderText="Select date"
                    dateFormat="MMM dd, yyyy"
                  />
                </div>
                <FieldError msg={formik.touched.dateOfBirth && formik.errors.dateOfBirth ? formik.errors.dateOfBirth : ''} />
              </div>

              <InputField label="Password" name="password" type="password" formik={formik} placeholder="Create a strong password" icon={HiOutlineLockClosed} />
            </div>

            <GenderToggle
              value={formik.values.gender}
              onChange={(val) => formik.setFieldValue('gender', val)}
              error={formik.touched.gender && formik.errors.gender}
            />
          </div>
        </div>

        {/* ── Footer Actions ── */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnCancel} onClick={() => navigate('/admin/patient-management')}>
            Cancel
          </button>
          <button type="button" className={styles.btnDelete} onClick={() => setIsDeleteModalOpen(true)}>
            <TbTrash className="text-lg" /> Delete Patient
          </button>
          <button type="submit" className={styles.btnSave} disabled={formik.isSubmitting}>
            <HiOutlineCheckCircle className="text-lg" />
            {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* ── Confirm Delete Modal ── */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Patient?"
        desc="Are you sure you want to delete this patient? This action is permanent and cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
