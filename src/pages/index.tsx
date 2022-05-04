import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import { SocialList } from '../components/SocialList';
import { getBase64Avatar, getUserDetails } from 'lib/github/graphql';
import { proxyCache } from 'lib/cache';

export async function getStaticProps() {
  const avatar = await proxyCache('avatar', getBase64Avatar);
  const user = await proxyCache('user', getUserDetails);
  return { props: { avatar, user } };
}

const Wave = ({ name }) => <h1>{name}</h1>;
const Bio = ({ bio }) => <h2>{bio}</h2>;
const Avatar = ({ name, avatar }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    className="avatar"
    src={avatar}
    alt={`Avatar of ${name}`}
    width="150px"
    height="150px"
  />
);

export default function Index({ user, avatar }) {
  return (
    <Layout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <div className="page-container home">
        <div className="content">
          <Avatar name={user.name} avatar={avatar} />
          <Wave {...user} />
          <Bio {...user} />
          {/* <span dangerouslySetInnerHTML={{ __html: companyHTML }} /> */}
          <SocialList {...user} />
        </div>
      </div>
    </Layout>
  );
}
