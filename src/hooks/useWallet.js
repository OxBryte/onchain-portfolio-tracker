import { useState, useEffect, useCallback } from "react";
import web3Service, { NETWORKS } from "../services/web3";

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [portfolio, setPortfolio] = useState({
    balances: {},
    nfts: {},
    transactions: {},
    totalValue: 0,
  });

  // Initialize web3 service
  useEffect(() => {
    const initWeb3 = async () => {
      try {
        await web3Service.initializeProviders();
      } catch (error) {
        console.error("Failed to initialize Web3:", error);
        setError("Failed to connect to blockchain networks");
      }
    };
    initWeb3();
  }, []);

  // Connect wallet
  const connectWallet = useCallback(async (address) => {
    if (!web3Service.isValidAddress(address)) {
      setError("Invalid wallet address");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      setWalletAddress(address);
      setIsConnected(true);

      // Fetch portfolio data
      await fetchPortfolio(address);

      return true;
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setError("Failed to connect wallet");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setWalletAddress("");
    setIsConnected(false);
    setPortfolio({
      balances: {},
      nfts: {},
      transactions: {},
      totalValue: 0,
    });
    setError(null);
  }, []);

  // Fetch portfolio data for all networks
  const fetchPortfolio = useCallback(async (address) => {
    if (!address) return;

    setIsLoading(true);
    setError(null);

    try {
      const balances = {};
      const nfts = {};
      const transactions = {};
      let totalValue = 0;

      // Fetch data for each network
      for (const [networkKey, network] of Object.entries(NETWORKS)) {
        try {
          // Get native token balance
          const nativeBalance = await web3Service.getWalletBalance(
            address,
            networkKey
          );
          const nativePrice = await web3Service.getTokenPrice(
            network.nativeCurrency.symbol
          );
          const nativeValue = parseFloat(nativeBalance) * nativePrice;

          balances[networkKey] = {
            native: {
              balance: nativeBalance,
              symbol: network.nativeCurrency.symbol,
              value: nativeValue,
              price: nativePrice,
            },
            tokens: [],
          };

          totalValue += nativeValue;

          // Get NFTs
          const networkNFTs = await web3Service.getNFTs(address, networkKey);
          nfts[networkKey] = networkNFTs;

          // Get transaction history
          const networkTransactions = await web3Service.getTransactionHistory(
            address,
            networkKey
          );
          transactions[networkKey] = networkTransactions;
        } catch (error) {
          console.error(`Failed to fetch data for ${networkKey}:`, error);
          // Continue with other networks even if one fails
        }
      }

      setPortfolio({
        balances,
        nfts,
        transactions,
        totalValue,
      });
    } catch (error) {
      console.error("Failed to fetch portfolio:", error);
      setError("Failed to fetch portfolio data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh portfolio data
  const refreshPortfolio = useCallback(() => {
    if (walletAddress) {
      fetchPortfolio(walletAddress);
    }
  }, [walletAddress, fetchPortfolio]);

  // Get balance for specific network
  const getNetworkBalance = useCallback(
    (network) => {
      return portfolio.balances[network]?.native || null;
    },
    [portfolio.balances]
  );

  // Get NFTs for specific network
  const getNetworkNFTs = useCallback(
    (network) => {
      return portfolio.nfts[network] || [];
    },
    [portfolio.nfts]
  );

  // Get transactions for specific network
  const getNetworkTransactions = useCallback(
    (network) => {
      return portfolio.transactions[network] || [];
    },
    [portfolio.transactions]
  );

  // Get total portfolio value
  const getTotalValue = useCallback(() => {
    return portfolio.totalValue;
  }, [portfolio.totalValue]);

  // Get all supported networks
  const getSupportedNetworks = useCallback(() => {
    return Object.keys(NETWORKS);
  }, []);

  // Auto-refresh portfolio every 30 seconds when connected
  useEffect(() => {
    if (!isConnected || !walletAddress) return;

    const interval = setInterval(() => {
      refreshPortfolio();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [isConnected, walletAddress, refreshPortfolio]);

  return {
    // State
    walletAddress,
    isConnected,
    isLoading,
    error,
    portfolio,

    // Actions
    connectWallet,
    disconnectWallet,
    refreshPortfolio,

    // Getters
    getNetworkBalance,
    getNetworkNFTs,
    getNetworkTransactions,
    getTotalValue,
    getSupportedNetworks,

    // Utilities
    isValidAddress: web3Service.isValidAddress,
    formatAddress: web3Service.formatAddress,
  };
};
