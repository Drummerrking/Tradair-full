
import React from "react";

export function DocumentVerification() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">D O C U M E N T  V E R I F I C A T I O N</h2>
      <p>This is the full layout for the D O C U M E N T  V E R I F I C A T I O N feature page.</p>
      <div className="border p-4 rounded bg-white shadow">
        <label className="block mb-2">Sample Input</label>
        <input className="border p-2 w-full rounded mb-4" placeholder="Type something..." />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </div>
    </div>
  );
}
