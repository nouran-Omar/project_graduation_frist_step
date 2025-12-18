// src/services/doctorService.js

export const fetchDoctorProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 99,
        name: "Dr. Noha Salem",
        role: "Cardiologist",
        img: "https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-portrait-of-a-beautiful-female-doctor-png-image_12530962.png",
        stats: { totalPatients: 120, appointmentsToday: 8, pendingReports: 3, rating: 4.9 }
      });
    }, 500);
  });
};

export const fetchDoctorDashboardData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        doctorName: "Dr. Noha",
        stats: {
          patients: { value: 40, trend: "51%", up: true },
          critical: { value: 8, trend: "20%", up: false },
          appointments: { value: 12, trend: "23%", up: true }
        },
        chartData: [
          { name: '10am', visits: 50 }, { name: '11am', visits: 30 },
          { name: '12am', visits: 60 }, { name: '01am', visits: 40 },
          { name: '02am', visits: 25 }, { name: '03am', visits: 55 },
          { name: '04am', visits: 20 }, { name: '05am', visits: 35 },
          { name: '06am', visits: 65 }, { name: '07am', visits: 75 },
        ],
        messages: [
          { id: 1, name: "Esraa Tamer", msg: "I'm experiencing some side ef...", time: "2 minutes ago", img: "https://i.pravatar.cc/150?img=5", unread: true },
          { id: 2, name: "Ali Ismael", msg: "Thank you for the prescription", time: "1 hour ago", img: "https://i.pravatar.cc/150?img=11", unread: false },
          { id: 3, name: "Soha Ali", msg: "Can I reschedule my appoi...", time: "1 hour ago", img: "https://i.pravatar.cc/150?img=9", unread: false },
        ],
        appointments: [
          { id: 1, name: "Zeyad Ehab", time: "08:00-09:00 AM", img: "https://i.pravatar.cc/150?img=3", type: "Checkup" },
          { id: 2, name: "Soha Ali", time: "09:00-10:00 AM", img: "https://i.pravatar.cc/150?img=9", type: "Emergency" },
          { id: 3, name: "Wael Nael", time: "10:30-11:30 AM", img: "https://i.pravatar.cc/150?img=13", type: "Consultation" },
          { id: 4, name: "Nour Eslam", time: "12:00-01:00 PM", img: "https://i.pravatar.cc/150?img=1", type: "Follow up" },
        ],
        criticalPatients: [
          { id: 1, name: "Sara Kamel", date: "Oct 30", status: "Low Risk", statusColor: "green", img: "https://i.pravatar.cc/150?img=5" },
          { id: 2, name: "Ali Mohamed", date: "Oct 26", status: "Moderate", statusColor: "yellow", img: "https://i.pravatar.cc/150?img=11" },
          { id: 3, name: "Salma Said", date: "Oct 23", status: "High Risk", statusColor: "red", img: "https://i.pravatar.cc/150?img=9" },
          { id: 4, name: "Waled Omar", date: "Oct 18", status: "Low Risk", statusColor: "green", img: "https://i.pravatar.cc/150?img=12" },
        ]
      });
    }, 800);
  });
};



// ... (الكود القديم موجود، ضيفي دي تحته)

export const fetchPatientsList = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Sara Kamel", age: 34, gender: "Female", bp: "120/80", heartRate: "72 bpm", risk: "Low", lastVisit: "2 days ago", img: "https://i.pravatar.cc/150?img=5" },
        { id: 2, name: "Ali Mohamed", age: 45, gender: "Male", bp: "140/90", heartRate: "85 bpm", risk: "High", lastVisit: "1 week ago", img: "https://i.pravatar.cc/150?img=11" },
        { id: 3, name: "Yousra Adel", age: 28, gender: "Female", bp: "130/85", heartRate: "78 bpm", risk: "Moderate", lastVisit: "Today", img: "https://i.pravatar.cc/150?img=9" },
        { id: 4, name: "Waled Omar", age: 52, gender: "Male", bp: "115/75", heartRate: "68 bpm", risk: "Low", lastVisit: "3 days ago", img: "https://i.pravatar.cc/150?img=3" },
        { id: 5, name: "Soha Ali", age: 39, gender: "Female", bp: "135/88", heartRate: "82 bpm", risk: "Moderate", lastVisit: "5 days ago", img: "https://i.pravatar.cc/150?img=1" },
      ]);
    }, 600);
  });
};


// ... (الكود القديم موجود، ضيفي دي تحته)

