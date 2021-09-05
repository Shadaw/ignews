import { render, screen } from '@testing-library/react';

import { ActiveLink } from '.';

jest.mock('next/router', () => ({
  useRouter: () => ({ asPath: '/' })
}))

describe('<ActiveLink />', () => {
  it('renders correctly', () => {
    render(
      <ActiveLink href="/">
        Home
      </ActiveLink>
    )

    expect(screen.getByText('Home')).toBeInTheDocument();
  })
})

