import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3000/api";

  const authAxios = axios.create({
    baseURL: API_URL,
  });

  // Set auth token in axios header
  const setAuthToken = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      authAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete authAxios.defaults.headers.common["Authorization"];
    }
  };

  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleError = (error) => {
    const message = error.response?.data?.message || "An error occurred";
    setError(message);
    return Promise.reject(message);
  };

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        return;
      }
      const response = await authAxios.get("/auth/me");
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
      setAuthToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await authAxios.post("/auth/signin", {
        email,
        password,
      });

      const { user, token } = response.data;
      setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
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
      setAuthToken(token);
      setUser(user);
      setIsAuthenticated(true);
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
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError: () => setError(null),
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
