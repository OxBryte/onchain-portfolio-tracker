import React from "react";
import { useTheme } from "../context/ThemeContext";

const NotFound = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <h1
        className={`text-4xl font-bold mb-4 ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        404 - Page Not Found
      </h1>
      <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className={`transition-colors ${
          isDark
            ? "text-blue-400 hover:text-blue-300"
            : "text-blue-600 hover:text-blue-800"
        }`}
      >
        Go back to Dashboard
      </a>
    </div>
  );
};

export default NotFound;
