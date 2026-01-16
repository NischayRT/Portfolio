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
  const projectsWrapperRef = useRef(null);
  const projectsContainerRef = useRef(null);
  const projectsTitleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = projectsWrapperRef.current;
      const container = projectsContainerRef.current;
      const title = projectsTitleRef.current;
      const cards = gsap.utils
        .toArray(container.children)
        .filter((child) => !child.classList.contains("w-[10vw]"));

      const getScrollAmount = () =>
        -(container.scrollWidth - window.innerWidth);

      gsap.set(title, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 1.5,
        opacity: 1,
        zIndex: 50,
      });

      gsap.set(cards, { opacity: 0, y: 50 });

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
        },
        (context) => {
          const { isMobile } = context.conditions;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: () =>
                `+=${Math.abs(getScrollAmount()) + window.innerHeight}`,
              pin: true,
              scrub: 0.2,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          tl.to(title, {
            top: isMobile ? "calc(10% - 20px)" : "2rem",
            left: isMobile ? "50%" : "2rem",
            xPercent: isMobile ? -50 : 0,
            yPercent: 0,
            scale: 1,
            duration: 0.15,
            ease: "power1.out",
          })
            .to(
              cards,
              {
                opacity: 1,
                y: 0,
                duration: 0.15,
                stagger: 0.02,
                ease: "power1.out",
              },
              "-=0.1"
            )
            .to(container, {
              x: getScrollAmount,
              duration: 2,
              ease: "none",
            });
        }
      );
    }, projectsWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={projectsWrapperRef}
      className="h-screen overflow-hidden flex flex-col justify-center relative"
    >
      <h2
        ref={projectsTitleRef}
        className="absolute text-3xl md:text-4xl text-white opacity-0 drop-shadow-xl shiny-silver whitespace-nowrap z-50 pointer-events-none"
      >
        <div>Featured</div> <div>Projects</div>
      </h2>
      <div
        ref={projectsContainerRef}
        className="h-full flex flex-nowrap items-center pl-[5vw] md:pl-[10vw] pr-[20vw]"
        style={{ width: "fit-content" }}
      >
        {PROJECTS_DATA.map((project, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-[90vw] md:w-[50vw] h-[60vh] mr-8 md:mr-16"
          >
            {/* CHANGES MADE HERE:
              1. Removed 'overflow-hidden'
              2. Added 'group-hover:z-[100]' so the active card sits on top of neighbors
            */}
            <div className="group w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 md:pt-4 flex flex-col justify-between shadow-2xl transition-all duration-200 hover:bg-white hover:text-black relative group-hover:z-[100]">
              <div className="flex flex-col h-full z-10 relative pointer-events-none group-hover:pointer-events-auto">
                <div className="flex items-center justify-between mb-2">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-2 items-center cursor-pointer z-50 pointer-events-auto hover:opacity-70 transition-opacity duration-150"
                  >
                    <ExternalLink
                      size={20}
                      className="text-blue-400 group-hover:text-blue-600 transition-colors duration-150"
                    />
                  </a>
                </div>
                <h3 className="text-2xl md:text-5xl font-bold text-white mb-2 group-hover:text-black transition-colors duration-150 leading-tight">
                  {project.title}
                </h3>
                <p className="text-base md:text-lg text-blue-300 font-medium mb-4 md:mb-6 group-hover:text-blue-600 transition-colors duration-150">
                  {project.subtitle}
                </p>
                <div className="mt-auto">
                  <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-light mb-6 md:mb-8 group-hover:text-gray-700 transition-colors duration-150 line-clamp-3 md:line-clamp-2 w-[100%]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.tech.map((TechIcon, i) => (
                      <div
                        key={i}
                        className="p-2 md:p-3 rounded-xl bg-white/10 border border-white/10 group-hover:bg-gray-100 group-hover:border-gray-200 transition-colors duration-150"
                      >
                        <TechIcon
                          size={20}
                          className="text-white group-hover:text-black transition-colors duration-150"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Container - This will now be visible outside the card */}
              <div className="absolute top-2/5 -translate-y-1/2 -right-[15%] h-[120%] w-auto aspect-9/16 z-50 pointer-events-none opacity-0 translate-x-10 scale-90 rotate-6 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-hover:rotate-0 transition-all duration-250 ease-out hidden md:block">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        ))}
        <div className="w-[10vw]"></div>
      </div>
    </div>
  );
}
