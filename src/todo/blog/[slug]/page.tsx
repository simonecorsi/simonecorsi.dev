import { proxyCache } from "lib/cache";
import { getSinglePosts, getUserPublicBlogPosts } from "lib/devto";
import { baseMetadata, openGraphMetadata, twitterMetadata } from "lib/metadata";
import { marked } from "marked";

export const metadata = {
  ...baseMetadata({ url: "/blog" }),
  ...twitterMetadata({ url: "/blog" }),
  ...openGraphMetadata({ url: "/blog" }),
};

export async function generateStaticParams() {
  const posts = await proxyCache("devto_blog_posts", getUserPublicBlogPosts);
  return posts?.map(({ slug }) => ({
    slug,
    fallback: false,
  }));
}

async function getData(slug) {
  const post = await proxyCache(
    ({ id }) => `devto_blog_posts:${id}`,
    getSinglePosts.bind(null, "scdev", slug),
  );

  return { post };
}

export default async function BlogPost({ params: { slug } }) {
  if (!slug) return null;
  const { post } = await getData(slug);
  if (!post) return null;
  return (
    <div className="page-container blog-post">
      <div className="content">
        <h1 className="post-title">{post.title}</h1>
        {Array.isArray(post?.tags) && (
          <div className="post-tags">
            {post.tags.map((t) => (
              // biome-ignore lint/a11y/useValidAnchor: <explanation>
              <a className="tag" key={t}>
                #{t}
              </a>
            ))}
          </div>
        )}

        <div
          className="post-body"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: marked(post.body_markdown) }}
        />
      </div>
    </div>
  );
}
