
import React, { useState } from 'react';

export function EditProfile() {
  const [form, setForm] = useState({
    name: "Demo User",
    location: "Nassau, Bahamas",
    avatar: "https://i.pravatar.cc/150?img=8"
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("✅ Profile updated (mock)");
    console.log("Updated Profile:", form);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Your Profile</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="name" value={form.name} onChange={handleChange} className="border p-2 rounded-xl" placeholder="Name" required />
        <input name="location" value={form.location} onChange={handleChange} className="border p-2 rounded-xl" placeholder="Location" required />
        <input name="avatar" value={form.avatar} onChange={handleChange} className="border p-2 rounded-xl" placeholder="Avatar URL" required />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700">Save Changes</button>
      </form>
    </div>
  );
}
