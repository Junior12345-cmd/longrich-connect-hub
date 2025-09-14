import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Plus, DollarSign, MapPin, Users } from 'lucide-react';
import { toast } from 'sonner';

interface CreatePackFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const CreatePackForm = ({ open, onClose, onSubmit }: CreatePackFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    country: '',
    pv: '',
    products: '',
    features: [''],
    currency: 'FCFA'
  });

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.price || !formData.country) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const validFeatures = formData.features.filter(feature => feature.trim() !== '');
    
    if (validFeatures.length === 0) {
      toast.error('Veuillez ajouter au moins une fonctionnalité');
      return;
    }

    const newPack = {
      name: formData.title,
      price: `${formData.price} ${formData.currency}`,
      pv: parseInt(formData.pv) || 100,
      products: parseInt(formData.products) || 10,
      features: validFeatures,
      popular: false,
      country: formData.country,
      description: formData.description,
      id: Date.now()
    };

    onSubmit(newPack);
    toast.success('Pack créé avec succès !');
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      price: '',
      country: '',
      pv: '',
      products: '',
      features: [''],
      currency: 'FCFA'
    });
    
    onClose();
  };

  const countries = [
    { code: 'senegal', name: 'Sénégal', flag: '🇸🇳' },
    { code: 'mali', name: 'Mali', flag: '🇲🇱' },
    { code: 'burkina', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: 'cote-ivoire', name: 'Côte d\'Ivoire', flag: '🇨🇮' },
    { code: 'guinea', name: 'Guinée', flag: '🇬🇳' },
    { code: 'cameroun', name: 'Cameroun', flag: '🇨🇲' }
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Créer un nouveau Pack d'adhésion
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Informations générales</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">Titre du Pack *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Pack Business Pro"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez les avantages de ce pack..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Pays *</Label>
              <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un pays" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tarification */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Tarification</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Prix *</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="150000"
                      className="pl-10"
                      required
                    />
                  </div>
                  <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FCFA">FCFA</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pv">Points de Volume (PV)</Label>
                <Input
                  id="pv"
                  type="number"
                  value={formData.pv}
                  onChange={(e) => setFormData({ ...formData, pv: e.target.value })}
                  placeholder="300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="products">Nombre de produits inclus</Label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="products"
                  type="number"
                  value={formData.products}
                  onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                  placeholder="30"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Fonctionnalités */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">Fonctionnalités incluses</h3>
              <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Ex: Formation avancée incluse"
                    className="flex-1"
                  />
                  {formData.features.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeFeature(index)}
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Aperçu */}
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <h3 className="font-medium text-lg">Aperçu</h3>
            <div className="space-y-2 text-sm">
              <div><strong>Titre:</strong> {formData.title || 'Titre du pack'}</div>
              <div><strong>Prix:</strong> {formData.price ? `${formData.price} ${formData.currency}` : 'Prix non défini'}</div>
              <div><strong>Pays:</strong> {formData.country ? countries.find(c => c.code === formData.country)?.name : 'Pays non défini'}</div>
              <div><strong>Fonctionnalités:</strong> {formData.features.filter(f => f.trim()).length} ajoutée(s)</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Créer le Pack
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePackForm;