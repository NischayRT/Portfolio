"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const LINES = [
  { prefix: "$ ",  text: 'init portfolio --name="Nischay Reddy"', delay: 0 },
  { prefix: "✓ ", text: "loading experience...",                  delay: 0.55 },
  { prefix: "✓ ", text: "compiling projects...",                  delay: 1.0  },
  { prefix: "✓ ", text: "mounting skills...",                     delay: 1.4  },
  { prefix: "✓ ", text: "ready.",                                 delay: 1.75, highlight: true },
];

function TypedLine({ prefix, text, highlight, startDelay, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const outer = setTimeout(() => {
      setActive(true);
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(iv);
          onDone?.();
        }
      }, 26);
      return () => clearInterval(iv);
    }, startDelay * 1000);
    return () => clearTimeout(outer);
  }, [text, startDelay, onDone]);

  if (!active) return null;

  const done = displayed.length >= text.length;
  return (
    <div className={`flex items-start gap-2 font-mono leading-relaxed text-sm md:text-[15px] ${highlight ? "text-emerald-400" : "text-gray-300"}`}>
      <span className={`flex-shrink-0 ${highlight ? "text-emerald-400" : "text-blue-400"}`}>{prefix}</span>
      <span>{displayed}</span>
      {!done && <span className="inline-block w-[2px] h-[1.1em] bg-blue-400 animate-pulse ml-px translate-y-[1px]" />}
    </div>
  );
}

export default function Loading({ onLoadComplete }) {
  const overlayRef = useRef(null);
  const cardRef   = useRef(null);
  const [doneCount, setDoneCount] = useState(0);
  const inc = useCallback(() => setDoneCount(c => c + 1), []);
  const allDone = doneCount >= LINES.length;

  useEffect(() => {
    if (!allDone) return;
    const tl = gsap.timeline({ delay: 0.45 });
    tl.to(cardRef.current, { y: -8, duration: 0.25, ease: "power2.out" })
      .to(overlayRef.current, {
        opacity: 0,
        duration: 0.65,
        ease: "power2.inOut",
        onComplete: () => onLoadComplete?.(),
      }, "+=0.05");
    return () => tl.kill();
  }, [allDone, onLoadComplete]);

  const pct = (doneCount / LINES.length) * 100;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "#06060a" }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 55% 40% at 50% 52%, rgba(59,130,246,0.07) 0%, transparent 70%)",
      }} />

      {/* Terminal card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-[480px] mx-4"
        style={{
          background: "rgba(10,10,15,0.97)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "14px",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.025), 0 40px 80px rgba(0,0,0,0.7), 0 0 100px rgba(59,130,246,0.05)",
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-[7px] px-4 py-[10px]" style={{
          borderBottom: "1px solid rgba(255,255,255,0.055)",
          background: "rgba(255,255,255,0.018)",
        }}>
          <span className="w-[11px] h-[11px] rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-[11px] h-[11px] rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-[11px] h-[11px] rounded-full" style={{ background: "#28c840" }} />
          <span className="ml-3 text-[11px] font-mono text-gray-600 select-none tracking-wide">
            portfolio — zsh — 80×24
          </span>
        </div>

        {/* Lines */}
        <div className="px-5 py-5 space-y-[10px] min-h-[148px]">
          {LINES.map((line, i) => (
            <TypedLine
              key={i}
              prefix={line.prefix}
              text={line.text}
              highlight={line.highlight}
              startDelay={line.delay}
              onDone={inc}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{ height: "2px", background: "rgba(255,255,255,0.035)" }}>
          <div style={{
            height: "100%",
            width: `${pct}%`,
            background: "linear-gradient(90deg, #3b82f6, #6366f1)",
            boxShadow: "0 0 10px rgba(99,102,241,0.7)",
            transition: "width 350ms linear",
          }} />
        </div>
      </div>

      {/* Footer label */}
      <p className="absolute bottom-6 text-[11px] font-mono text-gray-700 tracking-[0.2em] select-none">
        v2.0.0 · nischayreddy.dev
      </p>
    </div>
  );
}