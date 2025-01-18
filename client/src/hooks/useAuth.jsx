import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:3000/api";

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
