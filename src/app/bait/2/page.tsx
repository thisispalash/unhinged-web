'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import cn from '@/util/cn';

import { useAuth } from '@/context/AuthContext';

import Button from '@/component/primitive/Button';

export default function BaitPageTemplate2() {

  const searchParams = useSearchParams();
  const user = searchParams.get('user');
  const router = useRouter();

  const { user: privyUser } = useAuth();

  return <>
      <head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@theprimefibber" />
        <meta name="twitter:creator" content="@theprimefibber" />
        <meta name="twitter:title" content="Unhinged | Baited" />
        <meta name="twitter:description" content={`Baited by ${user} on Unhinged`} />
        <meta name="twitter:url" content={`https://nhinged.io`} />
        <meta name="twitter:image" content="https://nhinged.io/img/template2.png" />
        <meta name="twitter:image:alt" content={`Unhinged | Baited by ${user}`} />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="900" />

        <meta name="og:title" content="Unhinged | Baited" />
        <meta name="og:description" content={`Baited by ${user} on Unhinged`} />
        <meta name="og:url" content={`https://nhinged.io`} />
        <meta name="og:image" content="https://nhinged.io/img/template2.png" />
        <meta name="og:image:alt" content={`Unhinged | Baited by ${user}`} />
        <meta name="og:image:width" content="1200" />
        <meta name="og:image:height" content="900" />
      </head>

      <div className={cn(
        'w-full h-full',
        'flex flex-col items-center justify-between',
      )}>
        <div className={cn(
          'w-full',
          'flex flex-col gap-4 items-center justify-center',
        )}>
          <h1 className="text-4xl">unhinged</h1>
          <span className="text-xl">baited by {user}?</span>
        </div>
        
        <div className={cn(
          'flex flex-col gap-6 px-3 py-2',
          'border border-foreground rounded-sm',
        )}>
          {/* // eslint-disable-next-line @next/next/no-img-element */}
          <img src={"/img/template2.png"} alt="arena" className={cn(
            'aspect-4/3',
            'object-contain rounded-md'
          )}/>
        </div>

        <div className={cn(
          'w-full',
          'flex flex-col gap-4 items-center justify-center',
        )}>
          {!privyUser && (
            <Button onClick={() => router.push(`/login`)}>
              <span className="font-system">Sign up | Login</span>
            </Button>
          )}
          {privyUser && (
            <Button onClick={() => router.push(`/arena`)}>
              <span className="font-system">arena</span>
            </Button>
          )}
          <span className="text-xl">Get your revenge.</span>
        </div>
      </div>
  </>;
}