// دالة لجلب تفاصيل مريض واحد
export const fetchPatientDetails = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: "Yousra Adel",
        age: 32,
        gender: "Female",
        risk: "Low Risk",
        img: "https://i.pravatar.cc/150?img=9",
        vitals: {
          heartRate: "72",
          bp: "120/80",
          sugar: "95",
          cholesterol: "180",
          bloodCount: "Normal"
        },
        records: [
          { id: 1, name: "Complete Blood Count", type: "Blood Test", date: "Oct 28, 2024" },
          { id: 2, name: "Chest X-Ray", type: "Radiology", date: "Oct 25, 2024" },
          { id: 3, name: "Lipid Panel", type: "Blood Test", date: "Oct 20, 2024" },
        ],
        qr: {
          date: "19/10/2004",
          files: 8
        }
      });
    }, 500);
  });
};



// ... (الكود القديم موجود)

// دالة جلب مواعيد الدكتور (Timeline Data)
export const fetchDoctorAppointments = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: { upcoming: 3, completed: 2 },
        timeline: [
          { 
            id: 1, 
            time: "08:00", 
            type: "appointment", 
            patient: "Sara Kamel", 
            tag: "Checkup", 
            tagColor: "bg-blue-100 text-blue-600",
            room: "Clinic Room 203", 
            img: "https://i.pravatar.cc/150?img=5" 
          },
          { 
            id: 2, 
            time: "08:30", 
            type: "appointment", 
            patient: "Ali Mohamed", 
            tag: "Follow-up", 
            tagColor: "bg-purple-100 text-purple-600",
            room: "Clinic Room 105", 
            img: "https://i.pravatar.cc/150?img=11" 
          },
          { 
            id: "break", 
            type: "break", 
            time: "Coffee", 
            duration: "30 minutes" 
          },
          { 
            id: 3, 
            time: "09:00", 
            type: "appointment", 
            patient: "Soha Ali", 
            tag: "Emergency", 
            tagColor: "bg-orange-100 text-orange-600",
            room: "Clinic Room 301", 
            img: "https://i.pravatar.cc/150?img=9" 
          },
          { 
            id: 4, 
            time: "09:30", 
            type: "appointment", 
            patient: "Waled Omar", 
            tag: "Checkup", 
            tagColor: "bg-blue-100 text-blue-600",
            room: "Clinic Room 205", 
            img: "https://i.pravatar.cc/150?img=3" 
          },
        ]
      });
    }, 600);
  });
};


// ... (الكود القديم موجود)

// دالة لجلب رسائل الدكتور (Chat List)
export const fetchDoctorChats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { 
          id: 1, 
          name: "Yousra Adel", 
          img: "https://i.pravatar.cc/150?img=9", 
          status: "online", 
          lastMsg: "Perfect, thanks for following up, Doctor 🙏", 
          time: "10:24 AM", 
          unread: 0,
          // المحادثة الكاملة زي الصورة
          history: [
            { id: 1, sender: "me", text: "Hello Yousra, I've reviewed your recent blood test results — your cholesterol levels have improved, but your blood pressure is still slightly high.", time: "10:30 AM" },
            { id: 2, sender: "other", text: "Thank you, Doctor. I've been taking my medication daily. Should I change my diet plan?", time: "10:32 AM" },
            { id: 3, sender: "me", text: "Yes, try to reduce salty and fried foods this week, and drink more water. I'll send you a new diet plan shortly.", time: "10:33 AM" },
            { id: 4, sender: "other", text: "Got it, thank you so much! Should I continue the same medication dosage?", time: "10:33 AM" },
            { id: 5, sender: "me", text: "Yes, keep the same dosage for now and we'll recheck in your next visit next Monday.", time: "10:33 AM" },
            { id: 6, sender: "other", text: "Perfect, thanks for following up, Doctor 🙏", time: "10:34 AM" }
          ]
        },
        { 
          id: 2, 
          name: "Zeyad Ehab", 
          img: "https://i.pravatar.cc/150?img=3", 
          status: "offline", 
          lastMsg: "Please take your medication as pr...", 
          time: "1d ago", 
          unread: 1,
          history: [] 
        },
        { 
          id: 3, 
          name: "Soha Ali", 
          img: "https://i.pravatar.cc/150?img=1", 
          status: "online", 
          lastMsg: "How are you feeling today?", 
          time: "3d ago", 
          unread: 0,
          history: [] 
        },
        { 
          id: 4, 
          name: "Moustafa Hasan", 
          img: "https://i.pravatar.cc/150?img=11", 
          status: "offline", 
          lastMsg: "Your appointment is confirmed for...", 
          time: "1w ago", 
          unread: 0,
          history: [] 
        },
      ]);
    }, 500);
  });
};


