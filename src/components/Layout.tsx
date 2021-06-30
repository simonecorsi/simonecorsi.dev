import Head from 'next/head';
import Navigation from './Navigation';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useContext, useEffect, useState } from 'react';
import { darkModeContext } from './DarkMode';
import { DarkMode } from 'use-dark-mode';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [useDarkmode, setDarkmode] = useState<any>();
  const dm = useContext(darkModeContext) as DarkMode;

  useEffect(() => setDarkmode(dm.value), []);

  return (
    <div className={`root ${useDarkmode ? ' dark-mode' : ''}`}>
      <Head>
        <meta name="theme-color" content={!!useDarkmode ? '#fff' : '#333'} />
      </Head>
      <nav>
        <Navigation />
      </nav>
      <main>
        <div
          className="dm-toggle"
          style={{ position: 'absolute', top: 0, right: 0 }}
        >
          <DarkModeSwitch
            checked={useDarkmode === true}
            onChange={() => {
              console.log('toggle');
              return dm.toggle();
            }}
            size={25}
          />
        </div>
        {children}
      </main>
    </div>
  );
}
