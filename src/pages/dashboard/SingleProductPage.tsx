import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, MessageCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SingleProductPage = () => {
  const { productId } = useParams();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [deliveryDetails, setDeliveryDetails] = useState({
    country: '',
    city: '',
    neighborhood: '',
    address: '',
    geolocation: ''
  });
  const [useManualLocation, setUseManualLocation] = useState(false);
  const [geolocationStatus, setGeolocationStatus] = useState('');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  // Mock data for product
  const product = {
    id: parseInt(productId) || 1,
    name: 'Produit A',
    category: 'Santé',
    price: 50,
    stock: 100,
    image: 'https://readdy.ai/api/search-image?query=African%20business%20network%20community%20people%20connecting%20trading%20products%20modern%20office%20environment%20professional%20networking%20diverse%20entrepreneurs%20working%20together%20digital%20commerce%20platform%20vibrant%20colors%20warm%20lighting&width=800&height=1200&seq=longrich-signup&orientation=portrait',
    images: [
      'https://readdy.ai/api/search-image?query=African%20business%20network%20community%20people%20connecting%20trading%20products%20modern%20office%20environment%20professional%20networking%20diverse%20entrepreneurs%20working%20together%20digital%20commerce%20platform%20vibrant%20colors%20warm%20lighting&width=800&height=1200&seq=longrich-signup&orientation=portrait',
      'https://readdy.ai/api/search-image?query=African%20business%20network%20community%20people%20connecting%20trading%20products%20modern%20office%20environment%20professional%20networking%20diverse%20entrepreneurs%20working%20together%20digital%20commerce%20platform%20vibrant%20colors%20warm%20lighting&width=800&height=1200&seq=longrich-signup&orientation=portrait',
      'https://readdy.ai/api/search-image?query=African%20business%20network%20community%20people%20connecting%20trading%20products%20modern%20office%20environment%20professional%20networking%20diverse%20entrepreneurs%20working%20together%20digital%20commerce%20platform%20vibrant%20colors%20warm%20lighting&width=800&height=1200&seq=longrich-signup&orientation=portrait'
    ],
    desc: 'Un supplément santé naturel conçu pour renforcer votre bien-être quotidien. Idéal pour tous les âges.',
    country: 'Sénégal',
    variants: [
      { id: 1, type: 'Taille', options: ['50ml', '100ml'] },
      { id: 2, type: 'Couleur', options: ['Bleu', 'Vert'] },
    ],
    reviews: [
      { id: 1, user: 'Marie D.', rating: 4, comment: 'Excellent produit, livraison rapide !', date: '2025-08-20' },
      { id: 2, user: 'Pierre K.', rating: 5, comment: 'Très satisfait, je recommande.', date: '2025-08-15' },
    ],
    avgRating: 4.5,
  };

  // Mock data for cities by country
  const citiesByCountry = {
    Senegal: ['Dakar', 'Thiès', 'Saint-Louis'],
    Mali: ['Bamako', 'Sikasso', 'Kayes']
  };

  if (!product) return <div className="text-center py-12">Produit non trouvé</div>;

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const handleQuantityChange = ([value]) => setQuantity(Math.max(1, Math.min(product.stock, value)));

  const handleDeliveryChange = (field, value) => {
    setDeliveryDetails(prev => ({
      ...prev,
      [field]: value,
      // Reset city if country changes
      ...(field === 'country' ? { city: '' } : {}),
      // Clear geolocation if manual details change
      geolocation: ''
    }));
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      setGeolocationStatus('Récupération de la localisation...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
          setDeliveryDetails(prev => ({
            ...prev,
            country: '',
            city: '',
            neighborhood: '',
            address: '',
            geolocation: mapUrl
          }));
          setGeolocationStatus('Localisation récupérée avec succès !');
          setUseManualLocation(false);
        },
        (error) => {
          setGeolocationStatus('Échec de la localisation : ' + error.message);
          setUseManualLocation(true);
        }
      );
    } else {
      setGeolocationStatus('La géolocalisation n\'est pas prise en charge par ce navigateur.');
      setUseManualLocation(true);
    }
  };

  const handleManualGeolocation = () => {
    const { country, city, neighborhood, address } = deliveryDetails;
    if (country && city && address) {
      const query = encodeURIComponent(`${address}, ${neighborhood}, ${city}, ${country}`);
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
      setDeliveryDetails(prev => ({ ...prev, geolocation: mapUrl }));
    } else {
      setDeliveryDetails(prev => ({ ...prev, geolocation: '' }));
    }
  };

  return (
    <div className={`min-h-screen bg-background ${theme}`}>
      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4 text-sm text-muted-foreground">
        <Link to="/">Accueil</Link> &gt; <Link to="/boutiques">Boutiques</Link> &gt; {product.name}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Galerie d'images */}
        <div className="md:w-1/3">
          <img 
            src={product.image} 
            alt={`${product.name} main image`} 
            className="w-full h-96 object-cover rounded-lg cursor-zoom-in" 
            loading="lazy" 
          />
          <div className="grid grid-cols-3 gap-4 mt-4">
            {product.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt={`${product.name} image ${index + 1}`} 
                className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity" 
                loading="lazy" 
              />
            ))}
          </div>
        </div>

        {/* Détails */}
        <div className="md:w-2/3 space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < product.avgRating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
              ))}
            </div>
            <span>({product.reviews.length} avis)</span>
            <Badge className="ml-auto">{product.category}</Badge>
          </div>
          <p className="text-lg">{product.desc}</p>
          <p className="text-2xl font-bold">{product.price} $ <span className="text-sm">({product.country})</span></p>
          {product.stock < 10 && <Badge variant="destructive">Stock bas ({product.stock})</Badge>}

          {/* Variantes */}
          {product.variants.map((variant) => (
            <div key={variant.id}>
              <Label>{variant.type}</Label>
              <Select onValueChange={(val) => setSelectedVariant(prev => ({ ...prev, [variant.type]: val }))}>
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder={variant.options[0]} />
                </SelectTrigger>
                <SelectContent>
                  {variant.options.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          ))}

          {/* Lieu de livraison */}
          <div>
            <Label>Lieu de livraison</Label>
            <div className="space-y-4 mt-2">
              <Button 
                className="w-full gradient-primary" 
                onClick={handleGeolocation}
              >
                Utiliser ma localisation actuelle
              </Button>
              {geolocationStatus && (
                <p className={`text-sm ${geolocationStatus.includes('Échec') ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {geolocationStatus}
                </p>
              )}
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => setUseManualLocation(!useManualLocation)}
              >
                {useManualLocation ? 'Masquer saisie manuelle' : 'Saisir l\'adresse manuellement'}
              </Button>
              {useManualLocation && (
                <div className="space-y-4">
                  <div>
                    <Select onValueChange={(val) => handleDeliveryChange('country', val)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choisir un pays" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Senegal">Sénégal</SelectItem>
                        <SelectItem value="Mali">Mali</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select 
                      onValueChange={(val) => handleDeliveryChange('city', val)}
                      disabled={!deliveryDetails.country}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choisir une ville" />
                      </SelectTrigger>
                      <SelectContent>
                        {(citiesByCountry[deliveryDetails.country] || []).map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Input 
                      placeholder="Quartier" 
                      value={deliveryDetails.neighborhood}
                      onChange={(e) => handleDeliveryChange('neighborhood', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Adresse détaillée" 
                      value={deliveryDetails.address}
                      onChange={(e) => handleDeliveryChange('address', e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline" 
                    onClick={handleManualGeolocation}
                    disabled={!deliveryDetails.country || !deliveryDetails.city || !deliveryDetails.address}
                  >
                    Générer lien de géolocalisation
                  </Button>
                </div>
              )}
              {deliveryDetails.geolocation && (
                <p className="text-sm text-muted-foreground">
                  <a 
                    href={deliveryDetails.geolocation} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Voir sur Google Maps
                  </a>
                </p>
              )}
            </div>
          </div>

          {/* Quantité */}
          <div>
            <Label>Quantité</Label>
            <div className="flex items-center gap-2 mt-2">
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange([quantity - 1])} disabled={quantity <= 1}>-</Button>
              <Input type="number" value={quantity} onChange={(e) => handleQuantityChange([parseInt(e.target.value)])} className="w-20 text-center" />
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange([quantity + 1])} disabled={quantity >= product.stock}>+</Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1 gradient-primary"><ShoppingCart className="mr-2" /> Paiement maintenant</Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Avis</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="text-muted-foreground">{product.desc}</TabsContent>
            <TabsContent value="reviews">
              {product.reviews.map((review) => (
                <Card key={review.id} className="mb-4">
                  <CardContent className="p-4 flex gap-4">
                    <Avatar>
                      <AvatarFallback>{review.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex gap-2">
                        <span className="font-semibold">{review.user}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />)}
                        </div>
                      </div>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full"><MessageCircle className="mr-2" /> Ajouter avis</Button>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default SingleProductPage;