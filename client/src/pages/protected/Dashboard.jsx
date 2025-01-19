import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  Moon,
  Sun,
  Star,
  Sparkles,
  Heart,
  Brain,
  Gem,
  ScrollText,
  Activity,
  ArrowRight,
  TrendingUp,
  User,
  Calendar,
  Clock,
} from "lucide-react";

// Stat Card Component
const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
    <div className="flex items-start justify-between mb-4">
      <div
        className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center border-2 border-[#151616]`}>
        <Icon className="w-6 h-6 text-[#151616]" />
      </div>
      {trend && (
        <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg text-sm">
          <TrendingUp className="w-4 h-4" />
          {trend}
        </div>
      )}
    </div>
    <h3 className="text-2xl font-bold text-[#151616] mb-1">{value}</h3>
    <p className="text-[#151616]/70">{label}</p>
  </motion.div>
);

// Quick Action Card Component
const QuickActionCard = ({
  icon: Icon,
  title,
  description,
  color,
  onClick,
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    onClick={onClick}
    className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] cursor-pointer">
    <div
      className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center border-2 border-[#151616] mb-4`}>
      <Icon className="w-6 h-6 text-[#151616]" />
    </div>
    <h3 className="font-bold text-lg text-[#151616] mb-2">{title}</h3>
    <p className="text-[#151616]/70 mb-4">{description}</p>
    <motion.div
      className="flex items-center gap-2 text-[#151616] font-medium"
      whileHover={{ x: 5 }}>
      Get Started <ArrowRight className="w-4 h-4" />
    </motion.div>
  </motion.div>
);

// Upcoming Event Card Component
const UpcomingEventCard = ({ icon: Icon, title, time, date, color }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="flex items-center gap-4 bg-white rounded-xl p-4 border-2 border-[#151616] cursor-pointer">
    <div
      className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center border-2 border-[#151616]`}>
      <Icon className="w-5 h-5 text-[#151616]" />
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-[#151616]">{title}</h4>
      <div className="flex items-center gap-4 text-sm text-[#151616]/70">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {date}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {time}
        </div>
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Get user's first name
  const firstName = user?.name ? user.name.split(" ")[0] : "User";

  // Get zodiac sign based on DOB
  const getZodiacSign = (dob) => {
    if (!dob) return null;
    const date = new Date(dob);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
      return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
      return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
      return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
      return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
      return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
      return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
      return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
      return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
      return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
      return "Aquarius";
    return "Pisces";
  };

  const zodiacSign = getZodiacSign(user?.dob);

  // Calculate current moon phase (simplified)
  const getMoonPhase = () => {
    const phases = [
      "New Moon",
      "Waxing Crescent",
      "First Quarter",
      "Waxing Gibbous",
      "Full Moon",
      "Waning Gibbous",
      "Last Quarter",
      "Waning Crescent",
    ];
    const today = new Date();
    const dayOfMonth = today.getDate();
    return phases[Math.floor((dayOfMonth % 29.5) / 3.7)];
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-[#151616]" />
            <span className="text-[#151616]/70">Welcome back,</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-[#151616]">{firstName}</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/profile")}
          className="px-4 py-2 bg-[#D6F32F] rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] 
            hover:shadow-[2px_2px_0px_0px_#151616] hover:translate-x-[2px] hover:translate-y-[2px] transition-all
            flex items-center gap-2">
          <User className="w-4 h-4" />
          View Profile
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Brain}
          label="Meditation Minutes"
          value="245"
          trend="+12%"
          color="bg-[#FFE8EC]"
        />
        <StatCard
          icon={Heart}
          label="Wellness Score"
          value="92"
          trend="+5%"
          color="bg-[#E8F4FF]"
        />
        <StatCard
          icon={Star}
          label="Completed Rituals"
          value="28"
          trend="+8%"
          color="bg-[#E8FFE8]"
        />
        <StatCard
          icon={Moon}
          label="Sleep Score"
          value="8.5"
          trend="+15%"
          color="bg-[#FFF4E8]"
        />
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickActionCard
          icon={Sparkles}
          title="Daily Horoscope"
          description={`Check your ${
            zodiacSign || "personalized"
          } astrological insights for today`}
          color="bg-[#E8F4FF]"
          onClick={() => navigate("/horoscope")}
        />
        <QuickActionCard
          icon={Gem}
          title="Gemstone Recommendations"
          description="Discover stones that can enhance your spiritual journey"
          color="bg-[#FFE8EC]"
          onClick={() => navigate("/recommendations/gemstones")}
        />
        <QuickActionCard
          icon={ScrollText}
          title="Spiritual Practice"
          description="View today's recommended spiritual practices"
          color="bg-[#E8FFE8]"
          onClick={() => navigate("/recommendations/practices")}
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <h2 className="text-xl font-bold text-[#151616] mb-4">
            Upcoming Events
          </h2>
          <div className="space-y-4">
            <UpcomingEventCard
              icon={Brain}
              title="Group Meditation Session"
              date="Today"
              time="2:00 PM"
              color="bg-[#E8F4FF]"
            />
            <UpcomingEventCard
              icon={Star}
              title={`${zodiacSign || "Astrology"} Workshop`}
              date="Tomorrow"
              time="11:00 AM"
              color="bg-[#FFE8EC]"
            />
            <UpcomingEventCard
              icon={Activity}
              title="Wellness Check-in"
              date="Wed, 20 Jan"
              time="3:30 PM"
              color="bg-[#E8FFE8]"
            />
          </div>
        </div>

        {/* Daily Insights */}
        <div className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <h2 className="text-xl font-bold text-[#151616] mb-4">
            Daily Insights
          </h2>
          <div className="space-y-4">
            <motion.div
              whileHover={{ x: 5 }}
              className="p-4 rounded-xl bg-[#E8F4FF] border-2 border-[#151616]">
              <div className="flex items-center gap-2 mb-2">
                <Moon className="w-5 h-5 text-[#151616]" />
                <span className="font-bold text-[#151616]">Moon Phase</span>
              </div>
              <p className="text-[#151616]/70">
                {getMoonPhase()} - Good time for new beginnings
              </p>
            </motion.div>
            <motion.div
              whileHover={{ x: 5 }}
              className="p-4 rounded-xl bg-[#FFE8EC] border-2 border-[#151616]">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-[#151616]" />
                <span className="font-bold text-[#151616]">Your Sign</span>
              </div>
              <p className="text-[#151616]/70">
                {zodiacSign || "Update your birth date to see your sign"}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ x: 5 }}
              className="p-4 rounded-xl bg-[#E8FFE8] border-2 border-[#151616]">
              <div className="flex items-center gap-2 mb-2">
                <Gem className="w-5 h-5 text-[#151616]" />
                <span className="font-bold text-[#151616]">Power Crystal</span>
              </div>
              <p className="text-[#151616]/70">
                {user?.dob
                  ? "Your recommended crystal for today"
                  : "Add your birth date to see recommendations"}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
