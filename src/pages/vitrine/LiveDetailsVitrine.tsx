import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar,
  Clock,
  Users,
  Video,
  Zap,
  Play,
  ArrowRight,
  Star,
  Eye,
  Share2,
  Heart,
  Bell,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const LiveDetailsVitrine = () => {
  const { id } = useParams();
  const [timeUntilLive, setTimeUntilLive] = useState('');

  // Mock data - à remplacer par un appel API
  const live = {
    id: 1,
    title: 'Techniques de Vente 2024',
    description: 'Découvrez les dernières techniques de vente qui fonctionnent réellement dans le MLM moderne et augmentez vos conversions de manière significative.',
    longDescription: `
      Dans ce live exclusif, nous explorerons les techniques de vente les plus efficaces pour 2024. 
      Apprenez comment adapter votre approche aux nouvelles tendances du marché et aux attentes des clients modernes.
      
      Vous découvrirez des stratégies concrètes pour améliorer votre taux de conversion, gérer les objections 
      et créer des relations durables avec vos prospects et clients.
    `,
    instructor: {
      name: 'Marie Diallo',
      title: 'Expert Vente MLM - 15 ans d\'expérience',
      avatar: '👩‍💼',
      bio: 'Marie Diallo est une experte reconnue en vente MLM avec plus de 15 ans d\'expérience. Elle a formé plus de 3000 commerciaux et aidé des centaines d\'entreprises à améliorer leurs performances de vente.',
      achievements: [
        'Top 1% des vendeurs MLM en Afrique de l\'Ouest',
        'Formatrice certifiée en techniques de vente',
        'Auteure de "Vendre avec Impact"',
        'Speaker international sur la vente MLM'
      ]
    },
    date: '2024-12-15',
    time: '20:00',
    timezone: 'GMT',
    duration: '90 min',
    participants: 45,
    maxParticipants: 100,
    price: 'GRATUIT',
    originalPrice: '15,000 FCFA',
    category: 'Vente',
    level: 'Intermédiaire',
    image: '🎯',
    status: 'upcoming',
    tags: ['Live', 'Gratuit', 'Interactif', 'Q&A'],
    agenda: [
      {
        time: '20:00 - 20:10',
        title: 'Introduction et présentation',
        description: 'Présentation du formateur et des objectifs du live'
      },
      {
        time: '20:10 - 20:30',
        title: 'Fondamentaux de la vente moderne',
        description: 'Les bases actualisées pour vendre efficacement en 2024'
      },
      {
        time: '20:30 - 20:50',
        title: 'Techniques de persuasion avancées',
        description: 'Méthodes éprouvées pour convaincre et influencer positivement'
      },
      {
        time: '20:50 - 21:15',
        title: 'Gestion des objections',
        description: 'Comment transformer les objections en opportunités de vente'
      },
      {
        time: '21:15 - 21:30',
        title: 'Session Q&A en direct',
        description: 'Réponses aux questions des participants en temps réel'
      }
    ],
    objectives: [
      'Maîtriser les techniques de vente actuelles',
      'Améliorer votre taux de conversion de 50%',
      'Apprendre à gérer toutes les objections',
      'Développer votre confiance en vente',
      'Créer des relations durables avec vos clients'
    ],
    benefits: [
      'Accès au live en direct',
      'Replay disponible 48h',
      'Kit de ressources téléchargeable',
      'Session Q&A interactive',
      'Certificat de participation',
      'Accès au groupe privé Telegram'
    ],
    requirements: [
      'Aucun prérequis technique',
      'Connexion internet stable',
      'Bloc-notes pour les exercices pratiques',
      'Motivation à apprendre et progresser'
    ]
  };

  // Calcul du temps restant
  useEffect(() => {
    const updateCountdown = () => {
      const liveDateTime = new Date(`${live.date}T${live.time}:00Z`);
      const now = new Date();
      const diff = liveDateTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeUntilLive('Live en cours !');
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) {
        setTimeUntilLive(`${days}j ${hours}h ${minutes}min`);
      } else if (hours > 0) {
        setTimeUntilLive(`${hours}h ${minutes}min`);
      } else {
        setTimeUntilLive(`${minutes}min`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [live.date, live.time]);

  const spotsRemaining = live.maxParticipants - live.participants;
  const isAlmostFull = spotsRemaining <= 10;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <Badge variant="default" className="text-sm px-4 py-2 bg-red-500">
                  🔴 LIVE EN DIRECT
                </Badge>
              </div>
              
              <div className="text-6xl mb-4">{live.image}</div>
              
              <div className="space-y-2">
                <div className="flex justify-center gap-2 flex-wrap">
                  {live.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant={tag === 'Gratuit' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-3xl md:text-5xl font-bold">{live.title}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {live.description}
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(live.date).toLocaleDateString('fr-FR', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{live.time} {live.timezone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  <span>{live.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{live.participants} inscrits</span>
                </div>
              </div>

              {/* Countdown */}
              {timeUntilLive && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 inline-block">
                  <div className="flex items-center gap-2 text-red-700">
                    <Zap className="w-5 h-5" />
                    <span className="font-bold text-lg">{timeUntilLive}</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">avant le début du live</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="w-5 h-5" />
                  À propos de ce live
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {live.longDescription.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Objectives */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Ce que vous allez apprendre
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {live.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Agenda */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Programme détaillé
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {live.agenda.map((item, index) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-4 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs font-mono">
                          {item.time}
                        </Badge>
                        <h4 className="font-semibold">{item.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Votre formateur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="text-center sm:text-left">
                    <div className="text-4xl mb-2">{live.instructor.avatar}</div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg">{live.instructor.name}</h4>
                      <p className="text-muted-foreground">{live.instructor.title}</p>
                    </div>
                    <p className="text-sm leading-relaxed">{live.instructor.bio}</p>
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Réalisations :</h5>
                      <ul className="text-sm space-y-1">
                        {live.instructor.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Prérequis et préparation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {live.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Registration Card */}
              <Card className="gradient-card">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-primary">{live.price}</div>
                      {live.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {live.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3 text-center">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-green-600">{spotsRemaining}</div>
                      <div className="text-sm text-muted-foreground">places restantes</div>
                    </div>
                    
                    {isAlmostFull && (
                      <Badge variant="destructive" className="text-xs">
                        ⚠️ Places limitées !
                      </Badge>
                    )}
                  </div>

                  <Button className="w-full gradient-primary text-lg py-3">
                    <Zap className="w-5 h-5 mr-2" />
                    S'inscrire au Live
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Bell className="w-4 h-4 mr-2" />
                      Rappel
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ce live inclut :</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {live.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Stats */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{live.participants}</div>
                      <div className="text-xs text-muted-foreground">Inscrits</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{live.duration}</div>
                      <div className="text-xs text-muted-foreground">Durée</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Urgency */}
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4 text-center">
                  <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-orange-800 mb-1">Événement Live Unique</h4>
                  <p className="text-xs text-orange-700">
                    Ne manquez pas cette opportunité ! 
                    Replay disponible seulement 48h.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDetailsVitrine;