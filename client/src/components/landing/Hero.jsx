import React from "react";
import { motion } from "framer-motion";
import {
  Moon,
  Stars,
  Sparkles,
  ArrowRight,
  Flower,
  ScrollText,
} from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-6 rounded-2xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#151616] transition-all duration-200">
    <div className="w-12 h-12 bg-[#D6F32F] rounded-xl border-2 border-[#151616] flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#151616]" />
    </div>
    <h3 className="text-lg font-bold text-[#151616] mb-2">{title}</h3>
    <p className="text-[#151616]/70">{description}</p>
  </motion.div>
);

const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ y: 10 }}
    animate={{ y: -10 }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay,
    }}>
    {children}
  </motion.div>
);

const Hero = () => {
  return (
    <div className="min-h-screen bg-[#FFFFF4] relative overflow-hidden pt-12">
      {/* Background Pattern */}
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

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingElement delay={0.2}>
          <Stars className="absolute top-20 left-1/4 w-8 h-8 text-[#D6F32F]" />
        </FloatingElement>
        <FloatingElement delay={0.4}>
          <Moon className="absolute top-40 right-1/4 w-8 h-8 text-[#151616]" />
        </FloatingElement>
        <FloatingElement delay={0.6}>
          <Flower className="absolute bottom-20 left-1/3 w-8 h-8 text-[#D6F32F]" />
        </FloatingElement>
      </div>

      <div className="container mx-auto px-6">
        {/* Header Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <motion.div
            className="inline-flex items-center gap-2 bg-[#151616] text-white rounded-full px-4 py-2 mb-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#D6F32F]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}>
            <motion.div
              className="w-2 h-2 bg-[#D6F32F] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-sm font-medium">
              AI-Powered Spiritual Guide
            </span>
          </motion.div>

          <h1 className="text-7xl font-black text-[#151616] mb-6">
            Your Personal
            <div className="relative inline-block mx-2">
              <span className="relative z-10">Spiritual</span>
              <motion.div
                className="absolute bottom-2 left-0 right-0 h-4 bg-[#D6F32F] -z-10"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>
            Guide
          </h1>

          <p className="text-xl text-[#151616]/70 mb-8 max-w-2xl mx-auto">
            Discover your path to enlightenment with personalized astrological
            insights, meditation guidance, and spiritual recommendations powered
            by AI.
          </p>

          <div className="flex gap-4 justify-center">
            <motion.button
              className="bg-[#D6F32F] px-8 py-4 rounded-2xl text-xl font-bold text-[#151616] border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#151616] transition-all duration-200 flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="px-8 py-4 rounded-2xl text-xl font-bold border-2 border-[#151616] hover:bg-[#151616]/5 transition-all duration-200 text-[#151616] shadow-[4px_4px_0px_0px_#D6F32F]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}>
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <FeatureCard
            icon={Stars}
            title="Personal Horoscope"
            description="Daily astrological insights tailored to your birth chart and current planetary positions."
            delay={0.2}
          />
          <FeatureCard
            icon={Sparkles}
            title="Spiritual Practices"
            description="Customized meditation, rituals, and wellness recommendations for your spiritual journey."
            delay={0.4}
          />
          <FeatureCard
            icon={ScrollText}
            title="AI Guidance"
            description="24/7 spiritual guidance powered by advanced AI, answering your deepest questions."
            delay={0.6}
          />
        </div>

        {/* Bottom Decoration */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}>
          <div className="inline-flex gap-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              ✨
            </motion.div>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
              🌟
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
