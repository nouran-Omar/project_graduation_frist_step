import React from 'react';
import styles from './PatientDoctorCard.module.css';
import { HiOutlineLocationMarker, HiStar } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';

const PatientDoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <img src={doctor.img} alt={doctor.name} className={styles.avatar} />
      <h3 className={styles.docName}>{doctor.name}</h3>
      <div className={styles.location}>
        <HiOutlineLocationMarker /> {doctor.loc}
      </div>
      <div className={styles.rating}>
        {[...Array(5)].map((_, i) => (
          <HiStar key={i} className={i < doctor.rate ? "text-yellow-400" : "text-gray-200"} />
        ))}
        <span className="text-gray-400 ml-2">({doctor.reviews} reviews)</span>
      </div>
      <div className={styles.price}>
        <span className="font-bold text-xl">${doctor.price}</span> / session
      </div>
      <button 
        className={styles.bookBtn}
        onClick={() => navigate(`/patient/doctor-profile/${doctor.id}`)}
      >
        Book Now
      </button>
    </div>
  );
};

export default PatientDoctorCard;
