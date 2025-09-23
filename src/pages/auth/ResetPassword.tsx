import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axiosInstance from '@/services/axiosInstance';
import Swal from 'sweetalert2';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
   
    /** Récupère token/email en tolérant les &amp; envoyés dans les emails */
    const getParamsFromHref = () => {
        if (typeof window === "undefined") return { token: null, email: null };
    
        const href = window.location.href || "";
    
        const fixedHref = href.replace(/&amp;/g, "&");
    
        const query = fixedHref.split("?")[1] || "";
    
        const params = new URLSearchParams(query);
    
        const token = params.get("token");
        const email = params.get("email");
    
        return { token, email };
    };
    
    const { token, email } = getParamsFromHref();
    
    useEffect(() => {
        if (!token || !email) {
          Swal.fire('Erreur', 'Lien invalide ou expiré', 'error');
          navigate('/login');
        }
    }, [token, email, navigate]);
    

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      Swal.fire('Erreur', 'Le mot de passe doit contenir au moins 8 caractères', 'error');
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire('Erreur', 'Les mots de passe ne correspondent pas', 'error');
      return;
    }

    try {
      setIsLoading(true);

      // CSRF cookie
      await axiosInstance.get('/sanctum/csrf-cookie');

      // Reset password request
      const response = await axiosInstance.post('/api/auth/reset-password', {
        token,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      Swal.fire('Succès', 'Votre mot de passe a été réinitialisé !', 'success');
      navigate('/login');
    } catch (error: any) {
      Swal.fire(
        'Erreur',
        error.response?.data?.message || 'Une erreur est survenue',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Réinitialiser le mot de passe</CardTitle>
          <p className="text-muted-foreground">
            Saisissez votre nouveau mot de passe
          </p>
        </CardHeader>
        <CardContent className="mt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nouveau mot de passe */}
            <div className="space-y-2">
              <Label htmlFor="password">Nouveau mot de passe</Label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimum 8 caractères"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Confirmation mot de passe */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Répétez votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary text-lg py-3 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <>
                  Réinitialiser
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;
