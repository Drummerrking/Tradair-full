
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export function SubmitReview() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ rating: 5, text: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const allReviews = JSON.parse(localStorage.getItem("userReviews") || "{}");
    const userReviews = allReviews[username] || [];
    const updated = { ...allReviews, [username]: [...userReviews, form] };
    localStorage.setItem("userReviews", JSON.stringify(updated));
    alert("✅ Review submitted!");
    navigate("/user/" + username);
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Leave a Review for @{username}</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <select name="rating" value={form.rating} onChange={handleChange} className="border p-2 rounded-xl">
          {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Star{n !== 1 && "s"}</option>)}
        </select>
        <textarea name="text" value={form.text} onChange={handleChange} className="border p-2 rounded-xl" rows="4" placeholder="Write your review..." required />
        <button type="submit" className="bg-green-600 text-white py-2 rounded-xl hover:bg-green-700">Submit Review</button>
      </form>
    </div>
  );
}
