"use client";
import "../app/MeshGradient.css";
import "../app/globals.css";
import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Hero from "./Hero";
import Loading from "./Loading";

const Skills = dynamic(() => import("./Skills"), {
  loading: () => <Loading />,
});
const Experience = dynamic(() => import("./Experience"), {
  loading: () => <Loading />,
});
const Projects = dynamic(() => import("./Projects"), {
  loading: () => <Loading />,
});
const Contact = dynamic(() => import("./Contact"), {
  loading: () => <Loading />,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollRevealPage() {
  const preloaderRef = useRef(null);
  const counterRef = useRef(null);
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);

  useLayoutEffect(() => {
    // Lock scroll during loading
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsPreloaderComplete(true);
          document.body.style.overflow = "auto"; // Unlock scroll
        },
      });

      // 1. Counter Animation (0 to 100)
      tl.to(counterRef.current, {
        innerText: 100,
        duration: 2,
        snap: { innerText: 1 }, // Snaps to whole numbers
        ease: "power2.inOut",
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.innerHTML =
              Math.round(this.progress() * 100) + "%";
          }
        },
      });

      // 2. Fade out counter
      tl.to(counterRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.in",
      });

      // 3. Slide the curtain up (Reveal Hero)
      tl.to(
        preloaderRef.current,
        {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
        },
        "-=0.2"
      ); // Overlap slightly with fade out
    }, preloaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative bg-black min-h-screen selection:bg-blue-500/30">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }
      `}</style>

      {/* --- PRELOADER OVERLAY --- */}
      <div
        ref={preloaderRef}
        className="fixed inset-0 z-[9999] bg-black flex items-center justify-center flex-col"
      >
        <div className="relative overflow-hidden">
          <h1
            ref={counterRef}
            className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-800 font-mono tracking-tighter"
          >
            0%
          </h1>
        </div>
        <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm uppercase tracking-[0.3em] animate-pulse">
          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
          Loading Experience
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      {/* We keep Hero mounted so it's ready when the curtain lifts */}
      <Hero />

      <section className="relative z-40 bg-black min-h-screen border-t border-white/10 box-shadow-2xl">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none">
          <div className="skill-blob skill-left" />
          <div className="skill-blob skill-right" />
          <div className="tech-grid" />
          <div className="noise-layer opacity-30" />
        </div>
        <div className="relative z-10 -mt-[70vh]">
          {/* Lazy load the rest to improve performance */}
          <Skills />
          <Experience />
          <Projects />
        </div>
      </section>
      <Contact />
    </div>
  );
}
