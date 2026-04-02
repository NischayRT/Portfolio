"use client";
import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Github } from "lucide-react";
import profilePic from "../../../assets/Profile.webp";
import SocialPill from "../shared/SocialPill";
import { LeetCodeIcon, CodeChefIcon } from "../shared/IconComponents";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const heroWrapperRef  = useRef(null);
  const titleTopRef     = useRef(null);
  const titleBottomRef  = useRef(null);
  const profileCardRef  = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleTopRef.current, titleBottomRef.current], { opacity: 1, y: 0 });
      gsap.set(profileCardRef.current, { opacity: 0, scale: 0.94, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroWrapperRef.current,
          start: "top top",
          /*
            REFINED: end at "85% top" (was "60% center").
            The longer range gives the animation room to breathe —
            each stage completes well before ScrollTrigger hands off
            to the first pinned section, eliminating the fight
            between overlapping scroll triggers.
          */
          end: "85% top",
          /*
            scrub: 0.8 — smooth but still feels connected to scroll.
            Lower values (0.2-0.3) fire too many intermediate updates;
            higher (1.5+) feel disconnected/laggy on fast scroll.
          */
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      /*
        REFINED SEQUENCING
        Phase 1 (progress 0 → 0.45): titles exit — staggered so top exits
          slightly before bottom, more cinematic than simultaneous.
        Phase 2 (progress 0.3 → 1.0): profile card enters — overlaps with
          title exit for a cross-dissolve feel rather than sequential pop.
        The y offset on the card (20→0) adds weight to the reveal.
      */
      tl.to(titleTopRef.current,    { y: -180, opacity: 0, duration: 0.45, ease: "power3.in"  }, 0)
        .to(titleBottomRef.current, { y:  180, opacity: 0, duration: 0.45, ease: "power3.in"  }, 0.04)
        .to(profileCardRef.current, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            onComplete: () => {
              // Free compositor layers once settled
              gsap.set(profileCardRef.current, { willChange: "auto" });
            },
          },
          0.28
        );
    }, heroWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroWrapperRef} className="relative h-[200vh] w-full" id="hero">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0">

        {/* Animated background blobs */}
        <div className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <div className="blob n-left-vertical" />
          <div className="blob n-right-vertical" />
          <div className="blob n-diagonal-dark" />
          <div className="blob n-ambient" />
          <div className="overlay-blend" />
          <div className="noise-layer opacity-40" />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 md:px-16">

          {/* Top title */}
          <div
            ref={titleTopRef}
            className="absolute top-[20%] md:top-[25%] text-center"
            style={{ willChange: "transform, opacity" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-thin leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-300 opacity-90">
              MY NAME IS
            </h1>
          </div>

          {/* Bottom title */}
          <div
            ref={titleBottomRef}
            className="absolute bottom-[40%] md:bottom-[25%] text-center"
            style={{ willChange: "transform, opacity" }}
          >
            <h1 className="heading text-5xl md:text-7xl lg:text-8xl leading-tight drop-shadow-2xl shiny-silver p-4">
              Nischay Reddy
            </h1>
          </div>

          {/* Profile card — revealed on scroll */}
          <div
            ref={profileCardRef}
            className="absolute max-sm:top-1/10 max-md:top-1/5 screen-[767px]:top-1/3 pb-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-3 md:px-16"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="bg-white/[0.05] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-3 md:gap-8 items-center md:items-start shadow-2xl transition-colors duration-300 hover:bg-white/[0.08]">
              <div className="relative flex-shrink-0">
                <Image
                  src={profilePic}
                  alt="Nischay Reddy"
                  priority
                  className="Profile rounded-2xl shadow-2xl ring-2 ring-white/20"
                />
              </div>
              <div className="flex flex-col justify-center w-full">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">
                  Entry Level Software Engineer
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3 md:mb-6">
                  A detail-oriented computer science undergraduate looking for an entry-level Software
                  Engineer position in a fast-growing company to apply my expertise in software
                  applications, development, design, and contribute to innovative projects that make
                  tangible impacts.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <SocialPill icon={Linkedin}     label="LinkedIn" link="https://www.linkedin.com/in/nischayrt/"               color="#0077B5" />
                  <SocialPill icon={Github}       label="GitHub"   link="https://github.com/NischayRT"                          color="#111111" />
                  <SocialPill icon={LeetCodeIcon} label="LeetCode" link="https://leetcode.com/u/user0322sl/"                   color="#FFA116" />
                  <SocialPill icon={CodeChefIcon} label="CodeChef" link="https://www.codechef.com/users/nischayreddy"           color="#5B4638" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}