import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Welcome to Tradair</h1>
        <p className="text-gray-700 text-lg">
          Explore the full-featured Tradair investor-ready app. Use the menu above to navigate through the 26 styled, interactive pages representing different parts of the business model.
        </p>
      </main>
    </>
  );
}