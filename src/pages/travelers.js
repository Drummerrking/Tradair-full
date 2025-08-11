import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Travelers() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "users"));
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setRows(all.filter(u => u.role === "traveler"));
    };
    load();
  }, []);

  return (
    <div style={{padding:'24px', fontFamily:'ui-sans-serif, system-ui'}}>
      <h1 style={{fontSize:24, fontWeight:700}}>Travelers</h1>
      {!rows.length ? <p>No travelers yet.</p> : (
        <ul style={{marginTop:12}}>
          {rows.map(t => (
            <li key={t.id} style={{padding:12, border:'1px solid #eee', borderRadius:8, marginBottom:8}}>
              <strong>{t.name || t.email || t.id}</strong><br/>
              Bio: {t.bio || "—"}<br/>
              Countries: {t.countries?.join(", ") || "—"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
