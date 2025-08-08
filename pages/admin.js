// pages/admin.js
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "@/lib/firebase";
import { collection, getDocs, updateDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import Head from "next/head";

const ALLOWED_ADMINS = ["renobethell@gmail.com"];

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") return router.push("/");
    if (session && !ALLOWED_ADMINS.includes(session.user.email)) return router.push("/");
  }, [session, status, router]);

  useEffect(() => {
    const fetchAllRequests = async () => {
      const querySnapshot = await getDocs(collection(db, "requests"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRequests(data);

      // Auto-expire old requests (older than 7 days, example)
      const now = Date.now();
      const expirationThreshold = 7 * 24 * 60 * 60 * 1000;
      data.forEach(async (req) => {
        if (req.createdAt && now - req.createdAt.toMillis() > expirationThreshold && req.status !== "expired") {
          const ref = doc(db, "requests", req.id);
          await updateDoc(ref, { status: "expired" });
        }
      });
      setLoading(false);
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
                  const ref = doc(db, "requests", r.id);
                  await updateDoc(ref, { dispute: true });
                  alert(`Request ${r.id} flagged as disputed.`);
                }}
                className="mt-2 bg-yellow-200 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-300"
              >
                Flag for Dispute
              </button>
              <br />
              Rating: {r.rating || "Not rated yet"} ★
              <br />
              Review: {r.review || "No review"}
              <br />
              {r.dispute && (
                <p className="text-red-600 text-sm mt-1">⚠️ Disputed</p>
              )}
              <button
                onClick={async () => {
                  const ref = doc(db, "requests", r.id);
                  await deleteDoc(ref);
                  alert("Request deleted.");
                }}
                className="mt-2 ml-2 bg-red-200 text-red-800 px-3 py-1 rounded hover:bg-red-300"
              >
                Delete Request
              </button>
            </li>
          ))}
        </ul>
      )}
      <h2 className="text-xl font-bold mt-10 mb-4">Users</h2>
      <UserList />

      <h2 className="text-xl font-bold mt-10 mb-4">Traveler Profiles</h2>
      <TravelerProfiles />
    </div>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleBan = async (uid) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, { banned: true });
    alert(`User ${uid} banned.`);
    setUsers(users.map(user => user.id === uid ? { ...user, banned: true } : user));
  };

  return (
    <ul>
      {users.map(user => (
        <li key={user.id} className="bg-white p-3 mb-2 rounded shadow">
          <strong>{user.email || user.id}</strong> — Role: {user.role || "unknown"}
          {user.banned && <span className="ml-2 text-red-600">(Banned)</span>}
          {!user.banned && (
            <button
              onClick={() => handleBan(user.id)}
              className="ml-4 bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200"
            >
              Ban User
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

function TravelerProfiles() {
  const [travelers, setTravelers] = useState([]);

  useEffect(() => {
    const fetchTravelers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const filtered = data.filter(u => u.role === "traveler");
      setTravelers(filtered);
    };
    fetchTravelers();
  }, []);

  return (
    <ul>
      {travelers.map((t) => (
        <li key={t.id} className="bg-white p-3 mb-2 rounded shadow">
          <strong>{t.name || t.email || t.id}</strong><br />
          Bio: {t.bio || "No bio yet"}<br />
          Countries: {t.countries?.join(", ") || "None listed"}<br />
          Rating: {t.rating || "Not rated"} ★
        </li>
      ))}
    </ul>
  );
}
