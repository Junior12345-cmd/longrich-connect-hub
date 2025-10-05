// Type declaration for FedaPay to resolve TypeScript error
interface FedaPay {
  init: (config: {
    public_key: string;
    onSuccess?: (transaction: { id: string }) => void;
    onCancel?: () => void;
    onError?: (error: { message: string }) => void;
  }) => { open: () => void };
}

declare global {
  interface Window {
    FedaPay: FedaPay;
  }
}

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ShoppingCart, CheckCircle, Menu, X, RefreshCw } from "lucide-react";
import axiosInstance from "@/services/axiosInstance";

const SingleProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [quantity, setQuantity] = useState(1);
  const [quantityInput, setQuantityInput] = useState("1");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fedapayLoaded, setFedapayLoaded] = useState(false);
  const [fedapayError, setFedapayError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    adresse: "",
    pays: "",
    ville: "",
  });
  const [validFields, setValidFields] = useState<{ [key: string]: boolean }>({});
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const widgetRef = useRef<{ open: () => void } | null>(null);
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  // Fictitious product data (fallback)
  const fallbackProduct = {
    id: productId,
    title: "Formation Premium en Monétisation",
    description:
      "Maîtrisez les stratégies avancées pour monétiser votre chaîne YouTube et générer des revenus passifs. Ce cours complet couvre le SEO, la création de contenu engageant et les techniques de marketing numérique.",
    price: 150000,
    promotionalPrice: 99000,
    quantity: 50,
    images: [
      "https://via.placeholder.com/600x400?text=Formation+Image+1",
      "https://via.placeholder.com/600x400?text=Formation+Image+2",
      "https://via.placeholder.com/600x400?text=Formation+Image+3",
    ],
    image: "https://via.placeholder.com/600x400?text=Formation+Image+1",
    shop: {
      title: "MonBoutique",
      logo: "https://via.placeholder.com/40x40?text=Logo",
      adresse: "123 Rue Commerce, Dakar, Sénégal",
    },
  };

  const citiesByCountry: { [key: string]: string[] } = {
    Senegal: ["Dakar", "Thiès", "Saint-Louis"],
    Mali: ["Bamako", "Sikasso", "Kayes"],
  };

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        await axiosInstance.get("/sanctum/csrf-cookie");
        const token = localStorage.getItem("auth_token");
        const res = await axiosInstance.get(`/api/products/show/${productId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (typeof res.data.images === "string") {
          try {
            res.data.images = JSON.parse(res.data.images);
          } catch (e) {
            console.error("Error parsing images:", e);
            res.data.images = [];
          }
        }
        setProduct(res.data);
        setMainImage(res.data.image || res.data.images?.[0] || fallbackProduct.image);
      } catch (err) {
        console.error("Erreur lors du chargement du produit:", err);
        setProduct(fallbackProduct);
        setMainImage(fallbackProduct.image);
        setError("Impossible de charger le produit. Affichage des données par défaut.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  // Validate public key format
  const validatePublicKey = (key: string) => {
    return /^pk_(test|live|sandbox)_[a-zA-Z0-9-]+$/.test(key);
  };

  // Load FedaPay Checkout.js script with retry
  const loadFedaPayScript = () => {
    // Safely access environment variable with fallback
    const publicKey =
      typeof process !== "undefined" && process.env.REACT_APP_FEDAPAY_PUBLIC_KEY
        ? process.env.REACT_APP_FEDAPAY_PUBLIC_KEY
        : "pk_sandbox_Lr9b5YgP-r7Ckq3uNGzAb9Zm";

    console.log("Using FedaPay public key:", publicKey.substring(0, 12) + "...");

    if (typeof process === "undefined" || !process.env.REACT_APP_FEDAPAY_PUBLIC_KEY) {
      console.warn(
        "Environment variable REACT_APP_FEDAPAY_PUBLIC_KEY is not set or process is undefined. Using fallback key. Please configure .env file."
      );
    }

    if (!validatePublicKey(publicKey)) {
      console.error("Invalid FedaPay public key format:", publicKey);
      setFedapayError("Clé API FedaPay invalide. Vérifiez votre clé dans le tableau de bord FedaPay ou contactez le support.");
      setSubmitLoading(false);
      return () => {};
    }

    const script = document.createElement("script");
    script.src = "https://cdn.fedapay.com/checkout.js?v=1.1.7";
    script.async = true;
    script.onload = () => {
      console.log("FedaPay script loaded successfully");
      setFedapayLoaded(true);
      setFedapayError(null);
      if (window.FedaPay) {
        try {
          // widgetRef.current = window.FedaPay.init({
          //   public_key: publicKey,
          //   onSuccess: (transaction: { id: string }) => {
          //     console.log("FedaPay payment successful:", transaction);
          //     setSubmitLoading(false);
          //     navigate(`/confirmation/${transaction.id}`, {
          //       state: {
          //         status: "success",
          //         transactionId: transaction.id,
          //         amount: (product?.promotionalPrice || product?.price || fallbackProduct.price) * quantity,
          //         productTitle: product?.title || fallbackProduct.title,
          //         quantity,
          //       },
          //     });
          //   },
          //   onCancel: () => {
          //     console.log("FedaPay payment cancelled");
          //     setSubmitLoading(false);
          //     navigate(`/confirmation/cancelled`, {
          //       state: {
          //         status: "cancelled",
          //         message: "Paiement annulé par l'utilisateur.",
          //       },
          //     });
          //   },
          //   onError: (error: { message: string }) => {
          //     console.error("FedaPay payment error:", error);
          //     setSubmitLoading(false);
          //     navigate(`/confirmation/error`, {
          //       state: {
          //         status: "error",
          //         message: `Erreur lors du paiement: ${error.message}`,
          //       },
          //     });
          //   },
          // });
          
          widgetRef.current = window.FedaPay.init({
            public_key: publicKey,
            mode: "popup", // 👈 ou "inline"
            onSuccess: (transaction: { id: string }) => {
              console.log("Paiement réussi:", transaction);
              setSubmitLoading(false);
              navigate(`/confirmation/${transaction.id}`, {
                state: {
                  status: "success",
                  transactionId: transaction.id,
                  amount: (product?.promotionalPrice || product?.price || fallbackProduct.price) * quantity,
                  productTitle: product?.title || fallbackProduct.title,
                  quantity,
                },
              });
            },
            onCancel: () => {
              console.log("Paiement annulé");
              setSubmitLoading(false);
              navigate(`/confirmation/cancelled`, {
                state: { status: "cancelled", message: "Paiement annulé par l'utilisateur." },
              });
            },
            onError: (error: { message: string }) => {
              console.error("Erreur paiement:", error);
              setSubmitLoading(false);
              navigate(`/confirmation/error`, {
                state: { status: "error", message: `Erreur lors du paiement: ${error.message}` },
              });
            },
          });
          
          console.log("FedaPay widget initialized:", widgetRef.current);
        } catch (err: any) {
          console.error("FedaPay initialization error:", {
            message: err.message,
            stack: err.stack,
            publicKey: publicKey.substring(0, 12) + "...",
          });
          setFedapayError("Erreur lors de l'initialisation du paiement. Vérifiez votre clé API ou contactez le support FedaPay.");
          setSubmitLoading(false);
        }
      } else {
        console.error("FedaPay object not available after script load");
        setFedapayError("Objet FedaPay non disponible. Veuillez réessayer ou vérifier votre connexion.");
        setSubmitLoading(false);
      }
    };
    script.onerror = () => {
      console.error(`Failed to load FedaPay script (Attempt ${retryCountRef.current + 1}/${maxRetries})`);
      if (retryCountRef.current < maxRetries) {
        retryCountRef.current += 1;
        setTimeout(() => {
          console.log(`Retrying FedaPay script load (Attempt ${retryCountRef.current + 1})`);
          document.body.removeChild(script);
          loadFedaPayScript();
        }, 2000);
      } else {
        console.error("Max retries reached for loading FedaPay script");
        setFedapayError("Impossible de charger le script de paiement après plusieurs tentatives. Vérifiez votre connexion réseau ou contactez le support FedaPay.");
        setSubmitLoading(false);
      }
    };
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  };

  useEffect(() => {
    retryCountRef.current = 0;
    return loadFedaPayScript();
  }, [navigate, product, quantity]);

  // Calculate promotion end date and time (3 days from now)
  const promotionEndDate = new Date();
  promotionEndDate.setDate(promotionEndDate.getDate() + 3);
  const formattedEndDate = promotionEndDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Countdown timer for promotion
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = promotionEndDate - now;
      if (diff <= 0) {
        setTimeLeft("Offre expirée");
        clearInterval(timer);
        return;
      }
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    setQuantityInput(quantity.toString());
  }, [quantity]);

  const handleQuantityChange = (value: number) => {
    const stock = product?.quantity ?? fallbackProduct.quantity;
    const parsedValue = parseInt(value.toString(), 10);
    const newValue = isNaN(parsedValue) ? 1 : Math.max(1, Math.min(stock, parsedValue));
    setQuantity(newValue);
    setQuantityInput(newValue.toString());
  };

  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*$/.test(value)) {
      setQuantityInput(value);
    }
  };

  const handleDeliveryChange = (field: string, value: string) => {
    setDeliveryDetails((prev) => ({ ...prev, [field]: value }));
    // Real-time validation
    if (field === "nom" || field === "prenom") {
      setValidFields((prev) => ({
        ...prev,
        [field]: value.length > 1,
      }));
    } else if (field === "phone") {
      setValidFields((prev) => ({
        ...prev,
        phone: /^\+?\d{9,}$/.test(value),
      }));
    } else if (field === "adresse") {
      setValidFields((prev) => ({
        ...prev,
        adresse: value.length > 5,
      }));
    } else if (field === "pays" || field === "ville") {
      setValidFields((prev) => ({
        ...prev,
        [field]: !!value,
      }));
    }
  };

  const handleFedaPayCheckout = () => {
    // Client-side validation
    const newErrors: { [key: string]: string[] } = {};
    if (!deliveryDetails.nom) newErrors["customer.name"] = ["Le nom est requis"];
    if (!deliveryDetails.prenom) newErrors["customer.name"] = ["Le prénom est requis"];
    if (!deliveryDetails.phone) newErrors["customer.phone"] = ["Le numéro de téléphone est requis"];
    else if (!/^\+?\d{9,}$/.test(deliveryDetails.phone))
      newErrors["customer.phone"] = ["Numéro de téléphone invalide"];
    if (!deliveryDetails.pays) newErrors["customer.country"] = ["Le pays est requis"];
    if (!deliveryDetails.ville) newErrors["customer.city"] = ["La ville est requise"];
    if (!deliveryDetails.adresse) newErrors["customer.address"] = ["L'adresse est requise"];

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitLoading(false);
      console.log("Validation errors:", newErrors);
      return;
    }

    if (!fedapayLoaded || !window.FedaPay || !widgetRef.current) {
      setErrors({ general: [fedapayError || "Le script de paiement n'est pas encore chargé. Veuillez réessayer ou vérifier votre connexion."] });
      setSubmitLoading(false);
      console.log("FedaPay script or widget not ready");
      return;
    }

    setSubmitLoading(true);
    try {
      setTimeout(() => {
        if (widgetRef.current) {
          widgetRef.current.open();
          console.log("FedaPay widget opened");
        } else {
          throw new Error("Widget not initialized");
        }
      }, 100);
    } catch (err: any) {
      console.error("FedaPay widget open error:", {
        message: err.message,
        stack: err.stack,
      });
      setSubmitLoading(false);
      navigate(`/confirmation/error`, {
        state: {
          status: "error",
          message: "Erreur lors de l'ouverture du widget de paiement. Veuillez réessayer.",
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-teal-500 mx-auto" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          <p className="mt-4 text-lg text-gray-600">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <p className="text-xl text-red-500">{error || "Produit non trouvé"}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
            aria-label="Réessayer le chargement"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  // Check for auth token
  const isAuthenticated = !!localStorage.getItem("auth_token");

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-50 to-white ${theme} font-sans`}>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-20 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" aria-label="Retour à l'accueil">
            <img
              src={product.shop?.logo || fallbackProduct.shop.logo}
              alt={product.shop?.title || fallbackProduct.shop.title}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-xl font-bold text-gray-900">{product.shop?.title || fallbackProduct.shop.title}</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-teal-500 hover:underline underline-offset-4 transition-colors"
            >
              Accueil
            </Link>
            <Link
              to="/boutiques"
              className="text-gray-600 hover:text-teal-500 hover:underline underline-offset-4 transition-colors"
            >
              Boutiques
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-teal-500 hover:underline underline-offset-4 transition-colors"
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-teal-500 hover:underline underline-offset-4 transition-colors"
            >
              Contact
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-teal-500 hover:underline underline-offset-4 transition-colors"
              >
                Dashboard
              </Link>
            )}
          </div>
          <div className="hidden md:block text-sm text-gray-500">
            {product.shop?.adresse || fallbackProduct.shop.adresse}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md py-4 animate-slide-in">
            <div className="container mx-auto px-4 flex flex-col gap-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-teal-500"
                onClick={() => setMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                to="/boutiques"
                className="text-gray-600 hover:text-teal-500"
                onClick={() => setMenuOpen(false)}
              >
                Boutiques
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-teal-500"
                onClick={() => setMenuOpen(false)}
              >
                À propos
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-teal-500"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-teal-500"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="container mx-auto px-4 py-12 max-w-7xl flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 animate-fade-in">
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <img
              src={mainImage || product.image || fallbackProduct.image}
              alt={`${product.title} main`}
              className="w-full h-[500px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          {Array.isArray(product.images) && product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {product.images.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === img ? "border-teal-500" : "border-gray-300"} hover:border-teal-500 transition-all duration-200`}
                  onClick={() => setMainImage(img)}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 md:sticky md:top-24 space-y-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{product.title}</h2>
            <p className="text-lg text-gray-600 mt-3 leading-relaxed">{product.description}</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-2xl font-bold text-teal-600">
                {((product.promotionalPrice || product.price) * quantity).toFixed(2)} XOF
              </span>
              {product.promotionalPrice && product.price && (
                <span className="text-lg text-gray-500 line-through">
                  {(product.price * quantity).toFixed(2)} XOF
                </span>
              )}
            </div>
            {product.promotionalPrice && (
              <div className="mt-2 flex items-center gap-2">
                <p className="text-sm text-red-500">
                  Offre valable jusqu'au {formattedEndDate} ({timeLeft})
                </p>
              </div>
            )}
            <div className="mt-4 flex items-center gap-2">
              <Label className="text-sm font-medium">Quantité</Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="rounded-lg"
                  aria-label="Diminuer la quantité"
                >
                  -
                </Button>
                <Input
                  type="text"
                  value={quantityInput}
                  onChange={handleQuantityInputChange}
                  onBlur={() => handleQuantityChange(parseInt(quantityInput, 10) || 1)}
                  className="w-16 text-center rounded-lg"
                  aria-label="Quantité"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= (product?.quantity ?? fallbackProduct.quantity)}
                  className="rounded-lg"
                  aria-label="Augmenter la quantité"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4 animate-fade-in">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold text-gray-800">Étape 1: Informations de livraison</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Label className="text-sm font-medium">Nom</Label>
                <Input
                  placeholder="Entrez votre nom"
                  value={deliveryDetails.nom}
                  onChange={(e) => handleDeliveryChange("nom", e.target.value)}
                  className={`mt-1 rounded-lg border ${errors["customer.name"] ? "border-red-500" : validFields.nom ? "border-teal-500" : "border-gray-300"}`}
                  aria-label="Nom"
                  aria-required="true"
                />
                {validFields.nom && (
                  <CheckCircle className="absolute right-3 top-10 text-teal-500 h-5 w-5" />
                )}
                {errors["customer.name"] && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors["customer.name"][0]}
                  </p>
                )}
              </div>
              <div className="relative">
                <Label className="text-sm font-medium">Prénom</Label>
                <Input
                  placeholder="Entrez votre prénom"
                  value={deliveryDetails.prenom}
                  onChange={(e) => handleDeliveryChange("prenom", e.target.value)}
                  className={`mt-1 rounded-lg border ${errors["customer.name"] ? "border-red-500" : validFields.prenom ? "border-teal-500" : "border-gray-300"}`}
                  aria-label="Prénom"
                  aria-required="true"
                />
                {validFields.prenom && (
                  <CheckCircle className="absolute right-3 top-10 text-teal-500 h-5 w-5" />
                )}
              </div>
            </div>
            <div className="relative">
              <Label className="text-sm font-medium">Email (facultatif)</Label>
              <Input
                placeholder="Entrez votre email"
                value={deliveryDetails.email}
                onChange={(e) => handleDeliveryChange("email", e.target.value)}
                className={`mt-1 rounded-lg border ${errors["customer.email"] ? "border-red-500" : "border-gray-300"}`}
                aria-label="Email"
              />
              {errors["customer.email"] && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors["customer.email"][0]}
                </p>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium">Téléphone WhatsApp</Label>
              <Input
                placeholder="Entrez votre numéro WhatsApp"
                value={deliveryDetails.phone}
                onChange={(e) => handleDeliveryChange("phone", e.target.value)}
                className={`mt-1 rounded-lg border ${errors["customer.phone"] ? "border-red-500" : validFields.phone ? "border-teal-500" : "border-gray-300"}`}
                aria-label="Téléphone WhatsApp"
                aria-required="true"
              />
              {validFields.phone && (
                <CheckCircle className="absolute right-3 top-10 text-teal-500 h-5 w-5" />
              )}
              {errors["customer.phone"] && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors["customer.phone"][0]}
                </p>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium">Pays</Label>
              <Select onValueChange={(val: string) => handleDeliveryChange("pays", val)}>
                <SelectTrigger className={`mt-1 rounded-lg ${errors["customer.country"] ? "border-red-500" : validFields.pays ? "border-teal-500" : "border-gray-300"}`}>
                  <SelectValue placeholder="Choisir un pays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Senegal">Sénégal</SelectItem>
                  <SelectItem value="Mali">Mali</SelectItem>
                </SelectContent>
              </Select>
              {validFields.pays && (
                <CheckCircle className="absolute right-3 top-10 text-teal-500 h-5 w-5" />
              )}
              {errors["customer.country"] && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors["customer.country"][0]}
                </p>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium">Ville</Label>
              <Select
                onValueChange={(val: string) => handleDeliveryChange("ville", val)}
                disabled={!deliveryDetails.pays}
              >
                <SelectTrigger className={`mt-1 rounded-lg ${errors["customer.city"] ? "border-red-500" : validFields.ville ? "border-teal-500" : "border-gray-300"}`}>
                  <SelectValue placeholder="Choisir une ville" />
                </SelectTrigger>
                <SelectContent>
                  {(citiesByCountry[deliveryDetails.pays] || []).map((city: string) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {validFields.ville && (
                <CheckCircle className="absolute right-3 top-10 text-teal-500 h-5 w-5" />
              )}
              {errors["customer.city"] && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors["customer.city"][0]}
                </p>
              )}
            </div>
            <div className="relative">
              <Label className="text-sm font-medium">Adresse de livraison</Label>
              <Input
                placeholder="Entrez votre adresse complète"
                value={deliveryDetails.adresse}
                onChange={(e) => handleDeliveryChange("adresse", e.target.value)}
                className={`mt-1 rounded-lg border ${errors["customer.address"] ? "border-red-500" : validFields.adresse ? "border-teal-500" : "border-gray-300"}`}
                aria-label="Adresse de livraison"
                aria-required="true"
              />
              {validFields.adresse && (
                <CheckCircle className="absolute right-3 top-10 text-teal-500 h-5 w-5" />
              )}
              {errors["customer.address"] && (
                <p className="text-red-500 text-sm mt-1" role="alert">
                  {errors["customer.address"][0]}
                </p>
              )}
            </div>
            {errors.general && (
              <p className="text-red-500 text-sm" role="alert">
                {errors.general[0]}
              </p>
            )}
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="h-5 w-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-2.761 0-5 2.239-5 5h10c0-2.761-2.239-5-5-5z" />
                </svg>
                Paiement sécurisé
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="h-5 w-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Livraison rapide
              </div>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg py-3 rounded-lg"
              onClick={handleFedaPayCheckout}
              disabled={submitLoading}
              data-transaction-amount={(product?.promotionalPrice || product?.price || fallbackProduct.price) * quantity}
              data-transaction-description={`Achat de ${product?.title || fallbackProduct.title} (Quantité: ${quantity})`}
              data-customer-email={deliveryDetails.email || ""}
              data-customer-lastname={`${deliveryDetails.nom} ${deliveryDetails.prenom}`}
              data-customer-phone={deliveryDetails.phone}
              data-currency-iso="XOF"
            >
              {submitLoading ? (
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <ShoppingCart className="mr-2" />
              )}
              {submitLoading ? "Chargement..." : "Payer maintenant"}
            </Button>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg md:hidden z-10">
        <Button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-lg py-3 rounded-lg"
          onClick={handleFedaPayCheckout}
          disabled={submitLoading}
          data-transaction-amount={(product?.promotionalPrice || product?.price || fallbackProduct.price) * quantity}
          data-transaction-description={`Achat de ${product?.title || fallbackProduct.title} (Quantité: ${quantity})`}
          data-customer-email={deliveryDetails.email || ""}
          data-customer-lastname={`${deliveryDetails.nom} ${deliveryDetails.prenom}`}
          data-customer-phone={deliveryDetails.phone}
          data-currency-iso="XOF"
        >
          <ShoppingCart className="mr-2" />
          {submitLoading ? "Chargement..." : "Payer maintenant"}
        </Button>
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 0.5s ease-in;
          }
          .animate-slide-in {
            animation: slideIn 0.3s ease-in;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default SingleProductPage;