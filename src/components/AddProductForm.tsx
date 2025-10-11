import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Package, Upload, X } from "lucide-react";
import axiosInstance from "@/services/axiosInstance";
import { useParams } from "react-router-dom";

interface AddProductFormProps {
  onProductAdded: (product: any) => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({
  onProductAdded,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const { shopId } = useParams<{ shopId: string }>();
  const [formData, setFormData] = useState({
    shop_id: shopId || "",
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    images: [] as File[],
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(e.target.files)],
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

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
        formDataToSend.append(`images[${index}]`, file);
      });

      await axiosInstance.get("/sanctum/csrf-cookie");
      const res = await axiosInstance.post("/api/products/create", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      onProductAdded(res.data.product || res.data);

      // Reset form
      setFormData({
        shop_id: formData.shop_id,
        title: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        images: [],
      });
      setOpen(false);

      // Recharger la page pour afficher le nouveau produit
      window.location.reload();
    } catch (error: any) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setGeneralError(
          error.response?.data?.message || "Une erreur est survenue. Vérifiez vos données."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un produit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Ajouter un nouveau produit
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Erreur générale */}
          {generalError && (
            <div className="text-red-700 bg-red-100 p-2 rounded mb-4">
              {generalError}
            </div>
          )}

          {/* Informations produit */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations du produit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Nom du produit *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title[0]}</p>
                )}
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description[0]}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Prix (FCFA) *</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    min={0}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="Entrez le prix en FCFA"
                    required
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price[0]}</p>
                  )}
                </div>

                <div>
                  <Label>Quantité *</Label>
                  <Input
                    type="number"
                    value={formData.quantity}
                    min={0}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    placeholder="Entrez une quantité"
                    required
                  />
                  {errors.quantity && (
                    <p className="text-red-500 text-sm">{errors.quantity[0]}</p>
                  )}
                </div>

                <div>
                  <Label>Catégorie *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-red-500 text-sm">{errors.category[0]}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Images du produit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg p-4 text-center"
                  >
                    <img
                      src={URL.createObjectURL(image)}
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
                ))}

                <label className="cursor-pointer border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Ajouter des images
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Affichage des erreurs pour toutes les images */}
              {Object.keys(errors)
                .filter((key) => key.startsWith("images"))
                .map((key) =>
                  errors[key].map((errMsg, i) => (
                    <p key={key + i} className="text-red-500 text-sm mt-1">
                      {errMsg}
                    </p>
                  ))
                )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="gradient-primary"
              disabled={loading}
            >
              {loading ? "Ajout en cours..." : "Ajouter le produit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
