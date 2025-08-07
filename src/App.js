import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { AffiliateProgram } from "./pages/AffiliateProgram";
import { TravelScheduler } from "./pages/TravelScheduler";
import { PricePredictor } from "./pages/PricePredictor";
import { TranslationAssistant } from "./pages/TranslationAssistant";
import { LiveChatSupport } from "./pages/LiveChatSupport";
import { TravelInsurance } from "./pages/TravelInsurance";
import { LoyaltyRewards } from "./pages/LoyaltyRewards";
import { CustomsCalculator } from "./pages/CustomsCalculator";
import { DocumentVerification } from "./pages/DocumentVerification";
import { CurrencyConverter } from "./pages/CurrencyConverter";
import { UserReviews } from "./pages/UserReviews";
import { PublicUserProfile } from "./pages/PublicUserProfile";
import { DeliveryTracking } from "./pages/DeliveryTracking";

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
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
        <Route path="/affiliate" element={<AffiliateProgram />} />
        <Route path="/scheduler" element={<TravelScheduler />} />
        <Route path="/predictor" element={<PricePredictor />} />
        <Route path="/translate" element={<TranslationAssistant />} />
        <Route path="/livechat" element={<LiveChatSupport />} />
        <Route path="/insurance" element={<TravelInsurance />} />
        <Route path="/rewards" element={<LoyaltyRewards />} />
        <Route path="/customs" element={<CustomsCalculator />} />
        <Route path="/document-verification" element={<DocumentVerification />} />
        <Route path="/currency" element={<CurrencyConverter />} />
        <Route path="/user-reviews" element={<UserReviews />} />
        <Route path="/public-user-profile" element={<PublicUserProfile />} />
        <Route path="/delivery-tracking" element={<DeliveryTracking />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;
