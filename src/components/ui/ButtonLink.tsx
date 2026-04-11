import Link, { type LinkProps } from 'next/link';
import { buttonVariants, type ButtonVariant, type ButtonSize } from '@/lib/button-variants';
import { cn } from '@/lib/utils';

export type ButtonLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    children: React.ReactNode;
  };

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link {...props} className={cn(buttonVariants({ variant, size }), className)}>
      {children}
    </Link>
  );
}
