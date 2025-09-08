import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Store, 
  BarChart3, 
  Package, 
  ShoppingCart, 
  Eye,
  TrendingUp,
  Users
} from 'lucide-react';

const Boutiques = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Visiteurs ce mois',
      value: '2,847',
      change: '+12%',
      icon: Eye,
      color: 'text-primary'
    },
    {
      title: 'Commandes',
      value: '128',
      change: '+8%',
      icon: ShoppingCart,
      color: 'text-secondary'
    },
    {
      title: 'Chiffre d\'affaires',
      value: '1,240,000 FCFA',
      change: '+15%',
      icon: TrendingUp,
      color: 'text-accent'
    },
    {
      title: 'Produits actifs',
      value: '47',
      change: '+3',
      icon: Package,
      color: 'text-success'
    }
  ];

  const recentOrders = [
    { id: '001', customer: 'Aminata Traoré', product: 'Shampoing Superplex', amount: '15,000 FCFA', status: 'Confirmé' },
    { id: '002', customer: 'Jean Baptiste', product: 'Café 3 en 1', amount: '8,500 FCFA', status: 'En cours' },
    { id: '003', customer: 'Fatou Diallo', product: 'Crème visage', amount: '22,000 FCFA', status: 'Livré' },
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Ma Boutique SaaS
          </h1>
          <p className="text-muted-foreground">
            Gérez votre boutique en ligne et développez votre activité
          </p>
        </div>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Créer une boutique
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="gradient-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <Badge variant="secondary" className="text-xs">
                          {stat.change}
                        </Badge>
                      </div>
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Orders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Commandes récentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.product}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-semibold">{order.amount}</p>
                      <Badge variant={
                        order.status === 'Livré' ? 'default' : 
                        order.status === 'Confirmé' ? 'secondary' : 'outline'
                      }>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  Voir toutes les commandes
                </Button>
              </CardContent>
            </Card>

            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground text-center">
                    Graphique des ventes<br />
                    <span className="text-sm">À venir</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Gestion des Produits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Gérez vos produits</h3>
                <p className="text-muted-foreground mb-4">
                  Ajoutez, modifiez et organisez votre catalogue produits
                </p>
                <Button className="gradient-secondary">
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un produit
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Gestion des Commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Suivez vos commandes</h3>
                <p className="text-muted-foreground mb-4">
                  Gérez le cycle de vie de vos commandes clients
                </p>
                <Button className="gradient-accent">
                  Voir toutes les commandes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Analytics Avancés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analysez vos performances</h3>
                <p className="text-muted-foreground mb-4">
                  Obtenez des insights détaillés sur votre activité
                </p>
                <Button className="gradient-primary">
                  Voir les statistiques
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Boutiques;