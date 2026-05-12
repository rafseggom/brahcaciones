import React, { createContext, useContext, useState, useEffect } from 'react';

type UserRole = 'user' | 'admin';
interface AuthUser { slug: string; role: UserRole; }
interface AuthContextType {
  user: AuthUser | null;
  login: (code: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('brahcaciones_auth');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem('brahcaciones_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (code: string) => {
    const codes: Record<string, string> = {
      [import.meta.env.VITE_AUTH_ADMIN]: 'admin',
      [import.meta.env.VITE_AUTH_USER1]: 'molten',
      [import.meta.env.VITE_AUTH_USER2]: 'kevirolo',
      [import.meta.env.VITE_AUTH_USER3]: 'wargios',
      [import.meta.env.VITE_AUTH_USER4]: 'gonpar',
      [import.meta.env.VITE_AUTH_USER5]: 'dekker',
    };
    
    const slug = codes[code];
    if (slug) {
      const newUser = { slug, role: slug === 'admin' ? 'admin' : 'user' } as AuthUser;
      setUser(newUser);
      localStorage.setItem('brahcaciones_auth', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('brahcaciones_auth');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
