import React from "react";
import { Outlet } from "react-router-dom";
import HeaderWithNavbar from "@/components/HeaderWithNavbar";
import { Link } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeaderWithNavbar />

      {/* Main Content */}
      <main>
        <div className="pt-16 lg:pt-0">
          <Outlet />
        </div>

        {/* Footer */}
        <footer className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <span className="text-dark font-bold text-sm">L</span>
                  </div>
                <span className="font-bold text-xl">MLM Community</span>
              </div>
              <p className="text-sm text-muted-foreground">
                La plateforme communautaire qui révolutionne le MLM en Afrique.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Produits</h4>
              <div className="space-y-2 text-sm">
                <Link to="/search-by-product" className="block text-muted-foreground hover:text-primary">Catalogue produit & stockistes</Link>
                <Link to="/shops" className="block text-muted-foreground hover:text-primary">Boutiques</Link>
                <Link to="/packs" className="block text-muted-foreground hover:text-primary">Packs d'adhésion</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Communauté</h4>
              <div className="space-y-2 text-sm">
                <Link to="/formations" className="block text-muted-foreground hover:text-primary">Formations</Link>
                <Link to="/community" className="block text-muted-foreground hover:text-primary">Réseau Social</Link>
                <Link to="/lives" className="block text-muted-foreground hover:text-primary">Événements lives</Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <div className="space-y-2 text-sm">
                <Link to="/about" className="block text-muted-foreground hover:text-primary">À propos</Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary">Contact</Link>
                <div className="text-muted-foreground">FAQ</div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © 2024 MLM Community. Tous droits réservés.
            </div>
            <div className="flex space-x-4 text-sm">
              <div className="text-muted-foreground hover:text-primary cursor-pointer">RGPD</div>
              <div className="text-muted-foreground hover:text-primary cursor-pointer">CGU</div>
              <div className="text-muted-foreground hover:text-primary cursor-pointer">Confidentialité</div>
            </div>
          </div>
        </div>
        </footer>
      </main>
    </div>
  );
};

export default Layout;
