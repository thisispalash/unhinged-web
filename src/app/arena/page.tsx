'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';

import cn from '@/util/cn';

import { useAuth } from '@/context/AuthContext';

import Link from '@/component/primitive/Link';
import Button from '@/component/primitive/Button';
import UserDisplay from '@/component/UserDisplay';

const taunts = [
  'im not wrong, ur wrong.\n\nshare yours on #unhinged by @theprimefibber',
  'yeah, i said it. what you gonna do?\n\nbattle me on #unhinged by @theprimefibber',
  'fight me bro. fucking fight me.\n\non #unhinged by @theprimefibber'
]

function LogoutButton() {

  const { ready, authenticated, logout } = usePrivy();

  // Disable logout when Privy is not ready or the user is not authenticated
  const disableLogout = !ready || (ready && !authenticated);

  return (
    <Button onClick={logout} isDisabled={disableLogout} className="border-none">
      {/* Logout icon */}
      <svg  xmlns="http://www.w3.org/2000/svg"  width={24}  height={24}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={1.25}  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
    </Button>
  );
}

export default function ArenaPage() {

  const [ imgSrc, setImgSrc ] = useState<string | null>(null);
  const [ take, setTake ] = useState<string | null>(null);
  const [ template, setTemplate ] = useState<number | null>(null);

  const router = useRouter();
  const { display } = useAuth();

  useEffect(() => {
    const template = localStorage.getItem('unhinged:template');
    const take = localStorage.getItem('unhinged:take');

    if (template && take) {
      setImgSrc(`/img/template${template}.png`);
      setTake(take);
      setTemplate(Number(template));
    }
  }, []);

  const makeTweetIntent = () => {
    const tweetText = `Here's my take,\n"${take}"\n\n${taunts[template ?? 1]}\n`;
    
    const params = new URLSearchParams({
      text: tweetText,
      url: `https://nhinged.io/bait/${template}?user=${display}`,
    });

    const url = `https://twitter.com/intent/tweet?${params.toString()}`;
    window.open(url, '_blank');
  }

  const collectEmail = () => {
    // TODO: Implement email collection
  }

  const makeFollowIntent = () => {
    window.open('https://x.com/intent/follow?screen_name=theprimefibber', '_blank');
  }

  return (
    <div className={cn(
      'w-full h-full',
      'flex flex-col justify-between items-center',
    )}>

      {/* Header */}
      <div className={cn(
        'w-full',
        'flex flex-row justify-between items-center',
      )}>
        <UserDisplay />
        <LogoutButton />
      </div>

      {/* Arena */}
      <div className={cn(
        'w-full',
        'flex flex-col gap-2',
      )}>
        <div className={cn(
          'flex flex-col gap-6 px-3 py-2',
          'border border-foreground rounded-sm',
        )}>
          <div className={cn(
            'w-full p-1',
            // imgSrc && 'border border-foreground rounded-sm',
          )}>
            {imgSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imgSrc} alt="arena" className={cn(
                {
                  'aspect-3/4': imgSrc.includes('template0'),
                  'aspect-4/3': imgSrc.includes('template1') || imgSrc.includes('template2'),
                },
                'object-contain rounded-md'
              )}/>
            )}
          </div>
          <span className="font-user text-2xl">{take}</span>
          <Button onClick={makeTweetIntent} className="self-end px-1.5 py-0.5 font-system">bait 𝕏&nbsp;?</Button>
        </div>
        <Link href="onboard" className="self-start text-sm px-3">change take?</Link>
      </div>


      {/* Actions */}
      <div className={cn(
        'flex flex-col gap-3'
      )}>
        <Button onClick={makeFollowIntent} className="w-full px-1.5 py-1 sm:font-system">follow development</Button>
        {/* <Button onClick={collectEmail} className="w-full px-1.5 py-0.5 font-system sm:hidden">get notified?</Button> */}
      </div>


      {/* Disclaimer */}
      {/* <div className={cn(
        'fixed bottom-0',
        'w-full pb-2 sm:pb-4 px-4',
        'flex-row justify-between items-center',
        'hidden sm:flex',
        'sm:text-lg sm:text-background',
      )}>
        <Button onClick={collectEmail} className="border-none">get notified?</Button>
        <span>Product goes live Labor Day!</span>
      </div> */}
    </div>
  );
}