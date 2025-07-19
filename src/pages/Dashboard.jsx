import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Dashboard = () => {
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const currentWalletAddress = searchParams.get("walletAddress");

  useEffect(() => {
    if (currentWalletAddress) {
      setWalletAddress(currentWalletAddress);
    }
  }, [currentWalletAddress]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (walletAddress.trim()) {
      setIsSearching(true);
      // Simulate API call delay
      setTimeout(() => {
        navigate(`/?walletAddress=${walletAddress.trim()}`);
        setIsSearching(false);
      }, 1000);
    }
  };

  const handleClear = () => {
    setWalletAddress("");
    navigate("/");
  };

  // Show search form if no wallet address
  if (!currentWalletAddress) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div
          className={`w-full max-w-md p-8 rounded-lg border ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="text-center mb-8">
            <h1
              className={`text-3xl font-bold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Portfolio Tracker
            </h1>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              Enter a wallet address to view portfolio details
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label
                htmlFor="walletAddress"
                className={`block text-sm font-medium mb-2 ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Wallet Address
              </label>
              <input
                type="text"
                id="walletAddress"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="0x..."
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSearching || !walletAddress.trim()}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                isSearching || !walletAddress.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
            >
              {isSearching ? "Searching..." : "Search Portfolio"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Show dashboard details when wallet address is provided
  return (
    <div className="space-y-6">
      <div
        className={`rounded-lg p-6 border ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1
              className={`text-3xl font-bold mb-2 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Dashboard
            </h1>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              Portfolio for wallet: {currentWalletAddress.slice(0, 8)}...
              {currentWalletAddress.slice(-6)}
            </p>
          </div>
          <button
            onClick={handleClear}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
            }`}
          >
            Change Wallet
          </button>
        </div>
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
            Loading portfolio data...
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
