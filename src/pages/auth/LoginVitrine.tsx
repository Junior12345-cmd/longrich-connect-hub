import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  AlertCircle,
  LogIn
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginVitrine = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Cette fonctionnalité nécessite Supabase
    console.log('Connexion:', formData);
    
    // Simulation d'une requête
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          
          {/* Left Side - Welcome */}
          <div className="space-y-8 text-center lg:text-left">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                <span className="gradient-primary bg-clip-text text-dark">Bon retour !</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Connectez-vous à votre compte pour accéder à vos formations, 
                votre boutique et votre réseau.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="text-center p-6 rounded-lg bg-primary/5">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="font-semibold mb-2">Vos Formations</h3>
                <p className="text-sm text-muted-foreground">
                  Continuez votre apprentissage là où vous vous êtes arrêté
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-primary/5">
                <div className="text-3xl mb-2">🏪</div>
                <h3 className="font-semibold mb-2">Votre Boutique</h3>
                <p className="text-sm text-muted-foreground">
                  Gérez vos produits et suivez vos ventes
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-primary/5">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-semibold mb-2">Votre Réseau</h3>
                <p className="text-sm text-muted-foreground">
                  Connectez-vous avec votre équipe et vos partenaires
                </p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-primary/5">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="font-semibold mb-2">Vos Statistiques</h3>
                <p className="text-sm text-muted-foreground">
                  Suivez vos performances et vos revenus
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div>
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <LogIn className="w-6 h-6 text-dark" />
                </div>
                <CardTitle className="text-2xl text-muted-foreground">Connexion</CardTitle>
                <p className="text-muted-foreground">
                  Connectez-vous à votre espace membre
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email text-muted-foreground">Email</Label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre.email@exemple.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password text-muted-foreground">Mot de passe</Label>
                      <Link 
                        to="/vitrine/forgot-password" 
                        className="text-sm text-primary hover:underline"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Votre mot de passe"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Se souvenir de moi
                    </Label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-primary text-lg py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Connexion...
                      </>
                    ) : (
                      <>
                        Se connecter
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                {/* <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Ou continuer avec
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full" disabled>
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button variant="outline" className="w-full" disabled>
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </Button>
                  </div>
                </div> */}

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Pas encore inscrit ?{' '}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                      Créer un compte gratuit
                    </Link>
                  </p>
                  
                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-2">
                      Vous êtes un professionnel ?
                    </p>
                    <Link to="/packs" className="text-sm text-primary hover:underline">
                      Découvrir nos packs stockiste & distributeur →
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginVitrine;