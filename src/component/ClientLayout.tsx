'use client';

import cn from '@/util/cn';

import LoadingProvider, { useLoading } from '@/context/LoadingContext';

import Loader from '@/component/Loader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {

  return (
    <LoadingProvider>
      <Loader />
      <ClientLayoutContent>{children}</ClientLayoutContent>
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
        'mx-auto py-12',
        'bg-background',
        // 'flex flex-col items-center',
        'sm:border sm:border-foreground sm:rounded-lg',
      )}>
        {children}
      </div>
    </main>
  );
} 