import React, { useEffect, useState } from 'react';
import axiosInstance from '@/services/axiosInstance';
import { toast } from 'sonner';

interface Shop {
  id: number;
  title: string;
  description?: string;
  logo?: string;
  banner?: string;
  text_bouton_shop?: string;
  template?: string;
}

const ShopPublic = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const host = window.location.hostname; // ex: shop1.localhost
        const subdomain = host.split('.')[0]; // "shop1"

        const res = await axiosInstance.get(`/api/shops/${subdomain}`);
        setShop(res.data);
      } catch (err: any) {
        toast.error('Boutique non trouvée');
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!shop) return <p>Boutique introuvable</p>;

  return (
    <div className="container mx-auto py-8 text-center">
      {shop.logo && <img src={shop.logo} alt={shop.title} className="h-20 mx-auto mb-4" />}
      <h1 className="text-3xl font-bold">{shop.title}</h1>
      <p className="text-gray-600 mt-2">{shop.description}</p>
      <a
        href="#"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-4 inline-block"
      >
        {shop.text_bouton_shop || 'Visiter la boutique'}
      </a>
    </div>
  );
};

export default ShopPublic;
