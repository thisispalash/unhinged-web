'use client';

import Image from 'next/image';

import cn from '@/util/cn';

import { useLoading } from '@/context/LoadingContext';

export default function Loader() {

  const { isLoading } = useLoading();

  return (
    <div className={cn(
      'fixed inset-0 z-50 flex items-center justify-center',
      'transition-all duration-1000',
      'bg-background sm:bg-foreground',
      isLoading ? 'scale-100' : 'scale-[20] opacity-0 pointer-events-none'
    )}>
      <div className={cn(
        'relative h-full',
        'w-full sm:w-[400px] md:w-[600px]', // Show a box on non-mobile
        isLoading && 'animate-pulse'
      )}>
        <Image
          src="/img/logo-clear.png"
          alt="Loading.."
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}