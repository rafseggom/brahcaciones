import { Alojamiento } from "../types/alojamiento";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Users, Wifi, Wind, Car, Coffee } from "lucide-react";

interface AccommodationCardProps {
  alojamiento: Alojamiento;
}

export function AccommodationCard({ alojamiento }: AccommodationCardProps) {
  const ppp = Math.round(alojamiento.price / 5);

  const featuresMap: Record<string, React.ReactNode> = {
    wifi: <Wifi className="h-4 w-4" />,
    ac: <Wind className="h-4 w-4" />,
    parking: <Car className="h-4 w-4" />,
    pool: <div className="h-4 w-4 border-2 border-current rounded-full" />, // Simple pool icon
    breakfast: <Coffee className="h-4 w-4" />,
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-zinc-200 dark:border-zinc-800">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg leading-tight">{alojamiento.title}</CardTitle>
          <Badge variant="secondary" className="whitespace-nowrap">
            {alojamiento.type}
          </Badge>
        </div>
        <div className="flex items-center text-zinc-500 text-sm gap-1 mt-1">
          <MapPin className="h-3 w-3" />
          <span>{alojamiento.location}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="flex flex-wrap gap-2 mt-2">
          {alojamiento.features.slice(0, 4).map((feature) => (
            <div 
              key={feature} 
              className="flex items-center gap-1 text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded"
              title={feature}
            >
              {featuresMap[feature.toLowerCase()] || feature}
            </div>
          ))}
          {alojamiento.features.length > 4 && (
            <span className="text-xs text-zinc-400">+{alojamiento.features.length - 4}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-2 border-t flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500">Total</span>
          <span className="font-semibold text-sm">€{alojamiento.price}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-zinc-500">Por persona (5)</span>
          <span className="font-bold text-xl text-primary">€{ppp}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
