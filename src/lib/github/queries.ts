export type IUserDetail = {
  viewer: {
    id: string;
    login: string;
    name: string;
    avatarUrl: string;
    bio: string;
    company: string;
    companyHTML: string;
    twitterUsername: string;
  };
};

export const USER_DETAIL_QUERY = /* GraphQL */ `
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
`;

type Topic = {
  topic: {
    name: string;
  };
};
export type IRepository = {
  id: string;
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  isArchived: boolean;
  isDisabled: boolean;
  primaryLanguage: null | {
    name: string;
  };
  latestRelease: null | {
    name?: string;
    id: string;
  };
  repositoryTopics: {
    nodes: Topic[];
  };
  licenseInfo: null | {
    nickname?: string;
    name?: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type RepositoriesResponse = {
  viewer: { repositories: { nodes: IRepository[] } };
  rateLimit: {
    remaining: number;
    resetAt: number;
  };
};

export const USER_REPOSITORIES_QUERY = /* GraphQL */ `
  {
    rateLimit {
      remaining
      resetAt
    }
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
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export type StarredRepoResponse = {
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
  rateLimit: {
    remaining: number;
    resetAt: number;
  };
};
export type StarredRepo = {
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
export const USER_STARS_QUERY = /* GraphQL */ `
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
    rateLimit {
      remaining
      resetAt
    }
  }
`;

export type IAvatar = {
  viewer: {
    avatarUrl?: string;
  };
};
export const AVATAR_QUERY = /* GraphQL */ `
  {
    viewer {
      avatarUrl
    }
  }
`;

export type ReadmeResponse = {
  repository: {
    object: { text: string };
  };
};
export const USER_README_QUERY = /* GraphQL */ `
  query Readme($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      object(expression: "main:README.md") {
        ... on Blob {
          id
          text
        }
      }
    }
  }
`;
