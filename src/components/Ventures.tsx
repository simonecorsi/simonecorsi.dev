"use client";

import type React from "react";

interface Venture {
  name: string;
  role: string;
  period: string;
  description: string;
}

const ventures: Venture[] = [
  {
    name: "Castelli Core",
    role: "Founder & Director",
    period: "2025 — Present",
    description:
      "Founded and leading a music production organization dedicated to the promotion of live shows in the capital. Currently managing a growing team of 6 professionals to deliver high-impact cultural events.",
  },
  {
    name: "Pank Rabbit",
    role: "Strategic Marketing & Communication",
    period: "2023 — 2025",
    description:
      "Orchestrated the venue's marketing strategy and digital communication systems, establishing it as a successful and well-known music hub. Trained the internal team for full operational autonomy while continuing close strategic consultation.",
  },
];

export default function Ventures() {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {ventures.map((venture, index) => (
        <div
          key={`${venture.name}-${index}`}
          className="relative py-8 lg:py-10 border-b border-base-content/5 last:border-0"
        >
          <div className="space-y-4 max-w-2xl">
            <header className="space-y-1">
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                {venture.period}
              </span>
              <h3 className="text-3xl lg:text-5xl font-black tracking-tighter text-base-content leading-tight">
                {venture.name}
              </h3>
              <p className="font-bold text-lg lg:text-xl text-base-content/70 italic">
                {venture.role}
              </p>
            </header>

            <p className="text-base lg:text-lg leading-relaxed opacity-60">
              {venture.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
