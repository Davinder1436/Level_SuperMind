import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";
import { useAuth } from "../hooks/useAuth";
import { Menu, X } from "lucide-react";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Check if current route is a public route
  const isPublicRoute = ["/", "/about", "/contact"].includes(location.pathname);

  // Determine if sidebar should be shown
  const showSidebar = isAuthenticated && !isPublicRoute;

  return (
    <div className="min-h-screen bg-[#FFFFF4]">
      <Navbar />
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(#151616 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
            opacity: "0.1",
          }}
        />
      </div>

      <div className="flex pt-16">
        {/* Desktop Sidebar */}
        {showSidebar && <Sidebar className="w-64 hidden lg:block" />}
        {/* Mobile Sidebar */}
        <AnimatePresence>
          {showSidebar && isMobileSidebarOpen && (
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="fixed inset-0 z-50 lg:hidden">
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-[#151616]/20 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileSidebarOpen(false)}
              />

              {/* Sidebar */}
              <Sidebar className="w-64 relative z-50" />
            </motion.div>
          )}
        </AnimatePresence>
        <main className="flex-1">
          {/* Mobile Sidebar Toggle */}
          {showSidebar && (
            <div className="lg:hidden p-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileSidebarOpen(true)}
                className="p-2 rounded-xl border-2 border-[#151616] hover:bg-[#D6F32F]/10">
                <Menu className="w-6 h-6 text-[#151616]" />
              </motion.button>
            </div>
          )}

          {/* Page Content */}
          <div className={`p-4 lg:p-8 ${showSidebar ? "lg:ml-64" : ""}`}>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Only show Footer when sidebar is not present */}
      {!showSidebar && <Footer />}
    </div>
  );
};

export default MainLayout;
