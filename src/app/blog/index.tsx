import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { proxyCache } from 'lib/cache';
import { getUserPublicBlogPosts } from 'lib/devto';
import Layout from '../../components/Layout';
import BasicMeta from '../../components/meta/BasicMeta';
import OpenGraphMeta from '../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../components/meta/TwitterCardMeta';

dayjs.extend(relativeTime);

export async function getStaticProps() {
  const posts = await proxyCache(
    'devto_blog_posts',
    getUserPublicBlogPosts.bind(null, 'scdev')
  );

  return {
    props: {
      posts: posts.map((p) => {
        p.from_now = dayjs(p.published_at).fromNow();
        return p;
      }),
    }, // will be passed to the page component as props
  };
}

export default function BlogIndex({ posts }) {
  return (
    <Layout>
      <BasicMeta url={'/about/'} />
      <OpenGraphMeta url={'/about/'} />
      <TwitterCardMeta url={'/about/'} />
      <div className="page-container blog-posts">
        <div className="container">
          {posts.map((post) => (
            <div key={post.id}>
              <Link href={`/blog/${post.slug}`}>
                <div>
                  <small>{post.from_now}</small>
                </div>
                <div>
                  <b>{post.title}</b>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
