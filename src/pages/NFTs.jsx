import React from "react";
import { useTheme } from "../context/ThemeContext";

const NFTs = () => {
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
          NFT Gallery
        </h1>
        <p className={isDark ? "text-gray-300" : "text-gray-600"}>
          View and manage your NFT collection.
        </p>
      </div>

      <div
        className={`rounded-lg p-6 border ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <p
          className={`text-center py-8 ${
            isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Connect your wallet to view your NFTs
        </p>
      </div>
    </div>
  );
};

export default NFTs;
