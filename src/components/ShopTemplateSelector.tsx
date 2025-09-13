import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Sparkles, Check } from 'lucide-react';

interface ShopTemplateSelectorProps {
  onTemplateSelected: (template: any) => void;
}

export const ShopTemplateSelector: React.FC<ShopTemplateSelectorProps> = ({ onTemplateSelected }) => {
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [customization, setCustomization] = useState({
    title: '',
    description: '',
    buttonText: 'Visiter ma boutique'
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
        fontFamily: 'Inter'
      },
      defaultTitle: 'Bienvenue dans notre boutique',
      defaultDescription: 'Découvrez notre sélection de produits de qualité',
      category: 'Polyvalent'
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
        fontFamily: 'Playfair Display'
      },
      defaultTitle: 'Collection Exclusive',
      defaultDescription: 'L\'excellence à portée de main',
      category: 'Luxe'
    },
    {
      id: 'fresh-organic',
      name: 'Frais Bio',
      description: 'Parfait pour les produits naturels et bio',
      preview: '🌱',
      style: {
        primaryColor: 'hsl(142, 71%, 45%)',
        secondaryColor: 'hsl(84, 81%, 44%)',
        backgroundColor: 'hsl(138, 62%, 97%)',
        textColor: 'hsl(140, 100%, 9%)',
        fontFamily: 'Nunito'
      },
      defaultTitle: 'Produits 100% Naturels',
      defaultDescription: 'Pour votre bien-être au quotidien',
      category: 'Bio & Naturel'
    },
    {
      id: 'tech-modern',
      name: 'Tech Moderne',
      description: 'Idéal pour les produits technologiques et électroniques',
      preview: '💻',
      style: {
        primaryColor: 'hsl(200, 98%, 39%)',
        secondaryColor: 'hsl(271, 91%, 65%)',
        backgroundColor: 'hsl(217, 32%, 6%)',
        textColor: 'hsl(210, 40%, 98%)',
        fontFamily: 'Roboto'
      },
      defaultTitle: 'Innovation Tech',
      defaultDescription: 'La technologie de demain, aujourd\'hui',
      category: 'Technologie'
    },
    {
      id: 'fashion-trendy',
      name: 'Mode Tendance',
      description: 'Conçu pour les boutiques de mode et accessoires',
      preview: '👗',
      style: {
        primaryColor: 'hsl(330, 81%, 60%)',
        secondaryColor: 'hsl(291, 64%, 42%)',
        backgroundColor: 'hsl(320, 39%, 97%)',
        textColor: 'hsl(340, 82%, 7%)',
        fontFamily: 'Poppins'
      },
      defaultTitle: 'Style & Tendance',
      defaultDescription: 'Exprimez votre personnalité',
      category: 'Mode'
    },
    {
      id: 'artisan-craft',
      name: 'Artisan Créateur',
      description: 'Pour les créations artisanales et fait-main',
      preview: '🎭',
      style: {
        primaryColor: 'hsl(25, 95%, 53%)',
        secondaryColor: 'hsl(45, 93%, 58%)',
        backgroundColor: 'hsl(43, 74%, 97%)',
        textColor: 'hsl(20, 14%, 4%)',
        fontFamily: 'Merriweather'
      },
      defaultTitle: 'Créations Artisanales',
      defaultDescription: 'Chaque pièce raconte une histoire',
      category: 'Artisanat'
    }
  ];

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
    setCustomization({
      title: template.defaultTitle,
      description: template.defaultDescription,
      buttonText: 'Visiter ma boutique'
    });
  };

  const handleApplyTemplate = () => {
    if (!selectedTemplate) return;
    
    const finalTemplate = {
      ...selectedTemplate,
      customization
    };
    
    onTemplateSelected(finalTemplate);
    setOpen(false);
    setSelectedTemplate(null);
    setCustomization({
      title: '',
      description: '',
      buttonText: 'Visiter ma boutique'
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gradient-card border-primary/20">
          <Palette className="w-4 h-4 mr-2" />
          Choisir un template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Choisir un template pour votre boutique
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Template Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sélectionnez un style</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''
                  }`}
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
                        <p className="text-sm text-muted-foreground mt-1">
                          {template.description}
                        </p>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {template.category}
                      </Badge>
                      
                      {/* Preview colors */}
                      <div className="flex gap-2 mt-2">
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: template.style.primaryColor }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: template.style.secondaryColor }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border"
                          style={{ backgroundColor: template.style.backgroundColor }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Customization */}
          {selectedTemplate && (
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Personnalisez votre template</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customization Form */}
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="custom-title">Titre principal (H1)</Label>
                    <Input
                      id="custom-title"
                      value={customization.title}
                      onChange={(e) => setCustomization({
                        ...customization, 
                        title: e.target.value
                      })}
                      placeholder="Titre de votre boutique"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="custom-description">Description</Label>
                    <Textarea
                      id="custom-description"
                      value={customization.description}
                      onChange={(e) => setCustomization({
                        ...customization, 
                        description: e.target.value
                      })}
                      placeholder="Description de votre boutique"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="custom-button">Texte du bouton</Label>
                    <Input
                      id="custom-button"
                      value={customization.buttonText}
                      onChange={(e) => setCustomization({
                        ...customization, 
                        buttonText: e.target.value
                      })}
                      placeholder="Texte du bouton principal"
                    />
                  </div>
                </div>

                {/* Preview */}
                <Card className="p-6">
                  <div className="text-center space-y-4">
                    <div className="text-4xl mb-4">{selectedTemplate.preview}</div>
                    
                    <div 
                      style={{ 
                        color: selectedTemplate.style.textColor,
                        backgroundColor: selectedTemplate.style.backgroundColor,
                        fontFamily: selectedTemplate.style.fontFamily 
                      }}
                      className="p-4 rounded-lg"
                    >
                      <h1 className="text-2xl font-bold mb-2">
                        {customization.title || selectedTemplate.defaultTitle}
                      </h1>
                      
                      <p className="text-sm mb-4 opacity-80">
                        {customization.description || selectedTemplate.defaultDescription}
                      </p>
                      
                      <Button 
                        style={{ backgroundColor: selectedTemplate.style.primaryColor }}
                        className="text-white"
                      >
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
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button 
              onClick={handleApplyTemplate}
              disabled={!selectedTemplate}
              className="gradient-primary"
            >
              Appliquer ce template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};