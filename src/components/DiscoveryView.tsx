import { useEffect, useState } from "react";
import { getAlojamientos } from "../lib/alojamientos";
import { Alojamiento } from "../types/alojamiento";
import { AccommodationCard } from "./AccommodationCard";
import MapComponent from "./MapComponent";
import { AccommodationSheet } from "./AccommodationSheet";

export function DiscoveryView() {
  const [alojamientos, setAlojamientos] = useState<Alojamiento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAlojamiento, setSelectedAlojamiento] = useState<Alojamiento | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const fetchAlojamientos = async () => {
      const data = await getAlojamientos();
      setAlojamientos(data);
      setIsLoading(false);
    };
    fetchAlojamientos();
  }, []);

  const handleSelectAlojamiento = (alojamiento: Alojamiento) => {
    setSelectedAlojamiento(alojamiento);
    setIsSheetOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-65px)] overflow-hidden">
      {/* Map Panel */}
      <div className="w-full lg:w-[60%] h-[400px] lg:h-full bg-zinc-100 dark:bg-zinc-900 border-r relative z-0">
        <MapComponent 
          alojamientos={alojamientos} 
          onSelectAlojamiento={handleSelectAlojamiento}
          selectedAlojamientoId={selectedAlojamiento?.id}
        />
      </div>

      {/* List Panel */}
      <div className="w-full lg:w-[40%] h-full overflow-y-auto p-6 bg-zinc-50/50 dark:bg-zinc-950/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Descubrir</h2>
          <span className="text-sm text-zinc-500">{alojamientos.length} opciones</span>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <p className="text-zinc-500 animate-pulse">Cargando alojamientos...</p>
          </div>
        ) : alojamientos.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-xl border border-dashed">
            <p className="text-zinc-500">No se encontraron alojamientos.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {alojamientos.map((alojamiento) => (
              <AccommodationCard 
                key={alojamiento.id} 
                alojamiento={alojamiento} 
                onClick={() => handleSelectAlojamiento(alojamiento)}
              />
            ))}
          </div>
        )}
      </div>

      <AccommodationSheet 
        alojamiento={selectedAlojamiento}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </div>
  );
}
