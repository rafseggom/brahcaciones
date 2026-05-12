create extension if not exists pgcrypto;

-- Table alojamientos
create table if not exists public.alojamientos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  price TEXT,
  dates TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  image_url TEXT,
  description TEXT,
  has_pool BOOLEAN DEFAULT false,
  has_bbq BOOLEAN DEFAULT false,
  individual_beds BOOLEAN DEFAULT false,
  sofa_bed BOOLEAN DEFAULT false,
  near_beach BOOLEAN DEFAULT false,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Table votos
create table if not exists public.votos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alojamiento_id UUID REFERENCES public.alojamientos(id) ON DELETE CASCADE,
  usuario_slug TEXT NOT NULL,
  puntuacion INT NOT NULL CHECK (puntuacion >= 0 AND puntuacion <= 5),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(alojamiento_id, usuario_slug)
);

alter table public.alojamientos enable row level security;
alter table public.votos enable row level security;

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table public.alojamientos to anon, authenticated;
grant select, insert, update, delete on table public.votos to anon, authenticated;

drop policy if exists "Public read alojamientos" on public.alojamientos;
create policy "Public read alojamientos"
on public.alojamientos
for select
using (true);

drop policy if exists "Public insert alojamientos" on public.alojamientos;
create policy "Public insert alojamientos"
on public.alojamientos
for insert
with check (true);

drop policy if exists "Public update alojamientos" on public.alojamientos;
create policy "Public update alojamientos"
on public.alojamientos
for update
using (true)
with check (true);

drop policy if exists "Public delete alojamientos" on public.alojamientos;
create policy "Public delete alojamientos"
on public.alojamientos
for delete
using (true);

drop policy if exists "Public read votos" on public.votos;
create policy "Public read votos"
on public.votos
for select
using (true);

drop policy if exists "Public insert votos" on public.votos;
create policy "Public insert votos"
on public.votos
for insert
with check (true);

drop policy if exists "Public update votos" on public.votos;
create policy "Public update votos"
on public.votos
for update
using (true)
with check (true);

drop policy if exists "Public delete votos" on public.votos;
create policy "Public delete votos"
on public.votos
for delete
using (true);
