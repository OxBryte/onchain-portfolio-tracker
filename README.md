# 🚀 Onchain Portfolio Tracker

<div align="center">

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Ethers.js](https://img.shields.io/badge/Ethers.js-6.15.0-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white)
![Web3Modal](https://img.shields.io/badge/Web3Modal-5.1.11-FF6B35?style=for-the-badge&logo=walletconnect&logoColor=white)

**A modern, privacy-first web application to seamlessly track, analyze, and manage your onchain crypto assets across multiple blockchains in a single, intuitive dashboard.**

[🔗 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## ✨ Features

### 🔗 **Multi-Chain Wallet Integration**

- **Direct wallet connection** via MetaMask, WalletConnect, and other Web3 providers
- **Unified experience** across all supported blockchains
- **Privacy-first approach** - no login required, no custody of funds
- **Real-time connection status** with consistent UI across all pages

### 📊 **Comprehensive Portfolio Dashboard**

- **Real-time portfolio valuation** across all connected chains
- **Asset allocation breakdown** with network-specific insights
- **Auto-refresh** portfolio data every 30 seconds
- **Historical performance tracking** and analytics
- **Responsive design** optimized for desktop and mobile

### 🖼️ **NFT Gallery & Management**

- **Multi-chain NFT viewing** with high-quality image rendering
- **Advanced filtering** by network, collection, and attributes
- **Metadata display** with detailed NFT information
- **Collection organization** and search capabilities

### 💰 **Transaction History**

- **Cross-chain transaction tracking** in a unified interface
- **Advanced filtering** by network, transaction type, and date range
- **Paginated results** for efficient browsing of large transaction sets
- **Detailed transaction information** with block explorer links

### 🏦 **DeFi Position Tracking**

- **DeFi token and pair tracking** with DEX Screener integration
- **Liquidity pool positions** and yield farming analytics
- **Real-time price data** and performance metrics
- **Base blockchain specialization** with expanded DeFi support

### 🎨 **Modern User Experience**

- **Dark/Light theme toggle** with system preference detection
- **Intuitive navigation** with React Router integration
- **Loading states and error handling** for all blockchain operations
- **Professional UI components** built with Tailwind CSS

---

## 🌐 Supported Blockchains

<div align="center">

| Blockchain    | Status          | Features                            |
| ------------- | --------------- | ----------------------------------- |
| **Ethereum**  | ✅ Full Support | Portfolio, NFTs, Transactions, DeFi |
| **Base**      | ✅ Full Support | Portfolio, NFTs, Transactions, DeFi |
| **Polygon**   | ✅ Full Support | Portfolio, NFTs, Transactions       |
| **Arbitrum**  | ✅ Full Support | Portfolio, NFTs, Transactions       |
| **Optimism**  | ✅ Full Support | Portfolio, NFTs, Transactions       |
| **BNB Chain** | ✅ Full Support | Portfolio, NFTs, Transactions       |
| **Celo**      | ✅ Full Support | Portfolio, NFTs, Transactions       |

</div>

---

## 🛠️ Technology Stack

### **Frontend Framework**

- **React 19.1.0** - Latest React with concurrent features
- **Vite 7.0.4** - Next-generation frontend tooling
- **React Router 7.7.0** - Declarative routing for React

### **Styling & UI**

- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **React Icons 5.5.0** - Popular icon library
- **Inter Font** - Modern, professional typography

### **Web3 Integration**

- **Ethers.js 6.15.0** - Ethereum library and utilities
- **Web3Modal 5.1.11** - Multi-provider Web3 modal
- **WalletConnect** - Open protocol for connecting wallets

### **State Management & Data Fetching**

- **React Query 5.83.0** - Powerful data synchronization
- **React Context** - Built-in state management
- **Custom Hooks** - Reusable wallet and connection logic

### **Development Tools**

- **ESLint 9.30.1** - Code linting and quality
- **Yarn** - Fast, reliable package manager
- **SWC** - Super-fast TypeScript/JavaScript compiler

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Yarn** package manager
- **Web3 wallet** (MetaMask, WalletConnect compatible)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/onchain-portfolio-tracker.git
   cd onchain-portfolio-tracker
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Environment setup**

   ```bash
   # Create .env file
   cp .env.example .env

   # Add your WalletConnect Project ID
   VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

4. **Start development server**

   ```bash
   yarn dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build the application
yarn build

# Preview the production build
yarn preview
```

---

## 📱 Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation and wallet connection
│   └── Loader.jsx      # Loading states
├── context/            # React Context providers
│   ├── ThemeContext.jsx    # Dark/light theme management
│   └── WalletContext.jsx   # Wallet state management
├── features/           # Feature-specific components
│   ├── alerts/         # Notification system
│   ├── auth/          # Authentication logic
│   ├── defi/          # DeFi-related components
│   ├── nfts/          # NFT gallery components
│   └── portfolio/     # Portfolio dashboard components
├── hooks/             # Custom React hooks
│   ├── useWallet.js   # Wallet connection logic
│   └── useWalletConnection.js
├── layouts/           # Page layout components
│   └── DashboardLayout.jsx
├── pages/             # Main application pages
│   ├── Dashboard.jsx  # Portfolio overview
│   ├── DeFi.jsx      # DeFi positions
│   ├── NFTs.jsx      # NFT gallery
│   ├── Settings.jsx  # User preferences
│   └── Transactions.jsx # Transaction history
├── routes/            # Application routing
│   └── AppRoutes.jsx
├── services/          # External service integrations
│   └── web3.js       # Web3 service layer
└── utils/             # Utility functions
```

---

## 🔧 Configuration

### Web3Modal Setup

The application uses Web3Modal for wallet connections. Configure your project:

1. **Get WalletConnect Project ID**

   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create a new project
   - Copy your Project ID

2. **Update Environment Variables**
   ```env
   VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

### Supported Wallet Providers

- **MetaMask** - Browser extension and mobile
- **WalletConnect** - Mobile wallet connection
- **Coinbase Wallet** - Coinbase's native wallet
- **Injected Wallets** - Any EIP-6963 compatible wallet

---

## 📊 Key Features Deep Dive

### **Dashboard Analytics**

- Real-time portfolio valuation across all chains
- Network-specific asset breakdown
- Historical performance tracking
- Auto-refresh every 30 seconds

### **NFT Management**

- Multi-chain NFT discovery and display
- High-resolution image rendering
- Metadata and trait information
- Collection-based organization

### **Transaction Tracking**

- Cross-chain transaction history
- Advanced filtering and search
- Pagination for large datasets
- Direct blockchain explorer integration

### **DeFi Integration**

- DEX Screener API integration
- Liquidity pool position tracking
- Yield farming analytics
- Real-time price feeds

---

## 🔒 Security & Privacy

- **Non-custodial** - Your keys, your crypto
- **Privacy-first** - No user data collection
- **Read-only access** - View-only wallet permissions
- **Secure connections** - HTTPS and WSS protocols
- **Open source** - Transparent and auditable code

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

---

## 📋 Roadmap

- [ ] **Multi-chain DeFi expansion** - Extend DeFi tracking beyond Base
- [ ] **Portfolio analytics** - Advanced P&L calculations
- [ ] **Price alerts** - Customizable notification system
- [ ] **Data export** - CSV/JSON portfolio export
- [ ] **Mobile app** - React Native implementation
- [ ] **Social features** - Portfolio sharing capabilities

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Ethereum Foundation** - For the robust blockchain infrastructure
- **Web3Modal Team** - For the excellent wallet connection library
- **Tailwind CSS** - For the beautiful and efficient styling system
- **React Team** - For the powerful frontend framework
- **Vite Team** - For the lightning-fast development experience

---

## 📞 Support

- **Documentation**: [Project Wiki](#)
- **Issues**: [GitHub Issues](#)
- **Discussions**: [GitHub Discussions](#)
- **Email**: support@onchain-tracker.com

---

<div align="center">

**Built with ❤️ for the Web3 community**

[⭐ Star this repo](https://github.com/yourusername/onchain-portfolio-tracker) • [🐦 Follow on Twitter](#) • [💬 Join Discord](#)

</div>
