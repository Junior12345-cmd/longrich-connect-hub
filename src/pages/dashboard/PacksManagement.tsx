import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Package, DollarSign, MapPin, Edit, Trash2, Star } from 'lucide-react';
import CreatePackForm from '@/components/CreatePackForm';
import { toast } from 'sonner';
import axiosInstance from '@/services/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface Pack {
  id: number;
  title: string;
  price: string;
  status: string;
  products: number;
  features: string[];
  popular: boolean;
  country?: { id: number; code: string; title: string };
  description: string;
}

interface Country {
  id: number;
  code: string;
  title: string;
  flag: string;
}

const PacksManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [packs, setPacks] = useState<Pack[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fonction pour obtenir le drapeau selon le code pays
  const getFlagByCode = (code?: string) => {
    const flags: { [key: string]: string } = {
      senegal: '🇸🇳',
      mali: '🇲🇱',
      burkina: '🇧🇫',
      'cote-ivoire': '🇨🇮',
      guinea: '🇬🇳',
      cameroun: '🇨🇲',
    };
    return code ? flags[code] || '🌍' : '🌍';
  };

  // Récupération des packs
  useEffect(() => {
    const fetchPacks = async () => {
      try {
        await axiosInstance.get('/sanctum/csrf-cookie');
        const token = localStorage.getItem('auth_token');
        const res = await axiosInstance.get('/api/packs', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const packsData = Array.isArray(res.data.packs) ? res.data.packs : [];
        setPacks(packsData);
      } catch (error) {
        console.error("Erreur lors de la récupération des packs :", error);
        toast.error("Impossible de charger les packs");
      } finally {
        setLoading(false);
      }
    };

    fetchPacks();
  }, []);

  // Récupération des pays
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await axiosInstance.get('/api/countries', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const countriesWithFlags = res.data.map((c: any) => ({
          ...c,
          flag: getFlagByCode(c.code),
        }));

        setCountries(countriesWithFlags);
      } catch (error) {
        console.error("Erreur lors de la récupération des pays :", error);
      }
    };

    fetchCountries();
  }, []);

  // Filtrage des packs
  const filteredPacks = packs
    .filter(pack => pack && pack.title && pack.description)
    .filter(pack => {
      const matchesSearch =
        pack.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pack.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCountry =
        selectedCountry === 'all' || pack.country?.id === Number(selectedCountry);
      return matchesSearch && matchesCountry;
    });

  // Création d'un pack
  const handleCreatePack = async (newPack: any) => {
    try {
      await axiosInstance.get('/sanctum/csrf-cookie');
      const token = localStorage.getItem('auth_token');
      const res = await axiosInstance.post('/api/packs/create', newPack, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Pack ajouté avec succès !");
      setPacks([res.data.pack, ...packs]);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création du pack");
    }
  };

  // Suppression d'un pack via API
  const handleDeletePack = async (id: number) => {
    try {
      await axiosInstance.get('/sanctum/csrf-cookie');
      const token = localStorage.getItem('auth_token');

      await axiosInstance.post(`/api/packs/delete/${id}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Mise à jour du state après suppression
      setPacks(packs.filter(pack => pack.id !== id));
      toast.success('Pack supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du pack :', error);
      toast.error('Impossible de supprimer le pack');
    }
  };

  // State pour édition
  const [editingPack, setEditingPack] = useState<Pack | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);


  const handleOpenEdit = (pack: Pack) => {
    // Redirige vers la page d'édition avec l'ID du pack
    navigate(`/dash/packs/edit/${pack.id}`);
  };

  const handleUpdatePack = (updatedPack: Pack) => {
    setPacks(packs.map(p => p.id === updatedPack.id ? updatedPack : p));
  };

  // Changer le statut populaire
  const handleTogglePopular = (id: number) => {
    setPacks(
      packs.map(pack =>
        pack.id === id ? { ...pack, popular: !pack.popular } : pack
      )
    );
    toast.success('Statut du pack mis à jour');
  };

  const getCountryName = (id?: number) => countries.find(c => c.id === id)?.title || 'Inconnu';
  const getCountryFlag = (code?: string) => getFlagByCode(code);

  const stats = {
    total: packs.length,
    countries: new Set(packs.map(p => p.country?.id)).size,
    popular: packs.filter(p => p.popular).length,
    totalPV: packs.reduce((sum, pack) => sum + (pack.pv || 0), 0),
  };


  // Fonction pour activer/désactiver un pack
  const handleToggleActive = async (packId: number) => {
    try {
      const pack = packs.find(p => p.id === packId);
      if (!pack) return;

      const token = localStorage.getItem('auth_token');
      // Inverse la valeur de active
      const newStatus = pack.status === "actived" ? "inactive" : "actived";

      // Appel API pour mettre à jour le pack
      await axiosInstance.post(
        `/api/packs/change-status/${packId}`,
        { active: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Mise à jour locale
      setPacks(packs.map(p =>
        p.id === pack.id ? { ...p, status: newStatus } : p
      ));      

      toast.success(`Pack ${newStatus ? 'activé' : 'désactivé'} avec succès !`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du pack :', error);
      toast.error("Impossible de changer le statut du pack");
    }
  };



  return (
    <div className="space-y-6 container p-6 mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Packs d'Adhésion</h1>
          <p className="text-muted-foreground">
            Créez et gérez vos offres d'adhésion MLM
          </p>
        </div>
        <Button onClick={() => setIsCreateFormOpen(true)} className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un Pack
        </Button>
      </div>

      {loading ? (
        <p>Chargement des packs...</p>
      ) : (
        <>
          {/* Filtres */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher un pack..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrer par pays" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">🌍 Tous les pays</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country.id} value={String(country.id)}>
                    {country.flag} {country.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Liste des packs */}
          <div className="grid gap-6 mt-4">
            {filteredPacks.map(pack => (
              <Card key={pack.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{pack.title}</CardTitle>
                        {pack.popular && (
                          <Badge className="bg-yellow-500 text-white">
                            <Star className="w-3 h-3 mr-1" /> Populaire
                          </Badge>
                        )}
                        <Badge variant="outline">
                          {getCountryFlag(pack.country?.code)} {getCountryName(pack.country?.id)}
                        </Badge>
                      </div>
                      <CardDescription className="max-w-2xl">{pack.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleTogglePopular(pack.id)}>
                        <Star className={`w-4 h-4 ${pack.popular ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleOpenEdit(pack)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleActive(pack.id)}
                        className={pack.status === "actived" ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"}
                      >
                        {pack.status === "actived" ? "Désactiver" : "Activer"}
                      </Button>

                      <Button variant="outline" size="sm" onClick={() => handleDeletePack(pack.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="font-medium text-muted-foreground">Prix</div>
                        <div className="text-2xl font-bold text-primary">{pack.price}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPacks.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun pack trouvé</h3>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <CreatePackForm
        open={isCreateFormOpen}
        onClose={() => setIsCreateFormOpen(false)}
        onSubmit={handleCreatePack}
      />
    </div>
  );
};

export default PacksManagement;
