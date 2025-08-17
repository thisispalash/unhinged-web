'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type User, usePrivy } from '@privy-io/react-auth';

import { useLoading } from '@/context/LoadingContext';

interface AuthContextType {
  user: User | null;
  display: string | null;
  pfp: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const pathname = usePathname();
  const { ready, authenticated, user } = usePrivy();
  const { addLoadingSource, removeLoadingSource } = useLoading();

  const [ display, setDisplay ] = useState<string | null>(null);
  const [ pfp, setPfp ] = useState<string | null>(null);

  useEffect(() => {
    if (!ready) {
      addLoadingSource('privy-not-ready');
      return;
    } else {
      removeLoadingSource('privy-not-ready');
    }

    if (
      ready &&
      !authenticated 
      && pathname !== '/login' 
      && pathname !== '/'
      && !pathname.includes('/bait')
    )  {
      router.push(`/login?redirect=${pathname.split('/').slice(1).join('/')}`);
    }
  }, [ready, authenticated, pathname, router]);

  useEffect(() => {
    if (user) {
      const twitter = user.linkedAccounts.find((account) => account.type === 'twitter_oauth');
      setDisplay(twitter?.username || null);
      setPfp(twitter?.profilePictureUrl || null);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, display, pfp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}