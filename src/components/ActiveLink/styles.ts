import styled, { css } from 'styled-components';

type NavItemProps = {
  active?: boolean;
}


export const NavItem = styled.a<NavItemProps>`
  display: inline-block;
  position: relative;
  padding: 0 0.5rem;
  height: 5rem;
  line-height: 5rem;
  color: var(--gray-300);

  transition: color 0.2s;

  & + a {
    margin-left: 2rem;
  }

  &:hover {
    color: var(--white);
  }

  ${({ active }) => active && css`
    color: var(--white);
    font-weight: bold;

    &::after {
      content: '';
      height: 3px;
      border-radius 3px 3px 0 0;
      width: 100%;
      position: absolute;
      bottom: 1px;
      left: 0;
      background: var(--yellow-500);
    }
  `}
`;
