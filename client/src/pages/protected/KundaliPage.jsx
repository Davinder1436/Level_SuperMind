import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Sun,
  Moon,
  // Saturn,
  Eclipse,
  // Venus,
  // Mars,
  // Mercury,
  Clock,
  Calendar,
  MapPin,
  ChevronRight,
  Info,
  Download,
  Share2,
} from "lucide-react";

// Dummy Kundli Data
const kundliData = {
  userInfo: {
    name: "Sarah Parker",
    dateOfBirth: "15 June 1995",
    timeOfBirth: "14:30",
    placeOfBirth: "New York, USA",
    latitude: "40.7128° N",
    longitude: "74.0060° W",
  },
  houses: [
    { number: 1, sign: "Leo", degree: "15°30'", planets: ["Sun", "Mars"] },
    { number: 2, sign: "Virgo", degree: "20°45'", planets: ["Mercury"] },
    { number: 3, sign: "Libra", degree: "25°15'", planets: [] },
    { number: 4, sign: "Scorpio", degree: "28°20'", planets: ["Venus"] },
    { number: 5, sign: "Sagittarius", degree: "30°10'", planets: [] },
    { number: 6, sign: "Capricorn", degree: "15°45'", planets: ["Saturn"] },
    { number: 7, sign: "Aquarius", degree: "18°30'", planets: [] },
    { number: 8, sign: "Pisces", degree: "22°15'", planets: ["Jupiter"] },
    { number: 9, sign: "Aries", degree: "25°40'", planets: [] },
    { number: 10, sign: "Taurus", degree: "28°25'", planets: [] },
    { number: 11, sign: "Gemini", degree: "12°35'", planets: ["Moon"] },
    { number: 12, sign: "Cancer", degree: "15°50'", planets: [] },
  ],
  planetaryPositions: [
    {
      planet: "Sun",
      sign: "Leo",
      house: 1,
      degree: "15°30'",
      retrograde: false,
    },
    {
      planet: "Moon",
      sign: "Gemini",
      house: 11,
      degree: "12°35'",
      retrograde: false,
    },
    {
      planet: "Mars",
      sign: "Leo",
      house: 1,
      degree: "18°45'",
      retrograde: false,
    },
    {
      planet: "Mercury",
      sign: "Virgo",
      house: 2,
      degree: "20°45'",
      retrograde: true,
    },
    {
      planet: "Jupiter",
      sign: "Pisces",
      house: 8,
      degree: "22°15'",
      retrograde: false,
    },
    {
      planet: "Venus",
      sign: "Scorpio",
      house: 4,
      degree: "28°20'",
      retrograde: false,
    },
    {
      planet: "Saturn",
      sign: "Capricorn",
      house: 6,
      degree: "15°45'",
      retrograde: true,
    },
  ],
  dashas: [
    {
      planet: "Sun",
      startDate: "2020-01-01",
      endDate: "2026-01-01",
      subDasha: "Mercury",
    },
    {
      planet: "Moon",
      startDate: "2026-01-01",
      endDate: "2032-01-01",
      subDasha: "Venus",
    },
    {
      planet: "Mars",
      startDate: "2032-01-01",
      endDate: "2038-01-01",
      subDasha: "Jupiter",
    },
  ],
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

const KundliPage = () => {
  const [selectedHouse, setSelectedHouse] = useState(null);

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

      {/* Additional Notes */}
      <div className="bg-[#D6F32F]/20 rounded-xl p-6 border-2 border-[#151616]">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-[#151616] mt-0.5" />
          <div>
            <h3 className="font-bold text-[#151616] mb-2">Important Note</h3>
            <p className="text-[#151616]/70">
              This birth chart is calculated using the Lahiri Ayanamsa system.
              For the most accurate readings, please verify your birth time and
              location details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KundliPage;