// ... (الكود القديم موجود)

// دالة لجلب قصص المرضى
export const fetchPatientStories = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        // الصفحة 1
        { 
          id: 1, 
          author: "Sarah M.", 
          date: "March 15, 2024", 
          title: "Nutrition Changes That Transformed My Health", 
          excerpt: "Last year, my blood pressure readings reached a point where my doctor told me I needed to change something immediately. At that time, I didn't take my health seriously...", 
          tags: ["Lifestyle", "Health"],
          img: "https://i.pravatar.cc/150?img=5"
        },
        { 
          id: 2, 
          author: "Salem R.", 
          date: "March 12, 2024", 
          title: "Overcoming Heart Surgery Recovery", 
          excerpt: "The road to recovery after my bypass surgery wasn't easy, but with the right support system and gradual progress, I'm now stronger than ever. Here's what helped me get through...", 
          tags: ["Challenges", "Health"],
          img: "https://i.pravatar.cc/150?img=11"
        },
        { 
          id: 3, 
          author: "Noha Ali", 
          date: "March 15, 2024", 
          title: "Overcoming Anxiety During Medical Treatment", 
          excerpt: "Dealing with chronic illness took a toll on my mental health. I realized that treating the body wasn't enough; I needed to heal my mind too. This is my journey...", 
          tags: ["Success Story", "Lifestyle"],
          img: "https://i.pravatar.cc/150?img=9"
        },
        { 
          id: 4, 
          author: "Nour R.", 
          date: "March 12, 2024", 
          title: "Finding Balance: Work and Chronic Pain Manage..", 
          excerpt: "Balancing a high-stress job with chronic pain seemed impossible. I had to learn to listen to my body and set boundaries. It wasn't easy, but it was necessary...", 
          tags: ["Challenges", "Health"],
          img: "https://i.pravatar.cc/150?img=3"
        },
        
        // الصفحة 2 (بيانات إضافية عشان الـ Pagination يشتغل)
        { 
          id: 5, 
          author: "Sondos M.", 
          date: "March 15, 2024", 
          title: "Building a Support Network During Treatment", 
          excerpt: "Isolation was my biggest enemy. I learned that asking for help isn't a sign of weakness, but of strength. My community became my lifeline...", 
          tags: ["Lifestyle", "Health"],
          img: "https://i.pravatar.cc/150?img=1"
        },
        { 
          id: 6, 
          author: "Mohamed S.", 
          date: "March 12, 2024", 
          title: "My Journey to Recovery After Heart Surgery", 
          excerpt: "The fear of the unknown was paralyzing before my surgery. But understanding the procedure and trusting my doctor made all the difference...", 
          tags: ["Success Story", "Lifestyle"],
          img: "https://i.pravatar.cc/150?img=12"
        },
         { 
          id: 7, 
          author: "Ahmed K.", 
          date: "Feb 20, 2024", 
          title: "Living with Diabetes: A New Perspective", 
          excerpt: "Diagnosis was a shock, but it forced me to re-evaluate my life choices. Now, I'm healthier than I was before my diagnosis...", 
          tags: ["Health", "Challenges"],
          img: "https://i.pravatar.cc/150?img=8"
        },
        { 
          id: 8, 
          author: "Layla F.", 
          date: "Jan 10, 2024", 
          title: "The Power of Daily Walking", 
          excerpt: "I started with 10 minutes a day. Now I walk 10km. It solved my back pain and cleared my mind like nothing else...", 
          tags: ["Lifestyle", "Success Story"],
          img: "https://i.pravatar.cc/150?img=4"
        },
      ]);
    }, 600);
  });
};


// ... (الكود القديم موجود)

// دالة لجلب إعدادات الدكتور
export const fetchDoctorSettings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        firstName: "Noha",
        lastName: "Salem",
        email: "noha.salem@pulsex.com",
        phone: "+20 123 456 7890",
        dob: "1985-06-15",
        location: "Cairo, Egypt", // الخانة الزيادة اللي في صورة الدكتور
        img: "https://png.pngtree.com/png-vector/20240528/ourmid/pngtree-portrait-of-a-beautiful-female-doctor-png-image_12530962.png",
        notifications: true,
        darkMode: false
      });
    }, 500);
  });
};