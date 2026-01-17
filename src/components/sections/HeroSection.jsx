"use client";
import React, {
  useRef,
  useLayoutEffect,
  useState,
  useMemo,
  useEffect,
} from "react";
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
  const heroWrapperRef = useRef(null);
  const titleTopRef = useRef(null);
  const titleBottomRef = useRef(null);
  const profileCardRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleTopRef.current, titleBottomRef.current], {
        opacity: 1,
        y: 0,
      });
      gsap.set(profileCardRef.current, { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroWrapperRef.current,
          start: "top top",
          end: "60% center", // Reduced from 80% - finishes animation faster
          scrub: 0.3, // Reduced from 0.8 - much snappier response
        },
      });

      tl.to(
        titleTopRef.current,
        { y: -250, opacity: 0, duration: 0.5, ease: "power2.in" }, // Reduced from 1
        0
      )
        .to(
          titleBottomRef.current,
          { y: 250, opacity: 0, duration: 0.5, ease: "power2.in" }, // Reduced from 1
          0
        )
        .to(
          profileCardRef.current,
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, // Reduced from 1.5
          0.2 // Reduced from 0.4
        );
    }, heroWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroWrapperRef} className="relative h-[200vh] w-full " id="hero">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="blob n-left-vertical" />
          <div className="blob n-right-vertical" />
          <div className="blob n-diagonal-dark" />
          <div className="blob n-ambient" />
          <div className="overlay-blend" />
          <div className="noise-layer opacity-40" />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 md:px-16">
          <div
            ref={titleTopRef}
            className="absolute top-[20%] md:top-[25%] text-center will-change-transform"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-thin leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-300 opacity-90">
              MY NAME IS
            </h1>
          </div>

          <div
            ref={titleBottomRef}
            className="absolute bottom-[40%] md:bottom-[25%] text-center will-change-transform"
          >
            <h1 className="heading text-5xl md:text-7xl lg:text-8xl leading-tight drop-shadow-2xl shiny-silver p-4">
              Nischay Reddy
            </h1>
          </div>

          <div
            ref={profileCardRef}
            className="absolute top-3/5 pb-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-3 md:px-16 will-change-transform"
          >
            <div className="bg-white/5 backdrop-blur-md w-full border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-3 md:gap-8 items-center md:items-start hover:bg-white/10 transition-colors duration-300 shadow-2xl">
              <div className="relative flex-shrink-0">
                <Image
                  src={profilePic}
                  alt="Nischay Reddy"
                  priority={true}
                  className="Profile rounded-2xl shadow-2xl ring-2 ring-white/20"
                />
              </div>
              <div className="flex flex-col justify-center w-full">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">
                  Entry Level Software Engineer
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-3 md:mb-6">
                  A detail-oriented computer science undergraduate looking for
                  an entry-level Software Engineer position in a fast-growing
                  company to apply my expertise in software applications,
                  development, design, and contribute to innovative projects
                  that make tangible impacts.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <SocialPill
                    icon={Linkedin}
                    label="LinkedIn"
                    link="https://www.linkedin.com/in/nischayrt/"
                    color="#0077B5"
                  />
                  <SocialPill
                    icon={Github}
                    label="GitHub"
                    link="https://github.com/NischayRT"
                    color="#111111"
                  />
                  <SocialPill
                    icon={LeetCodeIcon}
                    label="LeetCode"
                    link="https://leetcode.com/u/user0322sl/"
                    color="#FFA116"
                  />
                  <SocialPill
                    icon={CodeChefIcon}
                    label="CodeChef"
                    link="https://www.codechef.com/users/nischayreddy"
                    color="#5B4638"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
