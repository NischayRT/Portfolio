import React from "react";

/*
  FIX: Width animation on flex children forces sibling reflow.
  Solution: fixed outer size, animate only opacity + transform inside.
*/
const SocialPill = React.memo(({ icon: Icon, label, link, color }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group/pill relative flex items-center justify-center overflow-hidden shadow-lg rounded-full"
    style={{
      width: "48px",
      height: "48px",
      background: "rgba(255,255,255,0.10)",
      border: "1px solid rgba(255,255,255,0.10)",
      transition: "width 280ms cubic-bezier(0.34,1.56,0.64,1), background 250ms ease",
      "--hover-color": color,
    }}
    onMouseEnter={e => { e.currentTarget.style.width = "128px"; e.currentTarget.style.background = color; }}
    onMouseLeave={e => { e.currentTarget.style.width = "48px";  e.currentTarget.style.background = "rgba(255,255,255,0.10)"; }}
  >
    <Icon
      size={20}
      className="text-white absolute transition-transform duration-300 group-hover/pill:translate-y-8"
    />
    <span className="absolute opacity-0 -translate-y-4 text-xs font-bold text-white uppercase tracking-wider transition-all duration-300 group-hover/pill:opacity-100 group-hover/pill:translate-y-0 whitespace-nowrap pointer-events-none">
      {label}
    </span>
  </a>
));

SocialPill.displayName = "SocialPill";
export default SocialPill;