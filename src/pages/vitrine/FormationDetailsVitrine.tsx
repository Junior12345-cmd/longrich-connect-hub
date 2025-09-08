import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  BookOpen,
  Clock,
  Users,
  Star,
  Calendar,
  Award,
  CheckCircle,
  Play,
  Download,
  Shield,
  ArrowRight,
  Heart,
  Share2
} from 'lucide-react';

const FormationDetailsVitrine = () => {
  const { id } = useParams();

  // Mock data - à remplacer par un appel API
  const formation = {
    id: 1,
    title: 'Marketing Digital MLM',
    description: 'Maîtrisez les stratégies digitales pour développer votre réseau MLM efficacement et augmenter vos revenus de manière durable.',
    longDescription: `
      Cette formation complète vous permettra de maîtriser tous les aspects du marketing digital appliqué au MLM. 
      Vous apprendrez à créer une présence en ligne forte, générer des leads qualifiés, et convertir vos prospects en partenaires actifs.
      
      Grâce à des stratégies éprouvées et des outils pratiques, vous serez capable de développer votre réseau de manière automatisée 
      et de créer des revenus passifs durables.
    `,
    image: '📈',
    category: 'Marketing',
    level: 'Débutant',
    duration: '2h 30min',
    price: 'GRATUIT',
    originalPrice: '15,000 FCFA',
    instructor: {
      name: 'Sarah Johnson',
      title: 'Expert Marketing Digital MLM',
      avatar: '👩‍💼',
      bio: 'Sarah Johnson a plus de 8 ans d\'expérience dans le marketing digital MLM. Elle a aidé plus de 2000 entrepreneurs à développer leur réseau en ligne.',
      rating: 4.9,
      students: 5420
    },
    rating: 4.9,
    students: 1247,
    nextSessions: [
      { date: '15 Décembre 2024', time: '20h GMT', spots: 15 },
      { date: '22 Décembre 2024', time: '19h GMT', spots: 8 },
      { date: '5 Janvier 2025', time: '20h GMT', spots: 25 }
    ],
    objectives: [
      'Créer une stratégie de contenu engageante',
      'Maîtriser les réseaux sociaux pour le MLM',
      'Générer des leads qualifiés automatiquement',
      'Convertir vos prospects en partenaires',
      'Mesurer et optimiser vos performances'
    ],
    program: [
      {
        module: 'Module 1 : Fondamentaux du Digital MLM',
        duration: '45min',
        lessons: [
          'Introduction au marketing digital MLM',
          'Définir sa stratégie et ses objectifs',
          'Choisir les bonnes plateformes'
        ]
      },
      {
        module: 'Module 2 : Création de Contenu',
        duration: '50min',
        lessons: [
          'Créer du contenu qui convertit',
          'Storytelling pour le MLM',
          'Planification et automatisation'
        ]
      },
      {
        module: 'Module 3 : Lead Generation',
        duration: '40min',
        lessons: [
          'Techniques de génération de leads',
          'Entonnoirs de conversion',
          'Suivi et qualification des prospects'
        ]
      },
      {
        module: 'Module 4 : Mesure et Optimisation',
        duration: '15min',
        lessons: [
          'Analytics et KPIs essentiels',
          'Optimisation continue',
          'Cas pratiques et exemples'
        ]
      }
    ],
    skills: ['Réseaux sociaux', 'Content marketing', 'Lead generation', 'Analytics', 'Automation'],
    testimonials: [
      {
        name: 'Aminata Koné',
        role: 'Distributrice Senior',
        avatar: '👩',
        rating: 5,
        comment: 'Formation exceptionnelle ! J\'ai doublé mon réseau en 3 mois grâce aux techniques apprises.'
      },
      {
        name: 'Mohamed Diarra',
        role: 'Team Leader',
        avatar: '👨',
        rating: 5,
        comment: 'Sarah explique très bien et donne des exemples concrets. Mes ventes ont augmenté de 150%.'
      }
    ],
    features: [
      'Accès à vie au contenu',
      'Certificat de completion',
      'Support communautaire',
      'Mises à jour gratuites',
      'Ressources téléchargeables',
      'Webinaires bonus mensuels'
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">{formation.image}</div>
              <div className="space-y-2">
                <div className="flex justify-center gap-2">
                  <Badge variant="secondary">{formation.category}</Badge>
                  <Badge variant="secondary">{formation.level}</Badge>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold">{formation.title}</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  {formation.description}
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{formation.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{formation.students.toLocaleString()} étudiants</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>{formation.rating}/5 ({formation.students} avis)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Certificat inclus</span>
                </div>
              </div>
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
                  <BookOpen className="w-5 h-5" />
                  Description de la formation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {formation.longDescription.split('\n').map((paragraph, index) => (
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
                  Objectifs d'apprentissage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {formation.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Program */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Programme détaillé
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {formation.program.map((module, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{module.module}</h4>
                        <Badge variant="outline">{module.duration}</Badge>
                      </div>
                      <ul className="space-y-2 ml-4">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {lesson}
                          </li>
                        ))}
                      </ul>
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
                  Votre instructeur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="text-center sm:text-left">
                    <div className="text-4xl mb-2">{formation.instructor.avatar}</div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="font-semibold text-lg">{formation.instructor.name}</h4>
                      <p className="text-muted-foreground">{formation.instructor.title}</p>
                    </div>
                    <p className="text-sm leading-relaxed">{formation.instructor.bio}</p>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{formation.instructor.rating}/5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{formation.instructor.students.toLocaleString()} étudiants</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Témoignages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {formation.testimonials.map((testimonial, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">{testimonial.avatar}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-semibold">{testimonial.name}</h5>
                            <Badge variant="outline" className="text-xs">{testimonial.role}</Badge>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground italic">"{testimonial.comment}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Pricing Card */}
              <Card className="gradient-card">
                <CardContent className="p-6 space-y-4">
                  <div className="text-center">
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-primary">{formation.price}</div>
                      {formation.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          {formation.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-semibold">Prochaines sessions :</h4>
                    {formation.nextSessions.slice(0, 2).map((session, index) => (
                      <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted/50 rounded">
                        <div>
                          <div className="font-medium">{session.date}</div>
                          <div className="text-muted-foreground">{session.time}</div>
                        </div>
                        <Badge variant={session.spots < 10 ? "default" : "secondary"} className="text-xs">
                          {session.spots} places
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full gradient-primary text-lg py-3">
                    S'inscrire à la formation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Cette formation inclut :</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {formation.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Compétences acquises :</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {formation.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Guarantee */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-green-800 mb-1">Garantie Satisfait ou Remboursé</h4>
                  <p className="text-xs text-green-700">30 jours pour changer d'avis</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormationDetailsVitrine;