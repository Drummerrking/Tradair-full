import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

export function PostGrab() {
  const [grab, setGrab] = useState({ title: "", description: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (grab.title && grab.description) {
      setSubmitted(true);
      setGrab({ title: "", description: "" });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
        <FaPlusCircle className="text-rose-500" /> Post a Grab
      </h2>

      <div className="bg-white p-4 shadow rounded space-y-4">
        <input
          value={grab.title}
          onChange={(e) => setGrab({ ...grab, title: e.target.value })}
          placeholder="Grab title"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <textarea
          value={grab.description}
          onChange={(e) => setGrab({ ...grab, description: e.target.value })}
          placeholder="Describe the item you want someone to bring..."
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
        >
          Submit Grab
        </button>
        {submitted && (
          <div className="text-green-700 font-medium pt-2">Grab posted successfully!</div>
        )}
      </div>
    </div>
  );
}
