import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Headphones, BookOpen, Upload } from "lucide-react";
import axiosInstance from "@/services/axiosInstance";
import { useToast } from "@/hooks/use-toast";

const FormationForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    format: "",
    price: "",
    image: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.format) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("format", formData.format);
    data.append("price", formData.price || "0");
    if (formData.image) data.append("image", formData.image);

    try {
      setLoading(true);
      const token = localStorage.getItem("auth_token");
      const res = await axiosInstance.post("/api/formations/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(data);
      
      toast({
        title: "Succès",
        description: "Formation créée avec succès",
      });

      // Réinitialisation du formulaire
      setFormData({
        title: "",
        description: "",
        format: "",
        price: "",
        image: null,
      });

      setTimeout(() => {
        window.location.reload();

      }, 1000);    
    } catch (error) {
      console.error(error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Informations générales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Titre */}
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              placeholder="Ex: Marketing Digital pour Débutants"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Décrivez votre formation..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          {/* Format & Prix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="format">Format *</Label>
              <Select
                value={formData.format}
                onValueChange={(value) => handleInputChange("format", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">
                    <Play className="w-4 h-4 inline mr-1" /> Vidéo
                  </SelectItem>
                  <SelectItem value="audio">
                    <Headphones className="w-4 h-4 inline mr-1" /> Audio
                  </SelectItem>
                  <SelectItem value="ebook">
                    <BookOpen className="w-4 h-4 inline mr-1" /> E-book
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
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </div>
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label htmlFor="image">Image de couverture</Label>
            <div className="flex items-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {formData.image && (
                <span className="text-sm text-muted-foreground">
                  {formData.image.name}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button type="submit" className="gradient-primary" disabled={loading}>
          {loading ? "Création en cours..." : "Créer la formation"}
        </Button>
      </div>
    </form>
  );
};

export default FormationForm;
