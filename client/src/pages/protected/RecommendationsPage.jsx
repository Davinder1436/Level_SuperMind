import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gem,
  Infinity,
  Sparkles,
  Star,
  Moon,
  ArrowRight,
  Flower,
  Brain,
  Heart,
} from "lucide-react";

// Category Card Component
const RecommendationCard = ({
  icon: Icon,
  title,
  description,
  color,
  link,
}) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(link)}
      className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] cursor-pointer">
      <div
        className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center border-2 border-[#151616] mb-6`}>
        <Icon className="w-8 h-8 text-[#151616]" />
      </div>
      <h3 className="text-xl font-bold text-[#151616] mb-2">{title}</h3>
      <p className="text-[#151616]/70 mb-4">{description}</p>
      <motion.div
        className="flex items-center gap-2 text-[#151616] font-medium"
        whileHover={{ x: 5 }}>
        Explore <ArrowRight className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
};

// User Sign Summary Component
const UserSignSummary = ({ sign, element, planet }) => (
  <div className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-[#D6F32F] rounded-xl flex items-center justify-center border-2 border-[#151616]">
        <Star className="w-6 h-6 text-[#151616]" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-[#151616]">{sign}</h2>
        <div className="flex items-center gap-4 text-[#151616]/70">
          <div className="flex items-center gap-1">
            <Flower className="w-4 h-4" />
            {element} Element
          </div>
          <div className="flex items-center gap-1">
            <Moon className="w-4 h-4" />
            {planet} Ruled
          </div>
        </div>
      </div>
    </div>
    <p className="text-[#151616]/70">
      Based on your astrological profile, we've curated specific recommendations
      to enhance your spiritual journey.
    </p>
  </div>
);

const RecommendationsPage = () => {
  // This would come from user's profile/backend
  const userProfile = {
    sign: "Leo",
    element: "Fire",
    planet: "Sun",
  };

  const recommendations = [
    {
      icon: Gem,
      title: "Gemstones",
      description:
        "Discover powerful gemstones that resonate with your energy and enhance your spiritual journey.",
      color: "bg-[#FFE8EC]",
      link: "/recommendations/gemstones",
    },
    {
      icon: Infinity,
      title: "Rituals",
      description:
        "Explore sacred rituals and practices aligned with your astrological profile.",
      color: "bg-[#E8F4FF]",
      link: "/recommendations/rituals",
    },
    {
      icon: Sparkles,
      title: "Practices",
      description:
        "Learn daily spiritual practices that can help you maintain balance and harmony.",
      color: "bg-[#E8FFE8]",
      link: "/recommendations/practices",
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
          <Star className="w-5 h-5 text-[#151616]" />
          <span className="text-[#151616]/70">
            Personalized Recommendations
          </span>
        </motion.div>
        <h1 className="text-3xl font-bold text-[#151616]">
          Spiritual Guidance
        </h1>
      </div>

      {/* User Sign Summary */}
      <UserSignSummary {...userProfile} />

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 text-[#151616]">
            <Brain className="w-5 h-5" />
            <h3 className="font-bold">Spiritual Level</h3>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#151616]">Advanced</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 text-[#151616]">
            <Heart className="w-5 h-5" />
            <h3 className="font-bold">Energy Balance</h3>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#151616]">92%</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 text-[#151616]">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold">Active Practices</h3>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#151616]">7 Daily</span>
          </div>
        </motion.div>
      </div>

      {/* Recommendation Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((rec, index) => (
          <RecommendationCard key={index} {...rec} />
        ))}
      </div>
    </div>
  );
};

export default RecommendationsPage;
