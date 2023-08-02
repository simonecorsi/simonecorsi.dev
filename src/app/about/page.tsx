import { marked } from 'marked';
import { getPersonalBioReadme } from 'lib/github/graphql';
import { baseMetadata, openGraphMetadata, twitterMetadata } from 'lib/metadata';

async function getData() {
  const body = await getPersonalBioReadme();
  return { data: marked(body) };
}

export const metadata = {
  ...baseMetadata({ url: '/about' }),
  ...twitterMetadata({ url: '/about' }),
  ...openGraphMetadata({ url: '/about' }),
};

export default async function AboutPage() {
  const { data } = await getData();
  return (
    <div className="page-container">
      <div className="content" dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
}
