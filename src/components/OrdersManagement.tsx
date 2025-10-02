import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Eye, Package, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import axiosInstance from '@/services/axiosInstance';
import { useParams } from "react-router-dom";

export const OrdersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { shopId } = useParams<{ shopId: string }>();

  const statusColors = {
    'pending': 'outline',
    'completed': 'secondary',
    'cancelled': 'destructive'
  } as const;

  const statusIcons = {
    'pending': Clock,
    'completed': CheckCircle,
    'cancelled': XCircle
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        await axiosInstance.get('/sanctum/csrf-cookie'); 
        const token = localStorage.getItem('auth_token');

        const res = await axiosInstance.get(`/api/commandes/${shopId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      
        // Parser ici
        const ordersWithParsedCustomer = res.data.map((order: any) => {
          let customerObj = null;
          try {
            customerObj = order.customer
              ? JSON.parse(order.customer)
              : null;
          } catch (e) {
            console.error("Erreur parsing customer:", order.customer, e);
          }
          return { ...order, customer: customerObj };
        });

        console.log(ordersWithParsedCustomer)

        setOrders(ordersWithParsedCustomer); 
        
      } catch (err) {
        console.error('Erreur lors du chargement des commandes', err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [shopId]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.phone?.toLowerCase().includes(searchTerm.toLowerCase());
  
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await axiosInstance.post(
        `/api/commandes/${orderId}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` } }
      );
  
      // Mettre à jour le state local pour refléter le changement
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error('Erreur mise à jour statut', err);
    }
  };
  
  if (loading) return <div className="text-center py-12">Chargement des commandes...</div>;

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
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="completed">Confirmée</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
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
                  <TableHead>Produit</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map(order => {
                  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
                  return (
                    <TableRow key={order.id}>
                      <TableCell>{order.reference}</TableCell>
                      <TableCell>
                        {order.customer ? (
                          <>
                            <div className="font-medium">{order.customer.name}</div>
                            <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                            <div className="text-xs text-muted-foreground">{order.customer.phone}</div>
                          </>
                        ) : (
                          <span className="italic text-muted-foreground">Client inconnu</span>
                        )}
                      </TableCell>                   
                      <TableCell>
                        <a href=""> {order.orderable?.title || "Produit inconnu"}</a>
                         
                      </TableCell>
                      <TableCell className="font-medium">{formatAmount(order.amount)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon className="w-4 h-4" />
                          <Badge variant={statusColors[order.status as keyof typeof statusColors]}>
                            {order.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{formatDate(order.created_at)}</TableCell>
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
                              <SelectItem value="pending">En attente</SelectItem>
                              <SelectItem value="completed">Confirmée</SelectItem>
                              <SelectItem value="cancelled">Annulée</SelectItem>
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
        </CardContent>
      </Card>
    </div>
  );
};
