import { MapPin, Waves, Flame, Bed, Umbrella, Lock } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { Alojamiento } from "../types/alojamiento";
import { Card } from "./ui/card";
import { StarRating } from "./ui/StarRating";
import { useAuth } from "../context/AuthContext";
import { upsertVote } from "../lib/votos";

interface AccommodationCardProps {
  alojamiento: Alojamiento;
  onClick?: () => void;
  onVote?: () => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

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
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card 
        className="group relative flex flex-col h-full sm:flex-row overflow-hidden shadow-soft hover:shadow-2xl transition-shadow duration-500 cursor-pointer border-zinc-200 dark:border-zinc-800 hover:border-orange-200 dark:hover:border-orange-900/50 rounded-2xl"
        onClick={onClick}
      >
        <div className="w-full sm:w-48 h-48 sm:h-auto overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
          {alojamiento.image_url ? (
            <img
              src={alojamiento.image_url}
              alt={alojamiento.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-zinc-400">
              <MapPin className="h-8 w-8 opacity-20" />
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-xl leading-tight group-hover:text-orange-600 transition-colors pr-4">
              {alojamiento.title}
            </h3>
            <div className="flex flex-col items-end shrink-0">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-extrabold rounded-xl px-4 py-1.5 text-lg shadow-md transform group-hover:rotate-2 transition-transform">
                {alojamiento.price ? `${alojamiento.price}€` : "N/A"}
              </div>
              <span className="text-[11px] font-bold text-zinc-400 mt-1 uppercase tracking-wider">
                {ppp}€ / pers
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mb-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-bold bg-zinc-100 dark:bg-zinc-800/50 px-2.5 py-1 rounded-full text-xs">
              <Bed className="h-3.5 w-3.5 text-orange-500" />
              <span>{alojamiento.rooms} habs</span>
            </div>

            <div className="flex items-center gap-3">
              <StarRating 
                rating={alojamiento.user_vote || 0} 
                onChange={handleVote}
              />
              {hasVoted ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-extrabold text-zinc-700 dark:text-zinc-300">
                    {alojamiento.avg_rating?.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-bold">
                    ({alojamiento.total_votes})
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-zinc-400">
                  <Lock className="h-3 w-3" />
                  <span className="text-[11px] italic font-medium">Vota para ver</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-zinc-500 text-sm line-clamp-1 mb-4 font-medium">
            {alojamiento.description || "Sin descripción disponible."}
          </p>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex gap-1.5">
              {features.slice(0, 5).map((Feature, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="p-1.5 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 text-zinc-500 group-hover:text-orange-500 group-hover:border-orange-100 transition-colors shadow-sm"
                >
                  <Feature.icon className="h-3.5 w-3.5" />
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-1 text-orange-500 font-extrabold text-sm group-hover:translate-x-1 transition-transform">
              Ver detalles
              <span className="text-lg">→</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
