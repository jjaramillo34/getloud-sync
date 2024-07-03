// File: src/core/routes.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../components/app/App";
import BrowsePage from "../pages/browse/BrowsePage";
import PartyPage from "../pages/party/PartyPage";
import SearchPage from "../pages/search/SearchPage";

export const AppRoutes = () => (
  <Router>
    <App>
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/party/:partyId" element={<PartyPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
      </Routes>
    </App>
  </Router>
);
