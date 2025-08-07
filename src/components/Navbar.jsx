import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-800 text-white p-4">
      <ul className="flex flex-wrap gap-4 text-sm">
        {Array.from({ length: 26 }, (_, i) => (
          <li key={i}>
            <Link href={`/pages/Page${i + 1}`}>Page {i + 1}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}