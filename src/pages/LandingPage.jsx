import React from 'react';
import Navbar from '../components/layout/Navbar'; 
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import JourneyTimeline from '../components/sections/JourneyTimeline';
import RecoveryStories from '../components/sections/RecoveryStories';
import DoctorSection from '../components/sections/DoctorSection';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <div className="font-sans antialiased text-gray-900 bg-white">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <JourneyTimeline />
        <RecoveryStories />
        <DoctorSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;