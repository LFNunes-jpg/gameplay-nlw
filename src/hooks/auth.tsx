import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { clearSession, deleteUser, loginDiscordDemo, loginUser, registerUser, restoreSession } from '../services/auth';
import type { UserProps } from '../types';

type AuthContextData = {
  user: UserProps | null;
  loading: boolean; // true enquanto verifica se já existe sessão salva
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signUp: (data: { name: string; email: string; password: string }) => Promise<void>;
  signInWithDiscord: () => Promise<void>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreSession()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextData>(
    () => ({
      user,
      loading,
      signIn: async (data) => setUser(await loginUser(data)),
      signUp: async (data) => setUser(await registerUser(data)),
      signInWithDiscord: async () => setUser(await loginDiscordDemo()),
      signOut: async () => {
        await clearSession();
        setUser(null);
      },
      deleteAccount: async () => {
        if (!user) return;
        await deleteUser(user.id);
        setUser(null);
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return context;
}
