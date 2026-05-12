import type { Alojamiento } from "../types/alojamiento";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import {
  Flame,
  Bed,
  Umbrella, 
  Waves,
  ExternalLink,
  MapPin,
  Euro,
  Lock
} from "lucide-react";
import { StarRating } from "./ui/StarRating";
import { useAuth } from "../context/AuthContext";
import { upsertVote } from "../lib/votos";

interface AccommodationSheetProps {
  alojamiento: Alojamiento | null;
  isOpen: boolean;
  onClose: () => void;
  onVote?: () => void;
}

export function AccommodationSheet({
  alojamiento,
  isOpen,
  onClose,
  onVote
}: AccommodationSheetProps) {
  const { user } = useAuth();
  if (!alojamiento) return null;

  const features = [
    { label: "Piscina", icon: Waves, value: alojamiento.has_pool },
    { label: "Barbacoa", icon: Flame, value: alojamiento.has_bbq },
    { label: "Camas individuales", icon: Bed, value: alojamiento.individual_beds },
    { label: "Sofá cama", icon: Bed, value: alojamiento.sofa_bed },
    { label: "Cerca de la playa", icon: Umbrella, value: alojamiento.near_beach },
  ].filter(f => f.value);

  const GROUP_SIZE = 5;
  const priceNum = alojamiento.price ? parseFloat(alojamiento.price) : 0;
  const ppp = priceNum ? (priceNum / GROUP_SIZE).toFixed(2) : "N/A";

  const handleVote = async (rating: number) => {
    if (!user || !alojamiento) return;
    const { error } = await upsertVote(alojamiento.id, user.slug, rating);
    if (!error && onVote) {
      onVote();
    }
  };

  const hasVoted = alojamiento.user_vote !== undefined && alojamiento.user_vote !== null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-2xl">{alojamiento.title}</SheetTitle>
          <div className="flex items-center text-zinc-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">Ubicación aproximada</span>
          </div>
        </SheetHeader>

        <div className="space-y-8">
          {alojamiento.image_url && (
            <div className="aspect-video w-full overflow-hidden rounded-xl border">
              <img
                src={alojamiento.image_url}
                alt={alojamiento.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border space-y-4">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-2 tracking-wider">Tu Puntuación</p>
              <StarRating 
                rating={alojamiento.user_vote || 0} 
                onChange={handleVote}
                className="scale-110 origin-left"
              />
            </div>
            
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <p className="text-[10px] text-zinc-500 uppercase font-bold mb-2 tracking-wider">Media del Grupo</p>
              {hasVoted ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
                      {alojamiento.avg_rating?.toFixed(1) || "0.0"}
                    </span>
                    <StarRating rating={Math.round(alojamiento.avg_rating || 0)} readOnly className="scale-75" />
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">
                    basada en {alojamiento.total_votes} {alojamiento.total_votes === 1 ? 'voto' : 'votos'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-zinc-400 py-1">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm italic">Vota para desbloquear las estadísticas del grupo</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-zinc-100">Detalles Financieros</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border">
                <p className="text-[10px] text-zinc-500 uppercase font-bold mb-1 tracking-wider">Total</p>
                <div className="flex items-center text-xl font-bold">
                  <Euro className="h-4 w-4 mr-1 text-zinc-400" />
                  {alojamiento.price || "N/A"}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
                <p className="text-[10px] text-blue-600 dark:text-blue-400 uppercase font-bold mb-1 tracking-wider">Por Persona</p>
                <div className="flex items-center text-xl font-bold text-blue-700 dark:text-blue-300">
                  <Euro className="h-4 w-4 mr-1 text-blue-400" />
                  {ppp}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3 text-zinc-900 dark:text-zinc-100">Características</h3>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center px-3 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-900 border text-sm"
                >
                  <feature.icon className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-zinc-700 dark:text-zinc-300">{feature.label}</span>
                </div>
              ))}
              {features.length === 0 && (
                <p className="text-zinc-500 text-sm">No hay características listadas.</p>
              )}
            </div>
          </div>

          {alojamiento.description && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">Descripción</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                {alojamiento.description}
              </p>
            </div>
          )}

          {alojamiento.link && (
            <a
              href={alojamiento.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-4 px-6 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors gap-2"
            >
              Ver en Airbnb / Booking
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
