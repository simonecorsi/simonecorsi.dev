import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';

import {
  getUserRepositories,
  Repository as RepositoryType,
} from 'lib/github-graphql';
import { Repository } from 'components/Repository';

export async function getStaticProps() {
  let repositories: RepositoryType[] = await getUserRepositories();

  return { props: { repositories } };
}

export default function Repositories({ repositories }) {
  return (
    <Layout>
      <BasicMeta url={'/repositories/'} />
      <OpenGraphMeta url={'/repositories/'} />
      <TwitterCardMeta url={'/repositories/'} />
      <div className="page-container repositories">
        <div className="content">
          <div className="repositories-list">
            {repositories.map((node) => (
              <Repository {...node} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
