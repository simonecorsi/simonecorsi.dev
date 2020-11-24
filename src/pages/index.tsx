import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import { SocialList } from "../components/SocialList";
import got from 'got';

export async function getStaticProps() {
  const { body } = await got.get("https://api.github.com/users/simonecorsi", {
    responseType: 'json',
  })
  return {props:{ user:body }}
}

export default function Index({user}) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <img className="avatar" src={user.avatar_url} alt={`Avatar of ${user.name}`}/>
          <h1>
            Hi, I'm {user.name} 👋
          </h1>
          <h2>
            {user.company} <br/> {user.location}
          </h2>
          <SocialList user={user}/>
          
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          padding: 0 1.5rem;
        }
        h1 {
          font-size: 2.25rem;
          margin: 0;
          font-weight: 600;
        }
        h2 {
          font-size: 1.125rem;
          font-weight: 300;
          line-height: 1.25;
          color: #9b9b9b;
          letter-spacing: 0.05em;
          margin: .25rem 0 1rem 0 ;
        }
        @media (min-width: 769px) {
          h1 {
            font-size: 3rem;
          }
          h2 {
            font-size: 1.125rem;
          }
        }
        .avatar{
          display: inline-block;
          overflow: hidden;
          line-height: 1;
          vertical-align: middle;
          border-radius: 6px;
          box-shadow: 0 0 0 1px var(--color-avatar-border);
          border-radius: 50% !important;
          max-width: 150px;
          width: 100%;
          border: 5px solid white;
        }
      `}</style>
    </Layout>
  );
}
