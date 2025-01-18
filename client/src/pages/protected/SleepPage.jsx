import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Star,
  Clock,
  BedDouble,
  Activity,
  Heart,
  Calendar,
  Wind,
  Music,
  CloudRain,
  ChevronRight,
  Sparkles,
  RefreshCcw,
  Bell,
} from "lucide-react";

// Sleep Quality Indicator Component
const SleepQualityIndicator = ({ quality, label, icon: Icon }) => (
  <div className="relative">
    <div className="w-full h-2 bg-[#151616]/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${quality}%` }}
        transition={{ duration: 1, delay: 0.5 }}
        className="h-full bg-[#D6F32F]"
      />
    </div>
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center gap-2 text-sm text-[#151616]/70">
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </div>
      <span className="font-bold text-[#151616]">{quality}%</span>
    </div>
  </div>
);

// Sleep Pattern Circle Component
const SleepPatternCircle = ({ timeRange, duration }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}>
      <div className="w-32 h-32 rounded-full border-4 border-[#151616] bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#151616]">{duration}h</div>
          <div className="text-xs text-[#151616]/70">{timeRange}</div>
        </div>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-full border-4 border-[#D6F32F]"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Sound Card Component
const SoundCard = ({ sound }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl p-4 border-2 border-[#151616] cursor-pointer"
      onClick={() => setIsPlaying(!isPlaying)}>
      <div className="flex items-center gap-3">
        <div
          className={`w-12 h-12 ${sound.color} rounded-lg flex items-center justify-center border-2 border-[#151616]`}>
          <sound.icon className="w-6 h-6 text-[#151616]" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-[#151616]">{sound.name}</h3>
          <p className="text-sm text-[#151616]/70">{sound.duration}</p>
        </div>
        {isPlaying && (
          <div className="flex gap-1">
            {[1, 2, 3].map((bar) => (
              <motion.div
                key={bar}
                animate={{ scaleY: [1, 1.5, 1] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: bar * 0.2,
                }}
                className="w-1 h-4 bg-[#D6F32F] rounded-full"
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Sleep Schedule Card Component
const ScheduleCard = ({ day, time, isToday }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`p-4 rounded-xl border-2 border-[#151616] ${
      isToday ? "bg-[#D6F32F]/20" : "bg-white"
    }`}>
    <div className="flex items-center justify-between">
      <span
        className={`font-bold ${
          isToday ? "text-[#151616]" : "text-[#151616]/70"
        }`}>
        {day}
      </span>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-[#151616]" />
        <span className="text-[#151616]">{time}</span>
      </div>
    </div>
  </motion.div>
);

const SleepPage = () => {
  const relaxingSounds = [
    {
      name: "Rain Sounds",
      icon: CloudRain,
      color: "bg-[#E8F4FF]",
      duration: "8 hours",
    },
    {
      name: "White Noise",
      icon: Wind,
      color: "bg-[#FFE8EC]",
      duration: "8 hours",
    },
    {
      name: "Meditation",
      icon: Music,
      color: "bg-[#E8FFE8]",
      duration: "45 minutes",
    },
  ];

  const sleepSchedule = [
    { day: "Monday", time: "10:30 PM", isToday: false },
    { day: "Tuesday", time: "10:45 PM", isToday: false },
    { day: "Wednesday", time: "10:30 PM", isToday: true },
    { day: "Thursday", time: "10:30 PM", isToday: false },
    { day: "Friday", time: "11:00 PM", isToday: false },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-2">
          <Moon className="w-5 h-5 text-[#151616]" />
          <span className="text-[#151616]/70">Sleep Wellness</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-[#151616]">Sleep Tracking</h1>
      </div>

      {/* Sleep Summary Card */}
      <div className="bg-white rounded-xl p-8 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
        <div className="flex items-center justify-center gap-8 mb-8">
          <SleepPatternCircle timeRange="10:30 PM - 6:30 AM" duration="8" />
        </div>
        <div className="space-y-4">
          <SleepQualityIndicator
            quality={85}
            label="Sleep Quality"
            icon={Star}
          />
          <SleepQualityIndicator
            quality={92}
            label="Restfulness"
            icon={Heart}
          />
          <SleepQualityIndicator
            quality={78}
            label="Deep Sleep"
            icon={Activity}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 mb-3">
            <Bell className="w-5 h-5 text-[#151616]" />
            <h3 className="font-bold text-[#151616]">Next Alarm</h3>
          </div>
          <p className="text-2xl font-bold text-[#151616]">6:30 AM</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-[#151616]" />
            <h3 className="font-bold text-[#151616]">Sleep Goal</h3>
          </div>
          <p className="text-2xl font-bold text-[#151616]">8 hours</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-[#151616]" />
            <h3 className="font-bold text-[#151616]">Streak</h3>
          </div>
          <p className="text-2xl font-bold text-[#151616]">7 days</p>
        </motion.div>
      </div>

      {/* Relaxing Sounds */}
      <div>
        <h2 className="text-xl font-bold text-[#151616] mb-6">
          Relaxing Sounds
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relaxingSounds.map((sound, index) => (
            <SoundCard key={index} sound={sound} />
          ))}
        </div>
      </div>

      {/* Sleep Schedule */}
      <div>
        <h2 className="text-xl font-bold text-[#151616] mb-6">
          Sleep Schedule
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {sleepSchedule.map((schedule, index) => (
            <ScheduleCard
              key={index}
              day={schedule.day}
              time={schedule.time}
              isToday={schedule.isToday}
            />
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-[#D6F32F]/20 rounded-xl p-6 border-2 border-[#151616]">
        <div className="flex items-start gap-3">
          <Star className="w-5 h-5 text-[#151616] mt-1" />
          <div>
            <h3 className="font-bold text-[#151616] mb-2">
              Sleep Recommendations
            </h3>
            <div className="space-y-2 text-[#151616]/70">
              <p>• Try to maintain a consistent sleep schedule</p>
              <p>• Avoid screens 1 hour before bedtime</p>
              <p>• Keep your bedroom cool and dark</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepPage;
