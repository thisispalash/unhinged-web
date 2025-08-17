'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useLogin } from '@privy-io/react-auth';

import Button from './primitive/Button';

export default function PrivyLogin() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const { login } = useLogin({
    onComplete: ({ wasAlreadyAuthenticated, isNewUser }) => {
      if (wasAlreadyAuthenticated) return;

      if (isNewUser) {
        router.push(`/onboard?redirect=${redirect}`);
      } else {
        router.push(redirect || '/home');
      }
    },
  });

  const loginFlow = () => {
    login();
  }

  return <Button onClick={loginFlow} className="px-4 font-system">Login with Privy</Button>;
}