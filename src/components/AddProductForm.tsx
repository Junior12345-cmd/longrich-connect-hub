import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Package, Upload, X } from 'lucide-react';

interface AddProductFormProps {
  onProductAdded: (product: any) => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ onProductAdded }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    images: [] as string[]
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now().toString(),
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      createdAt: new Date().toISOString(),
      image: '📦' // Emoji par défaut
    };
    onProductAdded(newProduct);
    setOpen(false);
    setFormData({
      name: '',
      description: '',
      price: '',
      quantity: '',
      category: '',
      images: []
    });
  };

  const addImagePlaceholder = () => {
    setFormData({
      ...formData,
      images: [...formData.images, `Image ${formData.images.length + 1}`]
    });
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-secondary">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un produit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Ajouter un nouveau produit
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations du produit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="product-name">Nom du produit *</Label>
                <Input
                  id="product-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: iPhone 15 Pro, T-shirt coton..."
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="product-description">Description</Label>
                <Textarea
                  id="product-description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Décrivez votre produit, ses caractéristiques, avantages..."
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="product-price">Prix (FCFA) *</Label>
                  <Input
                    id="product-price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="15000"
                    min="0"
                    step="100"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="product-quantity">Quantité disponible *</Label>
                  <Input
                    id="product-quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder="50"
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="product-category">Catégorie *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Images du produit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative border-2 border-dashed border-border rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🖼️</div>
                    <p className="text-xs text-muted-foreground">{image}</p>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addImagePlaceholder}
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors"
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Ajouter une image
                  </p>
                </button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                Formats acceptés: PNG, JPG, WebP. Taille max: 2MB par image.
              </p>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" className="gradient-primary">
              Ajouter le produit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};