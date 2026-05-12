import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alojamiento } from '@/types/alojamiento';
import { createAlojamiento, updateAlojamiento } from '@/lib/alojamientos';
import { toast } from 'sonner';

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
    dates: '',
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
        dates: alojamiento.dates || '',
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
          <Label htmlFor="dates">Fechas</Label>
          <Input
            id="dates"
            name="dates"
            value={formData.dates}
            onChange={handleChange}
            placeholder="Ej: Agosto"
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

      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="has_pool">Piscina</Label>
          <Switch
            id="has_pool"
            checked={formData.has_pool}
            onCheckedChange={(checked) => handleSwitchChange('has_pool', checked)}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="has_bbq">Barbacoa</Label>
          <Switch
            id="has_bbq"
            checked={formData.has_bbq}
            onCheckedChange={(checked) => handleSwitchChange('has_bbq', checked)}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="individual_beds">Camas Individuales</Label>
          <Switch
            id="individual_beds"
            checked={formData.individual_beds}
            onCheckedChange={(checked) => handleSwitchChange('individual_beds', checked)}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="sofa_bed">Sofá Cama</Label>
          <Switch
            id="sofa_bed"
            checked={formData.sofa_bed}
            onCheckedChange={(checked) => handleSwitchChange('sofa_bed', checked)}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="near_beach">Cerca de la Playa</Label>
          <Switch
            id="near_beach"
            checked={formData.near_beach}
            onCheckedChange={(checked) => handleSwitchChange('near_beach', checked)}
          />
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
