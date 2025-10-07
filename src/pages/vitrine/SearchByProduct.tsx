import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '@/services/axiosInstance';

const SearchByProduct = () => {
  const [productSearch, setProductSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);
  const [stockistSearch, setStockistSearch] = useState('');
  const [stockistCountryFilter, setStockistCountryFilter] = useState('');
  const [stockists, setStockists] = useState([]);
  const [stockistsLoading, setStockistsLoading] = useState(false);
  const [stockistsError, setStockistsError] = useState(null);

  // Debounced function to avoid excessive API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch products from API
  const fetchProducts = useCallback(async (searchTerm = '') => {
    if (!searchTerm) {
      setProducts([]);
      return;
    }

    setProductsLoading(true);
    setProductsError(null);
    try {
      const response = await axiosInstance.get('/api/products/search', {
        params: { q: searchTerm },
      });
      console.log('Products Response:', response.data);

      let data = Array.isArray(response.data)
        ? response.data
        : response.data.products || response.data.data || [];

      if (!Array.isArray(data)) {
        console.error('Expected an array for products, received:', data);
        setProductsError('Invalid products data format.');
        setProducts([]);
        return;
      } 

      const fetchedProducts = data.map((product) => ({
        id: product.id,
        title: product.title, 
        price: `${product.price.toLocaleString()} FCFA`,
        category: product.category || 0,
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        image: product.image || '📦',
        quantity: product.quantity || 0,
        description: product.description || '',
      }));

      setProducts(fetchedProducts);
    } catch (err) {
      setProductsError('Failed to fetch products. Please try again.');
      console.error('Fetch error:', err);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  // Fetch stockists from API
  const fetchStockists = useCallback(async (searchTerm = '', country = '') => {
    if (!searchTerm && !country) {
      setStockists([]);
      return;
    }

    setStockistsLoading(true);
    setStockistsError(null);
    try {
      const response = await axiosInstance.get('/api/stockists/search', {
        params: {
          q: searchTerm || undefined,
          country: country || undefined,
        },
      });
      console.log('Stockists Response:', response.data);

      let data = Array.isArray(response.data)
        ? response.data
        : response.data.stockists || response.data.data || [];

      if (!Array.isArray(data)) {
        console.error('Expected an array for stockists, received:', data);
        setStockistsError('Invalid stockists data format.');
        setStockists([]);
        return;
      }

      const fetchedStockists = data.map((stockist) => ({
        lastname: stockist.lastname,
        firstname: stockist.firstname,
        email: stockist.email,
        phone: stockist.phone,
        country: stockist.country,
      }));
      console.log(response.data)
      setStockists(fetchedStockists);
    } catch (err) {
      setStockistsError('Failed to fetch stockists. Please try again.');
      console.error('Fetch error:', err);
      setStockists([]);
    } finally {
      setStockistsLoading(false);
    }
  }, []);

  const debouncedFetchProducts = useCallback(debounce(fetchProducts, 300), [fetchProducts]);
  const debouncedFetchStockists = useCallback(debounce(fetchStockists, 300), [fetchStockists]);

  useEffect(() => {
    debouncedFetchProducts(productSearch);
  }, [productSearch, debouncedFetchProducts]);

  useEffect(() => {
    debouncedFetchStockists(stockistSearch, stockistCountryFilter);
  }, [stockistSearch, stockistCountryFilter, debouncedFetchStockists]);

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
            & Recherche de produits / stockistes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre gamme complète de produits certifiés et de stockistes
            près de chez vous. Trouvez facilement ce dont vous avez besoin et choisissez 
          </p>
        </div>
      </section>

      {/* Search & Filters (Products) */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Rechercher un produit..." 
                className="pl-10"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            
            {productsLoading ? (
              <p className="text-center">Recherche en cours...</p>
            ) : productsError ? (
              <p className="text-red-500 text-center">{productsError}</p>
            ) : products.length === 0 ? (
              <p className="text-center text-muted-foreground">Aucun produit trouvé. Essayez une autre recherche.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                <Card key={product.id} className="gradient-card hover:shadow-lg transition-all">
                <div className="w-full h-64 overflow-hidden rounded-t-lg">
                  <img
                    src={product.image && product.image.startsWith('http') 
                      ? product.image 
                      : 'https://via.placeholder.com/600x400'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                     <Badge variant="outline" className="text-xs mb-2">{product.category}</Badge>
                    <h3 className="font-semibold text-lg">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.description
                        ? product.description.split(" ").slice(0, 20).join(" ") + (product.description.split(" ").length > 20 ? "..." : "")
                        : ""}
                    </p>
                  </div>
              
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-muted-foreground">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {product.quantity > 0 ? (
                        <Badge className="bg-green-500 text-white text-xs">En stock</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Rupture</Badge>
                      )}
                    </div>
                  </div>
              
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{product.price}</span>
                    <Button 
                      size="sm" 
                      className="gradient-primary"
                      disabled={product.quantity === 0}
                      asChild
                    >
                      {product.quantity > 0 ? (
                        <Link to={`/shop/${product.id}/produit`}>
                          Voir détails
                        </Link>
                      ) : (
                        'Indisponible'
                      )}
                    </Button>
                  </div>
                </CardContent>
                </Card>
              
                ))}
              </div>
            )}
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
                  <option value="1">Sénégal</option>
                  <option value="Mali">Mali</option>
                </select>
              </div>
            </div>

            {stockistsLoading ? (
              <p className="text-center">Recherche de stockistes en cours...</p>
            ) : stockistsError ? (
              <p className="text-red-500 text-center">{stockistsError}</p>
            ) : stockists.length === 0 ? (
              <p className="text-center text-muted-foreground">Aucun stockiste trouvé. Essayez une autre recherche.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stockists.map((stockist) => (
                  <Card key={stockist.id} className="gradient-card shadow hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="text-center">
                          <h3 className="font-semibold text-lg">{stockist.firstname} {stockist.lastname}</h3>
                          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{stockist.country?.title}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{stockist.phone}</p>
                          <p className="text-sm text-muted-foreground">{stockist.email}</p>
                        </div>
                        <Button size="sm" className="gradient-primary w-full">
                          Contacter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
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