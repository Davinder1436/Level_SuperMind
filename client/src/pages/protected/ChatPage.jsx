import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  RefreshCw,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";

// Message Bubble Component
const MessageBubble = ({ message, isUser }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6`}>
      <div
        className={`flex gap-3 max-w-[80%] ${
          isUser ? "flex-row-reverse" : ""
        }`}>
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-xl flex-shrink-0 border-2 border-[#151616] flex items-center justify-center
          ${isUser ? "bg-[#D6F32F]" : "bg-[#151616]"}`}>
          {isUser ? (
            <User className="w-5 h-5 text-[#151616]" />
          ) : (
            <Bot className="w-5 h-5 text-[#D6F32F]" />
          )}
        </div>

        {/* Message Content */}
        <div
          className={`group relative p-4 rounded-xl border-2 border-[#151616] 
          ${isUser ? "bg-[#D6F32F]/20" : "bg-white"}
          hover:shadow-[4px_4px_0px_0px_#151616] transition-shadow`}>
          <p className="text-[#151616] mb-2">{message.text}</p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-[#151616]/60">{message.time}</span>
            {!isUser && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="opacity-0 group-hover:opacity-100 transition-opacity">
                {isCopied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-[#151616]/60" />
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Typing Indicator Component
const TypingIndicator = () => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-xl border-2 border-[#151616] bg-[#151616] flex items-center justify-center">
      <Bot className="w-5 h-5 text-[#D6F32F]" />
    </div>
    <div className="px-4 py-3 rounded-xl border-2 border-[#151616] bg-white">
      <div className="flex gap-2">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="w-2 h-2 bg-[#D6F32F] rounded-full"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: dot * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your spiritual guide. How can I assist you today?",
      time: "12:00 PM",
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: "I understand your spiritual journey. Let me guide you through this...",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isUser: false,
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col bg-[#FFFFF4] rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
      {/* Chat Header */}
      <div className="p-4 border-b-2 border-[#151616] bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D6F32F] rounded-xl flex items-center justify-center border-2 border-[#151616]">
              <Bot className="w-5 h-5 text-[#151616]" />
            </div>
            <div>
              <h2 className="font-bold text-[#151616]">SoulBuddy AI</h2>
              <div className="flex items-center gap-2 text-sm text-[#151616]/60">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Online
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  AI Powered
                </span>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 180 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-[#D6F32F]/10 rounded-lg"
            onClick={() => setMessages([messages[0]])}>
            <RefreshCw className="w-5 h-5 text-[#151616]" />
          </motion.button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isUser={message.isUser}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t-2 border-[#151616] bg-white">
        <div className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 px-4 py-3 rounded-xl border-2 border-[#151616] focus:outline-none focus:ring-2 ring-[#D6F32F]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="px-6 bg-[#D6F32F] rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] 
              hover:shadow-[2px_2px_0px_0px_#151616] hover:translate-x-[2px] hover:translate-y-[2px] transition-all
              flex items-center gap-2">
            <span className="hidden md:inline font-medium">Send</span>
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
