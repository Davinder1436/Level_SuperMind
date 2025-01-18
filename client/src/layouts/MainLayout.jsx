import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";
import { useAuth } from "../hooks/useAuth";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Check if current route is a public route
  const isPublicRoute = ["/", "/about", "/contact"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        {/* Show sidebar only for authenticated users and non-public routes */}
        {isAuthenticated && !isPublicRoute && (
          <Sidebar className="w-64 hidden lg:block" />
        )}

        <main className="flex-1 p-4 lg:p-8">
          {/* Mobile sidebar toggle for authenticated users */}
          {isAuthenticated && !isPublicRoute && (
            <div className="lg:hidden mb-4">
              <button
                type="button"
                className="text-gray-600 hover:text-gray-900"
                onClick={() => {
                  /* Toggle mobile sidebar */
                }}>
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Page content */}
          <div
            className={`${
              isAuthenticated && !isPublicRoute ? "lg:ml-64" : ""
            }`}>
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
