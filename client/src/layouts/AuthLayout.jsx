import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Bot } from "lucide-react";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Bot className="w-auto h-12 text-white" />
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10">
          <Outlet />
        </div>

        {/* Auth page footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-200">
            By continuing, you agree to our{" "}
            <a
              href="/terms"
              className="font-medium text-white hover:text-gray-200">
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="font-medium text-white hover:text-gray-200">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
