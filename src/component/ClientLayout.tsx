'use client';

import { Suspense } from 'react';

import { PrivyProvider } from '@privy-io/react-auth';
import { base } from 'viem/chains';

import cn from '@/util/cn';

import LoadingProvider, { useLoading } from '@/context/LoadingContext';
import AuthProvider from '@/context/AuthContext';

import Loader from '@/component/Loader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {

  return (
    <LoadingProvider>
      <PrivyProvider
        appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
        clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || ''}
        config={{
          defaultChain: base,
          supportedChains: [base],
          embeddedWallets: {
            createOnLogin: 'all-users',
          },
          appearance: {
            // logo: '/img/wordmark.png', // TODO: make 2:1 logo
            landingHeader: 'Is this the hill you die on?',
            // loginMessage: 'Can you defend your takes?',
          }
        }}
      >
        <AuthProvider>
          <Loader />
          <ClientLayoutContent>{children}</ClientLayoutContent>
        </AuthProvider>
      </PrivyProvider>
    </LoadingProvider>
  );
}

function ClientLayoutContent({ children }: { children: React.ReactNode }) {

  const { isLoading } = useLoading();

  return (
    <Suspense fallback={<Loader />}>
      <main className={cn(
        'flex min-h-screen w-full p-6',
        'transition-opacity duration-1000',
        isLoading ? 'opacity-0' : 'opacity-100',
        'bg-background sm:bg-foreground',
        'font-user lowercase'
      )}>
        <div className={cn(
          'w-full sm:w-[400px] md:w-[600px]', // Show a box on non-mobile
          'mx-auto py-12 sm:px-6',
          'bg-background',
          // 'flex flex-col items-center',
          'sm:border sm:border-foreground sm:rounded-lg',
        )}>
          {children}
        </div>
      </main>
    </Suspense>
  );
} 