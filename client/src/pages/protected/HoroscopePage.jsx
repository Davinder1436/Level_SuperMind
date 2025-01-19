import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Star,
  Heart,
  TrendingUp,
  Flame,
  Activity,
  RefreshCcw,
  Calculator,
  Loader,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

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

// Mock Data - Keep this for fallback
const HOROSCOPE_DATA = {
  ascendant: "Scorpio",
  ascendant_lord: "Mars",
  Varna: "Kshatriya",
  Vashya: "Maanav",
  Yoni: "Swaan",
  Gan: "Rakshasa",
  Nadi: "Adi",
  SignLord: "Jupiter",
  sign: "Sagittarius",
  Naksahtra: "Mool",
  NaksahtraLord: "Ketu",
  Charan: 2,
  Yog: "Vriddhi",
  Karan: "Chatushpad",
  Tithi: "Amavasya",
  yunja: "Parbhaag",
  tatva: "Fire",
  name_alphabet: "Yo",
  paya: "Copper",
};

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] ${className}`}>
    {children}
  </div>
);

const InfoCard = ({ icon: Icon, title, value, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-[#D6F32F]/10 p-4 rounded-xl border-2 border-[#151616]">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-5 h-5 text-[#151616]" />
      <h3 className="font-bold text-[#151616]">{title}</h3>
    </div>
    <p className="text-[#151616] font-medium">{value}</p>
    {description && (
      <p className="text-sm text-[#151616]/70 mt-1">{description}</p>
    )}
  </motion.div>
);

const PredictionSection = ({ title, icon: Icon, predictions }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="p-4 bg-[#D6F32F]/10 rounded-xl border-2 border-[#151616]">
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-5 h-5 text-[#151616]" />
      <h3 className="font-bold text-[#151616]">{title}</h3>
    </div>
    <div className="space-y-2">
      {Object.entries(predictions).map(([key, value]) => (
        <p key={key} className="text-[#151616]/80">
          <span className="font-medium">{key}:</span> {value}
        </p>
      ))}
    </div>
  </motion.div>
);

const NumerologySection = () => {
  const [numeroData, setNumeroData] = useState(null);
  const [error, setError] = useState(null);

  const fetchNumerologyData = async () => {
    try {
      const userId = localStorage.getItem("email");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        throw new Error("Authentication credentials not found");
      }
      console.log("userId", userId);
      console.log("token", token);
      const response = await fetch(
        "https://bb51-13-51-200-36.ngrok-free.app/api/numero_table",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch numerology data");
      }

      const data = await response.json();
      console.log(data);
      setNumeroData(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching numerology data:", err);
    }
  };

  if (error) {
    return (
      <Card className="bg-red-50">
        <div className="text-red-600">
          Error loading numerology data: {error}
        </div>
      </Card>
    );
  }

  if (!numeroData) {
    return (
      <Card>
        <div className="flex items-center justify-center p-4">
          <RefreshCcw className="w-6 h-6 animate-spin text-[#151616]" />
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-[#D6F32F]/20 rounded-xl flex items-center justify-center border-2 border-[#151616]">
            <Calculator className="w-6 h-6 text-[#151616]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#151616]">
              Your Numerology Profile
            </h2>
            <p className="text-[#151616]/70">Based on: {numeroData.date}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#D6F32F]/10 rounded-xl border-2 border-[#151616]">
            <h3 className="font-bold text-[#151616] mb-2">Core Numbers</h3>
            <div className="space-y-2">
              <p className="text-[#151616]">
                Destiny Number: {numeroData.destiny_number}
              </p>
              <p className="text-[#151616]">
                Name Number: {numeroData.name_number}
              </p>
              <p className="text-[#151616]">
                Radical Number: {numeroData.radical_number}
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#D6F32F]/10 rounded-xl border-2 border-[#151616]">
            <h3 className="font-bold text-[#151616] mb-2">
              Number Relationships
            </h3>
            <div className="space-y-2">
              <p className="text-[#151616]">
                Friendly: {numeroData.friendly_num}
              </p>
              <p className="text-[#151616]">
                Neutral: {numeroData.neutral_num}
              </p>
              <p className="text-[#151616]">Evil: {numeroData.evil_num}</p>
            </div>
          </div>

          <div className="p-4 bg-[#D6F32F]/10 rounded-xl border-2 border-[#151616]">
            <h3 className="font-bold text-[#151616] mb-2">Ruling Planet</h3>
            <div className="space-y-2">
              <p className="text-[#151616]">
                Ruler: {numeroData.radical_ruler}
              </p>
              <p className="text-[#151616]">
                Radical Number: {numeroData.radical_num}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-bold text-[#151616] mb-4">
            Favorable Elements
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Color</span>
              <span className="font-bold">{numeroData.fav_color}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Days</span>
              <span className="font-bold">{numeroData.fav_day}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Metal</span>
              <span className="font-bold">{numeroData.fav_metal}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-[#151616] mb-4">
            Spiritual Guidance
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Deity</span>
              <span className="font-bold">{numeroData.fav_god}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Mantra</span>
              <span className="font-bold">{numeroData.fav_mantra}</span>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="text-lg font-bold text-[#151616] mb-4">Gemstones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#D6F32F]/10 rounded-xl border-2 border-[#151616]">
            <h4 className="font-bold text-[#151616] mb-2">Primary Stone</h4>
            <p className="text-[#151616]">{numeroData.fav_stone}</p>
          </div>
          <div className="p-4 bg-[#D6F32F]/10 rounded-xl border-2 border-[#151616]">
            <h4 className="font-bold text-[#151616] mb-2">Secondary Stones</h4>
            <p className="text-[#151616]">{numeroData.fav_substone}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

const HoroscopePage = () => {
  const { user } = useAuth();
  const [predictions, setPredictions] = useState(null);
  const [zodiacInfo, setZodiacInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    if (user?.dob) {
      const info = getZodiacInfo(user.dob);
      setZodiacInfo(info);
    }
    setIsLoading(false);

    // Generate predictions
    const predictionOptions = {
      career: [
        "Opportunities for advancement present themselves",
        "A challenge will lead to professional growth",
        "Your skills will be recognized by superiors",
      ],
      relationships: [
        "Deep connections strengthen through communication",
        "A significant conversation brings clarity",
        "New relationships form through shared interests",
      ],
      health: [
        "Focus on mental wellness brings balance",
        "Physical activities bring renewed energy",
        "Mindful practices enhance well-being",
      ],
      finance: [
        "Careful planning leads to stability",
        "Unexpected gains are possible",
        "Investments show promising returns",
      ],
    };

    const dailyPredictions = Object.keys(predictionOptions).reduce(
      (acc, category) => {
        const options = predictionOptions[category];
        acc[category] = options[Math.floor(Math.random() * options.length)];
        return acc;
      },
      {}
    );

    setPredictions(dailyPredictions);
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 animate-spin text-gray-900" />
      </div>
    );
  }

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
            personalized horoscope readings.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-[#151616]" />
            <span className="text-[#151616]/70">Daily Celestial Guide</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-[#151616]">Your Horoscope</h1>
        </div>
        <div className="flex items-center gap-2 text-[#151616]/70 bg-white px-3 py-1.5 rounded-xl border-2 border-[#151616]">
          <RefreshCcw className="w-4 h-4" />
          <span>Updated {lastUpdated}</span>
        </div>
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

      {/* Core Attributes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-xl font-bold text-[#151616] mb-4">Birth Chart</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Ascendant</span>
              <span className="font-bold">{HOROSCOPE_DATA.ascendant}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Nakshatra</span>
              <span className="font-bold">{HOROSCOPE_DATA.Naksahtra}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Nakshatra Lord</span>
              <span className="font-bold">{HOROSCOPE_DATA.NaksahtraLord}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-[#151616] mb-4">
            Personal Traits
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Varna</span>
              <span className="font-bold">{HOROSCOPE_DATA.Varna}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Vashya</span>
              <span className="font-bold">{HOROSCOPE_DATA.Vashya}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Gan</span>
              <span className="font-bold">{HOROSCOPE_DATA.Gan}</span>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-[#151616] mb-4">
            Time Factors
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Tithi</span>
              <span className="font-bold">{HOROSCOPE_DATA.Tithi}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Yog</span>
              <span className="font-bold">{HOROSCOPE_DATA.Yog}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#151616]/70">Karan</span>
              <span className="font-bold">{HOROSCOPE_DATA.Karan}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Daily Predictions */}
      {predictions && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold text-[#151616] mb-4">
              Today's Insights
            </h2>
            <div className="space-y-4">
              <PredictionSection
                title="Career & Work"
                icon={Activity}
                predictions={{ Today: predictions.career }}
              />
              <PredictionSection
                title="Relationships"
                icon={Heart}
                predictions={{ Today: predictions.relationships }}
              />
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-[#151616] mb-4">
              Well-being
            </h2>
            <div className="space-y-4">
              <PredictionSection
                title="Health"
                icon={Heart}
                predictions={{ Today: predictions.health }}
              />
              <PredictionSection
                title="Finance"
                icon={TrendingUp}
                predictions={{ Today: predictions.finance }}
              />
            </div>
          </Card>
        </div>
      )}

      {/* Qualities Section */}
      <Card>
        <h2 className="text-xl font-bold text-[#151616] mb-4">
          Your {zodiacInfo?.sign} Qualities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {zodiacInfo?.qualities.map((quality, index) => (
            <div
              key={index}
              className="p-4 bg-[#D6F32F]/10 rounded-xl border-2 border-[#151616]">
              <p className="text-[#151616] font-bold">{quality}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Include NumerologySection component here */}
      <NumerologySection />
    </div>
  );
};

export default HoroscopePage;
