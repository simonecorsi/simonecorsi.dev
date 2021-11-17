import Link from 'next/link';

const removeSlash = (str) => str.replace(/\//g, '');
function isActivePath(path: string, currentPath: string) {
  if (typeof path !== 'string' || typeof currentPath !== 'string') return false;
  return removeSlash(path) === removeSlash(currentPath);
}

type MenuItem = {
  label: string;
  path: string;
};

export function MenuItem({
  route,
  isActive,
}: {
  route: MenuItem;
  isActive: () => boolean;
}) {
  return (
    <li key={route.label}>
      <Link href={route.path}>
        <a data-active={isActive()}>{route.label}</a>
      </Link>
    </li>
  );
}

export function Menu({
  routes,
  currentPathname,
  open,
}: {
  routes: MenuItem[];
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
