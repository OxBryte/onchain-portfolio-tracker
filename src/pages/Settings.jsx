import React from "react";
import { useTheme } from "../context/ThemeContext";

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div
        className={`rounded-lg p-6 border ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Settings
        </h1>
        <p className={isDark ? "text-gray-300" : "text-gray-600"}>
          Configure your portfolio tracker preferences.
        </p>
      </div>

      <div
        className={`rounded-lg p-6 border ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={isDark ? "text-gray-300" : "text-gray-700"}>
              Dark Theme
            </span>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isDark ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className={isDark ? "text-gray-300" : "text-gray-700"}>
              Notifications
            </span>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isDark ? "bg-gray-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
