"use client";
import "../app/MeshGradient.css";
import "../app/globals.css";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

import HeroSection from "./sections/HeroSection";
import Contact from "./Contact";

const SkillsSection    = dynamic(() => import("./sections/SkillsSection"),    { ssr: false, loading: () => <div className="min-h-screen" /> });
const ExperienceSection = dynamic(() => import("./sections/ExperienceSection"), { ssr: false, loading: () => <div className="min-h-screen" /> });
const ProjectsSection   = dynamic(() => import("./sections/ProjectsSection"),   { ssr: false, loading: () => <div className="min-h-screen" /> });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollRevealPage() {
  return (
    <div className="relative bg-black min-h-screen selection:bg-blue-500/30">
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar       { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }

        /*
          SECTION BACKGROUND
          ──────────────────
          A layered ambient background for the content section that echoes the
          hero's colour palette (blue / indigo / near-black) but much darker and
          more static — atmosphere without distraction.

          Layer order (bottom → top):
            1. Deep navy base  (#07080f)
            2. Large radial blue glow — top-left, mimics hero blob direction
            3. Large radial indigo glow — bottom-right, counter-balance
            4. Subtle top-edge gradient that blends into the hero transition
            5. Fine dot grid — gives depth without being loud
            6. Noise grain overlay — ties texture to hero section
        */
        .section-bg {
          background-color: #07080f;
          background-image:
            /* blue glow — upper left */
            radial-gradient(ellipse 70% 55% at 10% 15%,  rgba(37,99,235,0.11)  0%, transparent 65%),
            /* indigo glow — lower right */
            radial-gradient(ellipse 60% 50% at 90% 85%,  rgba(79,70,229,0.09)  0%, transparent 65%),
            /* faint warm centre accent */
            radial-gradient(ellipse 40% 30% at 50% 50%,  rgba(30,58,138,0.06)  0%, transparent 70%),
            /* top-edge blend to match hero bottom */
            linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 120px),
            /* dot grid */
            radial-gradient(circle, rgba(255,255,255,0.028) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 100% 100%, 100% 120px, 28px 28px;
        }

        /* Slow-drifting ambient glow — keeps the bg alive without JS */
        @keyframes drift-blue {
          0%, 100% { opacity: 0.11; transform: translate(0, 0)    scale(1);    }
          50%       { opacity: 0.16; transform: translate(2%, 1.5%) scale(1.04); }
        }
        @keyframes drift-indigo {
          0%, 100% { opacity: 0.09; transform: translate(0, 0)     scale(1);    }
          50%       { opacity: 0.14; transform: translate(-2%, -1%) scale(1.03); }
        }
        .glow-blue   { animation: drift-blue   14s ease-in-out infinite; }
        .glow-indigo { animation: drift-indigo 18s ease-in-out infinite; }
      `}</style>

      {/* Hero */}
      <HeroSection />

      {/*
        Main content section.
        • section-bg class → ambient dot-grid + glow background
        • Two animated glow blobs are pure CSS — zero JS, zero reflow.
        • Section IDs added here as wrappers so the Header nav can scroll to them.
      */}
      <section className="section-bg relative z-10 border-t border-white/[0.06]" style={{ boxShadow: "0 -1px 0 rgba(59,130,246,0.08)" }}>

        {/* Animated ambient blobs (CSS only, position:absolute so no layout cost) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="glow-blue  absolute w-[55vw] h-[55vw] rounded-full top-[-10%]  left-[-10%]"
               style={{ background: "radial-gradient(circle, rgba(37,99,235,0.10) 0%, transparent 70%)" }} />
          <div className="glow-indigo absolute w-[50vw] h-[50vw] rounded-full bottom-[5%]  right-[-8%]"
               style={{ background: "radial-gradient(circle, rgba(79,70,229,0.09) 0%, transparent 70%)" }} />
        </div>

        {/* Content with section anchor IDs */}
        <div id="skills">
          <SkillsSection />
        </div>
        <div id="experience">
          <ExperienceSection />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <Contact />
      </section>
    </div>
  );
}