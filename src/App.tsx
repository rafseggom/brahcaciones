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
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col transition-colors duration-500 font-sans">
        <header className="border-b border-zinc-100 dark:border-zinc-800 px-8 py-5 flex justify-between items-center bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 shrink-0 transition-all duration-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform cursor-default">
              <span className="text-white font-black text-xl">B</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 m-0">
              Brahcaciones
            </h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
                {user?.role}
              </span>
              <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300 capitalize">
                {user?.slug}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="font-bold text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors rounded-lg"
              >
                Salir
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-hidden">
          {user?.role === 'admin' ? (
            <div className="px-8 py-8 h-full overflow-y-auto bg-zinc-50/50 dark:bg-zinc-950/50">
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
