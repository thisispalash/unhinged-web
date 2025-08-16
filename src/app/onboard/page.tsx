'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import cn from '@/util/cn';

import UserDisplay from '@/component/UserDisplay';
import TextArea from '@/component/primitive/TextArea';
import Button from '@/component/primitive/Button';
import Link from '@/component/primitive/Link';

const suggestions = [
  'Pineapple belongs on pizza.',
  'Thanos was a hundred percent right.',
  'Democracy is for the people, of the people, by the people; but the people are retarded!',
  'Believe in somETHing? Nah brah, go with the FLOW!',
  'Blockchain, crypto, and scammer\'s paradise, they\'re all the same.',
  'A hot dog is a taco.',
  'The scientific method is objective, science is subjective.',
  'Vaccines cause autism.'
]

export default function OnboardPage() {

  const [ take, setTake ] = useState<string | null>(null);
  const [ step, setStep ] = useState<0 | 1>(0);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const finishOnboarding = (template: 0 | 1 | 2) => {
    console.log('finishOnboarding', take, template);
    fetch('/api/onboard', {
      method: 'POST',
      body: JSON.stringify({ take, template }),
    })
    .then(() => router.push(redirect ?? '/home'))
  }

  const suggestTake = () => {
    setTake(suggestions[Math.floor(Math.random() * suggestions.length)]);
  }

  return (
    <div className={cn(
      'my-auto h-full',
      'flex flex-col gap-6',
      'justify-between items-center',
    )}>
      <div className={cn(
        'flex flex-col gap-1',
        'items-center',
        'text-xl'
      )}>
        <span className="font-user text-2xl">Welcome to Unhinged,</span>
        <UserDisplay />
      </div>

      {step === 0 && (
        <div className={cn(
          'flex flex-col gap-4',
        )}>
          <span className="font-user text-4xl">what's your hot take?</span>
          <TextArea
            value={take ?? ''}
            onChange={setTake}
            maxSize={200}
            placeholder="max 200 characters.."
          />
          <Link href="#" onClick={suggestTake} className="font-user w-full text-right">
            suggest
          </Link>
        </div>
      )}

      {step === 0 && (
        <div className={cn(
          'w-full',
          'flex flex-row gap-2',
          'items-center',
        )}>
          <Button
            onClick={() => setStep(1)}
            className="w-full font-user"
          >
            select template
          </Button>
        </div>
      )}

      {step === 1 && (
        <div className={cn(
          'flex flex-col gap-2',
        )}>
          <img 
            src="/img/template0.png" 
            alt="template 0" 
            className="aspect-16/9 rounded-sm p-1 border border-foreground cursor-pointer" 
            onClick={() => finishOnboarding(0)}
          />
          <img 
            src="/img/template1.png" 
            alt="template 1" 
            className="aspect-16/9 rounded-sm p-1 border border-foreground cursor-pointer" 
            onClick={() => finishOnboarding(1)}
          />
          <img 
            src="/img/template2.png" 
            alt="template 2" 
            className="aspect-16/9 rounded-sm p-1 border border-foreground cursor-pointer" 
            onClick={() => finishOnboarding(2)}
          />
        </div>
      )}

      {step === 1 && (
        <div className={cn(
          'w-full',
          'flex flex-row gap-2',
          'items-center',
        )}>
          <Button
            onClick={() => setStep(0)}
            className="w-full font-user"
          >
            back
          </Button>
        </div>
      )}
    </div>
  );
}