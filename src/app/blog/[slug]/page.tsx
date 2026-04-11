import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import { formatDate } from '@/lib/utils';
import { SITE_URL } from '@/lib/site';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Статья не найдена',
    };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const description = post.excerpt || `Статья "${post.title}" в блоге CyberGuard Academy.`;
  const publishedTime = new Date(post.date).toISOString();

  return {
    title: post.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description,
      url,
      type: 'article',
      publishedTime,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) notFound();

  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const sameCategoryA = a.category === post.category ? 1 : 0;
      const sameCategoryB = b.category === post.category ? 1 : 0;
      return sameCategoryB - sameCategoryA;
    })
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    articleBody: post.content,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'CyberGuard Academy',
      url: SITE_URL,
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    url: postUrl,
    inLanguage: 'ru',
    keywords: post.tags.join(', '),
    articleSection: post.category,
  };

  return (
    <div className="pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4">
        <nav className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">
            Главная
          </Link>{' '}
          /{' '}
          <Link href="/blog" className="hover:text-white">
            Блог
          </Link>{' '}
          / <span className="text-white">{post.title}</span>
        </nav>

        <div className="mb-12">
          <Badge variant="info">{post.category}</Badge>
          <h1 className="text-3xl font-bold text-white mt-4 mb-4">{post.title}</h1>
          <div className="text-sm text-gray-400">
            {post.author} · {formatDate(post.date)} · {post.readTime}
          </div>
        </div>

        <article className="text-gray-300 leading-relaxed whitespace-pre-line mb-12">
          {post.content}
        </article>

        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((t) => (
            <Badge key={t} variant="outline" size="sm">
              #{t}
            </Badge>
          ))}
        </div>

        <div className="text-center p-8 rounded-2xl bg-cyber-card border border-cyber-border mb-16">
          <h3 className="text-xl font-bold text-white mb-4">Хотите узнать больше?</h3>
          <Link href="/courses">
            <Button variant="primary">Смотреть курсы</Button>
          </Link>
        </div>

        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Похожие статьи</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`}>
                  <div className="h-full rounded-2xl border border-cyber-border bg-cyber-card p-5 transition-all duration-300 hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      <Badge variant="info" size="sm">
                        {related.category}
                      </Badge>
                      <Badge variant="outline" size="sm">
                        {related.readTime}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-3">{related.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{related.excerpt}</p>
                    <div className="text-xs text-gray-500">
                      {related.author} · {formatDate(related.date)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
