import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import got from 'got';
import marked from 'marked';

export async function getStaticProps() {
  const fs = await import('fs/promises');
  let body;

  if (process.env.NODE_ENV !== 'production') {
    body = await fs.readFile('data/about.md', 'utf-8');
  } else {
    body = await got.get(
      'https://raw.githubusercontent.com/simonecorsi/simonecorsi/main/README.md'
    );
  }

  return { props: { data: marked(body) } };
}

export default function Index({ data }) {
  return (
    <Layout>
      <BasicMeta url={'/about.html'} />
      <OpenGraphMeta url={'/about.html'} />
      <TwitterCardMeta url={'/about.html'} />
      <div className="container">
        <div className="content" dangerouslySetInnerHTML={{ __html: data }} />
      </div>
    </Layout>
  );
}
