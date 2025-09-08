import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BookOpen,
  Clock,
  Users,
  Star,
  Filter,
  Search,
  Play,
  Award,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FormationsListeVitrine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const formations = [
    {
      id: 1,
      title: 'Marketing Digital MLM',
      description: 'Maîtrisez les stratégies digitales pour développer votre réseau MLM efficacement.',
      image: '📈',
      category: 'Marketing',
      level: 'Débutant',
      duration: '2h 30min',
      price: 'GRATUIT',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: 1247,
      skills: ['Réseaux sociaux', 'Content marketing', 'Lead generation']
    },
    {
      id: 2,
      title: 'Gestion Financière MLM',
      description: 'Apprenez à gérer vos finances et optimiser vos revenus dans le MLM.',
      image: '💰',
      category: 'Finance',
      level: 'Intermédiaire',
      duration: '3h 15min',
      price: '25,000 FCFA',
      instructor: 'Pierre Kouassi',
      rating: 4.8,
      students: 892,
      skills: ['Budgeting', 'Investissement', 'Fiscalité']
    },
    {
      id: 3,
      title: 'Leadership d\'Équipe',
      description: 'Développez vos compétences de leadership pour motiver et former votre équipe.',
      image: '👥',
      category: 'Leadership',
      level: 'Avancé',
      duration: '4h 00min',
      price: '35,000 FCFA',
      instructor: 'Marie Diallo',
      rating: 4.9,
      students: 567,
      skills: ['Management', 'Communication', 'Motivation']
    },
    {
      id: 4,
      title: 'Techniques de Vente Avancées',
      description: 'Techniques éprouvées pour améliorer vos taux de conversion et vos ventes.',
      image: '🎯',
      category: 'Vente',
      level: 'Intermédiaire',
      duration: '2h 45min',
      price: '20,000 FCFA',
      instructor: 'Jean Baptiste',
      rating: 4.7,
      students: 1034,
      skills: ['Négociation', 'Closing', 'Objections']
    },
    {
      id: 5,
      title: 'Communication Persuasive',
      description: 'Maîtrisez l\'art de la communication pour convaincre et influencer positivement.',
      image: '🗣️',
      category: 'Communication',
      level: 'Débutant',
      duration: '1h 50min',
      price: 'GRATUIT',
      instructor: 'Fatou Sow',
      rating: 4.6,
      students: 789,
      skills: ['Présentation', 'Storytelling', 'Persuasion']
    },
    {
      id: 6,
      title: 'Stratégies de Recrutement',
      description: 'Apprenez à identifier, approcher et recruter les bons profils pour votre équipe.',
      image: '🎪',
      category: 'Recrutement',
      level: 'Avancé',
      duration: '3h 30min',
      price: '30,000 FCFA',
      instructor: 'Amadou Traoré',
      rating: 4.8,
      students: 445,
      skills: ['Prospection', 'Entretien', 'Onboarding']
    }
  ];

  const filteredFormations = formations.filter(formation => {
    const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || formation.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || formation.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const categories = [...new Set(formations.map(f => f.category))];
  const levels = [...new Set(formations.map(f => f.level))];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="gradient-primary bg-clip-text text-dark">Formations Longrich</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Apprenez les compétences de demain avec nos formations certifiantes et développez votre réussite MLM.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2" />
              50+ Formations
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              5,000+ Apprenants actifs
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              Certificats reconnus
            </Badge>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
              <Input
                placeholder="Rechercher une formation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Level Filter */}
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les niveaux</SelectItem>
                {levels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-8">
            {filteredFormations.length} formation{filteredFormations.length > 1 ? 's' : ''} trouvée{filteredFormations.length > 1 ? 's' : ''}
          </p>

          {/* Formations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFormations.map((formation) => (
              <Card key={formation.id} className="gradient-card hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <div className="text-4xl mb-3">{formation.image}</div>
                    <h3 className="font-semibold text-lg mb-2">{formation.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {formation.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="outline">{formation.category}</Badge>
                    <Badge variant="outline">{formation.level}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{formation.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{formation.rating}/5</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{formation.students.toLocaleString()}</span>
                      </div>
                      <div className="font-bold text-primary">{formation.price}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Compétences acquises :</p>
                    <div className="flex flex-wrap gap-1">
                      {formation.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button asChild className="w-full gradient-primary">
                    <Link to={`/vitrine/formations/${formation.id}`}>
                      Voir détails
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-dark">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-bold">🎁 Commencez votre parcours d'apprentissage</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Créez un compte gratuit et accédez immédiatement à nos formations gratuites pour démarrer votre réussite MLM.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
            Créer un compte gratuit
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FormationsListeVitrine;