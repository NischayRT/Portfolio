import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-[50vh] flex items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
