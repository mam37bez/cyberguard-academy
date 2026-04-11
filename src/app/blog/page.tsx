import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Container } from '@/components/layout/Container';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Блог о кибербезопасности — CyberGuard Academy',
  description:
    'Блог CyberGuard Academy: статьи о кибербезопасности, цифровой защите, фишинге, безопасности детей в интернете и полезных практиках цифровой безопасности.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

type BlogPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
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

  const postCardLinkClass =
    'block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker';

  return (
    <div className="pt-24 pb-16">
      <Container>
        <SectionHeading
          dense
          as="h1"
          badge="Блог"
          title="Статьи о кибербезопасности"
          subtitle="Практические материалы о защите аккаунтов, устройств, данных и безопасном поведении в интернете"
        />

        <div className="max-w-5xl mx-auto mb-10">
          <Card variant="gradient" className="border-white/[0.06]">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">С чего начать изучение</h2>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Если вы пришли после инструментов — выберите тему ниже. Если вы новичок — начните с базовой статьи и
                пройдите самопроверку.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <ButtonLink href="/security-tools" variant="outline" size="md">
                  Пройти инструменты
                </ButtonLink>
                <ButtonLink href="/blog/chto-takoe-kiberbezopasnost" variant="primary" size="md">
                  Начать с основ
                </ButtonLink>
                <ButtonLink href="/courses" variant="ghost" size="md">
                  Подобрать курс
                </ButtonLink>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-5xl mx-auto mb-12 rounded-2xl border border-white/[0.06] bg-cyber-card/90 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white mb-1 tracking-tight">Популярные темы</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Быстро отфильтруйте статьи по направлению. Это удобно на телефоне и помогает не теряться в списке.
              </p>
            </div>

            {activeCategory && (
              <div className="shrink-0">
                <ButtonLink href="/blog" variant="outline" size="sm">
                  Сбросить фильтр
                </ButtonLink>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            <Link href="/blog" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40">
              <Badge variant={activeCategory ? 'outline' : 'info'} size="sm">
                Все
              </Badge>
            </Link>

            {categories.map((c) => (
              <Link
                key={c}
                href={'/blog?category=' + encodeURIComponent(c)}
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40"
              >
                <Badge variant={activeCategory === c ? 'info' : 'outline'} size="sm">
                  {c}
                </Badge>
              </Link>
            ))}
          </div>

          {activeCategory && (
            <p className="text-xs text-slate-600 mt-4">
              Фильтр: <span className="text-slate-300 font-medium">{activeCategory}</span>
            </p>
          )}
        </div>

        <section className="max-w-5xl mx-auto mb-14">
          <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">Если вы пришли из инструментов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {toolToArticle.map((x) => (
              <Card key={x.title} variant="default" className="h-full border-white/[0.06]">
                <CardContent className="flex flex-col h-full">
                  <h3 className="text-base font-semibold text-white mb-2 tracking-tight">{x.title}</h3>
                  <p className="text-sm text-slate-500 mb-6 leading-relaxed">{x.note}</p>
                  <div className="mt-auto flex flex-col gap-2">
                    <ButtonLink href={x.toolHref} variant="outline" size="sm">
                      {x.toolLabel}
                    </ButtonLink>
                    <ButtonLink href={x.postHref} variant="primary" size="sm">
                      {x.postLabel}
                    </ButtonLink>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold text-white tracking-tight">Рекомендуемые материалы</h2>
              <Badge variant="warning" size="sm">
                Featured
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {featuredPosts.map((p) => (
                <Link key={p.id} href={'/blog/' + p.slug} className={postCardLinkClass}>
                  <Card variant="gradient" className="h-full border-white/[0.06] transition-colors hover:border-primary-500/25">
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

                      <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">{p.title}</h2>
                      <p className="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">{p.excerpt}</p>

                      <div className="flex justify-between text-xs text-slate-600 mt-auto">
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

        {regularPosts.length > 0 ? (
          <section>
            <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">
              {activeCategory ? 'Статьи по теме' : 'Все статьи'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {regularPosts.map((p) => (
                <Link key={p.id} href={'/blog/' + p.slug} className={postCardLinkClass}>
                  <Card variant="default" className="h-full border-white/[0.06] transition-colors hover:border-primary-500/25">
                    <CardContent className="flex flex-col h-full">
                      <div className="flex gap-2 mb-4 flex-wrap">
                        <Badge variant="info" size="sm">
                          {p.category}
                        </Badge>
                        <Badge variant="outline" size="sm">
                          {p.readTime}
                        </Badge>
                      </div>

                      <h2 className="text-xl font-semibold text-white mb-3 tracking-tight">{p.title}</h2>
                      <p className="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">{p.excerpt}</p>

                      <div className="flex justify-between text-xs text-slate-600 mt-auto">
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
            <Card variant="default" className="border-white/[0.06]">
              <CardContent>
                <h2 className="text-lg font-semibold text-white mb-2 tracking-tight">По этому фильтру статей пока нет</h2>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                  Попробуйте выбрать другую тему или сбросить фильтр, чтобы увидеть все материалы.
                </p>
                <ButtonLink href="/blog" variant="outline" size="md">
                  Сбросить фильтр
                </ButtonLink>
              </CardContent>
            </Card>
          </section>
        )}
      </Container>
    </div>
  );
}
