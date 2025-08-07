
import React from "react";

export function AffiliateProgram() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">A F F I L I A T E  P R O G R A M</h2>
      <p>This is the full layout for the A F F I L I A T E  P R O G R A M feature page.</p>
      <div className="border p-4 rounded bg-white shadow">
        <label className="block mb-2">Sample Input</label>
        <input className="border p-2 w-full rounded mb-4" placeholder="Type something..." />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </div>
    </div>
  );
}
