import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, ShoppingCart, Search, Moon, Sun, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ShopPage = () => {
  // Thème (clair/sombre)
  const [theme, setTheme] = useState('light'); // À persister via localStorage ou context

  // Données mockées (remplacer par API)
  const [products, setProducts] = useState([
    { id: 1, name: 'Produit A', category: 'Santé', price: 50, stock: 100, image: '/placeholder.jpg', desc: 'Description courte pour SEO.', country: 'Sénégal', variants: 2 },
    { id: 2, name: 'Produit B', category: 'Beauté', price: 30, stock: 50, image: '/placeholder.jpg', desc: 'Produit de beauté premium.', country: 'Côte d\'Ivoire', variants: 1 },
    { id: 3, name: 'Produit C', category: 'Santé', price: 75, stock: 5, image: '/placeholder.jpg', desc: 'Supplément santé.', country: 'Mali', variants: 3 },
    { id: 4, name: 'Produit D', category: 'Maison', price: 20, stock: 200, image: '/placeholder.jpg', desc: 'Article ménager.', country: 'Sénégal', variants: 1 },
    // Ajoutez plus pour tester pagination
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categoryFilter, setCategoryFilter] = useState('Tout');
  const [priceFilter, setPriceFilter] = useState('Tout');
  const [countryFilter, setCountryFilter] = useState('Tout');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Catégories, pays, plages prix uniques
  const categories = ['Tout', ...new Set(products.map(p => p.category))];
  const countries = ['Tout', ...new Set(products.map(p => p.country))];
  const priceRanges = ['Tout', '0-25', '25-50', '50-75', '75+'];

  // Appliquer filtres, recherche, tri
  useEffect(() => {
    let result = products.filter(p => 
      (categoryFilter === 'Tout' || p.category === categoryFilter) &&
      (countryFilter === 'Tout' || p.country === countryFilter) &&
      (searchTerm === '' || p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (priceFilter !== 'Tout') {
      const [min, max] = priceFilter.split('-').map(Number);
      result = result.filter(p => max ? p.price >= min && p.price <= max : p.price >= min);
    }

    result.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // Popularité à implémenter via analytics
    });

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [categoryFilter, priceFilter, countryFilter, sortBy, searchTerm, products]);

  // Pagination
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Toggle thème
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <div className={`min-h-screen bg-background ${theme === 'dark' ? 'dark' : ''}`}>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filtres (Accordion sur mobile) */}
        <aside className="md:w-1/4">
          <Accordion type="single" collapsible className="md:hidden">
            <AccordionItem value="filters">
              <AccordionTrigger>Filtres & Tri <ChevronDown className="w-4 h-4" /></AccordionTrigger>
              <AccordionContent className="space-y-4">
                {/* Filtres communs */}
                {renderFilters()}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="hidden md:block space-y-6">
            {renderFilters()}
          </div>
          {/* Aperçu Analytics (pour owner) */}
          <Card className="mt-6">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold">Analytics Rapides</h3>
              <p>Visiteurs : 150 (semaine)</p>
              <p>Conversions : 12%</p>
              <Link to="/analytics"><Button variant="outline" size="sm">Voir plus</Button></Link>
            </CardContent>
          </Card>
        </aside>

        {/* Products Section */}
        <section className="flex-1">
          {/* Recherche */}
          <div className="mb-6">
            <Input 
              placeholder="Rechercher un produit..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              prefix={<Search className="w-4 h-4 text-muted-foreground" />}
            />
          </div>

          {/* Grid Produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 space-y-3">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg" loading="lazy" />
                  <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.desc}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">{product.category}</Badge>
                    <Badge variant={product.stock < 10 ? 'destructive' : 'default'}>{product.stock} en stock</Badge>
                  </div>
                  <p className="text-xl font-bold">{product.price} $ <span className="text-sm text-muted-foreground">({product.country})</span></p>
                  <Button className="w-full gradient-primary">
                    <ShoppingCart className="w-4 h-4 mr-2" /> Commander votre produit
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="mt-8 justify-center">
              <PaginationContent>
                <PaginationPrevious onClick={() => setCurrentPage(p => Math.max(1, p - 1))} />
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink isActive={currentPage === i + 1} onClick={() => setCurrentPage(i + 1)}>{i + 1}</PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationNext onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} />
              </PaginationContent>
            </Pagination>
          )}

          {/* Empty State */}
          {paginatedProducts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Aucun produit trouvé. Essayez d'ajuster les filtres.
            </div>
          )}
        </section>
      </main>
    </div>
  );

  // Fonction pour rendre les filtres (réutilisable)
  function renderFilters() {
    return (
      <>
        <div>
          <label className="block text-sm font-medium mb-2">Catégorie</label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger><SelectValue placeholder="Tout" /></SelectTrigger>
            <SelectContent>
              {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Prix</label>
          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger><SelectValue placeholder="Tout" /></SelectTrigger>
            <SelectContent>
              {priceRanges.map(range => <SelectItem key={range} value={range}>{range === 'Tout' ? range : `${range} $`}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Pays</label>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger><SelectValue placeholder="Tout" /></SelectTrigger>
            <SelectContent>
              {countries.map(country => <SelectItem key={country} value={country}>{country}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Trier par</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger><SelectValue placeholder="Nom" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Nom</SelectItem>
              <SelectItem value="price_asc">Prix croissant</SelectItem>
              <SelectItem value="price_desc">Prix décroissant</SelectItem>
              <SelectItem value="popularity">Popularité</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </>
    );
  }
};

export default ShopPage;