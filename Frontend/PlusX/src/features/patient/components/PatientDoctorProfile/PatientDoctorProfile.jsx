import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './PatientDoctorProfile.module.css';
import { HiStar, HiOutlineLocationMarker, HiOutlineBriefcase, HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineAttachMoney, MdOutlineMessage } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa6";

const PatientDoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // البيانات دي هتجيلك من الباك إند عن طريق الـ id
  const doctor = {
    name: "Dr. Walid Ali",
    title: "Specialist Doctor - Cardiology",
    rate: 4.9,
    reviews: 127,
    price: 200,
    location: "Cairo, Egypt",
    patients: "500+",
    experience: "10+ Years",
    about: "Dr. Walid Ali is a highly experienced cardiologist with over a decade of practice in cardiovascular medicine. He specializes in preventive cardiology, heart disease management, and interventional procedures.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80"
  };

  return (
    <div className={styles.mainContainer}>
      {/* Hero Section - Blue Gradient */}
      <div className={styles.heroSection}>
        <img src={doctor.img} alt={doctor.name} className={styles.mainAvatar} />
        <div className={styles.heroContent}>
          <h1 className={styles.docName}>{doctor.name}</h1>
          <p className={styles.docTitle}>{doctor.title}</p>
          <div className={styles.ratingBadge}>
            <HiStar className="text-yellow-400" /> {doctor.rate} • {doctor.reviews} reviews
          </div>
        </div>
        <div className={styles.heroActions}>
          <button className={styles.bookBtn} onClick={() => navigate(`/patient/booking/${id}`)}>
            Book Appointment
          </button>
          <button className={styles.msgBtn} disabled title="Messages coming soon">
            <MdOutlineMessage /> Message Now
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className={styles.statsRow}>
        <StatItem icon={<MdOutlineAttachMoney />} label="Price" value={`$${doctor.price} / session`} color="bg-green-100 text-green-600" />
        <StatItem icon={<HiOutlineLocationMarker />} label="Location" value={doctor.location} color="bg-blue-100 text-blue-600" />
        <StatItem icon={<HiOutlineUserGroup />} label="Patients" value={doctor.patients} color="bg-purple-100 text-purple-600" />
        <StatItem icon={<HiOutlineBriefcase />} label="Experience" value={doctor.experience} color="bg-orange-100 text-orange-600" />
      </div>

      {/* Details Section */}
      <div className={styles.detailsContent}>
        <section className={styles.section}>
          <h2>About {doctor.name}</h2>
          <p>{doctor.about}</p>
        </section>

        <section className={styles.section}>
          <h2>Professional Experience</h2>
          <div className={styles.timeline}>
            <ExperienceItem 
              title="Senior Cardiologist" 
              place="Cairo Heart Institute • 2018 - Present" 
              desc="Leading cardiology department, specializing in complex interventional procedures." 
            />
            <ExperienceItem 
              title="Medical Degree & Specialization" 
              place="Cairo University • 2008 - 2014" 
              desc="M.D. in internal Medicine with specialization in Cardiovascular Diseases." 
            />
          </div>
        </section>
      </div>
    </div>
  );
};

// مكونات فرعية للتنظيم
const StatItem = ({ icon, label, value, color }) => (
  <div className={styles.statItem}>
    <div className={`${styles.statIcon} ${color}`}>{icon}</div>
    <div><p className={styles.statLabel}>{label}</p><p className={styles.statValue}>{value}</p></div>
  </div>
);

const ExperienceItem = ({ title, place, desc }) => (
  <div className={styles.expItem}>
    <div className={styles.expIcon}><HiOutlineBriefcase /></div>
    <div>
      <h3>{title}</h3>
      <p className={styles.expPlace}>{place}</p>
      <p className={styles.expDesc}>{desc}</p>
    </div>
  </div>
);

export default PatientDoctorProfile;
