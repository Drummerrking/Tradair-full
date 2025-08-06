
import React from 'react';
import { useParams } from 'react-router-dom';

export function PublicUserProfile() {
  const { username } = useParams();

  // Simulated fetched data
  const user = {
    username,
    name: username === "alice" ? "Alice Smith" : "Demo User",
    location: "Nassau, Bahamas",
    avatar: "https://i.pravatar.cc/150?u=" + username,
    rating: 4.8,
    verified: true,
    reviews: JSON.parse(localStorage.getItem("userReviews") || '{}')[username] || [
      { reviewer: "demoUser", rating: 5, text: "Great person to work with." },
      { reviewer: "charlie", rating: 4, text: "Reliable and responsive." }
    ]
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center mb-6 gap-4">
        <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-indigo-500" />
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-600">@{user.username}</p>
          <p className="text-sm text-gray-500">{user.location}</p>
          {user.verified && <span className="text-indigo-600 font-semibold">✔ Verified</span>}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Rating</h2>
        <p className="text-lg">⭐ {user.rating} / 5</p>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Reviews</h2>
        {user.reviews.map((r, i) => (
          <div key={i} className="border-b py-2">
            <p className="font-semibold">@{r.reviewer} – ⭐ {r.rating}</p>
            <p className="text-sm text-gray-700">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
