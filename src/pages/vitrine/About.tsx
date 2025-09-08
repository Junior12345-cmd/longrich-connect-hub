import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Eye, 
  Heart,
  Globe,
  Users,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center space-y-8">
          <Badge className="gradient-primary text-white px-4 py-1">
            🌍 À PROPOS DE LONGRICH COMMUNITY
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="gradient-primary bg-clip-text text-transparent">
              Notre Mission :
            </span>
            <br />
            Démocratiser l'Entrepreneuriat MLM
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nous croyons que chaque entrepreneur mérite les meilleurs outils 
            pour développer son business, peu importe sa localisation en Afrique.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Valeurs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mission */}
            <Card className="gradient-card text-center">
              <CardHeader>
                <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">🎯 Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Démocratiser l'entrepreneuriat MLM en Afrique grâce à la technologie, 
                  en offrant des outils accessibles et puissants à tous les entrepreneurs.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="gradient-card text-center">
              <CardHeader>
                <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">🔮 Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Devenir la plateforme de référence pour les réseaux de distribution 
                  africains, connectant entrepreneurs et consommateurs dans un écosystème unifié.
                </p>
              </CardContent>
            </Card>

            {/* Valeurs */}
            <Card className="gradient-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">💎 Valeurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• Transparence : Prix clairs, pas de frais cachés</div>
                  <div>• Innovation : IA au service des entrepreneurs</div>
                  <div>• Communauté : Entraide et partage</div>
                  <div>• Excellence : Formation continue</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Longrich International */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="gradient-secondary text-white px-3 py-1">
                📈 LONGRICH INTERNATIONAL
              </Badge>
              <h2 className="text-3xl font-bold">Une entreprise mondiale, une vision africaine</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Fondé en 1986 en Chine</h4>
                    <p className="text-sm text-muted-foreground">Plus de 35 ans d'expertise mondiale</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-secondary rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">+40 pays dans le monde</h4>
                    <p className="text-sm text-muted-foreground">Présence internationale établie</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent to-accent/80 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">+200 produits certifiés</h4>
                    <p className="text-sm text-muted-foreground">Santé, beauté, maison</p>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <span>Expansion Afrique</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Lancement Afrique</span>
                    <Badge variant="outline">2015</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Paiements Mobile Money</span>
                    <Badge className="bg-green-500 text-white">✓ Intégrés</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Support multilingue</span>
                    <Badge className="bg-blue-500 text-white">FR, EN, Local</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Produits adaptés</span>
                    <Badge className="bg-purple-500 text-white">Besoins locaux</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">Notre Parcours</h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <Card className="gradient-card text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-lg">2015</span>
                    </div>
                    <h4 className="font-semibold">Lancement Afrique</h4>
                    <p className="text-sm text-muted-foreground">
                      Premiers pas de Longrich sur le continent africain
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="gradient-card text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 gradient-secondary rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-lg">2020</span>
                    </div>
                    <h4 className="font-semibold">1,000 Membres</h4>
                    <p className="text-sm text-muted-foreground">
                      Première communauté active établie
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="gradient-card text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-accent to-accent/80 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-lg">2023</span>
                    </div>
                    <h4 className="font-semibold">10K Membres</h4>
                    <p className="text-sm text-muted-foreground">
                      Croissance exponentielle du réseau
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="gradient-card text-center">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary via-secondary to-accent rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white font-bold text-lg">2024</span>
                    </div>
                    <h4 className="font-semibold">Plateforme Community</h4>
                    <p className="text-sm text-muted-foreground">
                      Lancement de l'écosystème digital complet
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Prêt à Faire Partie de l'Histoire ?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Rejoignez une communauté qui transforme l'entrepreneuriat 
            MLM en Afrique depuis 2015.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              🚀 Devenir Membre
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
              📦 Découvrir nos Packs
            </Button>
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default About;