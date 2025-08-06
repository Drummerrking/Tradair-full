
import React from 'react';
import { useParams } from 'react-router-dom';

export function GrabDetail() {
  const { id } = useParams();
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <img src="https://via.placeholder.com/600x300" alt="Item" className="rounded-lg mb-4 shadow" />
      <h1 className="text-3xl font-bold mb-2">MacBook Pro</h1>
      <p className="text-gray-700 mb-4">Destination: Nassau</p>
      <p className="text-gray-600 mb-6">Requested by: demoUser</p>
      <button className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700">Make Offer</button>
    </div>
  );
}
