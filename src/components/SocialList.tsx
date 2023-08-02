'use client';

import React from 'react';
import Twitter from '../assets/twitter-alt.svg';
import GitHub from '../assets/github-alt.svg';
import { useTheme } from 'next-themes';

const SIZE = 24;
const isDarkMode = (theme: string) => theme === 'dark';

export function SocialList({ twitterUsername, login }) {
  const { theme } = useTheme();

  return (
    <div className="socials">
      {twitterUsername && (
        <a
          title="Twitter"
          href={`https://twitter.com/${twitterUsername}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter
            width={SIZE}
            height={SIZE}
            fill={isDarkMode(theme || 'light') ? '#fafafa' : '#333'}
          />
        </a>
      )}
      {login && (
        <a
          title="GitHub"
          href={`https://github.com/${login}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub
            width={SIZE}
            height={SIZE}
            fill={isDarkMode(theme || 'light') ? '#fafafa' : '#333'}
          />
        </a>
      )}
    </div>
  );
}
