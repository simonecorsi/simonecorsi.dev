import type React from 'react';
import Head from 'next/head';
import Navigation from './Navigation/Index';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from 'next-themes';

type Props = {
  children: React.ReactNode;
};

const toggleDm = (theme: string, setTheme) => {
  setTheme(theme === 'dark' ? 'light' : 'dark');
};

const isDarkMode = (theme: string) => theme === 'dark';

export default function Layout({ children }: Props) {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Head>
        <meta
          name="theme-color"
          content={isDarkMode(theme) ? '#fff' : '#333'}
        />
      </Head>
      <Navigation />
      <div className="dm-toggle">
        <DarkModeSwitch
          checked={isDarkMode(theme)}
          onChange={() => toggleDm(theme, setTheme)}
          size={25}
        />
      </div>
      {children}
    </>
  );
}
