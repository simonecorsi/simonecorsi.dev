import Link from 'next/link';
import { useRouter } from 'next/router';
import Burger from './Burger';
import { useState } from 'react';

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <div className={'container ' + (active ? 'active' : '')}>
        <ul>
          <li>
            <Link href="/">
              <a className={router.pathname === '/' ? 'active' : null}>home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a className={router.pathname === '/about' ? 'active' : null}>
                about
              </a>
            </Link>
          </li>
          <li>
            <Link href="/bookmarks">
              <a className={router.pathname === '/bookmarks' ? 'active' : null}>
                bookmarks
              </a>
            </Link>
          </li>
          <li>
            <Link href="/repositories">
              <a
                className={
                  router.pathname === '/repositories' ? 'active' : null
                }
              >
                repositories
              </a>
            </Link>
          </li>
          {/* <li>
            <Link href="/posts">
              <a
                className={
                  router.pathname.startsWith("/posts") ? "active" : null
                }
              >
                blog
              </a>
            </Link>
          </li> */}
        </ul>
        <style jsx>
          {`
            .container {
              width: 0;
            }
            ul {
              opacity: 0;
              width: 100%;
              height: 100vh;
              text-align: right;
              list-style: none;
              margin: 0;
              padding: 0;
              position: fixed;
              top: 0;
              display: flex;
              flex-direction: column;
              justify-content: center;
              z-index: 1;
              transform: translateX(100%);
              transition: opacity 200ms;
            }
            .active ul {
              opacity: 1;
              transform: translateX(0);
              background: white;
              transition: all ease-out 0.35s;
            }
            li {
              margin-bottom: 1.75rem;
              font-size: 2rem;
              padding: 0 1.5rem 0 0;
            }
            li:last-child {
              margin-bottom: 0;
            }
            .active {
              font-weight: 500;
            }

            @media (min-width: 769px) {
              .container {
                width: 7rem;
                display: block;
              }
              ul {
                opacity: 1;
                width: 7rem;
                top: auto;
                display: block;
                transform: translateX(0);
              }
              li {
                font-size: 1rem;
                padding: 0;
              }
            }
          `}
        </style>
      </div>
    </>
  );
}
