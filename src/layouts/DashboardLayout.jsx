import React from "react";
import { Link } from "react-router-dom";

const DashboardLayout = ({ children }) => (
  <div style={{ display: "flex", minHeight: "100vh" }}>
    <aside
      style={{ width: 220, background: "#222", color: "#fff", padding: 24 }}
    >
      <h2>Portfolio Tracker</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/nfts" style={{ color: "#fff", textDecoration: "none" }}>
              NFTs
            </Link>
          </li>
          <li>
            <Link to="/defi" style={{ color: "#fff", textDecoration: "none" }}>
              DeFi
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Settings
            </Link>
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
