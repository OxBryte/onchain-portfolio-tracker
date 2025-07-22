import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import { WalletProvider } from "./context/WalletContext";
import "./App.css";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// Configuration (should match what's in Header.js)
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;
console.log(projectId);


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


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds simulated delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 dark:bg-gray-900">
        <h2 className="text-2xl font-semibold text-white">Loading...</h2>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <WalletProvider>
        <AppRoutes />
      </WalletProvider>
    </ThemeProvider>
  );
}

export default App;
