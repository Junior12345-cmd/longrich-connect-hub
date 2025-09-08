import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Store, Star } from 'lucide-react';

const Search = () => {
  const mockResults = [
    {
      id: 1,
      type: 'stockiste',
      name: 'Marie Kouassi',
      business: 'Longrich Abidjan Centre',
      location: 'Cocody, Abidjan',
      distance: '2.3 km',
      rating: 4.8,
      phone: '+225 01 23 45 67',
      products: ['Shampoing Superplex', 'Crème visage', 'Café 3 en 1'],
      verified: true
    },
    {
      id: 2,
      type: 'produit',
      name: 'Shampoing Superplex',
      description: 'Shampoing anti-chute enrichi aux herbes naturelles',
      price: '15,000 FCFA',
      stockistes: 3,
      available: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
          Recherche Produits & Stockistes
        </h1>
        <p className="text-muted-foreground">
          Trouvez rapidement les produits Longrich et les stockistes près de chez vous
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Résultats de recherche</h2>
            <span className="text-sm text-muted-foreground">2 résultats trouvés</span>
          </div>
          
          {mockResults.map((result) => (
            <Card key={result.id} className="gradient-card hover:shadow-lg transition-smooth">
              <CardContent className="p-6">
                {result.type === 'stockiste' ? (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{result.name}</h3>
                          {result.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Vérifié
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{result.business}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{result.location} • {result.distance}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{result.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" className="gradient-primary">
                          <Phone className="w-4 h-4 mr-1" />
                          Contacter
                        </Button>
                        <Button variant="outline" size="sm">
                          <Store className="w-4 h-4 mr-1" />
                          Boutique
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Produits disponibles:</p>
                      <div className="flex flex-wrap gap-2">
                        {result.products?.map((product, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{result.name}</h3>
                        <p className="text-muted-foreground">{result.description}</p>
                        <p className="text-xl font-bold text-primary">{result.price}</p>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge variant={result.available ? "default" : "secondary"}>
                          {result.available ? 'Disponible' : 'Rupture'}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {result.stockistes} stockistes
                        </p>
                      </div>
                    </div>
                    <Button className="w-full gradient-secondary">
                      Voir les stockistes
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map Sidebar */}
        <div className="space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Carte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  Carte interactive<br />
                  <span className="text-sm">À venir</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Search;