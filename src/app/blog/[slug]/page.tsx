import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { Container } from '@/components/layout/Container';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import { formatDate } from '@/lib/utils';
import { SITE_URL } from '@/lib/site';
import { buildBlogPostJsonLd } from '@/lib/schema/blog-post';

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

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const sameCategoryA = a.category === post.category ? 1 : 0;
      const sameCategoryB = b.category === post.category ? 1 : 0;
      return sameCategoryB - sameCategoryA;
    })
    .slice(0, 3);

  const jsonLd = buildBlogPostJsonLd(post);

  return (
    <div className="pt-24 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="max-w-3xl">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-primary-300">
            Главная
          </Link>{' '}
          /{' '}
          <Link href="/blog" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:text-primary-300">
            Блог
          </Link>{' '}
          / <span className="text-slate-200 line-clamp-2">{post.title}</span>
        </nav>

        <div className="mb-10">
          <Badge variant="info">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-semibold text-white mt-4 mb-4 tracking-tight leading-tight">{post.title}</h1>
          <div className="text-sm text-slate-500">
            {post.author} · {formatDate(post.date)} · {post.readTime}
          </div>
        </div>

        <article className="text-slate-400 leading-relaxed whitespace-pre-line mb-12 text-[15px] md:text-base">
          {post.content}
        </article>

        <div className="flex flex-wrap gap-2 mb-12">
          {post.tags.map((t) => (
            <Badge key={t} variant="outline" size="sm">
              #{t}
            </Badge>
          ))}
        </div>

        <div className="text-center p-8 rounded-2xl bg-cyber-card/90 border border-white/[0.08] mb-16">
          <h3 className="text-lg font-semibold text-white mb-4 tracking-tight">Хотите узнать больше?</h3>
          <ButtonLink href="/courses" variant="primary" size="lg">
            Смотреть курсы
          </ButtonLink>
        </div>

        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">Похожие статьи</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.slug}`}
                  className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker"
                >
                  <div className="h-full rounded-2xl border border-white/[0.06] bg-cyber-card/80 p-5 transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-black/20">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      <Badge variant="info" size="sm">
                        {related.category}
                      </Badge>
                      <Badge variant="outline" size="sm">
                        {related.readTime}
                      </Badge>
                    </div>

                    <h3 className="text-base font-semibold text-white mb-3 tracking-tight leading-snug">{related.title}</h3>
                    <p className="text-sm text-slate-500 mb-4 leading-relaxed line-clamp-3">{related.excerpt}</p>
                    <div className="text-xs text-slate-600">
                      {related.author} · {formatDate(related.date)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
