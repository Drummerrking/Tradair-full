// src/components/Layout.js
import Head from "next/head";
import NavBar from "./NavBar";

export default function Layout({ title = "Tradair", children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NavBar />
      <main className="max-w-5xl mx-auto p-4">{children}</main>
      <footer className="border-t mt-10 p-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Tradair
      </footer>
    </div>
  );
}
