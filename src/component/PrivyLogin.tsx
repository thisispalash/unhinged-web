'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useLogin } from '@privy-io/react-auth';

import { useLoading } from '@/context/LoadingContext';

import Button from './primitive/Button';

export default function PrivyLogin() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const { addLoadingSource, removeLoadingSource } = useLoading();

  const { login } = useLogin({
    onComplete: ({ wasAlreadyAuthenticated, isNewUser }) => {
      removeLoadingSource('privy-login');

      if (wasAlreadyAuthenticated) return;

      if (isNewUser) {
        router.push(`/onboard?redirect=${redirect}`);
      } else {
        router.push(redirect || '/home');
      }
    },
  });

  const loginFlow = () => {
    addLoadingSource('privy-login');
    login();
  }

  return <Button onClick={loginFlow} className="px-4">Login with Privy</Button>;
}