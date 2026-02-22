import React from 'react';
import Button from '../../../../Button/Button';
import { 
  HiOutlineArrowTrendingUp, 
  HiOutlineChevronDown,
  HiOutlineBolt 
} from "react-icons/hi2";
import { FiArrowRight } from "react-icons/fi";
import { IoShieldOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { RiPulseLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
const heartImg = '/image/HomeRightSide.svg';

const HERO_CONTENT = {
  title: "Pulse",
  highlight: "X",
  subtitle: "AI-powered cardiovascular health monitoring with real-time risk assessment and remote doctor consultations.",
  features: [
    "AI Heart Risk Score with 95% accuracy",
    "24/7 vital signs monitoring",
    "Emergency QR codes for instant access",
    "Remote doctor follow-ups"
  ]
};

const Hero = () => {
  return (
    <section id="home" className="font-inter relative bg-[#FAFAFA] overflow-hidden min-h-[calc(100vh-82px)] flex items-center justify-center pt-24 pb-32">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-20">
        <div className="lg:grid lg:grid-cols-2 items-center gap-16">
          
          {/* الجانب الأيسر: دخول من الشمال */}
          <div className="z-10 relative flex flex-col justify-center animate-fade-left">
            <h1 className="text-6xl md:text-[64px] font-bold text-[#010218] mb-6 font-display tracking-tight leading-[1.1]">
              {HERO_CONTENT.title}<span className="text-[#333CF5] text-7xl md:text-[72px]">{HERO_CONTENT.highlight}</span>
            </h1>
            
            <p className="text-xl text-[#757575] font-normal mb-8 leading-relaxed max-w-[600px]">
              {HERO_CONTENT.subtitle}
            </p>
            
            <div className="space-y-4 mb-12">
              {HERO_CONTENT.features.map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-4 opacity-0 animate-fade-left" 
                  style={{ animationDelay: `${0.3 + (i * 0.15)}s`, animationFillMode: 'forwards' }}
                >
                  <FaCheck className="text-[#55F1C4] w-6 h-6 flex-shrink-0" />
                  <span className="text-xl text-[#010218] font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Button className="w-[176px] h-[48px] !text-[15px] !rounded-full bg-[#333CF5] hover:bg-[#282eb5] shadow-lg group flex items-center justify-center gap-2 text-white transition-all font-bold">
                <Link to="/register" className="flex items-center gap-2"> Get Started   <FiArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" /></Link>
                     
            </Button>
          </div>

          {/* الجانب الأيمن: دخول من اليمين وحركات عائمة */}
          <div className="relative h-[500px] w-full flex justify-center items-center opacity-0 animate-fade-right" style={{ animationFillMode: 'forwards' }}>
            
            {/* صورة القلب: نبض هادئ جداً */}
            <div className="relative z-10 w-[461px] h-[461px] animate-heart-soft">
               <img src={heartImg} alt="Heart Model" className="w-full h-auto drop-shadow-2xl" />
            </div>

            {/* أيقونات عائمة - كل واحدة بتأخير مختلف */}
            <RiPulseLine className="absolute top-[10%] right-[15%] w-5 h-5 text-[#2EEB83] animate-float-slow opacity-80" />
            
            <HiOutlineBolt className="absolute bottom-[20%] left-[10%] w-5 h-5 text-[#DBCC28] animate-float-slow delay-2" />

            {/* كارت BPM: يتحرك ببطء */}
            <div className="floating-card top-[15%] left-[-5%] ">
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 bg-[#13D486] rounded-full "></div>
                <p className="text-[#010218] font-bold">BPM: 72</p>
              </div>
              <p className="text-[#757575] text-[10px] font-bold tracking-widest ">Normal Range</p>
            </div>

            {/* كارت Risk: يتحرك ببطء بتأخير مختلف */}
            <div className="floating-card bottom-[10%] right-[-5%] ">
               <div className="absolute -top-6 -left-1 w-10 h-10 flex items-center justify-center animate-bounce delay-1">
                  <IoShieldOutline className="text-[#333CF5] w-5 h-5" />
               </div>
               <div className="flex items-center gap-1.5">
                 <HiOutlineArrowTrendingUp className="text-[#333CF5] w-5 h-5" />
                 <p className="text-[#010218] font-bold text-base">Risk: Low</p>
               </div>
               <p className="text-[#757575] text-[10px] font-bold ">AI Assessment</p>
            </div>
          </div>
        </div>

        {/* سكرول إنديكيتور */}
        <div className=" font-inter absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-60 animate-bounce">
          <span className="text-[#757575] text-xs  tracking-widest">Scroll to explore</span>
          <HiOutlineChevronDown className="w-5 h-5 text-[#757575]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;