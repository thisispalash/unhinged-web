'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';

import cn from '@/util/cn';

import { useLoading } from '@/context/LoadingContext';

import Button from '@/component/primitive/Button';
import Link from '@/component/primitive/Link';

export default function Login() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const { addLoadingSource, removeLoadingSource } = useLoading();
  
  const { ready, login, authenticated } = usePrivy();
  
  const nfcLogin = () => {

  }

  useEffect(() => {
    if (!ready) {
      addLoadingSource('privy-mount');
    } else {
      removeLoadingSource('privy-mount');
    }

    return () => {
      removeLoadingSource('privy-mount');
    }
  }, [ready]);

  useEffect(() => {
    if (authenticated) {
      router.push(redirect || '/home');
    }
  }, [authenticated, redirect]);

  if (!ready) {
    return null;
  }

  return (
    <div className={cn(
      'my-auto h-full',
      'flex flex-col gap-6',
      'justify-center items-center',
    )}>
      <Button onClick={login} className="px-4">Login with Privy</Button>
      <Link href="#" onClick={nfcLogin} isDisabled className="font-user">At ETHGlobal?</Link>
    </div>
  )
}