// sections/HeroSection.jsx
"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".h-tag",    { y: 20, opacity: 0, duration: 0.6 })
        .from(".h-first",  { y: 60, opacity: 0, duration: 1.1 }, "-=0.2")
        .from(".h-last",   { y: 60, opacity: 0, duration: 1.1 }, "-=0.8")
        .from(".h-sub",    { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".h-desc",   { y: 20, opacity: 0, duration: 0.6 }, "-=0.35")
        .from(".h-cta",    { y: 20, opacity: 0, duration: 0.5 }, "-=0.25");
    }, ref);
    return () => ctx.revert();
  }, []);

  const go = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="relative flex w-full min-h-screen flex-col items-center justify-center overflow-hidden px-6! pt-20!">
      
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center text-center">
        
        <p className="h-tag mb-6 font-sans text-sm tracking-[0.4em] text-white/50 uppercase">
          Hi, I am
        </p>

        <div className="h-name mb-6 flex flex-col items-center leading-[0.85]">
          <h1 className="h-first font-sans text-[clamp(4rem,12vw,10rem)] font-black tracking-tighter text-white">
            Nischay
          </h1>
          <h1 className="h-last font-serif text-[clamp(4.5rem,13vw,11rem)] font-normal italic text-cyan-400 drop-shadow-[0_0_40px_rgba(34,211,238,0.4)]">
            Reddy
          </h1>
        </div>

        <p className="h-sub my-3 font-sans text-[clamp(1.1rem,2.5vw,1.5rem)] font-light tracking-wide text-white/80">
          Computer Science Undergraduate
        </p>

        <p className="h-desc mb-4 max-w-md font-sans text-sm font-light leading-relaxed text-white/60 md:text-base">
          CS undergraduate building real-world software with thoughtful design.
          Seeking an entry-level engineering position to create impactful digital experiences.
        </p>

        <div className="h-cta flex flex-wrap justify-center gap-4">
          <button onClick={go("projects")} className="rounded-full bg-cyan-400 px-8 py-3.5 font-sans text-sm font-bold text-gray-900 transition-all hover:bg-cyan-300 hover:scale-105">
            View Work ↓
          </button>
          <button onClick={go("contact")} className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 font-sans text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/40">
            Contact Me
          </button>
        </div>

      </div>
    </section>
  );
}