import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

// Layout Components
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Public Pages
import LandingPage from "./pages/public/LandingPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import AboutPage from "./pages/public/AboutPage";
import ContactPage from "./pages/public/ContactPage";

// Protected Pages
import Dashboard from "./pages/protected/Dashboard";
import Profile from "./pages/protected/Profile";
import KundaliPage from "./pages/protected/KundaliPage";
import HoroscopePage from "./pages/protected/HoroscopePage";
import RecommendationsPage from "./pages/protected/RecommendationsPage";
import GemstoneRecommendations from "./pages/protected/recommendations/GemstoneRecommendations";
import RitualRecommendations from "./pages/protected/recommendations/RitualRecommendations";
import PracticeRecommendations from "./pages/protected/recommendations/PracticeRecommendations";
import ChatPage from "./pages/protected/ChatPage";
import MeditationPage from "./pages/protected/MeditationPage";
import WorkoutPage from "./pages/protected/WorkoutPage";
import SleepPage from "./pages/protected/SleepPage";
import SettingsPage from "./pages/protected/SettingsPage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }

  return children;
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (isAuthenticated) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return children;
};

const App = () => {
  return (
    <Routes>
      {/* Auth Routes - will redirect to dashboard if logged in */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginPage />
            </AuthRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRoute>
              <RegisterPage />
            </AuthRoute>
          }
        />
      </Route>

      {/* Public Routes with Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kundali"
          element={
            <ProtectedRoute>
              <KundaliPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/horoscope"
          element={
            <ProtectedRoute>
              <HoroscopePage />
            </ProtectedRoute>
          }
        />

        {/* Recommendations Routes */}
        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <RecommendationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations/gemstones"
          element={
            <ProtectedRoute>
              <GemstoneRecommendations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations/rituals"
          element={
            <ProtectedRoute>
              <RitualRecommendations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations/practices"
          element={
            <ProtectedRoute>
              <PracticeRecommendations />
            </ProtectedRoute>
          }
        />

        {/* Feature Routes */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/meditation"
          element={
            <ProtectedRoute>
              <MeditationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/workout"
          element={
            <ProtectedRoute>
              <WorkoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sleep"
          element={
            <ProtectedRoute>
              <SleepPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
