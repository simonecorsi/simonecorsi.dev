import 'normalize.css';
import './global.scss';

import React from 'react';
import { Metadata } from 'next';
import { ThemeProvider } from '../components/ThemeProvider';
import Navigation from '../components/Navigation/Index';
import DarkModeButton from '../components/Navigation/DarkModeBtn';

export const metadata: Metadata = {
  viewport: 'width=device-width, initial-scale=1',
  manifest: '/site.webmanifest',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
    other: {
      rel: 'icon',
      url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body>
          <div id="app-container">
            <Navigation />
            <div className="dm-toggle">
              <DarkModeButton />
            </div>
            {children}
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
