import React from "react";

const SocialPill = React.memo(({ icon: Icon, label, link, color }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="group/pill relative flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/10 hover:w-32 hover:bg-[var(--hover-color)] transition-all duration-300 ease-in-out overflow-hidden shadow-lg"
    style={{ "--hover-color": color }}
  >
    <Icon
      size={20}
      className="text-white absolute transition-all duration-300 group-hover/pill:translate-y-3"
    />
    <span className="absolute opacity-0 translate-y-4 text-xs font-bold text-white uppercase tracking-wider transition-all duration-300 group-hover/pill:opacity-100 group-hover/pill:-translate-y-2">
      {label}
    </span>
  </a>
));
SocialPill.displayName = "SocialPill";

export default SocialPill;
