import got from 'got';

const client = got.extend({
  headers: {
    'api-key': process.env.DEVTO_APIKEY,
  },
});

export async function getUserPublicBlogPosts() {
  const iterator = client.paginate('https://dev.to/api/articles/me');

  let posts = [];
  for await (const page of iterator) {
    posts = posts.concat(page);
  }
  return posts;
}

export async function getSinglePosts(username, slug) {
  return client.get(`https://dev.to/api/articles/${username}/${slug}`).json();
}
