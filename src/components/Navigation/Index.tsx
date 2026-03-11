"use client";

import config from "lib/config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DarkModeButton from "./DarkModeBtn";

type MenuItemType = (typeof config.routes)[number];

function Hamburger({
  onClick,
  open,
  activeSection,
}: {
  onClick: () => void;
  open: boolean;
  activeSection: string;
}) {
  return (
    <div
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] lg:hidden h-14 rounded-full flex items-center justify-between px-2 group ${
        open
          ? "w-[calc(100%-3rem)] bg-transparent border-0 shadow-none translate-x-[-50%]"
          : "w-fit bg-base-100/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
      }`}
    >
      <button
        type="button"
        className="flex items-center gap-4 px-4 h-full"
        onClick={onClick}
        aria-label="Menu"
      >
        <div className="flex flex-col gap-1.5 items-center justify-center w-6">
          <span
            className={`block w-5 h-0.5 bg-current transition-all duration-500 ${open ? "rotate-45 translate-y-2 w-6" : ""}`}
          />
          <span
            className={`block w-4 h-0.5 bg-current transition-all duration-500 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-all duration-500 ${open ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </div>
        {!open && (
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary border-l border-white/10 pl-4 h-4 flex items-center">
            {activeSection}
          </span>
        )}
      </button>

      {/* Integrated Dark Mode Button for Mobile */}
      <div className="pr-1">
        <DarkModeButton />
      </div>
    </div>
  );
}

function MenuItem({
  route,
  active,
  index,
  isMobile,
  onClose,
}: {
  route: MenuItemType;
  active: boolean;
  index: number;
  isMobile?: boolean;
  onClose?: () => void;
}) {
  return (
    <li
      key={route.label}
      style={isMobile ? { transitionDelay: `${index * 100}ms` } : {}}
      className={
        isMobile
          ? "animate-in slide-in-from-bottom-4 fade-in duration-700 fill-mode-both"
          : ""
      }
    >
      <Link
        href={route.path}
        onClick={(e) => {
          if (route.path.startsWith("/#")) {
            const id = route.path.replace("/#", "");
            const element = document.getElementById(id);
            if (element) {
              e.preventDefault();
              element.scrollIntoView({ behavior: "smooth" });
              window.history.pushState(null, "", route.path);
              onClose?.();
            }
          }
        }}
        className={`relative px-4 py-2 uppercase transition-all duration-500 hover:text-primary flex items-center gap-3 ${
          isMobile
            ? `text-5xl font-black tracking-tighter ${active ? "text-primary" : "text-base-content"}`
            : `text-xs font-black tracking-[0.2em] ${active ? "text-primary px-6" : "text-base-content/40 hover:text-base-content/70"}`
        }`}
        {...(route.blank ? { target: "_blank" } : {})}
      >
        {!isMobile && active && (
          <span className="absolute inset-0 bg-primary/5 rounded-full -z-10 animate-in fade-in zoom-in duration-500" />
        )}
        <span>{route.label}</span>
      </Link>
    </li>
  );
}

export default function Navigation() {
  const [open, setopen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { routes } = config;

  useEffect(() => {
    const sections = routes
      .filter((r) => r.path.startsWith("/#"))
      .map((r) => r.path.replace("/#", ""));

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [routes]);

  return (
    <>
      <Hamburger
        open={open}
        onClick={() => setopen(!open)}
        activeSection={activeSection}
      />

      {/* Desktop Centered Floating Menu */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-40 max-lg:hidden">
        <div className="h-14 rounded-full bg-base-100/40 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-2 flex items-center">
          <ul className="flex items-center gap-1">
            {routes
              .filter((r) => r.enabled !== false)
              .map((route, i) => (
                <MenuItem
                  key={route.label}
                  route={route}
                  active={activeSection === route.path.replace("/#", "")}
                  index={i}
                />
              ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      <nav
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-base-100/98 backdrop-blur-3xl flex flex-col justify-center p-12">
          <ul className="space-y-8">
            {open &&
              routes
                .filter((r) => r.enabled !== false)
                .map((route, i) => (
                  <MenuItem
                    key={route.label}
                    route={route}
                    active={activeSection === route.path.replace("/#", "")}
                    index={i}
                    isMobile
                    onClose={() => setopen(false)}
                  />
                ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
