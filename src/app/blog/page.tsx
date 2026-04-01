import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Блог',
  description:
    'Блог CyberGuard Academy: статьи о кибербезопасности, цифровой защите, фишинге, безопасности детей в интернете и полезных практиках цифровой безопасности.',
  alternates: {
    canonical: 'https://cyberguard-academy.vercel.app/blog',
  },
};

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          badge="Блог"
          title="Статьи о кибербезопасности"
          subtitle="Практические материалы о защите аккаунтов, устройств, данных и безопасном поведении в интернете"
        />

        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-white">Рекомендуемые материалы</h2>
              <Badge variant="warning" size="sm">
                Featured
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((p) => (
                <Link key={p.id} href={'/blog/' + p.slug}>
                  <Card variant="gradient" className="h-full">
                    <CardContent className="flex flex-col h-full">
                      <div className="flex gap-2 mb-4 flex-wrap">
                        <Badge variant="info" size="sm">
                          {p.category}
                        </Badge>
                        <Badge variant="warning" size="sm">
                          Рекомендуем
                        </Badge>
                        <Badge variant="outline" size="sm">
                          {p.readTime}
                        </Badge>
                      </div>

                      <h2 className="text-xl font-bold text-white mb-3">{p.title}</h2>
                      <p className="text-gray-300 text-sm mb-4 flex-1">{p.excerpt}</p>

                      <div className="flex justify-between text-xs text-gray-500 mt-auto">
                        <span>{p.author}</span>
                        <span>{formatDate(p.date)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {regularPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Все статьи</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regularPosts.map((p) => (
                <Link key={p.id} href={'/blog/' + p.slug}>
                  <Card variant="default" className="h-full">
                    <CardContent className="flex flex-col h-full">
                      <div className="flex gap-2 mb-4 flex-wrap">
                        <Badge variant="info" size="sm">
                          {p.category}
                        </Badge>
                        <Badge variant="outline" size="sm">
                          {p.readTime}
                        </Badge>
                      </div>

                      <h2 className="text-xl font-bold text-white mb-3">{p.title}</h2>
                      <p className="text-gray-400 text-sm mb-4 flex-1">{p.excerpt}</p>

                      <div className="flex justify-between text-xs text-gray-500 mt-auto">
                        <span>{p.author}</span>
                        <span>{formatDate(p.date)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
