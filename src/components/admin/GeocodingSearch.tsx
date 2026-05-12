import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

interface GeocodingResult {
  display_name: string;
  lat: string;
  lon: string;
}

interface GeocodingSearchProps {
  onSelect: (lat: number, lng: number) => void;
}

export const GeocodingSearch: React.FC<GeocodingSearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (result: GeocodingResult) => {
    onSelect(parseFloat(result.lat), parseFloat(result.lon));
    setQuery(result.display_name);
    setResults([]);
  };

  return (
    <div className="space-y-2 relative">
      <div className="flex gap-2">
        <Input
          placeholder="Buscar dirección..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
        />
        <Button type="button" onClick={handleSearch} disabled={loading} size="icon">
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
        </Button>
      </div>

      {results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-900 border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={index}
              type="button"
              className="w-full text-left px-4 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 border-b last:border-0"
              onClick={() => handleSelect(result)}
            >
              {result.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
