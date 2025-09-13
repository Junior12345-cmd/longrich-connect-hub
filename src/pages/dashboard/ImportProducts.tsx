import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Search, 
  Filter, 
  Star,
  Package,
  ShoppingCart
} from 'lucide-react';
import { toast } from 'sonner';

const ImportProducts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [newPrice, setNewPrice] = useState('');

  const availableProducts = [
    {
      id: 'imp1',
      name: 'Smartphone Samsung Galaxy A54',
      description: 'Smartphone Android avec écran 6.4", 128GB de stockage, caméra 50MP',
      originalPrice: 180000,
      category: 'Électronique',
      image: '📱',
      rating: 4.6,
      supplier: 'Samsung Store',
      inStock: true
    },
    {
      id: 'imp2',
      name: 'Montre connectée Apple Watch SE',
      description: 'Montre intelligente avec GPS, suivi fitness, résistante à l\'eau',
      originalPrice: 120000,
      category: 'Électronique',
      image: '⌚',
      rating: 4.8,
      supplier: 'Apple Premium',
      inStock: true
    },
    {
      id: 'imp3',
      name: 'Parfum Chanel N°5',
      description: 'Parfum de luxe pour femme, fragrance iconique, 50ml',
      originalPrice: 85000,
      category: 'Mode & Beauté',
      image: '🌸',
      rating: 4.9,
      supplier: 'Chanel Boutique',
      inStock: false
    },
    {
      id: 'imp4',
      name: 'Sac à main Louis Vuitton',
      description: 'Sac à main en cuir véritable, design élégant et intemporel',
      originalPrice: 450000,
      category: 'Mode & Beauté',
      image: '👜',
      rating: 4.7,
      supplier: 'LV Collection',
      inStock: true
    },
    {
      id: 'imp5',
      name: 'Aspirateur Dyson V15',
      description: 'Aspirateur sans fil puissant avec technologie cyclonique avancée',
      originalPrice: 350000,
      category: 'Maison & Jardin',
      image: '🔌',
      rating: 4.5,
      supplier: 'Dyson Official',
      inStock: true
    },
    {
      id: 'imp6',
      name: 'Nike Air Max 270',
      description: 'Baskets sport unisexe, confort optimal pour la course et le lifestyle',
      originalPrice: 65000,
      category: 'Sports & Loisirs',
      image: '👟',
      rating: 4.4,
      supplier: 'Nike Store',
      inStock: true
    },
    {
      id: 'imp7',
      name: 'Café Bio Équitable 1kg',
      description: 'Grains de café arabica bio, torréfaction artisanale, origine Éthiopie',
      originalPrice: 12000,
      category: 'Alimentation',
      image: '☕',
      rating: 4.8,
      supplier: 'Coffee Roasters',
      inStock: true
    },
    {
      id: 'imp8',
      name: 'Complément Vitamine D3',
      description: 'Vitamines naturelles, renforce le système immunitaire, 60 gélules',
      originalPrice: 18000,
      category: 'Santé & Bien-être',
      image: '💊',
      rating: 4.3,
      supplier: 'Wellness Lab',
      inStock: true
    }
  ];

  const categories = [
    'Mode & Beauté',
    'Électronique', 
    'Maison & Jardin',
    'Sports & Loisirs',
    'Alimentation',
    'Santé & Bien-être',
    'Automobile',
    'Autres'
  ];

  const filteredProducts = availableProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const handleImportProduct = () => {
    if (!newPrice || parseInt(newPrice) <= 0) {
      toast.error('Veuillez saisir un prix valide');
      return;
    }

    const importedProduct = {
      id: Date.now().toString(),
      name: selectedProduct.name,
      description: selectedProduct.description,
      price: parseInt(newPrice),
      originalPrice: selectedProduct.originalPrice,
      quantity: 0, // L'utilisateur devra définir le stock
      category: selectedProduct.category,
      image: selectedProduct.image,
      createdAt: new Date().toISOString(),
      sales: 0,
      rating: selectedProduct.rating,
      imported: true,
      supplier: selectedProduct.supplier
    };

    // Simuler l'ajout du produit (dans une vraie app, cela irait dans le store)
    toast.success(`Produit "${selectedProduct.name}" importé avec succès !`);
    setSelectedProduct(null);
    setNewPrice('');
    navigate('/dash/boutiques'); // Retour à la page boutiques
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/dash/boutiques')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              Importer des Produits
            </h1>
          </div>
          <p className="text-muted-foreground">
            Sélectionnez des produits de notre catalogue et ajustez vos prix de vente
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un produit à importer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrer par catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-6xl">
              {product.image}
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
                <Badge variant={product.inStock ? "secondary" : "destructive"} className="text-xs">
                  {product.inStock ? "Disponible" : "Rupture"}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {product.supplier}
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    {formatAmount(product.originalPrice)}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {product.rating}
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Prix de base fournisseur
                </p>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full gradient-primary"
                    disabled={!product.inStock}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Importer ce produit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Importer "{product.name}"</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{product.image}</span>
                        <div>
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-muted-foreground">Prix fournisseur: {formatAmount(product.originalPrice)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="new-price">Votre prix de vente *</Label>
                      <Input
                        id="new-price"
                        type="number"
                        placeholder="Ex: 200000"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="mt-2"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Recommandé: {formatAmount(Math.round(product.originalPrice * 1.3))} (marge 30%)
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => setSelectedProduct(null)}>
                        Annuler
                      </Button>
                      <Button className="flex-1 gradient-primary" onClick={handleImportProduct}>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Importer
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun produit trouvé</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche
            </p>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{availableProducts.length}</div>
            <div className="text-sm text-muted-foreground">Produits disponibles</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {availableProducts.filter(p => p.inStock).length}
            </div>
            <div className="text-sm text-muted-foreground">En stock</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{categories.length}</div>
            <div className="text-sm text-muted-foreground">Catégories</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImportProducts;