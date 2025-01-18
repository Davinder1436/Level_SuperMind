import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Timer,
  Calendar,
  Dumbbell,
  Heart,
  TrendingUp,
  Play,
  ChevronRight,
  Sparkles,
  Star,
  RefreshCcw,
  Plus,
  Flame,
  Clock,
  Zap,
} from "lucide-react";

// SVG Illustrations Component
const WorkoutIllustration = ({ type }) => {
  const illustrations = {
    yoga: (
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="60"
          cy="60"
          r="58"
          fill="#D6F32F"
          strokeWidth="4"
          stroke="#151616"
        />
        <path
          d="M40 80C50 70 70 70 80 80"
          stroke="#151616"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="45" cy="45" r="5" fill="#151616" />
        <circle cx="75" cy="45" r="5" fill="#151616" />
      </svg>
    ),
    meditation: (
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="60"
          cy="60"
          r="58"
          fill="#FFE8EC"
          strokeWidth="4"
          stroke="#151616"
        />
        <path
          d="M40 60C40 40 80 40 80 60"
          stroke="#151616"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="60" cy="40" r="10" fill="#151616" />
      </svg>
    ),
    cardio: (
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="60"
          cy="60"
          r="58"
          fill="#E8F4FF"
          strokeWidth="4"
          stroke="#151616"
        />
        <path
          d="M30 60H45L55 40L65 80L75 60H90"
          stroke="#151616"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
  };

  return illustrations[type] || null;
};

// Workout Card Component
const WorkoutCard = ({ workout, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] overflow-hidden 
        cursor-pointer"
      onClick={onSelect}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div
            className={`relative w-24 h-24 ${workout.color} rounded-xl flex items-center justify-center 
            border-2 border-[#151616]`}>
            <WorkoutIllustration type={workout.illustrationType} />
            <motion.div
              animate={isHovered ? { rotate: 360 } : {}}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-[#D6F32F] rounded-full border-2 border-[#151616] 
                flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-[#151616]" />
            </motion.div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-[#151616] mb-2">
              {workout.name}
            </h3>
            <div className="flex items-center gap-4 text-[#151616]/70 text-sm">
              <div className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                {workout.duration} mins
              </div>
              <div className="flex items-center gap-1">
                <Flame className="w-4 h-4" />
                {workout.intensity}
              </div>
            </div>
            <p className="mt-3 text-[#151616]/70">{workout.description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Progress Circle Component
const ProgressCircle = ({ value, label, icon: Icon }) => (
  <div className="flex flex-col items-center">
    <div className="relative w-24 h-24 mb-3">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="45"
          fill="none"
          stroke="#151616"
          strokeWidth="2"
          className="opacity-10"
        />
        <circle
          cx="48"
          cy="48"
          r="45"
          fill="none"
          stroke="#D6F32F"
          strokeWidth="4"
          strokeDasharray={283}
          strokeDashoffset={283 * (1 - value / 100)}
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="w-8 h-8 text-[#151616]" />
      </div>
    </div>
    <span className="text-lg font-bold text-[#151616]">{value}%</span>
    <span className="text-sm text-[#151616]/70">{label}</span>
  </div>
);

// Recent Activity Card Component
const ActivityCard = ({ activity }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white p-4 rounded-xl border-2 border-[#151616]">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 ${activity.color} rounded-lg flex items-center justify-center 
          border-2 border-[#151616]`}>
          <activity.icon className="w-4 h-4 text-[#151616]" />
        </div>
        <span className="font-bold text-[#151616]">{activity.name}</span>
      </div>
      <span className="text-sm text-[#151616]/70">{activity.date}</span>
    </div>
    <div className="flex items-center gap-4 text-[#151616]/70 text-sm">
      <div className="flex items-center gap-1">
        <Timer className="w-4 h-4" />
        {activity.duration} mins
      </div>
      <div className="flex items-center gap-1">
        <Flame className="w-4 h-4" />
        {activity.calories} cal
      </div>
    </div>
  </motion.div>
);

const WorkoutPage = () => {
  const workouts = [
    {
      name: "Morning Yoga Flow",
      illustrationType: "yoga",
      color: "bg-[#D6F32F]/20",
      duration: 20,
      intensity: "Moderate",
      description:
        "Start your day with energizing yoga poses and breathing exercises.",
    },
    {
      name: "Mindful Meditation",
      illustrationType: "meditation",
      color: "bg-[#FFE8EC]",
      duration: 15,
      intensity: "Low",
      description:
        "Calm your mind and connect with your inner self through guided meditation.",
    },
    {
      name: "Energy Boost",
      illustrationType: "cardio",
      color: "bg-[#E8F4FF]",
      duration: 30,
      intensity: "High",
      description: "Dynamic movements to increase your energy and vitality.",
    },
  ];

  const recentActivities = [
    {
      name: "Morning Yoga",
      icon: Activity,
      color: "bg-[#D6F32F]/20",
      duration: 20,
      calories: 150,
      date: "Today",
      image:
        "https://cdni.iconscout.com/illustration/premium/thumb/yoga-instructor-illustration-download-in-svg-png-gif-file-formats--character-trainer-daily-workout-pack-gym-fitness-illustrations-2922405.png?f=webp",
    },
    {
      name: "Meditation",
      icon: Heart,
      color: "bg-[#FFE8EC]",
      duration: 15,
      calories: 50,
      date: "Yesterday",
    },
    {
      name: "Energy Flow",
      icon: Zap,
      color: "bg-[#E8F4FF]",
      duration: 30,
      calories: 200,
      date: "2 days ago",
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
          <Dumbbell className="w-5 h-5 text-[#151616]" />
          <span className="text-[#151616]/70">Daily Movement</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-[#151616]">Workout Space</h1>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl p-8 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
        <div className="flex justify-center gap-12">
          <ProgressCircle value={75} label="Daily Goal" icon={Star} />
          <ProgressCircle value={85} label="Energy" icon={Zap} />
          <ProgressCircle value={60} label="Streak" icon={Flame} />
        </div>
      </div>

      {/* Today's Recommendation */}
      <div className="bg-[#D6F32F]/20 rounded-xl p-4 border-2 border-[#151616]">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#151616] mt-0.5" />
          <div>
            <h3 className="font-bold text-[#151616] mb-1">
              Today's Recommendation
            </h3>
            <p className="text-[#151616]/70">
              Based on your energy levels and schedule, we recommend the Morning
              Yoga Flow session.
            </p>
          </div>
        </div>
      </div>

      {/* Workout Library */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#151616]">Workout Library</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-[#D6F32F]/10">
            <Plus className="w-5 h-5 text-[#151616]" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout, index) => (
            <WorkoutCard key={index} workout={workout} onSelect={() => {}} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-bold text-[#151616] mb-6">
          Recent Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentActivities.map((activity, index) => (
            <ActivityCard key={index} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPage;
