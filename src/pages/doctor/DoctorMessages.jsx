import React, { useEffect, useState, useRef } from 'react';
import { fetchDoctorChats } from '../../services/doctorService';
import { FiSearch, FiSend, FiPaperclip, FiVideo, FiPhone, FiMoreVertical, FiMenu, FiCheck } from "react-icons/fi";

const DoctorMessages = () => {
  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(1);
  const [inputText, setInputText] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 👈 حالة البحث
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false); // 👈 حالة "جاري الكتابة..."

  // مرجع عشان نعمل سكرول لآخر رسالة أوتوماتيك
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchDoctorChats().then(setChats);
  }, []);

  // دالة السكرول لآخر الشات
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, activeChatId]);

  // 1️⃣ منطق الفلترة (Search Logic)
  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeChat = chats.find(c => c.id === activeChatId);

  // 2️⃣ منطق الرد التلقائي (Simulated API Response)
  const simulatePatientReply = (chatId) => {
    setIsTyping(true);
    
    setTimeout(() => {
      // ردود مختلفة حسب الشخص (محاكاة الذكاء)
      let replyText = "Thanks doctor, I will follow your instructions.";
      if (chatId === 1) replyText = "Okay, I will monitor my blood pressure and update you tomorrow. 🩺";
      if (chatId === 2) replyText = "Done! I took the medicine. When should I come for the next checkup?";
      if (chatId === 3) replyText = "I feel much better now, thank you! 😊";

      const replyMsg = { 
        id: Date.now() + 1, 
        sender: "other", 
        text: replyText, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };

      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === chatId) {
          return { 
            ...chat, 
            history: [...(chat.history || []), replyMsg], 
            lastMsg: replyText, 
            time: "Now",
            status: "online" // المريض بقى أونلاين عشان بيرد
          };
        }
        return chat;
      }));
      
      setIsTyping(false);
    }, 2000); // الرد يوصل بعد ثانيتين
  };

  // 3️⃣ إرسال الرسالة
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    
    const newMessage = { 
        id: Date.now(), 
        sender: "me", 
        text: inputText, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };

    // تحديث الشات برسالتك
    setChats(prevChats => prevChats.map(chat => {
        if (chat.id === activeChatId) {
            return { ...chat, history: [...(chat.history || []), newMessage], lastMsg: inputText, time: "Now" };
        }
        return chat;
    }));

    setInputText("");
    
    // تشغيل الرد التلقائي
    simulatePatientReply(activeChatId);
  };

  if (!chats.length) return <div className="h-screen flex items-center justify-center text-blue-600 font-bold animate-pulse">Loading Messages...</div>;

  return (
    <div className="h-[calc(100vh-140px)] flex bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden font-sans">
      
      {/* --- Sidebar (Chat List) --- */}
      <div className={`${isSidebarOpen ? 'w-full md:w-80' : 'w-0'} transition-all duration-300 border-r border-gray-100 flex flex-col bg-white`}>
          
          <div className="p-6 border-b border-gray-50">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex justify-between items-center">
                  Messages 
                  <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-1 rounded-full">{filteredChats.length}</span>
              </h2>
              <div className="relative">
                  <FiSearch className="absolute left-4 top-3.5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search patient..." 
                    value={searchTerm} // 👈 ربطنا القيمة بالـ State
                    onChange={(e) => setSearchTerm(e.target.value)} // 👈 تفعيل الفلتر
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                  />
              </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
              {filteredChats.map(chat => (
                  <div 
                    key={chat.id}
                    onClick={() => { setActiveChatId(chat.id); setSidebarOpen(false); }}
                    className={`p-4 flex gap-3 cursor-pointer transition-colors border-l-4 relative
                        ${activeChatId === chat.id ? 'bg-blue-50/50 border-blue-600' : 'border-transparent hover:bg-gray-50'}
                    `}
                  >
                      <div className="relative">
                          <img src={chat.img} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                          {chat.status === 'online' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                      </div>
                      <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-1">
                              <h4 className={`text-sm font-bold ${activeChatId === chat.id ? 'text-gray-900' : 'text-gray-700'}`}>{chat.name}</h4>
                              <span className="text-[10px] text-gray-400">{chat.time}</span>
                          </div>
                          <p className={`text-xs truncate ${chat.unread > 0 ? 'font-bold text-gray-800' : 'text-gray-500'}`}>
                              {chat.lastMsg}
                          </p>
                      </div>
                  </div>
              ))}
              
              {filteredChats.length === 0 && (
                  <div className="p-8 text-center text-gray-400 text-sm">No patients found.</div>
              )}
          </div>
      </div>

      {/* --- Chat Area --- */}
      <div className={`${!isSidebarOpen ? 'w-full' : 'hidden md:flex'} flex-1 flex flex-col bg-[#F9FAFB]`}>
          
          {/* Chat Header */}
          {activeChat ? (
              <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
                  <div className="flex items-center gap-3">
                      <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-gray-600"><FiMenu /></button>
                      <img src={activeChat.img} alt="active" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                          <h3 className="font-bold text-gray-900 text-sm">{activeChat.name}</h3>
                          <span className={`text-[10px] font-medium flex items-center gap-1 ${activeChat.status === 'online' ? 'text-green-500' : 'text-gray-400'}`}>
                              ● {activeChat.status === 'online' ? 'Online' : 'Offline'}
                          </span>
                      </div>
                  </div>
                  <div className="flex gap-4 text-gray-400">
                      <button className="hover:text-blue-600 transition-colors"><FiPhone className="text-xl" /></button>
                      <button className="hover:text-blue-600 transition-colors"><FiVideo className="text-xl" /></button>
                      <button className="hover:text-gray-600"><FiMoreVertical className="text-xl" /></button>
                  </div>
              </div>
          ) : (
             <div className="flex-1 flex items-center justify-center text-gray-400">Select a chat to start messaging</div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[#F5F7FA]">
              {activeChat?.history?.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      {msg.sender !== 'me' && (
                          <img src={activeChat.img} className="w-8 h-8 rounded-full object-cover mr-2 self-end" alt="avatar" />
                      )}
                      <div className={`max-w-[70%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm relative group
                          ${msg.sender === 'me' 
                              ? 'bg-[#4F46E5] text-white rounded-br-none' 
                              : 'bg-white text-gray-700 rounded-bl-none'}
                      `}>
                          <p>{msg.text}</p>
                          <div className={`flex items-center gap-1 text-[9px] mt-1 justify-end ${msg.sender === 'me' ? 'text-blue-200' : 'text-gray-400'}`}>
                              <span>{msg.time}</span>
                              {msg.sender === 'me' && <FiCheck className="text-xs" />}
                          </div>
                      </div>
                  </div>
              ))}
              
              {/* مؤشر الكتابة (Typing Indicator) */}
              {isTyping && (
                  <div className="flex justify-start">
                      <img src={activeChat.img} className="w-8 h-8 rounded-full object-cover mr-2 self-end" alt="avatar" />
                      <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                      </div>
                  </div>
              )}
              
              {/* عنصر مخفي لضبط السكرول */}
              <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSend} className="flex items-center gap-3 bg-gray-50 p-2 pr-3 rounded-full border border-gray-200 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <button type="button" className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-all">
                      <FiPaperclip className="text-xl" />
                  </button>
                  <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your message..." 
                    className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
                  />
                  <button 
                    type="submit" 
                    className={`p-3 rounded-full transition-all shadow-md flex items-center justify-center
                        ${inputText.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    disabled={!inputText.trim()}
                  >
                      <FiSend className="text-lg ml-0.5" />
                  </button>
              </form>
          </div>

      </div>

    </div>
  );
};

export default DoctorMessages;