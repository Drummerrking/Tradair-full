import React from "react";
import Navbar from "../components/Navbar";

export default function Page17() {
  return (
    <>
      <Navbar />
      <main className="p-6 space-y-4">
        <h1 className="text-3xl font-bold text-indigo-800">Tradair Feature 17</h1>
        <section className="bg-white shadow rounded p-4">
          <p className="text-gray-700 leading-relaxed">
            This page demonstrates feature 17 of the Tradair app. It is fully styled using Tailwind CSS
            and integrated into the app interface. This content reflects the investor-ready standard
            with consistent styling, structure, and visual clarity. Each page covers a unique business flow
            such as Grabs, Offers, Tracking, Profiles, Reviews, Messaging, Admin, Partnerships, and more.
          </p>
          <form className="mt-4 space-y-3">
            <input className="w-full border p-2 rounded" placeholder="Enter example input..." />
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Submit Feature 17
            </button>
          </form>
        </section>
      </main>
    </>
  );
}