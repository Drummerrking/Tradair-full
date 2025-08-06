
import React, { useState } from 'react';

export function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  function sendMessage() {
    if (!msg.trim()) return;
    setMessages([...messages, { sender: "user", text: msg }]);
    setMsg("");
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "support", text: "We're looking into it! ✅" }]);
    }, 1000);
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Live Chat Support</h1>
      <div className="h-64 overflow-y-auto border rounded-lg p-4 bg-white shadow">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === "user" ? "text-right" : "text-left"}>
            <p className="inline-block bg-blue-100 text-black px-3 py-1 my-1 rounded-lg max-w-xs">{m.text}</p>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input value={msg} onChange={(e) => setMsg(e.target.value)} className="border flex-1 rounded-l-xl px-3 py-2" placeholder="Type your message..." />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded-r-xl hover:bg-blue-700">Send</button>
      </div>
    </div>
  );
}
