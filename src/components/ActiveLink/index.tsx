import { ReactNode } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

import { NavItem } from './styles';

type ActiveLinkProps = LinkProps & {
  children: ReactNode;
}

export const ActiveLink = ({ children, ...rest }: ActiveLinkProps) => {
  const { asPath } = useRouter();

  const active = asPath === rest.href;

  return (
    <Link {...rest}>
      <NavItem active={active}>{children}</NavItem>
    </Link>
  );
};
