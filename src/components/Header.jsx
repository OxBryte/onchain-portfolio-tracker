import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useWalletContext } from "../context/WalletContext";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
  useDisconnect,
} from "@web3modal/ethers/react";

// WalletConnect configuration
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID";

const metadata = {
  name: "Portfolio Tracker",
  description: "Crypto Portfolio Tracking App",
  url: "https://your-app-domain.com",
  icons: ["https://your-app-domain.com/icon.png"],
};

const chains = [
  {
    chainId: 1,
    name: "Ethereum",
    currency: "ETH",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://cloudflare-eth.com",
  },
];

const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: "https://cloudflare-eth.com",
  defaultChainId: 1,
});

// Initialize Web3Modal
createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true,
});

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { getTotalValue, getNetworkBalance } = useWalletContext();

  // WalletConnect hooks
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { disconnect } = useDisconnect();

  // ETH price state
  const [ethPrice, setEthPrice] = useState(null);
  const [priceChange24h, setPriceChange24h] = useState(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);

  // Fetch ETH price from CoinGecko
  const fetchEthPrice = async () => {
    try {
      setIsLoadingPrice(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_24hr_change=true"
      );
      const data = await response.json();

      if (data.ethereum) {
        setEthPrice(data.ethereum.usd);
        setPriceChange24h(data.ethereum.usd_24h_change);
      }
    } catch (error) {
      console.error("Error fetching ETH price:", error);
    } finally {
      setIsLoadingPrice(false);
    }
  };

  // Fetch price on component mount and set up interval
  useEffect(() => {
    fetchEthPrice();

    // Update price every 30 seconds
    const priceInterval = setInterval(fetchEthPrice, 30000);

    return () => clearInterval(priceInterval);
  }, []);

  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return "";
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const totalValue = getTotalValue();
  const ethereumBalance = getNetworkBalance("ethereum");

  // Handle wallet connection
  const handleConnectWallet = async () => {
    try {
      // This will open the Web3Modal
      const modal = document.querySelector("w3m-modal");
      if (modal) {
        modal.open = true;
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Handle wallet disconnection
  const handleDisconnectWallet = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  return (
    <header
      className={`border-b sticky top-0 z-50 ${
        isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Logo/Brand */}
        <div className="flex items-center space-x-4">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isDark ? "bg-blue-600" : "bg-blue-500"
            }`}
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h1
            className={`text-xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Portfolio Tracker
          </h1>
        </div>

        {/* Center - Quick Stats */}
        <div className="hidden md:flex items-center space-x-6">
          {/* ETH Price */}
          <div className="text-center">
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              ETH Price
            </p>
            <div className="flex items-center space-x-1">
              {isLoadingPrice ? (
                <div className="animate-pulse">
                  <div
                    className={`h-4 w-16 rounded ${
                      isDark ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  ></div>
                </div>
              ) : (
                <>
                  <p
                    className={`font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    ${ethPrice ? ethPrice.toLocaleString() : "N/A"}
                  </p>
                  {priceChange24h && (
                    <span
                      className={`text-xs px-1 py-0.5 rounded ${
                        priceChange24h >= 0
                          ? "text-green-500 bg-green-500/10"
                          : "text-red-500 bg-red-500/10"
                      }`}
                    >
                      {priceChange24h >= 0 ? "+" : ""}
                      {priceChange24h.toFixed(2)}%
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Total Value */}
          <div className="text-center">
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Total Value
            </p>
            <p
              className={`font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              ${totalValue.toFixed(2)}
            </p>
          </div>

          {/* Portfolio 24h Change */}
          <div className="text-center">
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              24h Change
            </p>
            <p className="font-semibold text-green-500">+0.00%</p>
          </div>

          {/* ETH Balance */}
          <div className="text-center">
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              ETH Balance
            </p>
            <p
              className={`font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {ethereumBalance
                ? `${parseFloat(ethereumBalance.balance).toFixed(4)} ETH`
                : "0.0000 ETH"}
            </p>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Refresh Price Button */}
          <button
            onClick={fetchEthPrice}
            disabled={isLoadingPrice}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? "text-gray-300 hover:text-white hover:bg-gray-700 disabled:opacity-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50"
            }`}
            title="Refresh ETH price"
          >
            <svg
              className={`w-4 h-4 ${isLoadingPrice ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${
              isDark
                ? "text-gray-300 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {isDark ? (
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
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
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
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* Notifications */}
          <button
            className={`p-2 rounded-lg transition-colors relative ${
              isDark
                ? "text-gray-300 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
                d="M15 17h5l-5 5v-5zM4.19 4.19A4 4 0 004 6v6a4 4 0 004 4h6a4 4 0 004-4V6a4 4 0 00-4-4H6a4 4 0 00-2.81 1.19z"
              />
            </svg>
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Wallet Connection */}
          {isConnected ? (
            <div className="flex items-center space-x-2">
              <div
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 ${
                  isDark
                    ? "bg-green-600/20 text-green-400 border border-green-600/30"
                    : "bg-green-100 text-green-800 border border-green-200"
                }`}
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{formatAddress(address)}</span>
              </div>
              <button
                onClick={handleDisconnectWallet}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <w3m-button />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
