export interface Alojamiento {
  id: string;
  title: string;
  price?: string;
  dates?: string;
  location_lat?: number;
  location_lng?: number;
  image_url?: string;
  description?: string;
  has_pool: boolean;
  has_bbq: boolean;
  individual_beds: boolean;
  sofa_bed: boolean;
  near_beach: boolean;
  link?: string;
  created_at?: string;
}
