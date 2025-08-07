
import React from 'react';
import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <nav className="bg-white shadow p-4 flex gap-4 flex-wrap">
      <Link to="/" className="text-blue-600 font-medium">Dashboard</Link>
      <Link to="/PostGrab" className="text-blue-600 font-medium">Post Grab</Link>
    </nav>
  );
}
