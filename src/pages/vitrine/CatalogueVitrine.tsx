import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Package, Users, ArrowRight, Check, Plus } from 'lucide-react';
import axiosInstance from '@/services/axiosInstance';
import CreatePackForm from '@/components/CreatePackForm';

interface Country {
  id: number;
  code: string;
  title: string;
  flag: string;
}

interface Pack {
  id: number;
  name: string;
  price: string;
  pv?: number;
  products?: number;
  features: string[];
  popular?: boolean;
  country: string;
  description: string;
  status: string;
}

const CatalogueVitrine = () => {
  const [selectedCountry, setSelectedCountry] = useState('1'); // Default to Senegal's country_id
  const [countries, setCountries] = useState<Country[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch countries from the backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get('/api/countries');
        // console.log('Countries Response:', response.data);
        let data = Array.isArray(response.data)
          ? response.data
          : response.data.countries || response.data.data || [];
        if (!Array.isArray(data)) {
          console.error('Expected an array for countries, received:', data);
          setError('Invalid countries data format.');
          return;
        }
        setCountries(data);
      } catch (err) {
        console.error('Failed to fetch countries:', err);
        setError('Failed to fetch countries. Please try again.');
      }
    };
    fetchCountries();
  }, []);

  // Fetch packs from the backend
  useEffect(() => {
    const fetchPacks = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/packs/search', {
          params: { country_id: selectedCountry },
        });
        console.log('Packs Response:', response.data);
        let data = response.data;
        // Handle single object or array
        if (!Array.isArray(data)) {
          if (data.packs && Array.isArray(data.packs)) {
            data = data.packs;
          } else if (data.data && Array.isArray(data.data)) {
            data = data.data;
          } else if (data && typeof data === 'object') {
            data = [data]; // Convert single object to array
          } else {
            console.error('Expected an array or single pack, received:', data);
            setError('Invalid packs data format.');
            setPacks([]);
            setLoading(false);
            return;
          }
        }
        const fetchedPacks = data.map((pack: any) => ({
          id: pack.id,
          name: pack.title,
          price: `${pack.price} FCFA`,
          pv: pack.pv || 100,
          products: pack.products || 10,
          features: typeof pack.features === 'string' ? JSON.parse(pack.features) : pack.features || [],
          popular: pack.popular || false,
          country: String(pack.country_id), // Ensure string for consistency
          description: pack.description || '',
          status: pack.status || 'actived',
        }));
        setPacks(fetchedPacks.filter((pack: Pack) => pack.status === 'actived'));
        setError(null);
      } catch (err) {
        setError('Failed to fetch packs. Please try again.');
        console.error('Fetch error:', err);
        setPacks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPacks();
  }, [selectedCountry]);

  // Filter packs by search term
  const getFilteredPacks = (packs: Pack[]) => {
    if (!searchTerm.trim()) return packs;
    return packs.filter(pack =>
      pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pack.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Handle pack creation
  const handleCreatePack = async (newPack: any) => {
    try {
      const response = await axiosInstance.post('/api/packs', {
        country_id: newPack.country,
        title: newPack.name,
        description: newPack.description || '',
        price: parseInt(newPack.price.replace(/[^0-9]/g, '')),
        features: JSON.stringify(newPack.features),
        status: 'actived',
        pv: newPack.pv || 100,
        products: newPack.products || 10,
        popular: newPack.popular || false,
      });
      setPacks(prev => [
        ...prev,
        {
          id: response.data.id,
          name: response.data.title,
          price: `${response.data.price} FCFA`,
          pv: response.data.pv || 100,
          products: response.data.products || 10,
          features: JSON.parse(response.data.features),
          popular: response.data.popular || false,
          country: String(response.data.country_id),
          description: response.data.description || '',
          status: response.data.status || 'actived',
        },
      ]);
      setShowCreateForm(false);
    } catch (err) {
      console.error('Failed to create pack:', err);
      alert('Failed to create pack. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="bg-clip-text text-primary">
              Catalogue Produits
            </span>
            <br />
            & Packs d'Adhésion
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre gamme complète de produits certifiés et choisissez
            le pack d'adhésion adapté à votre pays.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-background border-b flex justify-center items-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher un pack..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 items-center">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrer par pays" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country.id} value={String(country.id)}>
                      {country.title} 
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Packs Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Packs d'Adhésion par Pays</h2>
              <p className="text-muted-foreground">
                Choisissez le pack adapté à votre pays et commencez votre aventure
              </p>
            </div>

            {/* Country Selector */}
            <div className="flex justify-center">
              <div className="flex gap-2 p-1 bg-muted rounded-lg flex-wrap">
                {countries.map(country => (
                  <Button
                    key={country.id}
                    variant={selectedCountry === String(country.id) ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedCountry(String(country.id))}
                    className={selectedCountry === String(country.id) ? 'gradient-primary' : ''}
                  >
                    {country.title}
                  </Button>
                ))}
              </div>
            </div>

            {/* Packs Grid */}
            {loading ? (
                <div className="flex items-center justify-center min-h-screen">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : packs.length === 0 ? (
                <p>No packs available for this country.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {getFilteredPacks(packs.filter(pack => pack.country === String(selectedCountry))).map((pack: Pack) => (
                    <Card
                      key={pack.id}
                      className={`gradient-card relative ${pack.popular ? 'ring-2 ring-primary' : ''}`}
                    >
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl">{pack.name}</CardTitle>
                        <div className="space-y-2">
                          <div className="text-3xl font-bold text-primary">{pack.price}</div>
                          <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Package className="w-4 h-4" />
                              <span>{pack.products} produits</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          {pack.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Button
                          className={pack.popular ? 'gradient-primary w-full' : 'w-full'}
                          variant={pack.popular ? 'default' : 'outline'}
                          disabled
                        >
                          Rejoindre avec ce pack
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
            )}
          </div>
        </div>
      </section>

      {/* CreatePackForm */}
      <CreatePackForm
        open={showCreateForm}
        onClose={() => setShowCreateForm(false)}
        onSubmit={handleCreatePack}
      />
    </div>
  );
};

export default CatalogueVitrine;