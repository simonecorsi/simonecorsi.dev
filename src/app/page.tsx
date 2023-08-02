import { Avatar } from 'components/Avatar';
import { SocialList } from '../components/SocialList';
import { getBase64Avatar, getUserDetails } from 'lib/github/graphql';
import { proxyCache } from 'lib/cache';

async function getData() {
  const avatar = await proxyCache('avatar', getBase64Avatar);
  const user = await proxyCache('user', getUserDetails);
  return { avatar, user };
}

import { baseMetadata, openGraphMetadata, twitterMetadata } from 'lib/metadata';

export const metadata = {
  ...baseMetadata({ url: '/' }),
  ...twitterMetadata({ url: '/' }),
  ...openGraphMetadata({ url: '/' }),
};

export default async function Index() {
  const { user, avatar } = await getData();
  return (
    <div className="page-container home">
      <div className="content">
        <Avatar name={user.name} avatar={avatar} />
        <h1>{user.name}</h1>
        <h2>{user.bio}</h2>;
        {/* <span dangerouslySetInnerHTML={{ __html: companyHTML }} /> */}
        <SocialList {...user} />
      </div>
    </div>
  );
}
