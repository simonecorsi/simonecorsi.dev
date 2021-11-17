import { useRouter } from 'next/router';
import { useState } from 'react';
import { Hamburger } from 'components/Navigation/Hamburger';
import { Menu } from 'components/Navigation/Menu';
import config from 'lib/config';

export default function Navigation() {
  const router = useRouter();
  const [open, setopen] = useState(false);
  return (
    <nav data-open={Boolean(open)}>
      <Hamburger onClick={() => setopen(!open)} />
      <Menu
        currentPathname={router.pathname}
        routes={config.routes}
        open={Boolean(open)}
      />
    </nav>
  );
}
