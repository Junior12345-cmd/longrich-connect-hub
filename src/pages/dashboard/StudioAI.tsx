import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wand2, 
  Image, 
  Video, 
  FileText, 
  Share2,
  Download,
  Play,
  Pause,
  RefreshCw,
  Sparkles,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';

const StudioAI = () => {
  const [activeTab, setActiveTab] = useState('video');
  const [isGenerating, setIsGenerating] = useState(false);

  const templates = {
    video: [
      { id: 1, name: 'Lancement Produit', description: 'Vidéo promotionnelle pour nouveau produit', duration: '30s' },
      { id: 2, name: 'Témoignage Client', description: 'Histoire de réussite avec avatar', duration: '45s' },
      { id: 3, name: 'Formation Express', description: 'Contenu éducatif animé', duration: '60s' }
    ],
    image: [
      { id: 1, name: 'Post Instagram', description: 'Format carré optimisé', size: '1080x1080' },
      { id: 2, name: 'Bannière Facebook', description: 'Couverture événement', size: '1200x630' },
      { id: 3, name: 'Story Mobile', description: 'Format vertical stories', size: '1080x1920' }
    ],
    text: [
      { id: 1, name: 'Post Social', description: 'Contenu engageant pour réseaux sociaux' },
      { id: 2, name: 'Fiche Produit', description: 'Description optimisée SEO' },
      { id: 3, name: 'Email Marketing', description: 'Newsletter et promotions' }
    ]
  };

  const recentCreations = [
    {
      id: 1,
      type: 'video',
      title: 'Promo Shampoing Superplex',
      thumbnail: '/api/placeholder/200/120',
      createdAt: '2h',
      status: 'ready'
    },
    {
      id: 2,
      type: 'image',
      title: 'Post Instagram - Nouvelle Collection',
      thumbnail: '/api/placeholder/200/120',
      createdAt: '4h',
      status: 'ready'
    },
    {
      id: 3,
      type: 'text',
      title: 'Fiche Produit - Café 3 en 1',
      createdAt: '1 jour',
      status: 'ready'
    }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
          Studio Marketing IA
        </h1>
        <p className="text-muted-foreground">
          Créez du contenu marketing professionnel avec l'intelligence artificielle
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Creation Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Assistant IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Vidéo Avatar
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Image Marketing
                  </TabsTrigger>
                  <TabsTrigger value="text" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Texte IA
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="video" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Modèle de vidéo
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {templates.video.map((template) => (
                          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-primary/50">
                            <CardContent className="p-4 text-center">
                              <Video className="w-8 h-8 mx-auto mb-2 text-primary" />
                              <h4 className="font-medium text-sm">{template.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                              <Badge variant="outline" className="mt-2 text-xs">
                                {template.duration}
                              </Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Script de la vidéo
                        </label>
                        <Textarea
                          placeholder="Décrivez votre message ou laissez l'IA générer le script..."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Avatar
                          </label>
                          <Input placeholder="Choisir un avatar..." />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Voix
                          </label>
                          <Input placeholder="Sélectionner une voix..." />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="image" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Type d'image
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {templates.image.map((template) => (
                          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-secondary/50">
                            <CardContent className="p-4 text-center">
                              <Image className="w-8 h-8 mx-auto mb-2 text-secondary" />
                              <h4 className="font-medium text-sm">{template.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                              <Badge variant="outline" className="mt-2 text-xs">
                                {template.size}
                              </Badge>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Description de l'image
                        </label>
                        <Textarea
                          placeholder="Décrivez l'image que vous souhaitez générer..."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Produit à inclure (optionnel)
                        </label>
                        <Input placeholder="Sélectionner un produit..." />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="text" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Type de contenu
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {templates.text.map((template) => (
                          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-accent/50">
                            <CardContent className="p-4 text-center">
                              <FileText className="w-8 h-8 mx-auto mb-2 text-accent" />
                              <h4 className="font-medium text-sm">{template.name}</h4>
                              <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Sujet ou contexte
                        </label>
                        <Textarea
                          placeholder="Décrivez le sujet, le ton souhaité, les points clés à inclure..."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Longueur
                          </label>
                          <Input placeholder="Court, Moyen, Long" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Ton
                          </label>
                          <Input placeholder="Professionnel, Amical, Persuasif" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <div className="pt-6 border-t border-border">
                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating}
                    className="w-full gradient-primary"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Génération en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Générer avec l'IA
                      </>
                    )}
                  </Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Recent Creations */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="text-lg">Créations récentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentCreations.map((creation) => (
                <div key={creation.id} className="space-y-2">
                  <div className="flex items-center gap-3">
                    {creation.type === 'video' && <Video className="w-4 h-4 text-primary" />}
                    {creation.type === 'image' && <Image className="w-4 h-4 text-secondary" />}
                    {creation.type === 'text' && <FileText className="w-4 h-4 text-accent" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{creation.title}</p>
                      <p className="text-xs text-muted-foreground">{creation.createdAt}</p>
                    </div>
                  </div>
                  {creation.thumbnail && (
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src={creation.thumbnail} 
                        alt={creation.title}
                        className="w-full h-20 object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Download className="w-3 h-3 mr-1" />
                      Télécharger
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Share2 className="w-3 h-3 mr-1" />
                      Partager
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Social Sharing */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="text-lg">Partage direct</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-3">
                <Instagram className="w-4 h-4" />
                Instagram
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Facebook className="w-4 h-4" />
                Facebook
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudioAI;