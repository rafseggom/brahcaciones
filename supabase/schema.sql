-- Table alojamientos
CREATE TABLE alojamientos (
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
CREATE TABLE votos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alojamiento_id UUID REFERENCES alojamientos(id) ON DELETE CASCADE,
  usuario_slug TEXT NOT NULL,
  puntuacion INT NOT NULL CHECK (puntuacion >= 0 AND puntuacion <= 5),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(alojamiento_id, usuario_slug)
);
