// src/pages/user/request.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import RateDelivery from "../../components/RateDelivery";
import OfferForm from "../../components/OfferForm";
import OfferList from "../../components/OfferList";
import PayPalCheckout from "../../components/PayPalCheckout";

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

  if (!request) return <p className="p-4">Loading request...</p>;

  const totalAmount = Number(request.price || 0) + Number(request.agreedFee || 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Request: {request.product}</h1>
      <div className="bg-white rounded shadow p-4 mb-6">
        <p><strong>Product:</strong> {request.product}</p>
        <p><strong>Price:</strong> ${Number(request.price || 0)}</p>
        <p><strong>Status:</strong> {request.status}</p>
        <p><strong>Traveler:</strong> {request.travelerId || "Unassigned"}</p>
        {request.url ? <p><a className="text-blue-600 underline" href={request.url} target="_blank" rel="noreferrer">Product link</a></p> : null}
      </div>

      {/* Offers section (always visible for now) */}
      <OfferForm requestId={request.id} onCreated={load} />
      <OfferList requestId={request.id} onAccepted={load} />

      {/* Payment when accepted */}
      {request.status === "accepted" && (
        <PayPalCheckout requestId={request.id} amount={totalAmount} />
      )}

      {/* Rating after delivery */}
      {request.status === "delivered" && !request.rating && (
        <RateDelivery requestId={request.id} />
      )}

      {request.rating && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
          <p className="text-green-700">✅ You rated this delivery: <strong>{request.rating} ★</strong></p>
          {request.review ? <p className="mt-2 italic">"{request.review}"</p> : null}
        </div>
      )}
    </div>
  );
}
