import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const BASE_API_URL = "https://api.dexscreener.com/latest/dex/pairs/base";

const DeFiTable = () => {
  const { isDark } = useTheme();
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(BASE_API_URL);
        const data = await res.json();
        setTokens(data.pairs || []);
      } catch (err) {
        setError("Failed to fetch DeFi token data.");
      } finally {
        setLoading(false);
      }
    };
    fetchTokens();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
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
          className={`text-lg ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          Loading DeFi tokens from Base...
        </span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table
        className={`min-w-full rounded-lg ${
          isDark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <thead className={isDark ? "bg-gray-700" : "bg-gray-100"}>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Token
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Symbol
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Price (USD)
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Liquidity (USD)
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Volume 24h
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Market Cap
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              DEX Screener
            </th>
          </tr>
        </thead>
        <tbody
          className={
            isDark ? "divide-y divide-gray-700" : "divide-y divide-gray-200"
          }
        >
          {tokens.slice(0, 25).map((pair) => (
            <tr
              key={pair.pairAddress}
              className={isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}
            >
              <td className="px-4 py-3 flex items-center space-x-2">
                {pair.info?.imageUrl && (
                  <img
                    src={pair.info.imageUrl}
                    alt={pair.baseToken.symbol}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <span>{pair.baseToken.name}</span>
              </td>
              <td className="px-4 py-3">{pair.baseToken.symbol}</td>
              <td className="px-4 py-3 font-mono">
                ${parseFloat(pair.priceUsd).toFixed(4)}
              </td>
              <td className="px-4 py-3 font-mono">
                ${Number(pair.liquidity?.usd || 0).toLocaleString()}
              </td>
              <td className="px-4 py-3 font-mono">
                ${Number(pair.volume?.h24 || 0).toLocaleString()}
              </td>
              <td className="px-4 py-3 font-mono">
                {pair.marketCap
                  ? `$${Number(pair.marketCap).toLocaleString()}`
                  : "-"}
              </td>
              <td className="px-4 py-3">
                <a
                  href={pair.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-xs text-gray-400 mt-2">
        Showing top 25 pairs on Base via{" "}
        <a
          href="https://dexscreener.com/base"
          className="underline text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          DEX Screener
        </a>
      </div>
    </div>
  );
};

export default DeFiTable;
