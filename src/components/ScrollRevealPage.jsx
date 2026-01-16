"use client";
import "../app/MeshGradient.css";
import "../app/globals.css";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

// Static imports for critical above-the-fold content
import HeroSection from "./sections/HeroSection";
import Contact from "./Contact";
// Dynamic imports with preloading for below-the-fold content
const SkillsSection = dynamic(() => import("./sections/SkillsSection"), {
  ssr: true, // Enable SSR for better initial load
});

const ExperienceSection = dynamic(
  () => import("./sections/ExperienceSection"),
  {
    ssr: true,
  }
);

const ProjectsSection = dynamic(() => import("./sections/ProjectsSection"), {
  ssr: true,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollRevealPage() {
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

      {/* Hero Section */}
      <HeroSection />

      {/* Main Content Section */}
      <section className="relative z-40 bg-black min-h-screen border-t border-white/10 box-shadow-2xl">
        <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none">
          <div className="skill-blob skill-left" />
          <div className="skill-blob skill-right" />
          <div className="tech-grid" />
          <div className="noise-layer opacity-30" />
        </div>

        <div className="relative z-10 -mt-[70vh]">
          <SkillsSection />
          <ExperienceSection />
          <ProjectsSection />
          <Contact />
        </div>
      </section>
    </div>
  );
}
