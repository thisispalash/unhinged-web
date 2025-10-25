'use client';

import { useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';

import cn from '@/util/cn';

import { useLoading } from '@/context/LoadingContext';

import Link from '@/component/primitive/Link';
import PrivyLogin from '@/component/PrivyLogin';

export default function Login() {

  const { addLoadingSource, removeLoadingSource } = useLoading();
  
  const { ready } = usePrivy();
  
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

  if (!ready) {
    return null;
  }

  return (
    <div className={cn(
      'my-auto h-full',
      'flex flex-col gap-6',
      'justify-center items-center',
    )}>
      <PrivyLogin />
      <Link href="#" onClick={nfcLogin} isDisabled className="font-user">Attended ETHGlobal?</Link>
    </div>
  )
}