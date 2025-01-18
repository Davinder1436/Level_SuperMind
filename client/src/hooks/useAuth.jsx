// src/hooks/useAuth.js

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create Auth Context
const AuthContext = createContext(null);

// User type definition
const initialUser = {
  id: null,
  name: "",
  email: "",
  birthDate: null,
  birthTime: null,
  birthLocation: null,
  gender: null,
  profileComplete: false,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get API URL from environment variable
  const API_URL = "http://localhost:3000/api";

  // Configure axios instance
  const authAxios = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Important for handling cookies
  });

  // Handle API errors
  const handleError = (error) => {
    const message =
      error.response?.data?.message || error.message || "An error occurred";
    setError(message);
    return Promise.reject(message);
  };

  // Check if user is already authenticated
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const response = await authAxios.get("/auth/me");

      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await authAxios.post("/auth/login", {
        email,
        password,
      });

      setUser(response.data.user);
      setIsAuthenticated(true);
      setError(null);
      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setIsLoading(true);
      const response = await authAxios.post("/auth/register", userData);

      setUser(response.data.user);
      setIsAuthenticated(true);
      setError(null);
      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      await authAxios.post("/auth/logout");

      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    } catch (err) {
      return handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setIsLoading(true);
      const response = await authAxios.put("/auth/profile", profileData);

      setUser(response.data.user);
      setError(null);
      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Password reset request
  const requestPasswordReset = async (email) => {
    try {
      setIsLoading(true);
      const response = await authAxios.post("/auth/forgot-password", { email });
      setError(null);
      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (token, newPassword) => {
    try {
      setIsLoading(true);
      const response = await authAxios.post("/auth/reset-password", {
        token,
        password: newPassword,
      });
      setError(null);
      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Complete birth details
  const completeBirthDetails = async (birthDetails) => {
    try {
      setIsLoading(true);
      const response = await authAxios.post(
        "/auth/birth-details",
        birthDetails
      );

      setUser({
        ...user,
        ...response.data.user,
        profileComplete: true,
      });
      setError(null);
      return response.data;
    } catch (err) {
      return handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Auth context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    requestPasswordReset,
    resetPassword,
    completeBirthDetails,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
