import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function RateDelivery({ requestId }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "requests", String(requestId)), { rating, review, status: "delivered" });
    alert("Thanks for your review!");
  };

  return (
    <form onSubmit={submit} style={{border:'1px solid #eee', borderRadius:8, padding:16, marginTop:16}}>
      <h3 style={{fontWeight:600}}>Rate your delivery</h3>
      <label>Rating (1-5)<br/>
        <input type="number" min="1" max="5" value={rating} onChange={e => setRating(Number(e.target.value))} style={{padding:8, border:'1px solid #ddd', borderRadius:8}}/>
      </label>
      <br/><br/>
      <label>Review (optional)<br/>
        <textarea rows="3" value={review} onChange={e => setReview(e.target.value)} style={{width:'100%', padding:8, border:'1px solid #ddd', borderRadius:8}}/>
      </label>
      <br/><br/>
      <button style={{padding:'8px 14px', borderRadius:8, background:'#111827', color:'#fff'}}>Submit Review</button>
    </form>
  );
}
