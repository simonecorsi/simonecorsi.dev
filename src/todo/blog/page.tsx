import { proxyCache } from "lib/cache";
import dayjs from "lib/dayjs";
import { getUserPublicBlogPosts } from "lib/devto";
import { baseMetadata, openGraphMetadata, twitterMetadata } from "lib/metadata";
import Link from "next/link";

export const metadata = {
  ...baseMetadata({ url: "/blog" }),
  ...twitterMetadata({ url: "/blog" }),
  ...openGraphMetadata({ url: "/blog" }),
};

async function getData() {
  const posts = await proxyCache(
    "devto_blog_posts",
    getUserPublicBlogPosts.bind(null, "scdev"),
  );

  const parsed = posts.map((p) => {
    p.from_now = dayjs(p.published_at || p.created_at).fromNow();
    return p;
  });

  return {
    posts: parsed,
  };
}

export default async function BlogIndex() {
  const { posts } = await getData();
  return (
    <div className="page-container blog-posts">
      <div className="content">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <Link href={`/blog/${post.slug}`}>
              <div className="post-date" title={post.published_at}>
                {post.from_now}
              </div>
              <div className="post-title">{post.title}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
