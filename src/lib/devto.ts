import got from "got";

export interface DevToPost {
  id: number;
  title: string;
  slug: string;
  published_at: string;
  created_at: string;
  tags: string[];
  body_markdown: string;
}

const client = got.extend({
  headers: {
    "api-key": process.env.DEVTO_APIKEY,
  },
});

export async function getUserPublicBlogPosts(): Promise<DevToPost[]> {
  const iterator = client.paginate<DevToPost[]>(
    "https://dev.to/api/articles/me",
  );

  let posts: DevToPost[] = [];
  for await (const page of iterator) {
    posts = posts.concat(page as unknown as DevToPost[]);
  }
  return posts;
}

export async function getSinglePosts(
  username: string,
  slug: string,
): Promise<DevToPost> {
  return client
    .get(`https://dev.to/api/articles/${username}/${slug}`)
    .json() as Promise<DevToPost>;
}
