import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import config from '../lib/config';

const removeSlash = (str) => str.replace(/\//g, '');
function isActivePath(path: string, currentPath: string) {
  if (typeof path !== 'string' || typeof currentPath !== 'string') return false;
  console.log('object :>> ', removeSlash(path), removeSlash(currentPath));
  return removeSlash(path) === removeSlash(currentPath);
}

export default function Navigation() {
  const router = useRouter();
  const [open, setopen] = useState(false);
  return (
    <nav data-open={Boolean(open)}>
      <div className="burger" onClick={() => setopen(!open)}>
        <div className="meat-1" />
        <div className="meat-2" />
        <div className="meat-3" />
      </div>
      <div className="nav-container" data-open={Boolean(open)}>
        <ul>
          {config.routes.map((route) => (
            <li key={route.label}>
              <Link href={route.path}>
                <a data-active={isActivePath(router.pathname, route.path)}>
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
