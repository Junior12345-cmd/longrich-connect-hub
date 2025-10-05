import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, MessageCircle } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axiosInstance from "@/services/axiosInstance";

const SingleProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [quantity, setQuantity] = useState(1);
  const [quantityInput, setQuantityInput] = useState("1");
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({});
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    neighborhood: "",
    address: "",
    geolocation: "",
  });
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const citiesByCountry: Record<string, string[]> = {
    Senegal: ["Dakar", "Thiès", "Saint-Louis"],
    Mali: ["Bamako", "Sikasso", "Kayes"],
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        await axiosInstance.get("/sanctum/csrf-cookie");
        const token = localStorage.getItem("auth_token");

        const res = await axiosInstance.get(`/api/products/show/${productId}`);
        setProduct(res.data);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (product) {
      const imgs: string[] = Array.isArray(product.images)
        ? product.images
        : JSON.parse(product.images || "[]");
      setMainImage(product.image || imgs[0] || "");
    }
  }, [product]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    setQuantityInput(quantity.toString());
  }, [quantity]);

  if (loading) return <div className="text-center py-12">Chargement du produit...</div>;
  if (!product) return <div className="text-center py-12">Produit non trouvé</div>;

  const handleQuantityChange = (value: number) => {
    const stock = product?.stock ?? 1;
    const newValue = Math.max(1, Math.min(stock, value));
    setQuantity(newValue);
  };

  const handleDeliveryChange = (field: string, value: string) => {
    setDeliveryDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleOrder = async () => {
    setSubmitLoading(true);
    setErrors({});
    try {
      const token = localStorage.getItem("auth_token");

      await axiosInstance.get("/sanctum/csrf-cookie");
      axiosInstance.defaults.withCredentials = true;

      const res = await axiosInstance.post("/api/commandes/create", {
        customer: {
          name: deliveryDetails.name,
          email: deliveryDetails.email,
          phone: deliveryDetails.phone,
          country: deliveryDetails.country,
          city: deliveryDetails.city,
          neighborhood: deliveryDetails.neighborhood,
          address: deliveryDetails.address,
          geolocation: deliveryDetails.geolocation,
        },
        product_id: product.id,
        amount: product.price * quantity,
        status: "pending",
      });

      console.log("Commande créée :", res.data);
      navigate(`/confirmation/${res.data.id}`);
    } catch (err: any) {
      if (err.response?.status === 422 && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error(err);
        setErrors({ general: ["Erreur lors de la création de la commande"] });
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  const productImages: string[] = product
    ? Array.isArray(product.images)
      ? product.images
      : JSON.parse(product.images || "[]")
    : [];

  return (
    <div className={`min-h-screen bg-background ${theme}`}>
      <nav className="container mx-auto px-4 py-4 text-sm text-muted-foreground">
        <Link to="/">Accueil</Link> &gt;{" "}
        <Link to="/boutiques">Boutiques</Link> &gt; {product.title}
      </nav>

      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Galerie */}
        <div className="md:w-2/3">
          <img
            src={mainImage}
            alt={`${product.title} main`}
            className="w-full h-full object-cover rounded-lg cursor-pointer border transition-opacity"
          />
          {productImages.length > 1 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {productImages.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer border transition-opacity"
                  onMouseEnter={() => setMainImage(img)}
                  onMouseLeave={() => setMainImage(product.image || productImages[0])}
                />
              ))}
            </div>
          )}
        </div>

        {/* Détails et formulaire */}
        <div className="md:w-2/3 space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-lg">{product.description}</p>
          
          {product.stock < 10 && <Badge variant="destructive">Stock bas ({product.stock})</Badge>}

          {product.variants?.map((variant: any) => (
            <div key={variant.id}>
              <Label>{variant.type}</Label>
              <Select
                onValueChange={(val) =>
                  setSelectedVariant((prev) => ({ ...prev, [variant.type]: val }))
                }
              >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder={variant.options[0]} />
                </SelectTrigger>
                <SelectContent>
                  {variant.options.map((opt: string) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          <div className="flex items-center gap-2 mt-4">
            <Label>Quantité</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <Input
                type="number"
                value={quantityInput}
                onChange={(e) => setQuantityInput(e.target.value)}
                onBlur={() => handleQuantityChange(parseInt(quantityInput, 10) || 1)}
                className="w-20 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= (product?.stock ?? 1)}
              >
                +
              </Button>
            </div>
            {errors.amount && <p className="text-red-500 text-sm">{errors.amount[0]}</p>}
          </div>

          {/* Formulaire livraison */}
          <div className="space-y-4">
            <Input
              placeholder="Nom complet"
              value={deliveryDetails.name}
              onChange={(e) => handleDeliveryChange("name", e.target.value)}
            />
            {errors["customer.name"] && <p className="text-red-500 text-sm">{errors["customer.name"][0]}</p>}

            <Input
              placeholder="Email (facultatif)"
              value={deliveryDetails.email}
              onChange={(e) => handleDeliveryChange("email", e.target.value)}
            />
            {errors["customer.email"] && <p className="text-red-500 text-sm">{errors["customer.email"][0]}</p>}

            <Input
              placeholder="Téléphone WhatsApp"
              value={deliveryDetails.phone}
              onChange={(e) => handleDeliveryChange("phone", e.target.value)}
            />
            {errors["customer.phone"] && <p className="text-red-500 text-sm">{errors["customer.phone"][0]}</p>}

            <Select onValueChange={(val) => handleDeliveryChange("country", val)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir un pays" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Senegal">Sénégal</SelectItem>
                <SelectItem value="Mali">Mali</SelectItem>
              </SelectContent>
            </Select>
            {errors["customer.country"] && <p className="text-red-500 text-sm">{errors["customer.country"][0]}</p>}

            <Select onValueChange={(val) => handleDeliveryChange("city", val)} disabled={!deliveryDetails.country}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir une ville" />
              </SelectTrigger>
              <SelectContent>
                {(citiesByCountry[deliveryDetails.country] || []).map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors["customer.city"] && <p className="text-red-500 text-sm">{errors["customer.city"][0]}</p>}

            <Input
              placeholder="Quartier"
              value={deliveryDetails.neighborhood}
              onChange={(e) => handleDeliveryChange("neighborhood", e.target.value)}
            />
            {errors["customer.neighborhood"] && <p className="text-red-500 text-sm">{errors["customer.neighborhood"][0]}</p>}

            <Input
              placeholder="Adresse détaillée"
              value={deliveryDetails.address}
              onChange={(e) => handleDeliveryChange("address", e.target.value)}
            />
            {errors["customer.address"] && <p className="text-red-500 text-sm">{errors["customer.address"][0]}</p>}
          </div>

          {errors.general && <p className="text-red-500">{errors.general[0]}</p>}

          <Button
            className="flex-1 gradient-primary"
            onClick={handleOrder}
            disabled={submitLoading}
          >
            <ShoppingCart className="mr-2" /> {submitLoading ? "Création..." : "Passer au paiement"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SingleProductPage;
