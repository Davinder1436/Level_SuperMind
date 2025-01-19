import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://bb51-13-51-200-36.ngrok-free.app/api";

  const authAxios = axios.create({
    baseURL: API_URL,
  });

  // Enhanced setAuthToken to also handle user data
  const setAuthToken = (token, userData = null) => {
    if (token && userData) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      authAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete authAxios.defaults.headers.common["Authorization"];
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Modified initialization to use stored user data
  useEffect(() => {
    const initializeAuth = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          authAxios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
          setUser(userData);
          setIsAuthenticated(true);
        } catch (err) {
          // Invalid stored data - clear everything
          setAuthToken(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Set up axios interceptor for 401 responses
  useEffect(() => {
    const interceptor = authAxios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setAuthToken(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      authAxios.interceptors.response.eject(interceptor);
    };
  }, []);

  const handleError = (error) => {
    const message = error.response?.data?.message || "An error occurred";
    setError(message);
    return Promise.reject(message);
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await authAxios.post("/auth/signin", {
        email,
        password,
      });

      const { user, token } = response.data;
      setAuthToken(token, user);
      setError(null);
      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authAxios.post("/auth/signup", userData);

      const { user, token } = response.data;
      setAuthToken(token, user);
      setError(null);
      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuthToken(null);
  };

  const getZodiacSign = (dateString) => {
    const date = new Date(dateString);
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

  const getZodiacInfo = (sign) => {
    const zodiacInfo = {
      Aries: {
        element: "Fire",
        planet: "Mars",
        gemstones: ["Ruby", "Diamond", "Jasper"],
        color: "bg-red-100",
        traits: ["Leadership", "Energy", "Confidence"],
      },
      Taurus: {
        element: "Earth",
        planet: "Venus",
        gemstones: ["Emerald", "Rose Quartz", "Jade"],
        color: "bg-green-100",
        traits: ["Stability", "Patience", "Determination"],
      },
      Gemini: {
        element: "Air",
        planet: "Mercury",
        gemstones: ["Agate", "Citrine", "Tiger's Eye"],
        color: "bg-yellow-100",
        traits: ["Communication", "Adaptability", "Intelligence"],
      },
      Cancer: {
        element: "Water",
        planet: "Moon",
        gemstones: ["Pearl", "Moonstone", "Opal"],
        color: "bg-blue-100",
        traits: ["Intuition", "Nurturing", "Emotional Depth"],
      },
      Leo: {
        element: "Fire",
        planet: "Sun",
        gemstones: ["Ruby", "Diamond", "Amber"],
        color: "bg-orange-100",
        traits: ["Creativity", "Leadership", "Confidence"],
      },
      Virgo: {
        element: "Earth",
        planet: "Mercury",
        gemstones: ["Sapphire", "Peridot", "Amazonite"],
        color: "bg-green-100",
        traits: ["Analysis", "Precision", "Service"],
      },
      Libra: {
        element: "Air",
        planet: "Venus",
        gemstones: ["Opal", "Rose Quartz", "Sapphire"],
        color: "bg-pink-100",
        traits: ["Balance", "Harmony", "Justice"],
      },
      Scorpio: {
        element: "Water",
        planet: "Pluto",
        gemstones: ["Topaz", "Malachite", "Obsidian"],
        color: "bg-purple-100",
        traits: ["Intensity", "Passion", "Transformation"],
      },
      Sagittarius: {
        element: "Fire",
        planet: "Jupiter",
        gemstones: ["Turquoise", "Lapis Lazuli", "Topaz"],
        color: "bg-blue-100",
        traits: ["Adventure", "Optimism", "Freedom"],
      },
      Capricorn: {
        element: "Earth",
        planet: "Saturn",
        gemstones: ["Garnet", "Black Onyx", "Ruby"],
        color: "bg-gray-100",
        traits: ["Ambition", "Discipline", "Patience"],
      },
      Aquarius: {
        element: "Air",
        planet: "Uranus",
        gemstones: ["Amethyst", "Aquamarine", "Garnet"],
        color: "bg-indigo-100",
        traits: ["Innovation", "Humanity", "Independence"],
      },
      Pisces: {
        element: "Water",
        planet: "Neptune",
        gemstones: ["Amethyst", "Aquamarine", "Pearl"],
        color: "bg-purple-100",
        traits: ["Intuition", "Compassion", "Creativity"],
      },
    };

    return zodiacInfo[sign] || null;
  };

  const getUserZodiacInfo = () => {
    if (user?.dateOfBirth) {
      const sign = getZodiacSign(user.dateOfBirth);
      return {
        sign,
        ...getZodiacInfo(sign),
      };
    }
    return null;
  };

  // Add these to the context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError: () => setError(null),
    getUserZodiacInfo, // Add this
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
