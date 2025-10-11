import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  Plus,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';

const Formations = () => {
  const navigate = useNavigate();
  const myLearnings = [
    {
      id: 1,
      title: 'Marketing Digital pour MLM',
      instructor: 'Sarah Johnson',
      progress: 75,
      duration: '2h 30min',
      lessons: 12,
      nextLesson: 'Stratégies Social Media'
    },
    {
      id: 2,
      title: 'Techniques de Vente Avancées',
      instructor: 'Pierre Kouassi',
      progress: 45,
      duration: '3h 15min',
      lessons: 18,
      nextLesson: 'Gestion des objections'
    }
  ];

  const featuredCourses = [
    {
      id: 1,
      title: 'Leadership et Développement d\'Équipe',
      instructor: 'Marie Diallo',
      rating: 4.8,
      students: 1247,
      price: '25,000 FCFA',
      duration: '4h 20min',
      level: 'Intermédiaire',
      image: '📈'
    },
    {
      id: 2,
      title: 'Gestion Financière MLM',
      instructor: 'Jean Baptiste',
      rating: 4.9,
      students: 892,
      price: 'Gratuit',
      duration: '2h 45min',
      level: 'Débutant',
      image: '💰'
    },
    {
      id: 3,
      title: 'Communication Persuasive',
      instructor: 'Aminata Traoré',
      rating: 4.7,
      students: 1456,
      price: '18,000 FCFA',
      duration: '3h 10min',
      level: 'Avancé',
      image: '🗣️'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text">
            Formations & LMS
          </h1>
          <p className="text-muted-foreground">
            Développez vos compétences et créez vos propres formations
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => navigate('/dash/formations-management')}
            className="gradient-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Gérer mes formations
          </Button>
        </div>
      </div>

      {/* My Learning Progress */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Mes formations en cours</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {myLearnings.map((course) => (
            <Card key={course.id} className="gradient-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">par {course.instructor}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {course.lessons} leçons
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{course.progress}%</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Prochaine leçon: <span className="text-foreground">{course.nextLesson}</span>
                    </p>
                  </div>
                  
                  <Button className="w-full gradient-primary">
                    <Play className="w-4 h-4 mr-2" />
                    Continuer
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="gradient-card">
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <TrendingUp className="w-8 h-8 mx-auto text-primary" />
              <h3 className="text-2xl font-bold">87%</h3>
              <p className="text-sm text-muted-foreground">Taux de complétion</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-card">
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <Award className="w-8 h-8 mx-auto text-secondary" />
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-sm text-muted-foreground">Certificats obtenus</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="gradient-card">
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <Clock className="w-8 h-8 mx-auto text-accent" />
              <h3 className="text-2xl font-bold">24h</h3>
              <p className="text-sm text-muted-foreground">Temps d'apprentissage</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Courses */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Formations recommandées</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="gradient-card hover:shadow-lg shadow transition-smooth">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl mb-2">{course.image}</div>
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">par {course.instructor}</p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {course.level}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{course.price}</span>
                    <Button size="sm" className="gradient-primary">
                      S'inscrire
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Formations;