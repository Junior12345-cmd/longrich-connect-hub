import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShopTemplateSelector } from './ShopTemplateSelector';
import { Plus, Store, Upload, CreditCard, Truck } from 'lucide-react';
import axiosInstance from '@/services/axiosInstance';
import { toast } from 'sonner';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface CreateShopFormProps {
  onShopCreated: (shop: any) => void;
}

export const CreateShopForm: React.FC<CreateShopFormProps> = ({ onShopCreated }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    email: '',
    phone: '',
    category: '',
    paymentOnDelivery: false,
    salesTax: false,
    template: null,
    logo: null as File | null,
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  const categories = [
    'Mode & Beauté', 'Électronique', 'Maison & Jardin', 'Sports & Loisirs',
    'Alimentation', 'Santé & Bien-être', 'Automobile', 'Autres'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.get('/sanctum/csrf-cookie');
      const token = localStorage.getItem('auth_token');
  
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value as any);
        }
      });
  
      const response = await axiosInstance.post('/api/shops/create', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      toast.success('Boutique créée avec succès !');
  
      // récupération du lien du logo
      const shopWithLogoUrl = response.data;
      // console.log('Logo URL:', shopWithLogoUrl.logo_url);
  
      onShopCreated(shopWithLogoUrl);
      setOpen(false);
      setErrors({});
      setFormData({ title: '', description: '', address: '', email: '', phone: '', category: '', paymentOnDelivery: false, salesTax: false, template: '', logo: null });
      
      setTimeout(() => {
        window.location.reload();

      }, 1000); 
    } catch (err: any) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        toast.error(err.response?.data?.message || 'Erreur lors de la création de la boutique');
      }
    }finally {
      setLoading(false);
    }
  };
  
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-2">
          {/* <ShopTemplateSelector onTemplateSelected={(template) => setFormData({...formData, template})} /> */}
          <Button className="gradient-primary">
            <Plus className="w-4 h-4 mr-2" />
            Créer ma boutique
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="w-full max-w-[90vw] p-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            Créer ma boutique
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Infos de base */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations de base</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Nom de la boutique *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Ma Super Boutique"
                  />
                  {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <ReactQuill
                    id="description"
                    theme="snow"
                    value={formData.description}
                    onChange={(value) => setFormData({ ...formData, description: value })}
                    placeholder="Décrivez votre boutique..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description[0]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category[0]}</p>}
                </div>

                <div>
                  <Label htmlFor="logo">Logo</Label>
                  <Input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, logo: e.target.files ? e.target.files[0] : null})}
                  />
                  {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo[0]}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Contact & Localisation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact & Localisation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Adresse *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="123 Rue de la Paix, Abidjan"
                    rows={2}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address[0]}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="contact@maboutique.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
                </div>

                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+225 01 23 45 67 89"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone[0]}</p>}
                </div>

                {/* Options d’activation */}
                <div className="pt-4 space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Options de paiement
                  </h4>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      <Label htmlFor="payment-delivery">Paiement à la livraison</Label>
                    </div>
                    <Switch
                      id="payment-delivery"
                      checked={formData.paymentOnDelivery}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          paymentOnDelivery: checked,
                          salesTax: checked ? false : formData.salesTax
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sales-tax">Taxe sur vos ventes</Label>
                      <p className="text-sm text-muted-foreground">
                        Activez pour appliquer une taxe sur chaque vente
                      </p>
                    </div>
                    <Switch
                      id="sales-tax"
                      checked={formData.salesTax}
                      disabled={formData.paymentOnDelivery}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          salesTax: checked,
                          paymentOnDelivery: checked ? false : formData.paymentOnDelivery
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Annuler
            </Button>

            <Button
              type="submit"
              className="gradient-primary flex items-center gap-2"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Création..." : "Créer la boutique"}
            </Button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};
