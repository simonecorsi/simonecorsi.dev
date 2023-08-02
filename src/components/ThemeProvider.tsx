'use client';

import React from 'react';
import { ThemeProvider as Provider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>;
}
