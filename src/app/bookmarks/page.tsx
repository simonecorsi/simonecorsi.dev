import Bookmarks from "components/Bookmarks";
import dayjs from "dayjs";
import { proxyCache } from "lib/cache";
import { getStarredRepos } from "lib/github/graphql";
import { baseMetadata, openGraphMetadata, twitterMetadata } from "lib/metadata";

async function getData() {
  const body = await proxyCache("stars", getStarredRepos);

  const starred = body.filter((r) =>
    dayjs(r.pushedAt).isAfter(dayjs().subtract(2, "years")),
  );

  const languages = Array.from(
    new Set(starred.map((r) => r?.primaryLanguage?.name).filter(Boolean)),
  );

  return {
    languages,
    data: starred,
  };
}

export const metadata = {
  ...baseMetadata({ url: "/bookmarks" }),
  ...twitterMetadata({ url: "/bookmarks" }),
  ...openGraphMetadata({ url: "/bookmarks" }),
};

export default async function BookmarkPage() {
  const { languages, data } = await getData();
  return (
    <div className="page-container bookmarks">
      <Bookmarks languages={languages} data={data} />
    </div>
  );
}
