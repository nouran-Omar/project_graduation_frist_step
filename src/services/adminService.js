export const fetchAdminDashboardData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        adminName: "Tayem Zayed",
        stats: {
          totalDoctors: 247,
          totalPatients: 1842,
          newDoctors: 12,
          newPatients: 89
        },
        recentDoctors: [
          { id: 1, name: "Dr. Michael Chen", email: "michael.chen@pulsex.com", img: "https://i.pravatar.cc/150?img=11" },
          { id: 2, name: "Dr. Sarah Williams", email: "sarah.williams@pulsex.com", img: "https://i.pravatar.cc/150?img=5" },
          { id: 3, name: "Dr. James Rodriguez", email: "james.rodriguez@pulsex.com", img: "https://i.pravatar.cc/150?img=13" },
        ],
        recentPatients: [
          { id: 1, name: "Emma Thompson", email: "emma.thompson@email.com", img: "https://i.pravatar.cc/150?img=9" },
          { id: 2, name: "David Martinez", email: "david.martinez@email.com", img: "https://i.pravatar.cc/150?img=3" },
          { id: 3, name: "Olivia Anderson", email: "olivia.anderson@email.com", img: "https://i.pravatar.cc/150?img=1" },
        ]
      });
    }, 600);
  });
};

// بيانات وهمية أولية (15 دكتور عشان نجرب الصفحات)
let mockDoctors = [
  { id: 1, name: "Sandus Al-Attar", email: "john.smith@gmail.com", price: "200", joined: "March 12, 2023", img: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Fatima Al-Qassem", email: "ollyben@gmail.com", price: "300", joined: "June 27, 2022", img: "https://i.pravatar.cc/150?img=5" },
  { id: 3, name: "Emad Ammar", email: "dwarren3@gmail.com", price: "150", joined: "January 8, 2024", img: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Yazeed Hassan", email: "chloehhye@gmail.com", price: "120", joined: "October 5, 2021", img: "https://i.pravatar.cc/150?img=11" },
  { id: 5, name: "Saleh El-Attar", email: "reeds777@gmail.com", price: "90", joined: "February 19, 2023", img: "https://i.pravatar.cc/150?img=13" },
  { id: 6, name: "Yaser Ayoub", email: "belleclark@gmail.com", price: "250", joined: "August 30, 2022", img: "https://i.pravatar.cc/150?img=9" },
  { id: 7, name: "Sabry Al-Attar", email: "lucamich@gmail.com", price: "300", joined: "April 23, 2024", img: "https://i.pravatar.cc/150?img=60" },
  { id: 8, name: "Kamelia Abdelbaki", email: "markwill32@gmail.com", price: "120", joined: "November 14, 2020", img: "https://i.pravatar.cc/150?img=32" },
  { id: 9, name: "Basma Hafez", email: "nicolass009@gmail.com", price: "70", joined: "July 6, 2023", img: "https://i.pravatar.cc/150?img=44" },
  { id: 10, name: "Mahmoud Abdelaal", email: "mianaddiin@gmail.com", price: "80", joined: "December 31, 2021", img: "https://i.pravatar.cc/150?img=55" },
  { id: 11, name: "Mawada Amer", email: "noemivill99@gmail.com", price: "200", joined: "August 10, 2024", img: "https://i.pravatar.cc/150?img=20" },
  { id: 12, name: "Hassan Ali", email: "hassan.ali@gmail.com", price: "180", joined: "Sep 12, 2023", img: "https://i.pravatar.cc/150?img=12" },
];

export const fetchDoctors = async () => {
  return new Promise((resolve) => setTimeout(() => resolve([...mockDoctors]), 500));
};

export const createDoctor = async (newDoc) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const doc = { ...newDoc, id: Date.now(), joined: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) };
      mockDoctors = [doc, ...mockDoctors];
      resolve(doc);
    }, 800);
  });
};

export const updateDoctor = async (updatedDoc) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockDoctors = mockDoctors.map(doc => doc.id === updatedDoc.id ? { ...doc, ...updatedDoc } : doc);
      resolve(updatedDoc);
    }, 800);
  });
};

export const deleteDoctorService = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockDoctors = mockDoctors.filter(doc => doc.id !== id);
      resolve(true);
    }, 800);
  });
};


// ... (كود الدكاترة القديم سيبيه زي ما هو)

// --- Patient Services ---

