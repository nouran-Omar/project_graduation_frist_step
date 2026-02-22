import React, { useState, useRef, useEffect } from 'react';
import styles from './PatientChatbot.module.css';
const chatbotIcon = '/image/chatpot.svg';
import {
  HiOutlineXMark,
  HiOutlinePaperAirplane,
  HiOutlineSparkles,
} from 'react-icons/hi2';

/* ─── Initial greeter message ───────────────────── */
const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'assistant',
    text: "Hello! I'm your PulseX Health Assistant 👋\nHow can I help you today? You can ask me about your vitals, medications, or upcoming appointments.",
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  },
];

/* ─── Mock auto-replies ─────────────────────────── */
const AUTO_REPLIES = [
  'Your heart rate of 75 bpm is within a healthy range. Keep it up! 💙',
  'Remember to stay hydrated — it helps keep your blood pressure stable.',
  'Your next appointment with Dr. Ahmed Hassan is on Feb 20 at 10:00 AM.',
  'Based on your latest readings, your blood sugar is well-controlled. Great work!',
  'I recommend completing your weekly health survey for a more accurate risk assessment.',
];

let replyIdx = 0;

/* ─────────────────────────────────────────────────── */
const PatientChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  /* Auto-scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  /* Focus input when panel opens */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 200);
  }, [isOpen]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    /* Simulate assistant reply after 1.2s */
    setTimeout(() => {
      const reply = AUTO_REPLIES[replyIdx % AUTO_REPLIES.length];
      replyIdx++;
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          text: reply,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Chat Panel ── */}
      <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}>
        {/* Header */}
        <div className={styles.panelHeader}>
          <div className={styles.headerInfo}>
            <div className={styles.headerAvatarWrap}>
              <img src={chatbotIcon} alt="Chatbot" className={styles.headerAvatar} />
              <span className={styles.onlineDot} />
            </div>
            <div>
              <p className={styles.headerName}>PulseX Assistant</p>
              <p className={styles.headerStatus}>
                <HiOutlineSparkles className={styles.sparkle} />
                AI-Powered Health Guide
              </p>
            </div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Close chatbot"
          >
            <HiOutlineXMark />
          </button>
        </div>

        {/* Messages */}
        <div className={styles.messageList}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${styles.messageRow} ${
                msg.role === 'user' ? styles.userRow : styles.assistantRow
              }`}
            >
              {msg.role === 'assistant' && (
                <div className={styles.assistantAvatar}>
                  <img src={chatbotIcon} alt="bot" className={styles.miniAvatar} />
                </div>
              )}
              <div
                className={`${styles.bubble} ${
                  msg.role === 'user' ? styles.userBubble : styles.assistantBubble
                }`}
              >
                <p className={styles.bubbleText}>{msg.text}</p>
                <span className={styles.bubbleTime}>{msg.time}</span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className={`${styles.messageRow} ${styles.assistantRow}`}>
              <div className={styles.assistantAvatar}>
                <img src={chatbotIcon} alt="bot" className={styles.miniAvatar} />
              </div>
              <div className={`${styles.bubble} ${styles.assistantBubble} ${styles.typingBubble}`}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className={styles.inputRow}>
          <textarea
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your health…"
            rows={1}
          />
          <button
            className={`${styles.sendBtn} ${input.trim() ? styles.sendBtnActive : ''}`}
            onClick={sendMessage}
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <HiOutlinePaperAirplane />
          </button>
        </div>
      </div>

      {/* ── Floating Trigger Button ── */}
      <button
        className={`${styles.fab} ${isOpen ? styles.fabActive : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle health chatbot"
      >
        {isOpen ? (
      < span></span>
        ) : (
          <img src={chatbotIcon} alt="Chat" className={styles.fabImg} />
        )}
        {!isOpen && <span className={styles.fabPing} />}
      </button>
    </>
  );
};

export default PatientChatbot;