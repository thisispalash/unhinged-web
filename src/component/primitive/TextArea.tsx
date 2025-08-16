'use client';

import { useEffect, useState } from 'react';

import cn from '@/util/cn';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  maxSize?: number;
  rows?: number;
  placeholder?: string;
  className?: string;
}

export default function TextArea({ 
  value, 
  onChange, 
  maxSize = 0,
  rows = 8,
  placeholder, 
  className,
}: TextAreaProps) {

  const [ error, setError ] = useState<string | null>(null);

  useEffect(() => {
    if (!maxSize) return;
    if (value.length > maxSize) {
      setError('max 200 characters');
    } else {
      setError(null);
    }
  }, [value]);


  return (
    <div className={cn(
      'w-full h-full',
      'flex flex-col gap-1',
      'items-center justify-center',
    )}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          'w-full h-full',
          'px-2 py-1 font-user',
          'border border-foreground',
          'rounded-lg text-xl',
          'resize-none',
          'focus:outline-none focus:ring-0',
          className,
        )}
      />
      {error && (
        <span className="italic font-user">
          {error}
        </span>
      )}
    </div>
  );
}