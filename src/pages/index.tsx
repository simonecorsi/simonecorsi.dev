import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import { SocialList } from '../components/SocialList';
import got from 'got';
import React from 'react';

export async function getStaticProps() {
  const { body } = await got.get('https://api.github.com/users/simonecorsi', {
    responseType: 'json',
  });
  return { props: { user: body } };
}

export default function Index({ user, bio }) {
  return (
    <Layout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <div className="container home">
        <div style={{ textAlign: 'center' }}>
          <img
            className="avatar"
            src={user.avatar_url}
            alt={`Avatar of ${user.name}`}
          />
          <h1>
            Hi, I'm {user.name}{' '}
            <img
              src="https://raw.githubusercontent.com/MartinHeinz/MartinHeinz/master/wave.gif"
              height="50px"
            />
          </h1>
          <h2>
            {user.company} <br /> {user.location}
          </h2>
          <SocialList user={user} />
        </div>
      </div>
    </Layout>
  );
}
