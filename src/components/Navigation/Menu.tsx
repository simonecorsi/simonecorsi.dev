import Link from 'next/link';
import type config from 'lib/config';

const removeSlash = (str) => str.replace(/\//g, '');
function isActivePath(path: string, currentPath: string) {
  if (typeof path !== 'string' || typeof currentPath !== 'string') return false;
  return removeSlash(path) === removeSlash(currentPath);
}

type MenuItemType = typeof config.routes[number];

export function MenuItem({
  route,
  isActive,
}: {
  route: MenuItemType;
  isActive: () => boolean;
}) {
  return (
    <li key={route.label}>
      <Link href={route.path}>
        <a
          data-active={isActive()}
          {...(route.blank ? { target: '_blank' } : {})}
        >
          {route.label}
        </a>
      </Link>
    </li>
  );
}

export function Menu({
  routes,
  currentPathname,
  open,
}: {
  routes: MenuItemType[];
  currentPathname: string;
  open: boolean;
}) {
  return (
    <div className="nav-container" data-open={open}>
      <ul className="nav-list">
        {routes.map((route) => (
          <MenuItem
            key={route.label}
            route={route}
            isActive={() => isActivePath(currentPathname, route.path)}
          />
        ))}
      </ul>
    </div>
  );
}
