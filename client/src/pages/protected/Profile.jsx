import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Calendar,
  Star,
  Moon,
  Sun,
  Heart,
  Shield,
  LogOut,
  Edit,
  Save,
  Hash,
  MapPin,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

// Default data
const defaultData = {
  name: "No Name",
  date: "30-12-2024",
  destiny_number: 5,
  radical_number: 3,
  name_number: 9,
  evil_num: "4,8",
  fav_color: "Yellow",
  fav_day: "Tuesday, Thursday, Friday",
  fav_god: "Vishnu",
  fav_mantra: "|| Om Hring Gurave Namah ||",
  fav_metal: "Gold",
  fav_stone: "Yellow Sapphire",
  fav_substone: "Topaz, Yellow Tourmaline",
  friendly_num: "7,5,6,9",
  neutral_num: "1,2",
  radical_num: "3",
  radical_ruler: "Jupiter",
};

// Profile Section Component
const ProfileSection = ({ title, children }) => (
  <div className="bg-white rounded-xl p-6 border-2 border-gray-900 shadow-[4px_4px_0px_0px_#151616]">
    <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
    {children}
  </div>
);

// Edit Field Component
const EditField = ({ label, value, icon: Icon, type = "text", onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleSave = () => {
    onSave?.(currentValue);
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="w-10 h-10 bg-lime-200/20 rounded-lg flex items-center justify-center border-2 border-gray-900">
        <Icon className="w-5 h-5 text-gray-900" />
      </div>
      <div className="flex-1">
        <label className="text-sm text-gray-600">{label}</label>
        {isEditing ? (
          <input
            type={type}
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="w-full px-3 py-2 mt-1 rounded-lg border-2 border-gray-900 focus:outline-none focus:ring-2 ring-lime-200"
          />
        ) : (
          <p className="text-gray-900 font-medium">{currentValue}</p>
        )}
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        className="p-2 hover:bg-lime-200/10 rounded-lg">
        {isEditing ? (
          <Save className="w-5 h-5 text-gray-900" />
        ) : (
          <Edit className="w-5 h-5 text-gray-900" />
        )}
      </motion.button>
    </div>
  );
};

// Info Card Component
const InfoCard = ({ icon: Icon, title, value }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-lime-200/10 p-4 rounded-xl border-2 border-gray-900">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-5 h-5 text-gray-900" />
      <h3 className="font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-900">{value}</p>
  </motion.div>
);

const ProfilePage = () => {
  const { user, updateProfile, logout } = useAuth();
  const [numerologyData, setNumerologyData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://bb51-13-51-200-36.ngrok-free.app/api/numero_table"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNumerologyData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setNumerologyData(defaultData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUpdateProfile = async (field, value) => {
    try {
      await updateProfile({ [field]: value });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-4">
      {/* Header */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-2">
          <User className="w-5 h-5 text-gray-900" />
          <span className="text-gray-600">Numerology Profile</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
      </div>

      {/* Personal Information */}
      <ProfileSection title="Personal Information">
        <EditField
          label="Full Name"
          value={user?.name || "No Name"}
          icon={User}
          onSave={(value) => handleUpdateProfile("name", value)}
        />
        <EditField
          label="Email"
          value={user?.email || ""}
          icon={Mail}
          type="email"
          onSave={(value) => handleUpdateProfile("email", value)}
        />
        <EditField
          label="Date of Birth"
          value={user?.dob || ""}
          icon={Calendar}
          type="date"
          onSave={(value) => handleUpdateProfile("dob", value)}
        />
        <EditField
          label="State"
          value={user?.state || ""}
          icon={MapPin}
          onSave={(value) => handleUpdateProfile("state", value)}
        />
        <EditField
          label="City"
          value={user?.city || ""}
          icon={MapPin}
          onSave={(value) => handleUpdateProfile("city", value)}
        />
      </ProfileSection>

      {/* Numerology Profile */}
      <ProfileSection title="Numerology Numbers">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={Star}
            title="Destiny Number"
            value={numerologyData.destiny_number}
          />
          <InfoCard
            icon={Sun}
            title="Name Number"
            value={numerologyData.name_number}
          />
          <InfoCard
            icon={Moon}
            title="Radical Number"
            value={numerologyData.radical_number}
          />
        </div>
      </ProfileSection>

      {/* Favorable Elements */}
      <ProfileSection title="Favorable Elements">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Colors & Materials</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Favorable Color:</span>{" "}
                {numerologyData.fav_color}
              </p>
              <p>
                <span className="font-medium">Favorable Metal:</span>{" "}
                {numerologyData.fav_metal}
              </p>
              <p>
                <span className="font-medium">Favorable Stone:</span>{" "}
                {numerologyData.fav_stone}
              </p>
              <p>
                <span className="font-medium">Sub Stone:</span>{" "}
                {numerologyData.fav_substone}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Spiritual Guidance</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Favorable Days:</span>{" "}
                {numerologyData.fav_day}
              </p>
              <p>
                <span className="font-medium">Deity:</span>{" "}
                {numerologyData.fav_god}
              </p>
              <p>
                <span className="font-medium">Mantra:</span>{" "}
                {numerologyData.fav_mantra}
              </p>
            </div>
          </div>
        </div>
      </ProfileSection>

      {/* Number Compatibility */}
      <ProfileSection title="Number Compatibility">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={Heart}
            title="Friendly Numbers"
            value={numerologyData.friendly_num}
          />
          <InfoCard
            icon={Hash}
            title="Neutral Numbers"
            value={numerologyData.neutral_num}
          />
          <InfoCard
            icon={Shield}
            title="Numbers to Avoid"
            value={numerologyData.evil_num}
          />
        </div>
      </ProfileSection>

      {/* Account Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 p-4 rounded-xl bg-lime-200/10 border-2 border-gray-900 
            hover:bg-lime-200/20 flex items-center justify-center gap-2">
          <Shield className="w-5 h-5 text-gray-900" />
          <span className="font-bold text-gray-900">Download Report</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="flex-1 p-4 rounded-xl bg-red-50 border-2 border-gray-900 
            hover:bg-red-100 flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5 text-red-600" />
          <span className="font-bold text-red-600">Sign Out</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ProfilePage;
