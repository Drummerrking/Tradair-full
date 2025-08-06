
import React from 'react';

export function UserProfile() {
  const profile = {
    username: "demoUser",
    name: "Demo User",
    location: "Nassau, Bahamas",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 4.6,
    reviews: [
      { reviewer: "alice", rating: 5, text: "Smooth delivery and polite." },
      { reviewer: "bob", rating: 4, text: "Good experience overall." }
    ]
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center mb-6 gap-4">
        <img src={profile.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-green-500" />
        <div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-gray-600">@{profile.username}</p>
          <p className="text-sm text-gray-500">{profile.location}</p>
          {profile.verified && <span className="text-green-600 font-semibold">✔ Verified</span>}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">User Rating</h2>
        <p className="text-lg">⭐ {profile.rating} / 5</p>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Reviews</h2>
        {profile.reviews.map((r, i) => (
          <div key={i} className="border-b py-2">
            <p className="font-semibold">@{r.reviewer} – ⭐ {r.rating}</p>
            <p className="text-sm text-gray-700">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
