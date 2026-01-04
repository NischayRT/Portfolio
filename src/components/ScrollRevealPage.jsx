"use client";
import "../app/MeshGradient.css";
import "../app/globals.css";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import profilePic from "../../assets/Profile.webp";
// Importing icons
import { Github, Linkedin } from "lucide-react";
import leetcode from "../../assets/icons/leetcode.png";
import codechef from "../../assets/icons/codechef.png";

// --- Wrapper Components (Keep these as is) ---
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

const SocialPill = ({ icon: Icon, label, link, color }) => {
  return (
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
  );
};

export default function ScrollRevealPage() {
  // We use Refs for elements we want to animate to avoid re-renders
  const topDoorRef = useRef(null);
  const bottomDoorRef = useRef(null);
  const contentRef = useRef(null);

  // We store the math values in a ref so they persist without triggering renders
  const scrollData = useRef({
    current: 0, // The smoothed value (where the animation is now)
    target: 0, // The actual scroll value (where the user scrolled to)
  });

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // 1. Set Greeting (One time setup)
    const hour = new Date().getHours();
    setGreeting(
      hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"
    );

    // 2. The Animation Loop
    let requestID;

    const animate = () => {
      // Calculate how far down the page we are (0 to 1)
      const viewportHeight = window.innerHeight;
      const rawProgress = window.scrollY / viewportHeight;

      // Clamp target between 0 and 1
      scrollData.current.target = Math.max(0, Math.min(rawProgress, 1));

      // --- LERP (Linear Interpolation) for Smoothness ---
      // "0.08" is the speed/friction.
      // Lower (0.05) = Heavier/Slower lag. Higher (0.15) = Snappier/Faster.
      scrollData.current.current +=
        (scrollData.current.target - scrollData.current.current) * 0.08;

      const p = scrollData.current.current; // The smoothed progress

      // --- CALCULATE ANIMATION VALUES ---
      const splitDistance = p * 55; // Move doors 55vh apart
      const contentScale = 0.9 + p * 0.1; // Scale from 0.9 to 1.0
      const contentOpacity = Math.max(0, (p - 0.2) * 2); // Fade in
      const contentY = (1 - p) * 100; // Move content up slightly as it reveals

      // --- APPLY STYLES DIRECTLY (Performant) ---

      // Top Door
      if (topDoorRef.current) {
        topDoorRef.current.style.transform = `translate3d(0, -${splitDistance}vh, 0)`;
      }

      // Bottom Door
      if (bottomDoorRef.current) {
        bottomDoorRef.current.style.transform = `translate3d(0, ${splitDistance}vh, 0)`;
      }

      // Content Card
      if (contentRef.current) {
        contentRef.current.style.opacity = contentOpacity;
        contentRef.current.style.transform = `scale(${contentScale}) translate3d(0, ${contentY}px, 0)`;
      }

      // Keep looping
      requestID = requestAnimationFrame(animate);
    };

    // Start the loop
    animate();

    return () => {
      if (requestID) cancelAnimationFrame(requestID);
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
      {/* TOP HALF (DOOR) */}
      <div
        ref={topDoorRef}
        className="fixed top-0 left-0 w-full z-40 overflow-hidden will-change-transform" // Added will-change-transform
        style={{
          height: "46vh",
          marginTop: "5vh",
          // Initial State
          transform: "translate3d(0, 0, 0)",
        }}
      >
        <div className="absolute inset-0 flex items-end justify-center px-4 md:px-16 pb-0">
          <div className="home-1 home flex flex-col items-center justify-end pb-2 relative overflow-hidden w-full max-w-7xl">
            <div className="absolute bottom-0 w-[60%] h-75 bg-blue-500/20 blur-[100px] rounded-full" />
            <div className="relative z-10 text-center mb-2">
              <p className="text-blue-200/70 text-sm font-bold tracking-[0.3em] uppercase mb-4 min-h-5 animate-pulse">
                {greeting}
              </p>
              <h1 className="text-5xl md:text-7xl font-sans font-thin leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-blue-300 opacity-90">
                MY NAME IS
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM HALF (DOOR) */}
      <div
        ref={bottomDoorRef}
        className="fixed bottom-0 left-0 w-full z-40 overflow-hidden will-change-transform" // Added will-change-transform
        style={{
          height: "45vh",
          marginBottom: "5vh",
          paddingBottom: "10px",
          // Initial State
          transform: "translate3d(0, 0, 0)",
        }}
      >
        <div className="absolute inset-0 flex items-start justify-center px-4 md:px-16 pt-0">
          <div className="home home-2 flex flex-col items-center justify-start pt-2 relative overflow-hidden w-full max-w-7xl">
            <div className="absolute top-0 w-[60%] h-75 bg-indigo-500/20 blur-[100px] rounded-full" />
            <div className="relative z-10 text-center">
              <h1 className="heading text-7xl md:text-8xl mt-0 leading-tight drop-shadow-2xl pt-2 pb-6 shiny-silver">
                Nischay Reddy
              </h1>

              <div className="mt-4 flex justify-center gap-4 opacity-60">
                <span className="h-px w-12 bg-white/50 self-center"></span>
                <span className="text-xs font-mono text-white/80">
                  SCROLL TO EXPLORE
                </span>
                <span className="h-px w-12 bg-white/50 self-center"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 h-[120vh] w-full z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <div className="blob n-left-vertical" />
          <div className="blob n-right-vertical" />
          <div className="blob n-diagonal-dark" />
          <div className="blob n-ambient" />
          <div className="overlay-blend" />
          <div className="noise-layer opacity-40" />
        </div>
        <div
          ref={contentRef}
          className="relative z-20 flex items-center justify-center h-full pointer-events-auto flex-col pb-40 px-4 md:px-16 will-change-transform" // Added will-change-transform
          style={{
            opacity: 0,
            transform: "scale(0.9) translate3d(0, 100px, 0)",
          }}
        >
          <div className="w-full flex justify-center mt-12 md:mt-0">
            <div className="md:col-span-8 bg-white/5 backdrop-blur-md w-full max-w-7xl border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start group hover:bg-white/10 transition-colors duration-500">
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <Image
                  src={profilePic}
                  alt="Nischay Reddy"
                  priority={true}
                  className="relative object-cover Profile rounded-2xl shadow-2xl ring-2 ring-white/20"
                />
              </div>

              <div className="flex flex-col justify-center h-full w-full">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Entry Level Software Engineer
                </h3>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
                  A detail-oriented computer science undergraduate looking for
                  an entry-level Software Engineer position in a fast-growing
                  company to apply my expertise in software applications,
                  development, design, and contribute to innovative projects
                  that make tangible impacts.
                </p>

                <div className="group flex flex-wrap gap-3 mt-auto justify-center md:justify-start">
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

      <div className="h-[200vh]"></div>

      <div className="relative z-40 bg-white min-h-screen flex items-center justify-center">
        <div className="text-center px-8">
          <h3 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Continue Your Journey
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Content continues here...
          </p>
        </div>
      </div>
    </div>
  );
}
