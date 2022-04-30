import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import client from '../lib/client';
import { useState } from 'react';
import colors from 'language-colors';
import config from 'lib/config';

let RESPONSE_CACHE = null; // this is of develop reloads
export async function getStaticProps() {
  if (RESPONSE_CACHE) return RESPONSE_CACHE;
  const response = await client.get(
    `https://raw.githubusercontent.com/${config.github_account}/awesome/develop/data.json`
  );
  const body = JSON.parse(response.body);
  RESPONSE_CACHE = { props: { languages: Object.keys(body), data: body } };
  return RESPONSE_CACHE;
}

const all = (data, languages) =>
  languages.reduce((acc, lang) => {
    return [...acc, ...data[lang]];
  }, []);

export default function Bookmarks({ languages, data }) {
  const [useLang, setLang] = useState(null);

  const repositories = !useLang ? all(data, languages) : data[useLang];

  return (
    <Layout>
      <BasicMeta url={'/bookmarks'} />
      <OpenGraphMeta url={'/bookmarks'} />
      <TwitterCardMeta url={'/bookmarks'} />
      <div className="page-container bookmarks">
        <div className="content">
          <h2>{useLang || ''} Bookmarks</h2>
          <p>
            This is a collection of all the repositories I've starred over the
            time! The list is automatically updated every night! If you would
            like to have your personal list you can use my{' '}
            <a
              href="https://github.com/marketplace/actions/my-awesome-list"
              target="_blank"
            >
              github action
            </a>
            !
          </p>
          <h4 style={{ marginBottom: 0 }}>Filter by language:</h4>
          <div>
            <span
              style={{
                marginRight: 5,
                fontWeight: useLang === null ? 'bold' : 'lighter',
              }}
            >
              <a href={`#all`} onClick={() => setLang(null)}>
                All
              </a>
            </span>
            {languages.map((l) => (
              <span
                key={l}
                style={{
                  marginRight: 5,
                  fontWeight: useLang === l ? 'bold' : 'lighter',
                }}
              >
                <a
                  href={`#${l}`}
                  onClick={() => setLang(l)}
                  style={{
                    color: useLang === l ? colors[l.toLowerCase()] : 'inherit',
                  }}
                >
                  {l}
                </a>
              </span>
            ))}
          </div>
          <h4 style={{ marginBottom: 0 }}>
            Repositories <i>({repositories.length})</i> :
          </h4>
          <div>
            {
              <ul>
                {repositories.map((repo) => (
                  <li key={repo.id}>
                    <a href={repo.html_url}>{repo.full_name}</a> -{' '}
                    {repo.description}
                  </li>
                ))}
              </ul>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
}
