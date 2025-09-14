import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Search, 
  Store, 
  Package, 
  GraduationCap, 
  Video, 
  Wand2, 
  Users, 
  MessageCircle, 
  AlertCircle, 
  Bell, 
  CreditCard,
  Settings,
  Menu,
  X
} from 'lucide-react';

const navigationItems = [
  { path: '/dashboard', icon: Home, label: 'Accueil' },
  // { path: '/search', icon: Search, label: 'Recherche' },
  { path: '/dash/boutiques', icon: Store, label: 'Boutiques' },
  { path: '/dash/packs', icon: Package, label: 'Packs d\'adhésion' },
  { path: '/dash/formations', icon: GraduationCap, label: 'Formations' },
  { path: '/dash/lives', icon: Video, label: 'Lives' },
  { path: '#', icon: Wand2, label: 'Studio IA', badge: "Nouveau" },
  { path: '#', icon: Users, label: 'Communauté' },
  { path: '/dash/messagerie', icon: MessageCircle, label: 'Messages', badge: 3 },
  { path: '#', icon: AlertCircle, label: 'Support' },
  { path: '#', icon: Bell, label: 'Notifications', badge: 5 },
  { path: '#', icon: CreditCard, label: 'Paiements' },
];

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50 lg:bg-card lg:border-r lg:border-border">
        <div className="flex items-center gap-2 h-16 px-6 border-b border-border">
          <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">LR</span>
          </div>
          <span className="font-bold text-lg text-foreground">Longrich</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth
                  ${active 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <Link to="/settings">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-3">
              <Settings className="w-4 h-4" />
              Paramètres
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between h-16 px-4 bg-card border-b border-border sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 gradient-hero rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">LR</span>
          </div>
          <span className="font-bold text-lg text-foreground">Longrich</span>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-background">
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth
                    ${active 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
};

export default Navigation;