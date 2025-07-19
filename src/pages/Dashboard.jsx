import React from "react";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const { isDark } = useTheme();

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
          Dashboard
        </h1>
        <p className={isDark ? "text-gray-300" : "text-gray-600"}>
          Welcome to your onchain portfolio dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className={`rounded-lg p-6 border ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Total Portfolio Value
          </h3>
          <p className="text-2xl font-bold text-green-500">$0.00</p>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Connect wallet to view
          </p>
        </div>

        <div
          className={`rounded-lg p-6 border ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Assets
          </h3>
          <p className="text-2xl font-bold text-blue-500">0</p>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Different tokens
          </p>
        </div>

        <div
          className={`rounded-lg p-6 border ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <h3
            className={`text-lg font-semibold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            NFTs
          </h3>
          <p className="text-2xl font-bold text-purple-500">0</p>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            In your collection
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
