// src/components/OfferList.js
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function OfferList({ requestId, onAccepted }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const snap = await getDocs(collection(db, "requests", String(requestId), "offers"));
      const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setOffers(rows);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (requestId) load(); }, [requestId]);

  const accept = async (offer) => {
    if (!confirm(`Accept offer from ${offer.travelerName} for $${offer.fee}?`)) return;
    try {
      await updateDoc(doc(db, "requests", String(requestId)), {
        travelerId: offer.travelerName,
        status: "accepted",
        selectedOfferId: offer.id,
        agreedFee: offer.fee
      });
      await updateDoc(doc(db, "requests", String(requestId), "offers", offer.id), { status: "accepted" });
      onAccepted && onAccepted(offer);
      alert("Offer accepted. Proceed to payment.");
    } catch (e) {
      console.error(e);
      alert("Failed to accept offer");
    }
  };

  if (loading) return <p>Loading offers...</p>;
  if (!offers.length) return <p>No offers yet.</p>;

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-lg font-semibold mb-2">Offers</h3>
      <ul className="space-y-2">
        {offers.map((o) => (
          <li key={o.id} className="border rounded p-3 flex items-center justify-between">
            <div>
              <p><strong>{o.travelerName}</strong> — Fee: ${o.fee}</p>
              {o.eta ? <p className="text-sm text-gray-600">ETA: {o.eta}</p> : null}
              {o.message ? <p className="text-sm text-gray-600">Message: {o.message}</p> : null}
              <p className="text-xs text-gray-500">Status: {o.status}</p>
            </div>
            {o.status !== "accepted" && (
              <button onClick={() => accept(o)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                Accept
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
