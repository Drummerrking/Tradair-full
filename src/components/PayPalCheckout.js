// src/components/PayPalCheckout.js
import { PayPalButtons } from "@paypal/react-paypal-js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function PayPalCheckout({ requestId, amount }) {
  if (!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
    return <p className="text-red-600">PayPal CLIENT ID missing. Add NEXT_PUBLIC_PAYPAL_CLIENT_ID in Vercel.</p>;
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-lg font-semibold mb-2">Pay with PayPal</h3>
      <p className="mb-3">Total amount: <strong>${amount.toFixed(2)}</strong></p>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: String(amount.toFixed(2)) } }]
          });
        }}
        onApprove={async (data, actions) => {
          const details = await actions.order.capture();
          try {
            await updateDoc(doc(db, "requests", String(requestId)), {
              status: "paid",
              paymentId: details.id,
              paymentStatus: details.status
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
