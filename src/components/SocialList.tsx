import React, { useContext } from 'react';
import Twitter from '../assets/twitter-alt.svg';
import GitHub from '../assets/github-alt.svg';
import { darkModeContext } from './DarkMode';
import { DarkMode } from 'use-dark-mode';

export function SocialList({ twitterUsername, login }) {
  const dm = useContext(darkModeContext) as DarkMode;
  return (
    <div className="socials">
      {twitterUsername && (
        <a
          title="Twitter"
          href={`https://twitter.com/${twitterUsername}`}
          target="_blank"
          rel="noopener"
        >
          <Twitter
            width={24}
            height={24}
            fill={!!dm?.value ? '#fafafa' : '#333'}
          />
        </a>
      )}
      {login && (
        <a
          title="GitHub"
          href={`https://github.com/${login}`}
          target="_blank"
          rel="noopener"
        >
          <GitHub
            width={24}
            height={24}
            fill={!!dm?.value ? '#fafafa' : '#333'}
          />
        </a>
      )}
    </div>
  );
}
