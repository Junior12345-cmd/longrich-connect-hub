import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Store, 
  BookOpen, 
  Globe, 
  Star,
  ArrowRight,
  Play,
  TrendingUp,
  Award,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingVitrine = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-xl">Longrich Community</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline">Se connecter</Button>
            </Link>
            <Button className="gradient-primary">
              Rejoindre
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center space-y-8">
          <Badge className="gradient-primary text-white px-4 py-1">
            🌍 LA PLATEFORME COMMUNAUTAIRE MLM #1 EN AFRIQUE
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="gradient-primary bg-clip-text text-transparent">
              Révolutionnez votre Business MLM
            </span>
            <br />
            avec la Technologie
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            E-commerce + Communauté + IA + Formation : Tout ce dont vous avez besoin 
            pour développer votre réseau Longrich et maximiser vos revenus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary text-lg px-8 py-4">
              🚀 Rejoindre Maintenant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              🏪 Découvrir les Boutiques
            </Button>
          </div>
          
          {/* Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Membres Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">500+</div>
              <div className="text-sm text-muted-foreground">Boutiques</div>
            </div>
            <div className="text-3xl font-bold text-accent">50+</div>
            <div className="text-sm text-muted-foreground">Formations</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">15</div>
              <div className="text-sm text-muted-foreground">Pays Africains</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">🎯 Vos Défis Quotidiens</h2>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Trouver des stockistes proches de chez vous</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Vendre efficacement en ligne</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Se former et développer son réseau</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span>Créer du contenu marketing professionnel</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">💡 Notre Solution Tout-en-Un</h2>
                <div className="space-y-4">
                  <Card className="gradient-card p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Recherche Géolocalisée</h4>
                        <p className="text-sm text-muted-foreground">Trouvez produits et stockistes près de vous</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="gradient-card p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 gradient-secondary rounded-lg flex items-center justify-center">
                        <Store className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Boutique E-commerce</h4>
                        <p className="text-sm text-muted-foreground">Clé en main, prête en 5 minutes</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="gradient-card p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent/80 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Formations + Lives</h4>
                        <p className="text-sm text-muted-foreground">Certifiantes et interactives</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">Ce que disent nos membres</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="gradient-card p-6">
                <CardContent className="space-y-4 p-0">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm italic">
                    "Grâce à Longrich Community, j'ai multiplié mes ventes par 3 en 6 mois. 
                    La plateforme est intuitive et le support excellent."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">MD</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Marie Diallo</div>
                      <div className="text-xs text-muted-foreground">Stockiste, Sénégal</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="gradient-card p-6">
                <CardContent className="space-y-4 p-0">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm italic">
                    "Le Studio IA m'a permis de créer des vidéos professionnelles sans budget. 
                    Mes posts ont 10x plus d'engagement maintenant !"
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">PK</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Pierre Kouassi</div>
                      <div className="text-xs text-muted-foreground">Distributeur, Côte d'Ivoire</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="gradient-card p-6">
                <CardContent className="space-y-4 p-0">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-sm italic">
                    "La communauté est formidable ! J'ai trouvé mon mentor et développé 
                    mon réseau grâce aux événements et formations."
                  </blockquote>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">AT</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Aminata Traoré</div>
                      <div className="text-xs text-muted-foreground">Nouvelle membre, Mali</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* News/Announcements */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">📢 Actualités & Annonces</h2>
            
            <Card className="max-w-2xl mx-auto gradient-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-red-500 text-white px-2 py-1">🔥 NOUVEAU</Badge>
                  <span className="font-semibold">Pack Ghana disponible - 50,000 GHS</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-500 text-white px-2 py-1">📚 GRATUIT</Badge>
                  <span className="font-semibold">Formation "Leadership MLM" ce weekend</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-blue-500 text-white px-2 py-1">🎉 MILESTONE</Badge>
                  <span className="font-semibold">+1000 nouveaux membres ce mois !</span>
                </div>
                <Button variant="outline" className="w-full">
                  Voir toutes les actualités
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Prêt à Révolutionner votre Business MLM ?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Rejoignez plus de 10,000 entrepreneurs qui développent leur réseau 
            avec nos outils innovants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              🚀 Commencer Maintenant
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
              📱 Demander une Démo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">L</span>
                </div>
                <span className="font-bold text-xl">Longrich Community</span>
              </div>
              <p className="text-sm text-muted-foreground">
                La plateforme communautaire qui révolutionne le MLM en Afrique.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Produits</h4>
              <div className="space-y-2 text-sm">
                <Link to="/vitrine/catalogue" className="block text-muted-foreground hover:text-primary">Catalogue</Link>
                <Link to="/vitrine/boutiques" className="block text-muted-foreground hover:text-primary">Boutiques</Link>
                <div className="text-muted-foreground">Packs d'adhésion</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Communauté</h4>
              <div className="space-y-2 text-sm">
                <Link to="/vitrine/formations" className="block text-muted-foreground hover:text-primary">Formations</Link>
                <Link to="/vitrine/communaute" className="block text-muted-foreground hover:text-primary">Réseau Social</Link>
                <div className="text-muted-foreground">Événements</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm">
                <Link to="/vitrine/about" className="block text-muted-foreground hover:text-primary">À propos</Link>
                <Link to="/vitrine/contact" className="block text-muted-foreground hover:text-primary">Contact</Link>
                <div className="text-muted-foreground">FAQ</div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © 2024 Longrich Community. Tous droits réservés.
            </div>
            <div className="flex space-x-4 text-sm">
              <div className="text-muted-foreground hover:text-primary cursor-pointer">RGPD</div>
              <div className="text-muted-foreground hover:text-primary cursor-pointer">CGU</div>
              <div className="text-muted-foreground hover:text-primary cursor-pointer">Confidentialité</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingVitrine;