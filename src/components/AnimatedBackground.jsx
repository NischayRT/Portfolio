"use client";

import React from "react";

export default function AnimatedBackground({ 
  colors = ["bg-[#1a4b8c]", "bg-[#0a7a82]", "bg-[#122e5c]"], 
  animationStyle = "animate-blob" 
}) {
  return (
    <div className="fixed inset-0 w-full min-h-[100dvh] overflow-hidden bg-[#080d14] -z-10">

      {/* Blob 1 — large, drifts slowly top-left */}
      <div 
        className={`blob-1 absolute top-[-15%] left-[-15%] h-[55vw] w-[55vw] rounded-full ${colors[0]} opacity-55 mix-blend-screen blur-[90px] will-change-transform transform-gpu transition-colors duration-1000 ease-in-out`} 
      />

      {/* Blob 2 — medium, roams top-right */}
      <div 
        className={`blob-2 absolute right-[-12%] top-[5%] h-[42vw] w-[42vw] rounded-full ${colors[1]} opacity-50 mix-blend-screen blur-[80px] will-change-transform transform-gpu transition-colors duration-1000 ease-in-out`} 
      />

      {/* Blob 3 — wide, sweeps bottom */}
      <div 
        className={`blob-3 absolute bottom-[-20%] left-[10%] h-[50vw] w-[75vw] rounded-full ${colors[2]} opacity-55 mix-blend-screen blur-[100px] will-change-transform transform-gpu transition-colors duration-1000 ease-in-out`} 
      />

      {/* Blob 4 — small accent, centre-right, adds depth */}
      <div 
        className={`blob-4 absolute top-[30%] right-[5%] h-[28vw] w-[28vw] rounded-full ${colors[1]} opacity-30 mix-blend-screen blur-[70px] will-change-transform transform-gpu transition-colors duration-1000 ease-in-out`} 
      />

      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <style jsx>{`
        /* ─── Blob 1: slow wide drift, slight scale breath ─── */
        @keyframes drift1 {
          0%   { transform: translate3d(0px,    0px,   0) scale(1)    rotate(0deg);   }
          20%  { transform: translate3d(45px,  -60px,  0) scale(1.08) rotate(4deg);   }
          40%  { transform: translate3d(-30px, -110px, 0) scale(0.96) rotate(-3deg);  }
          60%  { transform: translate3d(70px,  -70px,  0) scale(1.05) rotate(6deg);   }
          80%  { transform: translate3d(-55px, -20px,  0) scale(1.03) rotate(-2deg);  }
          100% { transform: translate3d(0px,    0px,   0) scale(1)    rotate(0deg);   }
        }

        /* ─── Blob 2: faster, figure-eight feel ─── */
        @keyframes drift2 {
          0%   { transform: translate3d(0px,   0px,   0) scale(1)    rotate(0deg);   }
          15%  { transform: translate3d(-60px, 40px,  0) scale(1.1)  rotate(-5deg);  }
          35%  { transform: translate3d(-20px, 90px,  0) scale(0.92) rotate(3deg);   }
          55%  { transform: translate3d(-80px, 50px,  0) scale(1.06) rotate(-4deg);  }
          75%  { transform: translate3d(-35px, -20px, 0) scale(0.97) rotate(2deg);   }
          100% { transform: translate3d(0px,   0px,   0) scale(1)    rotate(0deg);   }
        }

        /* ─── Blob 3: horizontal sweep, breathes wide ─── */
        @keyframes drift3 {
          0%   { transform: translate3d(0px,    0px,  0) scale(1)    rotate(0deg);   }
          25%  { transform: translate3d(-80px, -40px, 0) scale(1.07) rotate(-3deg);  }
          50%  { transform: translate3d(60px,  -60px, 0) scale(0.93) rotate(5deg);   }
          75%  { transform: translate3d(-40px, -20px, 0) scale(1.04) rotate(-2deg);  }
          100% { transform: translate3d(0px,    0px,  0) scale(1)    rotate(0deg);   }
        }

        /* ─── Blob 4: small nervous orbit ─── */
        @keyframes drift4 {
          0%   { transform: translate3d(0px,   0px,   0) scale(1)    rotate(0deg);   }
          20%  { transform: translate3d(-40px, 55px,  0) scale(1.12) rotate(8deg);   }
          45%  { transform: translate3d(50px,  30px,  0) scale(0.9)  rotate(-6deg);  }
          70%  { transform: translate3d(-20px, -40px, 0) scale(1.08) rotate(4deg);   }
          100% { transform: translate3d(0px,   0px,   0) scale(1)    rotate(0deg);   }
        }

        .blob-1 { animation: drift1 18s ease-in-out infinite; }
        .blob-2 { animation: drift2 14s ease-in-out infinite; animation-delay: -5s; }
        .blob-3 { animation: drift3 22s ease-in-out infinite; animation-delay: -9s; }
        .blob-4 { animation: drift4 11s ease-in-out infinite; animation-delay: -2s; }
      `}</style>
    </div>
  );
}