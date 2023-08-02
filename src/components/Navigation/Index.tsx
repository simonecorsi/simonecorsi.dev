'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Hamburger } from 'components/Navigation/Hamburger';
import { Menu } from 'components/Navigation/Menu';
import config from 'lib/config';

export default function Navigation() {
  const pathname = usePathname();
  const [open, setopen] = useState(false);
  return (
    <nav data-open={Boolean(open)}>
      <Hamburger onClick={() => setopen(!open)} />
      <Menu
        currentPathname={pathname!}
        routes={config.routes}
        open={Boolean(open)}
      />
    </nav>
  );
}
