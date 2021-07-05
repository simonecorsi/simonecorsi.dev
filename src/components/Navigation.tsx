import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const routes = [
  { path: '/', label: 'home' },
  { path: '/about', label: 'about' },
  { path: '/bookmarks', label: 'bookmarks' },
  { path: '/repositories', label: 'repositories' },
];

export default function Navigation() {
  const router = useRouter();
  const [open, setopen] = useState(false);
  return (
    <nav className={`${open ? 'open' : ''} `}>
      <div className="burger" onClick={() => setopen(!open)}>
        <div className="meat-1" />
        <div className="meat-2" />
        <div className="meat-3" />
      </div>
      <div className={'nav-container ' + (open ? 'open' : '')}>
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
    </nav>
  );
}
