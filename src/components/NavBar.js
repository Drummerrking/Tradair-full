// src/components/NavBar.js
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Tradair</Link>
        <nav className="space-x-4 text-sm">
          <Link href="/create-request" className="hover:underline">Create Request</Link>
          <Link href="/travelers" className="hover:underline">Browse Travelers</Link>
          <Link href="/user/request" className="hover:underline">My Request</Link>
          <Link href="/admin" className="hover:underline">Admin</Link>
        </nav>
      </div>
    </header>
  );
}
