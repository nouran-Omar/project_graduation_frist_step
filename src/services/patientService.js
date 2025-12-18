export const fetchDashboardData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        userName: "Mohamed",
        // كروت الإحصائيات (نفس أرقام الصورة)
        vitals: [
          { title: "Heart Rate", value: 75, unit: "bpm", status: "Normal", isPrimary: true, icon: "❤️", data: [40, 30, 60, 50, 90, 80], chartColor: "#ffffff" },
          { title: "Blood Pressure", value: "80/60", unit: "mmHg", status: "Low", isPrimary: false, icon: "🩸", data: [20, 80, 40, 70, 30, 60], chartColor: "#F43F5E" },
          { title: "Blood Sugar", value: 95, unit: "mg/dl", status: "Normal", isPrimary: false, icon: "💉", data: [30, 50, 40, 70, 50, 80], chartColor: "#10B981" },
          { title: "Cholesterol", value: 180, unit: "mg/dl", status: "Normal", isPrimary: false, icon: "🧬", data: [40, 30, 60, 50, 40, 70], chartColor: "#10B981" },
        ],
        // الجراف الكبير
        weeklyData: [
          { name: 'Mon', value: 20 }, { name: 'Tue', value: 60 }, { name: 'Wed', value: 40 },
          { name: 'Thu', value: 80 }, { name: 'Fri', value: 50 }, { name: 'Sat', value: 90 }, { name: 'Sun', value: 40 }
        ],
        // بيانات الذكاء الاصطناعي
        aiRiskScore: 25,
        aiStatus: "Low Risk",
        aiMessage: "Your heart condition is stable.",
        recommendations: [
          "Try to reduce foods high in saturated fat.",
          "Walk 30 mins daily.",
          "Sleep 7-8 hours."
        ],
        // الدكاترة
        doctors: [
            { name: 'Dr. Ebrahim Moustafa', spec: 'Cairo', img: 'https://i.pravatar.cc/150?img=11' },
            { name: 'Dr. Jehan Osama', spec: 'Menoufia', img: 'https://i.pravatar.cc/150?img=5' },
            { name: 'Dr. Yassin Mansour', spec: 'Giza', img: 'https://i.pravatar.cc/150?img=3' },
        ],
        // الموعد القادم
        nextAppointment: {
            doctor: "Dr. Ghada Adel",
            spec: "Cairo",
            date: "13/12/2025",
            time: "07:00 PM",
            img: "https://i.pravatar.cc/150?img=9"
        }
      });
    }, 800);
  });
};



// ... (الكود القديم زي ما هو)

// دالة جديدة لجلب السجلات الطبية
export const fetchMedicalRecords = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        // قائمة الملفات (زي الجدول اللي في الصورة)
        files: [
          { id: 1, name: "BloodF", type: "PNG", size: "29 KB", date: "18/10/2025", category: "BloodTest" },
          { id: 2, name: "BPdf", type: "PDF", size: "1 MB", date: "1/9/2025", category: "BloodTest" },
          { id: 3, name: "Scan", type: "JPEG", size: "26 KB", date: "16/8/2025", category: "Radiology" },
          { id: 4, name: "Photo", type: "PNG", size: "2 KB", date: "16/3/2025", category: "Radiology" },
        ],
        // الإحصائيات اللي في المربع الأبيض تحت على اليمين
        stats: {
          totalFiles: 4,
          lastUpload: "18/10/2025",
          bloodCount: 2,
          radiologyCount: 2
        }
      });
    }, 800);
  });
};

// ... (الكود القديم)

// دالة إرسال بيانات التقييم للذكاء الاصطناعي
export const submitRiskAssessment = async (assessmentData) => {
  console.log("Sending to AI Model:", assessmentData);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // الرد اللي المفروض يجي من الباك إند/AI
      resolve({
        success: true,
        riskScore: 35,
        riskLevel: "Low to Moderate",
        message: "Your lifestyle is generally healthy, but consider improving sleep quality.",
        recommendations: ["Increase sleep to 7 hours", "Maintain low sodium diet"]
      });
    }, 2000); // بنعمل تأخير 2 ثانية عشان نحسس اليوزر إن الـ AI بيحسب
  });
};



