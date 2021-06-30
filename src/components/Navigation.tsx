import Link from 'next/link';
import { useRouter } from 'next/router';
import Burger from './Burger';
import { useState } from 'react';

const routes = [
  { path: '/', label: 'home' },
  { path: '/about', label: 'about' },
  { path: '/bookmarks', label: 'bookmarks' },
  { path: '/repositories', label: 'repositories' },
];

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <div className={'nav-container ' + (active ? 'active' : '')}>
        <ul>
          {routes.map((route) => (
            <li key={route.label}>
              <Link href={route.path}>
                <a className={router.pathname === route.path ? 'active' : ''}>
                  {route.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
