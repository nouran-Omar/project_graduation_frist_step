import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitRiskAssessment } from '../../services/patientService';
import { useNavigate } from 'react-router-dom';
// الأيقونات المطابقة للتصميم
import { FaHeartbeat, FaRunning, FaWineGlassAlt, FaBed } from 'react-icons/fa';
import { MdBloodtype, MdFamilyRestroom } from 'react-icons/md';
import { IoRocketSharp } from "react-icons/io5"; // أيقونة الصاروخ
import { RiRobot2Line } from "react-icons/ri";

const HeartRiskAssessment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // تخزين إجابات المريض
  const [answers, setAnswers] = useState({
    cholesterol: '',
    sleep: '',
    alcohol: '',
    activity: '',
    history: '',
    family: ''
  });

  // دالة لتغيير الإجابة
  const handleSelect = (category, value) => {
    setAnswers(prev => ({ ...prev, [category]: value }));
  };

  // عند الضغط على زرار الحساب
  const handleSubmit = async () => {
    // التأكد إن كل الأسئلة متجاوبة
    const isComplete = Object.values(answers).every(x => x !== '');
    if (!isComplete) {
      alert("Please answer all questions first!");
      return;
    }

    setLoading(true);
    try {
      // إرسال الداتا للـ Service (AI Model)
      const result = await submitRiskAssessment(answers);
      // بعد ما النتيجة تيجي، ممكن نوديه للداشبورد أو نعرض النتيجة
      // هنا هنوديه الداشبورد كمثال إن التقييم خلص
      navigate('/patient/dashboard');
    } catch (error) {
      console.error("AI Model Error", error);
    } finally {
      setLoading(false);
    }
  };

  // مكون فرعي للأسئلة عشان الكود يبقى نضيف (Question Component)
  const QuestionSection = ({ icon: Icon, title, desc, options, category, color = "blue" }) => (
    <div className="mb-8 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`text-xl text-${color}-500`} />
        <h3 className="font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-xs text-gray-500 mb-4 ml-7">{desc}</p>
      
      <div className="flex flex-wrap gap-4 ml-7">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(category, option)}
            className={`px-6 py-3 rounded-full text-sm font-medium border transition-all flex items-center gap-2 ${
              answers[category] === option
                ? 'border-blue-600 bg-white text-blue-900 shadow-md ring-1 ring-blue-600' // Selected Style
                : 'border-gray-200 bg-white text-gray-500 hover:border-blue-300' // Default Style
            }`}
          >
            {/* الدائرة الصغيرة اللي جوه الزرار */}
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                answers[category] === option ? 'border-blue-600' : 'border-gray-300'
            }`}>
                {answers[category] === option && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
            </div>
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <h2 className="text-xl font-bold text-gray-800">AI is analyzing your data...</h2>
        <p className="text-gray-500 text-sm">Please wait while we calculate your risk score.</p>
      </div>
    );
  }

  return (
    <div className="pb-12 font-sans relative">
      
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          Heart Risk Assessment <span className="text-red-500 text-3xl">🫀</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Enter your daily habits and health info to check your current heart risk level.</p>
      </motion.div>

      {/* Questions List */}
      <div className="bg-white/50 rounded-[30px] p-2">
        
        {/* 1. Cholesterol */}
        <QuestionSection 
            icon={MdBloodtype} color="red"
            category="cholesterol"
            title="Cholesterol Level"
            desc="Select your latest cholesterol level:"
            options={["Normal (<200 mg/dL)", "Borderline (200–239 mg/dL)", "High (≥240 mg/dL)"]}
        />

        {/* 2. Sleep */}
        <QuestionSection 
            icon={FaBed} color="indigo"
            category="sleep"
            title="Sleep Hours Per Day"
            desc="How active are you during the week?"
            options={["Less than 6 hours", "6–8 hours", "More than 8 hours"]}
        />

        {/* 3. Alcohol */}
        <QuestionSection 
            icon={FaWineGlassAlt} color="blue"
            category="alcohol"
            title="Alcohol Consumption"
            desc="How often do you drink alcohol?"
            options={["Low", "Medium", "High"]}
        />

        {/* 4. Physical Activity */}
        <QuestionSection 
            icon={FaRunning} color="green"
            category="activity"
            title="Physical Activity"
            desc="How active are you during the week?"
            options={["Low", "Medium", "High"]}
        />

        {/* 5. Previous Heart Issues */}
        <QuestionSection 
            icon={FaHeartbeat} color="red"
            category="history"
            title="Previous Heart Issues"
            desc="Have you ever had any heart-related issues before?"
            options={["Yes", "No"]}
        />

        {/* 6. Family History */}
        <QuestionSection 
            icon={MdFamilyRestroom} color="orange"
            category="family"
            title="Family History of Heart Disease"
            desc="Has anyone in your family had heart-related diseases?"
            options={["Yes", "No"]}
        />

      </div>

      {/* Calculate Button */}
      <div className="mt-8 flex justify-center">
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmit}
            className="bg-gradient-to-r from-blue-800 to-red-600 text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl shadow-blue-200 flex items-center gap-3 transition-all hover:shadow-2xl"
        >
            Calculate Risk <IoRocketSharp />
        </motion.button>
      </div>

      {/* Floating Robot Helper */}
      <div className="fixed bottom-8 right-8 animate-bounce cursor-pointer">
         <span className="bg-cyan-400 text-white text-[10px] px-2 py-0.5 rounded-full absolute -top-2 -right-2 font-bold z-10">AI</span>
         <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
            <RiRobot2Line className="text-2xl" />
         </div>
      </div>

    </div>
  );
};

export default HeartRiskAssessment;