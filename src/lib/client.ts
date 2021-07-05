import got from 'got';

export default got.extend({
  username: process.env.GH_USERNAME,
  password: process.env.GH_APIKEY,
});
