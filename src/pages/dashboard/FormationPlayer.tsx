import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Play, 
  Pause, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Circle,
  Star,
  Download,
  BookOpen,
  Clock,
  Award
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

const FormationPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState<{[key: number]: string}>({});
  const [rating, setRating] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock data - In real app, fetch from API
  const formation = {
    id: 1,
    title: 'Marketing Digital MLM Avancé',
    format: 'video',
    instructor: 'Sarah Johnson',
    duration: '4h 30min',
    sections: [
      {
        id: 1,
        title: 'Introduction au Marketing Digital',
        videoUrl: 'https://vimeo.com/123456789',
        duration: '25min',
        resources: 'Guide PDF des bases du marketing digital\nModèles de posts sociaux\nChecklist de démarrage'
      },
      {
        id: 2,
        title: 'Stratégies de Contenu Social Media',
        videoUrl: 'https://vimeo.com/987654321',
        duration: '35min',
        resources: 'Templates Instagram Stories\nCalendrier de publication\nBanque d\'images libres'
      },
      {
        id: 3,
        title: 'Automatisation et Outils',
        videoUrl: 'https://vimeo.com/456789123',
        duration: '40min',
        resources: 'Liste des meilleurs outils\nTutoriels de configuration\nScripts d\'automatisation'
      },
      {
        id: 4,
        title: 'Mesure et Optimisation',
        videoUrl: 'https://vimeo.com/789123456',
        duration: '30min',
        resources: 'Dashboard KPI template\nGuide Google Analytics\nRapport mensuel type'
      }
    ]
  };

  const currentSectionData = formation.sections[currentSection];
  const progress = (completedSections.size / formation.sections.length) * 100;
  const isCompleted = completedSections.size === formation.sections.length;

  const toggleSectionComplete = (sectionIndex: number) => {
    const newCompleted = new Set(completedSections);
    if (newCompleted.has(sectionIndex)) {
      newCompleted.delete(sectionIndex);
    } else {
      newCompleted.add(sectionIndex);
    }
    setCompletedSections(newCompleted);
    
    toast({
      title: newCompleted.has(sectionIndex) ? "Section terminée" : "Section marquée non terminée",
      description: `"${formation.sections[sectionIndex].title}" mise à jour.`,
    });
  };

  const saveNote = (sectionIndex: number) => {
    toast({
      title: "Note sauvegardée",
      description: "Votre note a été sauvegardée avec succès.",
    });
  };

  const submitRating = () => {
    if (rating === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une note avant de valider.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Évaluation enregistrée",
      description: `Merci pour votre note de ${rating}/5 étoiles !`,
    });
  };

  const downloadCertificate = () => {
    if (!isCompleted) {
      toast({
        title: "Formation incomplète",
        description: "Terminez toutes les sections pour télécharger votre certificat.",
        variant: "destructive"
      });
      return;
    }
    
    // Mock certificate download
    toast({
      title: "Certificat téléchargé",
      description: "Votre certificat de réussite a été téléchargé avec succès !",
    });
  };

  // Extract Vimeo video ID from URL
  const getVimeoEmbedUrl = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? `https://player.vimeo.com/video/${match[1]}` : url;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dash/formations-management')}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Retour
              </Button>
              <div>
                <h1 className="text-xl font-bold">{formation.title}</h1>
                <p className="text-sm text-muted-foreground">par {formation.instructor}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium">{Math.round(progress)}% terminé</div>
                <Progress value={progress} className="w-32" />
              </div>
              {isCompleted && (
                <Button onClick={downloadCertificate} className="gradient-primary">
                  <Download className="w-4 h-4 mr-2" />
                  Certificat
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Sections List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chapitres</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {formation.sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(index)}
                      className={`w-full p-3 text-left border-b last:border-0 transition-colors hover:bg-muted/50 ${
                        currentSection === index ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {completedSections.has(index) ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm leading-tight">{section.title}</div>
                          <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {section.duration}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="mt-4">
              <CardContent className="p-4 space-y-3">
                <Button
                  onClick={() => toggleSectionComplete(currentSection)}
                  className={`w-full ${
                    completedSections.has(currentSection)
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'gradient-primary'
                  }`}
                >
                  {completedSections.has(currentSection) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Section terminée
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4 mr-2" />
                      Marquer comme terminée
                    </>
                  )}
                </Button>

                {/* Rating & Certificate */}
                {isCompleted && (
                  <div className="space-y-3 pt-3 border-t">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Star className="w-4 h-4 mr-2" />
                          Noter la formation
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Évaluer la formation</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-4">
                              Comment évaluez-vous cette formation ?
                            </p>
                            <div className="flex justify-center gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => setRating(star)}
                                  className="p-1"
                                >
                                  <Star
                                    className={`w-8 h-8 ${
                                      star <= rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <Button onClick={submitRating} className="w-full gradient-primary">
                            Valider ma note
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Video Player */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    {currentSectionData.title}
                  </CardTitle>
                  <Badge variant="outline">{currentSectionData.duration}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={getVimeoEmbedUrl(currentSectionData.videoUrl)}
                    className="w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                
                {/* Navigation */}
                <div className="flex items-center justify-between mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                    disabled={currentSection === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Précédent
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentSection + 1} / {formation.sections.length}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentSection(Math.min(formation.sections.length - 1, currentSection + 1))}
                    disabled={currentSection === formation.sections.length - 1}
                  >
                    Suivant
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            {currentSectionData.resources && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Ressources de cette section
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <pre className="text-sm text-foreground whitespace-pre-wrap font-medium">
                      {currentSectionData.resources}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Mes notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Prenez des notes sur cette section..."
                  value={notes[currentSection] || ''}
                  onChange={(e) => setNotes(prev => ({
                    ...prev,
                    [currentSection]: e.target.value
                  }))}
                  rows={4}
                />
                <Button
                  onClick={() => saveNote(currentSection)}
                  variant="outline"
                  className="w-full"
                >
                  Sauvegarder mes notes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationPlayer;