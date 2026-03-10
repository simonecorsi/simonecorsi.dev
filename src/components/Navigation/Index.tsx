"use client";

import config from "lib/config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type MenuItemType = (typeof config.routes)[number];

const removeSlash = (str: string) => str.replace(/\//g, "");
function isActivePath(path: string, currentPath: string) {
  if (typeof path !== "string" || typeof currentPath !== "string") return false;
  return removeSlash(path) === removeSlash(currentPath);
}

function Hamburger({ onClick, open }: { onClick: () => void; open: boolean }) {
  return (
    <button
      type="button"
      className="btn btn-ghost btn-circle burger lg:hidden absolute top-4 left-4 z-50"
      onClick={onClick}
      aria-label="Menu"
    >
      <div className="flex flex-col gap-1.5 items-center justify-center">
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-6 h-0.5 bg-current transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </div>
    </button>
  );
}

function MenuItem({
  route,
  isActive,
}: {
  route: MenuItemType;
  isActive: () => boolean;
}) {
  const active = isActive();
  return (
    <li key={route.label}>
      <Link
        href={route.path}
        className={`text-xl lg:text-2xl transition-all duration-300 hover:opacity-100 ${
          active ? "font-bold opacity-100" : "opacity-40"
        }`}
        {...(route.blank ? { target: "_blank" } : {})}
      >
        {route.label}
      </Link>
    </li>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [open, setopen] = useState(false);
  const { routes } = config;

  return (
    <>
      <Hamburger open={open} onClick={() => setopen(!open)} />
      <div
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 lg:w-80 bg-base-100 lg:bg-transparent z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? "translate-x-0 shadow-2xl lg:shadow-none" : "-translate-x-full"
        } flex flex-col justify-center px-12`}
      >
        <ul className="flex flex-col gap-8 text-right">
          {routes
            .filter((r) => r.enabled !== false)
            .map((route) => (
              <MenuItem
                key={route.label}
                route={route}
                isActive={() => isActivePath(pathname || "", route.path)}
              />
            ))}
        </ul>
      </div>
      {/* Overlay for mobile */}
      {open && (
        <button
          type="button"
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden cursor-default w-full h-full border-none p-0"
          onClick={() => setopen(false)}
          aria-label="Close menu"
        />
      )}
    </>
  );
}
