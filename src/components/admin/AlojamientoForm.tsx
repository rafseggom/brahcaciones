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
    <form onSubmit={handleSubmit} className="space-y-6 py-2">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5 rounded-3xl border border-zinc-200/80 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
          <div className="space-y-2">
            <Label className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">Búsqueda de dirección</Label>
            <GeocodingSearch onSelect={handleGeocodingSelect} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="title" className="font-bold">Título</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="h-11 rounded-2xl border-zinc-200 bg-white px-4 shadow-sm transition-all focus:border-orange-500 focus:ring-orange-500 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price" className="font-bold">Precio total</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Ej: 150"
                className="h-11 rounded-2xl border-zinc-200 bg-white px-4 shadow-sm transition-all focus:border-orange-500 focus:ring-orange-500 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rooms" className="font-bold">Habitaciones</Label>
              <Input
                id="rooms"
                name="rooms"
                type="number"
                min="0"
                value={formData.rooms}
                onChange={(e) => setFormData(prev => ({ ...prev, rooms: parseInt(e.target.value) || 0 }))}
                className="h-11 rounded-2xl border-zinc-200 bg-white px-4 shadow-sm transition-all focus:border-orange-500 focus:ring-orange-500 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="link" className="font-bold">Enlace (Airbnb/Booking)</Label>
              <Input
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://..."
                className="h-11 rounded-2xl border-zinc-200 bg-white px-4 shadow-sm transition-all focus:border-orange-500 focus:ring-orange-500 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="image_url" className="font-bold">URL de imagen</Label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://..."
                className="h-11 rounded-2xl border-zinc-200 bg-white px-4 shadow-sm transition-all focus:border-orange-500 focus:ring-orange-500 dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>
          </div>
        </div>

        <div className="space-y-5 rounded-3xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="space-y-1">
            <Label className="text-xs font-black uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">Características</Label>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Marca lo que tenga el alojamiento. Los botones activos se iluminan para que se vea rápido.</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { id: 'has_pool', label: 'Piscina', icon: Waves, activeClass: 'aria-pressed:bg-orange-500 aria-pressed:text-white aria-pressed:border-orange-500 aria-pressed:shadow-[0_0_0_1px_rgba(249,115,22,0.18),0_12px_30px_rgba(249,115,22,0.28)]' },
            { id: 'has_bbq', label: 'Barbacoa', icon: Flame, activeClass: 'aria-pressed:bg-pink-500 aria-pressed:text-white aria-pressed:border-pink-500 aria-pressed:shadow-[0_0_0_1px_rgba(236,72,153,0.18),0_12px_30px_rgba(236,72,153,0.28)]' },
            { id: 'individual_beds', label: 'Camas individuales', icon: Bed, activeClass: 'aria-pressed:bg-amber-500 aria-pressed:text-white aria-pressed:border-amber-500 aria-pressed:shadow-[0_0_0_1px_rgba(245,158,11,0.18),0_12px_30px_rgba(245,158,11,0.28)]' },
            { id: 'sofa_bed', label: 'Sofá cama', icon: Armchair, activeClass: 'aria-pressed:bg-cyan-500 aria-pressed:text-white aria-pressed:border-cyan-500 aria-pressed:shadow-[0_0_0_1px_rgba(6,182,212,0.18),0_12px_30px_rgba(6,182,212,0.28)]' },
            { id: 'near_beach', label: 'Cerca de la playa', icon: Umbrella, activeClass: 'aria-pressed:bg-emerald-500 aria-pressed:text-white aria-pressed:border-emerald-500 aria-pressed:shadow-[0_0_0_1px_rgba(16,185,129,0.18),0_12px_30px_rgba(16,185,129,0.28)]' },
          ].map((feature) => (
            <motion.div key={feature.id} whileTap={{ scale: 0.95 }}>
              <Toggle
                aria-label={feature.label}
                pressed={formData[feature.id as keyof typeof formData] as boolean}
                onPressedChange={(pressed) => handleSwitchChange(feature.id, pressed)}
                variant="outline"
                className={`flex h-14 w-full justify-start gap-3 rounded-2xl border-zinc-200 bg-zinc-50 px-4 text-left font-bold text-zinc-600 shadow-sm transition-all duration-300 hover:border-zinc-300 hover:bg-white hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80 ${feature.activeClass}`}
              >
                <feature.icon className={`h-5 w-5 shrink-0 ${formData[feature.id as keyof typeof formData] ? 'scale-110' : ''}`} />
                <span className="text-sm leading-tight">{feature.label}</span>
              </Toggle>
            </motion.div>
          ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 rounded-3xl border border-zinc-200/80 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-900/40 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="location_lat" className="font-bold text-zinc-500 dark:text-zinc-400">Latitud</Label>
          <Input
            id="location_lat"
            name="location_lat"
            type="number"
            step="any"
            value={formData.location_lat}
            onChange={(e) => setFormData(prev => ({ ...prev, location_lat: parseFloat(e.target.value) || 0 }))}
            className="h-11 rounded-2xl border-zinc-200 bg-white px-4 shadow-sm transition-all focus:border-orange-500 focus:ring-orange-500 dark:border-zinc-800 dark:bg-zinc-950"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location_lng" className="font-bold text-zinc-500 dark:text-zinc-400">Longitud</Label>
          <Input
            id="location_lng"
            name="location_lng"
            type="number"
            step="any"
            value={formData.location_lng}
            onChange={(e) => setFormData(prev => ({ ...prev, location_lng: parseFloat(e.target.value) || 0 }))}
            className="h-11 rounded-2xl border-zinc-200 bg-white px-4 shadow-sm transition-all focus:border-orange-500 focus:ring-orange-500 dark:border-zinc-800 dark:bg-zinc-950"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
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
