import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BoutiquesVitrine = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center space-y-8">
          <Badge className="gradient-primary text-white px-4 py-1">
            🏪 SOLUTION E-COMMERCE INTÉGRÉE
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="gradient-primary bg-clip-text text-dark">
              Créez votre boutique
            </span>
            <br />
            en 5 Minutes
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Boutique e-commerce professionnelle, paiements sécurisés, gestion automatique du stock 
            et analytics détaillées. Tout ce qu'il faut pour vendre en ligne.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Templates pros</span>
            </div>
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

          <Link to="/register">
          <Button size="lg" className="gradient-primary text-lg px-8 py-4">
            🚀 Lancer ma Boutique Maintenant
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button> </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">Tout ce dont vous avez besoin</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="gradient-card text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                    <Palette className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Design Personnalisable</h3>
                  <p className="text-muted-foreground">
                    Templates professionnels, personnalisation complète, 
                    thème clair/sombre, responsive mobile.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="gradient-card text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Paiements Intégrés</h3>
                  <p className="text-muted-foreground">
                    Mobile Money, PayPal, Stripe, cartes bancaires. 
                    Transactions sécurisées et automatisées.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="gradient-card text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Analytics Détaillées</h3>
                  <p className="text-muted-foreground">
                    Vues, conversions, ventes par produit. 
                    Tableaux de bord en temps réel.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="gradient-card text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                    <Store className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Gestion Simplifiée</h3>
                  <p className="text-muted-foreground">
                    Produits, stock, commandes, livraisons. 
                    Interface intuitive, notifications automatiques.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="gradient-card text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                    <Smartphone className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Mobile-First</h3>
                  <p className="text-muted-foreground">
                    70% de vos clients sont sur mobile. 
                    Boutique optimisée pour tous les écrans.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="gradient-card text-center">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Mise en Ligne Rapide</h3>
                  <p className="text-muted-foreground">
                    Assistant de création, templates prêts, 
                    publication instantanée en 5 minutes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Tutorial */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">⏱️ Créer sa boutique en 5 Étapes</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <Card className="gradient-card text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h4 className="font-semibold">Template</h4>
                    <p className="text-sm text-muted-foreground">30 secondes</p>
                    <p className="text-xs text-muted-foreground">Choisir un design</p>
                  </CardContent>
                </Card>
                
                <Card className="gradient-card text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h4 className="font-semibold">Personnaliser</h4>
                    <p className="text-sm text-muted-foreground">2 minutes</p>
                    <p className="text-xs text-muted-foreground">Logo, couleurs</p>
                  </CardContent>
                </Card>
                
                <Card className="gradient-card text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h4 className="font-semibold">Produits</h4>
                    <p className="text-sm text-muted-foreground">2 minutes</p>
                    <p className="text-xs text-muted-foreground">Sélection catalogue</p>
                  </CardContent>
                </Card>
                
                <Card className="gradient-card text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <h4 className="font-semibold">Paiements</h4>
                    <p className="text-sm text-muted-foreground">30 secondes</p>
                    <p className="text-xs text-muted-foreground">Configuration auto</p>
                  </CardContent>
                </Card>
                
                <Card className="gradient-card text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold">En ligne !</h4>
                    <p className="text-sm text-muted-foreground">Instantané</p>
                    <p className="text-xs text-muted-foreground">Boutique active</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <Button size="lg" className="gradient-primary">
                  <Play className="w-5 h-5 mr-2" />
                  Voir le Tutoriel Vidéo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">Ce que disent nos commerçants</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="gradient-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic">
                    "Ma boutique génère 500,000 FCFA par mois depuis 3 mois. 
                    L'interface est simple et mes clients sont satisfaits !"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">JB</span>
                    </div>
                    <div>
                      <div className="font-semibold">Jean Baptiste</div>
                      <div className="text-sm text-muted-foreground">Stockiste, Mali</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="gradient-card">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic">
                    "Interface simple, paiements automatiques, analytics claires. 
                    Exactement ce qu'il me fallait pour développer mon business !"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">AT</span>
                    </div>
                    <div>
                      <div className="font-semibold">Aminata Traoré</div>
                      <div className="text-sm text-muted-foreground">Distributrice, Burkina Faso</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-dark">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Votre boutique vous attend !
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Rejoignez plus de 500 entrepreneurs qui vendent déjà 
            en ligne avec notre solution e-commerce.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              🚀 Lancer ma Boutique
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" className="gradient-primary">
                📱 Demander une Démo
            </Button>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default BoutiquesVitrine;