import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/client';

import { Container } from './styles';

export function SignInButton() {
  const [session] = useSession();

  return session ? (
    <Container type="button" onClick={() => signOut()}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" />
    </Container>
  ) : (
    <Container type="button" onClick={() => signIn('github')}>
      <FaGithub color="#eba417" />
      Sign in with Github
    </Container>
  )
}
