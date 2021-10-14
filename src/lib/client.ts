import got from 'got';

export const githubApi = got.extend({
  prefixUrl: 'https://api.github.com/',
  headers: {
    Authorization: `token ${process.env.GH_APIKEY}`,
  },
});

export const githubWeb = got.extend({
  headers: {
    Authorization: `token ${process.env.GH_APIKEY}`,
  },
});

export default got;
