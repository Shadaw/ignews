import { fireEvent, render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { useSession, signIn, signOut } from 'next-auth/client';

import { SignInButton } from '.';

jest.mock('next-auth/client')

describe('<SignInButton />', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SignInButton />)

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument();
  })
  it('render correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([
      { user: { name: 'John Doe', email: 'john.doe@example.com' }, expires: 'fake-expires' },
      false
    ])

    render(<SignInButton />)

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  })
  it('signIn when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession);
    const signInMocked = mocked(signIn);
    const signInFunction = jest.fn();

    useSessionMocked.mockReturnValueOnce([null, false])

    signInMocked.mockImplementationOnce(signInFunction);

    render(<SignInButton />)

    const signInButton = screen.getByRole('button', { name: /sign in with github/i });

    fireEvent.click(signInButton);

    expect(signInFunction).toHaveBeenCalledWith('github');
  })
  it('signOut when user is authenticated', () => {
    const useSessionMocked = mocked(useSession);
    const signOutMocked = mocked(signOut);
    const signOutFunction = mocked(jest.fn());

    useSessionMocked.mockReturnValueOnce([
      { user: { name: 'John Doe', email: 'john.doe@example.com' }, expires: 'fake-expires' },
      false
    ])

    signOutMocked.mockImplementationOnce(signOutFunction);

    render(<SignInButton />)

    const signOutButton = screen.getByRole('button', { name: /John Doe/i });

    fireEvent.click(signOutButton);

    expect(signOutFunction).toHaveBeenCalled();
  })
})

