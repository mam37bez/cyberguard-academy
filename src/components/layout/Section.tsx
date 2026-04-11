import { cn } from '@/lib/utils';

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  /** Компактнее по вертикали */
  dense?: boolean;
  id?: string;
};

export function Section({ children, className, dense, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(dense ? 'py-14 md:py-20' : 'py-16 md:py-24', className)}
    >
      {children}
    </section>
  );
}
