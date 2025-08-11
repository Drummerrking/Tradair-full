import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import OfferForm from "../../components/OfferForm";
import OfferList from "../../components/OfferList";
import PayPalCheckout from "../../components/PayPalCheckout";
import RateDelivery from "../../components/RateDelivery";

export default function RequestPage() {
  const router = useRouter();
  const { id } = router.query;
  const [request, setRequest] = useState(null);

  const load = async () => {
    if (!id) return;
    const ref = doc(db, "requests", String(id));
    const snap = await getDoc(ref);
    if (snap.exists()) setRequest({ id: snap.id, ...snap.data() });
  };

  useEffect(() => { load(); }, [id]);

  if (!request) return <p style={{padding:16}}>Loading request...</p>;

  const totalAmount = Number(request.price || 0) + Number(request.agreedFee || 0);

  return (
    <div style={{padding:'24px', fontFamily:'ui-sans-serif, system-ui'}}>
      <h1 style={{fontSize:24, fontWeight:700}}>Request: {request.product}</h1>
      <div style={{border:'1px solid #eee', borderRadius:8, padding:16, marginTop:12}}>
        <div><strong>Product:</strong> {request.product}</div>
        <div><strong>Price:</strong> ${Number(request.price || 0)}</div>
        <div><strong>Status:</strong> {request.status}</div>
        <div><strong>Traveler:</strong> {request.travelerId || "Unassigned"}</div>
        {request.url ? <div><a href={request.url} target="_blank" rel="noreferrer">Product link</a></div> : null}
      </div>

      <OfferForm requestId={request.id} onCreated={load} />
      <OfferList requestId={request.id} onAccepted={load} />

      {request.status === "accepted" && (
        <PayPalCheckout requestId={request.id} amount={totalAmount} />
      )}

      {request.status === "delivered" && !request.rating && (
        <RateDelivery requestId={request.id} />
      )}

      {request.rating && (
        <div style={{background:'#f0fdf4', borderLeft:'4px solid #22c55e', padding:12, marginTop:12}}>
          ✅ You rated this delivery: <strong>{request.rating} ★</strong>
          {request.review ? <div style={{marginTop:6, fontStyle:'italic'}}>“{request.review}”</div> : null}
        </div>
      )}
    </div>
  );
}
