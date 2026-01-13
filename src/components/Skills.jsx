"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { FaJava, FaCode } from "react-icons/fa";
import {
  SiCplusplus, SiPython, SiHtml5, SiCss3, SiJavascript, SiMysql, SiGit,
  SiReact, SiSelenium, SiNextdotjs, SiTailwindcss, SiBootstrap, SiGoogle,
  SiWordpress, SiPhp, SiPostman, SiVite, SiVercel, SiNetlify
} from "react-icons/si";
import gsap from "gsap";

const SKILLS_DATA = [
  { name: "C/C++", icon: SiCplusplus, color: "#00599C", desc: "System Programming & Algorithms" },
  { name: "Python", icon: SiPython, color: "#3776AB", desc: "Automation, AI & Backend" },
  { name: "Core Java", icon: FaJava, color: "#007396", desc: "Object Oriented Programming" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", desc: "Structural Web Markup" },
  { name: "CSS3", icon: SiCss3, color: "#1572B6", desc: "Responsive Design & Animations" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", desc: "Dynamic Web Interaction" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1", desc: "Relational Database Management" },
  { name: "Git", icon: SiGit, color: "#F05032", desc: "Version Control System" },
  { name: "React.js", icon: SiReact, color: "#61DAFB", desc: "Frontend Library" },
  { name: "Selenium", icon: SiSelenium, color: "#43B02A", desc: "Web Testing Automation" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", desc: "React Framework for Production" },
  { name: "Vite", icon: SiVite, color: "#646CFF", desc: "Next Generation Frontend Tooling" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF", desc: "Deployment & Serverless Functions" },
  { name: "Netlify", icon: SiNetlify, color: "#00C7B7", desc: "Web Development Platform" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", desc: "Utility-First CSS" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3", desc: "Responsive Framework" },
  { name: "AppScript", icon: SiGoogle, color: "#4285F4", desc: "Google Workspace Automation" },
  { name: "Integrations", icon: SiPostman, color: "#FF6C37", desc: "API & System Connecting" },
  { name: "WordPress", icon: SiWordpress, color: "#21759B", desc: "CMS Development" },
  { name: "PHP", icon: SiPhp, color: "#777BB4", desc: "Server-Side Scripting" },
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState(null);
  const featuredSkillRef = useRef(null);

  const handleSkillEnter = useCallback((skill) => setActiveSkill(skill), []);
  const handleSkillLeave = useCallback(() => setActiveSkill(null), []);

  useEffect(() => {
    if (activeSkill && featuredSkillRef.current) {
      gsap.fromTo(
        featuredSkillRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power1.out" }
      );
    }
  }, [activeSkill]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 w-full max-w-6xl rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-stretch shadow-2xl">
        <div className="w-full md:w-1/3 flex flex-col justify-center relative min-h-[300px] border-b md:border-b-0 md:border-r border-white/10 pt-8 md:pt-0 pr-0 md:pr-12">
          {activeSkill ? (
            <>
              <div
                className="absolute inset-0 blur-[100px] opacity-20 transition-colors duration-700 pointer-events-none"
                style={{ backgroundColor: activeSkill.color }}
              />
              <div
                ref={featuredSkillRef}
                className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left"
              >
                <activeSkill.icon
                  size={80}
                  className="mb-6 drop-shadow-2xl transition-colors duration-500"
                  style={{ color: activeSkill.color }}
                />
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                  {activeSkill.name}
                </h2>
                <div
                  className="h-1 w-20 rounded-full mb-6"
                  style={{ backgroundColor: activeSkill.color }}
                ></div>
                <p className="text-lg text-gray-300 font-light">
                  {activeSkill.desc}
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <FaCode
                size={60}
                className="mb-4 animate-pulse text-white"
              />
              <h1 className="text-2xl text-white">My Tech Stack</h1>
            </div>
          )}
        </div>
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {SKILLS_DATA.map((skill, index) => (
              <div
                key={index}
                onMouseEnter={() => handleSkillEnter(skill)}
                onMouseLeave={handleSkillLeave}
                style={{ "--skill-color": skill.color }}
                className="group relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/90 bg-gradient-to-b from-white/1 to-white/7 border border-white/5 hover:border-[var(--skill-color)]"
              >
                <skill.icon
                  size={32}
                  className="text-white group-hover:text-black group-hover:scale-110 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
