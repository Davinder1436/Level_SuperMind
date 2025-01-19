import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Moon,
  Heart,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Timer,
  Flower,
  Sparkles,
  Star,
  RefreshCcw,
  RefreshCw,
  Plus,
} from "lucide-react";

// Meditation Timer Component
const MeditationTimer = ({ initialDuration = 900 }) => {
  const [duration, setDuration] = useState(initialDuration);
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [pausedTime, setPausedTime] = useState(null);
  const audioRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleComplete = useCallback(() => {
    setIsActive(false);
    setStartTime(null);
    setPausedTime(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Meditation Complete", {
        body: "Your meditation session has ended.",
      });
    }
  }, []);

  useEffect(() => {
    let intervalId;

    if (isActive && duration > 0) {
      intervalId = setInterval(() => {
        setDuration((prevDuration) => {
          if (prevDuration <= 1) {
            clearInterval(intervalId);
            handleComplete();
            return 0;
          }
          return prevDuration - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, handleComplete]);

  const handleToggle = () => {
    if (!isActive) {
      // Starting or resuming
      setIsActive(true);
      setStartTime(Date.now());
      if (duration === 0) {
        setDuration(initialDuration);
      }
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      // Pausing
      setIsActive(false);
      setPausedTime(Date.now());
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setDuration(initialDuration);
    setStartTime(null);
    setPausedTime(null);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const toggleSound = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hidden audio element */}
      <audio ref={audioRef} loop preload="auto" src="/meditation.mp3" />

      <div className="relative w-40 h-40 mb-6">
        {/* Timer Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#151616"
            strokeWidth="2"
            className="opacity-10"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#D6F32F"
            strokeWidth="4"
            strokeDasharray={440}
            strokeDashoffset={440 * (1 - duration / initialDuration)}
            className="transition-all duration-1000"
          />
        </svg>

        {/* Timer Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-[#151616]">
            {formatTime(duration)}
          </span>
          <span className="text-sm text-[#151616]/70">remaining</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleToggle}
          className="w-16 h-16 bg-[#D6F32F] rounded-full border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] 
            hover:shadow-[2px_2px_0px_0px_#151616] hover:translate-x-[2px] hover:translate-y-[2px] transition-all
            flex items-center justify-center">
          {isActive ? (
            <Pause className="w-6 h-6 text-[#151616]" />
          ) : (
            <Play className="w-6 h-6 text-[#151616] ml-1" />
          )}
        </motion.button>

        {(duration < initialDuration || isActive) && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetTimer}
            className="w-16 h-16 bg-white rounded-full border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] 
              hover:shadow-[2px_2px_0px_0px_#151616] hover:translate-x-[2px] hover:translate-y-[2px] transition-all
              flex items-center justify-center">
            <RefreshCw className="w-6 h-6 text-[#151616]" />
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleSound}
          className="w-16 h-16 bg-white rounded-full border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] 
            hover:shadow-[2px_2px_0px_0px_#151616] hover:translate-x-[2px] hover:translate-y-[2px] transition-all
            flex items-center justify-center">
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-[#151616]" />
          ) : (
            <Volume2 className="w-6 h-6 text-[#151616]" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

// Meditation Card Component
const MeditationCard = ({ meditation, onSelect }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] overflow-hidden 
      cursor-pointer"
    onClick={onSelect}>
    <div className="p-6">
      <div className="flex items-start gap-4">
        <div
          className={`w-16 h-16 ${meditation.color} rounded-xl flex items-center justify-center border-2 border-[#151616]`}>
          <meditation.icon className="w-8 h-8 text-[#151616]" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-[#151616] mb-2">
            {meditation.name}
          </h3>
          <div className="flex items-center gap-4 text-[#151616]/70 text-sm">
            <div className="flex items-center gap-1">
              <Timer className="w-4 h-4" />
              {meditation.duration} mins
            </div>
            <div className="flex items-center gap-1">
              <Volume2 className="w-4 h-4" />
              {meditation.type}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-[#151616]/70">{meditation.description}</p>
    </div>
  </motion.div>
);

// Recent Session Card Component
const RecentSessionCard = ({ session }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white p-4 rounded-xl border-2 border-[#151616]">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <session.icon className="w-5 h-5 text-[#151616]" />
        <span className="font-bold text-[#151616]">{session.type}</span>
      </div>
      <span className="text-sm text-[#151616]/70">{session.date}</span>
    </div>
    <div className="flex items-center gap-2 text-[#151616]/70 text-sm">
      <Timer className="w-4 h-4" />
      {session.duration} minutes completed
    </div>
  </motion.div>
);

const MeditationPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(900); // 15 minutes in seconds
  const [isMuted, setIsMuted] = useState(false);

  const meditations = [
    {
      name: "Mindful Breathing",
      icon: Brain,
      color: "bg-[#FFE8EC]",
      duration: 15,
      type: "Guided",
      description:
        "A gentle meditation focusing on breath awareness and mental clarity.",
    },
    {
      name: "Heart Chakra",
      icon: Heart,
      color: "bg-[#E8F4FF]",
      duration: 20,
      type: "Music",
      description:
        "Open and balance your heart chakra with this loving-kindness meditation.",
    },
    {
      name: "Moon Meditation",
      icon: Moon,
      color: "bg-[#E8FFE8]",
      duration: 10,
      type: "Silent",
      description:
        "Connect with lunar energy through this calming nighttime practice.",
    },
  ];

  const recentSessions = [
    {
      type: "Mindful Breathing",
      icon: Brain,
      duration: 15,
      date: "Today",
    },
    {
      type: "Heart Chakra",
      icon: Heart,
      duration: 20,
      date: "Yesterday",
    },
    {
      type: "Moon Meditation",
      icon: Moon,
      duration: 10,
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
          <Flower className="w-5 h-5 text-[#151616]" />
          <span className="text-[#151616]/70">Daily Practice</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-[#151616]">Meditation Space</h1>
      </div>

      {/* Current Session */}
      <div className="bg-white rounded-xl p-8 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
        <div className="max-w-md mx-auto">
          {/* Meditation Controls */}
          <div className="flex justify-center mb-8">
            <MeditationTimer
              duration={duration}
              isActive={isActive}
              onToggle={() => setIsActive(!isActive)}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-[#151616]" />
            <h3 className="font-bold text-[#151616]">Current Streak</h3>
          </div>
          <p className="text-3xl font-bold text-[#151616]">7 Days</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 mb-2">
            <Timer className="w-5 h-5 text-[#151616]" />
            <h3 className="font-bold text-[#151616]">Total Minutes</h3>
          </div>
          <p className="text-3xl font-bold text-[#151616]">345</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-xl border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#151616]" />
            <h3 className="font-bold text-[#151616]">Sessions</h3>
          </div>
          <p className="text-3xl font-bold text-[#151616]">24</p>
        </motion.div>
      </div>

      {/* Meditations Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#151616]">
            Meditation Library
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-[#D6F32F]/10">
            <Plus className="w-5 h-5 text-[#151616]" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meditations.map((meditation, index) => (
            <MeditationCard
              key={index}
              meditation={meditation}
              onSelect={() => setDuration(meditation.duration * 60)}
            />
          ))}
        </div>
      </div>

      {/* Recent Sessions */}
      <div>
        <h2 className="text-xl font-bold text-[#151616] mb-6">
          Recent Sessions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentSessions.map((session, index) => (
            <RecentSessionCard key={index} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeditationPage;
