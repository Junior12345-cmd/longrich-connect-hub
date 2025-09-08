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
import Communaute from "./pages/dashboard/Communaute";
import Messagerie from "./pages/dashboard/Messagerie";
import StudioAI from "./pages/dashboard/StudioAI";
import NotFound from "./pages/dashboard/NotFound";
import About from "./pages/vitrine/About";
import LandingVitrine from "./pages/vitrine/LandingVitrine";
import BoutiquesVitrine from "./pages/vitrine/BoutiquesVitrine";
import CatalogueVitrine from "./pages/vitrine/CatalogueVitrine";
import CommunauteVitrine from "./pages/vitrine/CommunauteVitrine";
import FormationsVitrine from "./pages/vitrine/FormationsVitrine";
import ShopUser from "./pages/dashboard/ShopUser";
import SingleProductPage from "./pages/dashboard/SingleProductPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

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
            <Route path="/search" element={<Search />} />
            <Route path="/boutiques" element={<Boutiques />} />
            <Route path="/formation" element={<Formations />} />
            <Route path="/communaute" element={<Communaute />} />
            <Route path="/messagerie" element={<Messagerie />} />
            <Route path="/studio-ai" element={<StudioAI />} />
          </Route>

          {/* Groupe sans Layout (pages vitrines, ex. About) */}
          <Route element={<LayoutVitrine />}>
            <Route path="/" element={<LandingVitrine />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<BoutiquesVitrine />} />
            <Route path="/packs" element={<CatalogueVitrine />} />
            <Route path="/community" element={<CommunauteVitrine />} />
            <Route path="/formations" element={<FormationsVitrine />} />
            <Route path="/lives" element={<FormationsVitrine />} />
            <Route path="/user-shop" element={<ShopUser />} />
            <Route path="/shop/:productId" element={<SingleProductPage />} />
          </Route>
          {/* Catch-all global */}
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
