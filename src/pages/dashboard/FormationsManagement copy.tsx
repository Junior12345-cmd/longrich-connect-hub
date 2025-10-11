import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Play, 
  BookOpen, 
  Headphones,
  Users,
  Clock,
  Search,
  Eye
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormationForm from '@/components/FormationForm';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const FormationsManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const [formations, setFormations] = useState([
    {
      id: 1,
      title: 'Marketing Digital MLM Avancé',
      format: 'video',
      duration: '4h 30min',
      sections: 12,
      students: 245,
      status: 'published',
      createdAt: '2024-01-15',
      price: 25000,
      thumbnail: '📈'
    },
    {
      id: 2,
      title: 'Leadership et Motivation',
      format: 'audio',
      duration: '2h 15min',
      sections: 8,
      students: 156,
      status: 'draft',
      createdAt: '2024-02-20',
      price: 18000,
      thumbnail: '👥'
    },
    {
      id: 3,
      title: 'Guide Complet du MLM',
      format: 'ebook',
      duration: '3h lecture',
      sections: 1,
      students: 89,
      status: 'published',
      createdAt: '2024-03-10',
      price: 12000,
      thumbnail: '📚'
    }
  ]);

  const filteredFormations = formations.filter(formation =>
    formation.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'video':
        return <Play className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      case 'ebook':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500';
      case 'draft':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleDelete = (id: number) => {
    setFormations(formations.filter(f => f.id !== id));
    toast({
      title: "Formation supprimée",
      description: "La formation a été supprimée avec succès.",
    });
  };

  const handleCreateFormation = (formationData: any) => {
    const newFormation = {
      id: formations.length + 1,
      ...formationData,
      students: 0,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      thumbnail: formationData.format === 'video' ? '🎥' : formationData.format === 'audio' ? '🎵' : '📖'
    };
    setFormations([...formations, newFormation]);
    setIsCreateDialogOpen(false);
    toast({
      title: "Formation créée",
      description: "La formation a été créée avec succès.",
    });
  };

  const handleViewFormation = (formation: any) => {
    if (formation.format === 'ebook') {
      // For ebook, just show a message or redirect to ebook viewer
      toast({
        title: "E-book disponible",
        description: "Redirection vers le lecteur d'e-book...",
      });
    } else {
      // For video/audio, navigate to player
      navigate(`/dash/formation-player/${formation.id}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text">
            Gestion des Formations
          </h1>
          <p className="text-muted-foreground">
            Créez, modifiez et gérez vos formations
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Créer une formation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle formation</DialogTitle>
            </DialogHeader>
            <FormationForm onSubmit={handleCreateFormation} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Rechercher une formation..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Formations</p>
                <p className="text-2xl font-bold">{formations.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Étudiants Total</p>
                <p className="text-2xl font-bold">{formations.reduce((sum, f) => sum + f.students, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Publiées</p>
                <p className="text-2xl font-bold">{formations.filter(f => f.status === 'published').length}</p>
              </div>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                ✓
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Brouillons</p>
                <p className="text-2xl font-bold">{formations.filter(f => f.status === 'draft').length}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                ⏳
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFormations.map((formation) => (
          <Card key={formation.id} className="gradient-card hover:shadow-lg shadow transition-smooth">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{formation.thumbnail}</span>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(formation.status)}`} />
                    </div>
                    <h3 className="font-semibold text-lg line-clamp-2">{formation.title}</h3>
                    <div className="flex items-center gap-2">
                      {getFormatIcon(formation.format)}
                      <Badge variant="outline" className="capitalize">
                        {formation.format}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{formation.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{formation.students} étudiants</span>
                    </div>
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="font-semibold text-primary">
                      {formation.price.toLocaleString()} FCFA
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Créée le {new Date(formation.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewFormation(formation)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Voir
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button size="sm" variant="outline" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer la formation</AlertDialogTitle>
                        <AlertDialogDescription>
                          Êtes-vous sûr de vouloir supprimer "{formation.title}" ? 
                          Cette action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(formation.id)}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFormations.length === 0 && (
        <Card className="text-center p-8">
          <CardContent>
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune formation trouvée</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Aucune formation ne correspond à votre recherche.' : 'Commencez par créer votre première formation.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FormationsManagement;