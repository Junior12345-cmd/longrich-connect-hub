import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddProductForm } from './AddProductForm';
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Package, 
  Eye,
  Star,
  MoreHorizontal,
  Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ProductsManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'Shampoing Superplex Premium',
      description: 'Shampoing professionnel pour tous types de cheveux. Formule enrichie aux huiles essentielles.',
      price: 7500,
      quantity: 45,
      category: 'Santé & Bien-être',
      image: '🧴',
      createdAt: '2024-12-01T10:00:00',
      sales: 128,
      rating: 4.8
    },
    {
      id: '2', 
      name: 'Café 3 en 1 Arabica',
      description: 'Mélange café, lait et sucre. Saveur authentique, préparation instantanée.',
      price: 1700,
      quantity: 200,
      category: 'Alimentation',
      image: '☕',
      createdAt: '2024-12-02T14:30:00',
      sales: 89,
      rating: 4.5
    },
    {
      id: '3',
      name: 'Crème visage anti-âge',
      description: 'Crème hydratante avec collagène et vitamine E. Effet lifting visible en 7 jours.',
      price: 22000,
      quantity: 12,
      category: 'Mode & Beauté',
      image: '🧴',
      createdAt: '2024-12-03T09:15:00',
      sales: 34,
      rating: 4.9
    },
    {
      id: '4',
      name: 'T-shirt coton bio',
      description: 'T-shirt 100% coton biologique, coupe moderne. Disponible en plusieurs coloris.',
      price: 8500,
      quantity: 67,
      category: 'Mode & Beauté',
      image: '👕',
      createdAt: '2024-12-04T11:20:00',
      sales: 56,
      rating: 4.3
    },
    {
      id: '5',
      name: 'Casque Bluetooth Premium',
      description: 'Casque sans fil avec réduction de bruit active. Autonomie 30h.',
      price: 45000,
      quantity: 8,
      category: 'Électronique',
      image: '🎧',
      createdAt: '2024-12-05T16:45:00',
      sales: 23,
      rating: 4.7
    }
  ]);

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

  const handleAddProduct = (newProduct: any) => {
    setProducts([...products, newProduct]);
  };

  const deleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: 'Rupture', variant: 'destructive' as const };
    if (quantity < 10) return { label: 'Stock faible', variant: 'outline' as const };
    return { label: 'En stock', variant: 'secondary' as const };
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Gestion des Produits
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate('/dash/import-products')}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Importer un produit
              </Button>
              <AddProductForm onProductAdded={handleAddProduct} />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un produit..."
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
        {filteredProducts.map((product) => {
          const stockStatus = getStockStatus(product.quantity);
          
          return (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-6xl">
                {product.image}
              </div>
              
              <CardContent className="p-4 space-y-3">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                  <Badge variant={stockStatus.variant} className="text-xs">
                    {stockStatus.label}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {formatAmount(product.price)}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {product.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Stock: {product.quantity}</span>
                    <span>{product.sales} vendus</span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Ajouté le {formatDate(product.createdAt)}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Voir
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteProduct(product.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun produit trouvé</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || categoryFilter !== 'all' 
                ? 'Essayez de modifier vos critères de recherche'
                : 'Commencez par ajouter votre premier produit'
              }
            </p>
            {!searchTerm && categoryFilter === 'all' && (
              <AddProductForm onProductAdded={handleAddProduct} />
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{products.length}</div>
            <div className="text-sm text-muted-foreground">Produits totaux</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {products.filter(p => p.quantity > 0).length}
            </div>
            <div className="text-sm text-muted-foreground">En stock</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {products.filter(p => p.quantity < 10 && p.quantity > 0).length}
            </div>
            <div className="text-sm text-muted-foreground">Stock faible</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {products.reduce((acc, p) => acc + p.sales, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Ventes totales</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};