let mockPatients = [
  { id: 1, name: "Nada Aql", email: "nadaaql@gmail.com", phone: "+201008205312", age: 29, gender: "Female", img: "https://i.pravatar.cc/150?img=5" },
  { id: 2, name: "Hazem Abdelmajid", email: "hazemabdel@gmail.com", phone: "+201012020766", age: 33, gender: "Male", img: "https://i.pravatar.cc/150?img=11" },
  { id: 3, name: "Hoda Bakry", email: "dhoda@gmail.com", phone: "+201012020766", age: 59, gender: "Female", img: "https://i.pravatar.cc/150?img=9" },
  { id: 4, name: "Ola Ashour", email: "olaashour@gmail.com", phone: "+201122626940", age: 45, gender: "Female", img: "https://i.pravatar.cc/150?img=1" },
  { id: 5, name: "Hanaa Khalil", email: "hanaa777@gmail.com", phone: "+201005521587", age: 37, gender: "Female", img: "https://i.pravatar.cc/150?img=44" },
  { id: 6, name: "Sajda Hafez", email: "sajda@gmail.com", phone: "+201006865699", age: 52, gender: "Female", img: "https://i.pravatar.cc/150?img=10" },
  { id: 7, name: "Mohamed Abdelkader", email: "mohammedabd@gmail.com", phone: "+201140092221", age: 30, gender: "Male", img: "https://i.pravatar.cc/150?img=12" },
  { id: 8, name: "Tarek El-Moghawry", email: "tarek32@gmail.com", phone: "+201111269301", age: 60, gender: "Male", img: "https://i.pravatar.cc/150?img=13" },
  { id: 9, name: "Reem Saleh", email: "reeem@gmail.com", phone: "+201001842794", age: 48, gender: "Female", img: "https://i.pravatar.cc/150?img=20" },
  { id: 10, name: "Abdelmohsen Salem", email: "abdelm@gmail.com", phone: "+201003738387", age: 27, gender: "Male", img: "https://i.pravatar.cc/150?img=33" },
];

export const fetchPatients = async () => {
  return new Promise((resolve) => setTimeout(() => resolve([...mockPatients]), 500));
};

export const createPatient = async (newPatient) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const patient = { ...newPatient, id: Date.now(), age: calculateAge(newPatient.dob) };
      mockPatients = [patient, ...mockPatients];
      resolve(patient);
    }, 800);
  });
};

export const updatePatient = async (updatedPatient) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockPatients = mockPatients.map(p => p.id === updatedPatient.id ? { ...p, ...updatedPatient } : p);
      resolve(updatedPatient);
    }, 800);
  });
};

export const deletePatientService = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockPatients = mockPatients.filter(p => p.id !== id);
      resolve(true);
    }, 800);
  });
};

// دالة مساعدة لحساب العمر من تاريخ الميلاد
function calculateAge(dob) {
  if (!dob) return 25; // افتراضي
  const diff = Date.now() - new Date(dob).getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}


// ... (أكواد الدكاترة والمرضى القديمة) ...

// --- Stories Services ---

let mockStories = [
  { id: 1, title: "My Journey to Recovery", excerpt: "A personal story about overcoming health challenges and finding hope...", author: "Aya Kamel", date: "Nov 25, 2024", status: "Published", img: "https://images.unsplash.com/photo-1544367563-12123d8965cd?w=150&q=80", authorImg: "https://i.pravatar.cc/150?img=5" },
  { id: 2, title: "Finding Peace in Mental Health", excerpt: "Sharing my experience with anxiety and the path to wellness...", author: "Hatim Khatib", date: "Nov 24, 2024", status: "Hidden", img: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?w=150&q=80", authorImg: "https://i.pravatar.cc/150?img=11" },
  { id: 3, title: "Lifestyle Changes That Saved Me", excerpt: "How simple daily habits transformed my health completely...", author: "Nevin Saadallah", date: "Nov 23, 2024", status: "Published", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=150&q=80", authorImg: "https://i.pravatar.cc/150?img=9" },
  { id: 4, title: "Battling Diabetes with a Smile", excerpt: "It wasn't easy, but maintaining a positive outlook changed everything...", author: "Omar Fathy", date: "Nov 20, 2024", status: "Published", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=150&q=80", authorImg: "https://i.pravatar.cc/150?img=3" },
  { id: 5, title: "The Road After Surgery", excerpt: "Recovery is a marathon, not a sprint. Here is my full timeline...", author: "Soha Ali", date: "Nov 18, 2024", status: "Hidden", img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=150&q=80", authorImg: "https://i.pravatar.cc/150?img=1" },
  // ... تكرار لملء الصفحات
  { id: 6, title: "Walking: My Daily Medicine", excerpt: "I never thought walking could solve my back pain, but it did...", author: "Mahmoud Hassan", date: "Nov 15, 2024", status: "Published", img: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=150&q=80", authorImg: "https://i.pravatar.cc/150?img=13" },
  { id: 7, title: "Nutrition vs Medicine", excerpt: "How changing my diet allowed me to reduce my medication dosage...", author: "Sarah Jones", date: "Nov 10, 2024", status: "Published", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=150&q=80", authorImg: "https://i.pravatar.cc/150?img=20" },
  { id: 8, title: "Sleep: The Underrated Healer", excerpt: "Fixing my sleep schedule was the first step to fixing my health...", author: "Ali Gamal", date: "Nov 05, 2024", status: "Hidden", img: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=150&q=80", authorImg: "https://i.pravatar.cc/150?img=12" },
];

// جلب القصص
export const fetchAllStories = async () => {
  return new Promise((resolve) => setTimeout(() => resolve([...mockStories]), 500));
};

// تبديل الحالة (Published <-> Hidden)
export const toggleStoryStatusService = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockStories = mockStories.map(story => {
        if (story.id === id) {
           // لو هي Published خليها Hidden والعكس
           return { ...story, status: story.status === 'Published' ? 'Hidden' : 'Published' };
        }
        return story;
      });
      resolve(true);
    }, 400);
  });
};

// حذف قصة
export const deleteStoryService = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockStories = mockStories.filter(s => s.id !== id);
      resolve(true);
    }, 600);
  });
};

