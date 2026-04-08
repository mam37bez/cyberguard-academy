import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Блог о кибербезопасности — CyberGuard Academy',
  description:
    'Блог CyberGuard Academy: статьи о кибербезопасности, цифровой защите, фишинге, безопасности детей в интернете и полезных практиках цифровой безопасности.',
  alternates: {
    canonical: 'https://cyberguard-academy.vercel.app/blog',
  },
};

type BlogPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  // Next.js 15 типизирует searchParams как Promise.
  // await безопасен: если придёт обычный объект, await просто вернёт его как значение.
  const sp = searchParams ? await searchParams : undefined;

  const activeCategory =
    typeof sp?.category === 'string' && sp.category.trim().length > 0 ? sp.category : undefined;

  const categories = Array.from(new Set(blogPosts.map((p) => p.category))).sort((a, b) =>
    a.localeCompare(b, 'ru'),
  );

  const visiblePosts = activeCategory ? blogPosts.filter((p) => p.category === activeCategory) : blogPosts;

  const featuredPosts = visiblePosts.filter((post) => post.featured);
  const regularPosts = visiblePosts.filter((post) => !post.featured);

  const toolToArticle = [
    {
      title: 'Подозрительная ссылка / звонок: что делать дальше',
      toolHref: '/security-tools#suspicious-link',
      toolLabel: 'Открыть инструмент',
      postHref: '/blog/kak-raspoznat-moshennikov',
      postLabel: 'Прочитать статью',
      note: 'Как распознавать мошенников и не попасться на давление.',
    },
    {
      title: 'Безопасность детей и семьи',
      toolHref: '/security-tools#family-security',
      toolLabel: 'Проверить семейные привычки',
      postHref: '/blog/zaschita-detey',
      postLabel: 'Гид для родителей',
      note: 'Правила, настройки и разговоры, которые реально снижают риски.',
    },
    {
      title: 'Пароли и защита аккаунтов',
      toolHref: '/security-tools#password-strength',
      toolLabel: 'Проверить пароль',
      postHref: '/blog/nadezhnye-paroli',
      postLabel: 'Как сделать пароли надёжнее',
      note: 'Простые принципы + менеджер паролей + 2FA.',
    },
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          as="h1"
          badge="Блог"
          title="Статьи о кибербезопасности"
          subtitle="Практические материалы о защите аккаунтов, устройств, данных и безопасном поведении в интернете"
        />

        {/* С чего начать */}
        <div className="max-w-5xl mx-auto mb-10">
          <Card variant="gradient">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-3">С чего начать изучение</h2>
              <p className="text-gray-300 mb-6">
                Если вы пришли после инструментов — выберите тему ниже. Если вы новичок — начните с базовой статьи и
                пройдите самопроверку.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/security-tools">
                  <Button variant="outline">Пройти инструменты</Button>
                </Link>
                <Link href="/blog/chto-takoe-kiberbezopasnost">
                  <Button variant="primary">Начать с основ</Button>
                </Link>
                <Link href="/courses">
                  <Button variant="ghost">Подобрать курс</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Популярные темы */}
        <div className="max-w-5xl mx-auto mb-12 rounded-2xl border border-cyber-border bg-cyber-card p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Популярные темы</h2>
              <p className="text-sm text-gray-300">
                Быстро отфильтруйте статьи по направлению. Это удобно на телефоне и помогает не теряться в списке.
              </p>
            </div>

            {activeCategory && (
              <div className="shrink-0">
                <Link href="/blog">
                  <Button variant="outline" size="sm">
                    Сбросить фильтр
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            <Link href="/blog">
              <Badge variant={activeCategory ? 'outline' : 'info'} size="sm">
                Все
              </Badge>
            </Link>

            {categories.map((c) => (
              <Link key={c} href={'/blog?category=' + encodeURIComponent(c)}>
                <Badge variant={activeCategory === c ? 'info' : 'outline'} size="sm">
                  {c}
                </Badge>
              </Link>
            ))}
          </div>

          {activeCategory && (
            <p className="text-xs text-gray-400 mt-4">
              Фильтр: <span className="text-gray-200 font-medium">{activeCategory}</span>
            </p>
          )}
        </div>

        {/* Связки tools → статьи */}
        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-2xl font-bold text-white mb-6">Если вы пришли из инструментов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolToArticle.map((x) => (
              <Card key={x.title} variant="default" className="h-full">
                <CardContent className="flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-white mb-2">{x.title}</h3>
                  <p className="text-sm text-gray-400 mb-6">{x.note}</p>
                  <div className="mt-auto flex flex-col gap-2">
                    <Link href={x.toolHref}>
                      <Button variant="outline" size="sm">
                        {x.toolLabel}
                      </Button>
                    </Link>
                    <Link href={x.postHref}>
                      <Button variant="primary" size="sm">
                        {x.postLabel}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured */}
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

        {/* Regular */}
        {regularPosts.length > 0 ? (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">{activeCategory ? 'Статьи по теме' : 'Все статьи'}</h2>
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
        ) : (
          <section className="max-w-5xl mx-auto">
            <Card variant="default">
              <CardContent>
                <h2 className="text-xl font-bold text-white mb-2">По этому фильтру статей пока нет</h2>
                <p className="text-gray-400 mb-4">
                  Попробуйте выбрать другую тему или сбросить фильтр, чтобы увидеть все материалы.
                </p>
                <Link href="/blog">
                  <Button variant="outline">Сбросить фильтр</Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </div>
  );
}
