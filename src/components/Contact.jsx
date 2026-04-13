"use client";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent]  = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ct-heading", { y: 60, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" } });
      gsap.from(".ct-body > *", { y: 30, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: ".ct-body", start: "top 85%" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    width: "100%", background: "transparent",
    border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)",
    padding: "12px 0", color: "#fff", resize: "none", outline: "none",
    fontFamily: "var(--font-sans-stack)", fontSize: "clamp(0.9rem,1.5vw,1.05rem)",
    transition: "border-color 0.2s ease", borderRadius: 0,
  };

  const S = {
    section: { minHeight: "100dvh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "5rem 0",
      borderTop: "1px solid rgba(255,255,255,0.04)",
      background: "rgba(0,0,0,0.3)", position: "relative", zIndex: 10 },
    wrap: { maxWidth: "1280px", width: "100%", margin: "0 auto", padding: "0 1.5rem" },
  };

  return (
    <section ref={ref} id="contact" style={S.section}>
      <div style={S.wrap}>

        <h2 className="ct-heading" style={{ fontFamily: "var(--font-sans-stack)", fontWeight: 900,
          letterSpacing: "-0.04em", color: "#fff", fontSize: "clamp(2.5rem,9vw,7rem)",
          lineHeight: 0.92, textTransform: "uppercase", marginBottom: "3rem" }}>
          Get In{" "}
          <span style={{ fontFamily: "var(--font-serif-stack)", fontStyle: "italic", fontWeight: 400,
            color: "#22d3ee", textTransform: "none" }}>Touch</span>
        </h2>

        <div className="ct-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "4rem", alignItems: "start" }}>

          {/* Left */}
          <div>
            <p style={{ fontFamily: "var(--font-serif-stack)", fontStyle: "italic",
              color: "rgba(255,255,255,0.32)", lineHeight: 1.75, marginBottom: "2.5rem",
              fontSize: "clamp(1rem,2.2vw,1.4rem)" }}>
              Seeking new opportunities to build and innovate.
              Let's create something meaningful together.
            </p>
            {[
              { label: "nischayreddy.dev",  href: "mailto:nischayreddy.t@gmail.com" },
              { label: "LinkedIn",          href: "https://linkedin.com" },
              { label: "GitHub",            href: "https://github.com" },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="interactive-element"
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: "12px",
                  marginBottom: "12px", textDecoration: "none",
                  color: "rgba(255,255,255,0.3)", fontSize: "13px",
                  fontFamily: "var(--font-sans-stack)", transition: "color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#22d3ee"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
              >
                <span style={{ height: "1px", width: "20px", background: "currentColor", flexShrink: 0, transition: "width 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.width = "36px"}
                  onMouseLeave={e => e.currentTarget.style.width = "20px"}
                />
                {label}
              </a>
            ))}
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { name: "name",    label: "Your Name",  type: "text",  tag: "input" },
              { name: "email",   label: "Your Email", type: "email", tag: "input" },
              { name: "message", label: "Message",    type: null,    tag: "textarea" },
            ].map(({ name, label, type, tag: Tag }) => (
              <div key={name} style={{ position: "relative" }}>
                <Tag type={type} name={name} id={name} required placeholder=" "
                  rows={Tag === "textarea" ? 3 : undefined}
                  value={form[name]} onChange={handleChange}
                  className="interactive-element"
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "rgba(34,211,238,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                <label htmlFor={name} style={{
                  position: "absolute", left: 0, top: "12px",
                  fontFamily: "var(--font-sans-stack)", fontSize: "12px",
                  color: "rgba(255,255,255,0.28)", letterSpacing: "0.06em",
                  transition: "all 0.25s ease", pointerEvents: "none",
                }}>
                  {label}
                </label>
                <style>{`
                  #${name}:focus ~ label, #${name}:not(:placeholder-shown) ~ label {
                    top: -16px; font-size: 10px; color: rgba(34,211,238,0.7); letter-spacing: 0.1em;
                  }
                `}</style>
              </div>
            ))}

            <button type="submit" className="interactive-element" style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              fontFamily: "var(--font-sans-stack)", fontSize: "12px", fontWeight: 700,
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: sent ? "rgba(34,211,238,0.8)" : "rgba(255,255,255,0.5)",
              display: "flex", alignItems: "center", gap: "12px",
              transition: "color 0.2s, gap 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#22d3ee"; e.currentTarget.style.gap = "20px"; }}
              onMouseLeave={e => { e.currentTarget.style.color = sent ? "rgba(34,211,238,0.8)" : "rgba(255,255,255,0.5)"; e.currentTarget.style.gap = "12px"; }}
            >
              {sent ? "Sent ✓" : <>Send Message <span style={{ fontSize: "1.1rem" }}>→</span></>}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "5rem", paddingTop: "1.25rem",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px",
          fontFamily: "var(--font-sans-stack)", fontSize: "11px",
          color: "rgba(255,255,255,0.15)", letterSpacing: "0.04em" }}>
          <span>© 2025 Nischay Reddy — Next.js & Tailwind</span>
          <span>v2.0.0 · nischayreddy.dev</span>
        </div>
      </div>

      {/* Mobile: single column */}
      <style>{`
        @media (max-width: 640px) {
          .ct-body { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}