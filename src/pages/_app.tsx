import { AppProps } from 'next/app';
import { Provider as NextAuthProvider } from 'next-auth/client';

import { Header } from '../components/Header';

import { GlobalStyle } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
