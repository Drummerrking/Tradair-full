// Tradair – Web App (Cleaned Version)

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { PostGrab } from "./pages/PostGrab";
import "./styles/theme.css";

const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
const users = storedUsers.map(user => ({ ...user, inbox: user.inbox || [] }));
const storedGrabs = JSON.parse(localStorage.getItem('grabs') || '[]');
const grabs = storedGrabs;
const storedOffers = JSON.parse(localStorage.getItem('offers') || '[]');
const offers = storedOffers;

function Home() {
  const navigate = useNavigate();
  return (
    <div className="max-w-2xl mx-auto mt-10 text-center">
      <h1 className="text-4xl font-bold mb-4 text-[#1C1C1C]">Welcome to Tradair</h1>
      <p className="text-lg text-gray-700 mb-6">A global delivery platform where travelers deliver what shoppers need.</p>
      <button
        onClick={() => navigate('/my-grabs')}
        className="bg-[#06C167] text-white px-6 py-3 rounded-xl hover:bg-green-600"
      >
        View My Grabs & Offers
      </button>
    </div>
  );
}

function Signup() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (users.find(u => u.username === form.username)) return alert("Username already exists");
    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(form));
    alert("Signup successful");
    navigate('/dashboard');
  };
  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="border p-2 rounded-xl" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="border p-2 rounded-xl" required />
        <button type="submit" className="bg-[#06C167] text-white py-2 rounded-xl">Sign Up</button>
      </form>
    </div>
  );
}

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === form.username && u.password === form.password);
    if (!user) return alert("Invalid login");
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert("Login successful");
    navigate('/dashboard');
  };
  return (
    <div className="max-w-sm mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="border p-2 rounded-xl" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="border p-2 rounded-xl" required />
        <button type="submit" className="bg-[#06C167] text-white py-2 rounded-xl">Login</button>
      </form>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-grab" element={<PostGrab />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;