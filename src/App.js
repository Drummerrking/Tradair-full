import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { PostGrab } from './pages/PostGrab';
import { DeliveryTracking } from './pages/DeliveryTracking';
import { PublicUserProfile } from './pages/PublicUserProfile';
import { UserReviews } from './pages/UserReviews';
import { CurrencyConverter } from './pages/CurrencyConverter';
import { DocumentVerification } from './pages/DocumentVerification';
import { CustomsCalculator } from './pages/CustomsCalculator';
import { LoyaltyRewards } from './pages/LoyaltyRewards';
import { TravelInsurance } from './pages/TravelInsurance';
import { LiveChatSupport } from './pages/LiveChatSupport';
import { TranslationAssistant } from './pages/TranslationAssistant';
import { PricePredictor } from './pages/PricePredictor';
import { TravelScheduler } from './pages/TravelScheduler';
import { AffiliateProgram } from './pages/AffiliateProgram';
import { FeesPreview } from './pages/FeesPreview';
import { Notifications } from './pages/Notifications';
import { MyGrabs } from './pages/MyGrabs';
import { MyOffers } from './pages/MyOffers';
import { Inbox } from './pages/Inbox';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { ReviewCenter } from './pages/ReviewCenter';
import { SubmitReview } from './pages/SubmitReview';
import { UserMap } from './pages/UserMap';
import { HelpCenter } from './pages/HelpCenter';

export default function App() {
  return (
    <Router>
      <div className='p-6'>
        <nav className='flex flex-wrap gap-3 mb-6'>
          <Link to='/Dashboard' className='text-blue-600 hover:underline'>Dashboard</Link>
          <Link to='/PostGrab' className='text-blue-600 hover:underline'>PostGrab</Link>
          <Link to='/DeliveryTracking' className='text-blue-600 hover:underline'>DeliveryTracking</Link>
          <Link to='/PublicUserProfile' className='text-blue-600 hover:underline'>PublicUserProfile</Link>
          <Link to='/UserReviews' className='text-blue-600 hover:underline'>UserReviews</Link>
          <Link to='/CurrencyConverter' className='text-blue-600 hover:underline'>CurrencyConverter</Link>
          <Link to='/DocumentVerification' className='text-blue-600 hover:underline'>DocumentVerification</Link>
          <Link to='/CustomsCalculator' className='text-blue-600 hover:underline'>CustomsCalculator</Link>
          <Link to='/LoyaltyRewards' className='text-blue-600 hover:underline'>LoyaltyRewards</Link>
          <Link to='/TravelInsurance' className='text-blue-600 hover:underline'>TravelInsurance</Link>
          <Link to='/LiveChatSupport' className='text-blue-600 hover:underline'>LiveChatSupport</Link>
          <Link to='/TranslationAssistant' className='text-blue-600 hover:underline'>TranslationAssistant</Link>
          <Link to='/PricePredictor' className='text-blue-600 hover:underline'>PricePredictor</Link>
          <Link to='/TravelScheduler' className='text-blue-600 hover:underline'>TravelScheduler</Link>
          <Link to='/AffiliateProgram' className='text-blue-600 hover:underline'>AffiliateProgram</Link>
          <Link to='/FeesPreview' className='text-blue-600 hover:underline'>FeesPreview</Link>
          <Link to='/Notifications' className='text-blue-600 hover:underline'>Notifications</Link>
          <Link to='/MyGrabs' className='text-blue-600 hover:underline'>MyGrabs</Link>
          <Link to='/MyOffers' className='text-blue-600 hover:underline'>MyOffers</Link>
          <Link to='/Inbox' className='text-blue-600 hover:underline'>Inbox</Link>
          <Link to='/Profile' className='text-blue-600 hover:underline'>Profile</Link>
          <Link to='/Settings' className='text-blue-600 hover:underline'>Settings</Link>
          <Link to='/ReviewCenter' className='text-blue-600 hover:underline'>ReviewCenter</Link>
          <Link to='/SubmitReview' className='text-blue-600 hover:underline'>SubmitReview</Link>
          <Link to='/UserMap' className='text-blue-600 hover:underline'>UserMap</Link>
          <Link to='/HelpCenter' className='text-blue-600 hover:underline'>HelpCenter</Link>
        </nav>
        <Routes>
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/PostGrab' element={<PostGrab />} />
          <Route path='/DeliveryTracking' element={<DeliveryTracking />} />
          <Route path='/PublicUserProfile' element={<PublicUserProfile />} />
          <Route path='/UserReviews' element={<UserReviews />} />
          <Route path='/CurrencyConverter' element={<CurrencyConverter />} />
          <Route path='/DocumentVerification' element={<DocumentVerification />} />
          <Route path='/CustomsCalculator' element={<CustomsCalculator />} />
          <Route path='/LoyaltyRewards' element={<LoyaltyRewards />} />
          <Route path='/TravelInsurance' element={<TravelInsurance />} />
          <Route path='/LiveChatSupport' element={<LiveChatSupport />} />
          <Route path='/TranslationAssistant' element={<TranslationAssistant />} />
          <Route path='/PricePredictor' element={<PricePredictor />} />
          <Route path='/TravelScheduler' element={<TravelScheduler />} />
          <Route path='/AffiliateProgram' element={<AffiliateProgram />} />
          <Route path='/FeesPreview' element={<FeesPreview />} />
          <Route path='/Notifications' element={<Notifications />} />
          <Route path='/MyGrabs' element={<MyGrabs />} />
          <Route path='/MyOffers' element={<MyOffers />} />
          <Route path='/Inbox' element={<Inbox />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Settings' element={<Settings />} />
          <Route path='/ReviewCenter' element={<ReviewCenter />} />
          <Route path='/SubmitReview' element={<SubmitReview />} />
          <Route path='/UserMap' element={<UserMap />} />
          <Route path='/HelpCenter' element={<HelpCenter />} />
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}