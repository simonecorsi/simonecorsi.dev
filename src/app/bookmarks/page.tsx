import { proxyCache } from 'lib/cache';
import { getStarredRepos } from 'lib/github/graphql';
import { baseMetadata, openGraphMetadata, twitterMetadata } from 'lib/metadata';
import Bookmarks from 'components/Bookmarks';

async function getData() {
  const body = await proxyCache('stars', getStarredRepos);

  return {
    languages: Array.from(
      new Set(body.map((r) => r?.primaryLanguage?.name).filter(Boolean))
    ),
    data: body,
  };
}

export const metadata = {
  ...baseMetadata({ url: '/bookmarks' }),
  ...twitterMetadata({ url: '/bookmarks' }),
  ...openGraphMetadata({ url: '/bookmarks' }),
};

export default async function BookmarkPage() {
  const { languages, data } = await getData();
  return (
    <div className="page-container bookmarks">
      <Bookmarks languages={languages} data={data} />
    </div>
  );
}
