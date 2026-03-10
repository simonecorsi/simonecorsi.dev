import "./globals.css";

import type { Metadata } from "next";
import type React from "react";
import DarkModeButton from "../components/Navigation/DarkModeBtn";
import Navigation from "../components/Navigation/Index";

export const metadata: Metadata = {
  // viewport: 'width=device-width, initial-scale=1', (handled by Next.js now)
  manifest: "/site.webmanifest",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
    other: {
      rel: "icon",
      url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Needed for theme toggle to prevent FOUC
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (!theme) theme = 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-base-100 text-base-content overflow-x-hidden">
        <div id="app-container" className="flex">
          <Navigation />
          <div className="fixed top-7 right-8 z-50">
            <DarkModeButton />
          </div>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
