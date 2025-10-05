import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '@/services/axiosInstance';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const categories = [
  'Mode & Beauté', 'Électronique', 'Maison & Jardin', 'Sports & Loisirs',
  'Alimentation', 'Santé & Bien-être', 'Automobile', 'Autres'
];

const EditShopPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    email: '',
    phone: '',
    category: '',
    paymentOnDelivery: false,
    salesTax: false,
    template: '',
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);

  // Charger la boutique existante
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await axiosInstance.get(`/api/shops/${id}/show`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const shop = res.data.shop;
        // console.log(shop);
        setFormData({
          title: shop.title,
          description: shop.description || '',
          address: shop.adresse,
          email: shop.mail,
          phone: shop.phone,
          category: shop.category,
          paymentOnDelivery: shop.paymentOnDelivery,
          salesTax: shop.salesTax,
          template: shop.template || '',
        });
      } catch (err: any) {
        toast.error('Impossible de récupérer les données de la boutique');
      } finally {
        setLoading(false);
      }
    };
    fetchShop();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      const res = await axiosInstance.put(`/api/shops/${id}/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Boutique mise à jour avec succès !');
      navigate('/dash/boutiques');
    } catch (err: any) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        toast.error('Erreur lors de la mise à jour');
      }
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
        >
          ← Retour
        </Button>
        <h1 className="text-3xl font-bold">Modifier la boutique</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Informations de base</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Nom *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description[0]}</p>}
            </div>

            <div>
              <Label htmlFor="category">Catégorie *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category[0]}</p>}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Contact & Localisation</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Adresse *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address[0]}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
            </div>

            <div>
              <Label htmlFor="phone">Téléphone *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="submit" className="gradient-primary">Enregistrer les modifications</Button>
        </div>
      </form>
    </div>
  );
};

export default EditShopPage;
