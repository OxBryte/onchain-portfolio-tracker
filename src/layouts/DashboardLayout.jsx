import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const DashboardLayout = ({ children }) => {
  const { isDark } = useTheme();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const getLinkClasses = (path) => {
    const active = isActive(path);
    const baseClasses =
      "transition-colors duration-200 flex items-center py-2 px-3 rounded-lg";

    if (active) {
      return `${baseClasses} ${
        isDark ? "text-white bg-blue-600" : "text-white bg-blue-600"
      }`;
    }

    return `${baseClasses} ${
      isDark
        ? "text-gray-300 hover:text-white hover:bg-gray-700"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    }`;
  };

  return (
    <div
      className={`flex min-h-screen ${isDark ? "bg-gray-900" : "bg-gray-50"}`}
    >
      <aside
        className={`w-56 p-6 border-r ${
          isDark
            ? "bg-gray-800 text-gray-100 border-gray-700"
            : "bg-white text-gray-800 border-gray-200"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-6 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Portfolio Tracker
        </h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/" className={getLinkClasses("/")}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/nfts" className={getLinkClasses("/nfts")}>
                NFTs
              </Link>
            </li>
            <li>
              <Link to="/defi" className={getLinkClasses("/defi")}>
                DeFi
              </Link>
            </li>
            <li>
              <Link to="/settings" className={getLinkClasses("/settings")}>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main
        className={`flex-1 p-8 ${
          isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
