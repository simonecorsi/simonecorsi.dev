import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import { SocialList } from '../components/SocialList';
import React from 'react';
import { githubWeb } from '../lib/client';
import config from 'lib/config';
import { graphql } from '@octokit/graphql';

export async function getStaticProps() {
  const response = (await graphql(
    `
      {
        viewer {
          id
          login
          name
          avatarUrl
          bio
          company
          companyHTML
          twitterUsername
        }
      }
    `,
    {
      headers: {
        authorization: `token ` + process.env.GH_APIKEY,
      },
    }
  )) as any;

  return { props: { user: response.viewer } };
}

export default function Index({ user }) {
  const { bio, name, avatarUrl, companyHTML, login, twitterUsername } = user;
  return (
    <Layout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <div className="page-container home">
        <div>
          <img className="avatar" src={avatarUrl} alt={`Avatar of ${name}`} />
          <h1>Hi, I'm {name}</h1>
          <h2>{bio}</h2>
          <span dangerouslySetInnerHTML={{ __html: companyHTML }} />
          <SocialList login={login} twitterUsername={twitterUsername} />
        </div>
      </div>
    </Layout>
  );
}
