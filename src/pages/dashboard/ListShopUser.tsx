import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '@/services/axiosInstance';
import { CreateShopForm } from '@/components/CreateShopForm';
import { useNavigate } from 'react-router-dom';
import { ShopTemplateSelector } from '@/components/ShopTemplateSelector';

interface Shop {
  id: number;
  title: string;
  description: string;
  status: 'incomplete' | 'complete' | 'inactive' | 'desactived' | 'pending';
  solde: number;
  template?: string | null;
  lien_shop: string
}

const ListShopUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        await axiosInstance.get('/sanctum/csrf-cookie');
        const token = localStorage.getItem('auth_token');
        const res = await axiosInstance.get('/api/shops', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // res.data doit contenir status pour chaque shop
        setShops(res.data);
      } catch (err: any) {
        console.error(err.message);
        toast.error(err.message || 'Erreur lors de la récupération des boutiques');
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);
  

  const handleDeactivateShop = async (id: number) => {
    try {
      const token = localStorage.getItem('auth_token');
      const res= await axiosInstance.post(`/api/shops/${id}/desactivate`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      setShops(prev =>
        prev.map(shop =>
          shop.id === id ? { ...shop, status: 'desactived' } : shop
        )
      );
      console.log(res)
      toast.success('Boutique désactivée avec succès');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Impossible de désactiver la boutique');
    }
  };
  
  const handleActivateShop = async (id: number) => {
    try {
      const token = localStorage.getItem('auth_token');
      await axiosInstance.post(`/api/shops/${id}/reactivate`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      setShops(prev =>
        prev.map(shop =>
          shop.id === id ? { ...shop, status: 'complete' } : shop
        )
      );
  
      toast.success('Boutique réactivée avec succès');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Impossible de réactiver la boutique');
    }
  };
  
  
  const updateShopTemplate = async (shopId: number, template: any) => {
    try {
      const token = localStorage.getItem('auth_token');
      await axiosInstance.put(`/api/shops/${shopId}/update-template`,
        {
          template: JSON.stringify(template),
          theme: JSON.stringify(template.style),
          title_principal_shop: template.customization?.title,
          text_description_shop: template.customization?.description,
          text_bouton_shop: template.customization?.buttonText
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShops(prev =>
        prev.map(shop =>
          shop.id === shopId ? { ...shop, template: JSON.stringify(template) } : shop
        )
      );

      toast.success('Template appliqué avec succès !');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erreur lors de l’application du template');
    }
  };

  if (loading) return <p>Chargement des boutiques...</p>;

  const filteredShops = shops.filter(shop => shop.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 container p-6 mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Boutiques</h1>
          <p className="text-muted-foreground">Gérez vos boutiques, suivez leur statut et leur solde</p>
        </div>
        <CreateShopForm onShopCreated={(shop) => setShops([...shops, shop])} />
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input placeholder="Rechercher une boutique..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
      </div>

      <div className="grid gap-4">
        {filteredShops.map((shop) => (
          <Card key={shop.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{shop.title}</CardTitle>
                    <Badge
                      className={`text-white ${
                        shop.status === 'complete'
                          ? 'bg-green-500'
                          : shop.status === 'incomplete'
                          ? 'bg-yellow-500'
                          : shop.status === 'desactived'
                          ? 'bg-red-500'
                          : 'bg-gray-500'
                      }`}
                    >
                      {shop.status === 'complete'
                        ? 'Complète'
                        : shop.status === 'incomplete'
                        ? 'Incomplète'
                        : shop.status === 'desactived'
                        ? 'Désactivée'
                        : 'Inactive'}
                    </Badge>
                  </div>
                  <CardDescription>{shop.description}</CardDescription>
                </div>

                <div className="flex gap-2">
                  <ShopTemplateSelector
                    shopId={shop.id}
                    initialTemplate={shop.template ? JSON.parse(shop.template) : undefined}
                    onTemplateSelected={(template) => updateShopTemplate(shop.id, template)}
                  />

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(shop.lien_shop, "_blank")}
                  >
                    Voir ma boutique
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/shops/edit/${shop.id}`)}
                    // disabled={shop.status !== 'complete'}
                    title={shop.status !== 'complete' ? "Vous ne pouvez modifier qu'une boutique complète" : ""}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={shop.status === 'inactive'}
                    onClick={() => {
                      if (shop.status === 'desactived') {
                        handleActivateShop(shop.id);
                      } else {
                        handleDeactivateShop(shop.id);
                      }
                    }}
                  >
                    {shop.status === 'desactived' ? 'Réactiver' : 'Désactiver'}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/shops/${shop.id}/dashboard`)}
                  >
                    Tableau de bord
                  </Button>


                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-sm">
                <p>Solde: <span className="font-medium">{shop.solde} €</span></p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>


      {filteredShops.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">Aucune boutique trouvée</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Aucune boutique ne correspond à votre recherche.' : 'Commencez par créer votre première boutique.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ListShopUser;
