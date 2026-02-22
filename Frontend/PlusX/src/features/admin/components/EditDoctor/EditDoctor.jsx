import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './EditDoctor.module.css';

/* ── Shared Components ── */
import { GenderToggle } from '../shared';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

/* ── React Icons ── */
import { LuUpload, LuUser } from 'react-icons/lu';
import { TbTrash } from "react-icons/tb";
import {
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineCalendarDays,
  HiOutlineLockClosed,
  HiOutlineMapPin,
  HiOutlineCurrencyDollar,
  HiOutlineExclamationCircle,
  HiMiniUserPlus,
  HiOutlineCheckCircle
} from 'react-icons/hi2';

/* ── Validation Schema ── */
const validationSchema = Yup.object({
  firstName:    Yup.string().required('First name is required'),
  lastName:     Yup.string().required('Last name is required'),
  email:        Yup.string().email('Invalid email format').required('Email is required'),
  phone:        Yup.string().required('Phone number is required'),
  dateOfBirth:  Yup.date().nullable().required('Date of birth is required'),
  password:     Yup.string().min(8, 'At least 8 characters'),
  location:     Yup.string().required('Location is required'),
  price:        Yup.number().positive('Must be positive').required('Required'),
  gender:       Yup.string().required('Gender is required'),
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

export default function EditDoctor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // محاكاة جلب البيانات من الباك إند
  useEffect(() => {
    // Mock Fetch Data — realistic doctors pool (matches DoctorManagement dummy data)
    const MOCK_DOCTORS = {
      1:  { firstName: 'Sarah',     lastName: 'Mitchell',  email: 'sarah.mitchell@pulsex.com',   phone: '+1 (212) 555-0101', dateOfBirth: new Date('1982-03-22'), location: 'New York, USA',       price: '300', gender: 'Female', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
      2:  { firstName: 'James',     lastName: 'Thornton',  email: 'james.thornton@pulsex.com',   phone: '+1 (310) 555-0182', dateOfBirth: new Date('1978-07-14'), location: 'Los Angeles, USA',    price: '450', gender: 'Male',   image: 'https://randomuser.me/api/portraits/men/32.jpg'   },
      3:  { firstName: 'Layla',     lastName: 'Hassan',    email: 'layla.hassan@pulsex.com',     phone: '+20 100 123 4567',  dateOfBirth: new Date('1990-11-05'), location: 'Cairo, Egypt',        price: '200', gender: 'Female', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
      4:  { firstName: 'Omar',      lastName: 'Khalil',    email: 'omar.khalil@pulsex.com',      phone: '+20 101 234 5678',  dateOfBirth: new Date('1985-02-18'), location: 'Alexandria, Egypt',   price: '350', gender: 'Male',   image: 'https://randomuser.me/api/portraits/men/75.jpg'   },
      5:  { firstName: 'Emily',     lastName: 'Carter',    email: 'emily.carter@pulsex.com',     phone: '+1 (713) 555-0133', dateOfBirth: new Date('1980-09-30'), location: 'Houston, USA',        price: '500', gender: 'Female', image: 'https://randomuser.me/api/portraits/women/21.jpg' },
      6:  { firstName: 'Ahmed',     lastName: 'Nasser',    email: 'ahmed.nasser@pulsex.com',     phone: '+20 112 345 6789',  dateOfBirth: new Date('1988-06-12'), location: 'Giza, Egypt',         price: '275', gender: 'Male',   image: 'https://randomuser.me/api/portraits/men/11.jpg'   },
      7:  { firstName: 'Nora',      lastName: 'Williams',  email: 'nora.williams@pulsex.com',    phone: '+44 20 7946 0958',  dateOfBirth: new Date('1984-01-25'), location: 'London, UK',          price: '400', gender: 'Female', image: 'https://randomuser.me/api/portraits/women/55.jpg' },
      8:  { firstName: 'Karim',     lastName: 'Farouk',    email: 'karim.farouk@pulsex.com',     phone: '+20 115 456 7890',  dateOfBirth: new Date('1987-04-08'), location: 'Cairo, Egypt',        price: '320', gender: 'Male',   image: 'https://randomuser.me/api/portraits/men/46.jpg'   },
      9:  { firstName: 'Mia',       lastName: 'Johnson',   email: 'mia.johnson@pulsex.com',      phone: '+1 (312) 555-0177', dateOfBirth: new Date('1991-08-17'), location: 'Chicago, USA',        price: '480', gender: 'Female', image: 'https://randomuser.me/api/portraits/women/33.jpg' },
      10: { firstName: 'Youssef',   lastName: 'Salem',     email: 'youssef.salem@pulsex.com',    phone: '+20 118 567 8901',  dateOfBirth: new Date('1983-12-03'), location: 'Mansoura, Egypt',     price: '230', gender: 'Male',   image: 'https://randomuser.me/api/portraits/men/60.jpg'   },
      40: { firstName: 'Sabry',     lastName: 'Al-Attar',  email: 'sabry.alattar@pulsex.com',    phone: '+20 122 987 6543',  dateOfBirth: new Date('1979-05-20'), location: 'Tanta, Egypt',        price: '295', gender: 'Male',   image: 'https://randomuser.me/api/portraits/men/56.jpg'   },
    };
    const doctorData = MOCK_DOCTORS[Number(id)] || {
      firstName: 'Michael', lastName: 'Chen',
      email: 'michael.chen@pulsex.com', phone: '+1 (415) 555-0190',
      dateOfBirth: new Date('1985-05-15'), location: 'San Francisco, USA',
      price: '500', gender: 'Male',
      image: `https://randomuser.me/api/portraits/men/${(Number(id) % 99) || 1}.jpg`,
    };
    formik.setValues({ ...doctorData, password: '' });
    setImagePreview(doctorData.image);
  }, [id]);

  const formik = useFormik({
    initialValues: {
      firstName: '', lastName: '', email: '', phone: '',
      dateOfBirth: null, password: '', location: '', price: '',
      gender: 'Male', image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Updating Doctor:', values);
      await new Promise((res) => setTimeout(res, 800)); // Mock delay
      navigate('/admin/doctor-management', {
        state: {
          success: true,
          title: 'Updated Successfully',
          message: 'Doctor details have been saved successfully.',
        },
      });
    },
  });

  const handleDeleteConfirm = async () => {
    console.log('Deleting Doctor ID:', id);
    setIsDeleteModalOpen(false);
    navigate('/admin/doctor-management', {
      state: {
        success: true,
        title: 'Deleted Successfully',
        message: 'Doctor has been removed from the platform.',
      },
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
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <HiMiniUserPlus className="text-white text-2xl" />
        </div>
        <div>
          <h1 className={styles.headerTitle}>Edit Doctor</h1>
          <p className={styles.headerSub}>View, edit, and manage all registered Doctors.</p>
        </div>
      </header>

      <form onSubmit={formik.handleSubmit}>
        <div className={styles.formBody}>
          {/* Upload Photo Section */}
          <div className={styles.uploadCol}>
            <p className={styles.uploadLabel}>Upload Photo</p>
            <label className={styles.uploadBox}>
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              {imagePreview ? (
                <img src={imagePreview} className={styles.previewImg} alt="Doctor" />
              ) : (
                <>
                  <div className={styles.uploadIconBox}><LuUpload className="text-blue-600 text-3xl" /></div>
                  <p className={styles.uploadTitle}>Click to upload photo</p>
                  <p className={styles.uploadHint}>PNG, JPG up to 10MB</p>
                </>
              )}
            </label>
          </div>

          {/* Personal Information */}
          <div className={styles.personalInfo}>
            <div className={styles.sectionHeading}>
              <LuUser className="text-blue-600 text-xl" />
              <span>Personal Information</span>
            </div>

            <div className={styles.gridInputs}>
              <InputField label="First Name" name="firstName" formik={formik} />
              <InputField label="Last Name" name="lastName" formik={formik} />
              <InputField label="Email Address" name="email" icon={HiOutlineEnvelope} formik={formik} />
              <InputField label="Phone Number" name="phone" icon={HiOutlinePhone} formik={formik} />
              
              <div className={styles.inputGroup}>
                <label className={styles.label}>Date of Birth <span className={styles.required}>*</span></label>
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

              <InputField label="Password" name="password" type="password" icon={HiOutlineLockClosed} formik={formik} />
              <InputField label="Location" name="location" icon={HiOutlineMapPin} formik={formik} />
              <InputField label="Consultation Price" name="price" type="number" icon={HiOutlineCurrencyDollar} formik={formik} />
            </div>

            <GenderToggle
              value={formik.values.gender}
              onChange={(val) => formik.setFieldValue('gender', val)}
              error={formik.touched.gender && formik.errors.gender}
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className={styles.footer}>
          <button type="button" className={styles.btnCancel} onClick={() => navigate('/admin/doctor-management')}>Cancel</button>
          <button type="button" className={styles.btnDelete} onClick={() => setIsDeleteModalOpen(true)}>
            <TbTrash className="text-lg" /> Delete Doctor
          </button>
          <button type="submit" className={styles.btnSave} disabled={formik.isSubmitting}>
            <HiOutlineCheckCircle className="text-lg" />
            {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Doctor?"
        desc="Are you sure you want to delete this user? This action is permanent and cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}