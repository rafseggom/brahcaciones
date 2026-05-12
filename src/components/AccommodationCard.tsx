import { Euro, MapPin, Waves, Flame, Bed, Umbrella, Lock } from "lucide-react";
import { Alojamiento } from "../types/alojamiento";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { StarRating } from "./ui/StarRating";
import { useAuth } from "../context/AuthContext";
import { upsertVote } from "../lib/votos";

interface AccommodationCardProps {
  alojamiento: Alojamiento;
  onClick?: () => void;
  onVote?: () => void;
}

export function AccommodationCard({ alojamiento, onClick, onVote }: AccommodationCardProps) {
  const { user } = useAuth();
  const GROUP_SIZE = 5;
  const priceNum = alojamiento.price ? parseFloat(alojamiento.price) : 0;
  const ppp = priceNum ? (priceNum / GROUP_SIZE).toFixed(2) : "N/A";

  const features = [
    { icon: Waves, value: alojamiento.has_pool },
    { icon: Flame, value: alojamiento.has_bbq },
    { icon: Bed, value: alojamiento.individual_beds || alojamiento.sofa_bed },
    { icon: Umbrella, value: alojamiento.near_beach },
  ].filter(f => f.value);

  const handleVote = async (rating: number) => {
    if (!user) return;
    const { error } = await upsertVote(alojamiento.id, user.slug, rating);
    if (!error && onVote) {
      onVote();
    }
  };

  const hasVoted = alojamiento.user_vote !== undefined && alojamiento.user_vote !== null;

  return (
    <Card 
      className="group relative flex flex-col sm:flex-row overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-zinc-200 dark:border-zinc-800"
      onClick={onClick}
    >
      <div className="w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
        {alojamiento.image_url ? (
          <img
            src={alojamiento.image_url}
            alt={alojamiento.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-zinc-400">
            <MapPin className="h-8 w-8 opacity-20" />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg leading-tight group-hover:text-blue-600 transition-colors">
            {alojamiento.title}
          </h3>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-100 dark:border-blue-800">
            <Euro className="h-3 w-3 mr-0.5" />
            {ppp} / pers
          </Badge>
        </div>

        <div className="flex items-center gap-3 mb-3" onClick={(e) => e.stopPropagation()}>
          <StarRating 
            rating={alojamiento.user_vote || 0} 
            onChange={handleVote}
          />
          {hasVoted ? (
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                {alojamiento.avg_rating?.toFixed(1)}
              </span>
              <span className="text-[10px] text-zinc-400 font-medium">
                ({alojamiento.total_votes} {alojamiento.total_votes === 1 ? 'voto' : 'votos'})
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-zinc-400">
              <Lock className="h-3 w-3" />
              <span className="text-[11px] italic">Vota para ver la media</span>
            </div>
          )}
        </div>

        <p className="text-zinc-500 text-sm line-clamp-1 mb-4">
          {alojamiento.description || "Sin descripción disponible."}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex gap-2">
            {features.slice(0, 4).map((Feature, i) => (
              <div key={i} className="p-1.5 rounded-md bg-zinc-50 dark:bg-zinc-900 border text-zinc-500">
                <Feature.icon className="h-3.5 w-3.5" />
              </div>
            ))}
          </div>
          <div className="text-right">
            <p className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Total</p>
            <p className="font-bold text-zinc-900 dark:text-zinc-100">{alojamiento.price ? `${alojamiento.price}€` : "N/A"}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
