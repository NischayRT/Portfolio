"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE_DATA } from "../constants/data";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const stripHtml = (s) => s.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();

export default function ExperienceSection() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ex-heading", { y: 50, opacity: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" } });
      gsap.utils.toArray(".ex-row").forEach(row => {
        gsap.from(row, { x: -30, opacity: 0, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none none" } });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const S = {
    section: { minHeight: "100dvh", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "5rem 0", position: "relative", zIndex: 10 },
    wrap: { maxWidth: "1280px", margin: "0 5%", padding: "0 1.5rem" },
  };

  return (
    <section ref={ref} id="experience" style={S.section}>
      <div style={S.wrap}>

        <h2 className="ex-heading" style={{ fontFamily: "var(--font-sans-stack)", fontWeight: 900,
          letterSpacing: "-0.04em", color: "#fff", marginBottom: "2.5rem",
          fontSize: "clamp(2rem,6vw,4rem)" }}>
          My{" "}<span className="font-serif font-normal italic text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]">Experiences</span>
        </h2>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {EXPERIENCE_DATA.map((exp, i) => (
            <div key={i} className="ex-row"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "1.75rem 0",
                cursor: "default" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.012)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between",
                alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>

                <div style={{ display: "flex", gap: "1.25rem", alignItems: "flex-start", flex: 1, minWidth: 0 }}>
                  {/* Index */}
                  <span style={{ fontFamily: "var(--font-sans-stack)", fontSize: "11px", fontWeight: 700,
                    letterSpacing: "0.1em", color: "#22d3ee", flexShrink: 0, paddingTop: "6px" }}>
                    0{i+1}
                  </span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-sans-stack)", fontWeight: 900,
                      letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.05,
                      fontSize: "clamp(1.5rem,4vw,3rem)", wordBreak: "break-word", marginBottom: "4px" }}>
                      {exp.company}
                    </div>
                    <div style={{ fontFamily: "var(--font-serif-stack)", fontStyle: "italic",
                      color: "rgba(255,255,255,0.6)", fontSize: "clamp(0.85rem,1.8vw,1.1rem)" }}>
                      {exp.role}
                    </div>
                  </div>
                </div>

                {/* Date + location */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontFamily: "var(--font-sans-stack)", fontSize: "10px",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)", marginBottom: "2px" }}>
                    {stripHtml(exp.date)}
                  </div>
                  <div style={{ fontFamily: "var(--font-sans-stack)", fontSize: "10px",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.45)" }}>
                    {exp.location}
                  </div>
                </div>
              </div>

              {/* Bullets — always visible on mobile, hover-expand on desktop via group */}
              <div style={{ paddingLeft: "2.5rem", marginTop: "1rem" }}>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {exp.description.map((pt, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px",
                      fontFamily: "var(--font-sans-stack)", fontSize: "clamp(0.78rem,1.3vw,0.88rem)",
                      color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                      <span style={{ flexShrink: 0, width: "4px", height: "4px", borderRadius: "50%",
                        background: "#22d3ee", opacity: 0.6, marginTop: "8px" }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}