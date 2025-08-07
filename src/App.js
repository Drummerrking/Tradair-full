import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import * as Pages from './pages';

const links = Object.keys(Pages);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
        <nav className="flex flex-wrap gap-3 mb-6">
          {links.map((page) => (
            <Link key={page} to={`/${page}`} className="text-blue-600 hover:underline">
              {page}
            </Link>
          ))}
        </nav>
        <Routes>
          {links.map((page) => {
            const Component = Pages[page];
            return <Route key={page} path={`/${page}`} element={<Component />} />;
          })}
          <Route path="/" element={<Pages.Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
