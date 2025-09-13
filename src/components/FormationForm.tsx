import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Plus, Trash2, Play, BookOpen, Headphones, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Section {
  id: number;
  title: string;
  videoUrl?: string;
  resources?: string;
}

interface FormationFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

const FormationForm: React.FC<FormationFormProps> = ({ onSubmit, initialData }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    format: initialData?.format || '',
    price: initialData?.price || '',
    ebookUrl: initialData?.ebookUrl || '',
    sections: initialData?.sections || []
  });

  const [sections, setSections] = useState<Section[]>(
    initialData?.sectionsData || [{ id: 1, title: '', videoUrl: '', resources: '' }]
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSection = () => {
    const newSection: Section = {
      id: Date.now(),
      title: '',
      videoUrl: '',
      resources: ''
    };
    setSections(prev => [...prev, newSection]);
  };

  const removeSection = (id: number) => {
    if (sections.length > 1) {
      setSections(prev => prev.filter(section => section.id !== id));
    }
  };

  const updateSection = (id: number, field: keyof Section, value: string) => {
    setSections(prev => prev.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.format) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    if (formData.format === 'ebook' && !formData.ebookUrl) {
      toast({
        title: "Erreur",
        description: "Veuillez fournir le lien de l'e-book.",
        variant: "destructive"
      });
      return;
    }

    if ((formData.format === 'video' || formData.format === 'audio') && 
        sections.some(s => !s.title || !s.videoUrl)) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir toutes les sections avec titre et lien.",
        variant: "destructive"
      });
      return;
    }

    const submissionData = {
      ...formData,
      sections: sections.length,
      sectionsData: sections,
      duration: formData.format === 'ebook' ? 'Variable' : `${sections.length * 30}min`
    };

    onSubmit(submissionData);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      case 'ebook':
        return <BookOpen className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Informations de base</TabsTrigger>
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="preview">Aperçu</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la formation *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Marketing Digital pour MLM"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez votre formation..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="format">Format de la formation *</Label>
                  <Select
                    value={formData.format}
                    onValueChange={(value) => handleInputChange('format', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">
                        <div className="flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Vidéo
                        </div>
                      </SelectItem>
                      <SelectItem value="audio">
                        <div className="flex items-center gap-2">
                          <Headphones className="w-4 h-4" />
                          Audio
                        </div>
                      </SelectItem>
                      <SelectItem value="ebook">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          E-book
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Prix (FCFA)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="25000"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          {formData.format === 'ebook' ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Lien de l'E-book
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="ebookUrl">URL de l'e-book *</Label>
                  <Input
                    id="ebookUrl"
                    placeholder="https://example.com/mon-ebook.pdf"
                    value={formData.ebookUrl}
                    onChange={(e) => handleInputChange('ebookUrl', e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Fournissez le lien direct vers votre e-book (PDF, EPUB, etc.)
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getFormatIcon(formData.format)}
                  Sections de la formation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sections.map((section, index) => (
                  <Card key={section.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">Section {index + 1}</h4>
                        {sections.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeSection(section.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Titre de la section *</Label>
                          <Input
                            placeholder="Ex: Introduction au marketing digital"
                            value={section.title}
                            onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Lien Vimeo {formData.format === 'video' ? 'vidéo' : 'audio'} *</Label>
                          <Input
                            placeholder="https://vimeo.com/123456789"
                            value={section.videoUrl}
                            onChange={(e) => updateSection(section.id, 'videoUrl', e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Ressources (optionnel)</Label>
                          <Textarea
                            placeholder="Documents, liens utiles, exercices..."
                            value={section.resources}
                            onChange={(e) => updateSection(section.id, 'resources', e.target.value)}
                            rows={2}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSection}
                  className="w-full border-dashed border-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter une section
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aperçu de la formation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-4xl">
                  {formData.format === 'video' ? '🎥' : 
                   formData.format === 'audio' ? '🎵' : '📖'}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{formData.title || 'Titre de la formation'}</h3>
                  <p className="text-muted-foreground mt-1">
                    {formData.description || 'Description de la formation'}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getFormatIcon(formData.format)}
                      {formData.format || 'Format'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {formData.format === 'ebook' ? '1 document' : `${sections.length} sections`}
                    </span>
                    {formData.price && (
                      <span className="text-lg font-semibold text-primary">
                        {parseInt(formData.price).toLocaleString()} FCFA
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {formData.format !== 'ebook' && sections.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Contenu :</h4>
                  <div className="space-y-1">
                    {sections.map((section, index) => (
                      <div key={section.id} className="flex items-center gap-2 text-sm">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                          {index + 1}
                        </span>
                        <span>{section.title || `Section ${index + 1}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <Button type="submit" className="gradient-primary">
          Créer la formation
        </Button>
      </div>
    </form>
  );
};

export default FormationForm;