// ... (الكود القديم)

// دالة جلب بيانات الـ QR Code
export const fetchQRCodeData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PulseX-Patient-Record-12345", // رابط بيولد QR حقيقي
        generatedDate: "19/10/2024",
        totalFiles: 8,
        contents: [
          "Blood Test Results",
          "Radiology Scans",
          "Medication Reports"
        ],
        tip: "Show this QR code to your doctor during appointments — it gives instant access to all your records securely."
      });
    }, 500);
  });
};


// ... (الكود القديم)

// دالة جلب قائمة الدكاترة (بيانات كثيرة للتجربة)
export const fetchDoctorsList = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: {
          totalDoctors: 50,
          topRated: "89%",
          activeNow: 32
        },
        // هنا زودنا الدكاترة لـ 12 دكتور
        doctors: [
          { id: 1, name: "Dr. Osama Omran", specialty: "Cairo", rating: 5, reviews: 124, price: 200, img: "https://i.pravatar.cc/150?img=11" },
          { id: 2, name: "Dr. Tamer Megahd", specialty: "Giza", rating: 5, reviews: 89, price: 80, img: "https://i.pravatar.cc/150?img=12" },
          { id: 3, name: "Dr. Jehan Osama", specialty: "Menoufia", rating: 4, reviews: 210, price: 400, img: "https://i.pravatar.cc/150?img=5" },
          { id: 4, name: "Dr. Ali Ramez", specialty: "Cairo", rating: 3, reviews: 55, price: 300, img: "https://i.pravatar.cc/150?img=3" },
          { id: 5, name: "Dr. Noha Ahmed", specialty: "Alexandria", rating: 4, reviews: 100, price: 80, img: "https://i.pravatar.cc/150?img=9" },
          { id: 6, name: "Dr. Zena Mahmoud", specialty: "Fayoum", rating: 4, reviews: 76, price: 120, img: "https://i.pravatar.cc/150?img=1" },
          // داتا زيادة للصفحة الثانية
          { id: 7, name: "Dr. Ahmed Kamal", specialty: "Cairo", rating: 5, reviews: 300, price: 250, img: "https://i.pravatar.cc/150?img=60" },
          { id: 8, name: "Dr. Sarah Ihab", specialty: "Giza", rating: 4, reviews: 150, price: 150, img: "https://i.pravatar.cc/150?img=44" },
          { id: 9, name: "Dr. Kareem Adel", specialty: "Mansoura", rating: 5, reviews: 90, price: 180, img: "https://i.pravatar.cc/150?img=33" },
          { id: 10, name: "Dr. Mona El-Sayed", specialty: "Alexandria", rating: 3, reviews: 40, price: 100, img: "https://i.pravatar.cc/150?img=20" },
          { id: 11, name: "Dr. Youssef Hany", specialty: "Cairo", rating: 4, reviews: 112, price: 220, img: "https://i.pravatar.cc/150?img=53" },
          { id: 12, name: "Dr. Hoda Nabil", specialty: "Luxor", rating: 5, reviews: 200, price: 300, img: "https://i.pravatar.cc/150?img=49" },
        ]
      });
    }, 800);
  });
};


// ... (الكود القديم)

// دالة جلب المواعيد (القادمة والسابقة)
export const fetchAppointments = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        // الإحصائيات اللي في الكروت الكبيرة فوق
        stats: {
          upcomingCount: 3,
          completedCount: 2
        },
        // قائمة المواعيد القادمة
        upcoming: [
          { 
            id: 1, 
            doctorName: "Dr. Jehan Osama", 
            specialty: "Cairo Heart Center", 
            date: "22 Oct 2025", 
            time: "03:30 PM", 
            payment: "Cash at Clinic", 
            img: "https://i.pravatar.cc/150?img=5" 
          },
          { 
            id: 2, 
            doctorName: "Dr. Ahmed Hassan", 
            specialty: "Medical City Hospital", 
            date: "25 Oct 2025", 
            time: "10:00 AM", 
            payment: "Online Payment", 
            img: "https://i.pravatar.cc/150?img=12" 
          },
          { 
            id: 3, 
            doctorName: "Dr. Noha Mohamed", 
            specialty: "Skin Care Clinic", 
            date: "28 Oct 2025", 
            time: "02:15 PM", 
            payment: "Online Payment", 
            img: "https://i.pravatar.cc/150?img=9" 
          },
        ],
        // قائمة المواعيد المنتهية (للمستقبل)
        completed: [
          { 
            id: 101, 
            doctorName: "Dr. Osama Omran", 
            specialty: "Cairo Clinic", 
            date: "10 Sep 2025", 
            time: "05:00 PM", 
            payment: "Cash", 
            img: "https://i.pravatar.cc/150?img=11",
            status: "Done"
          },
          { 
            id: 102, 
            doctorName: "Dr. Ali Ramez", 
            specialty: "Giza Center", 
            date: "01 Aug 2025", 
            time: "12:00 PM", 
            payment: "Online", 
            img: "https://i.pravatar.cc/150?img=3",
            status: "Done"
          }
        ]
      });
    }, 800);
  });
};



// ... (الكود القديم)

// دالة جلب قائمة المحادثات (Chat List & History)
// ... (باقي الكود القديم زي ما هو)

export const fetchMessagesData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        // قائمة جهات الاتصال (زي ما هي)
        contacts: [
          { id: 1, name: "Dr. Jehan Osama", img: "https://i.pravatar.cc/150?img=5", lastMsg: "See you tomorrow.", time: "2h ago", unread: 2, online: true },
          { id: 2, name: "Dr. Osama Ali", img: "https://i.pravatar.cc/150?img=11", lastMsg: "Take care.", time: "1d ago", unread: 0, online: false },
          { id: 3, name: "Dr. Sarah Omar", img: "https://i.pravatar.cc/150?img=9", lastMsg: "Good improvement.", time: "3d ago", unread: 0, online: true },
          { id: 4, name: "Dr. Ali Seif", img: "https://i.pravatar.cc/150?img=3", lastMsg: "Confirmed.", time: "1w ago", unread: 0, online: false },
        ],
        // 🔥 التعديل هنا: عملنا قاموس (Object) شايل رسايل كل دكتور لوحده بالـ ID
        chats: {
            1: [ // رسايل د. جيهان (ID: 1)
                { id: 1, sender: "doctor", text: "Hello! I've reviewed your recent lab results.", time: "10:30 AM" },
                { id: 2, sender: "me", text: "That's great news!", time: "10:32 AM" },
            ],
            2: [ // رسايل د. أسامة (ID: 2)
                { id: 1, sender: "me", text: "Doctor, can I stop the medication?", time: "Yesterday" },
                { id: 2, sender: "doctor", text: "No, please continue for another week.", time: "Yesterday" },
            ],
            3: [ // رسايل د. سارة (ID: 3)
                { id: 1, sender: "doctor", text: "How are you feeling today?", time: "3 days ago" },
            ],
            4: [] // د. علي (فاضي)
        }
      });
    }, 800);
  });
};

// ... (الكود القديم)

// دالة جلب قصص المرضى
export const fetchStories = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { 
          id: 1, 
          author: "Sarah M.", 
          date: "March 15, 2024", 
          img: "https://i.pravatar.cc/150?img=5",
          title: "Nutrition Changes That Transformed My Health",
          excerpt: "Last year, my blood pressure readings reached a point where my doctor told me I needed to change something immediately. At that time, I didn't take my health seriously...",
          tags: ["Lifestyle", "Health"],
          bg: "bg-orange-50",
          tagColor: "orange"
        },
        { 
          id: 2, 
          author: "Salem R.", 
          date: "March 12, 2024", 
          img: "https://i.pravatar.cc/150?img=11",
          title: "Overcoming Heart Surgery Recovery",
          excerpt: "The road to recovery after my bypass surgery wasn't easy, but with the right support system and gradual progress, I'm now stronger than ever. Here's what helped me get through...",
          tags: ["Challenges", "Health"],
          bg: "bg-purple-50",
          tagColor: "purple"
        },
        { 
          id: 3, 
          author: "Noha Ali", 
          date: "March 15, 2024", 
          img: "https://i.pravatar.cc/150?img=9",
          title: "Overcoming Anxiety During Medical Treatment",
          excerpt: "Last year, my blood pressure readings reached a point where my doctor told me I needed to change something immediately. At that time, I didn't take my health seriously...",
          tags: ["Success Story", "Lifestyle"],
          bg: "bg-green-50",
          tagColor: "green"
        },
        { 
          id: 4, 
          author: "Nour R.", 
          date: "March 12, 2024", 
          img: "https://i.pravatar.cc/150?img=3",
          title: "Finding Balance: Work and Chronic Pain Manage..",
          excerpt: "The road to recovery after my bypass surgery wasn't easy, but with the right support system and gradual progress, I'm now stronger than ever. Here's what helped me get through...",
          tags: ["Challenges", "Health"],
          bg: "bg-blue-50",
          tagColor: "blue"
        },
        { 
          id: 5, 
          author: "Sondos M.", 
          date: "March 15, 2024", 
          img: "https://i.pravatar.cc/150?img=1",
          title: "Building a Support Network During Treatment",
          excerpt: "Last year, my blood pressure readings reached a point where my doctor told me I needed to change something immediately. At that time, I didn't take my health seriously...",
          tags: ["Lifestyle", "Health"],
          bg: "bg-orange-50",
          tagColor: "orange"
        },
        { 
          id: 6, 
          author: "Mohamed S.", 
          date: "March 12, 2024", 
          img: "https://i.pravatar.cc/150?img=12",
          title: "My Journey to Recovery After Heart Surgery",
          excerpt: "The road to recovery after my bypass surgery wasn't easy, but with the right support system and gradual progress, I'm now stronger than ever. Here's what helped me get through...",
          tags: ["Success Story", "Lifestyle"],
          bg: "bg-green-50",
          tagColor: "green"
        },
        // قصص زيادة للتجربة (Pagination)
        { id: 7, author: "Ahmed K.", date: "Feb 20, 2024", img: "https://i.pravatar.cc/150?img=8", title: "Running My First Marathon", excerpt: "After years of inactivity...", tags: ["Fitness"], bg: "bg-blue-50", tagColor: "blue" },
        { id: 8, author: "Mona L.", date: "Feb 18, 2024", img: "https://i.pravatar.cc/150?img=10", title: "Diet Changes", excerpt: "How I cut sugar completely...", tags: ["Diet"], bg: "bg-purple-50", tagColor: "purple" },
      ]);
    }, 800);
  });
};
// ... (الكود القديم)

// دالة جلب بيانات الإعدادات والبروفايل
export const fetchSettingsData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        personalInfo: {
          firstName: "Mohamed",
          lastName: "Salem",
          email: "mohamed.salem@example.com",
          phone: "+20 100 123 4567",
          dob: "1995-06-15",
          img: "https://i.pravatar.cc/150?img=11"
        },
        healthInfo: {
          height: "175 cm",
          weight: "75 kg",
          bloodPressure: "120/80",
          bloodSugar: "95 mg/dL",
          bloodCount: "14.5 g/dL",
          heartRate: "72 bpm"
        },
        preferences: {
          notifications: true,
          darkMode: false
        }
      });
    }, 600);
  });
};

// دالة تحديث البيانات (محاكاة)
export const updateProfile = async (newData) => {
    console.log("Sending to API:", newData);
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
};

// ... (الكود القديم)

// دالة تسجيل الخروج
export const logoutUser = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("User Logged Out");
            // هنا المفروض نمسح التوكن: localStorage.removeItem('token');
            resolve(true);
        }, 500);
    });
};


// ... (الكود القديم)

