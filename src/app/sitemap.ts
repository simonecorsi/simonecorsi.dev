export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import CONFIGS from "../../config";
import { proxyCache } from "../lib/cache";
import { type DevToPost, getUserPublicBlogPosts } from "../lib/devto";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { base_url } = CONFIGS;

  const posts = await proxyCache<DevToPost[]>(
    "devto_blog_posts",
    getUserPublicBlogPosts,
  );

  return [
    {
      url: base_url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base_url}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base_url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base_url}/bookmarks`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${base_url}/open-source`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },

    ...(posts.map((post) => ({
      url: `${base_url}/blog/${post.slug || ""}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    })) as MetadataRoute.Sitemap),
  ];
}
