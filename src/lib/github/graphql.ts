import { graphql as Graphql } from '@octokit/graphql';
import dayjs from 'dayjs';
import got from 'got';

import relativeTime from 'dayjs/plugin/relativeTime';
import {
  USER_DETAIL_QUERY,
  USER_REPOSITORIES_QUERY,
  USER_STARS_QUERY,
  IUserDetail,
  RepositoriesResponse,
  IRepository,
  AVATAR_QUERY,
  IAvatar,
  StarredRepoResponse,
  StarredRepo,
  ReadmeResponse,
  USER_README_QUERY,
} from './queries';
import config from 'lib/config';

dayjs.extend(relativeTime);

export const graphql = Graphql.defaults({
  headers: {
    authorization: `token ` + process.env.GH_APIKEY,
  },
});

function filterRepositories(node: IRepository): boolean {
  const isOldAndUgly =
    node.stargazerCount < 5 &&
    dayjs(node.createdAt).isBefore(dayjs().subtract(2, 'years'));

  return (
    !isOldAndUgly && node.id !== '315016385' && !node.name.match('simonecorsi')
  );
}

export async function getUserRepositories() {
  const {
    viewer: {
      repositories: { nodes },
    },
  } = await graphql<RepositoriesResponse>(USER_REPOSITORIES_QUERY);

  const repositories = nodes.filter(filterRepositories).map((node) => ({
    ...node,
    updatedAt: dayjs(node.updatedAt).fromNow(),
  }));

  return repositories;
}

export async function getUserDetails() {
  const { viewer } = await graphql<IUserDetail>(USER_DETAIL_QUERY);
  return viewer;
}

export const getBase64Avatar = async (): Promise<string> => {
  const { viewer } = await graphql<IAvatar>(AVATAR_QUERY);

  if (viewer.avatarUrl) {
    const { headers, rawBody } = await got.get(viewer.avatarUrl);
    return `data:${headers['content-type']};base64,${Buffer.from(
      rawBody
    ).toString('base64')}`;
  }

  return '';
};

export async function getStarredRepos() {
  let hasNextPage;
  let cursor = '';
  let dataset: StarredRepo[] = [];
  do {
    const {
      viewer: {
        starredRepositories: { pageInfo, nodes },
      },
    } = await graphql<StarredRepoResponse>(USER_STARS_QUERY, {
      after: cursor,
    });
    hasNextPage = pageInfo.hasNextPage;
    cursor = pageInfo.endCursor;
    dataset = dataset.concat(nodes);
    if (process.env.NODE_ENV !== 'production') break;
  } while (hasNextPage);
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
