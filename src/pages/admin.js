// src/pages/admin.js
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../lib/firebase";
import { collection, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import Head from "next/head";

const ALLOWED_ADMINS = ["renobethell@gmail.com"];

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
    if (session && !ALLOWED_ADMINS.includes(session?.user?.email ?? "")) router.push("/");
  }, [session, status, router]);

  useEffect(() => {
    const fetchAllRequests = async () => {
      const q = await getDocs(collection(db, "requests"));
      const data = q.docs.map(d => ({ id: d.id, ...d.data() }));
      setRequests(data);

      const now = Date.now();
      const expirationThreshold = 7 * 24 * 60 * 60 * 1000;
      for (const r of data) {
        if (r.createdAt?.toMillis && now - r.createdAt.toMillis() > expirationThreshold && r.status !== "expired") {
          try {
            await updateDoc(doc(db, "requests", r.id), { status: "expired" });
          } catch (e) {
            console.error("expire failed", r.id, e);
          }
        }
      }
      setLoading(false);
    };
    fetchAllRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-gray-900">
      <Head><title>Admin Dashboard</title></Head>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {loading ? <p>Loading all requests...</p> : (
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
              >Flag for Dispute</button>
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
              >Delete Request</button>
              <a
                href={`/user/request?id=${r.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 ml-2 bg-blue-200 text-blue-800 px-3 py-1 rounded hover:bg-blue-300"
              >View as Shopper</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
