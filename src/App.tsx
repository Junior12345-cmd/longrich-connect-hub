import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Search from "./pages/Search";
import Boutiques from "./pages/Boutiques";
import Formations from "./pages/Formations";
import Communaute from "./pages/Communaute";
import Messagerie from "./pages/Messagerie";
import StudioAI from "./pages/StudioAI";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/boutiques" element={<Boutiques />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/communaute" element={<Communaute />} />
            <Route path="/messagerie" element={<Messagerie />} />
            <Route path="/studio-ai" element={<StudioAI />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
