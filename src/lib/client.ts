import got from 'got';

export const githubApi = got.extend({
  prefixUrl: 'api.github.com',
  username: process.env.GH_USERNAME,
  password: process.env.GH_APIKEY,
});

export default got;
