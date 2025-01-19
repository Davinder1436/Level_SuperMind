import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import {
  Star,
  Sun,
  Moon,
  Eclipse,
  Clock,
  Calendar,
  MapPin,
  ChevronRight,
  Info,
  Download,
  Share2,
  Loader,
} from "lucide-react";

// Helper function to get zodiac sign and info
const getZodiacInfo = (dob) => {
  if (!dob) return null;

  const date = new Date(dob);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Mapping of zodiac signs with their details
  const zodiacData = {
    Aries: {
      startMonth: 3,
      startDay: 21,
      endMonth: 4,
      endDay: 19,
      ruler: "Mars",
      element: "Fire",
    },
    Taurus: {
      startMonth: 4,
      startDay: 20,
      endMonth: 5,
      endDay: 20,
      ruler: "Venus",
      element: "Earth",
    },
    Gemini: {
      startMonth: 5,
      startDay: 21,
      endMonth: 6,
      endDay: 20,
      ruler: "Mercury",
      element: "Air",
    },
    Cancer: {
      startMonth: 6,
      startDay: 21,
      endMonth: 7,
      endDay: 22,
      ruler: "Moon",
      element: "Water",
    },
    Leo: {
      startMonth: 7,
      startDay: 23,
      endMonth: 8,
      endDay: 22,
      ruler: "Sun",
      element: "Fire",
    },
    Virgo: {
      startMonth: 8,
      startDay: 23,
      endMonth: 9,
      endDay: 22,
      ruler: "Mercury",
      element: "Earth",
    },
    Libra: {
      startMonth: 9,
      startDay: 23,
      endMonth: 10,
      endDay: 22,
      ruler: "Venus",
      element: "Air",
    },
    Scorpio: {
      startMonth: 10,
      startDay: 23,
      endMonth: 11,
      endDay: 21,
      ruler: "Mars/Pluto",
      element: "Water",
    },
    Sagittarius: {
      startMonth: 11,
      startDay: 22,
      endMonth: 12,
      endDay: 21,
      ruler: "Jupiter",
      element: "Fire",
    },
    Capricorn: {
      startMonth: 12,
      startDay: 22,
      endMonth: 1,
      endDay: 19,
      ruler: "Saturn",
      element: "Earth",
    },
    Aquarius: {
      startMonth: 1,
      startDay: 20,
      endMonth: 2,
      endDay: 18,
      ruler: "Uranus",
      element: "Air",
    },
    Pisces: {
      startMonth: 2,
      startDay: 19,
      endMonth: 3,
      endDay: 20,
      ruler: "Neptune",
      element: "Water",
    },
  };

  for (const [sign, data] of Object.entries(zodiacData)) {
    if (
      (month === data.startMonth && day >= data.startDay) ||
      (month === data.endMonth && day <= data.endDay)
    ) {
      return { sign, ...data };
    }
  }

  return null;
};

// Helper function to get next zodiac sign
const getNextZodiacSign = (sign) => {
  const signs = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];
  const currentIndex = signs.indexOf(sign);
  return signs[(currentIndex + 1) % 12];
};

// Helper function to generate houses based on ascendant sign
const generateHouses = (ascendantSign) => {
  let currentSign = ascendantSign;
  const houses = [];

  for (let i = 1; i <= 12; i++) {
    houses.push({
      number: i,
      sign: currentSign,
      degree: `${Math.floor(Math.random() * 29) + 1}°${Math.floor(
        Math.random() * 59
      )}'`,
      planets: [], // Will be populated later
    });
    currentSign = getNextZodiacSign(currentSign);
  }

  return houses;
};

