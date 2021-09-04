import styled, { css } from 'styled-components';

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const PostWrapper = styled.article`
  max-width: 720px;
  margin: 5rem auto 0;

  h1 {
    font-size: 3.5rem;
    font-weight: 900;
  }

  time {
    display: block;
    font-size: 1rem;
    color: var(--gray-300);
    margin-top: 1.5rem;
  }
`;

type ContentProps = {
  preview?: boolean;
};

export const Content = styled.div<ContentProps>`
  margin-top: 2rem;
  line-height: 2rem;
  font-size: 1.125rem;
  color: var(--gray-100);

  p, ul {
    margin: 1.5rem 0;
  }

  ul {
    padding-left: 1.5rem;

    li {
      margin: 0.5rem 0;
    }
  }

  ${({ preview }) => preview && css`
    background: linear-gradient(var(--gray-100), transparent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `}
`;


export const ContinueReading = styled.div`
  padding: 2rem;
  text-align: center;
  background: var(--gray-850);
  border-radius: 100px;
  font-size: 1.25rem;
  font-weight: bold;
  margin: 4rem 0 2rem;

  a {
    color: var(--yellow-500);
    margin-left: 0.5rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;
