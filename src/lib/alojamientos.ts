import { supabase } from './supabase';
import type { Alojamiento } from '../types/alojamiento';

export const getAlojamientos = async (usuarioSlug?: string): Promise<Alojamiento[]> => {
  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from('alojamientos')
    .select('*, votos(puntuacion, usuario_slug)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching alojamientos:', error);
    return [];
  }

  return (data || []).map((item: any) => {
    const votos = item.votos || [];
    const total_votes = votos.length;
    const sum = votos.reduce((acc: number, curr: any) => acc + curr.puntuacion, 0);
    const avg_rating = total_votes > 0 ? sum / total_votes : 0;
    const user_vote = usuarioSlug 
      ? votos.find((v: any) => v.usuario_slug === usuarioSlug)?.puntuacion 
      : undefined;

    const { votos: _, ...alojamientoWithoutVotos } = item;

    return {
      ...alojamientoWithoutVotos,
      avg_rating,
      total_votes,
      user_vote
    };
  });
};

export const createAlojamiento = async (alojamiento: Omit<Alojamiento, 'id' | 'created_at'>): Promise<Alojamiento | null> => {
  if (!supabase) {
    console.warn('Supabase is not configured. createAlojamiento was skipped.');
    return null;
  }

  const { data, error } = await supabase
    .from('alojamientos')
    .insert([alojamiento])
    .select()
    .single();

  if (error) {
    console.error('Error creating alojamiento:', error);
    return null;
  }

  return data;
};

export const updateAlojamiento = async (id: string, alojamiento: Partial<Alojamiento>): Promise<Alojamiento | null> => {
  if (!supabase) {
    console.warn('Supabase is not configured. updateAlojamiento was skipped.');
    return null;
  }

  const { data, error } = await supabase
    .from('alojamientos')
    .update(alojamiento)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating alojamiento:', error);
    return null;
  }

  return data;
};

export const deleteAlojamiento = async (id: string): Promise<boolean> => {
  if (!supabase) {
    console.warn('Supabase is not configured. deleteAlojamiento was skipped.');
    return false;
  }

  const { error } = await supabase
    .from('alojamientos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting alojamiento:', error);
    return false;
  }

  return true;
};
