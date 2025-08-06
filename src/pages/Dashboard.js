import React from 'react';

export function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const grabs = JSON.parse(localStorage.getItem('grabs') || '[]');
  const offers = JSON.parse(localStorage.getItem('offers') || '[]');

  const userGrabs = grabs.filter(g => g.username === currentUser?.username);
  const userOffers = offers.filter(o => o.username === currentUser?.username);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Welcome, {currentUser?.username || 'User'}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Your Grabs</h3>
          {userGrabs.length > 0 ? (
            <ul className="list-disc list-inside">
              {userGrabs.map((grab, index) => (
                <li key={index}>{grab.itemName} - {grab.destination}</li>
              ))}
            </ul>
          ) : (
            <p>No grabs posted yet.</p>
          )}
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-2">Your Offers</h3>
          {userOffers.length > 0 ? (
            <ul className="list-disc list-inside">
              {userOffers.map((offer, index) => (
                <li key={index}>{offer.itemName} - ${offer.price}</li>
              ))}
            </ul>
          ) : (
            <p>No offers made yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}