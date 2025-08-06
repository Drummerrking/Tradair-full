
import React from 'react';

export function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Grabs</h2>
          <p>12 Active Grabs</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Offers</h2>
          <p>8 New Offers</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <p>3 Unread</p>
        </div>
      </div>
    </div>
  );
}
