import { Repository } from "components/Repository";
import { proxyCache } from "lib/cache";
import { getUserRepositories } from "lib/github/graphql";
import type { IRepository } from "lib/github/queries";
import { getMetadata } from "lib/metadata";

export const metadata = getMetadata("/projects");

async function getData() {
  const repositories = await proxyCache<IRepository[]>(
    "repositories",
    getUserRepositories,
  );

  return { repositories };
}

export default async function Repositories() {
  const { repositories } = await getData();
  return (
    <div className="min-h-screen py-16 px-4 lg:px-8 max-w-6xl mx-auto">
      <div className="space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold flex items-center gap-4">
            🏗️ Projects
          </h1>
          <p className="text-lg opacity-70 leading-relaxed max-w-3xl">
            A selection of my public open source projects on GitHub.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {repositories.map((node) => (
            <Repository {...node} key={node.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
