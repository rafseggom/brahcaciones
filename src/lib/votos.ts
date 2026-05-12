import { supabase } from './supabase';

export async function upsertVote(alojamiento_id: string, usuario_slug: string, puntuacion: number) {
  const { data, error } = await supabase
    .from('votos')
    .upsert(
      { alojamiento_id, usuario_slug, puntuacion },
      { onConflict: 'alojamiento_id, usuario_slug' }
    )
    .select()
    .single();

  return { data, error };
}

export async function getVotesSummary(alojamiento_id: string) {
  const { data, error } = await supabase
    .from('votos')
    .select('puntuacion')
    .eq('alojamiento_id', alojamiento_id);

  if (error) return { data: null, error };

  if (!data || data.length === 0) {
    return { data: { avg_rating: 0, total_votes: 0 }, error: null };
  }

  const total_votes = data.length;
  const sum = data.reduce((acc, curr) => acc + curr.puntuacion, 0);
  const avg_rating = sum / total_votes;

  return { data: { avg_rating, total_votes }, error: null };
}
