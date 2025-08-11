// src/pages/travelers.js
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import Layout from "../components/Layout";

export default function TravelersPage() {
  const [travelers, setTravelers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const snap = await getDocs(collection(db, "users"));
        const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .filter(u => u.role === "traveler");
        setTravelers(rows);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <Layout title="Browse Travelers • Tradair">
      <h1 className="text-2xl font-bold mb-4">Browse Travelers</h1>
      {loading ? <p>Loading travelers...</p> : (
        <div className="grid md:grid-cols-2 gap-4">
          {travelers.length === 0 && <p>No travelers yet.</p>}
          {travelers.map(t => (
            <div key={t.id} className="bg-white rounded-xl p-4 shadow">
              <h3 className="font-semibold">{t.name || t.email || "Traveler"}</h3>
              <p className="text-gray-600 mt-1">Bio: {t.bio || "—"}</p>
              <p className="text-gray-600 mt-1">Routes: {Array.isArray(t.countries) ? t.countries.join(", ") : "—"}</p>
              <p className="text-gray-600 mt-1">Rating: {t.rating || "Not rated"} ★</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
