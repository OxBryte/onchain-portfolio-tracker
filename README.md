# Onchain Portfolio Tracker

A web application to seamlessly track, analyze, and manage your onchain crypto assets across multiple blockchains in a single, intuitive dashboard.

## Project Overview

The Onchain Portfolio Tracker enables users to:

- Connect their crypto wallets directly through MetaMask/wallet providers
- View real-time portfolio valuation across supported blockchains
- Analyze asset allocation, historical performance, and DeFi positions
- Explore NFT holdings with images and metadata
- View transaction history across all supported chains
- Export portfolio data for personal records

The app is privacy-first: no login required, and no custody of user funds.

## Current Features

- **Multi-chain support**: Ethereum, Base, Polygon, Arbitrum, Optimism, Celo, BNB Chain
- **Direct wallet integration**: Connect seamlessly via browser wallet extensions like MetaMask
- **Unified wallet connection**: Consistent wallet connection experience across all pages
- **Dashboard**: Real-time balances, network breakdown, and portfolio value
- **NFT Gallery**: View NFTs from all supported chains, with filtering and metadata
- **Transaction History**: Paginated, filterable transaction table across all chains
- **DeFi Positions**: Track DeFi tokens and pairs on Base blockchain with DEX Screener integration
- **Settings**: Light/dark theme toggle, preferences
- **Responsive UI**: Modern, mobile-friendly design
- **Loading/Error States**: User-friendly feedback for all blockchain operations
- **Auto-refresh**: Portfolio data updates every 30 seconds
- **Network Filtering**: Filter NFTs and transactions by blockchain
- **Pagination**: For large transaction lists
- **Cross-chain Transactions**: View transactions from multiple blockchains in a single interface

## Main Pages

- **Dashboard**: Portfolio overview, balances, and network stats directly from connected wallet
- **NFTs**: NFT gallery with network and attribute filtering for the connected wallet
- **Transactions**: Multi-chain transaction history with filters and pagination
- **DeFi**: Track DeFi tokens and pairs on Base with the connected wallet
- **Settings**: Theme toggle and preferences

## Supported Chains

- **Ethereum**
- **Base**
- **BNB Chain**
- **Polygon**
- **Arbitrum**
- **Optimism**
- **Celo**

## Recent Updates

- **July 2025**: 
  - Implemented direct wallet connection across all pages (Dashboard, NFTs, Transactions, DeFi)
  - Removed address search functionality in favor of direct wallet integration
  - Added multi-chain transaction tracking with filtering capabilities
  - Enhanced wallet connection UI with consistent connected address display
  - Improved error handling and loading states for blockchain operations
  - Added transaction filtering by network and transaction type

## Product Requirements

See the [Product Requirements Document (PRD)](./PRD.md) for detailed goals, features, and user stories.

---

## Development

This project uses React + Vite for fast development and HMR. ESLint is included for code quality.

### Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
