import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import { SocialList } from '../components/SocialList';
import React from 'react';
import client from '../lib/client';

export async function getStaticProps() {
  const { body } = await client.get(
    'https://api.github.com/users/simonecorsi',
    {
      responseType: 'json',
    }
  );
  return { props: { user: body } };
}

export default function Index({ user }) {
  return (
    <Layout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <div className="page-container home">
        <div style={{ textAlign: 'center' }}>
          <img
            className="avatar"
            height="150px"
            width="150px"
            src={user.avatar_url}
            alt={`Avatar of ${user.name}`}
          />
          <h1>Hi, I'm {user.name}</h1>
          <h2>
            {user.company} <br /> {user.location}
          </h2>
          <SocialList user={user} />
        </div>
      </div>
    </Layout>
  );
}
