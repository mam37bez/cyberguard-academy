import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { blogPosts, getBlogPostBySlug } from '@/data/blog';
import { formatDate } from '@/lib/utils';
export async function generateStaticParams(){return blogPosts.map(p=>({slug:p.slug}));}
export default async function BlogPostPage({params}:{params:Promise<{slug:string}>}){
  const{slug}=await params;const post=getBlogPostBySlug(slug);if(!post)notFound();
  return (<div className="pt-24 pb-16"><div className="max-w-4xl mx-auto px-4">
    <nav className="mb-8 text-sm text-gray-400"><Link href="/" className="hover:text-white">Главная</Link> / <Link href="/blog" className="hover:text-white">Блог</Link> / <span className="text-white">{post.title}</span></nav>
    <div className="mb-12"><Badge variant="info">{post.category}</Badge><h1 className="text-3xl font-bold text-white mt-4 mb-4">{post.title}</h1><div className="text-sm text-gray-400">{post.author} · {formatDate(post.date)} · {post.readTime}</div></div>
    <article className="text-gray-300 leading-relaxed whitespace-pre-line mb-12">{post.content}</article>
    <div className="flex flex-wrap gap-2 mb-12">{post.tags.map(t=>(<Badge key={t} variant="outline" size="sm">#{t}</Badge>))}</div>
    <div className="text-center p-8 rounded-2xl bg-cyber-card border border-cyber-border"><h3 className="text-xl font-bold text-white mb-4">Хотите узнать больше?</h3><Link href="/courses"><Button variant="primary">Смотреть курсы</Button></Link></div>
  </div></div>);
}
