import Head from "next/head";
import Navigation from "./Navigation";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useContext } from "react";
import { darkModeContext } from "./DarkMode";
import {DarkMode} from "use-dark-mode";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const dm = useContext(darkModeContext) as DarkMode;
  return (
    <div className="root">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content={!!dm.value ? '#fff' : '#333'} />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>"></link>
      </Head>
      <nav>
        <Navigation />
      </nav>
      <main>
        <div className="dm-toggle" style={{ position: "absolute", top: 0, right: 0 }}>
        <DarkModeSwitch
          checked={!!dm.value}
          onChange={dm.toggle}
          size={25}
        />
        </div>
        {children}
      </main>
      
      <style jsx>
        {`
          .root {
            display: block;
            padding: 4rem 0;
            box-sizing: border-box;
            height: 100%;
          }
          main {
            display: flex;
            min-height: 100%;
          }

          .dm-toggle {
            margin: 1.125rem 2rem;
          }

          @media (min-width: 769px) {
            .root {
              display: flex;
              flex: 1 0 auto;
            }
            main {
              flex: 1 0 auto;
            }

            .dm-toggle {
              margin: 4rem;
            }
          }
        `}
      </style>
    </div>
  );
}