// دالة جلب تفاصيل الدكتور والمواعيد المتاحة للحجز
export const fetchDoctorSlots = async (doctorId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        doctor: {
          id: doctorId,
          name: "Dr. Walid Ali", // مثال زي الصورة
          specialty: "Specialist Doctor",
          rating: 4.9,
          reviews: 127,
          price: 200,
          image: "https://i.pravatar.cc/150?img=11",
          location: "City Medical Center"
        },
        // المواعيد المتاحة (للتاريخ المختار)
        availableTimeSlots: [
          "05:30 PM", "06:30 PM", "07:30 PM", "08:30 PM", "09:30 PM"
        ],
        // أيام الشهر وحالتها (متاح/مشغول)
        calendarDays: [
            { day: 10, disabled: true }, { day: 11, disabled: true }, { day: 12, disabled: true }, 
            { day: 13, disabled: true }, { day: 14, selected: false }, { day: 15, selected: true }, // 15 هو المختار
            { day: 16, selected: false }, { day: 17, disabled: true }, { day: 18, selected: false },
            { day: 19, disabled: true }, { day: 20, selected: false }, { day: 21, selected: false },
            { day: 22, disabled: true }, { day: 23, disabled: true }, { day: 24, disabled: true },
            { day: 25, selected: false }, { day: 26, selected: false }, { day: 27, selected: false },
            { day: 28, selected: false }, { day: 29, selected: false }, { day: 30, selected: false }
        ]
      });
    }, 800);
  });
};


// ... (الكود القديم)

// دالة إتمام الحجز والدفع
export const processBooking = async (bookingDetails) => {
  console.log("Processing Booking:", bookingDetails);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: "#TRX-" + Math.floor(Math.random() * 100000),
        message: bookingDetails.method === 'card' ? "Payment Successful" : "Booking Confirmed"
      });
    }, 1500); // وقت محاكاة المعالجة
  });
};

// ... (الكود القديم)

// دالة جلب تفاصيل قصة معينة
export const fetchStoryDetails = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        author: {
            name: "Sarah M.",
            role: "Shared publicly to inspire other patients",
            date: "March 15, 2024",
            img: "https://i.pravatar.cc/150?img=5"
        },
        title: "Nutrition Changes That Transformed My Health",
        // النص الطويل المقسم لفقرات
        content: [
            "When I first joined PulseX six months ago, I was struggling with chronic fatigue, digestive issues, and constant brain fog. Despite visiting multiple doctors, I couldn't find answers that led to meaningful improvement. I felt frustrated and lost, unsure of where to turn next.",
            "The turning point came when my PulseX care coordinator suggested we take a comprehensive look at my nutrition patterns. Through the platform's detailed tracking tools, I began logging everything I ate, how I felt after meals, and my energy levels throughout the day. The patterns that emerged were eye-opening.",
            "Working with my nutritionist through PulseX, we identified several trigger foods that were causing inflammation and energy crashes. We gradually eliminated processed foods, refined sugars, and foods I was sensitive to, while introducing more whole foods, lean proteins, and anti-inflammatory ingredients."
        ],
        mainImage: "https://images.unsplash.com/photo-1543362906-acfc16c67564?q=80&w=1000&auto=format&fit=crop", // صورة الأكل الصحي
        stats: {
            likes: 132,
            comments: 89,
            shares: 24
        },
        // الاقتراحات اللي تحت (You may also like)
        relatedStories: [
            { id: 101, title: "How Exercise Became My Medicine", author: "Michael R.", date: "March 8, 2024", img: "https://i.pravatar.cc/150?img=11", tags: ["Fitness", "Recovery"] },
            { id: 102, title: "Managing Stress Through Mindfulness", author: "Emma L.", date: "March 5, 2024", img: "https://i.pravatar.cc/150?img=9", tags: ["Mental Health", "Wellness"] },
            { id: 103, title: "Sleep Quality Changed Everything", author: "David K.", date: "March 1, 2024", img: "https://i.pravatar.cc/150?img=3", tags: ["Sleep", "Lifestyle"] },
        ]
      });
    }, 600);
  });
};
// ... (الكود القديم)

// دالة نشر قصة جديدة
export const publishNewStory = async (storyData) => {
  console.log("Publishing Story:", storyData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Story published successfully!" });
    }, 2000); // وقت التحميل
  });
};
