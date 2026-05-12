import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useTheme } from 'next-themes';
import type { Alojamiento } from '../types/alojamiento';

// Fix Leaflet default icon issues in Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

let SelectedIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [30, 46],
  iconAnchor: [15, 46],
  className: 'selected-marker'
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  alojamientos: Alojamiento[];
  onSelectAlojamiento?: (alojamiento: Alojamiento) => void;
  selectedAlojamientoId?: string;
}

function ChangeView({ bounds, center }: { bounds: L.LatLngBoundsExpression; center?: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15, { animate: true });
    } else if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [bounds, center, map]);
  return null;
}

const MapComponent = ({ alojamientos, onSelectAlojamiento, selectedAlojamientoId }: MapComponentProps) => {
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;

  const tileUrl = currentTheme === 'dark'
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

  const validMarkers = alojamientos.filter(
    (a) => a.location_lat !== undefined && a.location_lng !== undefined
  );

  const bounds = validMarkers.length > 0
    ? L.latLngBounds(validMarkers.map((a) => [a.location_lat!, a.location_lng!]))
    : L.latLngBounds([[40, -4], [40, -4]]);

  const selectedAlojamiento = validMarkers.find(a => a.id === selectedAlojamientoId);
  const center: [number, number] | undefined = selectedAlojamiento 
    ? [selectedAlojamiento.location_lat!, selectedAlojamiento.location_lng!] 
    : undefined;

  return (
    <MapContainer
      bounds={bounds}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution={attribution}
        url={tileUrl}
      />
      {validMarkers.map((alojamiento) => (
        <Marker
          key={alojamiento.id}
          position={[alojamiento.location_lat!, alojamiento.location_lng!]}
          icon={alojamiento.id === selectedAlojamientoId ? SelectedIcon : DefaultIcon}
          eventHandlers={{
            click: () => onSelectAlojamiento?.(alojamiento),
          }}
        />
      ))}
      <ChangeView bounds={bounds} center={center} />
    </MapContainer>
  );
};

export default MapComponent;
