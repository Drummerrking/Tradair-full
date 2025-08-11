import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function OfferList({ requestId, onAccepted }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const snap = await getDocs(collection(db, "requests", String(requestId), "offers"));
    const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    setOffers(rows);
    setLoading(false);
  };

  useEffect(() => { if (requestId) load(); }, [requestId]);

  const accept = async (offer) => {
    if (!confirm(`Accept ${offer.travelerName}'s offer for $${offer.fee}?`)) return;
    await updateDoc(doc(db, "requests", String(requestId)), {
      travelerId: offer.travelerName,
      status: "accepted",
      selectedOfferId: offer.id,
      agreedFee: offer.fee
    });
    await updateDoc(doc(db, "requests", String(requestId), "offers", offer.id), { status: "accepted" });
    onAccepted && onAccepted(offer);
    alert("Offer accepted. You can proceed to payment.");
  };

  if (loading) return <p>Loading offers...</p>;
  if (!offers.length) return <p>No offers yet.</p>;

  return (
    <div style={{border:'1px solid #eee', borderRadius:8, padding:16, marginTop:16}}>
      <h3 style={{fontWeight:600}}>Offers</h3>
      <ul style={{marginTop:8}}>
        {offers.map((o) => (
          <li key={o.id} style={{padding:12, border:'1px solid #f3f3f3', borderRadius:8, marginBottom:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div><strong>{o.travelerName}</strong> — Fee: ${o.fee}</div>
              {o.eta ? <div style={{fontSize:12, color:'#555'}}>ETA: {o.eta}</div> : null}
              {o.message ? <div style={{fontSize:12, color:'#555'}}>“{o.message}”</div> : null}
              <div style={{fontSize:12, color:'#777'}}>Status: {o.status}</div>
            </div>
            {o.status !== "accepted" && (
              <button onClick={() => accept(o)} style={{padding:'6px 10px', borderRadius:8, background:'#2563eb', color:'#fff'}}>
                Accept
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
