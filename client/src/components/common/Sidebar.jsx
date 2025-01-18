import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import {
  User,
  Mail,
  LayoutDashboard,
  Star,
  Moon,
  MessageSquare,
  Gem,
  Brain,
  Dumbbell,
  BedDouble,
  ChevronRight,
  Settings,
  ChevronDown,
} from "lucide-react";

// Animated NavLink Component
const SidebarLink = ({ to, icon: Icon, label, subItems, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <NavLink to={to}>
        {({ isActive }) => (
          <motion.div
            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer ${
              isActive ? "text-[#151616] bg-[#D6F32F]/20" : "text-[#151616]/70"
            }`}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => subItems && setIsOpen(!isOpen)}
            whileHover={{ scale: 1.02 }}>
            <Icon className="w-5 h-5" />
            <span className="flex-1">{label}</span>
            {subItems && (
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            )}

            <AnimatePresence>
              {isHovered && !isActive && (
                <motion.div
                  className="absolute inset-0 bg-[#D6F32F]/10 rounded-xl -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </NavLink>

      {/* SubItems Dropdown */}
      <AnimatePresence>
        {subItems && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-6 mt-1 space-y-1">
            {subItems.map((subItem) => (
              <NavLink
                key={subItem.path}
                to={subItem.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-[#D6F32F]/20 text-[#151616]"
                      : "text-[#151616]/70 hover:bg-[#D6F32F]/10"
                  }`
                }>
                <ChevronRight className="w-4 h-4" />
                {subItem.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Sidebar = ({ className = "" }) => {
  const { user } = useAuth();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/kundali", label: "Birth Chart", icon: Star },
    { path: "/horoscope", label: "Horoscope", icon: Moon },
    {
      path: "/recommendations",
      label: "Recommendations",
      icon: Gem,
      subItems: [
        { path: "/recommendations/gemstones", label: "Gemstones" },
        { path: "/recommendations/rituals", label: "Rituals" },
        { path: "/recommendations/practices", label: "Practices" },
      ],
    },
    { path: "/chat", label: "Chat", icon: MessageSquare },
    { path: "/meditation", label: "Meditation", icon: Brain },
    { path: "/workout", label: "Workout", icon: Dumbbell },
    { path: "/sleep", label: "Sleep", icon: BedDouble },
  ];

  return (
    <aside
      className={`bg-white/80 backdrop-blur-md fixed h-[calc(100vh-70px)] border-r-2 border-[#151616] ${className}`}>
      {/* User Profile Section */}
      <div className="p-4 border-b-2 border-[#151616]">
        <motion.div
          className="p-4 rounded-xl border-2 border-[#151616] bg-white hover:bg-[#D6F32F]/10 transition-all cursor-pointer"
          whileHover={{ scale: 1.02 }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#D6F32F] rounded-xl flex items-center justify-center border-2 border-[#151616] shadow-[2px_2px_0px_0px_#151616]">
              <User className="w-6 h-6 text-[#151616]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#151616] truncate">
                {user?.name || "User"}
              </h3>
              <div className="flex items-center gap-2 text-sm text-[#151616]/70">
                <Mail className="w-4 h-4" />
                <span className="truncate">{user?.email}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Items */}
      <div className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
        {navItems.map((item) => (
          <SidebarLink
            key={item.path}
            to={item.path}
            label={item.label}
            icon={item.icon}
            subItems={item.subItems}
          />
        ))}
      </div>

      {/* Settings Link */}
      <div className="absolute bottom-0 w-full p-4 border-t-2 border-[#151616] bg-white/80">
        <SidebarLink to="/settings" label="Settings" icon={Settings} />
      </div>
    </aside>
  );
};

export default Sidebar;
