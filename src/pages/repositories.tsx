import fs from 'fs';
import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';

import colors from 'language-colors';
import client from '../lib/client';

const filterFnc = (r) =>
  !r.archived &&
  !r.disabled &&
  !r.fork &&
  r.id !== 315016385 &&
  r.name !== 'simonecorsi.dev';

export async function getStaticProps() {
  let data;

  if (process.env.NODE_ENV !== 'production') {
    data = JSON.parse(await fs.promises.readFile('data/repos.json', 'utf-8'));
  } else {
    data = await client('https://api.github.com/users/simonecorsi/repos', {
      searchParams: {
        per_page: 100,
        page: 1,
        sort: 'updated',
      },
    }).json();

    for (const repo of data) {
      if (repo.languages_url) {
        repo.languages = await client(repo.languages_url).json();
      }
    }
  }

  // don't parallelize to avoid rate limit

  return { props: { data: data.filter(filterFnc) } };
}

const LanguageList = ({ languages }) => {
  console.log('languages :>> ', languages);
  if (!Object.keys(languages).length) return null;

  const total: number = Object.values(languages).reduce(
    (acc: number, v: number): number => acc + v,
    0
  ) as number;

  const parsed = Object.entries(
    languages
  ).map(([key, value]: [string, number]) => [
    key,
    Math.round((value / total) * 100),
  ]);

  return (
    <div className="lang-map">
      <h6 className="title">Languages</h6>
      <div className="lang-bars">
        {parsed.map(([lang, percent]: [string, number]) => (
          <div
            className="bar"
            style={{
              width: `${percent}%`,
              background: colors[lang.toLowerCase()],
            }}
          ></div>
        ))}
      </div>
      <ul>
        {parsed.map(([lang]: [string]) => (
          <li>
            <span
              className="dot"
              style={{ background: colors[lang.toLowerCase()] }}
            ></span>
            {lang}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Bookmarks({ data }) {
  return (
    <Layout>
      <BasicMeta url={'/repositories.html'} />
      <OpenGraphMeta url={'/repositories.html'} />
      <TwitterCardMeta url={'/repositories.html'} />
      <div className="page-container repositories">
        <div className="repos-list">
          {data.map((repo) => (
            <div className="repo">
              <h3 className="name">{repo.full_name}</h3>
              <i className="desc">{repo.description}</i>
              <LanguageList languages={repo.languages} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
