// Tradair – Web App (Now includes full feature parity with Grabr and expanded functionality)

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { PostGrab } from "./pages/PostGrab";
import { MyGrabs } from "./pages/MyGrabs";
import { MyOffers } from "./pages/MyOffers";
import { Messaging } from "./pages/Messaging";
import { Support } from "./pages/Support";
import { Escrow } from "./pages/Escrow";
import { VerifyIdentity } from "./pages/VerifyIdentity";
import { Ratings } from "./pages/Ratings";
import { Notifications } from "./pages/Notifications";
import { FeesPreview } from "./pages/FeesPreview";
import "./styles/theme.css";

// full canvas content continues...

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-grab" element={<PostGrab />} />
        <Route path="/my-grabs" element={<MyGrabs />} />
        <Route path="/my-offers" element={<MyOffers />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/support" element={<Support />} />
        <Route path="/escrow" element={<Escrow />} />
        <Route path="/verify" element={<VerifyIdentity />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/fees" element={<FeesPreview />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;