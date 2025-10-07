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
            <span className="bg-clip-text text-dark">
              Révolutionnez votre Business MLM
            </span>
            <br />
           <span style={{color:'#ffdb00'}}>avec la Technologie</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            E-commerce + Communauté + IA + Formation : Tout ce dont vous avez besoin 
            pour développer votre réseau MLM et maximiser vos revenus.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary text-lg px-8 py-4">
              🚀 Rejoindre maintenant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              🏪 Découvrir les boutiques
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
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Challenges Section */}
            <div className="space-y-10 animate-slide-up">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-[#0074fa] to-[#ffdb00] bg-clip-text text-transparent">
                  Vos défis quotidiens
                </span>
                <span className="text-[#ffdb00] ml-2">🎯</span>
              </h2>
              <div className="space-y-5">
                {[
                  "Trouver des stockistes proches de chez vous",
                  "Vendre efficacement en ligne",
                  "Se former et développer son réseau",
                  "Créer du contenu marketing professionnel"
                ].map((challenge, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-3 h-3 bg-[#ffdb00] rounded-full transform scale-0 animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}></div>
                    <span className="text-base sm:text-lg text-gray-200 font-medium">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions Section */}
            <div className="space-y-10 animate-slide-up">
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-[#0074fa] to-[#ffdb00] bg-clip-text text-transparent">
                  Notre solution tout-en-un
                </span>
                <span className="text-[#ffdb00] ml-2">💡</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Globe,
                    title: "Recherche géolocalisée",
                    description: "Trouvez produits et stockistes près de vous"
                  },
                  {
                    icon: Store,
                    title: "Boutique e-commerce",
                    description: "Clé en main, prête en 5 minutes"
                  },
                  {
                    icon: BookOpen,
                    title: "Formations + lives",
                    description: "Certifiantes et interactives"
                  }
                ].map((solution, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900/80 backdrop-blur-sm border-none p-5 hover:bg-gray-800/90 hover:shadow-[0_0_20px_rgba(0,116,250,0.3)] transition-all duration-300 transform hover:-translate-y-1 opacity-0 animate-fade-in"
                    role="region"
                    aria-label={solution.title}
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#0074fa] to-[#ffdb00] rounded-xl flex items-center justify-center transform transition-transform hover:scale-110">
                        <solution.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-white">{solution.title}</h4>
                        <p className="text-sm text-gray-300 mt-1">{solution.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>
          {`
            .animate-slide-up {
              animation: slideUp 0.6s ease-out forwards;
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
              animation: fadeIn 0.5s ease-in forwards;
            }
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            .animate-scale-in {
              animation: scaleIn 0.5s ease-in forwards;
            }
            @keyframes scaleIn {
              from { transform: scale(0); }
              to { transform: scale(1); }
            }
            .focus\\:ring-[#ffdb00]:focus {
              outline: none;
              ring: 2px solid #ffdb00;
            }
            [role="region"]:focus-within {
              outline: 2px solid #ffdb00;
              outline-offset: 2px;
            }
          `}
        </style>
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
      <section className="py-20 bg-gradient-to-r from-[#0074fa] to-[#ffdb00] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 animate-slide-up">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="bg-clip-text text-white">
              Prêt à Révolutionner votre Business MLM ?
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-100 opacity-90 max-w-3xl mx-auto">
            Rejoignez plus de 10,000 entrepreneurs qui développent leur réseau avec nos outils innovants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-white text-[#0074fa] font-semibold rounded-xl hover:bg-[#ffdb00] hover:text-black transition-all duration-300 transform hover:scale-105"
              aria-label="Commencer maintenant"
            >
              <span className="mr-2">🚀</span> Commencer maintenant
            </Button>
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-white text-[#0074fa] font-semibold rounded-xl hover:bg-[#ffdb00] hover:text-black transition-all duration-300 transform hover:scale-105"
              aria-label="Commencer maintenant"
            >
              <span className="mr-2">📱</span> Demander une démo
            </Button>
          </div>
        </div>
        <style>
          {`
            .animate-slide-up {
              animation: slideUp 0.6s ease-out forwards;
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(30px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .focus\\:ring-[#ffdb00]:focus {
              outline: none;
              ring: 2px solid #ffdb00;
            }
          `}
        </style>
      </section>
    </div>
  );
};

export default LandingVitrine;