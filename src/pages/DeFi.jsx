import React from "react";
import DeFiTable from "../features/defi/DeFiTable";
import { useTheme } from "../context/ThemeContext";

const DeFi = () => {
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
          DeFi on Base
        </h1>
        <p className={isDark ? "text-gray-300" : "text-gray-600"}>
          Explore top DeFi tokens and pairs on the Base blockchain, powered by
          DEX Screener.
        </p>
      </div>
      <DeFiTable />
    </div>
  );
};

export default DeFi;
