import React from "react";

const DashboardLayout = ({ children }) => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <aside
      style={{ width: 220, background: "#222", color: "#fff", padding: 24 }}
    >
      <h2>Portfolio Tracker</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <a href="/" style={{ color: "#fff" }}>
              Dashboard
            </a>
          </li>
          <li>
            <a href="/nfts" style={{ color: "#fff" }}>
              NFTs
            </a>
          </li>
          <li>
            <a href="/defi" style={{ color: "#fff" }}>
              DeFi
            </a>
          </li>
          <li>
            <a href="/settings" style={{ color: "#fff" }}>
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
    <main style={{ flex: 1, padding: 32, background: "#f7f7f7" }}>
      {children}
    </main>
  </div>
);

export default DashboardLayout;
