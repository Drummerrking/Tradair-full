
import React from 'react';

export function LayoutWrapper({ children }) {
  return (
    <div className="min-h-screen bg-white text-[#1C1C1C] font-sans px-4 py-6 md:px-10 lg:px-24">
      {children}
    </div>
  );
}
