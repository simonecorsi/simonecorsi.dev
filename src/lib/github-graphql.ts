import { graphql } from '@octokit/graphql';
import dayjs from 'dayjs';
import got from 'got';

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const headers = {
  authorization: `token ` + process.env.GH_APIKEY,
};

const gql = (str) => str.join();

const excludeRepo = (node) => {
  return (
    // !node.isArchived &&
    // !node.isDisabled &&
    node.id !== 315016385 && node.name !== 'simonecorsi.dev'
  );
};

export type Repository = Partial<{
  id: string;
  name: string;
  description: string;
  stargazerCount: string;
  url: string;
  isArchived: boolean;
  isDisabled: boolean;
  primaryLanguage: {
    name?: string;
  };
  latestRelease: {
    name?: string;
    id: string;
  };
  repositoryTopics: {
    nodes?: {
      topic?: {
        name?: string;
      };
    };
  };
  licenseInfo: {
    nickname?: string;
    name?: string;
  };
  updatedAt: string;
}>;

export const getUserRepositories = async (): Promise<Repository[]> => {
  const {
    viewer: {
      repositories: { nodes },
    },
  } = await graphql(
    gql`
      {
        viewer {
          repositories(
            orderBy: { field: STARGAZERS, direction: DESC }
            first: 50
            isFork: false
            isLocked: false
            privacy: PUBLIC
          ) {
            nodes {
              id
              name
              description
              stargazerCount
              url
              isArchived
              isDisabled
              primaryLanguage {
                name
              }
              latestRelease {
                name
                id
              }
              repositoryTopics(first: 20) {
                nodes {
                  topic {
                    name
                  }
                }
              }
              licenseInfo {
                nickname
                name
              }
              updatedAt
            }
          }
        }
      }
    `,
    {
      headers,
    }
  );

  const repositories = nodes
    .map((node) => ({
      ...node,
      updatedAt: dayjs(node.updatedAt).fromNow(),
    }))
    .filter(excludeRepo);

  return repositories;
};

export type UserDefails = {
  id: string;
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  company: string;
  companyHTML: string;
  twitterUsername: string;
};
export const getUserDetails = async (): Promise<Partial<UserDefails>> => {
  const { viewer } = await graphql(
    gql`
      {
        viewer {
          id
          login
          name
          bio
          company
          companyHTML
          twitterUsername
        }
      }
    `,
    {
      headers,
    }
  );

  return viewer;
};

export const getBase64Avatar = async (): Promise<string> => {
  const { viewer } = await graphql(
    gql`
      {
        viewer {
          avatarUrl
        }
      }
    `,
    {
      headers,
    }
  );

  if (viewer.avatarUrl) {
    const { headers, rawBody } = await got.get(viewer.avatarUrl);
    return `data:${headers['content-type']};base64,${Buffer.from(
      rawBody
    ).toString('base64')}`;
  }

  return '';
};

type StarredRepoResponse = {
  viewer: {
    starredRepositories: {
      pageInfo: {
        endCursor: string;
        hasNextPage: string;
      };
      totalCount: number;
      nodes: StarredRepo[];
    };
  };
};
type StarredRepo = {
  nodes: {
    id: string;
    nameWithOwner: string;
    description: string;
    url: string;
    primaryLanguage: {
      name: string;
    };
  };
};
export const stars = async (): Promise<any[]> => {
  let hasNextPage;
  let cursor = '';
  let dataset = [];
  do {
    console.log('star pagination', cursor);
    const {
      viewer: {
        starredRepositories: { pageInfo, nodes },
      },
    }: StarredRepoResponse = await graphql(
      gql`
        query Star($after: String = "") {
          viewer {
            starredRepositories(after: $after, first: 100) {
              pageInfo {
                endCursor
                hasNextPage
              }
              totalCount
              nodes {
                id
                nameWithOwner
                description
                url
                primaryLanguage {
                  name
                }
              }
            }
          }
        }
      `,
      {
        headers,
        after: cursor,
      }
    );
    hasNextPage = pageInfo.hasNextPage;
    cursor = pageInfo.endCursor;
    dataset = dataset.concat(nodes);
    if (process.env.NODE_ENV !== 'production') break;
  } while (hasNextPage);
  return dataset;
};
