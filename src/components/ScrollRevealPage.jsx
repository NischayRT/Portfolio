"use client";
import React, { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Make sure your paths are correct for your project
import HeroSection from "./sections/HeroSection";
import SkillsSection from "./sections/SkillsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import Contact from "./Contact";
import CustomCursor from "./CustomCursor";
import AnimatedBackground from "./AnimatedBackground"; 

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* We map your sections to specific Tailwind/Hex colors and animations 
  for the AnimatedBackground component. 
*/
/* High-Contrast "Drastic" Palette Mapping 
  Each section jumps to a completely different color temperature to make the transitions pop.
*/
const BACKGROUND_CONFIGS = {
  hero: { 
    // Vibe: Deep Ocean (Cool Blues & Cyans)
    colors: ["bg-[#0f172a]", "bg-[#0891b2]", "bg-[#1e3a8a]"], 
    animation: "animate-blob" 
  },
  skills: { 
    // Vibe: Fiery Magma (Drastic shift to warm Reds, Oranges, & Crimson)
    colors: ["bg-[#7f1d1d]", "bg-[#ea580c]", "bg-[#9f1239]"], 
    animation: "animate-blob-wide" 
  },
  experience: { 
    // Vibe: Toxic/Cyberpunk Green (Drastic shift to bright Emerald & Teal)
    colors: ["bg-[#064e3b]", "bg-[#10b981]", "bg-[#0f766e]"], 
    animation: "animate-blob-spin" 
  },
  projects: { 
    // Vibe: Neon Synthwave (Drastic shift to deep Purples & bright Pinks)
    colors: ["bg-[#4c1d95]", "bg-[#db2777]", "bg-[#581c87]"], 
    animation: "animate-blob-wide" 
  },
  contact: { 
    // Vibe: Dark Gold Sunset (Drastic shift to rich Ambers & pure darkness)
    colors: ["bg-[#b45309]", "bg-[#020617]", "bg-[#ca8a04]"], 
    animation: "animate-blob-spin" 
  },
};
export default function ScrollRevealPage() {
  const [activeSection, setActiveSection] = useState("hero");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Loop through our configurations and create a ScrollTrigger for each section ID
      Object.keys(BACKGROUND_CONFIGS).forEach((key) => {
        ScrollTrigger.create({
          trigger: `#${key}`,
          start: "top 55%",
          onEnter: () => setActiveSection(key),
          onEnterBack: () => setActiveSection(key),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  // Get the current colors and animation based on the active section state
  const currentConfig = BACKGROUND_CONFIGS[activeSection] || BACKGROUND_CONFIGS.hero;

  return (
    <div className="relative w-full">
      <CustomCursor />
      
      {/* This replaces the ThreeBackground. 
        It receives the dynamic colors from our GSAP ScrollTrigger state.
      */}
      <AnimatedBackground 
        colors={currentConfig.colors} 
        animationStyle={currentConfig.animation} 
      />
      
      <div className="noise-overlay pointer-events-none fixed inset-0 z-0 opacity-20" />
      <div className="bg-vignette pointer-events-none fixed inset-0 z-0" />

      {/* Note: I changed the IDs to match the GSAP triggers perfectly */}
      <div id="hero" className="relative z-10">
        <HeroSection />
      </div>
      <div id="skills" className="relative z-10">
        <SkillsSection />
      </div>
      <div id="experience" className="relative z-10">
        <ExperienceSection />
      </div>
      <div id="projects" className="relative z-10">
        <ProjectsSection />
      </div>
      <div id="contact" className="relative z-10">
        <Contact />
      </div>
    </div>
  );
}