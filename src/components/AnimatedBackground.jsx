"use client";

import React from "react";

export default function AnimatedBackground({ 
  colors = ["bg-[#1a4b8c]", "bg-[#0a7a82]", "bg-[#122e5c]"], 
  animationStyle = "animate-blob" 
}) {
  return (
    // Changed h-full to min-h-[100dvh] to prevent layout jumping when mobile address bar hides/shows
    <div className="fixed inset-0 w-full min-h-[100dvh] overflow-hidden bg-[#080d14] -z-10">
      
      {/* Layer 1: The Animated Gradient Blobs 
          Added 'will-change-transform' and 'transform-gpu' to force hardware acceleration 
      */}
      <div 
        className={`absolute top-[-10%] left-[-10%] h-[50vw] w-screen ${animationStyle} rounded-full ${colors[0]} opacity-60 mix-blend-screen blur-[80px] transition-colors duration-1000 ease-in-out will-change-transform transform-gpu`} 
      />
      <div 
        className={`absolute right-[-10%] top-[10%] h-[45vw] w-[45vw] ${animationStyle} rounded-full ${colors[1]} opacity-50 mix-blend-screen blur-[80px] animation-delay-2000 transition-colors duration-1000 ease-in-out will-change-transform transform-gpu`} 
      />
      <div 
        className={`absolute bottom-[-25%] left-[25%] h-[60vw] w-[80vw] ${animationStyle} rounded-full ${colors[2]} opacity-60 mix-blend-screen blur-[80px] animation-delay-4000 transition-colors duration-1000 ease-in-out will-change-transform transform-gpu`} 
      />

      {/* Layer 2: The Grainy Noise Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* CSS Animations */}
      <style jsx>{`
        /* Changed translate to translate3d to force GPU rendering and prevent mobile tearing */
        @keyframes blob {
          0% { transform: translate3d(0px, 0px, 0) scale(1); }
          33% { transform: translate3d(50px, -50px, 0) scale(1.1); }
          66% { transform: translate3d(-40px, 40px, 0) scale(0.9); }
          100% { transform: translate3d(0px, 0px, 0) scale(1); }
        }
        
        @keyframes blob-wide {
          0% { transform: translate3d(0px, 0px, 0) scale(1); }
          33% { transform: translate3d(150px, -100px, 0) scale(1.2); }
          66% { transform: translate3d(-100px, 100px, 0) scale(0.8); }
          100% { transform: translate3d(0px, 0px, 0) scale(1); }
        }

        @keyframes blob-spin {
          0% { transform: rotate(0deg) translate3d(50px, 0, 0) rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) translate3d(80px, 0, 0) rotate(-180deg) scale(1.1); }
          100% { transform: rotate(360deg) translate3d(50px, 0, 0) rotate(-360deg) scale(1); }
        }

        .animate-blob { animation: blob 10s infinite alternate cubic-bezier(0.4, 0, 0.2, 1); }
        .animate-blob-wide { animation: blob-wide 12s infinite alternate ease-in-out; }
        .animate-blob-spin { animation: blob-spin 15s infinite linear; }
        
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}