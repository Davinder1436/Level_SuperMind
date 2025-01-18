import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Star,
  Heart,
  Sparkles,
  Calendar,
  TrendingUp,
  Gem,
  Flame,
  Droplet,
  Wind,
  Mountain,
  Activity,
  Navigation,
  Clock,
  RefreshCcw,
} from "lucide-react";

// User's Zodiac Sign Component
const UserZodiacSign = ({ sign, date, element, icon: Icon }) => (
  <div className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 bg-[#D6F32F]/20 rounded-xl flex items-center justify-center border-2 border-[#151616]">
        <Icon className="w-8 h-8 text-[#151616]" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-[#151616]">{sign}</h2>
        <div className="flex items-center gap-4 text-[#151616]/70">
          <span>{date}</span>
          <div className="flex items-center gap-1">
            <span>•</span>
            <Icon className="w-4 h-4" />
            <span>{element} Sign</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Prediction Card Component
const PredictionCard = ({ icon: Icon, title, description, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
    <div
      className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center border-2 border-[#151616] mb-4`}>
      <Icon className="w-6 h-6 text-[#151616]" />
    </div>
    <h3 className="font-bold text-lg text-[#151616] mb-2">{title}</h3>
    <p className="text-[#151616]/70">{description}</p>
  </motion.div>
);

// Time Period Selector Component
const TimePeriodSelector = ({ selectedPeriod, onSelectPeriod }) => {
  const periods = ["Today", "Week", "Month", "Year"];

  return (
    <div className="flex space-x-2 p-1 bg-[#151616]/5 rounded-xl">
      {periods.map((period) => (
        <motion.button
          key={period}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectPeriod(period)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            selectedPeriod === period
              ? "bg-white border-2 border-[#151616] shadow-[2px_2px_0px_0px_#151616]"
              : "text-[#151616]/70 hover:bg-white/50"
          }`}>
          {period}
        </motion.button>
      ))}
    </div>
  );
};

// Compatibility Card Component
const CompatibilityCard = ({ sign, percentage, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white rounded-xl p-4 border-2 border-[#151616]">
    <div className="flex items-center justify-between mb-2">
      <h4 className="font-bold text-[#151616]">{sign}</h4>
      <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-sm">
        <TrendingUp className="w-4 h-4" />
        {percentage}%
      </div>
    </div>
    <p className="text-sm text-[#151616]/70">{description}</p>
  </motion.div>
);

const HoroscopePage = () => {
  // This would come from user's profile/backend
  const userZodiacData = {
    sign: "Leo",
    date: "Jul 23 - Aug 22",
    element: "Fire",
    icon: Flame,
  };

  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [lastUpdated, setLastUpdated] = useState("2 hours ago");

  return (
    <div className="space-y-8">
      {/* Header with Last Updated */}
      <div className="flex justify-between items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-[#151616]" />
            <span className="text-[#151616]/70">Your Horoscope</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-[#151616]">Daily Insights</h1>
        </div>
        <div className="flex items-center gap-2 text-[#151616]/70 bg-white px-3 py-1.5 rounded-xl border-2 border-[#151616]">
          <RefreshCcw className="w-4 h-4" />
          <span>Updated {lastUpdated}</span>
        </div>
      </div>

      {/* User's Zodiac Sign Card */}
      <UserZodiacSign {...userZodiacData} />

      {/* Time Period Selector and Current Date */}
      <div className="flex justify-between items-center">
        <TimePeriodSelector
          selectedPeriod={selectedPeriod}
          onSelectPeriod={setSelectedPeriod}
        />
        <div className="flex items-center gap-2 text-[#151616]/70">
          <Calendar className="w-5 h-5" />
          <span>January 18, 2025</span>
        </div>
      </div>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PredictionCard
          icon={Heart}
          title="Love & Relationships"
          description="A powerful day for deepening connections. Express your feelings openly and watch relationships flourish."
          color="bg-[#FFE8EC]"
        />
        <PredictionCard
          icon={Activity}
          title="Career & Goals"
          description="Professional opportunities arise. Your innovative ideas will be well-received by colleagues."
          color="bg-[#E8F4FF]"
        />
        <PredictionCard
          icon={Sparkles}
          title="Personal Growth"
          description="Focus on self-improvement. Meditation and reflection will bring valuable insights."
          color="bg-[#E8FFE8]"
        />
      </div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lucky Elements */}
        <div className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <h2 className="text-xl font-bold text-[#151616] mb-4">
            Lucky Elements
          </h2>
          <div className="space-y-4">
            <motion.div
              whileHover={{ x: 5 }}
              className="p-4 rounded-xl bg-[#E8F4FF] border-2 border-[#151616]">
              <div className="flex items-center gap-2 mb-2">
                <Navigation className="w-5 h-5 text-[#151616]" />
                <span className="font-bold text-[#151616]">Direction</span>
              </div>
              <p className="text-[#151616]/70">
                North-East brings prosperity today
              </p>
            </motion.div>
            <motion.div
              whileHover={{ x: 5 }}
              className="p-4 rounded-xl bg-[#FFE8EC] border-2 border-[#151616]">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-[#151616]" />
                <span className="font-bold text-[#151616]">Lucky Hours</span>
              </div>
              <p className="text-[#151616]/70">
                10 AM - 2 PM are most favorable
              </p>
            </motion.div>
            <motion.div
              whileHover={{ x: 5 }}
              className="p-4 rounded-xl bg-[#E8FFE8] border-2 border-[#151616]">
              <div className="flex items-center gap-2 mb-2">
                <Gem className="w-5 h-5 text-[#151616]" />
                <span className="font-bold text-[#151616]">Lucky Gem</span>
              </div>
              <p className="text-[#151616]/70">Ruby will enhance your energy</p>
            </motion.div>
          </div>
        </div>

        {/* Compatibility */}
        <div className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <h2 className="text-xl font-bold text-[#151616] mb-4">
            Best Matches
          </h2>
          <div className="space-y-4">
            <CompatibilityCard
              sign="Aries"
              percentage="95"
              description="Perfect for romance and creative collaboration"
            />
            <CompatibilityCard
              sign="Sagittarius"
              percentage="88"
              description="Great energy for friendship and adventure"
            />
            <CompatibilityCard
              sign="Gemini"
              percentage="82"
              description="Excellent for intellectual pursuits"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoroscopePage;
