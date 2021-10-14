import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import marked from 'marked';
import { githubWeb } from '../lib/client';

export async function getStaticProps() {
  const body = (
    await githubWeb.get(
      'https://raw.githubusercontent.com/simonecorsi/simonecorsi/main/README.md'
    )
  ).body;

  return { props: { data: marked(body) } };
}

export default function Index({ data }) {
  return (
    <Layout>
      <BasicMeta url={'/about.html'} />
      <OpenGraphMeta url={'/about.html'} />
      <TwitterCardMeta url={'/about.html'} />
      <div className="page-container">
        <div className="content" dangerouslySetInnerHTML={{ __html: data }} />
      </div>
    </Layout>
  );
}
