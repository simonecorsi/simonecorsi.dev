import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { proxyCache } from "lib/cache";
import { type DevToPost, getUserPublicBlogPosts } from "lib/devto";
import { getMetadata } from "lib/metadata";
import Link from "next/link";

dayjs.extend(relativeTime);

export const metadata = getMetadata("/blog");

async function getData() {
  const posts = await proxyCache<DevToPost[]>(
    "devto_blog_posts",
    getUserPublicBlogPosts.bind(null, "scdev"),
  );

  const parsed =
    posts?.map((p) => ({
      ...p,
      from_now: dayjs(p.published_at || p.created_at).fromNow(),
    })) || [];

  return {
    posts: parsed,
  };
}

export default async function BlogIndex() {
  const { posts } = await getData();
  return (
    <div className="min-h-screen py-16 px-4 lg:px-8 max-w-5xl mx-auto space-y-12">
      <header className="space-y-4">
        <h1 className="text-4xl lg:text-6xl font-black tracking-tight">Blog</h1>
        <p className="text-lg opacity-70">
          Musings on software, engineering, and everything in between.
        </p>
      </header>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="card bg-base-200 hover:bg-base-300 transition-colors border border-base-content/5"
          >
            <div className="card-body p-6 flex-row justify-between items-center">
              <div className="space-y-1">
                <h2 className="card-title text-xl font-bold">{post.title}</h2>
                <p className="text-sm opacity-60 italic">{post.from_now}</p>
              </div>
              <div className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <title>Arrow Right</title>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
