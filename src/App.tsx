import { useAuth } from './context/AuthContext';
import { LoginView } from './components/LoginView';
import { Button } from './components/ui/button';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { Toaster } from './components/ui/sonner';
import { ThemeToggle } from './components/ui/theme-toggle';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (!user) return <LoginView />;

  return <>{children}</>;
}

function App() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <header className="border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Brahcaciones</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-500 capitalize">
              Hola, {user?.slug} ({user?.role})
            </span>
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={logout}>
              Cerrar sesión
            </Button>
          </div>
        </header>
        <main className="p-6">
          {user?.role === 'admin' ? (
            <AdminDashboard />
          ) : (
            <div className="max-w-4xl mx-auto text-center py-20 space-y-4">
              <h2 className="text-4xl font-bold tracking-tight">Bienvenido a Brahcaciones</h2>
              <p className="text-zinc-500 text-lg">
                Pronto podrás ver y gestionar los alojamientos de vacaciones.
              </p>
            </div>
          )}
        </main>
      </div>
      <Toaster />
    </ProtectedRoute>
  );
}

export default App;
