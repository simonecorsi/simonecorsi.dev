import { graphql as Graphql } from "@octokit/graphql";
import dayjs from "dayjs";
import got from "got";

import { setTimeout } from "node:timers/promises";
import relativeTime from "dayjs/plugin/relativeTime";
import config from "lib/config";
import {
  AVATAR_QUERY,
  type IAvatar,
  type IRepository,
  type IUserDetail,
  type ReadmeResponse,
  type RepositoriesResponse,
  type StarredRepo,
  type StarredRepoResponse,
  USER_DETAIL_QUERY,
  USER_README_QUERY,
  USER_REPOSITORIES_QUERY,
  USER_STARS_QUERY,
} from "./queries";

dayjs.extend(relativeTime);

export const graphql = Graphql.defaults({
  headers: {
    authorization: `token ${process.env.GH_APIKEY}`,
  },
});

function filterRepositories(node: IRepository): boolean {
  const isOldAndUgly =
    node.stargazerCount < 5 &&
    dayjs(node.createdAt).isBefore(dayjs().subtract(2, "years"));

  return (
    !isOldAndUgly && node.id !== "315016385" && !node.name.match("simonecorsi")
  );
}

export async function getUserRepositories() {
  while (true) {
    try {
      const {
        viewer: { repositories },
        rateLimit,
      } = await graphql<RepositoriesResponse>(USER_REPOSITORIES_QUERY);

      console.log(`Remaining rate limit: ${rateLimit.remaining}`);

      if (rateLimit.remaining < 10) {
        const resetTime = new Date(rateLimit.resetAt).getTime();
        const waitTime = resetTime - Date.now();
        console.warn(
          `Rate limit low! Waiting ${Math.ceil(waitTime / 1000)}s...`,
        );
        await setTimeout(waitTime);
        continue; // Retry after waiting
      }

      return repositories.nodes.filter(filterRepositories).map((node) => ({
        ...node,
        updatedAt: dayjs(node.updatedAt).fromNow(),
      }));
    } catch (error) {
      console.error("GitHub API error:", error);

      if (error.data?.message?.includes("secondary rate limit")) {
        console.warn("Hit secondary rate limit. Pausing for 60 seconds...");
        await setTimeout(60000); // Wait 1 minute before retrying
      } else {
        throw error;
      }
    }
  }
}

export async function getUserDetails() {
  const { viewer } = await graphql<IUserDetail>(USER_DETAIL_QUERY);
  return viewer;
}

export const getBase64Avatar = async (): Promise<string> => {
  const { viewer } = await graphql<IAvatar>(AVATAR_QUERY);

  if (viewer.avatarUrl) {
    const { headers, rawBody } = await got.get(viewer.avatarUrl);
    return `data:${headers["content-type"]};base64,${Buffer.from(
      rawBody,
    ).toString("base64")}`;
  }

  return "";
};

export async function getStarredRepos() {
  let hasNextPage = true;
  let cursor = "";
  let dataset: StarredRepo[] = [];
  const delay = 1000; // Start with 5 seconds

  while (hasNextPage) {
    try {
      const {
        viewer: { starredRepositories },
        rateLimit,
      } = await graphql<StarredRepoResponse>(USER_STARS_QUERY, {
        after: cursor,
      });

      dataset = dataset.concat(starredRepositories.nodes);
      hasNextPage = !!starredRepositories.pageInfo.hasNextPage;
      cursor = starredRepositories.pageInfo.endCursor;

      console.log(
        `Fetched ${dataset.length} stars. Remaining rate limit: ${rateLimit.remaining}`,
      );

      if (process.env.NODE_ENV !== "production") break;

      // Prevent secondary rate limiting by ensuring a fixed delay
      await setTimeout(delay);
    } catch (error) {
      console.error("GitHub API error:", error);

      // Check if it's a secondary rate limit error
      if (error.data?.message?.includes("secondary rate limit")) {
        console.warn("Hit secondary rate limit. Pausing for 60 seconds...");
        await setTimeout(60000); // Wait 1 minute before retrying
      } else {
        throw error;
      }
    }
  }

  return dataset;
}

export async function getPersonalBioReadme() {
  const {
    repository: {
      object: { text },
    },
  } = await graphql<ReadmeResponse>(USER_README_QUERY, {
    owner: config.github_account,
    name: config.github_account,
  });

  return text;
}
