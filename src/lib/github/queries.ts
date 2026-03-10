export type IUser = {
  id: string;
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  company: string;
  companyHTML: string;
  twitterUsername: string;
};

export type IUserDetail = {
  viewer: IUser;
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
