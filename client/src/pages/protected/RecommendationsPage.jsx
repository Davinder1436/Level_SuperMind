import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gem,
  Infinity,
  Flame,
  Sun,
  Sparkles,
  Star,
  Moon,
  ArrowRight,
  Flower,
  Brain,
  Heart,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] ${className}`}>
    {children}
  </div>
);

// Helper function to determine zodiac sign
const getZodiacInfo = (dob) => {
  if (!dob) return null;

  const date = new Date(dob);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const zodiacData = {
    Aries: {
      date: "Mar 21 - Apr 19",
      element: "Fire",
      ruler: "Mars",
      qualities: ["Courageous", "Energetic", "Enthusiastic"],
    },
    Taurus: {
      date: "Apr 20 - May 20",
      element: "Earth",
      ruler: "Venus",
      qualities: ["Patient", "Reliable", "Devoted"],
    },
    Gemini: {
      date: "May 21 - Jun 20",
      element: "Air",
      ruler: "Mercury",
      qualities: ["Adaptable", "Versatile", "Intellectual"],
    },
    Cancer: {
      date: "Jun 21 - Jul 22",
      element: "Water",
      ruler: "Moon",
      qualities: ["Emotional", "Intuitive", "Protective"],
    },
    Leo: {
      date: "Jul 23 - Aug 22",
      element: "Fire",
      ruler: "Sun",
      qualities: ["Creative", "Passionate", "Generous"],
    },
    Virgo: {
      date: "Aug 23 - Sep 22",
      element: "Earth",
      ruler: "Mercury",
      qualities: ["Analytical", "Practical", "Diligent"],
    },
    Libra: {
      date: "Sep 23 - Oct 22",
      element: "Air",
      ruler: "Venus",
      qualities: ["Diplomatic", "Gracious", "Fair-minded"],
    },
    Scorpio: {
      date: "Oct 23 - Nov 21",
      element: "Water",
      ruler: "Mars/Pluto",
      qualities: ["Resourceful", "Powerful", "Passionate"],
    },
    Sagittarius: {
      date: "Nov 22 - Dec 21",
      element: "Fire",
      ruler: "Jupiter",
      qualities: ["Optimistic", "Adventurous", "Philosophical"],
    },
    Capricorn: {
      date: "Dec 22 - Jan 19",
      element: "Earth",
      ruler: "Saturn",
      qualities: ["Responsible", "Disciplined", "Self-controlled"],
    },
    Aquarius: {
      date: "Jan 20 - Feb 18",
      element: "Air",
      ruler: "Uranus",
      qualities: ["Progressive", "Original", "Independent"],
    },
    Pisces: {
      date: "Feb 19 - Mar 20",
      element: "Water",
      ruler: "Neptune",
      qualities: ["Compassionate", "Artistic", "Intuitive"],
    },
  };

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
    return { sign: "Aries", ...zodiacData["Aries"] };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
    return { sign: "Taurus", ...zodiacData["Taurus"] };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
    return { sign: "Gemini", ...zodiacData["Gemini"] };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
    return { sign: "Cancer", ...zodiacData["Cancer"] };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22))
    return { sign: "Leo", ...zodiacData["Leo"] };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
    return { sign: "Virgo", ...zodiacData["Virgo"] };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
    return { sign: "Libra", ...zodiacData["Libra"] };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
    return { sign: "Scorpio", ...zodiacData["Scorpio"] };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
    return { sign: "Sagittarius", ...zodiacData["Sagittarius"] };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
    return { sign: "Capricorn", ...zodiacData["Capricorn"] };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
    return { sign: "Aquarius", ...zodiacData["Aquarius"] };
  return { sign: "Pisces", ...zodiacData["Pisces"] };
};

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
  const { user } = useAuth(); // Add this hook
  const [zodiacInfo, setZodiacInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.dob) {
      const info = getZodiacInfo(user.dob);
      setZodiacInfo(info);
    }
    setIsLoading(false);
  }, [user]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-[#151616] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Handle case when user hasn't provided birth date
  if (!user?.dob) {
    return (
      <Card>
        <div className="text-center p-8">
          <Star className="w-12 h-12 mx-auto mb-4 text-[#151616]" />
          <h3 className="text-xl font-bold text-[#151616] mb-2">
            Birth Date Required
          </h3>
          <p className="text-[#151616]/70">
            Please update your profile with your birth date to receive
            personalized ritual recommendations.
          </p>
        </div>
      </Card>
    );
  }

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

      {/* Main Sign Card */}
      <Card>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-[#D6F32F]/20 rounded-xl flex items-center justify-center border-2 border-[#151616]">
            <Star className="w-10 h-10 text-[#151616]" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-[#151616]">
                {zodiacInfo?.sign}
              </h2>
              <span className="px-3 py-1 bg-[#D6F32F]/20 rounded-full text-sm">
                {zodiacInfo?.date}
              </span>
            </div>
            <div className="flex items-center gap-4 text-[#151616]/70">
              <div className="flex items-center gap-1">
                <Sun className="w-4 h-4" />
                <span>Ruled by {zodiacInfo?.ruler}</span>
              </div>
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4" />
                <span>{zodiacInfo?.element} Element</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

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
