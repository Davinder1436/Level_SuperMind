import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Clock,
  Star,
  Moon,
  Sun,
  Heart,
  Bell,
  Settings,
  Shield,
  LogOut,
  Edit,
  Save,
  Plus,
  Camera,
} from "lucide-react";

// Profile Section Component
const ProfileSection = ({ title, children }) => (
  <div className="bg-white rounded-xl p-6 border-2 border-[#151616] shadow-[4px_4px_0px_0px_#151616]">
    <h2 className="text-xl font-bold text-[#151616] mb-6">{title}</h2>
    {children}
  </div>
);

// Edit Field Component
const EditField = ({ label, value, icon: Icon, type = "text" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center border-2 border-[#151616]">
        <Icon className="w-5 h-5 text-[#151616]" />
      </div>
      <div className="flex-1">
        <label className="text-sm text-[#151616]/70">{label}</label>
        {isEditing ? (
          <input
            type={type}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="w-full px-3 py-2 mt-1 rounded-lg border-2 border-[#151616] focus:outline-none focus:ring-2 ring-[#D6F32F]"
          />
        ) : (
          <p className="text-[#151616] font-medium">{currentValue}</p>
        )}
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsEditing(!isEditing)}
        className="p-2 hover:bg-[#D6F32F]/10 rounded-lg">
        {isEditing ? (
          <Save className="w-5 h-5 text-[#151616]" />
        ) : (
          <Edit className="w-5 h-5 text-[#151616]" />
        )}
      </motion.button>
    </div>
  );
};

// Toggle Setting Component
const ToggleSetting = ({
  label,
  description,
  icon: Icon,
  isEnabled,
  onToggle,
}) => (
  <div className="flex items-start gap-4 mb-6">
    <div className="w-10 h-10 bg-[#D6F32F]/20 rounded-lg flex items-center justify-center border-2 border-[#151616]">
      <Icon className="w-5 h-5 text-[#151616]" />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-[#151616]">{label}</h3>
        <button
          onClick={onToggle}
          className={`w-12 h-6 rounded-full transition-colors ${
            isEnabled ? "bg-[#D6F32F]" : "bg-[#151616]/10"
          }`}>
          <motion.div
            animate={{ x: isEnabled ? 24 : 2 }}
            className="w-5 h-5 bg-white rounded-full border-2 border-[#151616]"
          />
        </button>
      </div>
      <p className="text-sm text-[#151616]/70 mt-1">{description}</p>
    </div>
  </div>
);

const ProfilePage = () => {
  const [avatarUrl, setAvatarUrl] = useState("/path/to/avatar.jpg");
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    newsletter: true,
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-2">
          <User className="w-5 h-5 text-[#151616]" />
          <span className="text-[#151616]/70">Profile Settings</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-[#151616]">Your Profile</h1>
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-32 h-32 rounded-xl border-4 border-[#151616] overflow-hidden">
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#D6F32F] rounded-xl 
              flex items-center justify-center border-2 border-[#151616] 
              shadow-[2px_2px_0px_0px_#151616]">
            <Camera className="w-5 h-5 text-[#151616]" />
          </motion.button>
        </div>
      </div>

      {/* Personal Information */}
      <ProfileSection title="Personal Information">
        <EditField label="Full Name" value="Sarah Parker" icon={User} />
        <EditField
          label="Email"
          value="sarah.parker@example.com"
          icon={Mail}
          type="email"
        />
        <EditField
          label="Date of Birth"
          value="1995-06-15"
          icon={Calendar}
          type="date"
        />
        <EditField label="Location" value="New York, USA" icon={MapPin} />
        <EditField
          label="Time Zone"
          value="GMT-5 (Eastern Time)"
          icon={Clock}
        />
      </ProfileSection>

      {/* Astrological Profile */}
      <ProfileSection title="Astrological Profile">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#D6F32F]/10 p-4 rounded-xl border-2 border-[#151616]">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-[#151616]" />
              <h3 className="font-bold text-[#151616]">Sun Sign</h3>
            </div>
            <p className="text-[#151616]">Leo</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#D6F32F]/10 p-4 rounded-xl border-2 border-[#151616]">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="w-5 h-5 text-[#151616]" />
              <h3 className="font-bold text-[#151616]">Moon Sign</h3>
            </div>
            <p className="text-[#151616]">Virgo</p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#D6F32F]/10 p-4 rounded-xl border-2 border-[#151616]">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-[#151616]" />
              <h3 className="font-bold text-[#151616]">Rising Sign</h3>
            </div>
            <p className="text-[#151616]">Libra</p>
          </motion.div>
        </div>
      </ProfileSection>

      {/* Preferences & Settings */}
      <ProfileSection title="Preferences & Settings">
        <ToggleSetting
          label="Push Notifications"
          description="Receive notifications for important updates and reminders"
          icon={Bell}
          isEnabled={settings.notifications}
          onToggle={() =>
            setSettings((prev) => ({
              ...prev,
              notifications: !prev.notifications,
            }))
          }
        />
        <ToggleSetting
          label="Dark Mode"
          description="Switch between light and dark theme"
          icon={Moon}
          isEnabled={settings.darkMode}
          onToggle={() =>
            setSettings((prev) => ({ ...prev, darkMode: !prev.darkMode }))
          }
        />
        <ToggleSetting
          label="Newsletter"
          description="Receive our weekly spiritual guidance newsletter"
          icon={Mail}
          isEnabled={settings.newsletter}
          onToggle={() =>
            setSettings((prev) => ({ ...prev, newsletter: !prev.newsletter }))
          }
        />
      </ProfileSection>

      {/* Account Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 p-4 rounded-xl bg-[#D6F32F]/10 border-2 border-[#151616] 
            hover:bg-[#D6F32F]/20 flex items-center justify-center gap-2">
          <Shield className="w-5 h-5 text-[#151616]" />
          <span className="font-bold text-[#151616]">Privacy Settings</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 p-4 rounded-xl bg-red-50 border-2 border-[#151616] 
            hover:bg-red-100 flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5 text-red-600" />
          <span className="font-bold text-red-600">Sign Out</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ProfilePage;
