import { proxyCache } from "lib/cache";
import { getBase64Avatar, getUserDetails } from "lib/github/graphql";
import type { IUser } from "lib/github/queries";
import { getMetadata } from "lib/metadata";
import Image from "next/image";
import GitHub from "../assets/github-alt.svg";
import LinkedIn from "../assets/linkedin.svg";
import config from "../lib/config";

export const metadata = getMetadata("/");

async function getData() {
  const avatar = await proxyCache<string>("avatar", getBase64Avatar);
  const user = await proxyCache<IUser>("user", getUserDetails);
  return { avatar, user };
}

export default async function Index() {
  const { user, avatar } = await getData();
  const { github_account, linkedin_account } = config;

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Profile Section */}
        <div className="space-y-6">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000" />
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
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-base-content to-base-content/60">
              {user.name}
            </h1>
            <h2 className="text-lg lg:text-xl font-medium opacity-60 leading-relaxed max-w-lg mx-auto italic">
              {user.bio}
            </h2>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 justify-center pt-4">
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
    </div>
  );
}
