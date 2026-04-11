import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

type InlineContextCTAProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function InlineContextCTA({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: InlineContextCTAProps) {
  return (
    <div className="max-w-4xl mx-auto mt-6">
      <Card variant="default" className="border-primary-500/20">
        <CardContent className="p-6 md:p-7">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
              <p className="text-sm text-slate-400">{description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              {secondaryHref && secondaryLabel && (
                <Link href={secondaryHref}>
                  <Button variant="outline" size="sm">
                    {secondaryLabel}
                  </Button>
                </Link>
              )}
              <Link href={primaryHref}>
                <Button variant="primary" size="sm">
                  {primaryLabel}
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
