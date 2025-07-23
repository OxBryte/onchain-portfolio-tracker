import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useWalletConnection } from "../hooks/useWalletConnection";

const NFTs = () => {
  const { isDark } = useTheme();
  const {
    account,
    connectWallet,
    isConnecting,
    isConnected,
    error: walletError,
  } = useWalletConnection();

  const [selectedNetwork, setSelectedNetwork] = useState("all");

  // Function to format the address for display (0x1234...5678)
  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // These functions would need to be implemented to fetch actual NFT data
  const getNetworkNFTs = (network) => {
    // Placeholder function - replace with actual implementation
    return [];
  };

  const getSupportedNetworks = () => {
    // Placeholder function - replace with actual implementation
    return ["ethereum", "base", "polygon", "optimism"];
  };

  // Get all NFTs from all networks or filtered by network
  const getAllNFTs = () => {
    if (!account) return [];

    const allNFTs = [];
    const networks = getSupportedNetworks();

    networks.forEach((network) => {
      if (selectedNetwork === "all" || selectedNetwork === network) {
        const networkNFTs = getNetworkNFTs(network);
        networkNFTs.forEach((nft) => {
          allNFTs.push({
            ...nft,
            network,
            // Enhanced metadata for display
            name: nft.name || `NFT #${nft.tokenId}`,
            collection:
              nft.collection ||
              `${
                network.charAt(0).toUpperCase() + network.slice(1)
              } Collection`,
            image:
              nft.image ||
              `https://via.placeholder.com/300/6366f1/ffffff?text=${network.toUpperCase()}`,
            floorPrice: nft.floorPrice || "0.1 ETH",
            value: nft.value || "0.15 ETH",
            rarity: nft.rarity || "Common",
            attributes: nft.attributes || [],
          });
        });
      }
    });

    return allNFTs;
  };

  const nfts = getAllNFTs();
  const networks = getSupportedNetworks();

  // Show connect wallet UI if no wallet is connected
  if (!isConnected) {
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
            View and manage your NFT collection across multiple blockchains.
          </p>
        </div>

        <div
          className={`rounded-lg p-8 border text-center ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              isDark ? "bg-purple-600/20" : "bg-purple-100"
            }`}
          >
            <svg
              className="w-8 h-8 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-semibold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            No Wallet Connected
          </h3>
          <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Connect your wallet to view your NFT collection
          </p>
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isDark
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-purple-500 hover:bg-purple-600 text-white"
            }`}
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
    );
  }

  // Show loading state
  if (isConnecting) {
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
            Loading NFT collection...
          </p>
        </div>

        <div
          className={`rounded-lg p-8 border text-center ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-8 w-8 text-purple-500"
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
              Fetching NFTs from blockchain...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (walletError) {
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
            Error loading NFT collection
          </p>
        </div>

        <div
          className={`rounded-lg p-8 border text-center ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              isDark ? "bg-red-600/20" : "bg-red-100"
            }`}
          >
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-semibold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Connection Error
          </h3>
          <p className={`mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            {walletError}
          </p>
          <button
            onClick={() => window.location.reload()}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isDark
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-purple-500 hover:bg-purple-600 text-white"
            }`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
              NFT Gallery
            </h1>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              NFTs for wallet: {formatAddress(account)}
            </p>
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

      {nfts.length > 0 ? (
        <>
          {/* Network Filter */}
          <div
            className={`rounded-lg p-4 border ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-3 ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Filter by Network
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedNetwork("all")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedNetwork === "all"
                    ? "bg-purple-600 text-white"
                    : isDark
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Networks ({nfts.length})
              </button>
              {networks.map((network) => {
                const networkNFTs = getNetworkNFTs(network);
                return (
                  <button
                    key={network}
                    onClick={() => setSelectedNetwork(network)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedNetwork === network
                        ? "bg-purple-600 text-white"
                        : networkNFTs.length > 0
                        ? isDark
                          ? "bg-purple-100/20 text-purple-300 hover:bg-purple-100/30"
                          : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                        : isDark
                        ? "bg-gray-700 text-gray-400"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {network.charAt(0).toUpperCase() + network.slice(1)} (
                    {networkNFTs.length})
                  </button>
                );
              })}
            </div>
          </div>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {nfts.map((nft, index) => (
              <div
                key={`${nft.network}-${nft.tokenId}-${index}`}
                className={`rounded-lg border overflow-hidden transition-all hover:scale-105 hover:shadow-lg ${
                  isDark
                    ? "bg-gray-800 border-gray-700 hover:border-purple-500"
                    : "bg-white border-gray-200 hover:border-purple-300"
                }`}
              >
                <div className="relative">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300/6366f1/ffffff?text=${nft.network.toUpperCase()}`;
                    }}
                  />
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                      isDark
                        ? "bg-gray-900/80 text-white"
                        : "bg-white/80 text-gray-900"
                    }`}
                  >
                    #{nft.tokenId}
                  </div>
                  <div
                    className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium bg-blue-500 text-white`}
                  >
                    {nft.network.toUpperCase()}
                  </div>
                  {nft.rarity && (
                    <div
                      className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
                        nft.rarity === "Legendary"
                          ? "bg-yellow-500 text-white"
                          : nft.rarity === "Epic"
                          ? "bg-purple-500 text-white"
                          : nft.rarity === "Rare"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-500 text-white"
                      }`}
                    >
                      {nft.rarity}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3
                    className={`font-semibold mb-1 truncate ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {nft.name}
                  </h3>
                  <p
                    className={`text-sm mb-3 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {nft.collection}
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span
                        className={isDark ? "text-gray-400" : "text-gray-500"}
                      >
                        Floor Price:
                      </span>
                      <span className="font-medium text-green-500">
                        {nft.floorPrice}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span
                        className={isDark ? "text-gray-400" : "text-gray-500"}
                      >
                        Estimated Value:
                      </span>
                      <span className="font-medium text-blue-500">
                        {nft.value}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span
                        className={isDark ? "text-gray-400" : "text-gray-500"}
                      >
                        Contract:
                      </span>
                      <span
                        className={`font-mono text-xs ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {nft.contractAddress.slice(0, 6)}...
                        {nft.contractAddress.slice(-4)}
                      </span>
                    </div>
                    {nft.attributes && nft.attributes.length > 0 && (
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                        <p
                          className={`text-xs mb-1 ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Attributes:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {nft.attributes.slice(0, 3).map((attr, idx) => (
                            <span
                              key={idx}
                              className={`px-1 py-0.5 rounded text-xs ${
                                isDark
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {attr.trait_type}: {attr.value}
                            </span>
                          ))}
                          {nft.attributes.length > 3 && (
                            <span
                              className={`px-1 py-0.5 rounded text-xs ${
                                isDark
                                  ? "bg-gray-700 text-gray-300"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              +{nft.attributes.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div
          className={`rounded-lg p-8 border text-center ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              isDark ? "bg-gray-600" : "bg-gray-200"
            }`}
          >
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-semibold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            No NFTs Found
          </h3>
          <p className={isDark ? "text-gray-400" : "text-gray-500"}>
            This wallet doesn't have any NFTs on the selected networks or
            they're not visible yet.
          </p>
          <div className="mt-4">
            <p
              className={`text-sm ${
                isDark ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Supported networks: {networks.join(", ")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTs;
