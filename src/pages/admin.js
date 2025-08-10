// src/pages/admin.js
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// Guarded import so build doesn't break if next-auth isn't fully configured at build time
let useSession = null;
try {
  // eslint-disable-next-line global-require
  useSession = require("next-auth/react").useSession;
} catch (e) {
  useSession = null;
}

const ALLOWED_ADMINS = ["renobethell@gmail.com"];

// Disable static export for this page so Next.js doesn't try to prerender it
export async function getServerSideProps() {
  return { props: {} };
}

export default function AdminPage() {
  // If next-auth isn't ready during build, fall back to a no-auth state (client will redirect)
  const sessionHook = typeof useSession === "function" ? useSession() : { data: null, status: "unauthenticated" };
  const { data: session, status } = sessionHook;

  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      // Not logged in -> send home
      router.replace("/");
      return;
    }
    if (session && !ALLOWED_ADMINS.includes(session.user?.email || "")) {
      router.replace("/");
    }
  }, [session, status, router]);

  useEffect(() => {
    const fetchAllRequests = async () => {
      try {
        const q = await getDocs(collection(db, "requests"));
        const data = q.docs.map((d) => ({ id: d.id, ...d.data() }));
        setRequests(data);

        // Auto-expire old requests (older than 7 days)
        const now = Date.now();
        const expirationThreshold = 7 * 24 * 60 * 60 * 1000;
        for (const r of data) {
          try {
            if (r.createdAt?.toMillis && now - r.createdAt.toMillis() > expirationThreshold && r.status !== "expired") {
              await updateDoc(doc(db, "requests", r.id), { status: "expired" });
            }
          } catch (e) {
            console.error("expire failed", r.id, e);
          }
        }
      } catch (e) {
        console.error("Failed to fetch requests", e);
      } finally {
        setLoading(false);
      }
    };
    fetchAllRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-gray-900">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading ? (
        <p>Loading all requests...</p>
      ) : (
        <ul>
          {requests.map((r) => (
            <li key={r.id} className="bg-white p-4 mb-2 rounded shadow">
              <strong>{r.product}</strong> — Status: {r.status}<br />
              Shopper: {r.userId}<br />
              Traveler: {r.travelerId || "Not assigned"}<br />
              <button
                onClick={async () => {
                  await updateDoc(doc(db, "requests", r.id), { dispute: true });
                  alert(`Request ${r.id} flagged as disputed.`);
                }}
                className="mt-2 bg-yellow-200 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-300"
              >
                Flag for Dispute
              </button>
              <br />
              Rating: {r.rating || "Not rated yet"} ★<br />
              Review: {r.review || "No review"}<br />
              {r.dispute ? <p className="text-red-600 text-sm mt-1">⚠️ Disputed</p> : null}
              <button
                onClick={async () => {
                  await deleteDoc(doc(db, "requests", r.id));
                  alert("Request deleted.");
                }}
                className="mt-2 ml-2 bg-red-200 text-red-800 px-3 py-1 rounded hover:bg-red-300"
              >
                Delete Request
              </button>
              <a
                href={`/user/request?id=${r.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 ml-2 bg-blue-200 text-blue-800 px-3 py-1 rounded hover:bg-blue-300"
              >
                View as Shopper
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
