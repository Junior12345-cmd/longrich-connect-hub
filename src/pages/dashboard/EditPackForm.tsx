import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import axiosInstance from '@/services/axiosInstance';

const EditPackPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [pack, setPack] = useState<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    country_id: '',
    status: 'actived',
  });

  // Charger le pack
  useEffect(() => {
    const fetchPack = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const res = await axiosInstance.get(`/api/packs/show/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPack(res.data);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          price: res.data.price,
          country_id: res.data.country?.id || '',
          status: res.data.status || '',
        });
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger le pack");
      }
    };
    fetchPack();
  }, [id]);

  // Charger les pays
  useEffect(() => {
    const fetchCountries = async () => {
      const token = localStorage.getItem('auth_token');
      const res = await axiosInstance.get('/api/countries', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCountries(res.data);
    };
    fetchCountries();
  }, []);

  // Soumission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: any = {};
    if (!formData.title) newErrors.title = 'Titre requis';
    if (!formData.description) newErrors.description = 'Description requise';
    if (!formData.price) newErrors.price = 'Prix requis';
    if (!formData.country_id) newErrors.country_id = 'Pays requis';
    if (!formData.status) newErrors.status = 'Statut requis';
  
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
  
    try {
      const token = localStorage.getItem('auth_token');
      await axiosInstance.post(`/api/packs/update/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Pack mis à jour !");
      navigate('/dash/packs');
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du pack");
    }
  };



  if (!pack) return <p>Chargement...</p>;

  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Modifier le pack</h1>
      <Button type="button" variant="outline" onClick={() => navigate('/dash/packs')}>
            Annuler
          </Button>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Titre */}
        <div>
          <label className="block mb-1 font-medium">Titre</label>
          <Input
            placeholder="Titre du pack"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <Textarea
            placeholder="Description du pack"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Prix */}
        <div>
          <label className="block mb-1 font-medium">Prix</label>
          <Input
            placeholder="Prix du pack"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Pays */}
        <div>
          <label className="block mb-1 font-medium">Pays</label>
          <Select
            value={String(formData.country_id)}
            onValueChange={value => setFormData({ ...formData, country_id: Number(value) })}
            className={errors.country_id ? "border-red-500" : ""}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir un pays" />
            </SelectTrigger>
            <SelectContent>
              {countries.map(c => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country_id && <p className="text-red-500 text-sm mt-1">{errors.country_id}</p>}
        </div>
        <div>
        <label className="block mb-1 font-medium">Status</label>

          <Select
            value={formData.status}
            onValueChange={value => setFormData({ ...formData, status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir le status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="actived">Activé</SelectItem>
              <SelectItem value="desactived">Désactivé</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-red-600 text-sm">{errors.status}</p>}

        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/dash/packs')}>
            Liste des packs
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/dash/packs')}>
            Annuler
          </Button>
          <Button type="submit" className="gradient-primary">
            Modifier
          </Button>
        </div>

      </form>
    </div>
  );
};

export default EditPackPage;
