'use client';

import { useRouter } from 'next/navigation';

import cn from '@/util/cn';

import Button from '@/component/primitive/Button';
import Link from '@/component/primitive/Link';

export default function Home() {

  const router = useRouter();

  return (
    <div className="flex flex-col gap-6 justify-between items-center h-full">
      <h1 className="text-6xl font-user">Unhinged</h1>
      <div className={cn(
        'flex flex-col gap-4',
        'items-center',
        'w-full'
      )}>
        <Button
          onClick={() => router.push('/arena')}
          className={cn(
            'w-1/2',
            'text-2xl uppercase',
            'font-user',
          )}
        >
          <span className="translate-y-1">Arena</span>
        </Button>
        <Button
          onClick={() => {}}
          isDisabled={true}
          className={cn(
            'w-1/2',
            'text-2xl uppercase',
            'font-user',
          )}
        >
          <span className="translate-y-1">Spectate</span>
        </Button>
      </div>
      <Link href="docs" isDisabled>docs</Link>
    </div>
  );
}
