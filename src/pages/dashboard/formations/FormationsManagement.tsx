import React, { useState, useEffect } from 'react';
import axiosInstance from '@/services/axiosInstance';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, Edit2, Trash2, Play, BookOpen, Headphones,
  Users, Clock, Search, Eye, ToggleLeft, ToggleRight
} from 'lucide-react';
import FormationForm from '@/components/FormationForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const FormationsManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        await axiosInstance.get('/sanctum/csrf-cookie');
        const response = await axiosInstance.get('/api/formations');
        setFormations(response.data);
      } catch (error) {
        console.error(error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les formations.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFormations();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/formations/${id}`);
      setFormations(formations.filter(f => f.id !== id));
      toast({
        title: "Formation supprimée",
        description: "La formation a été supprimée avec succès.",
      });
    } catch {
      toast({
        title: "Erreur",
        description: "La suppression a échoué.",
        variant: "destructive",
      });
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await axiosInstance.patch(`/api/formations/${id}`, { status: newStatus });
      setFormations(formations.map(f =>
        f.id === id ? { ...f, status: newStatus } : f
      ));
      toast({
        title: `Formation ${newStatus === 'published' ? 'activée' : 'désactivée'}`,
        description: `La formation a été ${newStatus === 'published' ? 'activée' : 'désactivée'} avec succès.`,
      });
    } catch {
      toast({
        title: "Erreur",
        description: "La mise à jour du statut a échoué.",
        variant: "destructive",
      });
    }
  };

  const filteredFormations = formations.filter(f =>
    f.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFormatIcon = (format) => {
    switch (format) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'audio': return <Headphones className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Formations</h1>
          <p className="text-muted-foreground">Créez, modifiez et gérez vos formations</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary">
              <Plus className="w-4 h-4 mr-2" /> Créer une formation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle formation</DialogTitle>
            </DialogHeader>
            <FormationForm onSubmit={() => {}} />
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

      {/* Liste des formations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFormations.map((formation) => (
          <Card
            key={formation.id}
            className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md transform rotate-12 hover:rotate-0 hover:scale-110 transition-transform duration-300">
              50% OFF
            </div>
            <div className="overflow-hidden">
              <img
                src={formation.image ? `${import.meta.env.VITE_BACKEND_URL}/${formation.image}` : "https://via.placeholder.com/300x200?text=Formation"}
                alt={formation.title}
                className="w-full h-52 object-cover border-b-2 border-gray-100 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg line-clamp-2">{formation.title}</h3>
                <Badge variant="outline" className={`capitalize ${getStatusColor(formation.status)}`}>
                  {formation.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{formation.description || 'Description non disponible'}</p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">★</span>
                <span className="text-sm font-medium">{formation.rating || '4.5'}</span>
                <span className="text-sm text-muted-foreground">({formation.students || '10,000'} inscrits)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-green-600">{formation.promoPrice || '49,99 €'}</span>
                <span className="text-sm text-muted-foreground line-through">{formation.originalPrice || '69,99 €'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => navigate(`/formations/${formation.id}`)}>
                  <Eye className="w-4 h-4 mr-1" /> Voir
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate(`/dash/formations/edit/${formation.id}`)}>
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
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleStatus(formation.id, formation.status)}
                  className={formation.status === 'published' ? 'text-yellow-600' : 'text-green-600'}
                >
                  {formation.status === 'published' ? (
                    <ToggleLeft className="w-4 h-4 mr-1" />
                  ) : (
                    <ToggleRight className="w-4 h-4 mr-1" />
                  )}
                  {formation.status === 'published' ? 'Désactiver' : 'Activer'}
                </Button>
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
              {searchTerm ? 'Aucune formation ne correspond à votre recherche.' : 'Créez votre première formation.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FormationsManagement;