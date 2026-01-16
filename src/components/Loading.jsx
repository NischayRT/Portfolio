"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
// Make sure this path points to your actual logo
import logo from "../../assets/logo-light.png";

export default function Loading({ onLoadComplete }) {
  const containerRef = useRef(null);
  const topPanelRef = useRef(null);
  const bottomPanelRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Import GSAP dynamically
    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;
      const tl = gsap.timeline();

      // --- ANIMATION SEQUENCE ---

      // 1. Wait for content to load (Increased delay to 2.5s)
      // The logo fades out slightly before the split
      tl.to(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.9,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "+=2.5" // <--- DELAY HERE (2.5 seconds)
      );

      // 2. The Split Action
      tl.add("split"); // Label to sync movements

      // Move Top Panel UP
      tl.to(
        topPanelRef.current,
        {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut", // Sharp, dramatic movement
        },
        "split"
      );

      // Move Bottom Panel DOWN
      tl.to(
        bottomPanelRef.current,
        {
          yPercent: 100,
          duration: 1.2,
          ease: "expo.inOut",
        },
        "split"
      );

      // 3. Cleanup
      // We wait for the animation to finish before unmounting
      tl.call(() => {
        if (onLoadComplete) onLoadComplete();
      });
    });
  }, [onLoadComplete]);

  return (
    // Fixed container covering the whole screen
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
    >
      {/* Top Half - Grey Background */}
      <div
        ref={topPanelRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#7e7d7d] z-10"
      />

      {/* Bottom Half - Grey Background */}
      <div
        ref={bottomPanelRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#7e7d7d] z-10"
      />

      {/* Logo sitting on top of the panels */}
      <div ref={logoRef} className="relative z-20 flex flex-col items-center">
        <Image
          src={logo}
          alt="Logo"
          className="w-auto h-auto max-h-24 md:max-h-32 object-contain"
          priority
        />
      </div>
    </div>
  );
}
