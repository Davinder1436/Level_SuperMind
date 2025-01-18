import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Infinity,
  Star,
  Clock,
  CalendarDays,
  ChevronRight,
  Moon,
  Sun,
  Sparkles,
  Timer,
  ScrollText,
} from "lucide-react";

// Ritual Card Component
const RitualCard = ({ ritual }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-16 h-16 ${ritual.color} rounded-xl flex items-center justify-center border-2 border-[#151616]`}>
            <Infinity className="w-8 h-8 text-[#151616]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#151616] mb-1">
              {ritual.name}
            </h3>
            <div className="flex items-center gap-4 text-[#151616]/70 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {ritual.duration}
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="w-4 h-4" />
                {ritual.frequency}
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
          {ritual.benefits.map((benefit, index) => (
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
              <p className="text-[#151616]/70">{ritual.description}</p>

              {/* Steps */}
              <div className="space-y-3">
                <h4 className="font-bold text-[#151616]">Steps to Follow:</h4>
                {ritual.steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 bg-[#D6F32F]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-[#151616]">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-[#151616]/70">{step}</p>
                  </div>
                ))}
              </div>

              {/* Best Time */}
              <div className="flex items-start gap-3 p-4 bg-[#D6F32F]/10 rounded-xl">
                <Timer className="w-5 h-5 text-[#151616] mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#151616] mb-1">Best Time</h4>
                  <p className="text-[#151616]/70">{ritual.bestTime}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const RitualRecommendations = () => {
  const userProfile = {
    sign: "Leo",
    element: "Fire",
    planet: "Sun",
  };

  const recommendedRituals = [
    {
      name: "Sun Salutation",
      color: "bg-[#FFE8EC]",
      duration: "15-20 mins",
      frequency: "Daily",
      benefits: ["Energy", "Vitality", "Focus"],
      description:
        "A powerful morning ritual that aligns your energy with the Sun, perfect for Leo's ruled by the Solar force.",
      steps: [
        "Face the rising sun in the east",
        "Begin with a moment of gratitude",
        "Perform 12 rounds of Surya Namaskar",
        "End with solar meditation",
      ],
      bestTime: "Perform during sunrise, ideally between 6:00 AM - 7:00 AM",
    },
    {
      name: "Fire Meditation",
      color: "bg-[#FFF4E8]",
      duration: "30 mins",
      frequency: "Weekly",
      benefits: ["Purification", "Transformation", "Clarity"],
      description:
        "A transformative ritual using fire element to enhance your natural Leo qualities.",
      steps: [
        "Set up a sacred space with a candle",
        "Begin with deep breathing exercises",
        "Focus on the flame while meditating",
        "Close with gratitude practice",
      ],
      bestTime: "Best performed during sunset or after dark",
    },
    {
      name: "Lion's Breath Practice",
      color: "bg-[#E8F4FF]",
      duration: "10 mins",
      frequency: "Daily",
      benefits: ["Confidence", "Expression", "Release"],
      description:
        "A powerful breathing technique that embodies the strength and courage of Leo.",
      steps: [
        "Sit in a comfortable position",
        "Take deep breaths through the nose",
        "Exhale forcefully through the mouth",
        "Express sound like a lion's roar",
      ],
      bestTime: "Practice during midday when the sun is at its peak",
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
          <Infinity className="w-5 h-5 text-[#151616]" />
          <span className="text-[#151616]/70">Ritual Recommendations</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-[#151616]">Sacred Rituals</h1>
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

      {/* Guidelines Box */}
      <div className="bg-[#D6F32F]/20 rounded-xl p-4 border-2 border-[#151616]">
        <div className="flex items-start gap-3">
          <ScrollText className="w-5 h-5 text-[#151616] mt-0.5" />
          <div>
            <h3 className="font-bold text-[#151616] mb-1">Ritual Guidelines</h3>
            <p className="text-[#151616]/70">
              These rituals are designed to align with your Leo energy and solar
              influences. Consistency is key - try to maintain regular practice
              for best results.
            </p>
          </div>
        </div>
      </div>

      {/* Time of Day Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 mb-3">
            <Sun className="w-5 h-5 text-[#151616]" />
            <h3 className="font-bold text-[#151616]">Morning Rituals</h3>
          </div>
          <p className="text-[#151616]/70">
            Best performed at sunrise for maximum solar energy absorption
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-[#151616]" />
            <h3 className="font-bold text-[#151616]">Midday Practices</h3>
          </div>
          <p className="text-[#151616]/70">
            Ideal for power rituals when the sun is at its peak
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 mb-3">
            <Moon className="w-5 h-5 text-[#151616]" />
            <h3 className="font-bold text-[#151616]">Evening Rituals</h3>
          </div>
          <p className="text-[#151616]/70">
            Perfect for reflection and energy balancing practices
          </p>
        </motion.div>
      </div>

      {/* Ritual Cards */}
      <div className="space-y-6">
        {recommendedRituals.map((ritual, index) => (
          <RitualCard key={index} ritual={ritual} />
        ))}
      </div>

      {/* Additional Notes */}
      <div className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
        <h3 className="text-xl font-bold text-[#151616] mb-4">
          Important Notes
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Moon className="w-4 h-4 text-[#151616]" />
            </div>
            <div>
              <h4 className="font-bold text-[#151616] mb-1">
                Lunar Influences
              </h4>
              <p className="text-[#151616]/70">
                While Leo is solar-ruled, consider moon phases when planning
                your ritual schedule.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-[#151616]" />
            </div>
            <div>
              <h4 className="font-bold text-[#151616] mb-1">Sacred Space</h4>
              <p className="text-[#151616]/70">
                Always perform rituals in a clean, dedicated space facing east
                for optimal energy flow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RitualRecommendations;
