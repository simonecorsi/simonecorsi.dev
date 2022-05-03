import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import { useEffect, useState } from 'react';
import colors from 'language-colors';
import { proxyCache } from 'lib/cache';
import { stars } from 'lib/github-graphql';

export async function getStaticProps() {
  const body = await proxyCache('stars', stars);

  return {
    props: {
      languages: Array.from(
        new Set(body.map((r) => r?.primaryLanguage?.name).filter(Boolean))
      ),
      data: body,
    },
  };
}

export default function Bookmarks({ languages, data }) {
  const [useLang, setLang] = useState(null);
  const [useRepos, setRepos] = useState(data);

  useEffect(() => {
    setRepos(
      !useLang
        ? data
        : data.filter((r) =>
            r?.primaryLanguage?.name.match(new RegExp(useLang, 'i'))
          )
    );
  }, [data, useLang]);

  return (
    <Layout>
      <BasicMeta url={'/bookmarks/'} />
      <OpenGraphMeta url={'/bookmarks/'} />
      <TwitterCardMeta url={'/bookmarks/'} />
      <div className="page-container bookmarks">
        <div className="content">
          <h2>{useLang || ''} Bookmarks</h2>
          <p>
            This is a collection of all the repositories I&apos;ve starred over
            the time! The list is automatically updated every night! If you
            would like to have your personal list you can use my
            <a
              href="https://github.com/marketplace/actions/my-awesome-list"
              target="_blank"
              rel="noreferrer"
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
            Repositories <i>({useRepos.length})</i> :
          </h4>
          <div>
            {
              <ul>
                {useRepos.map((r) => (
                  <li key={r.id}>
                    <a href={r.url}>{r.nameWithOwner}</a> - {r.description}
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
