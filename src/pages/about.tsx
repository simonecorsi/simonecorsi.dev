import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import marked from 'marked';
import { githubWeb } from '../lib/client';
import config from 'lib/config';

export async function getStaticProps() {
  const body = (
    await githubWeb.get(
      `https://raw.githubusercontent.com/${config.github_account}/${config.github_account}/main/README.md`
    )
  ).body;

  return { props: { data: marked(body) } };
}

export default function Index({ data }) {
  return (
    <Layout>
      <BasicMeta url={'/about/'} />
      <OpenGraphMeta url={'/about/'} />
      <TwitterCardMeta url={'/about/'} />
      <div className="page-container">
        <div className="content" dangerouslySetInnerHTML={{ __html: data }} />
      </div>
    </Layout>
  );
}
