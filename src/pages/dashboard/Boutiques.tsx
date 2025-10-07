import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductsManagement } from '@/components/ProductsManagement';
import { OrdersManagement } from '@/components/OrdersManagement';
import { 
  ShoppingCart, 
  Eye,
  BarChart3
} from 'lucide-react';
import { Link, useParams } from "react-router-dom";
import axiosInstance from "@/services/axiosInstance"; 

const Boutiques: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(() => localStorage.getItem('activeTab') || 'overview');
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  const { shopId } = useParams();
  const [shop, setShop] = useState<any>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        if (!shopId) return;

        // await axiosInstance.get("/sanctum/csrf-cookie");
        const token = localStorage.getItem("auth_token");

        const res = await axiosInstance.get(`/api/shops/${shopId}/show`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setShop(res.data.shop || null);
        setStats(res.data.stats || []);
        setRecentOrders(res.data.recentOrders || []);

      } catch (error: any) {
        console.error("Erreur lors de la récupération des données de la boutique :", error);
      }
    };

    fetchShopData();
  }, [shopId]);

  if (!shop) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text ">
            {shop.title}
          </h1>
          <p className="text-muted-foreground">
            Gérez votre boutique en ligne et développez votre activité
          </p>
        </div>

        <div className="flex gap-4">
          <Link to={`/${shop.lien_shop}`}>
            <Button className="gradient-secondary">
              <Eye className="w-4 h-4 mr-2" />
              Voir ma boutique 
            </Button>
          </Link>

          <Link to="/dash/boutiques">
            <Button className="gradient-secondary">
              <Eye className="w-4 h-4 mr-2" />
              Liste des boutiques
            </Button>
          </Link>

          <Link to={`#`}>
            <Button className="gradient-secondary">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Retirer un solde 
            </Button>
          </Link>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="orders">Commandes</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon || BarChart3; // Icon par défaut
              return (
                <Card key={index} className="gradient-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <Badge variant="secondary" className="text-xs">{stat.change}</Badge>
                      </div>
                      <Icon className={`w-8 h-8 ${stat.color || 'text-primary'}`} />
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
                {recentOrders.length > 0 ? recentOrders.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{order.customer.name} ({order.customer.phone})</p>
                      <p className="text-sm text-muted-foreground">
                        <Link 
                          to={`/shop/${order.product.id}/produit`} 
                          className="text-blue-600 hover:underline"
                        >
                          {order.product.title}
                        </Link>
                        {" - "}{order.reference}
                      </p>
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
                )) : (
                  <p className="text-muted-foreground text-center py-4">Aucune commande récente.</p>
                )}
                <Button variant="outline" className="w-full">Voir toutes les commandes</Button>
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
          <ProductsManagement />
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <OrdersManagement />
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
                <Button className="gradient-primary">Voir les statistiques</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Boutiques;
