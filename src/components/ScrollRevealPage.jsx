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
const BACKGROUND_CONFIGS = {
  hero: { 
    colors: ["bg-[#1a4b8c]", "bg-[#0a7a82]", "bg-[#122e5c]"], 
    animation: "animate-blob" 
  },
  skills: { 
    colors: ["bg-[#0f766e]", "bg-[#0369a1]", "bg-[#1d4ed8]"], // Teals & Blues
    animation: "animate-blob-wide" 
  },
  experience: { 
    colors: ["bg-[#7e22ce]", "bg-[#be185d]", "bg-[#4c1d95]"], // Purples & Pinks
    animation: "animate-blob-spin" 
  },
  projects: { 
    colors: ["bg-[#be123c]", "bg-[#c2410c]", "bg-[#9f1239]"], // Reds & Oranges
    animation: "animate-blob-wide" 
  },
  contact: { 
    colors: ["bg-[#0369a1]", "bg-[#1e3a8a]", "bg-[#0f172a]"], // Dark Blues
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