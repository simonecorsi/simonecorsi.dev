import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import got from 'got';

const filterFnc = (r) =>
  !r.archived &&
  !r.disabled &&
  !r.fork &&
  r.id !== 315016385 &&
  r.name !== 'simonecorsi.dev';

export async function getStaticProps() {
  const data: any[] = await got(
    'https://api.github.com/users/simonecorsi/repos',
    {
      searchParams: {
        per_page: 100,
        page: 1,
        sort: 'updated',
      },
    }
  ).json();

  return { props: { data: data.filter(filterFnc) } };
}

export default function Bookmarks({ data }) {
  return (
    <Layout>
      <BasicMeta url={'/repositories.html'} />
      <OpenGraphMeta url={'/repositories.html'} />
      <TwitterCardMeta url={'/repositories.html'} />
      <div className="container repositories">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Layout>
  );
}
