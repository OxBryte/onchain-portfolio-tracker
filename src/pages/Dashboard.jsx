import React from "react";

const Dashboard = () => (
  <div className="space-y-6">
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
      <p className="text-gray-300">
        Welcome to your onchain portfolio dashboard.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-2">
          Total Portfolio Value
        </h3>
        <p className="text-2xl font-bold text-green-400">$0.00</p>
        <p className="text-gray-400 text-sm">Connect wallet to view</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-2">Assets</h3>
        <p className="text-2xl font-bold text-blue-400">0</p>
        <p className="text-gray-400 text-sm">Different tokens</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-2">NFTs</h3>
        <p className="text-2xl font-bold text-purple-400">0</p>
        <p className="text-gray-400 text-sm">In your collection</p>
      </div>
    </div>
  </div>
);

export default Dashboard;
