import React from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function GrabDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Grab Detail Page</h1>
        <p className="text-gray-700">This is the detailed view for Grab ID: <strong>{id}</strong></p>

        <div className="mt-6 bg-white shadow p-4 rounded">
          <h2 className="text-lg font-semibold text-gray-800">Delivery Info</h2>
          <p className="text-sm text-gray-600">Description of the grab, item details, delivery preferences, and traveler notes.</p>
        </div>
      </div>
    </>
  );
}