# Onchain Portfolio Tracker

A web application to seamlessly track, analyze, and manage your onchain crypto assets across multiple blockchains in a single, intuitive dashboard.

## Project Overview

The Onchain Portfolio Tracker enables users to:

- Connect their crypto wallets or enter public addresses
- View real-time portfolio valuation across supported blockchains
- Analyze asset allocation, historical performance, and DeFi positions
- Explore NFT holdings with images and metadata
- View transaction history across all supported chains
- Export portfolio data for personal records

The app is privacy-first: no login required, and no custody of user funds.

## Current Features

- **Multi-chain support**: Ethereum, Base, Polygon, Arbitrum, Optimism
- **Wallet integration**: Connect via public address (MetaMask/WalletConnect planned)
- **Dashboard**: Real-time balances, network breakdown, and portfolio value
- **NFT Gallery**: View NFTs from all supported chains, with filtering and metadata
- **Transaction History**: Paginated, filterable transaction table across all chains
- **DeFi (MVP)**: Placeholder for DeFi positions and analytics
- **Settings**: Light/dark theme toggle, preferences
- **Responsive UI**: Modern, mobile-friendly design
- **Loading/Error States**: User-friendly feedback for all blockchain operations
- **Auto-refresh**: Portfolio data updates every 30 seconds
- **Network Filtering**: Filter NFTs and transactions by blockchain
- **Pagination**: For large transaction lists
- **DEFI**: Dexscreener Data and token pool

## Main Pages

- **Dashboard**: Portfolio overview, balances, and network stats
- **NFTs**: NFT gallery with network and attribute filtering
- **Transactions**: Transaction history with filters and pagination
- **DeFi**: Placeholder for DeFi analytics (coming soon)
- **Settings**: Theme toggle and preferences

## Supported Chain

- **Base**
- **Celo**
- **Ethereum**
- **Optimism**
- **Arbitrum**

## Product Requirements

See the [Product Requirements Document (PRD)](./PRD.md) for detailed goals, features, and user stories.

---

## Development

This project uses React + Vite for fast development and HMR. ESLint is included for code quality.

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
