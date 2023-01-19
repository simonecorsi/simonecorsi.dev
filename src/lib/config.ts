import config from '../../config.js';

type Config = {
  readonly base_url: string;
  readonly site_title: string;
  readonly site_description: string;
  readonly site_keywords: { keyword: string }[];
  readonly twitter_account: string;
  readonly github_account: string;
  readonly linkedin_account: string;
  readonly routes: {
    path: string;
    label: string;
    blank: boolean | undefined;
  }[];
};

export default config as Config;
