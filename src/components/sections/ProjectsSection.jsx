"use client";
import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { PROJECTS_DATA } from "../constants/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
  const wrapperRef   = useRef(null);
  const containerRef = useRef(null);
  const titleRef     = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper   = wrapperRef.current;
      const container = containerRef.current;
      const title     = titleRef.current;
      const cards     = gsap.utils.toArray(container.children)
                             .filter(c => !c.classList.contains("spacer"));

      let cached = 0;
      const getScrollAmount = () => {
        cached = -(container.scrollWidth - window.innerWidth);
        return cached;
      };

      gsap.set(title, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 1.5, opacity: 1, zIndex: 50 });
      gsap.set(cards, { opacity: 0, y: 40, willChange: "transform, opacity" });

      const mm = gsap.matchMedia();
      mm.add({ isMobile: "(max-width: 767px)", isDesktop: "(min-width: 768px)" }, (ctx) => {
        const { isMobile } = ctx.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => `+=${Math.abs(getScrollAmount()) + window.innerHeight}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        });

        tl.to(title, {
            top: isMobile ? "calc(10% - 20px)" : "2rem",
            left: isMobile ? "50%" : "2rem",
            xPercent: isMobile ? -50 : 0,
            yPercent: 0, scale: 1,
            duration: 0.2, ease: "power2.out",
          })
          .to(cards, {
            opacity: 1, y: 0,
            duration: 0.2, stagger: 0.05, ease: "power2.out",
            onComplete: () => gsap.set(cards, { willChange: "auto" }),
          }, "-=0.1")
          .to(container, { x: getScrollAmount, duration: 2, ease: "none" });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="h-screen overflow-hidden flex flex-col justify-center relative">
      <h2
        ref={titleRef}
        className="absolute text-3xl md:text-4xl text-white opacity-0 drop-shadow-xl shiny-silver whitespace-nowrap z-50 pointer-events-none"
        style={{ willChange: "transform, opacity" }}
      >
        <div>Featured</div><div>Projects</div>
      </h2>

      <div
        ref={containerRef}
        className="h-full flex flex-nowrap items-center pl-[5vw] md:pl-[10vw] pr-[20vw]"
        style={{ width: "fit-content" }}
      >
        {PROJECTS_DATA.map((project, index) => (
          <div key={index} className="relative flex-shrink-0 w-[90vw] md:w-[50vw] h-[60vh] mr-8 md:mr-16">
            <div
              className="group isolate w-full h-full border border-white/10 rounded-3xl p-6 md:p-8 md:pt-4 flex flex-col justify-between shadow-2xl transition-colors duration-200 hover:bg-white hover:text-blue-700 relative"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)" }}
            >
              <div className="flex flex-col h-full z-10 relative pointer-events-none group-hover:pointer-events-auto">
                <div className="flex items-center justify-between mb-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 items-center cursor-pointer z-50 pointer-events-auto hover:opacity-70 transition-opacity duration-150"
                  >
                    <ExternalLink size={20} className="text-blue-400 group-hover:text-blue-600 transition-colors duration-150" />
                  </a>
                </div>
                <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 group-hover:text-[#ffd7a2] transition-colors duration-150 leading-tight">
                  {project.title}
                </h3>
                <p className="text-base md:text-lg text-blue-300 font-medium mb-4 md:mb-6 group-hover:text-blue-500 transition-colors duration-150">
                  {project.subtitle}
                </p>
                <div className="mt-auto">
                  <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-light mb-6 md:mb-8 group-hover:text-gray-100 transition-colors duration-150 line-clamp-3 md:line-clamp-2 w-full">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.tech.map((TechIcon, i) => (
                      <div key={i} className="p-2 md:p-3 rounded-xl bg-white/10 border border-white/10 group-hover:bg-gray-100 group-hover:border-gray-200 transition-colors duration-150">
                        <TechIcon size={20} className="text-white group-hover:text-black transition-colors duration-150" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover image reveal — pure CSS */}
              <div className="absolute top-2/5 -translate-y-1/2 -right-[15%] h-[120%] w-auto aspect-9/16 z-50 pointer-events-none opacity-0 translate-x-10 scale-90 rotate-6 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:rotate-0 transition-all duration-250 ease-out hidden md:block">
                <Image src={project.image} alt={project.title} fill className="object-contain drop-shadow-2xl" />
              </div>
            </div>
          </div>
        ))}
        <div className="spacer w-[10vw] flex-shrink-0" />
      </div>
    </div>
  );
}