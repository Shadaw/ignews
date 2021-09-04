import styled from 'styled-components';

export const Container = styled.header`
  height: 5rem;
  border-bottom: 1px solid var(--gray-800);
`;

export const Content = styled.div`
  max-width: 1120px;
  height: 5rem;
  margin: 0 auto;
  padding: 0 2rem;

  display: flex;
  align-items: center;

  nav {
    margin-left: 5rem;
    height: 5rem;
  }

  button {
    margin-left: auto;
  }
`;
