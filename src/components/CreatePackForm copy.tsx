import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Plus, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import axiosInstance from '@/services/axiosInstance';

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
    country_id: '',
    pv: '',
    products: '',
    features: [''],
    currency: 'FCFA'
  });

  const [countries, setCountries] = useState<any[]>([]);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const res = await axiosInstance.get("/api/countries", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCountries(res.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des pays :", error);
      }
    };
    fetchCountries();
  }, []);

  const addFeature = () => setFormData({ ...formData, features: [...formData.features, ''] });
  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };
  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
  
    if (!formData.title) newErrors.title = "Titre requis";
    if (!formData.description) newErrors.description = "Description requise";
    if (!formData.price) newErrors.price = "Prix requis";
    if (!formData.country_id) newErrors.country_id = "Pays requis";
  
    const validFeatures = formData.features.filter(f => f.trim() !== '');
    if (validFeatures.length === 0) newErrors.features = "Au moins une fonctionnalité requise";
  
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
  
    try {
      await axiosInstance.get('/sanctum/csrf-cookie');
      const token = localStorage.getItem("auth_token");
  
      const payload = {
        title: formData.title,
        price: formData.price,
        products: parseInt(formData.products) || 10,
        features: validFeatures,
        popular: false,
        country_id: formData.country_id,
        description: formData.description,
      };
  
      const response = await axiosInstance.post("/api/packs/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      toast.success("Pack créé avec succès !");
      
      // Réinitialiser le formulaire
      setFormData({
        title: '',
        description: '',
        price: '',
        country_id: '',
        pv: '',
        products: '',
        features: [''],
        currency: 'FCFA'
      });
      setErrors({});
      onClose();
  
      // Si tu veux mettre à jour la liste des packs dans le parent
      if (onSubmit) onSubmit(response.data);
  
    } catch (error: any) {
      console.error("Erreur lors de la création du pack :", error);
      toast.error(error.response?.data?.message || "Erreur lors de la création du pack");
    }
  };
  

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
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Informations générales</h3>

            <div className="space-y-2">
              <Label htmlFor="title">Titre du Pack *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Pack Business Pro"
              />
              {errors.title && <p className="text-red-600 text-sm">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez les avantages de ce pack..."
                rows={3}
              />
              {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
            </div>

            <div className="space-y-2">
              <Label>Pays *</Label>
              <Select
                value={formData.country_id}
                onValueChange={(value: string) => setFormData({ ...formData, country_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un pays" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.id} value={String(country.id)}>
                      {country.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country_id && <p className="text-red-600 text-sm">{errors.country_id}</p>}
            </div>
          </div>

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
                {errors.price && <p className="text-red-600 text-sm">{errors.price}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">Fonctionnalités incluses</h3>
              <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                <Plus className="w-4 h-4 mr-2" /> Ajouter
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
                    <Button type="button" variant="outline" size="icon" onClick={() => removeFeature(index)}>
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              {errors.features && <p className="text-red-600 text-sm">{errors.features}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 gradient-primary">
              <Plus className="w-4 h-4 mr-2" /> Créer le Pack
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePackForm;
