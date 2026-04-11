import type { ReactNode } from 'react';
import Link from 'next/link';

/**
 * Пути внутри сайта в тексте статей превращаются в <Link> для явной перелинковки (краулеры видят <a href>).
 * Поддерживаются только относительные URL из контента блога: /blog/... и /security-tools (# необязателен).
 */
const INTERNAL_PATH_RE = /(\/blog\/[a-zA-Z0-9\-]+|\/security-tools(?:#[a-zA-Z0-9\-]+)?)/g;

type BlogPostContentProps = {
  content: string;
};

export function BlogPostContent({ content }: BlogPostContentProps) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  const re = new RegExp(INTERNAL_PATH_RE.source, 'g');
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(content)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(content.slice(lastIndex, match.index));
    }
    const href = match[1];
    nodes.push(
      <Link
        key={`il-${key++}`}
        href={href}
        className="text-primary-400/95 hover:text-primary-300 underline underline-offset-[3px] decoration-primary-500/40 hover:decoration-primary-400/60 break-words [overflow-wrap:anywhere] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-darker rounded-sm"
      >
        {href}
      </Link>
    );
    lastIndex = re.lastIndex;
  }

  if (lastIndex < content.length) {
    nodes.push(content.slice(lastIndex));
  }

  return <div className="whitespace-pre-line">{nodes}</div>;
}
