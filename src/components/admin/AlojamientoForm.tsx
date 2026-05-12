import React, { useState, useEffect } from 'react';
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
          <Label>Búsqueda de Dirección (Autocompleta Lat/Lng)</Label>
          <GeocodingSearch onSelect={handleGeocodingSelect} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Ej: 150€/noche"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rooms">Habitaciones</Label>
          <Input
            id="rooms"
            name="rooms"
            type="number"
            value={formData.rooms}
            onChange={(e) => setFormData(prev => ({ ...prev, rooms: parseInt(e.target.value) || 0 }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="link">Enlace (Airbnb/Booking)</Label>
          <Input
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="image_url">URL de Imagen</Label>
          <Input
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="space-y-2 border-t pt-4">
        <Label>Características</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Toggle
            aria-label="Piscina"
            pressed={formData.has_pool}
            onPressedChange={(pressed) => handleSwitchChange('has_pool', pressed)}
            className="flex items-center gap-2 justify-start px-3 h-12 data-[state=on]:bg-orange-500 data-[state=on]:text-white transition-all border border-orange-100/50"
            variant="outline"
          >
            <Waves className="h-5 w-5" />
            <span>Piscina</span>
          </Toggle>

          <Toggle
            aria-label="Barbacoa"
            pressed={formData.has_bbq}
            onPressedChange={(pressed) => handleSwitchChange('has_bbq', pressed)}
            className="flex items-center gap-2 justify-start px-3 h-12 data-[state=on]:bg-pink-500 data-[state=on]:text-white transition-all border border-pink-100/50"
            variant="outline"
          >
            <Flame className="h-5 w-5" />
            <span>Barbacoa</span>
          </Toggle>

          <Toggle
            aria-label="Camas Individuales"
            pressed={formData.individual_beds}
            onPressedChange={(pressed) => handleSwitchChange('individual_beds', pressed)}
            className="flex items-center gap-2 justify-start px-3 h-12 data-[state=on]:bg-orange-500 data-[state=on]:text-white transition-all border border-orange-100/50"
            variant="outline"
          >
            <Bed className="h-5 w-5" />
            <span className="text-xs">Individuales</span>
          </Toggle>

          <Toggle
            aria-label="Sofá Cama"
            pressed={formData.sofa_bed}
            onPressedChange={(pressed) => handleSwitchChange('sofa_bed', pressed)}
            className="flex items-center gap-2 justify-start px-3 h-12 data-[state=on]:bg-pink-500 data-[state=on]:text-white transition-all border border-pink-100/50"
            variant="outline"
          >
            <Armchair className="h-5 w-5" />
            <span>Sofá Cama</span>
          </Toggle>

          <Toggle
            aria-label="Cerca de la Playa"
            pressed={formData.near_beach}
            onPressedChange={(pressed) => handleSwitchChange('near_beach', pressed)}
            className="flex items-center gap-2 justify-start px-3 h-12 data-[state=on]:bg-orange-500 data-[state=on]:text-white transition-all border border-orange-100/50"
            variant="outline"
          >
            <Umbrella className="h-5 w-5" />
            <span>Playa</span>
          </Toggle>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        <div className="space-y-2">
          <Label htmlFor="location_lat">Latitud</Label>
          <Input
            id="location_lat"
            name="location_lat"
            type="number"
            step="any"
            value={formData.location_lat}
            onChange={(e) => setFormData(prev => ({ ...prev, location_lat: parseFloat(e.target.value) || 0 }))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location_lng">Longitud</Label>
          <Input
            id="location_lng"
            name="location_lng"
            type="number"
            step="any"
            value={formData.location_lng}
            onChange={(e) => setFormData(prev => ({ ...prev, location_lng: parseFloat(e.target.value) || 0 }))}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  );
};
