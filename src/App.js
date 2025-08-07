
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { Dashboard } from './pages/Dashboard';
import { PostGrab } from './pages/PostGrab';
import { Page3 } from './pages/Page3';
import { Page4 } from './pages/Page4';
import { Page5 } from './pages/Page5';
import { Page6 } from './pages/Page6';
import { Page7 } from './pages/Page7';
import { Page8 } from './pages/Page8';
import { Page9 } from './pages/Page9';
import { Page10 } from './pages/Page10';
import { Page11 } from './pages/Page11';
import { Page12 } from './pages/Page12';
import { Page13 } from './pages/Page13';
import { Page14 } from './pages/Page14';
import { Page15 } from './pages/Page15';
import { Page16 } from './pages/Page16';
import { Page17 } from './pages/Page17';
import { Page18 } from './pages/Page18';
import { Page19 } from './pages/Page19';
import { Page20 } from './pages/Page20';
import { Page21 } from './pages/Page21';
import { Page22 } from './pages/Page22';
import { Page23 } from './pages/Page23';
import { Page24 } from './pages/Page24';
import { Page25 } from './pages/Page25';
import { Page26 } from './pages/Page26';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/PostGrab' element={<PostGrab />} />
        <Route path='/Page3' element={<Page3 />} />
        <Route path='/Page4' element={<Page4 />} />
        <Route path='/Page5' element={<Page5 />} />
        <Route path='/Page6' element={<Page6 />} />
        <Route path='/Page7' element={<Page7 />} />
        <Route path='/Page8' element={<Page8 />} />
        <Route path='/Page9' element={<Page9 />} />
        <Route path='/Page10' element={<Page10 />} />
        <Route path='/Page11' element={<Page11 />} />
        <Route path='/Page12' element={<Page12 />} />
        <Route path='/Page13' element={<Page13 />} />
        <Route path='/Page14' element={<Page14 />} />
        <Route path='/Page15' element={<Page15 />} />
        <Route path='/Page16' element={<Page16 />} />
        <Route path='/Page17' element={<Page17 />} />
        <Route path='/Page18' element={<Page18 />} />
        <Route path='/Page19' element={<Page19 />} />
        <Route path='/Page20' element={<Page20 />} />
        <Route path='/Page21' element={<Page21 />} />
        <Route path='/Page22' element={<Page22 />} />
        <Route path='/Page23' element={<Page23 />} />
        <Route path='/Page24' element={<Page24 />} />
        <Route path='/Page25' element={<Page25 />} />
        <Route path='/Page26' element={<Page26 />} />
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
