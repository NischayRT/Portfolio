"use client";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS_DATA } from "../constants/data";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  { label: "Languages",  keys: ["C/C++","Python","Core Java","JavaScript","PHP"] },
  { label: "Frontend",   keys: ["HTML5","CSS3","React.js","Next.js","Tailwind","Bootstrap","Vite"] },
  { label: "Backend",    keys: ["MySQL","Supabase","PHP","AppScript","Integrations"] },
  { label: "Tools",      keys: ["Git","Selenium","WordPress","Vercel","Netlify","Electron","Postman"] },
];

// Creates a lookup map for faster access
const skillMap = Object.fromEntries(SKILLS_DATA.map(s => [s.name, s]));

export default function SkillsSection() {
  const [hovered, setHovered] = useState(null);
  const [catIdx, setCatIdx] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sk-heading", {
        y: 40, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".sk-card", {
        y: 60, opacity: 0, duration: 1, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const catSkills = CATEGORIES[catIdx].keys.map(k => skillMap[k]).filter(Boolean);
  
  // Default to the first skill in the category if nothing is hovered
  const featured = hovered ?? catSkills[0] ?? null;

  return (
    <section ref={sectionRef} id="skills" className="relative z-10 flex min-h-screen flex-col justify-center py-20 px-6">
      <div className="mx-auto w-full max-w-6xl">
        
        {/* Heading */}
        <h2 className="sk-heading mb-10 font-sans text-[clamp(2.5rem,6vw,4.5rem)] font-black tracking-tighter text-white md:mb-14">
          Tech{" "}
          <span className="font-serif font-normal italic text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            Stack
          </span>
        </h2>

        {/* The Glassmorphic Main Card */}
        <div className="sk-card flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl">
          
          {/* Category Tabs (Scrollable on mobile) */}
          <div className="flex overflow-x-auto border-b border-white/10 scrollbar-hide">
            {CATEGORIES.map((cat, i) => {
              const isActive = catIdx === i;
              return (
                <button
                  key={cat.label}
                  onClick={() => { setCatIdx(i); setHovered(null); }}
                  className={`interactive-element flex-1 whitespace-nowrap px-6 py-4 font-sans text-xs font-bold tracking-[0.15em] uppercase transition-all duration-300 ${
                    isActive 
                      ? "border-b-2 border-cyan-400 text-cyan-400 bg-white/5" 
                      : "border-b-2 border-transparent text-white/40 hover:bg-white/5 hover:text-white/70"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Body Split */}
          <div className="flex flex-col md:flex-row md:min-h-[400px]">
            
            {/* Left Panel: Featured Skill Details */}
            <div className="relative flex w-full flex-col justify-center border-b border-white/10 p-8 md:w-[320px] md:border-b-0 md:border-r overflow-hidden">
              {featured && (
                <div className="relative z-10 transition-all duration-300">
                  {/* Dynamic radial glow based on the skill's specific color */}
                  <div 
                    className="absolute inset-0 -z-10 opacity-20 transition-colors duration-500 blur-[40px]"
                    style={{ background: `radial-gradient(circle at center, ${featured.color} 0%, transparent 70%)` }} 
                  />
                  
                  <featured.icon size={56} style={{ color: featured.color }} className="mb-6 drop-shadow-lg" />
                  
                  <h3 className="mb-2 font-sans text-2xl font-bold tracking-tight text-white">
                    {featured.name}
                  </h3>
                  
                  <div 
                    className="mb-4 h-[2px] w-8 rounded-full transition-colors duration-300"
                    style={{ background: featured.color }} 
                  />
                  
                  <p className="font-sans text-sm font-light leading-relaxed text-white/60">
                    {featured.desc}
                  </p>
                </div>
              )}
            </div>

            {/* Right Panel: Interactive Grid */}
            <div className="flex-1 p-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {catSkills.map((skill) => {
                  const isHovered = hovered?.name === skill.name;
                  
                  return (
                    <div
                      key={skill.name}
                      className="interactive-element group flex aspect-square cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/10 hover:shadow-lg"
                      onMouseEnter={() => setHovered(skill)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <skill.icon 
                        size={32} 
                        style={{ color: isHovered ? skill.color : "rgba(255, 255, 255, 0.4)" }}
                        className="transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]" 
                      />
                      <span className={`font-sans text-[9px] font-bold tracking-[0.1em] uppercase transition-colors duration-300 ${
                        isHovered ? "text-white" : "text-white/30"
                      }`}>
                        {/* Cleans up names like "Core Java" to just "Java" for the tiny boxes */}
                        {skill.name.replace("Core ", "").replace(".js", "").split("/")[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}