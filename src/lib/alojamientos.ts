import { supabase } from './supabase';
import { Alojamiento } from '../types/alojamiento';

export const getAlojamientos = async (): Promise<Alojamiento[]> => {
  const { data, error } = await supabase
    .from('alojamientos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching alojamientos:', error);
    return [];
  }

  return data || [];
};

export const createAlojamiento = async (alojamiento: Omit<Alojamiento, 'id' | 'created_at'>): Promise<Alojamiento | null> => {
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
