import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { proxyCache } from 'lib/cache';
import { getSinglePosts, getUserPublicBlogPosts } from 'lib/devto';
import Layout from '../../components/Layout';
import BasicMeta from '../../components/meta/BasicMeta';
import OpenGraphMeta from '../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../components/meta/TwitterCardMeta';
import { marked } from 'marked';

dayjs.extend(relativeTime);

export async function getStaticPaths() {
  const posts = await proxyCache(
    'devto_blog_posts',
    getUserPublicBlogPosts.bind(null, 'scdev')
  );

  return {
    paths: posts.map(({ slug }) => `/blog/${slug}`),
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps({ params: { slug } }) {
  const post = await proxyCache(
    'devto_blog_posts',
    getSinglePosts.bind(null, 'scdev', slug)
  );

  return { props: { post } };
}

export default function BlogPost({ post }) {
  console.log('post?.tags_list :>> ', post);
  return (
    <Layout>
      <BasicMeta url={'/blog/' + post.slug} />
      <OpenGraphMeta url={'/blog/' + post.slug} />
      <TwitterCardMeta url={'/blog/' + post.slug} />
      <div className="page-container blog-post">
        <div className="content">
          <h1 className="post-title">{post.title}</h1>
          {Array.isArray(post?.tags) && (
            <div className="post-tags">
              {post.tags.map((t) => (
                <a className="tag">#{t}</a>
              ))}
            </div>
          )}

          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: marked(post.body_markdown) }}
          />
        </div>
      </div>
    </Layout>
  );
}
