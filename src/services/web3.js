// Web3 service for blockchain interactions
import { ethers } from "ethers";

// Network configurations
export const NETWORKS = {
  ethereum: {
    name: "Ethereum",
    chainId: 1,
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY", // Replace with your key
    blockExplorer: "https://etherscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  polygon: {
    name: "Polygon",
    chainId: 137,
    rpcUrl: "https://polygon-rpc.com",
    blockExplorer: "https://polygonscan.com",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
  },
  arbitrum: {
    name: "Arbitrum One",
    chainId: 42161,
    rpcUrl: "https://arb1.arbitrum.io/rpc",
    blockExplorer: "https://arbiscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
  optimism: {
    name: "Optimism",
    chainId: 10,
    rpcUrl: "https://mainnet.optimism.io",
    blockExplorer: "https://optimistic.etherscan.io",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
  },
};

// ERC-20 Token ABI (minimal)
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)",
  "function totalSupply() view returns (uint256)",
];

// ERC-721 NFT ABI (minimal)
const ERC721_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function ownerOf(uint256 tokenId) view returns (address)",
];

class Web3Service {
  constructor() {
    this.providers = {};
    this.currentProvider = null;
  }

  // Initialize providers for all networks
  async initializeProviders() {
    try {
      for (const [network, config] of Object.entries(NETWORKS)) {
        this.providers[network] = new ethers.JsonRpcProvider(config.rpcUrl);
      }
      console.log("Web3 providers initialized");
    } catch (error) {
      console.error("Failed to initialize providers:", error);
      throw error;
    }
  }

  // Get provider for specific network
  getProvider(network = "ethereum") {
    return this.providers[network];
  }

  // Get wallet balance for a specific network
  async getWalletBalance(address, network = "ethereum") {
    try {
      const provider = this.getProvider(network);
      const balance = await provider.getBalance(address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error(`Failed to get balance for ${network}:`, error);
      return "0";
    }
  }

  // Get token balance
  async getTokenBalance(tokenAddress, walletAddress, network = "ethereum") {
    try {
      const provider = this.getProvider(network);
      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);

      const [balance, decimals, symbol, name] = await Promise.all([
        contract.balanceOf(walletAddress),
        contract.decimals(),
        contract.symbol(),
        contract.name(),
      ]);

      return {
        balance: ethers.formatUnits(balance, decimals),
        symbol,
        name,
        decimals,
      };
    } catch (error) {
      console.error(`Failed to get token balance:`, error);
      return null;
    }
  }

  // Get NFTs for a wallet
  async getNFTs(walletAddress, network = "ethereum") {
    try {
      const provider = this.getProvider(network);
      const nfts = [];

      // Common NFT contract addresses (you can expand this)
      const nftContracts = {
        ethereum: [
          "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D", // BAYC
          "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BbB", // CryptoPunks
          "0x8a90CAb2b38dba80c64b7734e58eE1dB38B8992e", // Doodles
        ],
        polygon: [
          // Add Polygon NFT contracts
        ],
      };

      const contracts = nftContracts[network] || [];

      for (const contractAddress of contracts) {
        try {
          const contract = new ethers.Contract(
            contractAddress,
            ERC721_ABI,
            provider
          );
          const balance = await contract.balanceOf(walletAddress);

          if (balance > 0) {
            for (let i = 0; i < balance; i++) {
              try {
                const tokenId = await contract.tokenOfOwnerByIndex(
                  walletAddress,
                  i
                );
                const tokenURI = await contract.tokenURI(tokenId);

                nfts.push({
                  contractAddress,
                  tokenId: tokenId.toString(),
                  tokenURI,
                  network,
                });
              } catch (error) {
                console.error(
                  `Failed to get NFT ${i} from ${contractAddress}:`,
                  error
                );
              }
            }
          }
        } catch (error) {
          console.error(`Failed to get NFTs from ${contractAddress}:`, error);
        }
      }

      return nfts;
    } catch (error) {
      console.error("Failed to get NFTs:", error);
      return [];
    }
  }

  // Get transaction history
  async getTransactionHistory(address, network = "ethereum", limit = 50) {
    try {
      const provider = this.getProvider(network);
      const blockNumber = await provider.getBlockNumber();

      // Get recent transactions (this is a simplified approach)
      // In production, you'd want to use a proper API like Etherscan
      const transactions = [];

      // For demo purposes, we'll return mock data
      // In real implementation, you'd fetch from block explorer API
      return [
        {
          hash: "0x123...",
          from: address,
          to: "0x456...",
          value: "0.1",
          timestamp: Date.now() - 3600000,
          network,
        },
      ];
    } catch (error) {
      console.error("Failed to get transaction history:", error);
      return [];
    }
  }

  // Get token prices (you'd integrate with CoinGecko or similar)
  async getTokenPrice(symbol, network = "ethereum") {
    try {
      // Mock price data - replace with real API call
      const mockPrices = {
        ETH: 2000,
        MATIC: 0.8,
        USDC: 1.0,
        USDT: 1.0,
      };

      return mockPrices[symbol] || 0;
    } catch (error) {
      console.error("Failed to get token price:", error);
      return 0;
    }
  }

  // Validate Ethereum address
  isValidAddress(address) {
    return ethers.isAddress(address);
  }

  // Format address for display
  formatAddress(address) {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }
}

// Create singleton instance
const web3Service = new Web3Service();

export default web3Service;
