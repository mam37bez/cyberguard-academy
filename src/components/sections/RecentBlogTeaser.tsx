import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { Badge } from '@/components/ui/Badge';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { formatDate } from '@/lib/utils';

function pickLatest(n: number) {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n);
}

export function RecentBlogTeaser() {
  const latest = pickLatest(2);
  if (latest.length === 0) return null;

  return (
    <Section className="border-t border-white/[0.04] bg-cyber-dark/40">
      <Container>
        <SectionHeading
          dense
          badge="Блог"
          title="Свежие материалы"
          subtitle="Короткие статьи о безопасности в интернете — можно читать с телефона"
        />
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {latest.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-white/[0.08] bg-cyber-card/80 p-5 transition-colors hover:border-primary-500/30 hover:bg-cyber-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker"
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="info" size="sm">
                  {post.category}
                </Badge>
                <span className="text-xs text-slate-600">{formatDate(post.date)}</span>
              </div>
              <h3 className="text-base font-semibold tracking-tight text-white group-hover:text-primary-200">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{post.excerpt}</p>
              <span className="mt-3 inline-block text-sm font-medium text-primary-400 group-hover:text-primary-300">
                Читать →
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link
            href="/blog"
            className="text-sm font-medium text-slate-400 underline-offset-4 transition-colors hover:text-primary-300 hover:underline"
          >
            Все статьи в блоге
          </Link>
        </p>
      </Container>
    </Section>
  );
}
