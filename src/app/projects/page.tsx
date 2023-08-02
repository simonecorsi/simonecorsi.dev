import { getUserRepositories } from 'lib/github/graphql';
import { Repository } from 'components/Repository';
import { proxyCache } from 'lib/cache';
import { IRepository } from 'lib/github/queries';
import { baseMetadata, openGraphMetadata, twitterMetadata } from 'lib/metadata';

async function getData() {
  let repositories: IRepository[] = await proxyCache(
    'repositories',
    getUserRepositories
  );

  return { repositories };
}

export const metadata = {
  ...baseMetadata({ url: '/projects' }),
  ...twitterMetadata({ url: '/projects' }),
  ...openGraphMetadata({ url: '/projects' }),
};

export default async function Repositories() {
  const { repositories } = await getData();
  return (
    <div className="page-container repositories">
      <div className="content">
        <div className="repositories-list">
          {repositories.map((node) => (
            <Repository {...node} key={node.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
