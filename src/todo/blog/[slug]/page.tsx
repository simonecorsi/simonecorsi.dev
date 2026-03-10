import { proxyCache } from "lib/cache";
import {
  type DevToPost,
  getSinglePosts,
  getUserPublicBlogPosts,
} from "lib/devto";
import { getMetadata } from "lib/metadata";
import { marked } from "marked";

export const metadata = getMetadata("/blog");

export async function generateStaticParams() {
  const posts = await proxyCache<DevToPost[]>(
    "devto_blog_posts",
    getUserPublicBlogPosts,
  );
  return posts?.map(({ slug }) => ({
    slug,
    fallback: false,
  }));
}

async function getData(slug) {
  const post = await proxyCache<DevToPost>(
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
          className="post-body prose prose-lg dark:prose-invert max-w-none"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: marked(post.body_markdown) }}
        />
      </div>
    </div>
  );
}
