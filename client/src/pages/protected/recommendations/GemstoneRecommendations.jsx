import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gem,
  Star,
  Heart,
  ChevronRight,
  Info,
  ShoppingBag,
  Battery,
  Sparkles,
  Moon,
} from "lucide-react";

// Gemstone Card Component
const GemstoneCard = ({ gemstone }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] overflow-hidden">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div
            className={`w-16 h-16 ${gemstone.color} rounded-xl flex items-center justify-center border-2 border-[#151616]`}>
            <Gem className="w-8 h-8 text-[#151616]" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#151616] mb-1">
              {gemstone.name}
            </h3>
            <div className="flex items-center gap-2 text-[#151616]/70 text-sm">
              <Battery className="w-4 h-4" />
              <span>Power Level: {gemstone.powerLevel}</span>
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
          {gemstone.benefits.map((benefit, index) => (
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
              <p className="text-[#151616]/70">{gemstone.description}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#151616]" />
                  <span className="text-sm text-[#151616]">
                    Best for: {gemstone.bestFor}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#151616]" />
                  <span className="text-sm text-[#151616]">
                    Usage: {gemstone.usage}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#151616]/10">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#151616]/70" />
                  <span className="text-sm text-[#151616]/70">
                    Authenticity verified
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-[#D6F32F] rounded-xl border-2 border-[#151616] 
                    shadow-[4px_4px_0px_0px_#151616] hover:shadow-[2px_2px_0px_0px_#151616] 
                    hover:translate-x-[2px] hover:translate-y-[2px] transition-all
                    flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="font-medium">Shop Now</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const GemstoneRecommendations = () => {
  const userProfile = {
    sign: "Leo",
    element: "Fire",
    planet: "Sun",
  };

  const recommendedGemstones = [
    {
      name: "Ruby",
      color: "bg-[#FFE8EC]",
      powerLevel: "Very High",
      benefits: ["Energy", "Leadership", "Confidence"],
      description:
        "Ruby is the stone of nobility, considered the most magnificent of all gems. It symbolizes the sun and its glowing hue suggests an inextinguishable flame within the stone.",
      bestFor: "Enhancing personal power and leadership abilities",
      usage: "Wear as a pendant close to the heart chakra",
    },
    {
      name: "Yellow Sapphire",
      color: "bg-[#FFF4E8]",
      powerLevel: "High",
      benefits: ["Wisdom", "Prosperity", "Spirituality"],
      description:
        "Yellow Sapphire is associated with Jupiter and brings wealth, wisdom, and spiritual growth. It helps in developing a broader perspective in life.",
      bestFor: "Academic success and spiritual development",
      usage: "Wear as a ring on the index finger",
    },
    {
      name: "Pearl",
      color: "bg-[#E8F4FF]",
      powerLevel: "Medium",
      benefits: ["Peace", "Purity", "Intuition"],
      description:
        "Pearl is associated with the Moon and helps in balancing emotions. It brings inner peace and enhances intuitive abilities.",
      bestFor: "Emotional balance and mental clarity",
      usage: "Wear as a necklace or earrings",
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
          <Gem className="w-5 h-5 text-[#151616]" />
          <span className="text-[#151616]/70">Gemstone Recommendations</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-[#151616]">
          Your Perfect Gemstones
        </h1>
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
                <Moon className="w-4 h-4" />
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

      {/* Information Note */}
      <div className="bg-[#D6F32F]/20 rounded-xl p-4 border-2 border-[#151616]">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#151616] mt-0.5" />
          <div>
            <h3 className="font-bold text-[#151616] mb-1">
              About Your Gemstones
            </h3>
            <p className="text-[#151616]/70">
              These gemstones have been carefully selected based on your
              astrological profile and current planetary positions. For best
              results, wear them during their recommended time periods.
            </p>
          </div>
        </div>
      </div>

      {/* Gemstone Cards */}
      <div className="space-y-6">
        {recommendedGemstones.map((gemstone, index) => (
          <GemstoneCard key={index} gemstone={gemstone} />
        ))}
      </div>

      {/* Additional Guidelines */}
      <div className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
        <h3 className="text-xl font-bold text-[#151616] mb-4">
          Wearing Guidelines
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Moon className="w-4 h-4 text-[#151616]" />
            </div>
            <div>
              <h4 className="font-bold text-[#151616] mb-1">
                Best Time to Start
              </h4>
              <p className="text-[#151616]/70">
                Begin wearing your gemstone during the waxing moon phase for
                optimal energy alignment.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 text-[#151616]" />
            </div>
            <div>
              <h4 className="font-bold text-[#151616] mb-1">
                Care Instructions
              </h4>
              <p className="text-[#151616]/70">
                Clean your gemstones under running water monthly and charge them
                under moonlight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GemstoneRecommendations;
