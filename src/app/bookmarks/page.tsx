import Bookmarks from "components/Bookmarks";
import dayjs from "dayjs";
import { proxyCache } from "lib/cache";
import { getStarredRepos } from "lib/github/graphql";
import type { StarredRepo } from "lib/github/queries";
import { getMetadata } from "lib/metadata";

export const metadata = getMetadata("/bookmarks");

async function getData() {
  const body = await proxyCache<StarredRepo[]>("stars", getStarredRepos);

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

export default async function BookmarkPage() {
  const { languages, data } = await getData();
  return (
    <div className="page-container bookmarks">
      <Bookmarks languages={languages} data={data} />
    </div>
  );
}
