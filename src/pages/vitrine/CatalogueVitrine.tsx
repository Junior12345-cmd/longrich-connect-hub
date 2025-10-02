import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Plus,
  Package,
  Users,
  ArrowRight,
  Check
} from 'lucide-react';
import CreatePackForm from '@/components/CreatePackForm';
import axiosInstance from '@/services/axiosInstance';
import { cn } from '@/lib/utils';

interface Country {
  id: string;
  code: string;
  title: string;
}

interface Pack {
  id: number;
  name: string;
  price: string;
  pv: number;
  products: number;
  features: string[];
  popular: boolean;
  country: string;
}

const CatalogueVitrine = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loadingPacks, setLoadingPacks] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customPacks, setCustomPacks] = useState<Pack[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Récupération des pays
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        await axiosInstance.get('/sanctum/csrf-cookie');

        const res = await axiosInstance.get('/api/countries', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const countryList: Country[] = res.data || [];
        setCountries(countryList);
        if (countryList.length > 0) setSelectedCountry(countryList[0].code);
      } catch (err) {
        console.error('Erreur lors de la récupération des pays:', err);
        setCountries([]);
      }
    };
    fetchCountries();
  }, []);

  // Récupération des packs par pays
  useEffect(() => {
    if (!selectedCountry) return;
  
    const fetchPacks = async () => {
      setLoadingPacks(true);
      try {
        await axiosInstance.get('/sanctum/csrf-cookie');
        const token = localStorage.getItem('auth_token');
  
        const res = await axiosInstance.get('/api/packs', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const allPacks: Pack[] = res.data.packs || [];
        const countryPacks = allPacks.filter(
          (p) => typeof p.country === 'string' && p.country.toLowerCase() === selectedCountry.toLowerCase()
        );
        setPacks(countryPacks);

        setPacks(countryPacks);
        
        
  
        console.log('Packs récupérés:',  res.data );
        // setPacks(countryPacks);
      } catch (err) {
        console.error('Erreur lors de la récupération des packs:', err);
        setPacks([]);
      } finally {
        setLoadingPacks(false);
      }
    };
    fetchPacks();
  }, [selectedCountry]);
  

  // Packs filtrés par recherche
  const getFilteredPacks = (packList: Pack[]) => {
    if (!searchTerm.trim()) return packList;
    return packList.filter(
      (pack) =>
        pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pack.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const handleCreatePack = (newPack: Pack) => {
    setCustomPacks(prev => [...prev, newPack]);
  };

  // Combiner packs API + packs personnalisés
  const displayedPacks = [
    ...packs,
    ...customPacks.filter((p) => p.country === selectedCountry)
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="gradient-primary bg-clip-text text-primary">
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
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Rechercher un pack..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par pays" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="gradient-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Pack
            </Button>
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
                {countries.map((country) => (
                  <Button
                    key={country.id}
                    variant={selectedCountry === country.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedCountry(country.id)}
                    className={selectedCountry === country.id ? 'gradient-primary' : ''}
                  >
                    {country.title}
                  </Button>
                ))}
              </div>
            </div>

            {/* Packs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {loadingPacks ? (
                <p>Chargement des packs...</p>
              ) : displayedPacks.length === 0 ? (
                <p>Aucun pack disponible pour ce pays.</p>
              ) : (
                getFilteredPacks(displayedPacks).map((pack) => (
                  <Card 
                    key={pack.id} 
                    className={`gradient-card relative ${pack.popular ? 'ring-2 ring-primary' : ''}`}
                  >
                    {pack.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="gradient-primary text-white px-4">
                          ⭐ POPULAIRE
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl">{pack.name}</CardTitle>
                      <div className="space-y-2">
                        <div className="text-3xl font-bold text-primary">{pack.price}</div>
                        <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Package className="w-4 h-4" />
                            <span>{pack.products} produits</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{pack.pv} PV</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {pack.features.map((feature, index) => (
                          <div key={`${pack.id}-feature-${index}`} className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <Button 
                        className={pack.popular ? 'gradient-primary w-full' : 'w-full'}
                        variant={pack.popular ? 'default' : 'outline'}
                      >
                        Rejoindre avec ce pack
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <CreatePackForm 
        open={showCreateForm} 
        onClose={() => setShowCreateForm(false)}
        onSubmit={handleCreatePack}
      />
    </div>
  );
};

export default CatalogueVitrine;
