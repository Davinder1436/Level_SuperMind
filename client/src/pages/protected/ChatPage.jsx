import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Copy,
  Check,
  Star,
  Moon,
  Heart,
  Infinity,
  Flower,
  RefreshCw,
  Info,
  WifiOff,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

// Message Bubble Component
const MessageBubble = ({ message }) => {
  const [isCopied, setIsCopied] = useState(false);
  const isUser = message.type === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Custom components for markdown styling
  const components = {
    p: ({ children }) => (
      <p className="text-[#151616] leading-relaxed">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold text-[#151616] my-3">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold text-[#151616] my-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold text-[#151616] my-2">{children}</h3>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside my-2 space-y-1">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside my-2 space-y-1">{children}</ol>
    ),
    li: ({ children }) => <li className="text-[#151616]">{children}</li>,
    code: ({ children }) => (
      <code className="bg-[#151616]/10 rounded px-1 py-0.5 font-mono text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-[#151616]/10 rounded-lg p-3 my-2 overflow-x-auto">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#151616]/20 pl-4 my-2 italic">
        {children}
      </blockquote>
    ),
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
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`w-10 h-10 rounded-xl flex-shrink-0 border-2 border-[#151616] flex items-center justify-center
            ${isUser ? "bg-[#D6F32F]" : "bg-[#151616]"}`}>
          {isUser ? (
            <User className="w-5 h-5 text-[#151616]" />
          ) : (
            <Flower className="w-5 h-5 text-[#D6F32F]" />
          )}
        </motion.div>

        <div
          className={`group relative p-4 rounded-xl border-2 border-[#151616] 
          ${isUser ? "bg-[#D6F32F]/20" : "bg-white"}
          hover:shadow-[4px_4px_0px_0px_#151616] transition-shadow`}>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown components={components}>
              {message.text}
            </ReactMarkdown>
          </div>
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 text-[#151616]/40" />
              <span className="text-sm text-[#151616]/60">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
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
      <Flower className="w-5 h-5 text-[#D6F32F]" />
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

// Quick Actions Component
const QuickActions = ({ onSelect }) => {
  const actions = [
    { icon: Star, text: "Daily Horoscope" },
    { icon: Moon, text: "Meditation Tips" },
    { icon: Heart, text: "Love Compatibility" },
    { icon: Infinity, text: "Spiritual Guidance" },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto py-2">
      {actions.map((action, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(action.text)}
          className="flex items-center gap-2 px-3 py-2 bg-[#D6F32F]/10 rounded-xl border-2 border-[#151616] 
            whitespace-nowrap hover:bg-[#D6F32F]/20 transition-colors">
          <action.icon className="w-4 h-4 text-[#151616]" />
          <span className="text-sm font-medium text-[#151616]">
            {action.text}
          </span>
        </motion.button>
      ))}
    </div>
  );
};

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ws, setWs] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const welcomeMessageShownRef = useRef(false);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 2000; // Start with 2 seconds

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!welcomeMessageShownRef.current) {
      setMessages([
        {
          text: "Namaste! I'm your spiritual guide, here to assist you on your journey of self-discovery and enlightenment. How may I help you today?",
          type: "response",
        },
      ]);
      welcomeMessageShownRef.current = true;
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      setError(
        "Maximum reconnection attempts reached. Please refresh the page."
      );
      return;
    }

    try {
      const wsConnection = new WebSocket(
        "wss://fc20-13-51-196-191.ngrok-free.app"
      );

      wsConnection.onopen = () => {
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
      };

      wsConnection.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "requestId") {
          setRequestId(data.requestId);
        } else if (data.type === "response") {
          setMessages((prev) => [
            ...prev,
            { text: data.message, type: "response" },
          ]);
          setIsLoading(false);
        } else if (data.type === "error") {
          setError(data.message);
          setIsLoading(false);
        }
      };

      wsConnection.onclose = () => {
        setIsConnected(false);
        // Exponential backoff for reconnection
        const delay =
          RECONNECT_DELAY * Math.pow(2, reconnectAttemptsRef.current);
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttemptsRef.current++;
          connectWebSocket();
        }, delay);
      };

      wsConnection.onerror = () => {
        setError("Connection error. Attempting to reconnect...");
        setIsLoading(false);
        wsConnection.close();
      };

      setWs(wsConnection);
    } catch (err) {
      setError("Failed to establish WebSocket connection. Retrying...");
      const delay = RECONNECT_DELAY * Math.pow(2, reconnectAttemptsRef.current);
      reconnectTimeoutRef.current = setTimeout(() => {
        reconnectAttemptsRef.current++;
        connectWebSocket();
      }, delay);
    }
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (ws) ws.close();
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connectWebSocket]);

  const handleQuickAction = (action) => {
    setInputMessage(action);
    sendMessage();
  };

  const sendMessage = useCallback(async () => {
    if (!inputMessage.trim() || !requestId || isLoading || !isConnected) return;

    try {
      setIsLoading(true);
      setError(null);
      setMessages((prev) => [...prev, { text: inputMessage, type: "user" }]);
      const user = localStorage.getItem("user");

      const response = await fetch(
        "https://fc20-13-51-196-191.ngrok-free.app/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ input_value: inputMessage + user, requestId }),
        }
      );

      if (!response.ok) throw new Error("Failed to send message");
      setInputMessage("");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [inputMessage, requestId, isLoading, isConnected]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-2">
            {!isConnected && (
              <div className="flex items-center gap-1 text-red-500 text-sm">
                <WifiOff className="w-4 h-4" />
                <span>Disconnected</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Connection Status Banner */}
      {!isConnected && (
        <div className="bg-red-50 p-4 rounded-xl border-2 border-red-200">
          <div className="flex items-start gap-3">
            <WifiOff className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <p className="text-sm text-red-700">
                Connection lost.{" "}
                {reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS
                  ? "Attempting to reconnect..."
                  : "Please refresh the page to try again."}
              </p>
              {reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS && (
                <p className="text-xs text-red-500 mt-1">
                  Attempt {reconnectAttemptsRef.current + 1} of{" "}
                  {MAX_RECONNECT_ATTEMPTS}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Container */}
      <div className="bg-white rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b-2 border-[#151616]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D6F32F] rounded-xl flex items-center justify-center border-2 border-[#151616]">
                <Flower className="w-5 h-5 text-[#151616]" />
              </div>
              <div>
                <h2 className="font-bold text-[#151616]">Divine Assistant</h2>
                <div className="flex items-center gap-2 text-sm text-[#151616]/60">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#D6F32F] rounded-full"></span>
                    Connected to Higher Wisdom
                  </span>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMessages([messages[0]])}
              className="p-2 hover:bg-[#D6F32F]/10 rounded-lg">
              <RefreshCw className="w-5 h-5 text-[#151616]" />
            </motion.button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-[#D6F32F]/10 p-4 border-b-2 border-[#151616]">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#151616] mt-0.5" />
            <p className="text-sm text-[#151616]/70">
              Ask about your spiritual journey, meditation practices,
              astrological insights, or any guidance you seek. I'm here to help
              you find clarity and peace.
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            {error && (
              <div className="mb-4 p-4 text-sm text-red-600 bg-red-50 rounded-xl border-2 border-red-200">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t-2 border-[#151616]">
            <QuickActions onSelect={handleQuickAction} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t-2 border-[#151616] bg-white">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask for spiritual guidance..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-[#151616] focus:outline-none focus:ring-2 ring-[#D6F32F]
                  disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !isConnected}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim() || !isConnected}
                className="px-6 bg-[#D6F32F] rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] 
                  hover:shadow-[2px_2px_0px_0px_#151616] hover:translate-x-[2px] hover:translate-y-[2px] transition-all
                  flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <span className="hidden md:inline font-medium">Send</span>
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
