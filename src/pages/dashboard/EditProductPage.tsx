import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "@/services/axiosInstance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X } from "lucide-react";

export const EditProductPage: React.FC = () => {
  const { shopId, productId } = useParams<{ shopId: string; productId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    shop_id: shopId || "",
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: "",
    images: [] as (string | File)[],
  });

  const categories = [
    "Mode & Beauté",
    "Électronique",
    "Maison & Jardin",
    "Sports & Loisirs",
    "Alimentation",
    "Santé & Bien-être",
    "Automobile",
    "Autres",
  ];

  // Charger le produit existant
  useEffect(() => {
    const fetchProduct = async () => {
      try {

        await axiosInstance.get('/sanctum/csrf-cookie');
        const token = localStorage.getItem('auth_token');
        const res = await axiosInstance.get(`/api/products/show/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const product = res.data;
        const allImages = product.images && product.images.length > 0 ? product.images : product.image ? [product.image] : [];
        // console.log(allImages);
        setFormData({
          shop_id: product.shop_id,
          title: product.title,
          description: product.description,
          price: product.price,
          quantity: product.quantity,
          category: product.category,
          image: product.image || "",
          images: product.images || [],
        });
        

      } catch (err: any) {
        setGeneralError("Impossible de charger le produit.");
      }
    };

    fetchProduct();
  }, [productId]);

  // Gérer ajout d’images
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(e.target.files)],
      });
    }
  };

  // Supprimer une image (ancienne ou nouvelle)
  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  // Soumettre les modifications
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setGeneralError(null);

    try {
      const token = localStorage.getItem("auth_token");

      const formDataToSend = new FormData();
      formDataToSend.append("shop_id", formData.shop_id);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("category", formData.category);

      formData.images.forEach((file, index) => {
        if (file instanceof File) {
          formDataToSend.append(`images[${index}]`, file);
        } else {
          formDataToSend.append(`existing_images[${index}]`, file);
        }
      });

      await axiosInstance.get("/sanctum/csrf-cookie");
      await axiosInstance.post(`/api/products/${productId}/update`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate(`/shops/${shopId}/products`);
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setGeneralError("Une erreur est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Modifier le produit</h1>

      {generalError && <div className="text-red-600 mb-4">{generalError}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations du produit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Nom du produit *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {errors.title && <p className="text-red-500">{errors.title[0]}</p>}
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Prix</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div>
                <Label>Quantité</Label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>
              <div>
                <Label>Catégorie</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border rounded p-2"
                >
                  <option value="">Choisir</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images du produit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Affichage des images */}
              {Array.isArray(formData.images) && formData.images.length > 0 ? (
  formData.images.map((img, index) => (
    <div key={index} className="relative">
      <img
        src={img instanceof File ? URL.createObjectURL(img) : img}
        alt={`preview-${index}`}
        className="w-full h-24 object-cover rounded"
      />
      <button
        type="button"
        onClick={() => removeImage(index)}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  ))
) : (
  <span className="text-muted-foreground italic col-span-2">Aucune image disponible</span>
)}



              {/* Input pour ajouter de nouvelles images */}
              <label className="cursor-pointer border-2 border-dashed rounded-lg p-6 text-center hover:border-primary">
                <Upload className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Ajouter des images</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Annuler
          </Button>
          <Button type="submit" disabled={loading} className="gradient-primary">
            {loading ? "Mise à jour..." : "Enregistrer"}
          </Button>
        </div>
      </form>
    </div>
  );
};
