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
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div
          className={`w-full max-w-2xl p-12 rounded-2xl border shadow-2xl ${
            isDark
              ? "bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600 shadow-gray-900/50"
              : "bg-gradient-to-br from-white to-gray-50 border-gray-200 shadow-gray-200/50"
          }`}
        >
          <div className="text-center mb-10">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                isDark ? "bg-blue-600/20" : "bg-blue-100"
              }`}
            >
              <svg
                className="w-10 h-10 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1
              className={`text-4xl font-bold mb-4 bg-gradient-to-r ${
                isDark
                  ? "from-blue-400 to-purple-400"
                  : "from-blue-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              Portfolio Tracker
            </h1>
            <p
              className={`text-lg ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Enter a wallet address to view portfolio details
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            <div>
              <label
                htmlFor="walletAddress"
                className={`block text-sm font-semibold mb-3 uppercase tracking-wide ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Wallet Address
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="walletAddress"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="0x..."
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 focus:outline-none focus:ring-4 transition-all duration-200 ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                  }`}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSearching || !walletAddress.trim()}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                isSearching || !walletAddress.trim()
                  ? "bg-gray-400 cursor-not-allowed scale-100"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              } text-white`}
            >
              {isSearching ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Searching...
                </div>
              ) : (
                "Search Portfolio"
              )}
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
