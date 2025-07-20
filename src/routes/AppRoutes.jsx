import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import NFTs from "../pages/NFTs";
import Transactions from "../pages/Transactions";
import DeFi from "../pages/DeFi";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/nfts"
        element={
          <DashboardLayout>
            <NFTs />
          </DashboardLayout>
        }
      />
      <Route
        path="/transactions"
        element={
          <DashboardLayout>
            <Transactions />
          </DashboardLayout>
        }
      />
      <Route
        path="/defi"
        element={
          <DashboardLayout>
            <DeFi />
          </DashboardLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRoutes;
