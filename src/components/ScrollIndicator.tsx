"use client";

import type React from "react";

export default function ScrollIndicator() {
  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToAbout}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer bg-transparent border-none group"
      aria-label="Scroll to about section"
    >
      <span className="text-[10px] uppercase tracking-[0.4em] font-black">
        About Me
      </span>
      <div className="w-0.5 h-12 bg-gradient-to-b from-primary to-transparent animate-bounce opacity-80 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
