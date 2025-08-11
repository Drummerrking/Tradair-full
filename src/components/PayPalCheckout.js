// src/components/PayPalCheckout.js
import { PayPalButtons } from "@paypal/react-paypal-js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function PayPalCheckout({ requestId, amount }) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!clientId) {
    return <p className="text-red-600">PayPal CLIENT ID missing. Add NEXT_PUBLIC_PAYPAL_CLIENT_ID in Vercel.</p>;
  }

  const createOrder = async () => {
    const res = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create order");
    return data.id;
  };

  const captureOrder = async (orderID) => {
    const res = await fetch("/api/paypal/capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderID })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to capture order");
    return data;
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-lg font-semibold mb-2">Pay with PayPal</h3>
      <p className="mb-3">Total amount: <strong>${amount.toFixed(2)}</strong></p>
      <PayPalButtons
        createOrder={() => createOrder()}
        onApprove={async (data) => {
          const details = await captureOrder(data.orderID);
          try {
            await updateDoc(doc(db, "requests", String(requestId)), {
              status: "paid",
              paymentId: details?.id || data.orderID,
              paymentStatus: details?.status || "COMPLETED"
            });
            alert("Payment successful!");
          } catch (e) {
            console.error(e);
            alert("Payment captured but saving status failed.");
          }
        }}
        onError={(err) => {
          console.error("PayPal error", err);
          alert("PayPal error. Please try again.");
        }}
      />
    </div>
  );
}
