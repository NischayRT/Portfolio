"use client";
import React, { useRef, useLayoutEffect, useCallback, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS_DATA } from "../constants/data";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * 3D Tilt Effect for cards
 */
function useTilt(ref) {
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width  - 0.5) * 16;
    const y = ((e.clientY - top)  / height - 0.5) * -10;
    el.style.transform = `perspective(1260px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.06, 1.06, 1.06)`;
  }, [ref]);

  const onLeave = useCallback(() => {
    if (ref.current)
      ref.current.style.transform = "perspective(1200px) rotateY(0) rotateX(0) scale3d(1, 1, 1)";
  }, [ref]);

  return { onMouseMove: onMove, onMouseLeave: onLeave };
}

function ProjectCard({ project, index, compact = false }) {
  const ref  = useRef(null);
  const tilt = useTilt(ref);

  return (
    <a 
      ref={ref} 
      href={project.url} 
      target="_blank" 
      rel="noopener noreferrer"
      {...(!compact ? tilt : {})}
      className="interactive-element group relative block h-full w-full overflow-hidden transition-all duration-300"
      style={{
        borderRadius: "28px",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Background Image with Overlay */}
      <Image 
        src={project.image} 
        alt={project.title} 
        fill
        className="object-cover opacity-40 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-75" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Floating Tag */}
      <div className="absolute top-6 right-6 z-20">
        <span className="rounded-full border border-white/10 bg-black/20 px-4 py-1.5 font-sans text-[9px] font-medium tracking-[0.15em] text-white/50 uppercase backdrop-blur-md">
          {project.subtitle}
        </span>
      </div>

      {/* Content */}
      <div className="absolute inset-x-8 bottom-8 z-20">
        <div className="mb-3 font-sans text-[10px] font-bold tracking-[0.25em] text-cyan-400 uppercase">
          Project — 0{index + 1}
        </div>
        
        <h3 className="mb-4 font-serif text-[clamp(2rem,4vw,3.5rem)] font-normal italic leading-[1.1] text-white">
          {project.title}
        </h3>
        
        <p className="mb-6 line-clamp-3 font-sans text-sm font-light leading-relaxed text-white/40 md:text-base">
          {project.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-3">
            {project.tech.map((Icon, i) => (
              <Icon key={i} size={18} className="text-white/30 transition-colors group-hover:text-cyan-400" />
            ))}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all group-hover:bg-cyan-400 group-hover:text-black">
            <span className="text-xl">↗</span>
          </div>
        </div>
      </div>
    </a>
  );
}

function MobileProjects() {
  return (
    <section id="projects" className="relative z-10 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 font-sans text-5xl font-black tracking-tighter text-white md:text-7xl">
          Selected <span className="font-serif font-normal italic text-cyan-400">Works</span>
        </h2>
        <div className="flex flex-col gap-6">
          {PROJECTS_DATA.map((p, i) => (
            <div key={i} className="h-[450px]">
              <ProjectCard project={p} index={i} compact />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopProjects() {
  const wrapRef = useRef(null);
  const conRef  = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const con = conRef.current;
      const getAmt = () => -(con.scrollWidth - window.innerWidth);
      
      gsap.to(con, {
        x: getAmt,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: () => `+=${Math.abs(getAmt())}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrapRef} id="projects" className="relative z-10 h-screen w-full overflow-hidden flex flex-col justify-center">
      {/* Section Header */}
      <div className="absolute top-12 left-[5vw] z-30">
        <h2 className="font-sans text-7xl font-black tracking-tighter text-white">
          My <span className="font-serif font-normal italic text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]">Projects</span>
        </h2>
      </div>

      {/* Horizontal Container */}
      <div 
        ref={conRef}
        className="flex items-center gap-12 px-[5vw] pt-20"
        style={{ width: "fit-content" }}
      >
        {PROJECTS_DATA.map((p, i) => (
          <div key={i} className="h-[65vh] w-[55vw] min-w-[600px] max-w-[850px] flex-shrink-0">
            <ProjectCard project={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ProjectsSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check(); 
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) return null;

  return isMobile ? <MobileProjects /> : <DesktopProjects />;
}