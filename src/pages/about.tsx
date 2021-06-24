import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import got from 'got';
import marked from 'marked';

export async function getStaticProps() {
  const { body } = await got.get(
    'https://raw.githubusercontent.com/simonecorsi/simonecorsi/main/README.md'
  );
  return { props: { data: marked(body) } };
}

export default function Index({ data }) {
  return (
    <Layout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <div className="container">
        <div className="content" dangerouslySetInnerHTML={{ __html: data }} />
      </div>
    </Layout>
  );
}
