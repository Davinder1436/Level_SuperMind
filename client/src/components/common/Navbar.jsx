import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import {
  Bot,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Settings,
  Home,
  Phone,
  Info,
  Moon,
  User2,
  HelpCircle,
  Star,
  LayoutDashboard,
} from "lucide-react";

// NavLink Component with Animation
const NavLink = ({ to, label, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <motion.div
        className="relative px-4 py-2 rounded-xl flex items-center gap-2"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}>
        <Icon
          className={`w-4 h-4 ${
            isActive ? "text-[#151616]" : "text-[#151616]/70"
          }`}
        />
        <span className={isActive ? "text-[#151616]" : "text-[#151616]/70"}>
          {label}
        </span>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-[#D6F32F] rounded-xl -z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

// Notification Badge
const NotificationBadge = ({ count }) => (
  <div className="relative">
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-xl hover:bg-[#D6F32F]/10">
      <Bell className="w-5 h-5 text-[#151616]" />
      {count > 0 && (
        <span
          className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs 
          rounded-full flex items-center justify-center border-2 border-white">
          {count}
        </span>
      )}
    </motion.div>
  </div>
);

// User Menu Dropdown
const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: "Profile", icon: User2, onClick: () => navigate("/profile") },
    { label: "Settings", icon: Settings, onClick: () => navigate("/settings") },
    { label: "Help", icon: HelpCircle, onClick: () => navigate("/help") },
    {
      label: "Logout",
      icon: LogOut,
      onClick: onLogout,
      className: "text-red-600 hover:bg-red-50",
    },
  ];

  return (
    <div className="relative">
      <motion.button
        className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#151616] 
          bg-white hover:bg-[#D6F32F]/10 transition-colors"
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen(!isOpen)}>
        <div
          className="w-8 h-8 bg-[#D6F32F] rounded-full flex items-center justify-center 
          border-2 border-[#151616]">
          <User className="w-4 h-4 text-[#151616]" />
        </div>
        <span className="text-[#151616] font-medium hidden md:block">
          {user?.name || "User"}
        </span>
        <ChevronDown className="w-4 h-4 text-[#151616]" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-xl border-2 border-[#151616] 
              shadow-[4px_4px_0px_0px_#151616] overflow-hidden">
            <div className="py-1">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={item.onClick}
                  className={`w-full text-left px-4 py-2 flex items-center gap-2 
                    ${item.className || "hover:bg-[#D6F32F]/10"}`}
                  whileHover={{ x: 4 }}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const publicNavItems = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-[#151616]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <Link to="/" className="flex items-center gap-2">
                <div
                  className="w-10 h-10 bg-[#D6F32F] rounded-xl flex items-center justify-center 
                  border-2 border-[#151616] shadow-[2px_2px_0px_0px_#151616]">
                  <Bot className="w-6 h-6 text-[#151616]" />
                </div>
                <span className="font-bold text-xl">SoulBuddy</span>
              </Link>
            </motion.div>

            {!isAuthenticated && (
              <div className="hidden md:flex items-center gap-2">
                {publicNavItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    label={item.label}
                    icon={item.icon}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Dashboard Button */}
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D6F32F] 
                      border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616] 
                      hover:shadow-[2px_2px_0px_0px_#151616] hover:translate-x-[2px] 
                      hover:translate-y-[2px] transition-all">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </motion.button>
                </Link>

                {/* Premium Badge */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#D6F32F]/10 
                    rounded-full border border-[#151616]">
                  <Star className="w-4 h-4 text-[#151616]" />
                  <span className="text-sm font-medium">Premium</span>
                </motion.div>

                <NotificationBadge count={3} />

                {/* Theme Toggle */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-xl hover:bg-[#D6F32F]/10">
                  <Moon className="w-5 h-5 text-[#151616]" />
                </motion.button>

                <UserMenu user={user} onLogout={handleLogout} />

                {/* Mobile Menu Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-xl hover:bg-[#D6F32F]/10">
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-[#151616]" />
                  ) : (
                    <Menu className="w-6 h-6 text-[#151616]" />
                  )}
                </motion.button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl border-2 border-[#151616] hover:bg-[#D6F32F]/10">
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl bg-[#D6F32F] border-2 border-[#151616] 
                      shadow-[4px_4px_0px_0px_#151616] hover:shadow-[2px_2px_0px_0px_#151616] 
                      hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu - Only for public routes */}
        <AnimatePresence>
          {!isAuthenticated && isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4">
              <div className="flex flex-col gap-2">
                {publicNavItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    label={item.label}
                    icon={item.icon}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
