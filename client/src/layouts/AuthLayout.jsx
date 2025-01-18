import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import { Bot, Star, Sparkles, Moon } from "lucide-react";

// Background Decoration Component
const BackgroundDecoration = ({ className, delay = 0 }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay,
    }}
  />
);

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FFFFF4] relative overflow-hidden flex flex-col justify-center py-12 px-4">
      {/* Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(#151616 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            opacity: "0.1",
          }}
        />
      </div>

      {/* Decorative Elements */}
      <BackgroundDecoration
        className="top-20 right-20 w-20 h-20 bg-[#D6F32F] rounded-full opacity-20"
        delay={0}
      />
      <BackgroundDecoration
        className="bottom-40 left-20 w-16 h-16 bg-[#D6F32F] rounded-full opacity-10"
        delay={1}
      />
      <BackgroundDecoration className="top-40 left-1/4 text-4xl">
        ✨
      </BackgroundDecoration>
      <motion.div
        className="absolute bottom-20 right-1/4 text-4xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        🌟
      </motion.div>

      {/* Logo */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 bg-[#D6F32F] rounded-xl flex items-center justify-center 
            border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
            <Bot className="w-8 h-8 text-[#151616]" />
          </div>
          <h1 className="text-2xl font-bold text-[#151616]">SoulBuddy</h1>
          <div className="flex items-center gap-2 bg-[#D6F32F]/20 px-3 py-1 rounded-full border-2 border-[#151616]">
            <Star className="w-4 h-4 text-[#151616]" />
            <span className="text-sm text-[#151616]">
              AI Spiritual Guidance
            </span>
          </div>
        </motion.div>
      </div>

      {/* Auth Content */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <Outlet />
        </motion.div>

        {/* Auth Footer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center">
          <p className="text-sm text-[#151616]/70">
            By continuing, you agree to our{" "}
            <a
              href="/terms"
              className="font-medium text-[#151616] hover:text-[#151616]/70 
                underline decoration-[#D6F32F] decoration-2 underline-offset-2">
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="font-medium text-[#151616] hover:text-[#151616]/70 
                underline decoration-[#D6F32F] decoration-2 underline-offset-2">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>

      {/* Additional Elements */}
      <div className="fixed bottom-6 right-6">
        <motion.div
          whileHover={{ y: -2 }}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-[#151616] 
            shadow-[4px_4px_0px_0px_#151616]">
          <Moon className="w-4 h-4 text-[#151616]" />
          <span className="text-sm font-medium text-[#151616]">
            Welcome Back
          </span>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
