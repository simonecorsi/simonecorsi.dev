import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import got from 'got';
import marked from 'marked';

export async function getStaticProps() {
  const cheerio = require('cheerio');

  const { body } = await got.get(
    'https://raw.githubusercontent.com/simonecorsi/awesome/develop/README.md'
  );
  let data = marked(body);
  const $ = cheerio.load(data);
  $('h1').remove();
  $('blockquote').remove();
  return { props: { data: $.html() } };
}

export default function Bookmarks({ data }) {
  return (
    <Layout>
      <BasicMeta url={'/bookmarks.html'} />
      <OpenGraphMeta url={'/bookmarks.html'} />
      <TwitterCardMeta url={'/bookmarks.html'} />
      <div className="container bookmarks">
        <div className="content" dangerouslySetInnerHTML={{ __html: data }} />
      </div>
    </Layout>
  );
}
