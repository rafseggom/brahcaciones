import { Euro, MapPin, Waves, Flame, Bed, Umbrella } from "lucide-react";
import { Alojamiento } from "../types/alojamiento";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

interface AccommodationCardProps {
  alojamiento: Alojamiento;
  onClick?: () => void;
}

export function AccommodationCard({ alojamiento, onClick }: AccommodationCardProps) {
  const GROUP_SIZE = 5;
  const ppp = alojamiento.price ? (alojamiento.price / GROUP_SIZE).toFixed(2) : "N/A";

  const features = [
    { icon: Waves, value: alojamiento.has_pool },
    { icon: Flame, value: alojamiento.has_bbq },
    { icon: Bed, value: alojamiento.individual_beds || alojamiento.sofa_bed },
    { icon: Umbrella, value: alojamiento.near_beach },
  ].filter(f => f.value);

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
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg leading-tight group-hover:text-blue-600 transition-colors">
            {alojamiento.title}
          </h3>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-100 dark:border-blue-800">
            <Euro className="h-3 w-3 mr-0.5" />
            {ppp} / pers
          </Badge>
        </div>

        <p className="text-zinc-500 text-sm line-clamp-2 mb-4">
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
