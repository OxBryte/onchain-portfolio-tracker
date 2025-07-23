import React from "react";
import DeFiTable from "../features/defi/DeFiTable";
import { useTheme } from "../context/ThemeContext";
import { useWalletConnection } from "../hooks/useWalletConnection";

const DeFi = () => {
  const { isDark } = useTheme();
  const { account, connectWallet, isConnecting, isConnected, error } = useWalletConnection();
  
  // Function to format the address for display (0x1234...5678)
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="space-y-6">
      <div
        className={`rounded-lg p-6 border ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            DeFi on Base
          </h1>
          
          {isConnected ? (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
              <span className={isDark ? "text-green-400" : "text-green-600"}>
                Connected:
              </span>
              <span className={isDark ? "text-gray-200" : "text-gray-700"}>
                {formatAddress(account)}
              </span>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className={`px-4 py-2 rounded-lg font-medium ${
                isDark 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              } transition-colors`}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>
        
        <p className={isDark ? "text-gray-300" : "text-gray-600"}>
          Explore top DeFi tokens and pairs on the Base blockchain, powered by
          DEX Screener.
          {isConnected && (
            <span className="block mt-2">
              Tracking wallet: <span className="font-mono">{account}</span>
            </span>
          )}
        </p>
        
        {error && (
          <div className="mt-2 text-red-500">
            Error: {error}
          </div>
        )}
      </div>
      
      {/* Pass the account to DeFiTable to use for tracking */}
      <DeFiTable walletAddress={account} />
    </div>
  );
};

export default DeFi;
