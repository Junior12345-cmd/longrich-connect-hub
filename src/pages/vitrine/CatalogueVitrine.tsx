import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter,
  Star,
  MapPin,
  Package,
  Users,
  ArrowRight,
  Check,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CreatePackForm from '@/components/CreatePackForm';

const CatalogueVitrine = () => {
  const [selectedCountry, setSelectedCountry] = useState('senegal');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customPacks, setCustomPacks] = useState<any[]>([]);

  const products = [
    {
      id: 1,
      name: 'Longrich Shampoing Réparateur',
      category: 'Beauté',
      price: '15,000 FCFA',
      rating: 4.8,
      reviews: 127,
      image: '🧴',
      available: true,
      description: 'Shampoing enrichi aux extraits naturels pour cheveux abîmés'
    },
    {
      id: 2,
      name: 'Multivitamines Longrich',
      category: 'Santé',
      price: '25,000 FCFA',
      rating: 4.9,
      reviews: 89,
      image: '💊',
      available: true,
      description: 'Complément alimentaire riche en vitamines et minéraux'
    },
    {
      id: 3,
      name: 'Détergent Écologique',
      category: 'Maison',
      price: '8,000 FCFA',
      rating: 4.7,
      reviews: 156,
      image: '🏠',
      available: true,
      description: 'Détergent biodégradable pour un nettoyage efficace'
    },
    {
      id: 4,
      name: 'Crème Anti-Âge Longrich',
      category: 'Beauté',
      price: '35,000 FCFA',
      rating: 4.9,
      reviews: 203,
      image: '✨',
      available: false,
      description: 'Crème anti-âge aux actifs naturels et collagène'
    }
  ];

  const defaultPacks = {
    senegal: [
      {
        id: 1,
        name: 'Pack Starter',
        price: '50,000 FCFA',
        pv: 100,
        products: 10,
        features: ['Formation de base incluse', 'Matériel marketing', 'Support 30 jours'],
        popular: false,
        country: 'senegal'
      },
      {
        id: 2,
        name: 'Pack Business',
        price: '150,000 FCFA',
        pv: 300,
        products: 30,
        features: ['Formation avancée', 'Boutique e-commerce', 'Support prioritaire', 'Bonus parrainage'],
        popular: true,
        country: 'senegal'
      },
      {
        id: 3,
        name: 'Pack VIP',
        price: '300,000 FCFA',
        pv: 600,
        products: 50,
        features: ['Formation complète', 'Coaching personnel', 'Événements exclusifs', 'Commission augmentée'],
        popular: false,
        country: 'senegal'
      }
    ],
    mali: [
      {
        id: 4,
        name: 'Pack Débutant',
        price: '45,000 CFA',
        pv: 100,
        products: 8,
        features: ['Formation de base', 'Kit marketing', 'Support WhatsApp'],
        popular: false,
        country: 'mali'
      },
      {
        id: 5,
        name: 'Pack Entrepreneur',
        price: '130,000 CFA',
        pv: 300,
        products: 25,
        features: ['Formation business', 'Boutique incluse', 'Mentorat', 'Outils IA basiques'],
        popular: true,
        country: 'mali'
      }
    ]
  };

  // Combine default packs with custom packs
  const allPacks = {
    senegal: [...defaultPacks.senegal, ...customPacks.filter(p => p.country === 'senegal')],
    mali: [...defaultPacks.mali, ...customPacks.filter(p => p.country === 'mali')],
    burkina: [...customPacks.filter(p => p.country === 'burkina')],
    'cote-ivoire': [...customPacks.filter(p => p.country === 'cote-ivoire')],
    guinea: [...customPacks.filter(p => p.country === 'guinea')],
    cameroun: [...customPacks.filter(p => p.country === 'cameroun')]
  };

  // Filter packs by search term
  const getFilteredPacks = (countryPacks: any[]) => {
    if (!searchTerm.trim()) return countryPacks;
    return countryPacks.filter(pack => 
      pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pack.features.some((feature: string) => feature.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const handleCreatePack = (newPack: any) => {
    setCustomPacks(prev => [...prev, newPack]);
  };

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
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
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
                  <SelectItem value="senegal">🇸🇳 Sénégal</SelectItem>
                  <SelectItem value="mali">🇲🇱 Mali</SelectItem>
                  <SelectItem value="burkina">🇧🇫 Burkina Faso</SelectItem>
                  <SelectItem value="cote-ivoire">🇨🇮 Côte d'Ivoire</SelectItem>
                  <SelectItem value="guinea">🇬🇳 Guinée</SelectItem>
                  <SelectItem value="cameroun">🇨🇲 Cameroun</SelectItem>
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
        </div>
      </section>

      {/* Products Catalog */}
      {/* <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Catalogue Global</h2>
              <p className="text-muted-foreground">
                Tous nos produits certifiés disponibles pour votre boutique
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="gradient-card hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{product.image}</div>
                        <Badge variant="outline" className="text-xs mb-2">
                          {product.category}
                        </Badge>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {product.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{product.rating}</span>
                          <span className="text-muted-foreground">({product.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {product.available ? (
                            <Badge className="bg-green-500 text-white text-xs">En stock</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">Rupture</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">{product.price}</span>
                        <Button size="sm" className="gradient-primary" disabled={!product.available}>
                          {product.available ? 'Voir détails' : 'Indisponible'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section> */}

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
                <Button 
                  variant={selectedCountry === 'senegal' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCountry('senegal')}
                  className={selectedCountry === 'senegal' ? 'gradient-primary' : ''}
                >
                  🇸🇳 Sénégal
                </Button>
                <Button 
                  variant={selectedCountry === 'mali' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCountry('mali')}
                  className={selectedCountry === 'mali' ? 'gradient-primary' : ''}
                >
                  🇲🇱 Mali
                </Button>
                <Button 
                  variant={selectedCountry === 'burkina' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCountry('burkina')}
                  className={selectedCountry === 'burkina' ? 'gradient-primary' : ''}
                >
                  🇧🇫 Burkina
                </Button>
                <Button 
                  variant={selectedCountry === 'cote-ivoire' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCountry('cote-ivoire')}
                  className={selectedCountry === 'cote-ivoire' ? 'gradient-primary' : ''}
                >
                  🇨🇮 Côte d'Ivoire
                </Button>
                <Button 
                  variant={selectedCountry === 'guinea' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCountry('guinea')}
                  className={selectedCountry === 'guinea' ? 'gradient-primary' : ''}
                >
                  🇬🇳 Guinée
                </Button>
                <Button 
                  variant={selectedCountry === 'cameroun' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedCountry('cameroun')}
                  className={selectedCountry === 'cameroun' ? 'gradient-primary' : ''}
                >
                  🇨🇲 Cameroun
                </Button>
              </div>
            </div>
            
            {/* Packs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {getFilteredPacks(allPacks[selectedCountry as keyof typeof allPacks] || []).map((pack, index) => (
                <Card 
                  key={index} 
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
                    >
                      Rejoindre avec ce pack
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Guide */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-2xl font-bold">Comment ça marche ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <Card className="gradient-card text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-dark font-bold">1</span>
                  </div>
                  <h4 className="font-semibold">Choisir son Pack</h4>
                  <p className="text-sm text-muted-foreground">
                    Sélectionnez le pack adapté à votre pays et budget
                  </p>
                </CardContent>
              </Card>
              
              <Card className="gradient-card text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-dark font-bold">2</span>
                  </div>
                  <h4 className="font-semibold">Informations</h4>
                  <p className="text-sm text-muted-foreground">
                    Remplissez le formulaire d'inscription simple
                  </p>
                </CardContent>
              </Card>
              
              <Card className="gradient-card text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-dark font-bold">3</span>
                  </div>
                  <h4 className="font-semibold">Paiement</h4>
                  <p className="text-sm text-muted-foreground">
                    Mobile Money, carte bancaire ou virement
                  </p>
                </CardContent>
              </Card>
              
              <Card className="gradient-card text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-dark font-bold">4</span>
                  </div>
                  <h4 className="font-semibold">C'est parti !</h4>
                  <p className="text-sm text-muted-foreground">
                    Accès immédiat au dashboard et à la communauté
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 gradient-primary text-dark">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">
            Prêt à Commencer votre Aventure ?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Rejoignez plus de 10,000 entrepreneurs qui ont choisi Longrich Community 
            pour développer leur business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              🚀 Choisir mon Pack
            </Button>
            <Button className="gradient-primary" variant="default"> 
              💬 Poser une Question
            </Button>            
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