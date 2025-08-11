import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function OfferForm({ requestId, onCreated }) {
  const [form, setForm] = useState({ travelerName: "", fee: "", eta: "", message: "" });
  const [saving, setSaving] = useState(false);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.travelerName || !form.fee) return alert("Name and fee are required.");
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
    <form onSubmit={submit} style={{border:'1px solid #eee', borderRadius:8, padding:16, marginTop:16}}>
      <h3 style={{fontWeight:600}}>Submit an Offer</h3>
      <div style={{display:'grid', gap:8, gridTemplateColumns:'1fr 1fr'}}>
        <label>Traveler Name<br/>
          <input name="travelerName" value={form.travelerName} onChange={onChange} style={{width:'100%', padding:8, border:'1px solid #ddd', borderRadius:8}}/>
        </label>
        <label>Your Fee (USD)<br/>
          <input name="fee" type="number" value={form.fee} onChange={onChange} style={{width:'100%', padding:8, border:'1px solid #ddd', borderRadius:8}}/>
        </label>
        <label>ETA (optional)<br/>
          <input name="eta" type="date" value={form.eta} onChange={onChange} style={{width:'100%', padding:8, border:'1px solid #ddd', borderRadius:8}}/>
        </label>
        <label className="col-span-2">Message (optional)<br/>
          <textarea name="message" rows="3" value={form.message} onChange={onChange} style={{width:'100%', padding:8, border:'1px solid #ddd', borderRadius:8}}/>
        </label>
      </div>
      <button disabled={saving} style={{marginTop:12, padding:'8px 14px', borderRadius:8, background:'#16a34a', color:'#fff'}}>
        {saving ? "Submitting..." : "Submit Offer"}
      </button>
    </form>
  );
}
