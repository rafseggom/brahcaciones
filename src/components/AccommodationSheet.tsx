import type { Alojamiento } from "../types/alojamiento";
import MapComponent from "./MapComponent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Flame,
  Bed,
  Umbrella, 
  Waves,
  ExternalLink,
  MapPin,
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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton
        className="max-w-[96vw] w-[96vw] max-h-[92vh] overflow-hidden border border-zinc-200/80 bg-white p-0 shadow-2xl dark:border-zinc-800/80 dark:bg-zinc-950"
      >
        <div className="grid max-h-[92vh] lg:grid-cols-[1.35fr_0.95fr]">
          <div className="min-h-0 overflow-y-auto px-6 py-6 sm:px-10 sm:py-10 lg:px-12">
            <DialogHeader className="mb-6 pr-10">
              <DialogTitle className="text-3xl font-black tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
                {alojamiento.title}
              </DialogTitle>
              <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span>Vista detallada del alojamiento seleccionado</span>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                {alojamiento.image_url ? (
                  <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 aspect-[16/11] xl:aspect-[4/3]">
                    <img
                      src={alojamiento.image_url}
                      alt={alojamiento.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-64 items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-zinc-50 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="text-center">
                      <Home className="mx-auto mb-2 h-10 w-10 opacity-40" />
                      <p className="text-sm font-medium">Sin imagen disponible</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4 rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-600 dark:text-orange-400">Tu puntuación</p>
                    <div className="mt-3">
                      <StarRating
                        rating={alojamiento.user_vote || 0}
                        onChange={handleVote}
                        className="scale-110 origin-left"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-950">
                    <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-400">Valoración media</p>
                    {hasVoted ? (
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-end gap-2">
                            <span className="text-4xl font-black text-zinc-950 dark:text-zinc-50">
                              {alojamiento.avg_rating?.toFixed(1) || "0.0"}
                            </span>
                            <span className="pb-1 text-sm font-bold text-zinc-400">
                              / 5
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                            {alojamiento.total_votes} {alojamiento.total_votes === 1 ? 'voto' : 'votos'}
                          </p>
                        </div>
                        <StarRating rating={Math.round(alojamiento.avg_rating || 0)} readOnly />
                      </div>
                    ) : (
                      <div className="mt-3 flex items-center gap-2 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 px-4 py-3 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
                        <Lock className="h-4 w-4" />
                        <span className="text-sm font-medium">Vota para desbloquear estadísticas</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-950">
                      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-400">Total</p>
                      <div className="mt-2 text-2xl font-black text-zinc-950 dark:text-zinc-50">
                        {alojamiento.price || 'N/A'}€
                      </div>
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 p-4 text-white shadow-lg shadow-orange-200/50 dark:shadow-none">
                      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/80">Por persona</p>
                      <div className="mt-2 text-2xl font-black">
                        {ppp}€
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-400">Habitaciones</p>
                  <div className="mt-2 flex items-center text-2xl font-black text-zinc-950 dark:text-zinc-50">
                    <Home className="mr-2 h-5 w-5 text-orange-500" />
                    {alojamiento.rooms || 0}
                  </div>
                </div>
                <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-400">Características</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {features.length > 0 ? features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm font-bold text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
                      >
                        <feature.icon className="mr-2 h-4 w-4 text-orange-500" />
                        {feature.label}
                      </div>
                    )) : (
                      <p className="text-sm italic text-zinc-500">No hay características listadas.</p>
                    )}
                  </div>
                </div>
              </div>

              {alojamiento.description && (
                <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-400">Descripción</p>
                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    {alojamiento.description}
                  </p>
                </div>
              )}

              {alojamiento.link && (
                <a
                  href={alojamiento.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-600 to-pink-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-orange-200 transition-transform hover:scale-[1.01] dark:shadow-none"
                >
                  Ver en Airbnb / Booking
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div className="min-h-[360px] border-t border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 lg:min-h-0 lg:border-t-0 lg:border-l">
            <div className="flex h-full flex-col">
              <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-zinc-400">Mapa</p>
              </div>
              <div className="min-h-[360px] flex-1">
                <MapComponent
                  alojamientos={[alojamiento]}
                  selectedAlojamientoId={alojamiento.id}
                  onSelectAlojamiento={() => undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
