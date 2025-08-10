// src/pages/create-request.js
import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Layout from "../components/Layout";

export default function CreateRequestPage() {
  const [form, setForm] = useState({
    product: "",
    url: "",
    price: "",
    origin: "",
    destination: "",
  });
  const [saving, setSaving] = useState(false);
  const [createdId, setCreatedId] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.product) return alert("Please enter a product name");
    setSaving(true);
    try {
      const docRef = await addDoc(collection(db, "requests"), {
        ...form,
        price: Number(form.price || 0),
        status: "open",
        createdAt: serverTimestamp(),
      });
      setCreatedId(docRef.id);
      setForm({ product: "", url: "", price: "", origin: "", destination: "" });
    } catch (e) {
      console.error(e);
      alert("Failed to create request");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout title="Create Request • Tradair">
      <h1 className="text-2xl font-bold mb-4">Create a Request</h1>
      <form onSubmit={submit} className="bg-white p-5 rounded-xl shadow grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Product</label>
          <input name="product" value={form.product} onChange={onChange} className="w-full border rounded p-2" placeholder="Nintendo Switch OLED" />
        </div>
        <div>
          <label className="block text-sm font-medium">Store URL</label>
          <input name="url" value={form.url} onChange={onChange} className="w-full border rounded p-2" placeholder="https://example.com/product" />
        </div>
        <div>
          <label className="block text-sm font-medium">Price (USD)</label>
          <input name="price" type="number" value={form.price} onChange={onChange} className="w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Origin (City, Country)</label>
          <input name="origin" value={form.origin} onChange={onChange} className="w-full border rounded p-2" placeholder="Miami, USA" />
        </div>
        <div>
          <label className="block text-sm font-medium">Destination (City, Country)</label>
          <input name="destination" value={form.destination} onChange={onChange} className="w-full border rounded p-2" placeholder="Nassau, Bahamas" />
        </div>
        <div className="md:col-span-2">
          <button disabled={saving} className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {saving ? "Saving..." : "Post Request"}
          </button>
        </div>
      </form>

      {createdId && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4 rounded">
          <p>✅ Request created.</p>
          <p>
            View it here: <a className="underline text-green-700" href={`/user/request?id=${createdId}`}>/user/request?id={createdId}</a>
          </p>
        </div>
      )}
    </Layout>
  );
}
