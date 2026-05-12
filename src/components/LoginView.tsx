import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function LoginView() {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(code)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Vacaciones con los bros
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Introduce tu código de acceso
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Código de acceso"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={error ? "border-red-500" : ""}
            />
            {error && (
              <p className="text-sm text-red-500">Código incorrecto. Inténtalo de nuevo.</p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  );
}
