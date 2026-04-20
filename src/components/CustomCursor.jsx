"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const cursor = cursorRef.current; 

    document.documentElement.style.cursor = "none";    
    
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      gsap.to(cursor, { 
        x: e.clientX, 
        y: e.clientY, 
        duration: 0.15, 
        ease: "power2.out" 
      });
    };
    window.addEventListener("mousemove", moveCursor);

    /* Enter state (The "Magnifying Glass" Hover Effect) */
    const enter = () => gsap.to(cursor, {
      scale: 0.4, // Expands to act as a lens
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(34, 211, 238, 0.4)", // Subtle cyan border on hover
      backdropFilter: "blur(4px) brightness(1.1)", // Glass magnification effect
      WebkitBackdropFilter: "blur(4px) brightness(1.1)",
      duration: 0.3, 
      ease: "power3.out",
    });

    /* Leave state (Default small pointer) */
    const leave = () => gsap.to(cursor, {
      scale: 1, // Returns to normal small size
      backgroundColor: "rgba(255, 255, 255, 0.02)",
      borderColor: "rgba(255, 255, 255, 0.2)", // Subtle white border
      backdropFilter: "blur(2px) brightness(1)",
      WebkitBackdropFilter: "blur(2px) brightness(1)",
      duration: 0.3, 
      ease: "power3.out",
    });

    /* Attach to an element */
    const attach = (el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      el.style.cursor = "none";

    };
    const detach = (el) => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.style.cursor = "";
    };

    /* Selector covers ALL interactive elements */
    const SELECTOR = "a, button, input, textarea, select, [role='button'], .interactive-element";

    /* Initial attach */
    const els = Array.from(document.querySelectorAll(SELECTOR));
    els.forEach(attach);

    /* MutationObserver picks up dynamically rendered elements (React hydration) */
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const el = node;
          if (el.matches?.(SELECTOR)) attach(el);
          el.querySelectorAll?.(SELECTOR).forEach(attach);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll(SELECTOR).forEach(detach);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        width: "52px", // Much smaller default radius
        height: "52px",
        borderRadius: "50%",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
        willChange: "transform, width, height",
      }}
    />
  );
}