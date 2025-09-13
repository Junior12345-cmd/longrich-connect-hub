import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LayoutVitrine from "./components/LayoutVitrine";
import Index from "./pages/dashboard/Index";
import Search from "./pages/dashboard/Search";
import Boutiques from "./pages/dashboard/Boutiques";
import Formations from "./pages/dashboard/Formations";
import FormationsManagement from "./pages/dashboard/FormationsManagement";
import FormationPlayer from "./pages/dashboard/FormationPlayer";
import Communaute from "./pages/dashboard/Communaute";
import Messagerie from "./pages/dashboard/Messagerie";
import StudioAI from "./pages/dashboard/StudioAI";
import NotFound from "./pages/dashboard/NotFound";
import ImportProducts from "./pages/dashboard/ImportProducts";
import About from "./pages/vitrine/About";
import LandingVitrine from "./pages/vitrine/LandingVitrine";
import BoutiquesVitrine from "./pages/vitrine/BoutiquesVitrine";
import CatalogueVitrine from "./pages/vitrine/CatalogueVitrine";
import CommunauteVitrine from "./pages/vitrine/CommunauteVitrine";
import ShopUser from "./pages/dashboard/ShopUser";
import SingleProductPage from "./pages/dashboard/SingleProductPage";
import FormationsListeVitrine from "./pages/vitrine/FormationsListeVitrine";
import FormationDetailsVitrine from "./pages/vitrine/FormationDetailsVitrine";
import LivesListeVitrine from "./pages/vitrine/LivesListeVitrine";
import LiveDetailsVitrine from "./pages/vitrine/LiveDetailsVitrine";
import LoginVitrine from "./pages/auth/LoginVitrine";
import RegisterVitrine from "./pages/auth/RegisterVitrine";
import SearchByProduct from "./pages/vitrine/SearchByProduct";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Groupe avec Layout Dashboard */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Index />} />
            {/* <Route path="/search" element={<Search />} /> */}
            <Route path="/dash/boutiques" element={<Boutiques />} />
            <Route path="/dash/import-products" element={<ImportProducts />} />
            <Route path="/dash/formations" element={<Formations />} />
            <Route path="/dash/formations-management" element={<FormationsManagement />} />
            <Route path="/dash/formation-player/:id" element={<FormationPlayer />} />
            {/* <Route path="/dash/live" element={<Formations />} /> */}
            {/* <Route path="/dash/communauty" element={<Communaute />} /> */}
            <Route path="/dash/messagerie" element={<Messagerie />} />
            {/* <Route path="/dash/studio-ai" element={<StudioAI />} /> */}
          </Route>

          {/* Groupe sans Layout (pages vitrines, ex. About) */}
          <Route element={<LayoutVitrine />}>
            <Route path="/" element={<LandingVitrine />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<BoutiquesVitrine />} />
            <Route path="/shops" element={<ShopUser />} />
            <Route path="/shop/:productId" element={<SingleProductPage />} />
            <Route path="/search-by-product" element={<SearchByProduct />} />
            <Route path="/packs" element={<CatalogueVitrine />} />
            <Route path="/community" element={<CommunauteVitrine />} />
            <Route path="/formations" element={<FormationsListeVitrine />} />
            <Route path="/formation/:id" element={<FormationDetailsVitrine />} />
            <Route path="/lives" element={<LivesListeVitrine />} />
            <Route path="/live/:id" element={<LiveDetailsVitrine />} />
          </Route>
          {/* Catch-all global */}
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginVitrine />} />
          <Route path="/register" element={<RegisterVitrine />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
