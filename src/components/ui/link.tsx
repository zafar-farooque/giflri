import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

export interface LinkProps extends Omit<RouterLinkProps, 'to' | 'prefetch'> {
  href?: string;
  to?: string;
  prefetch?: boolean | 'intent' | 'render' | 'none' | any;
  className?: string;
  children?: React.ReactNode;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, to, prefetch, children, ...props }, ref) => {
    const destination = to || href || '/';
    const isExternal =
      typeof destination === 'string' &&
      (destination.startsWith('http://') ||
        destination.startsWith('https://') ||
        destination.startsWith('mailto:') ||
        destination.startsWith('tel:') ||
        destination.startsWith('//'));

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={destination}
          target={props.target || '_blank'}
          rel={props.rel || 'noopener noreferrer'}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <RouterLink ref={ref} to={destination} {...props}>
        {children}
      </RouterLink>
    );
  }
);

Link.displayName = 'Link';

export default Link;
