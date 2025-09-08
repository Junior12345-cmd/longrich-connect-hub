import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  TrendingUp, 
  Users, 
  MapPin, 
  Bell,
  Sparkles,
  Store,
  GraduationCap,
  Video,
  MessageCircle,
  Star
} from 'lucide-react';

const Index = () => {
  const quickStats = [
    { label: 'Membres actifs', value: '12,547', icon: Users, color: 'text-primary' },
    { label: 'Boutiques', value: '3,241', icon: Store, color: 'text-secondary' },
    { label: 'Formations', value: '156', icon: GraduationCap, color: 'text-accent' },
    { label: 'Lives cette semaine', value: '24', icon: Video, color: 'text-success' }
  ];

  const recentNews = [
    {
      id: 1,
      title: 'Nouvelle gamme de produits beauté disponible',
      summary: 'Découvrez notre nouvelle collection de soins visage enrichie aux extraits naturels.',
      timestamp: '2h',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Formation Leadership - Inscriptions ouvertes',
      summary: 'Développez vos compétences en leadership avec nos experts. Places limitées.',
      timestamp: '4h',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Mise à jour des commissions - Janvier 2024',
      summary: 'Consultez les nouveaux barèmes de commissions en vigueur ce mois.',
      timestamp: '1 jour',
      priority: 'low'
    }
  ];

  const featuredMembers = [
    { name: 'Marie Kouassi', location: 'Abidjan', rating: 4.9, sales: '2.3M FCFA' },
    { name: 'Jean Baptiste', location: 'Dakar', rating: 4.8, sales: '1.8M FCFA' },
    { name: 'Aminata Traoré', location: 'Bamako', rating: 4.7, sales: '1.5M FCFA' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="gradient-hero text-dark py-12 px-4">
        <div className="container mx-auto text-center space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold">
            Plateforme Communautaire
            <br />
            <span className="text-yellow-200">Longrich</span>
          </h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto text-dark">
            Votre hub complet pour le commerce, la formation et la communauté
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
                <Input
                  placeholder="Rechercher produits, stockistes, formations..."
                  className="pl-12 text-white placeholder:text-white/70 h-12 border-primary focus:border-primary focus:ring-0"
                />
              </div>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="gradient-card hover:shadow-lg transition-smooth">
                <CardContent className="p-6 text-center">
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Actualités */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Actualités & Annonces
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentNews.map((news) => (
                  <div key={news.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{news.title}</h3>
                          <Badge variant={
                            news.priority === 'high' ? 'default' : 
                            news.priority === 'medium' ? 'secondary' : 'outline'
                          } className="text-xs">
                            {news.priority === 'high' ? 'Important' : 
                             news.priority === 'medium' ? 'Moyen' : 'Info'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{news.summary}</p>
                        <p className="text-xs text-muted-foreground">{news.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Voir toutes les actualités
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Actions Rapides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button className="h-20 flex flex-col gap-2 gradient-primary">
                    <Store className="w-6 h-6" />
                    <span className="text-sm">Ma Boutique</span>
                  </Button>
                  <Button className="h-20 flex flex-col gap-2 gradient-secondary">
                    <GraduationCap className="w-6 h-6" />
                    <span className="text-sm">Formations</span>
                  </Button>
                  <Button className="h-20 flex flex-col gap-2 gradient-accent">
                    <Video className="w-6 h-6" />
                    <span className="text-sm">Live</span>
                  </Button>
                  <Button className="h-20 flex flex-col gap-2 bg-muted text-foreground hover:bg-muted/80">
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-sm">Messages</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Performers */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {featuredMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <div className="w-10 h-10 gradient-hero rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="font-medium text-sm">{member.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{member.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{member.rating}</span>
                        </div>
                        <span className="text-xs font-medium text-primary">{member.sales}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="text-sm">Liens Utiles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  📋 Catalogue Produits
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  💰 Packs d'Adhésion
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  🎯 Studio Marketing IA
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  📞 Support & Plaintes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
