import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Store, Upload, CreditCard, Truck } from 'lucide-react';

interface CreateShopFormProps {
  onShopCreated: (shop: any) => void;
}

export const CreateShopForm: React.FC<CreateShopFormProps> = ({ onShopCreated }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    email: '',
    phone: '',
    category: '',
    paymentOnDelivery: true,
    paymentMethod: '',
    isActive: false
  });

  const categories = [
    'Mode & Beauté',
    'Électronique',
    'Maison & Jardin',
    'Sports & Loisirs',
    'Alimentation',
    'Santé & Bien-être',
    'Automobile',
    'Autres'
  ];

  const paymentMethods = [
    'Orange Money',
    'MTN MoMo',
    'Visa/Mastercard',
    'PayPal',
    'Virement bancaire'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newShop = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      logo: '🏪'
    };
    onShopCreated(newShop);
    setOpen(false);
    setFormData({
      name: '',
      description: '',
      address: '',
      email: '',
      phone: '',
      category: '',
      paymentOnDelivery: true,
      paymentMethod: '',
      isActive: false
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Créer ma boutique
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            Créer ma boutique
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations de base */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations de base</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nom de la boutique *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ma Super Boutique"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Décrivez votre boutique en quelques mots..."
                    rows={3}
                  />
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
                </div>
                
                <div>
                  <Label htmlFor="logo">Logo / Image de couverture</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Cliquez pour upload ou glissez-déposez
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG jusqu'à 2MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact et localisation */}
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
                    placeholder="123 Rue de la Paix, Abidjan, Côte d'Ivoire"
                    rows={2}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email de contact *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="contact@maboutique.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+225 01 23 45 67 89"
                    required
                  />
                </div>

                {/* Options d'activation */}
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
                      onCheckedChange={(checked) => setFormData({...formData, paymentOnDelivery: checked})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="payment-method">Méthode de paiement</Label>
                    <Select value={formData.paymentMethod} onValueChange={(value) => setFormData({...formData, paymentMethod: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir une méthode" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method} value={method}>{method}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="active">Activer la boutique</Label>
                      <p className="text-sm text-muted-foreground">
                        Votre boutique sera visible publiquement
                      </p>
                    </div>
                    <Switch
                      id="active"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" className="gradient-primary">
              Créer la boutique
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};