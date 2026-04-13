import React from "react";

const SocialPill = React.memo(({ icon: Icon, label, link, color }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group/pill relative flex items-center justify-center overflow-hidden shadow-lg rounded-full w-12 h-12 md:w-12 md:h-12 bg-white/10 border border-white/10 md:hover:w-32 transition-all duration-300 ease-out"
    style={{
      "--hover-color": color,
    }}
    // Apply the brand color only on hover for desktop, or on active (tap) for mobile
    onMouseEnter={(e) => { 
      if (window.innerWidth >= 768) e.currentTarget.style.background = color; 
    }}
    onMouseLeave={(e) => { 
      if (window.innerWidth >= 768) e.currentTarget.style.background = "rgba(255,255,255,0.10)"; 
    }}
  >
    <Icon
      size={20}
      className="text-white absolute transition-transform duration-300 md:group-hover/pill:translate-y-8"
    />
    <span className="absolute opacity-0 -translate-y-4 text-xs font-bold text-white uppercase tracking-wider transition-all duration-300 md:group-hover/pill:opacity-100 md:group-hover/pill:translate-y-0 whitespace-nowrap pointer-events-none">
      {label}
    </span>
  </a>
));

SocialPill.displayName = "SocialPill";
export default SocialPill;