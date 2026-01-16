"use client";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { EXPERIENCE_DATA } from "../constants/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ExperienceSection() {
  const experienceWrapperRef = useRef(null);
  const experienceContainerRef = useRef(null);
  const experienceTitleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = experienceWrapperRef.current;
      const container = experienceContainerRef.current;
      const title = experienceTitleRef.current;
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
              scrub: 0.2, // Reduced from 0.5 - ultra responsive
              invalidateOnRefresh: true,
              anticipatePin: 1, // Helps with smoother pinning
            },
          });

          tl.to(title, {
            top: isMobile ? "calc(10% - 20px)" : "2rem",
            left: isMobile ? "50%" : "2rem",
            xPercent: isMobile ? -50 : 0,
            yPercent: 0,
            scale: 1,
            duration: 0.15, // Reduced from 0.3 - instant feel
            ease: "power1.out", // Lighter easing for faster feel
          })
            .to(
              cards,
              {
                opacity: 1,
                y: 0,
                duration: 0.15, // Reduced from 0.3
                stagger: 0.02, // Reduced from 0.05 - nearly simultaneous
                ease: "power1.out",
              },
              "-=0.1" // More overlap
            )
            .to(container, {
              x: getScrollAmount,
              duration: 2, // Reduced from 3 - faster horizontal scroll
              ease: "none",
            });
        }
      );
    }, experienceWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={experienceWrapperRef}
      className="h-screen overflow-hidden flex flex-col justify-center relative"
    >
      <h2
        ref={experienceTitleRef}
        className="absolute text-3xl md:text-4xl text-white opacity-0 drop-shadow-xl shiny-silver whitespace-nowrap z-50 pointer-events-none"
      >
        <div>My </div>
        <div>Experience</div>
      </h2>
      <div
        ref={experienceContainerRef}
        className="h-full flex flex-nowrap items-center pl-[5vw] md:pl-[10vw] pr-[20vw]"
        style={{ width: "fit-content" }}
      >
        {EXPERIENCE_DATA.map((exp, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-[90vw] md:w-[60vw] lg:w-[45vw] h-[65vh] mr-8 md:mr-24"
          >
            <div className="w-full h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 flex flex-col shadow-2xl transition-transform duration-150 hover:scale-[1.02] group overflow-hidden">
              <div className="flex-shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10 z-10 bg-transparent">
                <div>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                    {exp.company}
                  </h3>
                  <p className="text-lg md:text-xl text-blue-300 font-medium flex items-center gap-2">
                    <Briefcase size={18} /> {exp.role}
                  </p>
                </div>
                <div className="flex flex-col items-start md:items-end gap-1 text-gray-400 text-sm font-mono w-auto">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} />{" "}
                    <span dangerouslySetInnerHTML={{ __html: exp.date }} />
                  </span>
                  <span className="flex items-center gap-2 w-full">
                    <MapPin size={14} /> {exp.location}
                  </span>
                </div>
              </div>
              <div className="flex-grow overflow-y-auto custom-scrollbar pr-2 relative z-10">
                <ul className="space-y-4 pb-12">
                  {exp.description.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-300 leading-relaxed font-light text-sm md:text-base"
                    >
                      <span className="mt-2 min-w-[6px] min-h-[6px] rounded-full bg-blue-500/80 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute bottom-4 right-6 text-8xl md:text-9xl font-bold text-white/5 select-none pointer-events-none font-serif z-0">
                0{index + 1}
              </div>
            </div>
          </div>
        ))}
        <div className="w-[10vw]"></div>
      </div>
    </div>
  );
}
