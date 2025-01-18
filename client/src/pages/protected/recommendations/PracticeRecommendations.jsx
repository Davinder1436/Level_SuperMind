import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Star,
  Clock,
  CalendarDays,
  ChevronRight,
  Moon,
  Sun,
  Heart,
  Timer,
  Brain,
  ScrollText,
  Check,
  Trophy,
  Flower,
} from "lucide-react";

// Practice Card Component
const PracticeCard = ({ practice }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTracking, setIsTracking] = useState(practice.isTracking);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-16 h-16 ${practice.color} rounded-xl flex items-center justify-center border-2 border-[#151616]`}>
            <practice.icon className="w-8 h-8 text-[#151616]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#151616] mb-1">
              {practice.name}
            </h3>
            <div className="flex items-center gap-4 text-[#151616]/70 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {practice.duration}
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {practice.frequency}
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-[#D6F32F]/10 rounded-lg"
            onClick={() => setIsExpanded(!isExpanded)}>
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}>
              <ChevronRight className="w-5 h-5 text-[#151616]" />
            </motion.div>
          </motion.button>
        </div>

        <div className="flex gap-2 mb-4">
          {practice.benefits.map((benefit, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#D6F32F]/10 rounded-full text-sm text-[#151616]">
              {benefit}
            </span>
          ))}
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-4">
              <p className="text-[#151616]/70">{practice.description}</p>

              {/* Instructions */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#151616]">How to Practice:</h4>
                {practice.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 bg-[#D6F32F]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-[#151616]">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-[#151616]/70">{instruction}</p>
                  </div>
                ))}
              </div>

              {/* Progress Tracking */}
              <div className="flex items-center justify-between pt-4 border-t border-[#151616]/10">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#151616]/70" />
                  <span className="text-sm text-[#151616]/70">
                    Track your progress
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsTracking(!isTracking)}
                  className={`px-4 py-2 rounded-xl border-2 border-[#151616] 
                    shadow-[4px_4px_0px_0px_#151616] hover:shadow-[2px_2px_0px_0px_#151616] 
                    hover:translate-x-[2px] hover:translate-y-[2px] transition-all
                    flex items-center gap-2 ${
                      isTracking ? "bg-[#D6F32F]" : "bg-white"
                    }`}>
                  {isTracking ? <Check className="w-4 h-4" /> : null}
                  <span className="font-medium">
                    {isTracking ? "Tracking" : "Start Tracking"}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const PracticeRecommendations = () => {
  const userProfile = {
    sign: "Leo",
    element: "Fire",
    planet: "Sun",
  };

  const recommendedPractices = [
    {
      name: "Solar Meditation",
      icon: Sun,
      color: "bg-[#FFE8EC]",
      duration: "20 mins",
      frequency: "Daily",
      benefits: ["Focus", "Energy", "Clarity"],
      description:
        "A powerful meditation practice that harnesses solar energy to enhance your natural Leo qualities.",
      instructions: [
        "Find a quiet space with natural sunlight",
        "Sit comfortably with your back straight",
        "Focus on your breath and visualize golden light",
        "End with gratitude practice",
      ],
      isTracking: false,
    },
    {
      name: "Heart Chakra Healing",
      icon: Heart,
      color: "bg-[#FFF4E8]",
      duration: "15 mins",
      frequency: "3x Weekly",
      benefits: ["Love", "Balance", "Healing"],
      description:
        "A heart-centered practice to balance emotions and enhance self-love.",
      instructions: [
        "Create a sacred space",
        "Place hand over heart center",
        "Practice loving-kindness meditation",
        "Journal your experiences",
      ],
      isTracking: true,
    },
    {
      name: "Mind Training",
      icon: Brain,
      color: "bg-[#E8F4FF]",
      duration: "10 mins",
      frequency: "Daily",
      benefits: ["Wisdom", "Clarity", "Focus"],
      description:
        "Mental exercises to enhance intuition and decision-making abilities.",
      instructions: [
        "Start with breath awareness",
        "Practice mindfulness techniques",
        "Engage in visualization",
        "End with reflection",
      ],
      isTracking: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-2">
          <Flower className="w-5 h-5 text-[#151616]" />
          <span className="text-[#151616]/70">Practice Recommendations</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-[#151616]">Daily Practices</h1>
      </div>

      {/* User Profile Summary */}
      <div className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#D6F32F] rounded-xl flex items-center justify-center border-2 border-[#151616]">
            <Star className="w-6 h-6 text-[#151616]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#151616] mb-1">
              Personalized for {userProfile.sign}
            </h2>
            <div className="flex items-center gap-4 text-[#151616]/70">
              <div className="flex items-center gap-1">
                <Sun className="w-4 h-4" />
                {userProfile.planet} Ruled
              </div>
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                {userProfile.element} Element
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-[#151616]" />
            <h3 className="font-bold text-[#151616]">Current Streak</h3>
          </div>
          <p className="text-3xl font-bold text-[#151616]">7 Days</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-5 h-5 text-[#151616]" />
            <h3 className="font-bold text-[#151616]">Practices Completed</h3>
          </div>
          <p className="text-3xl font-bold text-[#151616]">24</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 mb-3">
            <Timer className="w-5 h-5 text-[#151616]" />
            <h3 className="font-bold text-[#151616]">Practice Time</h3>
          </div>
          <p className="text-3xl font-bold text-[#151616]">6.5 hrs</p>
        </motion.div>
      </div>

      {/* Guidelines Box */}
      <div className="bg-[#D6F32F]/20 rounded-xl p-4 border-2 border-[#151616]">
        <div className="flex items-start gap-3">
          <ScrollText className="w-5 h-5 text-[#151616] mt-0.5" />
          <div>
            <h3 className="font-bold text-[#151616] mb-1">
              Practice Guidelines
            </h3>
            <p className="text-[#151616]/70">
              These practices are specifically chosen to enhance your Leo
              qualities. Start with the basic level and gradually increase
              duration and complexity as you progress.
            </p>
          </div>
        </div>
      </div>

      {/* Practice Cards */}
      <div className="space-y-6">
        {recommendedPractices.map((practice, index) => (
          <PracticeCard key={index} practice={practice} />
        ))}
      </div>

      {/* Additional Tips */}
      <div className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
        <h3 className="text-xl font-bold text-[#151616] mb-4">Practice Tips</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Moon className="w-4 h-4 text-[#151616]" />
            </div>
            <div>
              <h4 className="font-bold text-[#151616] mb-1">Best Time</h4>
              <p className="text-[#151616]/70">
                Morning practices are most effective for Leo energy. Try to
                maintain consistency in timing.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 text-[#151616]" />
            </div>
            <div>
              <h4 className="font-bold text-[#151616] mb-1">Environment</h4>
              <p className="text-[#151616]/70">
                Create a dedicated space for your practices. Include elements
                that resonate with fire energy.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 text-[#151616]" />
            </div>
            <div>
              <h4 className="font-bold text-[#151616] mb-1">Mindset</h4>
              <p className="text-[#151616]/70">
                Approach each practice with intention and confidence. Your Leo
                energy thrives on purposeful action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeRecommendations;
