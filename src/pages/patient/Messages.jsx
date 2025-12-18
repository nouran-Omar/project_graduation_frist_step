import React, { useEffect, useState, useRef } from 'react';
import { fetchMessagesData } from '../../services/patientService';
import { FiSearch, FiSend, FiPaperclip, FiVideo, FiMoreHorizontal, FiSmile } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";

const Messages = () => {
  const [data, setData] = useState(null);
  const [selectedChat, setSelectedChat] = useState(1); // ID الدكتور المختار
  const [newMessage, setNewMessage] = useState("");
  
  // 🔥 التغيير 1: بنخزن كل المحادثات هنا، مش محادثة واحدة
  const [allChats, setAllChats] = useState({}); 
  
  const messagesEndRef = useRef(null);

  // تحميل الداتا أول مرة
  useEffect(() => {
    fetchMessagesData().then((res) => {
        setData(res);
        setAllChats(res.chats); // تخزين كل المحادثات
    });
  }, []);

  // السكرول لتحت لما الرسايل تتغير
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allChats, selectedChat]); // بيشتغل لما نغير الدكتور أو تيجي رسالة جديدة

  // --- دالة الإرسال الذكية ---
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const currentChatId = selectedChat; // بنحفظ الـ ID عشان لو غيرتي الدكتور بسرعة الرد ميروحش للغلط
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const myMsg = {
        id: Date.now(),
        sender: 'me',
        text: newMessage,
        time: timeNow
    };

    // 1. تحديث المحادثة الخاصة بالدكتور المختار فقط
    setAllChats(prev => ({
        ...prev,
        [currentChatId]: [...(prev[currentChatId] || []), myMsg]
    }));
    
    setNewMessage("");

    // 2. الرد التلقائي (للدكتور ده بس)
    setTimeout(() => {
        const docReply = {
            id: Date.now() + 1,
            sender: 'doctor',
            text: "Received. I'll check and reply shortly.", // رد افتراضي
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setAllChats(prev => ({
            ...prev,
            [currentChatId]: [...(prev[currentChatId] || []), docReply]
        }));
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  if (!data) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Messages...</div>;

  const activeDoctor = data.contacts.find(c => c.id === selectedChat);
  // 🔥 التغيير 2: بنجيب رسايل الدكتور المختار بس من المخزن الكبير
  const currentMessages = allChats[selectedChat] || [];

  return (
    <div className="h-[calc(100vh-120px)] animate-fade-in font-sans flex gap-6 pb-4">
      
      {/* Sidebar (Contacts) */}
      <div className="w-full md:w-1/3 bg-white rounded-[30px] shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-50">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                Messages <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{data.contacts.length}</span>
            </h2>
            <div className="relative">
                <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
                <input type="text" placeholder="Search doctor..." className="w-full bg-gray-50 pl-10 pr-4 py-3 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"/>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {data.contacts.map((contact) => (
                <div 
                    key={contact.id} 
                    onClick={() => setSelectedChat(contact.id)} 
                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${selectedChat === contact.id ? 'bg-blue-50/50 border border-blue-100' : 'hover:bg-gray-50 border border-transparent'}`}
                >
                    <div className="relative">
                        <img src={contact.img} alt={contact.name} className="w-12 h-12 rounded-full object-cover" />
                        {contact.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                            <h4 className={`text-sm font-bold ${selectedChat === contact.id ? 'text-blue-900' : 'text-gray-800'}`}>{contact.name}</h4>
                            <span className="text-[10px] text-gray-400">{contact.time}</span>
                        </div>
                        <p className="text-xs text-gray-500 truncate">{contact.lastMsg}</p>
                    </div>
                    {contact.unread > 0 && <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">{contact.unread}</div>}
                </div>
            ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="hidden md:flex flex-1 bg-white rounded-[30px] shadow-sm border border-gray-100 flex-col overflow-hidden relative">
         
         {/* Chat Header */}
         <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white z-10">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <img src={activeDoctor.img} alt={activeDoctor.name} className="w-12 h-12 rounded-full object-cover" />
                    {activeDoctor.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                </div>
                <div>
                    <h3 className="font-bold text-gray-900">{activeDoctor.name}</h3>
                    <p className="text-xs text-green-500 font-medium">{activeDoctor.online ? 'Online' : 'Offline'}</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all"><FiVideo className="text-lg" /></button>
                <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-all"><FiMoreHorizontal className="text-lg" /></button>
            </div>
         </div>

         {/* Messages Area */}
         <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFAFA]">
            {/* عرض الرسايل الحالية فقط */}
            {currentMessages.length > 0 ? (
                currentMessages.map((msg) => (
                    <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                        {msg.sender === 'doctor' && <img src={activeDoctor.img} className="w-8 h-8 rounded-full object-cover mt-1" alt="doc" />}
                        
                        <div className={`max-w-[70%] space-y-1 ${msg.sender === 'me' ? 'items-end flex flex-col' : ''}`}>
                            <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'me' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'}`}>
                                {msg.text}
                            </div>
                            <span className="text-[10px] text-gray-400 px-1">{msg.time}</span>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <p>No messages yet. Say Hi! 👋</p>
                </div>
            )}
            <div ref={messagesEndRef} />
         </div>

         {/* Input Area */}
         <div className="p-4 bg-white border-t border-gray-50">
            <div className="bg-gray-50 rounded-full px-2 py-2 flex items-center gap-2">
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all"><FiPaperclip className="text-lg" /></button>
                
                <input 
                    type="text" 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..." 
                    className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
                />
                
                <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-all"><FiSmile className="text-lg" /></button>
                
                <button 
                    onClick={handleSendMessage}
                    className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95"
                >
                    <FiSend className="text-lg ml-1" />
                </button>
            </div>
         </div>

      </div>
    </div>
  );
};

export default Messages;