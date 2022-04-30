import fs from 'fs';
import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import config from 'lib/config';

import colors from 'language-colors';
import { githubWeb, githubApi } from '../lib/client';

const excludeRepo = (r) =>
  !r.archived &&
  !r.disabled &&
  !r.fork &&
  r.id !== 315016385 &&
  r.name !== 'simonecorsi.dev';

const excerpt = (str = '') =>
  typeof str === 'string' && str.length >= 140
    ? str.substring(0, 140) + ' [...]'
    : str;

export async function getStaticProps() {
  let data;

  if (process.env.NODE_ENV !== 'production') {
    data = JSON.parse(await fs.promises.readFile('data/repos.json', 'utf-8'));
  } else {
    data = await githubApi(`users/${config.github_account}/repos`, {
      searchParams: {
        per_page: 200,
        page: 1,
        sort: 'updated',
      },
    }).json();

    // don't parallelize to avoid rate limit
    for (const repo of data) {
      if (repo.languages_url) {
        repo.languages = await githubWeb(repo.languages_url).json();
      }
    }
  }

  return { props: { data: data.filter(excludeRepo) } };
}

const LanguageList = ({ languages }) => {
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
      <h3 className="title">Languages</h3>
      <div className="lang-bars">
        {parsed.map(([lang, percent]: [string, number]) => (
          <div
            key={lang}
            className="bar"
            style={{
              width: `${percent}%`,
              background: colors[lang.toLowerCase()],
            }}
          ></div>
        ))}
      </div>
      {parsed.map(([lang]: [string]) => (
        <span className="lang-wrp" key={lang}>
          <span
            className="dot"
            style={{ background: colors[lang.toLowerCase()] }}
          ></span>
          <span className="lang">{lang}</span>
        </span>
      ))}
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
        <div className="content">
          <div className="repositories-list">
            {data.map((r) => (
              <div className="repository-card" key={r.full_name}>
                <a href={r.html_url} target="_blank">
                  <h3 className="name">{r.full_name}</h3>
                  <i className="desc">{excerpt(r.description)}</i>
                </a>
                <LanguageList languages={r.languages} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
