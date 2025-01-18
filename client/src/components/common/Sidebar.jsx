import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = ({ className = "" }) => {
  const { user } = useAuth();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/kundali", label: "Birth Chart", icon: "🌟" },
    { path: "/horoscope", label: "Horoscope", icon: "🌙" },
    {
      path: "/recommendations",
      label: "Recommendations",
      icon: "💎",
      subItems: [
        { path: "/recommendations/gemstones", label: "Gemstones" },
        { path: "/recommendations/rituals", label: "Rituals" },
        { path: "/recommendations/practices", label: "Practices" },
      ],
    },
    { path: "/chat", label: "Chat", icon: "💬" },
    { path: "/meditation", label: "Meditation", icon: "🧘" },
    { path: "/workout", label: "Workout", icon: "💪" },
    { path: "/sleep", label: "Sleep", icon: "😴" },
  ];

  return (
    <aside className={`bg-white shadow-lg fixed h-full ${className}`}>
      {/* User Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white">
            {user?.name?.[0] || "U"}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">
              {user?.name || "User"}
            </h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-purple-100 text-purple-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }>
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>

              {/* Sub-items if they exist */}
              {item.subItems && (
                <ul className="ml-8 mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.path}>
                      <NavLink
                        to={subItem.path}
                        className={({ isActive }) =>
                          `block px-4 py-2 text-sm rounded-md transition-colors ${
                            isActive
                              ? "bg-purple-100 text-purple-700"
                              : "text-gray-600 hover:bg-gray-100"
                          }`
                        }>
                        {subItem.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings Link */}
      <div className="absolute bottom-0 w-full p-4 border-t">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center space-x-3 px-4 py-2 rounded-md transition-colors ${
              isActive
                ? "bg-purple-100 text-purple-700"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }>
          <span>⚙️</span>
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
