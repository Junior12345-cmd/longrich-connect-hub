import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter,
  Star,
  MapPin,
  Package,
  Users,
  ArrowRight,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchByProduct = () => {
  const [selectedCountry, setSelectedCountry] = useState('senegal');
  const [stockistSearch, setStockistSearch] = useState('');
  const [stockistCountryFilter, setStockistCountryFilter] = useState('');

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

  const packs = {
    senegal: [
      {
        name: 'Pack Starter',
        price: '50,000 FCFA',
        pv: 100,
        products: 10,
        features: ['Formation de base incluse', 'Matériel marketing', 'Support 30 jours'],
        popular: false
      },
      {
        name: 'Pack Business',
        price: '150,000 FCFA',
        pv: 300,
        products: 30,
        features: ['Formation avancée', 'Boutique e-commerce', 'Support prioritaire', 'Bonus parrainage'],
        popular: true
      },
      {
        name: 'Pack VIP',
        price: '300,000 FCFA',
        pv: 600,
        products: 50,
        features: ['Formation complète', 'Coaching personnel', 'Événements exclusifs', 'Commission augmentée'],
        popular: false
      }
    ],
    mali: [
      {
        name: 'Pack Débutant',
        price: '45,000 CFA',
        pv: 100,
        products: 8,
        features: ['Formation de base', 'Kit marketing', 'Support WhatsApp'],
        popular: false
      },
      {
        name: 'Pack Entrepreneur',
        price: '130,000 CFA',
        pv: 300,
        products: 25,
        features: ['Formation business', 'Boutique incluse', 'Mentorat', 'Outils IA basiques'],
        popular: true
      }
    ]
  };

  const stockists = [
    {
      id: 1,
      name: 'Awa Diop',
      phone: '+221 77 123 4567',
      country: 'Senegal',
      city: 'Dakar',
      productsAvailable: ['Longrich Shampoing', 'Multivitamines']
    },
    {
      id: 2,
      name: 'Mamadou Traoré',
      phone: '+223 66 789 0123',
      country: 'Mali',
      city: 'Bamako',
      productsAvailable: ['Détergent Écologique', 'Crème Anti-Âge']
    }
  ];

  // Filter stockists based on search input and country
  const filteredStockists = stockists.filter(stockist =>
    (stockist.name.toLowerCase().includes(stockistSearch.toLowerCase()) ||
     stockist.phone.includes(stockistSearch) ||
     stockist.country.toLowerCase().includes(stockistSearch.toLowerCase())) &&
    (stockistCountryFilter === '' || stockist.country.toLowerCase() === stockistCountryFilter.toLowerCase())
  );

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
            & Recherche de produits / stockistes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre gamme complète de produits certifiés et de stockistes
            près de chez vous. Trouvez facilement ce dont vous avez besoin et choisissez 
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-background border-b justify-center">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Rechercher un produit..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Tous
              </Button>
              <Button variant="outline" size="sm">Santé</Button>
              <Button variant="outline" size="sm">Beauté</Button>
              <Button variant="outline" size="sm">Maison</Button>
              <Button variant="outline" size="sm">En stock</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section className="py-12 bg-background">
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
      </section>

      {/* Stockist Search Section */}
      <section className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Trouver un Stockiste</h2>
              <p className="text-muted-foreground">
                Recherchez des stockistes par nom, numéro de téléphone ou pays
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Nom, téléphone ou pays..." 
                  className="pl-10"
                  value={stockistSearch}
                  onChange={(e) => setStockistSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <select
                  className="border border-input rounded-md px-3 py-1 text-sm bg-background text-foreground hover:bg-muted transition-colors"
                  value={stockistCountryFilter}
                  onChange={(e) => setStockistCountryFilter(e.target.value)}
                >
                  <option value="">Tous les pays</option>
                  <option value="Senegal">Sénégal</option>
                  <option value="Mali">Mali</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStockists.map((stockist) => (
                <Card key={stockist.id} className="gradient-card shadow hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">{stockist.name}</h3>
                        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{stockist.city}, {stockist.country}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{stockist.phone}</p>
                      </div>
                      <Button size="sm" className="gradient-primary w-full">
                        Contacter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-primary bg-dark">
        <div className="container mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold">
            Prêt à Commencer votre Aventure ?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Rejoignez plus de 10,000 entrepreneurs qui ont choisi MLM Community 
            pour développer leur business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="gradient-primary" variant="default"> 
              Rejoindre maintenant
            </Button>            
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchByProduct;