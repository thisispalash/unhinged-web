'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { base, flowMainnet } from 'viem/chains';

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
          defaultChain: flowMainnet,
          supportedChains: [base, flowMainnet],
          embeddedWallets: {
            createOnLogin: 'all-users',
          },
          appearance: {
            // logo: '/img/wordmark.png', // TODO: make 2:1 logo
            landingHeader: 'Got any spicy takes?',
            loginMessage: 'And can you defend them?',
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
    <main className={cn(
      'flex min-h-screen w-full p-6',
      'transition-opacity duration-1000',
      isLoading ? 'opacity-0' : 'opacity-100',
      'bg-background sm:bg-foreground',
      'text-system'
    )}>
      <div className={cn(
        'w-full sm:w-[400px]', // Show a box on non-mobile
        'mx-auto py-12 sm:px-6',
        'bg-background',
        // 'flex flex-col items-center',
        'sm:border sm:border-foreground sm:rounded-lg',
      )}>
        {children}
      </div>
    </main>
  );
} 