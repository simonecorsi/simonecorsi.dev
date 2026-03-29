"use client";

import type React from "react";

interface Experience {
  company: string;
  title: string;
  period: string;
  description: string;
  isLatest?: boolean;
}

const experiences: Experience[] = [
  {
    company: "Immobiliare.it",
    title: "Technical Lead",
    period: "2021 — Present",
    description:
      "Technical Lead in the Platform and Developer Experience team, which I helped build from the ground up alongside my Principal Engineer. Focused on scaling engineering excellence and internal infrastructure.",
    isLatest: true,
  },
  {
    company: "Immobiliare.it",
    title: "Senior Software Engineer",
    period: "2020 — 2021",
    description:
      "Part of the Research and Development team focusing on core platform improvements and technical innovation.",
  },
  {
    company: "IQUII srl",
    title: "Full Stack Engineer",
    period: "2017 — 2020",
    description:
      "Software engineering consultancy focused on Research and Development. Led systems design and end-to-end development for major players in the retail, banking, oil, and sporting industries, scaling applications up to millions of users.",
  },
  {
    company: "DBrain srls",
    title: "Full-Stack Developer & DevOps",
    period: "2016 — 2017",
    description:
      "Developing front and backend solutions, while performing Database Administration and System Administration for various customers.",
  },
  {
    company: "Let's Ink",
    title: "Full Stack Developer",
    period: "2015 — 2016",
    description:
      "Developed the first social network for tattoo artists worldwide. Managed Node.js backend, hybrid mobile apps, and VPS deployments.",
  },
  {
    company: "Freelance & Coworking",
    title: "Full Stack Developer",
    period: "2011 — 2015",
    description:
      "Delivered comprehensive digital products in a collaborative coworking space alongside experts from various fields. Developed, deployed, and maintained custom web solutions and e-commerce platforms.",
  },
];

export default function WorkExperience() {
  return (
    <div className="relative space-y-4 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-base-content/10 before:ml-4 lg:before:ml-6 pb-20">
      {experiences.map((exp, index) => (
        <div
          key={`${exp.company}-${exp.title}-${index}`}
          className="relative pl-12 lg:pl-20"
        >
          {/* Timeline Dot */}
          <div className="absolute left-0 w-8 lg:w-12 h-8 lg:h-12 flex items-center justify-center translate-x-0 ml-0.5 lg:ml-0.5 z-10">
            <div
              className={`rounded-full ${
                exp.isLatest
                  ? "w-4 h-4 lg:w-5 lg:h-5 bg-primary shadow-[0_0_15px_rgba(var(--color-primary),0.5)]"
                  : "w-3 h-3 lg:w-4 lg:h-4 bg-base-content/20"
              }`}
            />
          </div>

          <div
            className={`space-y-4 p-6 rounded-2xl ${
              exp.isLatest ? "bg-base-content/5 shadow-sm" : ""
            }`}
          >
            <header className="space-y-1">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1 lg:gap-4">
                <h3
                  className={`text-xl lg:text-3xl font-black tracking-tight ${
                    exp.isLatest ? "text-primary" : "text-base-content"
                  }`}
                >
                  {exp.title}
                </h3>
                <span
                  className={`text-sm lg:text-base font-medium tabular-nums ${
                    exp.isLatest ? "text-primary opacity-100" : "opacity-60"
                  }`}
                >
                  {exp.period}
                </span>
              </div>
              <p
                className={`text-lg lg:text-xl font-bold ${
                  exp.isLatest ? "opacity-100" : "opacity-70"
                }`}
              >
                {exp.company}
              </p>
            </header>

            <p
              className={`max-w-2xl text-base lg:text-lg leading-relaxed ${
                exp.isLatest ? "opacity-100" : "opacity-60"
              }`}
            >
              {exp.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
