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
  User2,
  HelpCircle,
  LayoutDashboard,
} from "lucide-react";

const NavLink = ({ to, label, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <motion.div
        className="relative px-3 py-2 rounded-lg flex items-center gap-3 transition-colors"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}>
        <Icon
          className={`w-5 h-5 ${
            isActive ? "text-[#151616]" : "text-[#151616]/60"
          }`}
        />
        <span
          className={`text-sm font-medium ${
            isActive ? "text-[#151616]" : "text-[#151616]/60"
          }`}>
          {label}
        </span>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 bg-[#D6F32F]/30 rounded-lg -z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
};

const NotificationBadge = ({ count }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative p-2 rounded-lg hover:bg-[#D6F32F]/20 transition-colors">
    <Bell className="w-5 h-5 text-[#151616]/80" />
    {count > 0 && (
      <span
        className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs 
        rounded-full flex items-center justify-center border-2 border-white font-medium">
        {count}
      </span>
    )}
  </motion.div>
);

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
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white
          border-2 border-[#151616] shadow-[3px_3px_0px_0px_#151616]
          hover:shadow-[1px_1px_0px_0px_#151616] hover:translate-x-[2px]
          hover:translate-y-[2px] transition-all"
        onClick={() => setIsOpen(!isOpen)}>
        <User className="w-4 h-4 text-[#151616]" />
        <span className="text-[#151616] font-medium text-sm hidden md:block">
          {user?.name || "User"}
        </span>
        <ChevronDown className="w-4 h-4 text-[#151616]/60" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-52 bg-white rounded-lg border-2 
              border-[#151616] shadow-[4px_4px_0px_0px_#151616] overflow-hidden">
            <div className="py-1">
              {menuItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={item.onClick}
                  whileHover={{ x: 2, backgroundColor: "#D6F32F20" }}
                  className={`w-full text-left px-4 py-2.5 flex items-center gap-3 text-sm
                    font-medium transition-colors ${item.className || ""}`}>
                  <div className="flex items-center justify-center">
                    <item.icon className="w-4 h-4" />
                  </div>
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-[#151616]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link to="/" className="flex items-center gap-3">
                <div
                  className="w-10 h-10 bg-[#D6F32F] rounded-lg flex items-center justify-center 
                  border-2 border-[#151616] shadow-[2px_2px_0px_0px_#151616]">
                  <Bot className="w-6 h-6 text-[#151616]" />
                </div>
                <span className="font-bold text-lg">SoulBuddy</span>
              </Link>
            </motion.div>

            {!isAuthenticated && (
              <div className="hidden md:flex items-center gap-1">
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

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <NotificationBadge count={3} />
                <Link to="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D6F32F] 
                      border-2 border-[#151616] shadow-[3px_3px_0px_0px_#151616] 
                      hover:shadow-[1px_1px_0px_0px_#151616] hover:translate-x-[2px] 
                      hover:translate-y-[2px] transition-all text-sm font-medium">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </motion.button>
                </Link>

                <UserMenu user={user} onLogout={handleLogout} />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg hover:bg-[#D6F32F]/20 transition-colors">
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-[#151616]" />
                  ) : (
                    <Menu className="w-6 h-6 text-[#151616]" />
                  )}
                </motion.button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 rounded-lg border-2 border-[#151616] hover:bg-[#D6F32F]/10
                      text-sm font-medium transition-colors">
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 rounded-lg bg-[#D6F32F] border-2 border-[#151616] 
                      shadow-[3px_3px_0px_0px_#151616] hover:shadow-[1px_1px_0px_0px_#151616] 
                      hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm font-medium">
                    Sign Up
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {!isAuthenticated && isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4">
              <div className="flex flex-col gap-1">
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
