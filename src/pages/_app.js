// src/pages/_app.js
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "";
  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <Component {...pageProps} />
    </PayPalScriptProvider>
  );
}
