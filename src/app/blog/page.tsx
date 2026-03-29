import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { blogPosts } from '@/data/blog';
import { formatDate } from '@/lib/utils';
export const metadata = { title: 'Блог' };
export default function BlogPage() {
  return (<div className="pt-24 pb-16"><div className="max-w-7xl mx-auto px-4">
    <SectionHeading badge="Блог" title="Статьи" subtitle="Материалы о кибербезопасности" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {blogPosts.map(p=>(<Link key={p.id} href={'/blog/'+p.slug}><Card variant="default" className="h-full"><CardContent className="flex flex-col h-full">
        <div className="flex gap-2 mb-4"><Badge variant="info" size="sm">{p.category}</Badge>{p.featured&&<Badge variant="warning" size="sm">⭐</Badge>}</div>
        <h2 className="text-xl font-bold text-white mb-3">{p.title}</h2><p className="text-gray-400 text-sm mb-4 flex-1">{p.excerpt}</p>
        <div className="flex justify-between text-xs text-gray-500 mt-auto"><span>{p.author}</span><span>{formatDate(p.date)}</span></div>
      </CardContent></Card></Link>))}
    </div>
  </div></div>);
}