// ... (الكود القديم موجود)

// --- Activity Logs Services ---

const mockLogs = [
 { id: 1, action: "Added new patient", desc: 'Patient "Michael Chen" was successfully registered to the system with ID #PT-2847', type: "Created", time: "2 minutes ago" },
  { id: 2, action: "Doctor profile updated", desc: "Dr. Emily Roberts updated specialization from Cardiology to Interventional Cardiology", type: "Updated", time: "15 minutes ago" },
  { id: 3, action: "User login", desc: "Dr. Sarah Wilson logged in from IP address 192.168.1.45", type: "Login", time: "1 hour ago" },
  { id: 4, action: "Appointment rescheduled", desc: "Appointment #APT-1923 moved from May 15 to May 18 at patient's request", type: "Updated", time: "2 hours ago" },
  { id: 5, action: "New prescription created", desc: "Dr. James Anderson created prescription for patient Amanda Foster - 3 medications", type: "Created", time: "3 hours ago" },
  { id: 6, action: "Appointment cancelled", desc: "Appointment #APT-1891 with Dr. Thompson was cancelled by the patient", type: "Deleted", time: "4 hours ago" },
  { id: 7, action: "User logout", desc: "Nurse Jennifer Martinez logged out after completing evening shift", type: "Logout", time: "5 hours ago" },
  { id: 8, action: "Medical records updated", desc: "Patient records for Robert Johnson updated with latest lab results and diagnosis", type: "Updated", time: "6 hours ago" },
  { id: 9, action: "New staff member added", desc: "Dr. Marcus Lee joined the Neurology department as Senior Consultant", type: "Created", time: "8 hours ago" },
  { id: 10, action: "System settings modified", desc: "Administrator updated notification preferences and email templates", type: "Updated", time: "Yesterday" },
  { id: 11, action: "User login", desc: "Admin Tayem Zayed logged in", type: "Login", time: "Yesterday" },
  { id: 12, action: "Patient deleted", desc: "Patient record #PT-998 removed from database", type: "Deleted", time: "2 days ago" },
  { id: 13, action: "Report generated", desc: "Monthly performance report generated by System", type: "Created", time: "2 days ago" },
  // --- بيانات إضافية لملء الصفحات ---
  { id: 14, action: "Password changed", desc: "Dr. Noha Salem updated her account password", type: "Updated", time: "2 days ago" },
  { id: 15, action: "New appointment booked", desc: "Patient Sarah Kamel booked an appointment with Dr. Ali", type: "Created", time: "3 days ago" },
  { id: 16, action: "User login", desc: "Nurse Rania logged in from mobile device", type: "Login", time: "3 days ago" },
  { id: 17, action: "Database backup", desc: "System performed automatic database backup successfully", type: "Created", time: "3 days ago" },
  { id: 18, action: "Story deleted", desc: "Admin deleted a patient story due to policy violation", type: "Deleted", time: "4 days ago" },
  { id: 19, action: "User logout", desc: "Dr. Ahmed logout after session timeout", type: "Logout", time: "4 days ago" },
  { id: 20, action: "Profile picture updated", desc: "Patient Ali Mohamed changed his profile picture", type: "Updated", time: "5 days ago" },
  { id: 21, action: "New Doctor Added", desc: "Dr. Yasser Ayoub account created by Admin", type: "Created", time: "5 days ago" },
  { id: 22, action: "Login failed", desc: "Failed login attempt detected from unknown IP", type: "Login", time: "6 days ago" },
  { id: 23, action: "Settings reset", desc: "System settings reset to default by Admin", type: "Updated", time: "1 week ago" },
  { id: 24, action: "Appointment cancelled", desc: "Dr. Soha cancelled appointments for emergency leave", type: "Deleted", time: "1 week ago" },
  { id: 25, action: "New patient registered", desc: "Patient Hoda Bakry signed up via mobile app", type: "Created", time: "1 week ago" },
  { id: 26, action: "User logout", desc: "Admin Tayem Zayed logged out", type: "Logout", time: "1 week ago" },
  { id: 27, action: "Lab results uploaded", desc: "Lab technician uploaded blood test results for patient #PT-102", type: "Updated", time: "2 weeks ago" },

];

export const fetchActivityLogs = async () => {
  return new Promise((resolve) => setTimeout(() => resolve([...mockLogs]), 600));
};



// ... (الكود القديم) ...

// --- Settings Services ---

export const fetchAdminProfile = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        firstName: "Tayem",
        lastName: "Zayed",
        email: "tayem@pulsex.com",
        phone: "+20 100 820 5312",
        dob: "1995-09-19",
        location: "Cairo, Egypt",
        img: "https://i.pravatar.cc/150?img=33",
        notifications: true,
        darkMode: false
      });
    }, 500);
  });
};

export const updateAdminProfileService = async (data) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), 800));
};

export const changePasswordService = async (passwordData) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
};