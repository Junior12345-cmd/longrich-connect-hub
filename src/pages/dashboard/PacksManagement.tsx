import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Package, DollarSign, MapPin, Edit, Trash2, Star } from 'lucide-react';
import CreatePackForm from '@/components/CreatePackForm';
import { toast } from 'sonner';

interface Pack {
  id: number;
  name: string;
  price: string;
  pv: number;
  products: number;
  features: string[];
  popular: boolean;
  country: string;
  description: string;
}

const PacksManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [packs, setPacks] = useState<Pack[]>([
    {
      id: 1,
      name: "Pack Starter",
      price: "50 000 FCFA",
      pv: 100,
      products: 10,
      features: [
        "Formation de base incluse",
        "Support client 24/7",
        "Accès communauté privée",
        "Kit de démarrage digital"
      ],
      popular: false,
      country: "senegal",
      description: "Parfait pour débuter votre activité MLM avec tous les outils essentiels."
    },
    {
      id: 2,
      name: "Pack Business",
      price: "150 000 FCFA",
      pv: 300,
      products: 30,
      features: [
        "Formation complète + coaching",
        "Outils marketing avancés",
        "Accès priority support",
        "Produits premium inclus",
        "Certificat professionnel"
      ],
      popular: true,
      country: "senegal",
      description: "Solution complète pour les entrepreneurs sérieux qui veulent maximiser leurs résultats."
    },
    {
      id: 3,
      name: "Pack Elite",
      price: "300 000 FCFA",
      pv: 600,
      products: 60,
      features: [
        "Mentorat personnel 1-à-1",
        "Stratégies exclusives",
        "Réseaux VIP",
        "Formation leadership",
        "Bonus territoriaux"
      ],
      popular: false,
      country: "senegal",
      description: "Pour les leaders qui visent l'excellence et veulent construire un empire MLM."
    },
    {
      id: 4,
      name: "Pack Pro Mali",
      price: "120 000 FCFA",
      pv: 250,
      products: 25,
      features: [
        "Formation adaptée au marché malien",
        "Support en bambara/français",
        "Partenariats locaux",
        "Produits locaux inclus"
      ],
      popular: false,
      country: "mali",
      description: "Spécialement conçu pour le marché malien avec un accompagnement personnalisé."
    }
  ]);

  const countries = [
    { code: 'all', name: 'Tous les pays', flag: '🌍' },
    { code: 'senegal', name: 'Sénégal', flag: '🇸🇳' },
    { code: 'mali', name: 'Mali', flag: '🇲🇱' },
    { code: 'burkina', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: 'cote-ivoire', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    { code: 'guinea', name: 'Guinée', flag: '🇬🇳' },
    { code: 'cameroun', name: 'Cameroun', flag: '🇨🇲' }
  ];

  const filteredPacks = packs.filter(pack => {
    const matchesSearch = pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pack.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'all' || pack.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  const handleCreatePack = (newPack: Pack) => {
    setPacks([newPack, ...packs]);
  };

  const handleDeletePack = (id: number) => {
    setPacks(packs.filter(pack => pack.id !== id));
    toast.success('Pack supprimé avec succès');
  };

  const handleTogglePopular = (id: number) => {
    setPacks(packs.map(pack => 
      pack.id === id ? { ...pack, popular: !pack.popular } : pack
    ));
    toast.success('Statut du pack mis à jour');
  };

  const getCountryName = (code: string) => {
    return countries.find(c => c.code === code)?.name || code;
  };

  const getCountryFlag = (code: string) => {
    return countries.find(c => c.code === code)?.flag || '🌍';
  };

  const stats = {
    total: packs.length,
    countries: new Set(packs.map(p => p.country)).size,
    popular: packs.filter(p => p.popular).length,
    totalPV: packs.reduce((sum, pack) => sum + pack.pv, 0)
  };

  return (
    <div className="space-y-6 container p-6 mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Packs d'Adhésion</h1>
          <p className="text-muted-foreground">
            Créez et gérez vos offres d'adhésion MLM
          </p>
        </div>
        <Button onClick={() => setIsCreateFormOpen(true)} className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un Pack
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Packs</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pays Couverts</CardTitle>
            <MapPin className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.countries}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Packs Populaires</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{stats.popular}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total PV</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.totalPV}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher un pack..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filtrer par pays" />
          </SelectTrigger>
          <SelectContent>
            {countries.map(country => (
              <SelectItem key={country.code} value={country.code}>
                {country.flag} {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Liste des packs */}
      <div className="grid gap-6">
        {filteredPacks.map((pack) => (
          <Card key={pack.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{pack.name}</CardTitle>
                    {pack.popular && (
                      <Badge className="bg-yellow-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Populaire
                      </Badge>
                    )}
                    <Badge variant="outline">
                      {getCountryFlag(pack.country)} {getCountryName(pack.country)}
                    </Badge>
                  </div>
                  <CardDescription className="max-w-2xl">
                    {pack.description}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleTogglePopular(pack.id)}
                  >
                    <Star className={`w-4 h-4 ${pack.popular ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeletePack(pack.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="font-medium text-muted-foreground">Prix</div>
                    <div className="text-2xl font-bold text-primary">{pack.price}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-muted-foreground">Points PV</div>
                      <div className="text-lg font-semibold">{pack.pv}</div>
                    </div>
                    <div>
                      <div className="font-medium text-muted-foreground">Produits</div>
                      <div className="text-lg font-semibold">{pack.products}</div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="font-medium text-muted-foreground mb-2">Fonctionnalités incluses</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pack.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPacks.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucun pack trouvé</h3>
            <p className="text-muted-foreground">
              {searchTerm || selectedCountry !== 'all' 
                ? 'Aucun pack ne correspond à vos critères de recherche.' 
                : 'Commencez par créer votre premier pack d\'adhésion.'}
            </p>
          </CardContent>
        </Card>
      )}

      <CreatePackForm
        open={isCreateFormOpen}
        onClose={() => setIsCreateFormOpen(false)}
        onSubmit={handleCreatePack}
      />
    </div>
  );
};

export default PacksManagement;