import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card'; // Assurez-vous que ceci est importé

const RegisterPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [activeTab, setActiveTab] = useState('tab-stockiste');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Sélectionnez votre pays');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [stockAddress, setStockAddress] = useState('');
  const [stockCapacity, setStockCapacity] = useState('');
  const [distributionZone, setDistributionZone] = useState('');
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const togglePasswordRef = useRef<HTMLButtonElement>(null);
  const countrySelectRef = useRef<HTMLButtonElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const selectedCountryRef = useRef<HTMLSpanElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const checkboxVisualRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      email,
      phone,
      country,
      password,
      confirmPassword,
      stockAddress,
      stockCapacity,
      distributionZone,
      termsAccepted,
      role: activeTab.replace('tab-', ''),
    });
    alert('Inscription en cours... (API à implémenter)');
  };

  // Gestion des onglets
  useEffect(() => {
    const tabs = {
      'tab-stockiste': 'stockiste-fields',
      'tab-distributeur': 'distributeur-fields',
      'tab-utilisateur': 'utilisateur-fields',
    };
    Object.keys(tabs).forEach((tabId) => {
      const tab = document.getElementById(tabId);
      const fields = document.getElementById(tabs[tabId]);
      if (tab && fields) {
        if (tabId === activeTab) {
          tab.classList.add('bg-primary', 'text-white');
          tab.classList.remove('text-gray-700', 'hover:text-gray-900');
          fields.classList.remove('hidden');
        } else {
          tab.classList.remove('bg-primary', 'text-white');
          tab.classList.add('text-gray-700', 'hover:text-gray-900');
          fields.classList.add('hidden');
        }
      }
    });
  }, [activeTab]);

  // Gestion du dropdown pays
  useEffect(() => {
    const countrySelect = countrySelectRef.current;
    const countryDropdown = countryDropdownRef.current;
    const selectedCountry = selectedCountryRef.current;

    if (countrySelect && countryDropdown && selectedCountry) {
      const handleClick = (e: MouseEvent) => {
        if (!countrySelect.contains(e.target as Node) && !countryDropdown.contains(e.target as Node)) {
          countryDropdown.classList.add('hidden');
        }
      };

      countrySelect.addEventListener('click', () => countryDropdown.classList.toggle('hidden'));
      document.addEventListener('click', handleClick);

      countryDropdown.addEventListener('click', (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.hasAttribute('data-country')) {
          setCountry(target.getAttribute('data-country') || 'Sélectionnez votre pays');
          countryDropdown.classList.add('hidden');
        }
      });

      return () => document.removeEventListener('click', handleClick);
    }
  }, []);

  // Gestion des fonctionnalités mot de passe
  useEffect(() => {
    const passwordInput = passwordRef.current;
    const confirmPasswordInput = confirmPasswordRef.current;
    const togglePassword = togglePasswordRef.current;
    const passwordMatch = document.getElementById('password-match');
    const strengthBars = [1, 2, 3, 4].map((i) => document.getElementById(`strength-${i}`));
    const strengthText = document.getElementById('strength-text');

    if (passwordInput && confirmPasswordInput && togglePassword && passwordMatch && strengthBars.every(Boolean) && strengthText) {
      togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        const icon = togglePassword.querySelector('i');
        icon!.className = type === 'password' ? 'ri-eye-off-line text-gray-400' : 'ri-eye-line text-gray-400';
      });

      const updatePasswordStrength = () => {
        const password = passwordInput.value;
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength++;

        strengthBars.forEach((bar, index) => {
          if (index < strength) {
            if (strength <= 2) bar.className = 'h-1 flex-1 bg-red-400 rounded';
            else if (strength === 3) bar.className = 'h-1 flex-1 bg-yellow-400 rounded';
            else bar.className = 'h-1 flex-1 bg-green-400 rounded';
          } else {
            bar.className = 'h-1 flex-1 bg-gray-200 rounded';
          }
        });

        const strengthTexts = ['Très faible', 'Faible', 'Moyenne', 'Forte'];
        const strengthColors = ['text-red-500', 'text-red-500', 'text-yellow-500', 'text-green-500'];
        if (password.length > 0) {
          strengthText.textContent = strengthTexts[strength - 1] || 'Très faible';
          strengthText.className = `text-xs mt-1 ${strengthColors[strength - 1] || 'text-red-500'}`;
        } else {
          strengthText.textContent = 'Force du mot de passe';
          strengthText.className = 'text-xs text-gray-500 mt-1';
        }
      };

      const checkPasswordMatch = () => {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        if (confirmPassword.length > 0) {
          if (password === confirmPassword) {
            passwordMatch.textContent = 'Les mots de passe correspondent';
            passwordMatch.className = 'text-xs mt-1 text-green-500';
            passwordMatch.classList.remove('hidden');
          } else {
            passwordMatch.textContent = 'Les mots de passe ne correspondent pas';
            passwordMatch.className = 'text-xs mt-1 text-red-500';
            passwordMatch.classList.remove('hidden');
          }
        } else {
          passwordMatch.classList.add('hidden');
        }
      };

      passwordInput.addEventListener('input', updatePasswordStrength);
      confirmPasswordInput.addEventListener('input', checkPasswordMatch);

      return () => {
        passwordInput.removeEventListener('input', updatePasswordStrength);
        confirmPasswordInput.removeEventListener('input', checkPasswordMatch);
      };
    }
  }, []);

  // Gestion de la checkbox personnalisée
  useEffect(() => {
    const checkbox = checkboxRef.current;
    const checkboxVisual = checkboxVisualRef.current;

    if (checkbox && checkboxVisual) {
      checkboxVisual.addEventListener('click', () => {
        const newChecked = !checkbox.checked;
        checkbox.checked = newChecked;
        setTermsAccepted(newChecked);
        if (newChecked) {
          checkboxVisual.classList.add('bg-primary', 'border-primary');
          checkboxVisual.classList.remove('border-gray-300');
          checkboxVisual.querySelector('i')!.classList.remove('opacity-0');
        } else {
          checkboxVisual.classList.remove('bg-primary', 'border-primary');
          checkboxVisual.classList.add('border-gray-300');
          checkboxVisual.querySelector('i')!.classList.add('opacity-0');
        }
      });
    }
  }, []);

  return (
    <div className={`min-h-screen bg-background ${theme}`}>

      {/* Main Content */}
      <main className="container-fluid mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 min-h-[calc(100vh-200px)]">
        {/* Image Section (Left) - 40% */}
        <div className="w-full lg:w-[50%] relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10"></div>
          <img
            src="https://readdy.ai/api/search-image?query=African%20business%20network%20community%20people%20connecting%20trading%20products%20modern%20office%20environment%20professional%20networking%20diverse%20entrepreneurs%20working%20together%20digital%20commerce%20platform%20vibrant%20colors%20warm%20lighting&width=800&height=1200&seq=longrich-signup&orientation=portrait"
            alt="Réseau Longrich"
            className="w-full h-96 lg:h-auto object-cover object-top"
            loading="lazy"
          />
        </div>

        {/* Form Section (Right) - 60% */}
        <div className="w-full lg:w-[50%]">
          <Card className="w-full  p-6 space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-['Pacifico'] text-primary mb-2">logo</h2>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Créer votre compte</h3>
              <p className="text-gray-600">Choisissez votre type de profil pour commencer</p>
            </div>

            <div className="mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  id="tab-stockiste"
                  className="flex-1 px-1 py-1 text-sm font-medium rounded-full transition-all duration-200 bg-primary text-white"
                  onClick={() => setActiveTab('tab-stockiste')}
                >
                  Stockistes
                </button>
                <button
                  id="tab-distributeur"
                  className="flex-1 px-1 py-1 text-sm font-medium rounded-full transition-all duration-200 text-gray-700 hover:text-gray-900"
                  onClick={() => setActiveTab('tab-distributeur')}
                >
                  Distributeurs
                </button>
                <button
                  id="tab-utilisateur"
                  className="flex-1 px-1 py-1 text-sm font-medium rounded-full transition-all duration-200 text-gray-700 hover:text-gray-900"
                  onClick={() => setActiveTab('tab-utilisateur')}
                >
                  Utilisateurs
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Votre prénom"
                    className="mt-1 w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Votre nom"
                    className="mt-1 w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@exemple.com"
                  className="mt-1 w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+33 6 12 34 56 78"
                  className="mt-1 w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary text-sm"
                />
              </div>

              <div>
                <Label htmlFor="country">Pays</Label>
                <div className="relative">
                  <button
                    type="button"
                    id="country-select"
                    ref={countrySelectRef}
                    className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary text-sm text-left bg-white flex items-center justify-between"
                  >
                    <span id="selected-country" ref={selectedCountryRef}>{country}</span>
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-arrow-down-s-line text-gray-400"></i>
                    </div>
                  </button>
                  <div
                    id="country-dropdown"
                    ref={countryDropdownRef}
                    className="hidden absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto"
                  >
                    {['Sénégal', 'Côte d\'Ivoire', 'Mali', 'Burkina Faso', 'Ghana', 'Nigeria', 'Cameroun', 'France'].map((c) => (
                      <div
                        key={c}
                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        data-country={c}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div id="specific-fields">
                <div id="stockiste-fields" className="space-y-4">
                  <div>
                    <Label htmlFor="stockAddress">Adresse du stock</Label>
                    <Input
                      id="stockAddress"
                      type="text"
                      value={stockAddress}
                      onChange={(e) => setStockAddress(e.target.value)}
                      placeholder="Adresse complète de votre entrepôt"
                      className="mt-1 w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stockCapacity">Capacité de stockage (m²)</Label>
                    <Input
                      id="stockCapacity"
                      type="number"
                      value={stockCapacity}
                      onChange={(e) => setStockCapacity(e.target.value)}
                      placeholder="Ex: 100"
                      className="mt-1 w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>

                <div id="distributeur-fields" className="space-y-4 hidden">
                  <div>
                    <Label htmlFor="distributionZone">Zone de distribution</Label>
                    <Input
                      id="distributionZone"
                      type="text"
                      value={distributionZone}
                      onChange={(e) => setDistributionZone(e.target.value)}
                      placeholder="Ville, région ou zone couverte"
                      className="mt-1 w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>

                <div id="utilisateur-fields" className="hidden">
                  <div className="text-sm text-gray-600 p-4 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 flex items-center justify-center mb-2">
                      <i className="ri-information-line text-primary"></i>
                    </div>
                    En tant qu'utilisateur, vous pourrez accéder aux formations, à la communauté et aux outils marketing de Longrich.
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 caractères"
                    className="w-full px-4 py-3 pr-12 rounded-lg focus:ring-2 focus:ring-primary text-sm"
                    ref={passwordRef}
                  />
                  <button
                    type="button"
                    id="toggle-password"
                    ref={togglePasswordRef}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 flex items-center justify-center"
                  >
                    <i className="ri-eye-off-line text-gray-400"></i>
                  </button>
                </div>
                <div className="mt-2">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} id={`strength-${i}`} className="h-1 flex-1 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <p id="strength-text" className="text-xs text-gray-500 mt-1">Force du mot de passe</p>
                </div>
              </div>

              <div>
                <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmez votre mot de passe"
                  className="w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-primary text-sm"
                  ref={confirmPasswordRef}
                />
                <p id="password-match" className="text-xs mt-1 hidden"></p>
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <div className="flex items-center h-5">
                  <div className="relative" ref={checkboxVisualRef}>
                    <input type="checkbox" id="terms" required className="sr-only" ref={checkboxRef} />
                    <div
                      className="w-5 h-5 rounded bg-white cursor-pointer flex items-center justify-center transition-all duration-200"
                    >
                      <i className="ri-check-line text-white text-xs opacity-0 transition-opacity duration-200"></i>
                    </div>
                  </div>
                </div>
                <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                  J'accepte les{' '}
                  <a href="#" className="text-primary hover:underline">conditions d'utilisation</a> et la{' '}
                  <a href="#" className="text-primary hover:underline">politique de confidentialité</a>
                </Label>
              </div>

              <Button type="submit" className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200 whitespace-nowrap">
                Créer mon compte
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Déjà membre ?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Se connecter
              </Link>
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;