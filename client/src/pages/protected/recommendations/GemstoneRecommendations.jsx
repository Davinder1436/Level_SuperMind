import React, { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import { Gem, Loader, Calendar, Star } from "lucide-react";

const zodiacData = {
  "21.3-19.4": {
    "Zodiac Sign": "Aries",
    "Ruling Planet": "Mars",
    Gemstones: [
      { Gemstone: "Red Coral", Description: "Enhances courage and vitality." },
      {
        Gemstone: "Bloodstone",
        Description: "Promotes strength and endurance.",
      },
    ],
  },
  "20.4-20.5": {
    "Zodiac Sign": "Taurus",
    "Ruling Planet": "Venus",
    Gemstones: [
      { Gemstone: "Emerald", Description: "Brings prosperity and harmony." },
      { Gemstone: "Lapis Lazuli", Description: "Encourages wisdom and truth." },
    ],
  },
  "21.5-20.6": {
    "Zodiac Sign": "Gemini",
    "Ruling Planet": "Mercury",
    Gemstones: [
      {
        Gemstone: "Agate",
        Description: "Improves communication and intellect.",
      },
      {
        Gemstone: "Citrine",
        Description: "Stimulates creativity and mental clarity.",
      },
    ],
  },
  "21.6-22.7": {
    "Zodiac Sign": "Cancer",
    "Ruling Planet": "Moon",
    Gemstones: [
      {
        Gemstone: "Pearl",
        Description: "Enhances emotional balance and intuition.",
      },
      {
        Gemstone: "Moonstone",
        Description: "Promotes inner growth and strength.",
      },
    ],
  },
  "23.7-22.8": {
    "Zodiac Sign": "Leo",
    "Ruling Planet": "Sun",
    Gemstones: [
      { Gemstone: "Ruby", Description: "Boosts confidence and vitality." },
      {
        Gemstone: "Peridot",
        Description: "Encourages abundance and prosperity.",
      },
    ],
  },
  "23.8-22.9": {
    "Zodiac Sign": "Virgo",
    "Ruling Planet": "Mercury",
    Gemstones: [
      {
        Gemstone: "Sapphire",
        Description: "Enhances wisdom and mental clarity.",
      },
      {
        Gemstone: "Carnelian",
        Description: "Promotes creativity and motivation.",
      },
    ],
  },
  "23.9-22.10": {
    "Zodiac Sign": "Libra",
    "Ruling Planet": "Venus",
    Gemstones: [
      { Gemstone: "Opal", Description: "Encourages love and passion." },
      { Gemstone: "Peridot", Description: "Brings harmony and balance." },
    ],
  },
  "23.10-21.11": {
    "Zodiac Sign": "Scorpio",
    "Ruling Planet": "Mars",
    Gemstones: [
      { Gemstone: "Topaz", Description: "Enhances strength and courage." },
      {
        Gemstone: "Aquamarine",
        Description: "Promotes emotional healing and clarity.",
      },
    ],
  },
  "22.11-21.12": {
    "Zodiac Sign": "Sagittarius",
    "Ruling Planet": "Jupiter",
    Gemstones: [
      {
        Gemstone: "Turquoise",
        Description: "Encourages optimism and good fortune.",
      },
      {
        Gemstone: "Amethyst",
        Description: "Promotes spiritual growth and tranquility.",
      },
    ],
  },
  "22.12-19.1": {
    "Zodiac Sign": "Capricorn",
    "Ruling Planet": "Saturn",
    Gemstones: [
      {
        Gemstone: "Garnet",
        Description: "Enhances determination and perseverance.",
      },
      { Gemstone: "Onyx", Description: "Provides strength and support." },
    ],
  },
  "20.1-18.2": {
    "Zodiac Sign": "Aquarius",
    "Ruling Planet": "Uranus",
    Gemstones: [
      {
        Gemstone: "Amethyst",
        Description: "Promotes spiritual awareness and intuition.",
      },
      { Gemstone: "Garnet", Description: "Encourages passion and energy." },
    ],
  },
  "19.2-20.3": {
    "Zodiac Sign": "Pisces",
    "Ruling Planet": "Neptune",
    Gemstones: [
      {
        Gemstone: "Aquamarine",
        Description: "Enhances intuition and emotional healing.",
      },
      { Gemstone: "Jade", Description: "Promotes serenity and balance." },
    ],
  },
};

const getZodiacSign = (dobString) => {
  // Parse the date string (format: YYYY-MM-DD)
  const [year, month, day] = dobString.split("-").map(Number);
  const monthDay = `${day}.${month}`;

  // Find matching zodiac sign
  for (const [dateRange, data] of Object.entries(zodiacData)) {
    const [start, end] = dateRange.split("-");
    const [startDay, startMonth] = start.split(".").map(Number);
    const [endDay, endMonth] = end.split(".").map(Number);

    // Handle special case for Capricorn (across year boundary)
    if (endMonth < startMonth) {
      if (
        (month === startMonth && day >= startDay) ||
        (month === 12 && day >= startDay) ||
        (month === 1 && day <= endDay)
      ) {
        return data;
      }
    } else {
      // Normal case
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)
      ) {
        return data;
      }
    }
  }
  return null;
};

const GemstoneCard = ({ gemstone, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl p-6 border-2 border-gray-900 shadow-[4px_4px_0px_0px_#151616]">
    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center border-2 border-gray-900 mb-4">
      <Gem className="w-6 h-6 text-purple-600" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{gemstone}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const GemstoneRecommendations = () => {
  const { user } = useAuth();
  const [zodiacInfo, setZodiacInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.dob) {
      const info = getZodiacSign(user.dob);
      setZodiacInfo(info);
    }
    setIsLoading(false);
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 animate-spin text-gray-900" />
      </div>
    );
  }

  if (!user?.dob || !zodiacInfo) {
    return (
      <div className="text-center p-8 bg-white rounded-xl border-2 border-gray-900 shadow-[4px_4px_0px_0px_#151616]">
        <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-900" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Birth Details Required
        </h3>
        <p className="text-gray-600">
          Please ensure your profile has your complete birth details to receive
          personalized gemstone recommendations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-2">
          <Star className="w-5 h-5 text-gray-900" />
          <span className="text-gray-600">Personalized Recommendations</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Your Gemstone Guide
        </h1>
      </div>

      {/* Zodiac Information */}
      <div className="bg-white rounded-xl p-6 border-2 border-gray-900 shadow-[4px_4px_0px_0px_#151616] mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center border-2 border-gray-900">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {zodiacInfo["Zodiac Sign"]}
            </h2>
            <p className="text-gray-600">
              Ruled by {zodiacInfo["Ruling Planet"]}
            </p>
          </div>
        </div>
        <p className="text-gray-600">
          Based on your birth date: {new Date(user.dob).toLocaleDateString()}
        </p>
      </div>

      {/* Gemstone Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {zodiacInfo.Gemstones.map((gem, index) => (
          <GemstoneCard
            key={index}
            gemstone={gem.Gemstone}
            description={gem.Description}
          />
        ))}
      </div>
    </div>
  );
};

export default GemstoneRecommendations;
