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
  ShoppingCart,
  Menu,
  X
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Recherche locale
  const [searchTerm, setSearchTerm] = useState('');

  // Vérification de l'authentification
  const isAuthenticated = !!localStorage.getItem("auth_token");

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

  function stripHtml(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
  
  function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  }
  // Si en cours de chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Si erreur
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

  // Si boutique non trouvée
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-20 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            to="#"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Retour à l'accueil"
          >
            <div className="w-full h-12 flex items-center justify-center">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${shop.logo}`}
                alt={shop.title_principal_shop || "Boutique"}
                className="w-full h-full object-contain rounded-full"
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/48x48?text=Logo")}
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1 gap-8">
            <Link
              to="/boutiques"
              className="text-gray-600 hover:text-teal-500 hover:underline underline-offset-4 transition-colors"
            >
              Produits
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-teal-500 hover:underline underline-offset-4 transition-colors"
            >
              Contact
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-teal-500 hover:underline underline-offset-4 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="hidden md:block text-sm text-gray-500 text-right max-w-52">
            Téléphone : {shop.phone || "N/A"} <br />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white shadow-md py-4 animate-slide-in">
            <div className="container mx-auto px-4 flex flex-col gap-4 text-sm">
              <Link to="/" className="text-gray-600 hover:text-teal-500" onClick={() => setMenuOpen(false)}>
                Accueil
              </Link>
              <Link to="#" className="text-gray-600 hover:text-teal-500" onClick={() => setMenuOpen(false)}>
                Produits
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-teal-500" onClick={() => setMenuOpen(false)}>
                À propos
              </Link>
              <Link to="/contact" className="text-gray-600 hover:text-teal-500" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
              {isAuthenticated && (
                <Link to="/dashboard" className="text-gray-600 hover:text-teal-500" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="py-20 from-primary/5 via-secondary/5 to-accent/5">
          <div className="container mx-auto px-4 text-center space-y-8">
            <Badge className="gradient-primary text-white px-4 py-1">
              🏪 SOLUTION E-COMMERCE INTÉGRÉE
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className=" bg-clip-text text-dark">
                {shop.title_principal_shop}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {shop.text_description_shop}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 rounded-2xl"
                >
                  <CardContent className="p-4 flex flex-col space-y-3">
                    <div className="relative w-full h-60 overflow-hidden rounded-xl">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {product.title}
                    </h3>

                    {product.description && (
                      <p className="text-sm text-gray-500 leading-snug">
                        {product.description.length > 80
                          ? `${product.description.slice(0, 80)}...`
                          : product.description}
                      </p>
                    )}

                    <div className="flex justify-between items-center text-sm">
                      <Badge className="bg-teal-100 text-teal-800">
                        {product.category}
                      </Badge>
                      <Badge
                        variant={product.stock < 10 ? "destructive" : "default"}
                        className={
                          product.stock < 10
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }
                      >
                        {product.stock} en stock
                      </Badge>
                    </div>

                    <p className="font-bold text-lg text-gray-900">
                      {product.price.toLocaleString()} XOF
                    </p>

                    <Button
                      className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white font-medium flex items-center justify-center gap-2 rounded-lg py-2"
                      onClick={() => navigate(`/shop/${product.id}/produit`)}
                    >
                      <ShoppingCart className="w-4 h-4" /> Acheter maintenant
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 text-sm">
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
      </main>

      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="flex flex-col items-center md:items-start gap-3">
              <h2 className="text-lg font-semibold text-white">{shop?.title || "Boutique"}</h2>
              <p className="text-sm text-gray-400 text-center md:text-left">
                {shop?.description
                  ? truncateText(stripHtml(shop.description), 200) // 200 caractères max
                  : "Découvrez nos produits de qualité et nos meilleures offres."}
              </p>

            </div>

            {/* 🔗 Liens utiles */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-semibold text-white">Liens utiles</h4>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link to="#" className="hover:text-teal-400 transition-colors">Produits</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-teal-400 transition-colors">Contact</Link>
                </li>
                {isAuthenticated && (
                  <li>
                    <Link to="/dashboard" className="hover:text-teal-400 transition-colors">Dashboard</Link>
                  </li>
                )}
              </ul>
            </div>

            {/* 📞 Contact */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-lg font-semibold text-white">Nous contacter</h4>
              <p className="mt-3 text-sm">
                Email :{" "}
                <a
                  href={`mailto:${shop?.mail || "support@example.com"}`}
                  className="hover:text-teal-400 transition-colors"
                >
                  {shop?.mail || "support@example.com"}
                </a>
              </p>
              <p className="mt-1 text-sm">
                Téléphone :{" "}
                <a
                  href={`tel:${shop?.phone || "+221123456789"}`}
                  className="hover:text-teal-400 transition-colors"
                >
                  {shop?.phone || "+221 123 456 789"}
                </a>
              </p>
            </div>

          </div>

          <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} {shop?.title_principal_shop || shop?.title || "Boutique"} — Tous droits réservés.
          </div>
        </div>
      </footer>

      <style>
        {`
          .animate-slide-in {
            animation: slideIn 0.3s ease-in;
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default ShopPage;