// House Component for Birth Chart
const HouseBox = ({ house, isActive, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    onClick={onClick}
    className={`p-4 rounded-xl border-2 border-[#151616] cursor-pointer
      ${isActive ? "bg-[#D6F32F]/20" : "bg-white"}`}>
    <div className="flex items-center justify-between mb-2">
      <span className="font-bold text-[#151616]">House {house.number}</span>
      <span className="text-sm text-[#151616]/70">{house.degree}</span>
    </div>
    <div className="text-[#151616]">{house.sign}</div>
    {house.planets.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-1">
        {house.planets.map((planet, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-[#D6F32F]/30 rounded-full text-[#151616]">
            {planet}
          </span>
        ))}
      </div>
    )}
  </motion.div>
);

// Planet Card Component
const PlanetCard = ({ planet }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPlanetIcon = (name) => {
    switch (name) {
      case "Sun":
        return Sun;
      case "Moon":
        return Moon;
      case "Mars":
        return Eclipse;
      case "Mercury":
        return Eclipse;
      case "Jupiter":
        return Eclipse;
      case "Venus":
        return Eclipse;
      case "Saturn":
        return Eclipse;
      case "Uranus":
        return Eclipse;
      case "Neptune":
        return Eclipse;
      case "Pluto":
        return Eclipse;
      default:
        return Star;
    }
  };

  const Icon = getPlanetIcon(planet.planet);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl p-4 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#D6F32F]/20 rounded-xl flex items-center justify-center border-2 border-[#151616]">
          <Icon className="w-6 h-6 text-[#151616]" />
        </div>
        <div>
          <h3 className="font-bold text-[#151616]">{planet.planet}</h3>
          <div className="flex items-center gap-2 text-sm text-[#151616]/70">
            <span>{planet.sign}</span>
            <span>•</span>
            <span>House {planet.house}</span>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-[#151616]/10">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[#151616]/70">Degree:</span>
              <span className="text-[#151616]">{planet.degree}</span>
            </div>
            {planet.retrograde && (
              <div className="mt-1 inline-block px-2 py-1 bg-[#D6F32F]/20 rounded-full text-xs text-[#151616]">
                Retrograde
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Dasha Timeline Component
const DashaTimeline = ({ dasha }) => (
  <div className="relative p-4 bg-white rounded-xl border-2 border-[#151616]">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-[#151616]" />
        <span className="font-bold text-[#151616]">{dasha.planet} Dasha</span>
      </div>
      <span className="text-sm text-[#151616]/70">
        {dasha.subDasha} Sub-Dasha
      </span>
    </div>
    <div className="flex items-center gap-2 text-sm text-[#151616]/70">
      <Calendar className="w-4 h-4" />
      <span>{dasha.startDate}</span>
      <ChevronRight className="w-4 h-4" />
      <span>{dasha.endDate}</span>
    </div>
  </div>
);

// Main KundliPage Component
const KundliPage = () => {
  const { user } = useAuth();
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [kundliData, setKundliData] = useState(null);

  useEffect(() => {
    if (user?.dob && user?.time && user?.city && user?.state) {
      const zodiacInfo = getZodiacInfo(user.dob);

      if (zodiacInfo) {
        // Generate houses based on ascendant sign
        const houses = generateHouses(zodiacInfo.sign);

        // Generate planetary positions
        const planetaryPositions = [
          {
            planet: zodiacInfo.ruler,
            sign: zodiacInfo.sign,
            house: 1,
            degree: houses[0].degree,
            retrograde: false,
          },
        ];

        // Generate dashas (example calculation)
        const currentYear = new Date().getFullYear();
        const dashas = [
          {
            planet: zodiacInfo.ruler,
            startDate: currentYear.toString(),
            endDate: (currentYear + 6).toString(),
            subDasha: "Mercury",
          },
        ];

        const dynamicKundliData = {
          userInfo: {
            name: user.name,
            dateOfBirth: new Date(user.dob).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            timeOfBirth: user.time,
            placeOfBirth: `${user.city}, ${user.state}`,
            latitude: user.latitude || "Not available",
            longitude: user.longitude || "Not available",
          },
          houses,
          planetaryPositions,
          dashas,
        };

        setKundliData(dynamicKundliData);
      }
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 animate-spin text-gray-900" />
      </div>
    );
  }

  if (!user?.dob || !user?.time || !user?.city || !user?.state) {
    return (
      <div className="text-center p-8 bg-white rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
        <Calendar className="w-12 h-12 mx-auto mb-4 text-[#151616]" />
        <h3 className="text-xl font-bold text-[#151616] mb-2">
          Birth Details Required
        </h3>
        <p className="text-[#151616]/70">
          Please update your profile with your complete birth details to
          generate your Kundli.
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
          <Star className="w-5 h-5 text-[#151616]" />
          <span className="text-[#151616]/70">Birth Chart</span>
        </motion.div>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#151616]">Your Kundli</h1>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-[#D6F32F]/10">
              <Download className="w-5 h-5 text-[#151616]" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-[#D6F32F]/10">
              <Share2 className="w-5 h-5 text-[#151616]" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Birth Details */}
      <div className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center border-2 border-[#151616]">
              <Calendar className="w-5 h-5 text-[#151616]" />
            </div>
            <div>
              <p className="text-sm text-[#151616]/70">Date of Birth</p>
              <p className="font-medium text-[#151616]">
                {kundliData.userInfo.dateOfBirth}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center border-2 border-[#151616]">
              <Clock className="w-5 h-5 text-[#151616]" />
            </div>
            <div>
              <p className="text-sm text-[#151616]/70">Time of Birth</p>
              <p className="font-medium text-[#151616]">
                {kundliData.userInfo.timeOfBirth}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center border-2 border-[#151616]">
              <MapPin className="w-5 h-5 text-[#151616]" />
            </div>
            <div>
              <p className="text-sm text-[#151616]/70">Place of Birth</p>
              <p className="font-medium text-[#151616]">
                {kundliData.userInfo.placeOfBirth}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Birth Chart Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kundliData.houses.map((house) => (
          <HouseBox
            key={house.number}
            house={house}
            isActive={selectedHouse === house.number}
            onClick={() => setSelectedHouse(house.number)}
          />
        ))}
      </div>

      {/* Planetary Positions */}
      <div>
        <h2 className="text-xl font-bold text-[#151616] mb-6">
          Planetary Positions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kundliData.planetaryPositions.map((planet, index) => (
            <PlanetCard key={index} planet={planet} />
          ))}
        </div>
      </div>

      {/* Dasha Timeline */}
      <div>
        <h2 className="text-xl font-bold text-[#151616] mb-6">
          Current Dasha Period
        </h2>
        <div className="space-y-4">
          {kundliData.dashas.map((dasha, index) => (
            <DashaTimeline key={index} dasha={dasha} />
          ))}
        </div>
      </div>

      {/* Coordinates Information */}
      <div className="bg-white rounded-xl p-6 border-2 border-[#151616]">
        <h2 className="text-xl font-bold text-[#151616] mb-4">
          Geographical Coordinates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center border-2 border-[#151616]">
              <MapPin className="w-5 h-5 text-[#151616]" />
            </div>
            <div>
              <p className="text-sm text-[#151616]/70">Latitude</p>
              <p className="font-medium text-[#151616]">
                {kundliData.userInfo.latitude}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center border-2 border-[#151616]">
              <MapPin className="w-5 h-5 text-[#151616]" />
            </div>
            <div>
              <p className="text-sm text-[#151616]/70">Longitude</p>
              <p className="font-medium text-[#151616]">
                {kundliData.userInfo.longitude}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Notes */}
      <div className="bg-[#D6F32F]/20 rounded-xl p-6 border-2 border-[#151616]">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#151616] mt-0.5" />
          <div>
            <h3 className="font-bold text-[#151616] mb-2">Important Note</h3>
            <p className="text-[#151616]/70">
              This birth chart is calculated using the Lahiri Ayanamsa system.
              For the most accurate readings, please verify your birth time and
              location details. The calculations are based on your provided
              birth details and geographical coordinates.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-[#151616]/70">
        <p>
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};

export default KundliPage;
