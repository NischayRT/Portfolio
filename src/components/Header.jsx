"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo-dark.png";

export default function Header() {
  const [scrollStage, setScrollStage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // --- DESIGN STAGES (Morphing) ---
          // Stage 0: Initial Pill
          // Stage 1: Shrinks slightly on scroll
          // Stage 2: Expands to full bar with "Contact Me"
          if (currentScrollY > 600) {
            setScrollStage(2);
          } else if (currentScrollY > 80) {
            setScrollStage(1);
          } else {
            setScrollStage(0);
          }

          // --- VISIBILITY (Smart Hide) ---
          const HIDE_THRESHOLD = 1800;
          const scrollDelta = currentScrollY - lastScrollY.current;

          if (currentScrollY > HIDE_THRESHOLD) {
            // Only hide if scrolling down significantly
            if (scrollDelta > 5) {
              setIsVisible(false);
            } else if (scrollDelta < -5) {
              setIsVisible(true);
            }
          } else {
            setIsVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e) => {
    e.preventDefault();
    const heroSection = document.getElementById("hero");

    if (heroSection) {
      heroSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
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
        flex justify-center w-full fixed top-0 z-50 pointer-events-none
        transition-transform duration-300 ease-out
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <header
        className={`
          flex items-center shadow-lg pointer-events-auto overflow-hidden border
          transition-all duration-500 ease-out
          ${
            scrollStage === 2
              ? "w-[90%] md:w-[60%] justify-between bg-black/40 backdrop-blur-md border-white/10 rounded-full py-2 px-6 mt-4 text-white"
              : "justify-center bg-[#ffc8dd]/80 backdrop-blur-md border-white/20 text-black"
          }
          ${
            scrollStage === 1
              ? "w-[120px] rounded-2xl py-3 px-6 mt-[-1rem]"
              : ""
          }
          ${scrollStage === 0 ? "w-[150px] rounded-2xl py-4 px-4 mt-1" : ""}
        `}
      >
        <div className="flex-shrink-0 relative z-10 transition-transform duration-500">
          <Link href="#hero" onClick={handleLogoClick}>
            <Image
              src={logo}
              alt="Logo"
              priority
              className={`
                h-auto w-auto transition-all duration-500
                ${
                  scrollStage === 2
                    ? "max-h-10 invert brightness-200"
                    : "max-h-14"
                }
              `}
            />
          </Link>
        </div>

        {/* Contact Button */}
        <div
          className={`
            transition-all duration-500 ease-out overflow-hidden
            ${
              scrollStage === 2
                ? "max-w-[200px] opacity-100 ml-4"
                : "max-w-0 opacity-0 ml-0"
            }
          `}
        >
          <a
            href="#contact"
            onClick={handleContactClick}
            className="cursor-pointer whitespace-nowrap font-medium text-sm hover:text-gray-300 transition-colors duration-200"
          >
            Contact Me
          </a>
        </div>
      </header>
    </div>
  );
}
