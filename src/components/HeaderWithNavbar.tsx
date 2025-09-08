import React, { useState, Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Store, 
  BookOpen, 
  Video, 
  Users, 
  DollarSign, 
  Menu 
} from 'lucide-react';
import { Moon, Sun } from 'lucide-react';

const HeaderWithNavbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.body.className = newTheme;
    };
  const menuItems = [
    { name: 'Accueil', icon: Home, path: '/'},
    { name: 'Boutiques', icon: Store, path: '/shop'},
    { name: 'Packs d’adhésion', icon: DollarSign, path: '/packs'},
    { name: 'Formations', icon: BookOpen, path: '#'},
    { name: 'Lives', icon: Video, path: '#'},
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-dark font-bold text-sm">L</span>
          </div>
          <span className="font-bold text-xl">Longrich Community</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group">
              <Link
                to={item.path}
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <item.icon className="w-4 h-4 mr-1" />
                {item.name}
              </Link>
            </div>
          ))}
          <Link to="/login">
            <Button variant="outline" className="ml-4">Se connecter</Button>
          </Link>
          <Link to="/register"> <Button className="gradient-primary">Rejoindre</Button></Link>
         
          <div className="mx-auto px-4 py-4 flex justify-end">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" onClick={toggleTheme} className="p-2">
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </Button>
              </div>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-t">
          {menuItems.map((item) => (
            <div key={item.name} className="border-b">
              <Link
                to={item.path}
                className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </Link>
            </div>
          ))}
          <div className="px-4 py-2">
            <Link to="/dashboard">
              <Button variant="outline" className="w-full mb-2">Se connecter</Button>
            </Link>
            <Button className="gradient-primary w-full">Rejoindre</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderWithNavbar;