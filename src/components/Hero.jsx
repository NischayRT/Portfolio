"use client";
import React, { useRef, useLayoutEffect, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Github } from "lucide-react";
import profilePic from "../../assets/Profile.webp";
import leetcode from "../../assets/icons/leetcode.png";
import codechef from "../../assets/icons/codechef.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LeetCodeIcon = ({ size, className }) => (
  <Image
    src={leetcode}
    alt="LeetCode"
    width={size}
    height={size}
    className={`${className} icon-logo invert brightness-0`}
  />
);
const CodeChefIcon = ({ size, className }) => (
  <Image
    src={codechef}
    alt="CodeChef"
    width={size}
    height={size}
    className={`${className} icon-logo invert brightness-0`}
  />
);

const SocialPill = React.memo(({ icon: Icon, label, link, color }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group/pill relative flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/10 hover:w-32 hover:bg-[var(--hover-color)] transition-all duration-300 ease-in-out overflow-hidden shadow-lg"
    style={{ "--hover-color": color }}
  >
    <Icon
      size={20}
      className="text-white absolute transition-all duration-300 group-hover/pill:translate-y-3"
    />
    <span className="absolute opacity-0 translate-y-4 text-xs font-bold text-white uppercase tracking-wider transition-all duration-300 group-hover/pill:opacity-100 group-hover/pill:-translate-y-2">
      {label}
    </span>
  </a>
));
SocialPill.displayName = "SocialPill";

export default function Hero() {
  const heroWrapperRef = useRef(null);
  const titleTopRef = useRef(null);
  const titleBottomRef = useRef(null);
  const profileCardRef = useRef(null);
  const [greeting, setGreeting] = useState("");

  const calculateGreeting = useMemo(() => {
    const hour = new Date().getHours();
    return hour < 4
      ? "Hey Noctural"
      : hour < 12
      ? "Good morning"
      : hour < 15
      ? "Good afternoon"
      : "Good evening";
  }, []);

  useEffect(() => {
    setGreeting(calculateGreeting);
  }, [calculateGreeting]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleTopRef.current, titleBottomRef.current], { opacity: 1, y: 0 });
      gsap.set(profileCardRef.current, { opacity: 0, scale: 0.8 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroWrapperRef.current,
          start: "top top",
          end: "80% center",
          scrub: 1.2,
        },
      });

      tl.to(titleTopRef.current, { y: -250, opacity: 0, duration: 1, ease: "power2.in" }, 0)
        .to(titleBottomRef.current, { y: 250, opacity: 0, duration: 1, ease: "power2.in" }, 0)
        .to(profileCardRef.current, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, 0.4);
    }, heroWrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroWrapperRef} className="relative h-[200vh] w-full">
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
          <div ref={titleTopRef} className="absolute top-[20%] md:top-[25%] text-center will-change-transform">
            <p className="text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-orange-300 to-orange-600 text-sm font-bold tracking-[0.3em] italic uppercase mb-4 special-heading animate-pulse">
              {greeting}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-sans font-thin leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-300 opacity-90">
              MY NAME IS
            </h1>
          </div>

          <div ref={titleBottomRef} className="absolute bottom-[40%] md:bottom-[25%] text-center will-change-transform">
            <h1 className="heading text-5xl md:text-7xl lg:text-8xl leading-tight drop-shadow-2xl shiny-silver p-4">
              Nischay Reddy
            </h1>
          </div>

          <div ref={profileCardRef} className="absolute top-1/2 pb-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-4 md:px-16 will-change-transform">
            {/* Optimized Card: Removed 3D Tilt, added simple CSS hover */}
            <div className="bg-white/5 backdrop-blur-md w-full border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start hover:bg-white/10 transition-all duration-300 shadow-2xl hover:scale-[1.01] hover:shadow-blue-500/10">
              <div className="relative flex-shrink-0">
                <Image
                  src={profilePic}
                  alt="Nischay Reddy"
                  priority={true}
                  className="Profile rounded-2xl shadow-2xl ring-2 ring-white/20"
                />
              </div>
              <div className="flex flex-col justify-center w-full">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 drop-shadow-lg">
                  Entry Level Software Engineer
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6 drop-shadow-md">
                  A detail-oriented computer science undergraduate looking for an entry-level Software Engineer position in a fast-growing company to apply my expertise in software applications, development, design, and contribute to innovative projects that make tangible impacts.
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <SocialPill icon={Linkedin} label="LinkedIn" link="https://www.linkedin.com/in/nischayrt/" color="#0077B5" />
                  <SocialPill icon={Github} label="GitHub" link="https://github.com/NischayRT" color="#111111" />
                  <SocialPill icon={LeetCodeIcon} label="LeetCode" link="https://leetcode.com/u/user0322sl/" color="#FFA116" />
                  <SocialPill icon={CodeChefIcon} label="CodeChef" link="https://www.codechef.com/users/nischayreddy" color="#5B4638" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
