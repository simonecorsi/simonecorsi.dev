import Head from 'next/head';
import Navigation from './Navigation';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useContext, useEffect, useState } from 'react';
import useDarkMode from 'use-dark-mode';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { value, toggle } = useDarkMode(false);
  const [isDarkMode, setDarkMode] = useState(value);

  const toggleDm = (checked: boolean) => {
    toggle();
    setDarkMode(checked);
  };

  return (
    <>
      <Head>
        <meta name="theme-color" content={value ? '#fff' : '#333'} />
      </Head>
      <Navigation />
      <div className="dm-toggle">
        <DarkModeSwitch checked={isDarkMode} onChange={toggleDm} size={25} />
      </div>
      {children}
    </>
  );
}
