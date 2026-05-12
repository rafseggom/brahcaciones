import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Alojamiento } from '@/types/alojamiento';
import { createAlojamiento, updateAlojamiento } from '@/lib/alojamientos';
import { toast } from 'sonner';
import { Waves, Flame, Bed, Armchair, Umbrella } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

import { GeocodingSearch } from './GeocodingSearch';

interface AlojamientoFormProps {
  alojamiento?: Alojamiento;
  onSuccess: () => void;
  onCancel: () => void;
}

export const AlojamientoForm: React.FC<AlojamientoFormProps> = ({
  alojamiento,
  onSuccess,
  onCancel,
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Alojamiento, 'id' | 'created_at'>>({
    title: '',
    price: '',
    rooms: 0,
    location_lat: 0,
    location_lng: 0,
    image_url: '',
    description: '',
    has_pool: false,
    has_bbq: false,
    individual_beds: false,
    sofa_bed: false,
    near_beach: false,
    link: '',
  });

  useEffect(() => {
    if (alojamiento) {
      setFormData({
        title: alojamiento.title || '',
        price: alojamiento.price || '',
        rooms: alojamiento.rooms || 0,
        location_lat: alojamiento.location_lat || 0,
        location_lng: alojamiento.location_lng || 0,
        image_url: alojamiento.image_url || '',
        description: alojamiento.description || '',
        has_pool: alojamiento.has_pool || false,
        has_bbq: alojamiento.has_bbq || false,
        individual_beds: alojamiento.individual_beds || false,
        sofa_bed: alojamiento.sofa_bed || false,
        near_beach: alojamiento.near_beach || false,
        link: alojamiento.link || '',
      });
    }
  }, [alojamiento]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleGeocodingSelect = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      location_lat: lat,
      location_lng: lng,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (alojamiento?.id) {
        const updated = await updateAlojamiento(alojamiento.id, formData);
        if (updated) {
          toast.success('Alojamiento actualizado correctamente');
          onSuccess();
        } else {
          toast.error('Error al actualizar el alojamiento');
        }
      } else {
        const created = await createAlojamiento(formData);
        if (created) {
          toast.success('Alojamiento creado correctamente');
          onSuccess();
        } else {
          toast.error('Error al crear el alojamiento');
        }
      }
    } catch (error) {
      console.error('Error saving alojamiento:', error);
      toast.error('Error al guardar el alojamiento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label className="font-bold text-zinc-500 dark:text-zinc-400">Búsqueda de Dirección (Autocompleta Lat/Lng)</Label>
          <GeocodingSearch onSelect={handleGeocodingSelect} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title" className="font-bold">Título</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="rounded-xl border-zinc-200 focus:border-orange-500 focus:ring-orange-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price" className="font-bold">Precio</Label>
          <Input
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Ej: 150€/noche"
            className="rounded-xl border-zinc-200 focus:border-orange-500 focus:ring-orange-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rooms" className="font-bold">Habitaciones</Label>
          <Input
            id="rooms"
            name="rooms"
            type="number"
            value={formData.rooms}
            onChange={(e) => setFormData(prev => ({ ...prev, rooms: parseInt(e.target.value) || 0 }))}
            className="rounded-xl border-zinc-200 focus:border-orange-500 focus:ring-orange-500 transition-all"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link" className="font-bold">Enlace (Airbnb/Booking)</Label>
          <Input
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://..."
            className="rounded-xl border-zinc-200 focus:border-orange-500 focus:ring-orange-500 transition-all"
          />
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="image_url" className="font-bold">URL de Imagen</Label>
          <Input
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://..."
            className="rounded-xl border-zinc-200 focus:border-orange-500 focus:ring-orange-500 transition-all"
          />
        </div>
      </div>

      <div className="space-y-3 border-t pt-4">
        <Label className="font-bold text-lg">Características</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { id: 'has_pool', label: 'Piscina', icon: Waves, color: 'bg-orange-500' },
            { id: 'has_bbq', label: 'Barbacoa', icon: Flame, color: 'bg-pink-500' },
            { id: 'individual_beds', label: 'Individuales', icon: Bed, color: 'bg-orange-500' },
            { id: 'sofa_bed', label: 'Sofá Cama', icon: Armchair, color: 'bg-pink-500' },
            { id: 'near_beach', label: 'Playa', icon: Umbrella, color: 'bg-orange-500' },
          ].map((feature) => (
            <motion.div key={feature.id} whileTap={{ scale: 0.95 }}>
              <Toggle
                aria-label={feature.label}
                pressed={formData[feature.id as keyof typeof formData] as boolean}
                onPressedChange={(pressed) => handleSwitchChange(feature.id, pressed)}
                className={`flex w-full items-center gap-2 justify-start px-4 h-14 rounded-2xl transition-all duration-300 border-2
                  data-[state=on]:${feature.color} data-[state=on]:text-white data-[state=on]:border-transparent data-[state=on]:shadow-lg
                  data-[state=off]:bg-zinc-50 data-[state=off]:text-zinc-400 data-[state=off]:border-zinc-100 dark:data-[state=off]:bg-zinc-900 dark:data-[state=off]:border-zinc-800
                  hover:data-[state=off]:border-zinc-300`}
                variant="outline"
              >
                <feature.icon className={`h-5 w-5 ${formData[feature.id as keyof typeof formData] ? 'animate-bounce' : ''}`} />
                <span className="font-bold text-sm">{feature.label}</span>
              </Toggle>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        <div className="space-y-2">
          <Label htmlFor="location_lat" className="font-bold text-zinc-400">Latitud</Label>
          <Input
            id="location_lat"
            name="location_lat"
            type="number"
            step="any"
            value={formData.location_lat}
            onChange={(e) => setFormData(prev => ({ ...prev, location_lat: parseFloat(e.target.value) || 0 }))}
            className="rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location_lng" className="font-bold text-zinc-400">Longitud</Label>
          <Input
            id="location_lng"
            name="location_lng"
            type="number"
            step="any"
            value={formData.location_lng}
            onChange={(e) => setFormData(prev => ({ ...prev, location_lng: parseFloat(e.target.value) || 0 }))}
            className="rounded-xl bg-zinc-50 dark:bg-zinc-900 border-zinc-100"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading} className="rounded-xl px-6 h-11 font-bold">
          Cancelar
        </Button>
        <Button type="submit" disabled={loading} className="rounded-xl px-8 h-11 font-bold bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 border-none shadow-md hover:shadow-lg transition-all">
          {loading ? 'Guardando...' : 'Guardar Alojamiento'}
        </Button>
      </div>
    </form>
  );
};
