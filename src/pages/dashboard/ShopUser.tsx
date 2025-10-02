import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Store, 
  Palette,
  BarChart3,
  CreditCard,
  Smartphone,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Search,
  ShoppingCart
} from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import axiosInstance from '@/services/axiosInstance';
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  // Récupération du slug depuis l’URL
  const { slug } = useParams();
  const navigate = useNavigate();

  // États
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Recherche locale
  const [searchTerm, setSearchTerm] = useState('');

  // Charger les données depuis l’API
  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
        await axiosInstance.get('/sanctum/csrf-cookie');
        const token = localStorage.getItem('auth_token');
        const response = await axiosInstance.get(`/api/shops/${slug}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response) throw new Error("Erreur lors du chargement de la boutique");
        const data = response.data;
        // console.log(data)
        setShop(data);
      } catch (err) {
        if (err.response?.status === 403) {
          // Cas spécifique 403 : message depuis l'API
          setError(err.response.data?.message || "Accès refusé");
        } else {
          // Autres erreurs
          setError(err.message || "Erreur inconnue");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [slug]);

  // Si en cours de chargement
  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-lg">⏳ Chargement de la boutique...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold">Boutique non activée 😢</h1>
      <p className="mt-2">Raison : <strong>{error}</strong></p>
      <Link to="/">
        <Button className="mt-4">Retour à l’accueil</Button>
      </Link>
    </div>
    
    );
  }

  // Si erreur
  if (!shop) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Boutique introuvable 😢</h1>
        <p className="mt-2">Vérifiez l’URL du slug : <strong>{slug}</strong></p>
        <Link to="/"><Button className="mt-4">Retour à l’accueil</Button></Link>
      </div>
    );
  }
  
  
  

  // Filtrer les produits selon recherche
  const filteredProducts = (shop?.products ?? []).filter((p) => {
    const productName = p.name || "";
    return productName.toLowerCase().includes(searchTerm.toLowerCase());
  });
   

  // Pagination
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header boutique */}
      
      {/* Hero Section */}
      <section className="py-20 from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center space-y-8">
          <Badge className="gradient-primary text-white px-4 py-1">
            🏪 SOLUTION E-COMMERCE INTÉGRÉE
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="gradient-primary bg-clip-text text-dark">
             { shop.title_principal_shop}
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              { shop.text_description_shop }
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-sm justify-center">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Paiements sécurisés</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Gestion stock</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Support 24/7</span>
            </div>
          </div>


        </div>
      </section>

      {/* Recherche */}
      <div className="mb-8 relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
        <Input
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10"
        />
      </div>

      {/* Produits */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-all">
            <CardContent className="p-4 space-y-2">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-90 object-cover rounded"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
          
              {/* Description courte / excerpt */}
              {product.description && (
                <p className="text-sm text-muted-foreground">
                  {product.description.length > 80
                    ? `${product.description.slice(0, 80)}...`
                    : product.description}
                </p>
              )}
          
              <div className="flex justify-between">
                <Badge>{product.category}</Badge>
                <Badge variant={product.stock < 10 ? 'destructive' : 'default'}>
                  {product.stock} En stock
                </Badge>
              </div>
              <p className="font-bold">{product.price} XOF</p>
              <Button
                className="w-full mt-2"
                onClick={() => navigate(`/shop/${product.id}/produit`)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" /> Acheter maintenant
              </Button>
            </CardContent>
          </Card>
          
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          Aucun produit trouvé.
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8 justify-center">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            />
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            />
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ShopPage;
