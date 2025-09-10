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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center space-y-8">
          <Badge className="gradient-primary text-white px-4 py-1">
            🌍 LA PLATEFORME COMMUNAUTAIRE MLM #1 EN AFRIQUE
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="gradient-primary bg-clip-text text-dark">
              Révolutionnez votre Business MLM
            </span>
            <br />
            avec la Technologie
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            E-commerce + Communauté + IA + Formation : Tout ce dont vous avez besoin 
            pour développer votre réseau MLM et maximiser vos revenus.
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
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Boutiques</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground text-primary">Formations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">15</div>
              <div className="text-sm text-primary">Pays Africains</div>
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
                      <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent/80 from-accent to-accent/80 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-dark" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Recherche Géolocalisée</h4>
                        <p className="text-sm text-muted-foreground">Trouvez produits et stockistes près de vous</p>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="gradient-card p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent/80 rounded-lg flex items-center justify-center">
                        <Store className="w-5 h-5 text-dark" />
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
                        <BookOpen className="w-5 h-5 text-dark" />
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
                    "Grâce à MLM Community, j'ai multiplié mes ventes par 3 en 6 mois. 
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
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">PK</span>
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-primary">Pierre Kouassi</div>
                      <div className="text-xs text-primary">Distributeur, Côte d'Ivoire</div>
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
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
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

      {/* CTA Final */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Prêt à Révolutionner votre Business MLM ?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto text-dark">
            Rejoignez plus de 10,000 entrepreneurs qui développent leur réseau 
            avec nos outils innovants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              🚀 Commencer maintenant
            </Button>
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 border-white hover:text-primary">
              📱 Demander une démo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingVitrine;