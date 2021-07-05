import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import marked from 'marked';
import fs from 'fs';
import client from '../lib/client';

export async function getStaticProps() {
  const cheerio = require('cheerio');
  let body;
  if (process.env.NODE_ENV !== 'production') {
    body = await fs.promises.readFile('data/stars.md', 'utf-8');
  } else {
    const response = await client.get(
      'https://raw.githubusercontent.com/simonecorsi/awesome/develop/README.md'
    );
    body = response.body;
  }

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
      <div className="page-container bookmarks">
        <div className="content" dangerouslySetInnerHTML={{ __html: data }} />
      </div>
    </Layout>
  );
}
