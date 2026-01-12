"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
// import Link from "next/link"; // We will use standard <a> for smoother hash scrolling with GSAP
import logoDark from "../../assets/logo-dark.png";

export default function Header() {
  const [scrollStage, setScrollStage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // --- 1. DESIGN STAGES (Morphing) ---
      if (currentScrollY > 800) {
        setScrollStage(2);
      } else if (currentScrollY > 100) {
        setScrollStage(1);
      } else {
        setScrollStage(0);
      }

      // --- 2. VISIBILITY (Smart Hide) ---
      const HIDE_THRESHOLD = 2000;

      if (currentScrollY > HIDE_THRESHOLD) {
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false); // Scrolling DOWN -> Hide
        } else {
          setIsVisible(true); // Scrolling UP -> Show
        }
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- MANUAL SCROLL HANDLER ---
  const handleContactClick = (e) => {
    e.preventDefault(); // Prevent default instant jump
    const contactSection = document.getElementById("contact");

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div
      className={`
        flex justify-center w-full fixed top-0 z-50 pointer-events-none transition-transform duration-500
        ${isVisible ? "translate-y-0" : "-translate-y-[200%]"}
      `}
    >
      <header
        className={`
          flex items-center shadow-lg
          transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
          pointer-events-auto overflow-hidden border
          ${
            scrollStage === 2
              ? " w-[80%] md:w-[60%] justify-between bg-black/40 backdrop-blur-md border-white/10 rounded-full py-2 px-6 mt-1 md:mt-4 text-white"
              : "justify-center bg-[#ffc8dd]/80 backdrop-blur-md border-white/20 text-black"
          }
          ${
            scrollStage === 1
              ? "w-[120px] rounded-2xl py-3 pt-3 px-6 mt-1 md:mt-4"
              : ""
          }
          ${
            scrollStage === 0
              ? "w-[150px] rounded-2xl py-3 pt-6 px-4 mt-[-1rem]"
              : ""
          }
        `}
      >
        {/* Logo Section */}
        <div className="flex-shrink-0 relative z-10">
          <Image
            src={logoDark}
            alt="Logo"
            className={`
              h-auto w-auto transition-all duration-500
              ${
                scrollStage === 2
                  ? "max-h-10 invert brightness-200"
                  : "max-h-14"
              } 
            `}
            priority
          />
        </div>

        {/* Contact Button */}
        <div
          className={`
            transition-all duration-700 ease-in-out overflow-hidden
            ${
              scrollStage === 2
                ? "max-w-[200px] opacity-100 ml-4"
                : "max-w-0 opacity-0"
            }
          `}
        >
          {/* Changed Link to <a> with onClick handler */}
          <a
            href="#contact"
            onClick={handleContactClick}
            className="cursor-pointer whitespace-nowrap font-medium text-sm hover:text-gray-300 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </header>
    </div>
  );
}
