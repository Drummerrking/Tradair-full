import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";

export default function CreateRequest() {
  const [form, setForm] = useState({ product: "", url: "", price: "" });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.product || !form.price) return alert("Product and price are required.");
    setSaving(true);
    try {
      const ref = await addDoc(collection(db, "requests"), {
        product: form.product,
        url: form.url || null,
        price: Number(form.price),
        status: "open",
        createdAt: serverTimestamp()
      });
      alert("Request created!");
      router.push(`/user/request?id=${ref.id}`);
    } catch (e) {
      console.error(e);
      alert("Failed to create request");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{padding:'24px', fontFamily:'ui-sans-serif, system-ui'}}>
      <h1 style={{fontSize:24, fontWeight:700}}>Create a Request</h1>
      <form onSubmit={submit} style={{marginTop:12, maxWidth:520}}>
        <label>Product<br/>
          <input name="product" value={form.product} onChange={onChange} style={{width:'100%', padding:8, border:'1px solid #ddd', borderRadius:8}}/>
        </label>
        <br/><br/>
        <label>Product URL (optional)<br/>
          <input name="url" value={form.url} onChange={onChange} style={{width:'100%', padding:8, border:'1px solid #ddd', borderRadius:8}}/>
        </label>
        <br/><br/>
        <label>Price (USD)<br/>
          <input name="price" type="number" value={form.price} onChange={onChange} style={{width:'100%', padding:8, border:'1px solid #ddd', borderRadius:8}}/>
        </label>
        <br/><br/>
        <button disabled={saving} style={{padding:'10px 16px', borderRadius:8, background:'#2563eb', color:'#fff'}}>
          {saving ? "Saving..." : "Create"}
        </button>
      </form>
    </div>
  );
}
