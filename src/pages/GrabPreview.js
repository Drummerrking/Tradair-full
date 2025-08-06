
import React from 'react';

export function GrabPreview() {
  return (
    <div className="p-8 grid gap-6 grid-cols-1 md:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="card">
          <img src="https://via.placeholder.com/300x180" alt="item" className="rounded-lg mb-3" />
          <h2 className="text-lg font-bold">MacBook Pro</h2>
          <p className="text-sm text-gray-600">Deliver to: Bahamas</p>
          <button className="bg-indigo-600 text-white mt-3 px-4 py-2 rounded-xl hover:bg-indigo-700">Make Offer</button>
        </div>
      ))}
    </div>
  );
}
