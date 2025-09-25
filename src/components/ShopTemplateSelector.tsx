import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Sparkles, Check } from 'lucide-react';
import axiosInstance from '@/services/axiosInstance';
import { toast } from 'sonner';

interface ShopTemplateSelectorProps {
  shopId: number;
  initialTemplate?: any; // le template existant de la boutique
  onTemplateSelected: (template: any, shopId: number) => void;
}

export const ShopTemplateSelector: React.FC<ShopTemplateSelectorProps> = ({
  shopId,
  initialTemplate,
  onTemplateSelected,
}) => {
  const isEditing = !!initialTemplate;

  const [open, setOpen] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState<any>(
    isEditing ? initialTemplate : null
  );

  // Correctement initialiser la personnalisation selon ce qui existe dans la base
  const [customization, setCustomization] = useState({
    title: initialTemplate?.customization?.title || initialTemplate?.title_principal_shop || '',
    description: initialTemplate?.customization?.description || initialTemplate?.text_description_shop || '',
    buttonText: initialTemplate?.customization?.buttonText || initialTemplate?.text_bouton_shop || 'Visiter ma boutique',
  });

  const templates = [
    {
      id: 'modern-minimal',
      name: 'Moderne Minimaliste',
      description: 'Design épuré et professionnel pour tous types de produits',
      preview: '🎨',
      style: {
        primaryColor: 'hsl(221, 83%, 53%)',
        secondaryColor: 'hsl(262, 83%, 58%)',
        backgroundColor: 'hsl(0, 0%, 98%)',
        textColor: 'hsl(224, 71%, 4%)',
        fontFamily: 'Inter',
      },
      defaultTitle: 'Bienvenue dans notre boutique',
      defaultDescription: 'Découvrez notre sélection de produits de qualité',
      category: 'Polyvalent',
    },
    {
      id: 'elegant-luxury',
      name: 'Élégant Luxe',
      description: 'Pour les boutiques haut de gamme et produits de luxe',
      preview: '✨',
      style: {
        primaryColor: 'hsl(45, 100%, 51%)',
        secondaryColor: 'hsl(24, 70%, 50%)',
        backgroundColor: 'hsl(240, 10%, 4%)',
        textColor: 'hsl(0, 0%, 98%)',
        fontFamily: 'Playfair Display',
      },
      defaultTitle: 'Collection Exclusive',
      defaultDescription: "L'excellence à portée de main",
      category: 'Luxe',
    },
  ];

  const handleSelectTemplate = (template: any) => {
    if (isEditing) return; // On ne change pas le template existant, juste la personnalisation
    setSelectedTemplate(template);
    setCustomization({
      title: template.defaultTitle,
      description: template.defaultDescription,
      buttonText: 'Visiter ma boutique',
    });
  };

  const handleApplyTemplate = async () => {
    if (!selectedTemplate && !isEditing) return;

    const dataToSend = isEditing
      ? {
          title_principal_shop: customization.title,
          text_description_shop: customization.description,
          text_bouton_shop: customization.buttonText,
        }
      : {
          ...selectedTemplate,
          customization,
        };

    try {
      const token = localStorage.getItem('auth_token');
      await axiosInstance.put(`/api/shops/${shopId}/update-template`, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Template appliqué avec succès !');
      setOpen(false);

      onTemplateSelected?.(
        {
          ...selectedTemplate,
          customization,
          title_principal_shop: customization.title,
          text_description_shop: customization.description,
          text_bouton_shop: customization.buttonText,
        },
        shopId
      );
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Erreur lors de l\'application du template');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gradient-card border-primary/20">
          <Palette className="w-4 h-4 mr-2" />
          {isEditing ? 'Modifier le template' : 'Choisir un template'}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {isEditing ? 'Modifier votre template' : 'Choisir un template pour votre boutique'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Templates (afficher seulement si pas de template existant) */}
          {!isEditing && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Sélectionnez un style</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleSelectTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl">{template.preview}</span>
                          {selectedTemplate?.id === template.id && (
                            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{template.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{template.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Formulaire de personnalisation */}
          {selectedTemplate && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Personnalisez votre template</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title_principal_shop">Titre principal (H1)</Label>
                    <Input
                      id="title_principal_shop"
                      value={customization.title}
                      onChange={(e) => setCustomization({ ...customization, title: e.target.value })}
                      placeholder="Titre de votre boutique"
                    />
                  </div>
                  <div>
                    <Label htmlFor="text_description_shop">Description</Label>
                    <Textarea
                      id="text_description_shop"
                      value={customization.description}
                      onChange={(e) => setCustomization({ ...customization, description: e.target.value })}
                      placeholder="Description de votre boutique"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="text_bouton_shop">Texte du bouton</Label>
                    <Input
                      id="text_bouton_shop"
                      value={customization.buttonText}
                      onChange={(e) => setCustomization({ ...customization, buttonText: e.target.value })}
                      placeholder="Texte du bouton principal"
                    />
                  </div>
                </div>

                {/* Preview */}
                <Card className="p-6">
                  <div className="text-center space-y-4">
                    <div className="text-4xl mb-4">{selectedTemplate.preview || '✨'}</div>
                    <div
                      style={{
                        color: selectedTemplate.style?.textColor || '#000',
                        backgroundColor: selectedTemplate.style?.backgroundColor || '#fff',
                        fontFamily: selectedTemplate.style?.fontFamily || 'sans-serif',
                      }}
                      className="p-4 rounded-lg"
                    >
                      <h1 className="text-2xl font-bold mb-2">{customization.title}</h1>
                      <p className="text-sm mb-4 opacity-80">{customization.description}</p>
                      <Button style={{ backgroundColor: selectedTemplate.style?.primaryColor || '#333' }} className="text-white">
                        {customization.buttonText}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
            <Button
              onClick={handleApplyTemplate}
              disabled={!selectedTemplate}
              className="gradient-primary"
            >
              {isEditing ? 'Modifier le template' : 'Appliquer ce template'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
