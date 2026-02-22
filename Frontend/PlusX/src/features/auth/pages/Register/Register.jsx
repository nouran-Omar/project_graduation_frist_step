import React from 'react';
import { useFormik } from 'formik';
import { registerSchema } from '../../../../schemas/registerSchema';
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TbLogin2 } from "react-icons/tb";
import { FaUserGroup } from "react-icons/fa6";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiGroupLine } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HiOutlineDocumentText } from "react-icons/hi2";
import styles from '../../../../pages/Regester/Register.module.css';
import Logo from "/logo/logo.svg";

const Register = () => {
  const navigate = useNavigate();

  // خيارات التاريخ
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const yearOptions = years.map(y => ({ value: y, label: y.toString() }));
  const monthOptions = months.map((m, i) => ({ value: i, label: m }));

  // ستايل Select المخصص
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: '34px',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      fontSize: '13px',
      fontWeight: '700',
      minWidth: '110px',
      boxShadow: 'none',
      cursor: 'pointer',
      '&:hover': { borderColor: '#333CF5' }
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: isSelected ? '#333CF5' : isFocused ? '#F1F5F9' : 'white',
      color: isSelected ? 'white' : '#010218',
      cursor: 'pointer',
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  const formik = useFormik({
    initialValues: { 
      firstName: '', 
      lastName: '', 
      email: '', 
      password: '', 
      phone: '', 
      dateOfBirth: null, 
      gender: '', 
      acceptTerms: false 
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      const payload = { 
        ...values, 
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString().split('T')[0] : null 
      };
      console.log("Form Submitted Successfully:", payload);
      navigate('/login');
    },
  });

  return (
    <div className={styles.pageWrapper}>
      <nav className={styles.navbar}>
        <div className={styles.logoArea}><img src={Logo} alt="PulseX" /><span>PulseX</span></div>
      </nav>

      <div className={styles.mainContainer}>
        <header className={styles.pageHeader}>
          <h1>Create Your Patient Account</h1>
          <p>Join thousands of patients who trust PulseX Portal for their healthcare needs.</p>
        </header>

        <div className={styles.formBox}>
          <div className={styles.formTitle}>
            <h3>Personal Information</h3>
            <p>Please provide your basic contact information</p>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className={styles.inputsGrid}>
              {[
                { label: 'First Name', name: 'firstName', placeholder: 'Enter your first name' },
                { label: 'Last Name', name: 'lastName', placeholder: 'Enter your last name' },
                { label: 'Email Address', name: 'email', placeholder: 'Enter your Email Address' },
                { label: 'Password', name: 'password', placeholder: 'Create a strong password', type: 'password' },
                { label: 'Phone Number', name: 'phone', placeholder: '+20 1000000000' }
              ].map((f) => (
                <div key={f.name} className={styles.inputGroup}>
                  <label>{f.label} <span>*</span></label>
                  <input 
                    {...formik.getFieldProps(f.name)} 
                    type={f.type || 'text'} 
                    placeholder={f.placeholder}
                    className={formik.touched[f.name] && formik.errors[f.name] ? styles.inputError : ''} 
                  />
                  {/* عرض الخطأ بالأيقونة من السكيما */}
                  {formik.touched[f.name] && formik.errors[f.name]}
                </div>
              ))}

              <div className={styles.inputGroup}>
                <label>Date of Birth <span>*</span></label>
                <div className={styles.dateWrapper}>
                  <CiCalendar className={styles.calendarIcon} />
                  <DatePicker
                    selected={formik.values.dateOfBirth}
                    onChange={(date) => formik.setFieldValue('dateOfBirth', date)}
                    onBlur={() => formik.setFieldTouched('dateOfBirth', true)}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="mm/dd/yyyy"
                    className={`${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? styles.inputError : ''} ${styles.dateInputWithPadding}`}
                    renderCustomHeader={({ date, changeYear, changeMonth, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
                      <div className={styles.customHeader}>
                        <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}><IoIosArrowBack/></button>
                        <div className="flex gap-2 items-center bg-gray-50 p-1 rounded-2xl border border-gray-100">
                          <Select
                            styles={customSelectStyles}
                            options={monthOptions}
                            value={monthOptions[date.getMonth()]}
                            onChange={(opt) => changeMonth(opt.value)}
                            isSearchable={false}
                            menuPortalTarget={document.body}
                          />
                          <Select
                            styles={customSelectStyles}
                            options={yearOptions}
                            value={yearOptions.find(y => y.value === date.getFullYear())}
                            onChange={(opt) => changeYear(opt.value)}
                            menuPortalTarget={document.body}
                          />
                        </div>
                        <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}><IoIosArrowForward/></button>
                      </div>
                    )}
                  />
                </div>
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth}
              </div>
            </div>

            {/* Gender Section */}
            <div className={styles.genderSection}>
              <label className={styles.inputGroup + " label"}>Gender <span className='text-red-500'>*</span></label>
              <div className={styles.genderOptions}>
                {['Male', 'Female'].map((g) => (
                  <label key={g} className={formik.values.gender === g ? styles.genderActive : ''}>
                    <input 
                      type="radio" 
                      className="hidden" 
                      name="gender" 
                      onChange={() => formik.setFieldValue('gender', g)} 
                      checked={formik.values.gender === g} 
                    />
                    <div className={`w-4 h-4 rounded-full border-4 ${formik.values.gender === g ? 'border-[#333CF5] bg-white' : 'border-gray-300'}`} />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
              {formik.touched.gender && formik.errors.gender}
            </div>

            {/* Terms Section */}
            <div className={styles.termsSection}>
              <div className="flex items-center gap-2 text-[#010218] font-bold text-[16px] mb-4">
                <HiOutlineDocumentText className="text-[#333CF5] text-xl"/> Terms & Consent <span className='text-red-400'>*</span>
              </div>
              <div className={styles.checkboxGroup}>
                <input 
                  type="checkbox" 
                  {...formik.getFieldProps('acceptTerms')} 
                  checked={formik.values.acceptTerms}
                />
                <div>
                  <p className="text-[14px] text-[#010218] font-medium">I agree to the <span className="text-[#333CF5] underline cursor-pointer">Terms of Service and Privacy Policy</span></p>
                  <p className="text-[13px] text-[#757575] mt-1">By checking this box, you agree to our terms and conditions</p>
                </div>
              </div>
              {formik.touched.acceptTerms && formik.errors.acceptTerms}
            </div>

            <button type="submit" className={styles.submitBtn}>
              Create Account
            </button>
          </form>

          <div className={styles.alreadyHaveAccount}>
            <p className="flex items-center justify-center gap-2 font-semibold text-[#0F172A]">
              <FaUserGroup className="text-[#333CF5] text-xl" /> 
              Already have an account?
            </p>
            <p className="text-[13px] text-[#64748B] mt-2 mb-6 text-center">If you're an existing patient, sign in to access your records.</p>
            <Link to="/login" className={styles.signInBtn}>
              Sign In to Existing Account <TbLogin2 />
            </Link>
          </div>
        </div>

        <footer className={styles.footerFeatures}>
          <div className={styles.featureItem}>
            <div className={styles.iconBlue}><RiGroupLine/></div>
            <h4>Expert Care Team</h4>
            <p>Connect with board-certified physicians and specialists.</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.iconGreen}><CiCalendar/></div>
            <h4>Easy Scheduling</h4>
            <p>Book appointments 24/7 with our online system.</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.iconOrange}><IoDocumentTextSharp/></div>
            <h4>Digital Records</h4>
            <p>Access your medical history anytime, anywhere.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Register;