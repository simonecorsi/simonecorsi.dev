import { MetadataRoute } from 'next';
import CONFIGS from '../../config';
import { getUserPublicBlogPosts } from '../lib/devto';
import { proxyCache } from '../lib/cache';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { base_url } = CONFIGS;

  const posts = await proxyCache('devto_blog_posts', getUserPublicBlogPosts);

  return [
    {
      url: base_url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base_url}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base_url}/bookmarks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${base_url}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },

    ...(posts.map((post) => ({
      url: `${base_url}/blog/${post.slug!}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    })) as MetadataRoute.Sitemap),
  ];
}
