import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import { Container } from './styles';

interface SubscribeButtonProps {
  priceId: string;
};

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();
  const router = useRouter();

  const handleSubscribe = useCallback(async () => {
    if(!session) {
      signIn('github');
      return;
    }

    if(session?.activeSubscription) {
      router.push('/posts');

      return;
    }

    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error(error.message);
    }
  }, [session, signIn]);

  return (
    <Container type="button" onClick={handleSubscribe}>
      Subscribe now
    </Container>
  )
}
