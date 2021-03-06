import { render, screen } from '@testing-library/react';

import { Header } from '.';

jest.mock('next/router', () => ({
  useRouter: () => ({ asPath: '/' })
}))

jest.mock('next-auth/client', () => ({
  useSession() {
    return [null, false]
  }
}))

describe('<Header />', () => {
  it('renders correctly', () => {
    render(<Header />)

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
  })
})

