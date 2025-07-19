import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const NFTs = () => {
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  const walletAddress = searchParams.get("walletAddress");

  useEffect(() => {
    if (walletAddress) {
      fetchNFTs();
    }
  }, [walletAddress]);

  const fetchNFTs = async () => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      // Mock NFT data
      const mockNFTs = [
        {
          id: 1,
          name: "Bored Ape #1234",
          collection: "Bored Ape Yacht Club",
          image: "https://via.placeholder.com/300/6366f1/ffffff?text=BAYC",
          floorPrice: "25.5 ETH",
          value: "28.2 ETH",
          tokenId: "1234",
          contractAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
        },
        {
          id: 2,
          name: "CryptoPunk #5678",
          collection: "CryptoPunks",
          image: "https://via.placeholder.com/300/10b981/ffffff?text=PUNK",
          floorPrice: "45.0 ETH",
          value: "52.1 ETH",
          tokenId: "5678",
          contractAddress: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
        },
        {
          id: 3,
          name: "Doodle #9012",
          collection: "Doodles",
          image: "https://via.placeholder.com/300/8b5cf6/ffffff?text=DOODLE",
          floorPrice: "3.2 ETH",
          value: "3.8 ETH",
          tokenId: "9012",
          contractAddress: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
        },
        {
          id: 4,
          name: "Azuki #3456",
          collection: "Azuki",
          image: "https://via.placeholder.com/300/ef4444/ffffff?text=AZUKI",
          floorPrice: "12.5 ETH",
          value: "14.2 ETH",
          tokenId: "3456",
          contractAddress: "0xed5af388653567af7a388d4b3b8c3b8b8b8b8b8b",
        },
      ];
      setNfts(mockNFTs);
      setLoading(false);
    }, 1500);
  };

  const handleSearchWallet = () => {
    navigate("/?walletAddress=");
  };

  // Show search prompt if no wallet address
  if (!walletAddress) {
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
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
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
            Connect a wallet or search for an address to view NFT collections
          </p>
          <button
            onClick={handleSearchWallet}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isDark
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-purple-500 hover:bg-purple-600 text-white"
            }`}
          >
            Search Wallet Address
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
              NFTs for wallet: {walletAddress.slice(0, 8)}...
              {walletAddress.slice(-6)}
            </p>
          </div>
          <div className="text-right">
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Total NFTs
            </p>
            <p
              className={`text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {nfts.length}
            </p>
          </div>
        </div>
      </div>

      {loading ? (
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
              Loading NFTs...
            </span>
          </div>
        </div>
      ) : nfts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className={`rounded-lg border overflow-hidden transition-transform hover:scale-105 ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="relative">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-48 object-cover"
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
                </div>
              </div>
            </div>
          ))}
        </div>
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
            This wallet doesn't have any NFTs or they're not visible yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default NFTs;
