import { useEffect, useState, useMemo, useCallback } from "react";
import { getAlojamientos } from "../lib/alojamientos";
import type { Alojamiento } from "../types/alojamiento";
import { AccommodationCard } from "./AccommodationCard";
import MapComponent from "./MapComponent";
import { AccommodationSheet } from "./AccommodationSheet";
import { useAuth } from "../context/AuthContext";
import { RefreshCw } from "lucide-react";
import { Button } from "./ui/button";

export function DiscoveryView() {
  const { user } = useAuth();
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAlojamiento, setSelectedAlojamiento] = useState<Alojamiento | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const fetchAlojamientos = useCallback(async () => {
    setIsLoading(true);
    const data = await getAlojamientos(user?.slug);
    setAlojamientos(data);
    setIsLoading(false);
  }, [user?.slug]);

  useEffect(() => {
    fetchAlojamientos();
  }, [fetchAlojamientos]);

  const handleSelectAlojamiento = (alojamiento: Alojamiento) => {
    setSelectedAlojamiento(alojamiento);
    setIsSheetOpen(true);
  };

  const handleVoteChange = () => {
    fetchAlojamientos();
  };

  const hasParticipated = useMemo(() => {
    return alojamientos.some(a => a.user_vote !== undefined && a.user_vote !== null);
  }, [alojamientos]);

  const sortedAlojamientos = useMemo(() => {
    if (!hasParticipated) return alojamientos;

    return [...alojamientos].sort((a, b) => {
      // Priorizar por media de rating
      const ratingDiff = (b.avg_rating || 0) - (a.avg_rating || 0);
      if (Math.abs(ratingDiff) > 0.01) return ratingDiff;
      
      // Si el rating es igual, priorizar por número de votos
      const votesDiff = (b.total_votes || 0) - (a.total_votes || 0);
      if (votesDiff !== 0) return votesDiff;

      // Por último, orden de creación
      return new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime();
    });
  }, [alojamientos, hasParticipated]);

  // Sincronizar selectedAlojamiento con los datos actualizados de la lista
  const currentSelectedAlojamiento = useMemo(() => {
    if (!selectedAlojamiento) return null;
    return alojamientos.find(a => a.id === selectedAlojamiento.id) || selectedAlojamiento;
  }, [selectedAlojamiento, alojamientos]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-65px)] overflow-hidden">
      {/* Map Panel */}
      <div className="w-full lg:w-[60%] h-[400px] lg:h-full bg-zinc-100 dark:bg-zinc-900 border-r relative z-0">
        <MapComponent 
          alojamientos={sortedAlojamientos} 
          onSelectAlojamiento={handleSelectAlojamiento}
          selectedAlojamientoId={selectedAlojamiento?.id}
        />
      </div>

      {/* List Panel */}
      <div className="w-full lg:w-[40%] h-full overflow-y-auto p-6 bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Descubrir</h2>
            <p className="text-sm text-zinc-500">
              {hasParticipated ? "Ordenado por valoración" : "Ordenado por fecha"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-500 mr-2">{alojamientos.length} opciones</span>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={fetchAlojamientos}
              disabled={isLoading}
              className="h-8 w-8"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {isLoading && alojamientos.length === 0 ? (
          <div className="flex justify-center py-20">
            <p className="text-zinc-500 animate-pulse">Cargando alojamientos...</p>
          </div>
        ) : sortedAlojamientos.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-xl border border-dashed">
            <p className="text-zinc-500">No se encontraron alojamientos.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {sortedAlojamientos.map((alojamiento) => (
              <AccommodationCard 
                key={alojamiento.id} 
                alojamiento={alojamiento} 
                onClick={() => handleSelectAlojamiento(alojamiento)}
                onVote={handleVoteChange}
              />
            ))}
          </div>
        )}
      </div>

      <AccommodationSheet 
        alojamiento={currentSelectedAlojamiento}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        onVote={handleVoteChange}
      />
    </div>
  );
}
