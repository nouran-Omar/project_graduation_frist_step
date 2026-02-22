import React, { useState, useEffect, useRef } from 'react';
import styles from './PatientMessages.module.css';
import { HiOutlinePaperClip, HiOutlineFaceSmile, HiOutlineVideoCamera } from "react-icons/hi2";
import { MdSend, MdSearch } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const PatientMessages = () => {
  // 1. بيانات الدكاترة (Sidebar Data)
  const doctors = [
    { id: 1, name: "Dr. Jehan Osama", lastMsg: "Results are ready!", time: "2h ago", status: "online", specialty: "Cardiologist", img: "https://images.unsplash.com/photo-1559839734-2b71f1536780?w=100" },
    { id: 2, name: "Dr. Walid Ali", lastMsg: "Don't forget the pills.", time: "5h ago", status: "online", specialty: "Surgeon", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100" },
    { id: 3, name: "Dr. Sarah Omar", lastMsg: "How is your heart rate?", time: "1d ago", status: "offline", specialty: "Specialist", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100" },
    { id: 4, name: "Dr. Tamer Megahd", lastMsg: "See you on Monday.", time: "3d ago", status: "offline", specialty: "Consultant", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100" },
    { id: 5, name: "Dr. Noha Ahmed", lastMsg: "The report is clean.", time: "1w ago", status: "online", specialty: "Cardiologist", img: "https://images.unsplash.com/photo-1623854767233-243a6496667a?w=100" },
  ];

  // 2. إدارة الرسايل لكل دكتور (Conversation Store)
  const [activeChat, setActiveChat] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [input, setInput] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  // تخزين المحادثات لكل دكتور بـ الـ ID بتاعه
  const [conversations, setConversations] = useState({
    1: [{ id: 101, sender: 'doctor', type: 'text', text: "Hello! I've reviewed your results.", time: "10:30 AM" }],
    2: [{ id: 201, sender: 'doctor', type: 'text', text: "Everything looks stable, Dr. Walid here.", time: "09:15 AM" }],
    3: [{ id: 301, sender: 'doctor', type: 'text', text: "Sarah speaking, please update me on your symptoms.", time: "Yesterday" }],
    4: [],
    5: [],
  });

  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);
  const emojis = ["😊", "❤️", "👍", "🏥", "💊", "👨‍⚕️", "🙏", "💪"];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, activeChat]);

  // 3. الأكشنز
  const handleSend = (content, type = 'text') => {
    if (!content.trim() && type === 'text') return;

    const newMsg = {
      id: Date.now(),
      sender: 'me',
      type: type,
      text: content,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // تحديث المحادثة النشطة فقط
    setConversations(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg]
    }));

    setInput("");
    setShowEmojis(false);

    // الرد التلقائي
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: 'doctor',
        type: 'text',
        text: `Message received. I'm reviewing your data right now.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConversations(prev => ({
        ...prev,
        [activeChat]: [...(prev[activeChat] || []), reply]
      }));
    }, 2000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleSend(imageUrl, 'image');
    }
  };

  const currentDoctor = doctors.find(d => d.id === activeChat);

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.chatCard}>
        
        {/* Sidebar - قائمة الدكاترة مع الفلترة */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Messages</h2>
            <div className={styles.searchBox}>
              <MdSearch />
              <input 
                type="text" 
                placeholder="Search doctor..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.docList}>
            {doctors.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())).map(doc => (
              <div 
                key={doc.id} 
                className={`${styles.docItem} ${activeChat === doc.id ? styles.activeDoc : ''}`}
                onClick={() => setActiveChat(doc.id)}
              >
                <div className={styles.avatarWrapper}>
                  <img src={doc.img} alt={doc.name} />
                  <div className={`${styles.statusDot} ${styles[doc.status]}`} />
                </div>
                <div className={styles.docInfo}>
                  <div className="flex justify-between items-center">
                    <h4>{doc.name}</h4>
                    <span className={styles.timeLabel}>{doc.time}</span>
                  </div>
                  <p>{doc.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window - شباك المحادثة النشطة */}
        <div className={styles.chatWindow}>
          <div className={styles.windowHeader}>
            <div className="flex items-center gap-3">
              <img src={currentDoctor?.img} className={styles.headerAvatar} alt="avatar" />
              <div>
                <h3 className="font-bold">{currentDoctor?.name}</h3>
                <span className="text-xs text-green-500">{currentDoctor?.specialty} • {currentDoctor?.status}</span>
              </div>
            </div>
            <HiOutlineVideoCamera className="text-2xl cursor-pointer text-[#333CF5]" />
          </div>

          <div className={styles.msgArea}>
            {conversations[activeChat]?.map(msg => (
              <div key={msg.id} className={`${styles.msgWrapper} ${msg.sender === 'me' ? styles.myMsg : styles.docMsg}`}>
                <div className={styles.bubble}>
                  {msg.type === 'text' ? msg.text : <img src={msg.text} className={styles.chatImg} alt="sent" />}
                </div>
                <span className={styles.time}>{msg.time}</span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <div className={styles.inputContainer}>
            <div className={styles.inputBar}>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageUpload} accept="image/*" />
              <button className={styles.actionIcon} onClick={() => fileInputRef.current.click()}><HiOutlinePaperClip /></button>
              
              <div className={styles.textInputWrapper}>
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                />
                
                <div className={styles.emojiWrapper}>
                  <button className={styles.actionIcon} onClick={() => setShowEmojis(!showEmojis)}><HiOutlineFaceSmile /></button>
                  <AnimatePresence>
                    {showEmojis && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={styles.emojiPicker}>
                        {emojis.map(e => <span key={e} onClick={() => setInput(input + e)}>{e}</span>)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <button className={styles.sendBtn} onClick={() => handleSend(input)}><MdSend /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientMessages;
