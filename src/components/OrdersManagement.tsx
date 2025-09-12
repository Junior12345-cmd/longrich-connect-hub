import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Eye, 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle,
  Clock,
  MoreHorizontal
} from 'lucide-react';

export const OrdersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [orders, setOrders] = useState([
    {
      id: 'CMD001',
      customer: { name: 'Aminata Traoré', email: 'aminata@email.com', phone: '+225 01 23 45 67' },
      products: [
        { name: 'Shampoing Superplex', quantity: 2, price: 7500 },
        { name: 'Après-shampoing', quantity: 1, price: 5000 }
      ],
      totalAmount: 20000,
      paymentMethod: 'Paiement à la livraison',
      status: 'En attente',
      orderDate: '2024-12-10T10:30:00',
      deliveryAddress: 'Cocody, Abidjan'
    },
    {
      id: 'CMD002',
      customer: { name: 'Jean Baptiste Koffi', email: 'jean@email.com', phone: '+225 07 89 12 34' },
      products: [
        { name: 'Café 3 en 1', quantity: 5, price: 1700 }
      ],
      totalAmount: 8500,
      paymentMethod: 'Orange Money',
      status: 'Confirmée',
      orderDate: '2024-12-10T14:15:00',
      deliveryAddress: 'Yopougon, Abidjan'
    },
    {
      id: 'CMD003',
      customer: { name: 'Fatou Diallo', email: 'fatou@email.com', phone: '+225 05 67 89 01' },
      products: [
        { name: 'Crème visage anti-âge', quantity: 1, price: 22000 }
      ],
      totalAmount: 22000,
      paymentMethod: 'MTN MoMo',
      status: 'Expédiée',
      orderDate: '2024-12-09T09:20:00',
      deliveryAddress: 'Plateau, Abidjan'
    },
    {
      id: 'CMD004',
      customer: { name: 'Ibrahim Sanogo', email: 'ibrahim@email.com', phone: '+225 03 45 67 89' },
      products: [
        { name: 'Parfum homme', quantity: 1, price: 35000 },
        { name: 'Gel douche', quantity: 2, price: 4500 }
      ],
      totalAmount: 44000,
      paymentMethod: 'Paiement à la livraison',
      status: 'Livrée',
      orderDate: '2024-12-08T16:45:00',
      deliveryAddress: 'Marcory, Abidjan'
    },
    {
      id: 'CMD005',
      customer: { name: 'Aissata Ouattara', email: 'aissata@email.com', phone: '+225 09 12 34 56' },
      products: [
        { name: 'Robe africaine', quantity: 1, price: 18000 }
      ],
      totalAmount: 18000,
      paymentMethod: 'Visa',
      status: 'Annulée',
      orderDate: '2024-12-08T11:30:00',
      deliveryAddress: 'Treichville, Abidjan'
    }
  ]);

  const statusColors = {
    'En attente': 'outline',
    'Confirmée': 'secondary', 
    'Expédiée': 'default',
    'Livrée': 'default',
    'Annulée': 'destructive'
  } as const;

  const statusIcons = {
    'En attente': Clock,
    'Confirmée': CheckCircle,
    'Expédiée': Truck,
    'Livrée': Package,
    'Annulée': XCircle
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Gestion des Commandes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par référence ou nom client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Confirmée">Confirmée</SelectItem>
                <SelectItem value="Expédiée">Expédiée</SelectItem>
                <SelectItem value="Livrée">Livrée</SelectItem>
                <SelectItem value="Annulée">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Produits</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => {
                  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
                  
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        {order.id}
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{order.customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {order.customer.phone}
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          {order.products.map((product, index) => (
                            <div key={index} className="text-sm">
                              {product.name} x{product.quantity}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      
                      <TableCell className="font-medium">
                        {formatAmount(order.totalAmount)}
                      </TableCell>
                      
                      <TableCell>
                        <div className="text-sm">{order.paymentMethod}</div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon className="w-4 h-4" />
                          <Badge variant={statusColors[order.status as keyof typeof statusColors]}>
                            {order.status}
                          </Badge>
                        </div>
                      </TableCell>
                      
                      <TableCell className="text-sm">
                        {formatDate(order.orderDate)}
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Select
                            value={order.status}
                            onValueChange={(newStatus) => updateOrderStatus(order.id, newStatus)}
                          >
                            <SelectTrigger className="w-32 h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="En attente">En attente</SelectItem>
                              <SelectItem value="Confirmée">Confirmée</SelectItem>
                              <SelectItem value="Expédiée">Expédiée</SelectItem>
                              <SelectItem value="Livrée">Livrée</SelectItem>
                              <SelectItem value="Annulée">Annulée</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucune commande trouvée</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Essayez de modifier vos critères de recherche'
                  : 'Les commandes de vos clients apparaîtront ici'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(
          orders.reduce((acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
          }, {} as Record<string, number>)
        ).map(([status, count]) => {
          const StatusIcon = statusIcons[status as keyof typeof statusIcons];
          return (
            <Card key={status} className="text-center">
              <CardContent className="p-4">
                <StatusIcon className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-muted-foreground">{status}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};