import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '@/services/axiosInstance';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';

const FormationEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    format: 'text',
    status: 'draft',
    originalPrice: '',
    // promoPrice: ''
  });

  useEffect(() => {
    const fetchFormation = async () => {
      try {
        await axiosInstance.get('/sanctum/csrf-cookie');
        const response = await axiosInstance.get(`/api/formations/show/${id}`);
        const { title, description, format, status, price } = response.data;
        setFormData({
          title: title || '',
          description: description || '',
          format: format || 'text',
          status: status || 'draft',
          originalPrice: price || '',
        //   promoPrice: promoPrice || ''
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "Erreur",
          description: "Impossible de charger la formation.",
          variant: "destructive",
        });
        navigate('/formations');
      } finally {
        setLoading(false);
      }
    };

    fetchFormation();
  }, [id, navigate, toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      toast({
        title: "Erreur",
        description: "Le titre et la description sont requis.",
        variant: "destructive",
      });
      return;
    }

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('format', formData.format);
      form.append('status', formData.status);
      form.append('originalPrice', formData.originalPrice);
    //   form.append('promoPrice', formData.promoPrice);
      form.append('_method', 'POST');

      await axiosInstance.post(`/api/formations/update/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast({
        title: "Succès",
        description: "La formation a été mise à jour avec succès.",
      });
      navigate('-1');
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "La mise à jour de la formation a échoué.",
        variant: "destructive",
      });
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
    <div className="container-fluid mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Modifier la formation</h1>
          <p className="text-muted-foreground">Mettez à jour les détails de la formation</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour
        </Button>
      </div>

      <Card className="mx-auto rounded-xl shadow-md">
        <CardHeader>
          <CardTitle>Modifier "{formData.title}"</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Entrez le titre de la formation"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Entrez une description"
                rows={4}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select
                name="format"
                value={formData.format}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, format: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Texte</SelectItem>
                  <SelectItem value="video">Vidéo</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select
                name="status"
                value={formData.status}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="published">Publié</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Prix original (XOF)</Label>
              <Input
                id="originalPrice"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                placeholder="Ex: 70.000"
                type="text"
              />
            </div>
            <Button type="submit" className="w-full gradient-primary hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" /> Enregistrer les modifications
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormationEdit;