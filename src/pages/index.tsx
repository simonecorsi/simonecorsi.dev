import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import { SocialList } from '../components/SocialList';
import React from 'react';
import Img from 'next/image';
import { getBase64Avatar, getUserDetails } from 'lib/github-graphql';

export async function getStaticProps() {
  const avatar = await getBase64Avatar();
  return { props: { avatar, user: await getUserDetails() } };
}

export default function Index({ user, avatar }) {
  const { bio, name, slogin, twitterUsername } = user;
  return (
    <Layout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <div className="page-container home">
        <div>
          <Img
            className="avatar"
            src={avatar}
            alt={`Avatar of ${name}`}
            width={150}
            height={150}
          />
          <h1>Hi, I'm {name}</h1>
          <h2>{bio}</h2>
          {/* <span dangerouslySetInnerHTML={{ __html: companyHTML }} /> */}
          <SocialList {...user} />
        </div>
      </div>
    </Layout>
  );
}
