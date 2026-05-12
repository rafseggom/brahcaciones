import { useAuth } from './context/AuthContext';
import { LoginView } from './components/LoginView';
import { Button } from './components/ui/button';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { DiscoveryView } from './components/DiscoveryView';
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
      <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col transition-colors duration-300">
        <header className="border-b px-8 py-4 flex justify-between items-center bg-white dark:bg-zinc-950 z-10 shrink-0 transition-colors duration-300">
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
        <main className="flex-1 overflow-hidden">
          {user?.role === 'admin' ? (
            <div className="px-8 py-6 h-full overflow-y-auto">
              <AdminDashboard />
            </div>
          ) : (
            <DiscoveryView />
          )}
        </main>
      </div>
      <Toaster />
    </ProtectedRoute>
  );
}

export default App;
