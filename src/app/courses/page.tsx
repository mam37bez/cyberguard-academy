import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { courses } from '@/data/courses';
import { formatPrice } from '@/lib/utils';
export const metadata = { title: 'Курсы' };
export default function CoursesPage() {
  const ll: Record<string,string>={beginner:'Начальный',intermediate:'Средний',advanced:'Продвинутый'};
  const lc: Record<string,string>={beginner:'success',intermediate:'warning',advanced:'danger'};
  return (<div className="pt-24 pb-16"><div className="max-w-7xl mx-auto px-4">
    <SectionHeading badge="Все программы" title="Курсы" subtitle="Выберите программу" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {courses.map(c=>(<Card key={c.id} variant="gradient" className="flex flex-col"><CardContent>
        <div className="flex justify-between mb-4"><span className="text-4xl">{c.icon}</span><Badge variant={lc[c.level] as any}>{ll[c.level]}</Badge></div>
        <h2 className="text-2xl font-bold text-white mb-3">{c.title}</h2><p className="text-gray-400 mb-4">{c.description}</p>
        <div className="flex flex-wrap gap-2">{c.skills.map(s=>(<Badge key={s} variant="outline" size="sm">{s}</Badge>))}</div>
      </CardContent><CardFooter className="mt-auto flex justify-between items-center">
        <span className="text-2xl font-bold text-white">{formatPrice(c.price)}/мес</span>
        <div className="flex gap-2"><Link href={'/courses/'+c.slug}><Button variant="ghost" size="sm">Подробнее</Button></Link><Link href="/enrollment"><Button variant="primary" size="sm">Записаться</Button></Link></div>
      </CardFooter></Card>))}
    </div>
  </div></div>);
}
