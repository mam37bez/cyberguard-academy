import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import { formatDate } from '@/lib/utils';

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

  const url = `https://cyberguard-academy.vercel.app/blog/${post.slug}`;
  const description = post.excerpt || `Статья "${post.title}" в блоге CyberGuard Academy.`;

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

  const postUrl = `https://cyberguard-academy.vercel.app/blog/${post.slug}`;

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
      url: 'https://cyberguard-academy.vercel.app',
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
          <Link href="/" className="hover:text-white">Главная</Link> /{' '}
          <Link href="/blog" className="hover:text-white">Блог</Link> /{' '}
          <span className="text-white">{post.title}</span>
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
            <Badge key={t} variant="outline" size="sm">#{t}</Badge>
          ))}
        </div>

        <div className="text-center p-8 rounded-2xl bg-cyber-card border border-cyber-border">
          <h3 className="text-xl font-bold text-white mb-4">Хотите узнать больше?</h3>
          <Link href="/courses">
            <Button variant="primary">Смотреть курсы</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
