import fs from 'fs';
import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';

import colors from 'language-colors';
import { graphql } from '@octokit/graphql';

const excludeRepo = ({ node }) => {
  return (
    !node.archived &&
    !node.disabled &&
    !node.fork &&
    node.id !== 315016385 &&
    node.name !== 'simonecorsi.dev'
  );
};

const excerpt = (str = '') =>
  typeof str === 'string' && str.length >= 140
    ? str.substring(0, 140) + ' [...]'
    : str;

export async function getStaticProps() {
  let data = [];

  if (process.env.NODE_ENV !== 'production') {
    data = JSON.parse(await fs.promises.readFile('./data/repos.json', 'utf8'));
  } else {
    ({
      viewer: {
        repositories: { edges: data },
      },
    } = await graphql({
      query: `
      {
        viewer {
          repositories(
            orderBy: { field: STARGAZERS, direction: DESC }
            privacy: PUBLIC
            first: 100
          ) {
            edges {
              node {
                id,
                name,
                description,
                nameWithOwner,
                stargazerCount,
                url,
                isArchived,
                isDisabled,
                isFork,	
                primaryLanguage {
                  name
                }
              }
            }
          }
        }
      }
    `,
      headers: {
        authorization: `token ` + process.env.GH_APIKEY,
      },
    }));
  }

  return { props: { data: data.filter(excludeRepo) } };
}

const InfoList = ({ language, stargazers_count }) => {
  return (
    <div className="info-list">
      {!!stargazers_count && (
        <span className="starcount">☆ {stargazers_count}</span>
      )}
      {!!language && (
        <span className="lang-wrp" key={language}>
          <span
            className="dot"
            style={{ background: colors[language.toLowerCase()] }}
          ></span>
          <span className="lang">{language}</span>
        </span>
      )}
    </div>
  );
};

export default function Repositories({ data }) {
  return (
    <Layout>
      <BasicMeta url={'/repositories.html'} />
      <OpenGraphMeta url={'/repositories.html'} />
      <TwitterCardMeta url={'/repositories.html'} />
      <div className="page-container repositories">
        <div className="content">
          <div className="repositories-list">
            {data.map(({ node }) => (
              <div className="repository-card" key={node.nameWithOwner}>
                <a href={node.url} target="_blank">
                  <h3 className="name">{node.nameWithOwner}</h3>
                  <div className="desc">{excerpt(node.description)}</div>
                </a>
                <InfoList
                  language={node.primaryLanguage?.name}
                  stargazers_count={node.stargazerCount}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
