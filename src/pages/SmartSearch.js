
import React, { useState } from 'react';

export function SmartSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Smart Search</h1>
      <input
        type="text"
        placeholder="Search for iPhone, Bahamas, electronics..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-4 py-2 w-full max-w-xl rounded-xl"
      />
      {query && (
        <div className="mt-4">
          <p>🔍 Showing results for "<strong>{query}</strong>"...</p>
        </div>
      )}
    </div>
  );
}
