'use client';

import { createContext, useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { type User, usePrivy } from '@privy-io/react-auth';

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const pathname = usePathname();
  const { authenticated, user } = usePrivy();

  useEffect(() => {
    if (
      !authenticated 
      && pathname !== '/login' 
      && pathname !== '/'
    )  {
      router.push(`/login?redirect=${pathname.split('/').slice(1).join('/')}`);
    }
  }, [authenticated, pathname, router]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}