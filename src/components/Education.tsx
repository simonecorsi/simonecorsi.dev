"use client";

import type React from "react";

interface EducationEntry {
  institution: string;
  degree: string;
  period: string;
  description: string;
}

const education: EducationEntry[] = [
  {
    institution: "University of Rome Tor Vergata",
    degree: "Computer Engineering",
    period: "2009 — 2011",
    description:
      "Academic studies in Computer Engineering. After two years, I chose to enter the professional arena during the startup boom, while maintaining a lifelong commitment to the study of engineering and technical sciences.",
  },
  {
    institution: "AANT (Accademia delle Arti e Nuove Tecnologie)",
    degree: "UI/UX & Graphic Design",
    period: "2011 — 2013",
    description:
      "Specialized in user-centric design to bridge the gap between engineering and usability. Pursued during the startup boom to deliver high-impact digital products as a lead freelancer.",
  },
  {
    institution: "ITIS E. Fermi",
    degree: "Computer Science Diploma",
    period: "2004 — 2009",
    description:
      "Deep technical grounding in Computer Science. Studied low-level systems starting from Assembly and electronics, moving through system programming and networking to modern high-level languages and client-server architectures.",
  },
  {
    institution: "Morehampton Language Institute & Stoke on Trent College",
    degree: "International Language Residencies",
    period: "Summer 2004 & Summer 2005",
    description:
      "Completed intensive summer English programs in Dublin and Stoke-on-Trent. These experiences provided the initial skills that allowed me to work comfortably with people from all over the world throughout my career.",
  },
];

export default function Education() {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {education.map((item, index) => (
        <div
          key={`${item.institution}-${index}`}
          className="relative py-8 lg:py-10 border-b border-base-content/5 last:border-0"
        >
          <div className="space-y-4 max-w-2xl">
            <header className="space-y-1">
              <span className="text-[10px] font-black tracking-[0.2em] text-primary uppercase">
                {item.period}
              </span>
              <h3 className="text-2xl lg:text-3xl font-black tracking-tight text-base-content leading-tight">
                {item.degree}
              </h3>
              <p className="font-bold text-lg text-base-content/60">
                {item.institution}
              </p>
            </header>

            <p className="text-base lg:text-lg leading-relaxed opacity-60">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
