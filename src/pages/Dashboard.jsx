import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useWalletConnection } from "../hooks/useWalletConnection";

const Dashboard = () => {
  const { isDark } = useTheme();
  const {
    account,
    connectWallet,
    disconnectWallet,
    isConnected,
    isConnecting,
    error: walletError,
  } = useWalletConnection();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const currentWalletAddress = searchParams.get("walletAddress");

  useEffect(() => {
    if (currentWalletAddress) {
      setWalletAddress(currentWalletAddress);
      // Connect wallet if not already connected
      if (!isConnected) {
        handleConnectWallet(currentWalletAddress);
      }
    }
  }, [currentWalletAddress, isConnected]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (walletAddress.trim()) {
      setIsSearching(true);
      const success = await handleConnectWallet(walletAddress.trim());
      if (success) {
        navigate(`/?walletAddress=${walletAddress.trim()}`);
      }
      setIsSearching(false);
    }
  };

  const handleConnectWallet = async (address) => {
    if (!isValidAddress(address)) {
      alert("Please enter a valid Ethereum address");
      return false;
    }

    try {
      const success = await connectWallet(address);
      return success;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      return false;
    }
  };

  const handleClear = () => {
    setWalletAddress("");
    disconnectWallet();
    navigate("/");
  };

  // Function to format the address for display (0x1234...5678)
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Show connect wallet UI if no wallet is connected
  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <div className={`w-full`}>
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
              Connect your wallet to view portfolio details
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className={`py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform ${
                isConnecting
                  ? "bg-gray-400 cursor-not-allowed scale-100"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              } text-white`}
            >
              {isConnecting ? (
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
                  Connecting...
                </div>
              ) : (
                "Connect Wallet"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Use these to track the portfolio data from the connected wallet
  const portfolio = {}; // Replace with actual data from your context
  const getTotalValue = () => 0; // Implement this function based on your data
  const getSupportedNetworks = () => ["ethereum", "base", "polygon"]; // Example
  const getNetworkBalance = () => null; // Implement this function
  const isLoading = false; // Replace with actual loading state

  // Show dashboard details when wallet is connected
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
              Portfolio for wallet: {formatAddress(account)}
            </p>
            {walletError && (
              <p className="text-red-500 text-sm mt-2">{walletError}</p>
            )}
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <span className={isDark ? "text-green-400" : "text-green-600"}>
              Connected:
            </span>
            <span className={isDark ? "text-gray-200" : "text-gray-700"}>
              {formatAddress(account)}
            </span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div
          className={`rounded-lg p-8 border text-center ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500"
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
            <span
              className={`text-lg ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Loading portfolio data...
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              className={`rounded-lg p-6 border ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Total Portfolio Value
              </h3>
              <p className="text-2xl font-bold text-green-500">
                ${getTotalValue().toFixed(2)}
              </p>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Across {getSupportedNetworks().length} networks
              </p>
            </div>

            <div
              className={`rounded-lg p-6 border ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Networks
              </h3>
              <p className="text-2xl font-bold text-blue-500">
                {getSupportedNetworks().length}
              </p>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Supported chains
              </p>
            </div>

            <div
              className={`rounded-lg p-6 border ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-2 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Connection Status
              </h3>
              <p
                className={`text-2xl font-bold ${
                  isConnected ? "text-green-500" : "text-red-500"
                }`}
              >
                {isConnected ? "Connected" : "Disconnected"}
              </p>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {isConnected ? "Wallet connected" : "No wallet connected"}
              </p>
            </div>
          </div>

          {/* Network Balances */}
          <div
            className={`rounded-lg p-6 border ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Network Balances
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {getSupportedNetworks().map((network) => {
                const balance = getNetworkBalance(network);
                return (
                  <div
                    key={network}
                    className={`p-4 rounded-lg border ${
                      isDark
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <h4
                      className={`font-medium mb-2 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {network.charAt(0).toUpperCase() + network.slice(1)}
                    </h4>
                    {balance ? (
                      <>
                        <p className="text-lg font-bold text-green-500">
                          {parseFloat(balance.balance).toFixed(4)}{" "}
                          {balance.symbol}
                        </p>
                        <p
                          className={`text-sm ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          ${balance.value.toFixed(2)}
                        </p>
                      </>
                    ) : (
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        No balance
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
