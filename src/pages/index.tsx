import { GetStaticProps } from 'next';
import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import { Container, Hero } from '../styles/home';

interface HomeProps {
  product: {
    priceId: string;
    amount: string;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>
          Home | ig.news
        </title>
      </Head>

      <Container>
        <Hero>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> World.</h1>

          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton />
        </Hero>

        <img src="/images/avatar.svg" alt="girl codding" />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IbUzsDbmcbw7xC4UqrfiImV');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
