import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Calendar, Users, Play, Edit, Trash2, Video } from 'lucide-react';
import CreateLiveForm from '@/components/CreateLiveForm';
import { toast } from 'sonner';

interface Live {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  maxParticipants: number;
  currentParticipants: number;
  status: 'scheduled' | 'live' | 'ended';
  meetingLink: string;
  platform: 'zoom' | 'google-meet';
  instructor: string;
  category: string;
}

const LivesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [lives, setLives] = useState<Live[]>([
    {
      id: 1,
      title: "Formation MLM Avancée",
      description: "Techniques avancées de marketing relationnel et stratégies de croissance",
      date: "2024-01-15",
      time: "14:00",
      duration: 120,
      maxParticipants: 100,
      currentParticipants: 75,
      status: "scheduled",
      meetingLink: "https://meet.google.com/abc-def-ghi",
      platform: "google-meet",
      instructor: "Marie Diallo",
      category: "Formation"
    },
    {
      id: 2,
      title: "Webinaire Produits Bio",
      description: "Présentation des nouveaux produits biologiques et leurs avantages",
      date: "2024-01-12",
      time: "19:00",
      duration: 90,
      maxParticipants: 200,
      currentParticipants: 180,
      status: "live",
      meetingLink: "https://zoom.us/j/123456789",
      platform: "zoom",
      instructor: "Amadou Sy",
      category: "Produits"
    },
    {
      id: 3,
      title: "Stratégies de Vente",
      description: "Comment optimiser ses techniques de vente et fidéliser sa clientèle",
      date: "2024-01-10",
      time: "16:30",
      duration: 150,
      maxParticipants: 50,
      currentParticipants: 50,
      status: "ended",
      meetingLink: "https://meet.google.com/xyz-uvw-rst",
      platform: "google-meet",
      instructor: "Fatou Kane",
      category: "Business"
    }
  ]);

  const filteredLives = lives.filter(live =>
    live.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    live.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    live.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateLive = (newLive: any) => {
    const live: Live = {
      ...newLive,
      id: Date.now(),
      currentParticipants: 0,
      status: 'scheduled' as const
    };
    setLives([live, ...lives]);
  };

  const handleDeleteLive = (id: number) => {
    setLives(lives.filter(live => live.id !== id));
    toast.success('Live supprimé avec succès');
  };

  const getStatusColor = (status: Live['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'live': return 'bg-green-500';
      case 'ended': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: Live['status']) => {
    switch (status) {
      case 'scheduled': return 'Programmé';
      case 'live': return 'En direct';
      case 'ended': return 'Terminé';
      default: return status;
    }
  };

  const stats = {
    total: lives.length,
    scheduled: lives.filter(l => l.status === 'scheduled').length,
    live: lives.filter(l => l.status === 'live').length,
    ended: lives.filter(l => l.status === 'ended').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Lives</h1>
          <p className="text-muted-foreground">
            Organisez et gérez vos sessions en direct
          </p>
        </div>
        <Button onClick={() => setIsCreateFormOpen(true)} className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Créer un Live
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lives</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programmés</CardTitle>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.scheduled}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En direct</CardTitle>
            <Play className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.live}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminés</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.ended}</div>
          </CardContent>
        </Card>
      </div>

      {/* Barre de recherche */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher un live..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Liste des lives */}
      <div className="grid gap-4">
        {filteredLives.map((live) => (
          <Card key={live.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{live.title}</CardTitle>
                    <Badge className={`${getStatusColor(live.status)} text-white`}>
                      {getStatusText(live.status)}
                    </Badge>
                  </div>
                  <CardDescription className="max-w-2xl">
                    {live.description}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteLive(live.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-medium text-muted-foreground">Date & Heure</div>
                  <div>{new Date(live.date).toLocaleDateString('fr-FR')} à {live.time}</div>
                </div>
                <div>
                  <div className="font-medium text-muted-foreground">Durée</div>
                  <div>{live.duration} minutes</div>
                </div>
                <div>
                  <div className="font-medium text-muted-foreground">Participants</div>
                  <div>{live.currentParticipants}/{live.maxParticipants}</div>
                </div>
                <div>
                  <div className="font-medium text-muted-foreground">Formateur</div>
                  <div>{live.instructor}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{live.category}</Badge>
                  <Badge variant="outline">
                    {live.platform === 'zoom' ? 'Zoom' : 'Google Meet'}
                  </Badge>
                </div>
                {live.status === 'live' && (
                  <Button asChild className="gradient-primary">
                    <a href={live.meetingLink} target="_blank" rel="noopener noreferrer">
                      <Play className="w-4 h-4 mr-2" />
                      Rejoindre le Live
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLives.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucun live trouvé</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Aucun live ne correspond à votre recherche.' : 'Commencez par créer votre premier live.'}
            </p>
          </CardContent>
        </Card>
      )}

      <CreateLiveForm
        open={isCreateFormOpen}
        onClose={() => setIsCreateFormOpen(false)}
        onSubmit={handleCreateLive}
      />
    </div>
  );
};

export default LivesManagement;