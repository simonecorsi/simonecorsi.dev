import Layout from "../components/Layout";
import BasicMeta from "../components/meta/BasicMeta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import got from 'got';
import showdown  from 'showdown';

export async function getStaticProps() {
  const { body } = await got.get("https://raw.githubusercontent.com/simonecorsi/simonecorsi/main/README.md")
  const converter = new showdown.Converter();
  const html = converter.makeHtml(body);
  console.log('data :>> ', html);
  return {props:{ data:html }}
}

export default function Index({data}) {
  return (
    <Layout>
      <BasicMeta url={"/"} />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <div className="container">
        <div className="content" dangerouslySetInnerHTML={{__html: data}} />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1 1 auto;
          padding: 0 1.5rem;
        }
        .content{
          max-width: 40rem;
          width:90%;
        }
        h1 {
          font-size: 2.25rem;
          margin: 0;
          font-weight: 500;
        }
        h2 {
          font-size: 1.125rem;
          font-weight: 400;
          line-height: 1.25;
        }
        .fancy {
          color: #15847d;
        }
        .bio {
          max-width: 650px;
          margin-top: 0.275em;
          margin-bottom: 1.275em;
          color: #9b9b9b;
          letter-spacing: 0.05em;
          font-weight: 300;
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
