import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Search, Filter, Eye, Package, Truck, CheckCircle, XCircle, Clock, User, ShoppingBag, CreditCard, X } from 'lucide-react';
import axiosInstance from '@/services/axiosInstance';
import { useParams } from "react-router-dom";

export const OrdersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { shopId } = useParams<{ shopId: string }>();
  
  const statusColors = {
    'pending': 'outline',
    'approved': 'secondary',
    'process_of_delivery': 'warning',
    'delivered': 'success',
    'cancelled': 'destructive',
  } as const;
  
  const statusIcons = {
    'pending': Clock,
    'approved': CheckCircle,
    'process_of_delivery': Truck,
    'delivered': CheckCircle,
    'cancelled': XCircle,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('auth_token');
        const res = await axiosInstance.get(`/api/commandes/${shopId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      
        const ordersWithParsedCustomer = res.data.map((order: any) => {
          let customerObj = null;
          try {
            customerObj = order.customer ? JSON.parse(order.customer) : null;
          } catch (e) {
            console.error("Erreur parsing customer:", order.customer, e);
          }
          return { ...order, customer: customerObj };
        });

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
  
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error('Erreur mise à jour statut', err);
    }
  };

  const openOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const parseTransaction = (transaction: string) => {
    try {
      return JSON.parse(transaction);
    } catch (e) {
      console.error('Erreur parsing transaction:', e);
      return null;
    }
  };

  if (loading) return (
    <div className="text-center py-12">
      <div className="flex items-center justify-center gap-2">
        <svg className="animate-spin h-5 w-5 text-teal-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        Chargement des commandes...
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-4">
      {/* Header & Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Package className="w-6 h-6 text-teal-500" />
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
                className="pl-10 rounded-lg"
                aria-label="Rechercher des commandes"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 rounded-lg">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="approved">Approuvé</SelectItem>
                <SelectItem value="process_of_delivery">En cours de livraison</SelectItem>
                <SelectItem value="delivered">Livré</SelectItem>
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
                  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons] || Clock;
                  const statusColor = statusColors[order.status as keyof typeof statusColors] || 'outline';
                  return (
                    <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium">{order.reference}</TableCell>
                      <TableCell>
                        {order.customer ? (
                          <div className="space-y-1">
                            <div className="font-medium">{order.customer.name}</div>
                            <div className="text-xs text-muted-foreground">{order.customer.email || 'Non fourni'}</div>
                            <div className="text-xs text-muted-foreground">{order.customer.phone || 'Non fourni'}</div>
                          </div>
                        ) : (
                          <span className="italic text-muted-foreground">Client inconnu</span>
                        )}
                      </TableCell>                   
                      <TableCell>
                        <a href={`/shop/${order.orderable_id}/produit`} className="text-blue-500 hover:underline">
                          {order.orderable?.title || 'Produit inconnu'}
                        </a>
                      </TableCell>
                      <TableCell className="font-medium">{formatAmount(order.amount)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon className="w-4 h-4 text-teal-500" />
                          <Badge variant={statusColor}>{order.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{formatDate(order.created_at)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Select
                            value={order.status}
                            onValueChange={(newStatus) => updateOrderStatus(order.id, newStatus)}
                          >
                            <SelectTrigger className="w-32 h-8 rounded-lg">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">En attente</SelectItem>
                              <SelectItem value="approved">Approuvé</SelectItem>
                              <SelectItem value="process_of_delivery">En cours de livraison</SelectItem>
                              <SelectItem value="delivered">Livré</SelectItem>
                              <SelectItem value="cancelled">Annulée</SelectItem>
                            </SelectContent>
                          </Select>
                          <Dialog open={isModalOpen && selectedOrder?.id === order.id} onOpenChange={(open) => {
                            if (!open) setIsModalOpen(false);
                          }}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => openOrderDetails(order)} aria-label={`Voir les détails de la commande ${order.reference}`}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="modal-lg bg-white rounded-xl shadow-2xl p-6 max-w-4xl w-full overflow-y-auto">
                              <DialogHeader className="flex flex-row items-center justify-between">
                                <DialogTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                  <Package className="w-6 h-6 text-teal-500" />
                                  Détails de la commande #{order.reference}
                                </DialogTitle>
                                
                              </DialogHeader>
                              <div className="mt-4 space-y-6 max-h-[80vh] overflow-y-auto">
                                {/* Customer Information */}
                                <div className="border rounded-lg p-4 bg-gray-50 animate-fade-in">
                                  <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                    <User className="w-5 h-5 text-teal-500" />
                                    Informations sur le client
                                  </h4>
                                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="font-medium">Nom</p>
                                      <p className="text-gray-600">{order.customer?.name || <span className="italic text-muted-foreground">Non fourni</span>}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">Email</p>
                                      <p className="text-gray-600">{order.customer?.email || <span className="italic text-muted-foreground">Non fourni</span>}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">Téléphone</p>
                                      <p className="text-gray-600">{order.customer?.phone || <span className="italic text-muted-foreground">Non fourni</span>}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">Adresse</p>
                                      <p className="text-gray-600">
                                        {order.customer?.address ? `${order.customer.address}, ${order.customer.city}, ${order.customer.country}` : <span className="italic text-muted-foreground">Non fourni</span>}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Product Details */}
                                <div className="border rounded-lg p-4 bg-gray-50 animate-fade-in">
                                  <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5 text-teal-500" />
                                    Détails du produit
                                  </h4>
                                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="font-medium">Titre</p>
                                      <p className="text-gray-600">{order.orderable?.title || <span className="italic text-muted-foreground">Produit inconnu</span>}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">Catégorie</p>
                                      <p className="text-gray-600">{order.orderable?.category || <span className="italic text-muted-foreground">Non spécifié</span>}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">Prix unitaire</p>
                                      <p className="text-gray-600">{order.orderable?.price ? formatAmount(order.orderable.price) : <span className="italic text-muted-foreground">Non spécifié</span>}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">Quantité</p>
                                      <p className="text-gray-600">{order.quantity || <span className="italic text-muted-foreground">Non spécifié</span>}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">Montant total</p>
                                      <p className="text-gray-600 font-semibold">{formatAmount(order.amount)}</p>
                                    </div>
                                    {order.orderable?.image && (
                                      <div className="col-span-2">
                                        <p className="font-medium">Image du produit</p>
                                        <img
                                          src={order.orderable.image}
                                          alt={order.orderable.title || 'Produit'}
                                          className="w-40 h-40 object-cover rounded-lg mt-2 border border-gray-200"
                                          loading="lazy"
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Transaction Information */}
                                <div className="border rounded-lg p-4 bg-gray-50 animate-fade-in">
                                  <h4 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-teal-500" />
                                    Informations sur la transaction
                                  </h4>
                                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <p className="font-medium">Référence</p>
                                      <p className="text-gray-600">{order.reference}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">ID Transaction</p>
                                      <p className="text-gray-600">{order.transaction_id || <span className="italic text-muted-foreground">Non disponible</span>}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">Statut</p>
                                      <div className="flex items-center gap-2">
                                        <StatusIcon className="w-4 h-4 text-teal-500" />
                                        <Badge variant={statusColors[order.status as keyof typeof statusColors] || 'outline'}>
                                          {order.status}
                                        </Badge>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="font-medium">Date de création</p>
                                      <p className="text-gray-600">{formatDate(order.created_at)}</p>
                                    </div>
                                    <div>
                                      <p className="font-medium">Dernière mise à jour</p>
                                      <p className="text-gray-600">{formatDate(order.updated_at)}</p>
                                    </div>
                                    {order.transaction && parseTransaction(order.transaction) && (
                                      <>
                                        <div>
                                          <p className="font-medium">Montant débité</p>
                                          <p className="text-gray-600">{formatAmount(parseTransaction(order.transaction).amount_debited)}</p>
                                        </div>
                                        <div>
                                          <p className="font-medium">Frais</p>
                                          <p className="text-gray-600">{formatAmount(parseTransaction(order.transaction).fees)}</p>
                                        </div>
                                        <div>
                                          <p className="font-medium">Reçu</p>
                                          <p>
                                            <a
                                              href={parseTransaction(order.transaction).receipt_url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-500 hover:underline"
                                              aria-label="Voir le reçu de la transaction"
                                            >
                                              Voir le reçu
                                            </a>
                                          </p>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
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
      <style>
        {`
          .modal-lg {
            width: 90vw;
            max-width: 1000px;
            max-height: 80vh;
          }
          @media (min-width: 640px) {
            .modal-lg {
              width: 80vw;
            }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-in;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};