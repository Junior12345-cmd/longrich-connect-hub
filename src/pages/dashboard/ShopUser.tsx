import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const ShopPage = () => {
  // Récupération du slug depuis l’URL
  const { slug } = useParams();

  // États
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Recherche locale
  const [searchTerm, setSearchTerm] = useState('');
  console.log(slug)
  // Charger les données depuis l’API
  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/shops/${slug}`);
        if (!response.ok) throw new Error("Erreur lors du chargement de la boutique");
        const data = await response.json();
        console.log(data);
        setShop(data);
      } catch (err) {
        setError(err.message);
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

  // Si erreur
  if (error || !shop) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Boutique introuvable 😢</h1>
        <p className="mt-2">Vérifiez l’URL du slug : <strong>{slug}</strong></p>
        <Link to="/"><Button className="mt-4">Retour à l’accueil</Button></Link>
      </div>
    );
  }

  // Filtrer les produits selon recherche
  const filteredProducts = shop.products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header boutique */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">{shop.name}</h1>
        <p className="text-muted-foreground">
          Découvrez les produits disponibles dans cette boutique.
        </p>
      </div>

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
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.desc}</p>
                <div className="flex justify-between">
                  <Badge>{product.category}</Badge>
                  <Badge variant={product.stock < 10 ? 'destructive' : 'default'}>
                    {product.stock} en stock
                  </Badge>
                </div>
                <p className="font-bold">{product.price} $</p>
                <Button className="w-full mt-2">
                  <ShoppingCart className="w-4 h-4 mr-2" /> Acheter
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          Aucun produit trouvé pour <strong>{searchTerm}</strong>.
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
