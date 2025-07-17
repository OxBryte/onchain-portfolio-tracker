import React from "react";
import { Link } from "react-router-dom";

const DashboardLayout = ({ children }) => (
  <div className="flex min-h-screen bg-gray-900">
    <aside className="w-56 bg-gray-800 text-gray-100 p-6 border-r border-gray-700">
      <h2 className="text-xl font-bold mb-6 text-white">Portfolio Tracker</h2>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center py-2 px-3 rounded-lg hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/nfts"
              className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center py-2 px-3 rounded-lg hover:bg-gray-700"
            >
              NFTs
            </Link>
          </li>
          <li>
            <Link
              to="/defi"
              className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center py-2 px-3 rounded-lg hover:bg-gray-700"
            >
              DeFi
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center py-2 px-3 rounded-lg hover:bg-gray-700"
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
    <main className="flex-1 p-8 bg-gray-900 text-gray-100">{children}</main>
  </div>
);

export default DashboardLayout;
