import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  onSearch?: (query: string, filters: any) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = "" }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('produit');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch?.(query, {
      type: searchType,
      location,
    });
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Search */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={searchType === 'produit' ? 'Rechercher un produit...' : 'Rechercher un stockiste...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 h-12"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
        </div>
        
        <Select value={searchType} onValueChange={setSearchType}>
          <SelectTrigger className="w-full md:w-40 h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="produit">Produit</SelectItem>
            <SelectItem value="stockiste">Stockiste</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch} size="lg" className="gradient-primary">
          <Search className="w-4 h-4 mr-2" />
          Rechercher
        </Button>
      </div>

      {/* Location & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Ville, région ou pays..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filtres
        </Button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Catégorie</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes catégories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sante">Santé & Bien-être</SelectItem>
                  <SelectItem value="beaute">Beauté & Cosmétiques</SelectItem>
                  <SelectItem value="nutrition">Nutrition</SelectItem>
                  <SelectItem value="maison">Maison & Entretien</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Prix max</label>
              <Input placeholder="Prix maximum" type="number" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Rayon (km)</label>
              <Select defaultValue="10">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 km</SelectItem>
                  <SelectItem value="10">10 km</SelectItem>
                  <SelectItem value="25">25 km</SelectItem>
                  <SelectItem value="50">50 km</SelectItem>
                  <SelectItem value="100">100 km</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary">Disponible maintenant</Badge>
            <Badge variant="secondary">Livraison gratuite</Badge>
            <Badge variant="secondary">Stockiste vérifié</Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;