import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, Video, Users, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';

interface CreateLiveFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const CreateLiveForm = ({ open, onClose, onSubmit }: CreateLiveFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: undefined as Date | undefined,
    time: '',
    duration: '',
    maxParticipants: '',
    price: '',
    category: '',
    level: '',
    meetingLink: '',
    platform: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.meetingLink || !formData.platform) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newLive = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      instructor: {
        name: 'Vous',
        title: 'Organisateur',
        avatar: '👤'
      },
      date: format(formData.date, 'yyyy-MM-dd'),
      time: formData.time,
      timezone: 'GMT',
      duration: formData.duration || '60 min',
      participants: 0,
      maxParticipants: parseInt(formData.maxParticipants) || 50,
      price: formData.price || 'GRATUIT',
      category: formData.category || 'Général',
      level: formData.level || 'Débutant',
      image: '🎥',
      status: 'upcoming',
      meetingLink: formData.meetingLink,
      platform: formData.platform,
      tags: [formData.price ? 'Premium' : 'Gratuit', 'Live']
    };

    onSubmit(newLive);
    toast.success('Live créé avec succès !');
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      date: undefined,
      time: '',
      duration: '',
      maxParticipants: '',
      price: '',
      category: '',
      level: '',
      meetingLink: '',
      platform: ''
    });
    
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            Créer un nouveau Live
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations de base */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Informations générales</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">Titre du Live *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Techniques de vente avancées"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Décrivez le contenu de votre live..."
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Catégorie</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vente">Vente</SelectItem>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Communication">Communication</SelectItem>
                    <SelectItem value="Général">Général</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Niveau</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Niveau de difficulté" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Débutant">Débutant</SelectItem>
                    <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                    <SelectItem value="Avancé">Avancé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Planification */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Planification</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date du Live *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? (
                        format(formData.date, "PPP", { locale: fr })
                      ) : (
                        <span>Choisir une date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData({ ...formData, date })}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Heure *</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Durée estimée</Label>
                <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Durée du live" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30 min">30 minutes</SelectItem>
                    <SelectItem value="60 min">1 heure</SelectItem>
                    <SelectItem value="90 min">1h30</SelectItem>
                    <SelectItem value="120 min">2 heures</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Participants max</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                    placeholder="50"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Plateforme de diffusion */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Plateforme de diffusion</h3>
            
            <div className="space-y-2">
              <Label>Plateforme *</Label>
              <Select value={formData.platform} onValueChange={(value) => setFormData({ ...formData, platform: value })} required>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir la plateforme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zoom">🔍 Zoom</SelectItem>
                  <SelectItem value="google-meet">📹 Google Meet</SelectItem>
                  <SelectItem value="teams">💼 Microsoft Teams</SelectItem>
                  <SelectItem value="youtube">📺 YouTube Live</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetingLink">Lien de la réunion *</Label>
              <Input
                id="meetingLink"
                type="url"
                value={formData.meetingLink}
                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                placeholder="https://zoom.us/j/... ou https://meet.google.com/..."
                required
              />
            </div>
          </div>

          {/* Tarification */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Tarification (optionnel)</h3>
            
            <div className="space-y-2">
              <Label htmlFor="price">Prix d'accès</Label>
              <Input
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Ex: 5,000 FCFA (laisser vide pour gratuit)"
              />
              <p className="text-xs text-muted-foreground">
                Laissez vide pour un live gratuit
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" className="flex-1 gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Créer le Live
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLiveForm;