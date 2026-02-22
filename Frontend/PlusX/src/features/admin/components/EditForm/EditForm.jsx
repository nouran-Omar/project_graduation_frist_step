import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  LuUpload, LuUser, LuMail, LuPhone, LuCalendar, 
  LuMapPin, LuDollarSign, LuLock, LuCheck, LuTrash2 
} from "react-icons/lu";
import styles from './EditForm.module.css';

export default function EditForm({ title, initialData, onSave, onDelete, type }) {
  
  const formik = useFormik({
    initialValues: initialData || {
      firstName: '', lastName: '', email: '', phone: '', 
      dob: '', password: '', location: '', price: '', gender: 'female'
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
    }),
    onSubmit: (values) => onSave(values),
  });

  return (
    <div className={styles.container}>
      {/* هيدر أصغر ومضغوط */}
      <div className={styles.topHeader}>
        <div className={styles.headerIcon}><LuUser /></div>
        <div className={styles.headerInfo}>
          <h2>{title}</h2>
          <p>Manage registered {type}s details.</p>
        </div>
      </div>

      <div className={styles.layoutBody}>
        {/* قسم رفع الصورة */}
        <aside className={styles.photoSidebar}>
          <label className={styles.fieldLabel}>Profile Photo</label>
          <div className={styles.uploadBox}>
            <div className={styles.uploadCircle}><LuUpload /></div>
            <strong>Upload Photo</strong>
            <span>Max 5MB</span>
          </div>
        </aside>

        {/* كارت المعلومات */}
        <form className={styles.formCard} onSubmit={formik.handleSubmit}>
          <div className={styles.infoTitle}><LuUser /> Personal Information</div>
          
          <div className={styles.formGrid}>
            <div className={styles.inputCell}>
              <label>First Name <span className={styles.req}>*</span></label>
              <input name="firstName" {...formik.getFieldProps('firstName')} placeholder="First name" />
            </div>
            <div className={styles.inputCell}>
              <label>Last Name <span className={styles.req}>*</span></label>
              <input name="lastName" {...formik.getFieldProps('lastName')} placeholder="Last name" />
            </div>
            <div className={styles.inputCell}>
              <label>Email Address <span className={styles.req}>*</span></label>
              <div className={styles.iconBox}><LuMail /><input name="email" {...formik.getFieldProps('email')} /></div>
            </div>
            <div className={styles.inputCell}>
              <label>Phone Number <span className={styles.req}>*</span></label>
              <div className={styles.iconBox}><LuPhone /><input name="phone" {...formik.getFieldProps('phone')} /></div>
            </div>
            <div className={styles.inputCell}>
              <label>Date of Birth <span className={styles.req}>*</span></label>
              <div className={styles.iconBox}><LuCalendar /><input type="date" name="dob" {...formik.getFieldProps('dob')} /></div>
            </div>
            <div className={styles.inputCell}>
              <label>Location <span className={styles.req}>*</span></label>
              <div className={styles.iconBox}><LuMapPin /><input name="location" {...formik.getFieldProps('location')} /></div>
            </div>
          </div>

          <div className={styles.genderSection}>
            <label>Gender <span className={styles.req}>*</span></label>
            <div className={styles.radioGroup}>
               <label className={formik.values.gender === 'male' ? styles.maleActive : styles.radioLabel}>
                 <input type="radio" name="gender" value="male" onChange={formik.handleChange} checked={formik.values.gender === 'male'} /> Male
               </label>
               <label className={formik.values.gender === 'female' ? styles.femaleActive : styles.radioLabel}>
                 <input type="radio" name="gender" value="female" onChange={formik.handleChange} checked={formik.values.gender === 'female'} /> Female
               </label>
            </div>
          </div>
        </form>
      </div>

      {/* أزرار التحكم السفلية */}
      <div className={styles.formActions}>
        <button type="button" className={styles.cancelBtn}>Cancel</button>
        <button type="button" className={styles.deleteBtn} onClick={onDelete}><LuTrash2 /> Delete</button>
        <button type="submit" className={styles.saveBtn} onClick={formik.handleSubmit}><LuCheck /> Save Changes</button>
      </div>
    </div>
  );
}
