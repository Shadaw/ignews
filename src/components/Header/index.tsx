import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';

import { Container, Content } from './styles';

export function Header() {
  return (
    <Container>
      <Content>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink href="/">
            Home
          </ActiveLink>
          <ActiveLink href="/posts">
            Posts
          </ActiveLink>
        </nav>
        <SignInButton />
      </Content>
    </Container>
  )
}
