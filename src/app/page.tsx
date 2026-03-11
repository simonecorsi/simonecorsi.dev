import { Repository } from "components/Repository";
import { proxyCache } from "lib/cache";
import {
  getBase64Avatar,
  getPersonalBioReadme,
  getUserDetails,
  getUserRepositories,
} from "lib/github/graphql";
import type { IRepository, IUser } from "lib/github/queries";
import { getMetadata } from "lib/metadata";
import { marked } from "marked";
import Image from "next/image";
import GitHub from "../assets/github-alt.svg";
import LinkedIn from "../assets/linkedin.svg";
import config from "../lib/config";

import ScrollIndicator from "components/ScrollIndicator";

export const metadata = getMetadata("/");

async function getData() {
  const [avatar, user, bio, repositories] = await Promise.all([
    proxyCache<string>("avatar", getBase64Avatar),
    proxyCache<IUser>("user", getUserDetails),
    getPersonalBioReadme(),
    proxyCache<IRepository[]>("repositories", getUserRepositories),
  ]);

  return {
    avatar,
    user,
    bio: marked(bio),
    repositories,
  };
}

export default async function Index() {
  const { user, avatar, bio, repositories } = await getData();
  const { github_account, linkedin_account } = config;

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto px-4 lg:px-8">
      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center p-8 pt-32 pb-40 transition-opacity duration-1000 relative"
      >
        <div className="max-w-2xl w-full text-center space-y-4">
          {/* Profile Section */}
          <div className="space-y-6">
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-primary rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative">
                <Image
                  src={avatar}
                  alt={user.name}
                  width={160}
                  height={160}
                  className="rounded-full ring-4 ring-base-100 shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="space-y-2 px-4">
              <h1 className="text-4xl lg:text-7xl font-black tracking-tighter text-base-content">
                {user.name}
              </h1>
              <h2 className="text-xl lg:text-2xl font-medium opacity-60 leading-relaxed max-w-lg mx-auto italic">
                {user.bio}
              </h2>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 justify-center">
            <a
              href={`https://github.com/${github_account}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-circle btn-lg hover:text-primary transition-all duration-300 hover:-translate-y-1"
              title="GitHub"
            >
              <GitHub className="w-8 h-8 fill-current" />
            </a>
            <a
              href={`https://www.linkedin.com${linkedin_account}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-circle btn-lg hover:text-primary transition-all duration-300 hover:-translate-y-1"
              title="LinkedIn"
            >
              <LinkedIn className="w-8 h-8 fill-current" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-t border-base-content/5">
        <div className="max-w-3xl mx-auto">
          <header className="mb-16">
            <h2 className="text-xs font-black tracking-[0.3em] text-primary/60 uppercase mb-4">
              My area of expertise
            </h2>
            <h3 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-6">
              Engineering <br />
              <span className="text-primary">Leadership.</span>
            </h3>
            {/* <p className="text-xl opacity-60 max-w-xl leading-relaxed">
              My approach to software engineering and 
            </p> */}
          </header>
          <div
            className="prose prose-lg lg:prose-xl prose-slate dark:prose-invert prose-about max-w-none"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: Needed to render bio markdown
            dangerouslySetInnerHTML={{ __html: bio }}
          />
        </div>
      </section>

      {/* Open Source Section */}
      <section
        id="open-source"
        className="py-24 border-t border-base-content/5"
      >
        <div className="max-w-3xl mx-auto space-y-10">
          <header>
            <h2 className="text-xs font-black tracking-[0.3em] text-primary/60 uppercase mb-4">
              Building in Public
            </h2>
            <h3 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none mb-6">
              Open Source
            </h3>
            <p className="text-xl opacity-60 leading-relaxed">
              A selection of my public projects
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repositories.map((node) => (
              <Repository {...node} key={node.id} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
