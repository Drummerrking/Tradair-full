import { PayPalButtons } from "@paypal/react-paypal-js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function PayPalCheckout({ requestId, amount }) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  if (!clientId) return <p style={{color:'#b91c1c'}}>PayPal CLIENT ID missing.</p>;

  return (
    <div style={{border:'1px solid #eee', borderRadius:8, padding:16, marginTop:16}}>
      <h3 style={{fontWeight:600}}>Pay with PayPal</h3>
      <p>Total: <strong>${amount.toFixed(2)}</strong></p>
      <PayPalButtons
        createOrder={(data, actions) => actions.order.create({
          purchase_units: [{ amount: { value: String(amount.toFixed(2)) } }]
        })}
        onApprove={async (data, actions) => {
          const details = await actions.order.capture();
          await updateDoc(doc(db, "requests", String(requestId)), {
            status: "paid",
            paymentId: details.id,
            paymentStatus: details.status
          });
          alert("Payment successful!");
        }}
        onError={(err) => {
          console.error(err);
          alert("PayPal error.");
        }}
      />
    </div>
  );
}
