// src/components/OfferForm.js
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function OfferForm({ requestId, onCreated }) {
  const [form, setForm] = useState({
    travelerName: "",
    fee: "",
    eta: "",
    message: ""
  });
  const [saving, setSaving] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.travelerName || !form.fee) return alert("Please enter traveler name and fee.");
    setSaving(true);
    try {
      const ref = collection(db, "requests", String(requestId), "offers");
      await addDoc(ref, {
        travelerName: form.travelerName,
        fee: Number(form.fee),
        eta: form.eta || null,
        message: form.message || "",
        status: "pending",
        createdAt: serverTimestamp()
      });
      setForm({ travelerName: "", fee: "", eta: "", message: "" });
      onCreated && onCreated();
      alert("Offer submitted!");
    } catch (e) {
      console.error(e);
      alert("Failed to submit offer");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-lg font-semibold mb-2">Submit an Offer</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Traveler Name</label>
          <input name="travelerName" value={form.travelerName} onChange={onChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Your Fee (USD)</label>
          <input name="fee" type="number" value={form.fee} onChange={onChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">ETA (optional)</label>
          <input name="eta" type="date" value={form.eta} onChange={onChange} className="w-full border rounded p-2" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Message (optional)</label>
          <textarea name="message" rows="3" value={form.message} onChange={onChange} className="w-full border rounded p-2" />
        </div>
      </div>
      <button disabled={saving} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
        {saving ? "Submitting..." : "Submit Offer"}
      </button>
    </form>
  );
}
