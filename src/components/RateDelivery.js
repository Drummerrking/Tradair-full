// components/RateDelivery.js
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function RateDelivery({ requestId }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !review) return alert("Please provide both a rating and review.");
    const ref = doc(db, "requests", requestId);
    await updateDoc(ref, {
      rating,
      review,
    });
    setSubmitted(true);
  };

  if (submitted) return <p className="text-green-600">✅ Thank you for your review!</p>;

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-lg font-bold mb-2">Rate Your Delivery</h3>
      <label className="block mb-2">Rating:</label>
      <select
        className="border p-1 mb-2"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value={0}>Select</option>
        <option value={1}>1 ★</option>
        <option value={2}>2 ★</option>
        <option value={3}>3 ★</option>
        <option value={4}>4 ★</option>
        <option value={5}>5 ★</option>
      </select>

      <label className="block mt-2 mb-1">Review:</label>
      <textarea
        className="w-full border p-2 mb-2"
        rows="3"
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Review
      </button>
    </div>
  );
}
