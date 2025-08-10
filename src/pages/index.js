// src/pages/index.js
import Layout from "../components/Layout";
import Link from "next/link";

export default function HomePage() {
  return (
    <Layout title="Tradair • Fast cross-border shopping">
      <section className="text-center py-14">
        <h1 className="text-4xl font-extrabold">Get anything delivered fast via trusted travelers</h1>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Skip slow shipping and high import fees. Post your request and match with travelers who have spare luggage space.
        </p>
        <div className="mt-6 space-x-3">
          <Link href="/create-request" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">Create Request</Link>
          <Link href="/travelers" className="bg-gray-200 text-gray-800 px-5 py-2 rounded hover:bg-gray-300">Browse Travelers</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4 mt-10">
        {[
          {title: "Post a Request", desc: "Describe the item, store link, and your deadline."},
          {title: "Match with Travelers", desc: "See offers from travelers on your route."},
          {title: "Pay Securely", desc: "Release payment after delivery and rate the traveler."},
        ].map((c) => (
          <div key={c.title} className="bg-white rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-lg">{c.title}</h3>
            <p className="text-gray-600 mt-2">{c.desc}</p>
          </div>
        ))}
      </section>
    </Layout>
  );
}
