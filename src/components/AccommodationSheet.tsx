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
  Lock,
  Home
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
      <SheetContent className="sm:max-w-md overflow-y-auto border-l-orange-100">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-3xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
            {alojamiento.title}
          </SheetTitle>
          <div className="flex items-center text-zinc-500 mt-1">
            <MapPin className="h-4 w-4 mr-1 text-orange-400" />
            <span className="text-sm font-medium">Ubicación aproximada</span>
          </div>
        </SheetHeader>

        <div className="space-y-8 pb-10">
          {alojamiento.image_url && (
            <div className="aspect-video w-full overflow-hidden rounded-2xl border-2 border-orange-50 shadow-inner">
              <img
                src={alojamiento.image_url}
                alt={alojamiento.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-50/50 to-pink-50/50 dark:from-orange-950/20 dark:to-pink-950/20 border border-orange-100/50 dark:border-orange-900/30 space-y-5">
            <div>
              <p className="text-[10px] text-orange-600 dark:text-orange-400 uppercase font-black mb-2 tracking-widest">Tu Puntuación</p>
              <StarRating 
                rating={alojamiento.user_vote || 0} 
                onChange={handleVote}
                className="scale-125 origin-left"
              />
            </div>
            
            <div className="pt-5 border-t border-orange-200/30 dark:border-orange-800/30">
              <p className="text-[10px] text-pink-600 dark:text-pink-400 uppercase font-black mb-2 tracking-widest">Media del Grupo</p>
              {hasVoted ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
                      {alojamiento.avg_rating?.toFixed(1) || "0.0"}
                    </span>
                    <StarRating rating={Math.round(alojamiento.avg_rating || 0)} readOnly className="scale-75" />
                  </div>
                  <span className="text-xs text-zinc-400 font-bold bg-white dark:bg-zinc-800 px-2 py-1 rounded-full shadow-sm">
                    {alojamiento.total_votes} {alojamiento.total_votes === 1 ? 'voto' : 'votos'}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-zinc-400 py-2 bg-white/50 dark:bg-zinc-800/50 rounded-xl px-3 border border-dashed border-zinc-200 dark:border-zinc-700">
                  <Lock className="h-4 w-4" />
                  <span className="text-sm italic font-medium">Vota para desbloquear estadísticas</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black mb-4 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              Detalles del alojamiento
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <p className="text-[10px] text-zinc-400 uppercase font-black mb-1 tracking-wider">Total Estancia</p>
                <div className="flex items-center text-2xl font-black text-zinc-900 dark:text-zinc-100">
                  {alojamiento.price || "N/A"}
                  <span className="text-sm font-normal ml-1">€</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 border-none shadow-lg shadow-orange-200 dark:shadow-none">
                <p className="text-[10px] text-white/80 uppercase font-black mb-1 tracking-wider">Por Persona</p>
                <div className="flex items-center text-2xl font-black text-white">
                  {ppp}
                  <span className="text-sm font-normal ml-1">€</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
              <p className="text-[10px] text-zinc-400 uppercase font-black mb-1 tracking-wider">Habitaciones</p>
              <div className="flex items-center text-xl font-black text-zinc-800 dark:text-zinc-200">
                <Home className="h-5 w-5 mr-2 text-orange-400" />
                {alojamiento.rooms || 0}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black mb-4 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              Características
            </h3>
            <div className="flex flex-wrap gap-2">
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-sm font-bold shadow-sm"
                >
                  <feature.icon className="h-4 w-4 mr-2 text-orange-500" />
                  <span className="text-zinc-700 dark:text-zinc-300">{feature.label}</span>
                </div>
              ))}
              {features.length === 0 && (
                <p className="text-zinc-500 text-sm italic bg-zinc-50 dark:bg-zinc-900 w-full p-4 rounded-xl border border-dashed">No hay características listadas.</p>
              )}
            </div>
          </div>

          {alojamiento.description && (
            <div>
              <h3 className="text-lg font-black mb-3 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                Descripción
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-medium p-4 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                {alojamiento.description}
              </p>
            </div>
          )}

          {alojamiento.link && (
            <a
              href={alojamiento.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-orange-600 to-pink-600 text-white font-black hover:shadow-xl hover:scale-[1.02] transition-all gap-2 shadow-lg shadow-orange-200 dark:shadow-none"
            >
              Ver en Airbnb / Booking
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
