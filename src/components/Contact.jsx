"use client";
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);


const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3OPky4HfShXveekQkjmnTXDW8zIwupVhC5Nk7fKVmSjiiyP0v4_HqewNz9pMfbYTPRw/exec";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ct-heading", {
        y: 60, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" }
      });
      gsap.from(".ct-body > *", {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".ct-body", start: "top 75%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      ...form,
      timestamp: new Date().toISOString(),
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8", 
        },
        body: JSON.stringify(payload),
      });

      // Success!
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 5000);

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="contact" className="relative z-10 flex min-h-screen items-center justify-center py-20 px-6">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Heading */}
        <h2 className="ct-heading mb-16 font-sans text-[clamp(3.5rem,8vw,7rem)] font-black leading-[0.9] tracking-tighter text-white uppercase md:mb-24">
          Get In{" "}
          <span className="font-serif font-normal italic text-cyan-400 normal-case drop-shadow-[0_0_30px_rgba(34,211,238,0.2)]">
            Touch
          </span>
        </h2>

        {/* Body Layout */}
        <div className="ct-body grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-start">

          {/* Left Column: Text & Links */}
          <div className="flex flex-col">
            <p className="mb-12 font-serif text-[clamp(1.2rem,2.2vw,1.6rem)] italic leading-relaxed text-white/50">
              Seeking new opportunities to build and innovate. Let's create something meaningful together.
            </p>
            
            <div className="flex flex-col gap-5">
              {[
                { label: "nischayreddy.dev", href: "mailto:nischayreddy.t@gmail.com" },
                { label: "LinkedIn", href: "https://linkedin.com/in/nischayrt" },
                { label: "GitHub", href: "https://github.com/NischayRT" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="interactive-element group flex w-fit items-center gap-4 text-sm font-medium text-white/40 transition-colors duration-300 hover:text-cyan-400"
                >
                  <span className="h-[1px] w-6 bg-current transition-all duration-300 group-hover:w-12" />
                  <span className="font-sans tracking-wide">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Glassmorphic Form */}
          <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl shadow-2xl md:p-12">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              {[
                { name: "name", label: "Your Name", type: "text", tag: "input" },
                { name: "email", label: "Your Email", type: "email", tag: "input" },
                { name: "message", label: "Message", type: null, tag: "textarea" },
              ].map(({ name, label, type, tag: Tag }) => {
                
                const hasValue = form[name].length > 0;

                return (
                  <div key={name} className="relative mt-2">
                    <Tag
                      type={type}
                      name={name}
                      id={name}
                      required
                      value={form[name]}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      rows={Tag === "textarea" ? 4 : undefined}
                      className="peer interactive-element w-full resize-none border-b border-white/10 bg-transparent py-2 font-sans text-base text-white outline-none transition-colors duration-300 focus:border-cyan-400 disabled:opacity-50"
                    />
                    
                    <label
                      htmlFor={name}
                      className={`pointer-events-none absolute left-0 font-sans transition-all duration-300 ${
                        hasValue
                          ? "-top-6 text-[10px] tracking-[0.15em] text-white/40 uppercase"
                          : "top-2 text-sm tracking-[0.06em] text-white/30 peer-focus:-top-6 peer-focus:text-[10px] peer-focus:tracking-[0.15em] peer-focus:text-cyan-400/80 peer-focus:uppercase"
                      }`}
                    >
                      {label}
                    </label>
                  </div>
                );
              })}

              <button
                type="submit"
                disabled={isSubmitting}
                className="interactive-element group mt-4 flex w-fit items-center gap-3 font-sans text-xs font-bold tracking-[0.2em] text-white/50 uppercase transition-all duration-300 hover:text-cyan-400 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <span className="animate-pulse text-cyan-400">Sending...</span>
                ) : sent ? (
                  <span className="text-cyan-400">Message Sent ✓</span>
                ) : (
                  <>
                    Send Message 
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-32 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 font-sans text-[11px] tracking-[0.05em] text-white/20">
          <span>© 2026 Nischay Reddy — Next.js & Tailwind</span>
          <span>v2.0.0 · nischayreddy</span>
        </div>
      </div>
    </section>
  );
}