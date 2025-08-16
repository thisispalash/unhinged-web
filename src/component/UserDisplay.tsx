'use client';

import cn from '@/util/cn';

import { useAuth } from '@/context/AuthContext';

export default function UserDisplay() {

  const { display, pfp } = useAuth();

  return (
    <div className={cn(
      'flex flex-row gap-2',
      'items-center',
    )}>
      {pfp && (
        <img 
          src={pfp} 
          alt="x-pfp" 
          className={cn(
            'size-10',
            'border border-foreground',
            'p-0.5 rounded-full',
          )} />
      )}
      <span className="font-user translate-y-0.5">{display}</span>
    </div>
  );
}