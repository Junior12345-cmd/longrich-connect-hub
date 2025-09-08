import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Users,
  Star,
  Clock,
  Calendar,
  Play,
  Award,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FormationsVitrine = () => {
  const popularCourses = [
    {
      id: 1,
      title: 'Marketing Digital MLM',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: 1247,
      price: 'GRATUIT',
      duration: '2h 30min',
      level: 'Débutant',
      image: '📈'
    },
    {
      id: 2,
      title: 'Gestion Financière MLM',
      instructor: 'Pierre Kouassi',
      rating: 4.8,
      students: 892,
      price: '25,000 FCFA',
      duration: '3h 15min',
      level: 'Intermédiaire',
      image: '💰'
    }
  ];

  const upcomingLives = [
    {
      title: 'Techniques de Vente 2024',
      instructor: 'Marie Diallo',
      date: 'Demain 20h GMT',
      participants: 45,
      price: 'GRATUIT'
    },
    {
      title: 'Leadership d\'Équipe',
      instructor: 'Jean Baptiste',
      date: 'Vendredi 19h GMT',
      participants: 23,
      price: '5,000 FCFA'
    }
  ];

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="gradient-primary bg-clip-text text-dark">Marketplace de formations</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Développez vos compétences MLM avec nos formations certifiantes et événements live interactifs.
          </p>
          <Button size="lg" className="gradient-primary text-lg px-8 py-4">
            🎁 Suivre une formation gratuite
          </Button>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">🔥 Formations les plus suivies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {popularCourses.map((course) => (
                <Card key={course.id} className="gradient-card">
                  <CardContent className="p-6 space-y-4">
                    <div className="text-center">
                      <div className="text-4xl mb-2">{course.image}</div>
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">Par {course.instructor}</p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}/5</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">{course.price}</div>
                      <Button className="w-full gradient-primary">
                        {course.price === 'GRATUIT' ? 'Commencer maintenant' : 'S\'inscrire'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Lives */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">📅 Prochains Lives</h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              {upcomingLives.map((live, index) => (
                <Card key={index} className="gradient-card">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold">🔴 LIVE : {live.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {live.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {live.participants} inscrits
                        </span>
                      </div>
                      <p className="text-sm">🎤 {live.instructor}</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-primary mb-2">{live.price}</div>
                      <Button size="sm" className="gradient-primary">
                        Réserver ma place
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-primary text-dark">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-bold">🎁 Offre Spéciale Nouveaux Membres</h2>
          <p className="text-xl opacity-90">Votre première formation certifiante OFFERTE</p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
            Suivre une Formation Gratuite
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default FormationsVitrine;