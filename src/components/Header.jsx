"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo-dark.png";

/*
  HEADER BEHAVIOUR
  ─────────────────
  • During the hero section (scrollY < SECTION_START) → hidden, translated off-screen upward.
  • Once the black "main content" section begins (scrollY >= SECTION_START) → slides down as a
    compact pill. No morphing stages needed — one clean state transition.
  • Smart hide: hides when scrolling down past HIDE_AFTER, reappears on scroll-up.
  • "Contact Me" is always visible inside the pill (no hidden/reveal needed with one state).
*/

const SECTION_START = 620;  // px — approx where the black section begins (after hero profile card)
const HIDE_AFTER    = 1800; // px — start smart-hide beyond this point

export default function Header() {
  const [visible,   setVisible]   = useState(false); // pill visible at all?
  const [smartHide, setSmartHide] = useState(false); // translate up when scrolling fast down
  const lastScrollY = useRef(0);
  const ticking     = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const y     = window.scrollY;
        const delta = y - lastScrollY.current;

        // Show pill once we enter the main section
        setVisible(y >= SECTION_START);

        // Smart hide only deep in the page
        if (y > HIDE_AFTER) {
          if (delta >  6) setSmartHide(true);
          if (delta < -6) setSmartHide(false);
        } else {
          setSmartHide(false);
        }

        lastScrollY.current = y;
        ticking.current     = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Combined visibility: shown only when section started AND not smart-hidden
  const shown = visible && !smartHide;

  return (
    /*
      Outer wrapper: full-width centering container, fixed at top, pointer-events
      disabled so it never blocks scroll on the hero when hidden.
    */
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <header
        style={{
          /*
            Single CSS transition for appear/disappear.
            translateY(-110%) fully hides the pill above the viewport.
            opacity fades it in/out simultaneously for a polished feel.
          */
          transform:  shown ? "translateY(0)"    : "translateY(-110%)",
          opacity:    shown ? 1                  : 0,
          transition: "transform 380ms cubic-bezier(0.34,1.56,0.64,1), opacity 300ms ease",

          /* Pill geometry */
          marginTop: "14px",
          padding:   "8px 20px 8px 14px",
          borderRadius: "100px",

          /* Glass style — one layer only, no stacked blur */
          background: "rgba(8,8,12,0.82)",
          border:     "1px solid rgba(255,255,255,0.09)",
          boxShadow:  "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
        className="pointer-events-auto flex items-center gap-5"
      >
        {/* Logo */}
        <Link href="#hero" onClick={scrollTo("hero")} className="flex items-center">
          <Image
            src={logo}
            alt="Logo"
            priority
            className="h-auto w-auto max-h-8 invert brightness-200"
          />
        </Link>

        {/* Divider */}
        <span className="w-px h-4 bg-white/10 flex-shrink-0" />

        {/* Nav links */}
        <nav className="flex items-center gap-5">
          {[
            { label: "Skills",      id: "skills"      },
            { label: "Experience",  id: "experience"  },
            { label: "Projects",    id: "projects"    },
          ].map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={scrollTo(id)}
              className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <span className="w-px h-4 bg-white/10 flex-shrink-0" />

        {/* CTA */}
        <a
          href="#contact"
          onClick={scrollTo("contact")}
          className="text-[13px] font-semibold text-white cursor-pointer whitespace-nowrap px-3 py-1 rounded-full transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(99,102,241,0.25))",
            border: "1px solid rgba(99,102,241,0.35)",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(135deg, rgba(59,130,246,0.45), rgba(99,102,241,0.45))"}
          onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(99,102,241,0.25))"}
        >
          Contact Me
        </a>
      </header>
    </div>
  );
}