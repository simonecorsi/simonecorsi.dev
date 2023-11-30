'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { DarkModeSwitch } from '@scdev/react-toggle-dark-mode';

const DarkModeButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DarkModeSwitch
      checked={theme === 'light'}
      onChange={() => (theme === 'dark' ? setTheme('light') : setTheme('dark'))}
      size={25}
    />
  );
};

export default DarkModeButton;
