import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useWalletContext } from "../context/WalletContext";

const Transactions = () => {
  const { isDark } = useTheme();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const {
    isConnected,
    walletAddress,
    connectWallet,
    getNetworkTransactions,
    getSupportedNetworks,
    formatAddress,
    isLoading: walletLoading,
    error: walletError,
  } = useWalletContext();

  const currentWalletAddress = searchParams.get("walletAddress");

  // Auto-connect wallet if address is provided in URL
  useEffect(() => {
    if (currentWalletAddress && !isConnected && !walletLoading) {
      setLoading(true);
      connectWallet(currentWalletAddress).finally(() => {
        setLoading(false);
      });
    }
  }, [currentWalletAddress, isConnected, connectWallet, walletLoading]);

  const handleSearchWallet = () => {
    navigate("/?walletAddress=");
  };

  // Show search prompt if no wallet address
  if (!currentWalletAddress || (!isConnected && !loading)) {
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
            Transaction History
          </h1>
          <p className={isDark ? "text-gray-300" : "text-gray-600"}>
            View transaction history across multiple blockchains.
          </p>
        </div>

        <div
          className={`rounded-lg p-8 border text-center ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              isDark ? "bg-blue-600/20" : "bg-blue-100"
            }`}
          >
            <svg
              className="w-8 h-8 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
            Connect a wallet or search for an address to view transaction
            history
          </p>
          <button
            onClick={handleSearchWallet}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              isDark
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Search Wallet Address
          </button>
        </div>
      </div>
    );
  }

  // Get all transactions from all networks or filtered by network
  const getAllTransactions = () => {
    const allTransactions = [];
    const networks = getSupportedNetworks();

    networks.forEach((network) => {
      if (selectedNetwork === "all" || selectedNetwork === network) {
        const networkTransactions = getNetworkTransactions(network);
        networkTransactions.forEach((tx) => {
          // Determine transaction type
          let type = "transfer";
          if (tx.to === currentWalletAddress.toLowerCase()) {
            type = "received";
          } else if (tx.from === currentWalletAddress.toLowerCase()) {
            type = "sent";
          }

          // Filter by type if selected
          if (selectedType === "all" || selectedType === type) {
            allTransactions.push({
              ...tx,
              network,
              type,
              // Enhanced display data
              amount: tx.value || "0",
              gasUsed: tx.gasUsed || "0",
              gasPrice: tx.gasPrice || "0",
              status: tx.status || "confirmed",
              timestamp: tx.timestamp || Date.now(),
            });
          }
        });
      }
    });

    // Sort by timestamp (newest first)
    return allTransactions.sort((a, b) => b.timestamp - a.timestamp);
  };

  const allTransactions = getAllTransactions();
  const networks = getSupportedNetworks();

  // Pagination
  const totalPages = Math.ceil(allTransactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = allTransactions.slice(startIndex, endIndex);

  // Show loading state
  if (loading || walletLoading) {
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
            Transaction History
          </h1>
          <p className={isDark ? "text-gray-300" : "text-gray-600"}>
            Loading transaction history...
          </p>
        </div>

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
              Fetching transactions from blockchain...
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
            Transaction History
          </h1>
          <p className={isDark ? "text-gray-300" : "text-gray-600"}>
            Error loading transaction history
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
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Format address for display
  const formatAddressDisplay = (address) => {
    if (!address) return "N/A";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get transaction status color
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  // Get transaction type color
  const getTypeColor = (type) => {
    switch (type) {
      case "sent":
        return "text-red-500";
      case "received":
        return "text-green-500";
      default:
        return "text-blue-500";
    }
  };

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
              Transaction History
            </h1>
            <p className={isDark ? "text-gray-300" : "text-gray-600"}>
              Transactions for wallet: {formatAddress(currentWalletAddress)}
            </p>
          </div>
          <div className="text-right">
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Total Transactions
            </p>
            <p
              className={`text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {allTransactions.length}
            </p>
          </div>
        </div>
      </div>

      {allTransactions.length > 0 ? (
        <>
          {/* Filters */}
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
              Filters
            </h3>
            <div className="flex flex-wrap gap-4">
              {/* Network Filter */}
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Network
                </label>
                <select
                  value={selectedNetwork}
                  onChange={(e) => setSelectedNetwork(e.target.value)}
                  className={`px-3 py-2 rounded-lg border text-sm ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="all">All Networks</option>
                  {networks.map((network) => (
                    <option key={network} value={network}>
                      {network.charAt(0).toUpperCase() + network.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className={`px-3 py-2 rounded-lg border text-sm ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="all">All Types</option>
                  <option value="sent">Sent</option>
                  <option value="received">Received</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div
            className={`rounded-lg border overflow-hidden ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
                  <tr>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Transaction
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Type
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Amount
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Network
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Status
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                        isDark ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${
                    isDark ? "divide-gray-700" : "divide-gray-200"
                  }`}
                >
                  {currentTransactions.map((tx, index) => (
                    <tr
                      key={`${tx.network}-${tx.hash}-${index}`}
                      className={`hover:${
                        isDark ? "bg-gray-700" : "bg-gray-50"
                      } transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isDark ? "bg-gray-600" : "bg-gray-200"
                              }`}
                            >
                              <svg
                                className="w-4 h-4 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div
                              className={`text-sm font-medium ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {formatAddressDisplay(tx.hash)}
                            </div>
                            <div
                              className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              {tx.from === currentWalletAddress.toLowerCase()
                                ? `To: ${formatAddressDisplay(tx.to)}`
                                : `From: ${formatAddressDisplay(tx.from)}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(
                            tx.type
                          )} ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
                        >
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm font-medium ${getTypeColor(
                            tx.type
                          )}`}
                        >
                          {tx.type === "sent" ? "-" : "+"}
                          {parseFloat(tx.amount).toFixed(4)} ETH
                        </div>
                        <div
                          className={`text-xs ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Gas: {tx.gasUsed}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800`}
                        >
                          {tx.network.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            tx.status
                          )} ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
                        >
                          {tx.status.charAt(0).toUpperCase() +
                            tx.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div
                          className={isDark ? "text-gray-300" : "text-gray-900"}
                        >
                          {formatTimestamp(tx.timestamp)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className={`rounded-lg p-4 border ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, allTransactions.length)} of{" "}
                  {allTransactions.length} transactions
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : isDark
                            ? "text-gray-300 hover:text-white"
                            : "text-gray-700 hover:text-gray-900"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : isDark
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3
            className={`text-xl font-semibold mb-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            No Transactions Found
          </h3>
          <p className={isDark ? "text-gray-400" : "text-gray-500"}>
            This wallet doesn't have any transactions on the selected networks.
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

export default Transactions;
