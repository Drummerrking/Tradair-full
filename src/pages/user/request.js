// pages/user/request.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import RateDelivery from "@/components/RateDelivery";

export default function RequestPage() {
  const router = useRouter();
  const { id } = router.query;
  const [request, setRequest] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchRequest = async () => {
      const ref = doc(db, "requests", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setRequest({ id: snapshot.id, ...snapshot.data() });
      }
    };
    fetchRequest();
  }, [id]);

  if (!request) return <p className="p-4">Loading request...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Your Request</h1>
      <div className="bg-white rounded shadow p-4 mb-6">
        <p><strong>Product:</strong> {request.product}</p>
        <p><strong>Status:</strong> {request.status}</p>
        <p><strong>Traveler:</strong> {request.travelerId || "Not assigned"}</p>
        <p><strong>Created:</strong> {request.createdAt?.toDate().toLocaleString() || "Unknown"}</p>
      </div>

      {request.status === "delivered" && !request.rating && (
        <RateDelivery requestId={request.id} />
      )}

      {request.rating && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
          <p className="text-green-700">✅ You rated this delivery: <strong>{request.rating} ★</strong></p>
          <p className="mt-2 italic">"{request.review}"</p>
        </div>
      )}
    </div>
  );
}
