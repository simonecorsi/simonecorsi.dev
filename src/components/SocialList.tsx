import React, { useContext } from "react";
import Twitter from "../assets/twitter-alt.svg";
import GitHub from "../assets/github-alt.svg";
// import config from "../lib/config";
import { darkModeContext } from "./DarkMode";
import { DarkMode } from "use-dark-mode";

export function SocialList({ user }) {
  const dm = useContext(darkModeContext) as DarkMode;
  return (
    <div>
      {user?.twitter_username && <a
        title="Twitter"
        href={`https://twitter.com/${user.twitter_username}`}
        target="_blank"
        rel="noopener"
      >
        
        <Twitter width={24} height={24} fill={!!dm?.value ? '#fafafa':  "#333"} />
      </a>}
      {user?.login && <a
        title="GitHub"
        href={`https://github.com/${user.login}`}
        target="_blank"
        rel="noopener"
      >
        <GitHub width={24} height={24} fill={!!dm?.value ? '#fafafa':  "#333"} />
      </a>}
      <style jsx>{`
        a {
          display: inline-block;
        }
        a:not(:last-child) {
          margin-right: 2em;
        }
      `}</style>
    </div>
  );
}
