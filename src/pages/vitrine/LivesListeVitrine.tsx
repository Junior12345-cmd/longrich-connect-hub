import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  Clock,
  Users,
  Video,
  Search,
  Filter,
  Play,
  ArrowRight,
  Zap,
  Star,
  Eye,
  ChevronLeft,
  ChevronRight,
  Plus,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import CreateLiveForm from '@/components/CreateLiveForm';

const LivesListeVitrine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPageUpcoming, setCurrentPageUpcoming] = useState(1);
  const [currentPagePast, setCurrentPagePast] = useState(1);
  const itemsPerPage = 3;
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [lives, setLives] = useState({
    upcoming: [] as any[],
    past: [] as any[]
  });

  const defaultUpcomingLives = [
    {
      id: 1,
      title: 'Techniques de Vente 2024',
      description: 'Découvrez les dernières techniques de vente qui fonctionnent réellement dans le MLM moderne.',
      instructor: {
        name: 'Marie Diallo',
        title: 'Expert Vente MLM',
        avatar: '👩‍💼'
      },
      date: '2024-12-15',
      time: '20:00',
      timezone: 'GMT',
      duration: '90 min',
      participants: 45,
      maxParticipants: 100,
      price: 'GRATUIT',
      category: 'Vente',
      level: 'Intermédiaire',
      image: '🎯',
      status: 'upcoming',
      meetingLink: 'https://zoom.us/j/123456789',
      platform: 'zoom',
      tags: ['Live', 'Gratuit', 'Interactif']
    },
    {
      id: 2,
      title: 'Leadership d\'Équipe Performant',
      description: 'Comment motiver et diriger une équipe MLM vers le succès.',
      instructor: {
        name: 'Jean Baptiste',
        title: 'Team Leader Senior',
        avatar: '👨‍💼'
      },
      date: '2024-12-20',
      time: '19:00',
      timezone: 'GMT',
      duration: '120 min',
      participants: 23,
      maxParticipants: 50,
      price: '5,000 FCFA',
      category: 'Leadership',
      level: 'Avancé',
      image: '👥',
      status: 'upcoming',
      meetingLink: 'https://meet.google.com/abc-defg-hij',
      platform: 'google-meet',
      tags: ['Premium', 'Certification']
    },
    {
      id: 3,
      title: 'Marketing Digital pour Débutants',
      description: 'Les bases du marketing digital appliquées au MLM.',
      instructor: {
        name: 'Sarah Johnson',
        title: 'Digital Marketing Expert',
        avatar: '👩‍🎓'
      },
      date: '2024-12-25',
      time: '18:00',
      timezone: 'GMT',
      duration: '60 min',
      participants: 67,
      maxParticipants: 150,
      price: 'GRATUIT',
      category: 'Marketing',
      level: 'Débutant',
      image: '📈',
      status: 'upcoming',
      meetingLink: 'https://zoom.us/j/987654321',
      platform: 'zoom',
      tags: ['Live', 'Gratuit', 'Débutant']
    }
  ];

  // Combine default lives with custom lives
  const upcomingLives = [...defaultUpcomingLives, ...lives.upcoming];

  const defaultPastLives = [
    {
      id: 4,
      title: 'Gestion Financière MLM',
      description: 'Gérez efficacement vos finances dans le MLM.',
      instructor: {
        name: 'Pierre Kouassi',
        title: 'Consultant Financier',
        avatar: '👨‍💻'
      },
      date: '2024-12-01',
      time: '20:00',
      timezone: 'GMT',
      duration: '90 min',
      participants: 89,
      maxParticipants: 100,
      price: '10,000 FCFA',
      category: 'Finance',
      level: 'Intermédiaire',
      image: '💰',
      status: 'completed',
      rating: 4.8,
      views: 234,
      meetingLink: 'https://youtube.com/watch?v=example',
      platform: 'youtube',
      tags: ['Replay', 'Premium']
    },
    {
      id: 5,
      title: 'Communication Persuasive',
      description: 'Maîtrisez l\'art de la persuasion dans vos interactions.',
      instructor: {
        name: 'Fatou Sow',
        title: 'Coach Communication',
        avatar: '👩'
      },
      date: '2024-11-28',
      time: '19:30',
      timezone: 'GMT',
      duration: '75 min',
      participants: 156,
      maxParticipants: 200,
      price: 'GRATUIT',
      category: 'Communication',
      level: 'Débutant',
      image: '🗣️',
      status: 'completed',
      rating: 4.9,
      views: 445,
      meetingLink: 'https://youtube.com/watch?v=example2',
      platform: 'youtube',
      tags: ['Replay', 'Gratuit']
    }
  ];

  // Combine default lives with custom lives
  const pastLives = [...defaultPastLives, ...lives.past];

  const allLives = [...upcomingLives, ...pastLives];
  
  const filteredUpcomingLives = upcomingLives.filter(live => {
    const matchesSearch = live.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         live.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || live.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const filteredPastLives = pastLives.filter(live => {
    const matchesSearch = live.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         live.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || live.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const totalPagesUpcoming = Math.ceil(filteredUpcomingLives.length / itemsPerPage);
  const totalPagesPast = Math.ceil(filteredPastLives.length / itemsPerPage);

  const paginatedUpcomingLives = filteredUpcomingLives.slice(
    (currentPageUpcoming - 1) * itemsPerPage,
    currentPageUpcoming * itemsPerPage
  );

  const paginatedPastLives = filteredPastLives.slice(
    (currentPagePast - 1) * itemsPerPage,
    currentPagePast * itemsPerPage
  );

  const categories = [...new Set(allLives.map(live => live.category))];

  const getTimeUntilLive = (date: string, time: string) => {
    const liveDateTime = new Date(`${date}T${time}:00Z`);
    const now = new Date();
    const diff = liveDateTime.getTime() - now.getTime();
    
    if (diff <= 0) return 'En cours';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `Dans ${days} jour${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Dans ${hours}h`;
    return 'Bientôt';
  };

  const LiveCard = ({ live }: { live: any }) => (
    <Card className="gradient-card hover:shadow-xl transition-all duration-300">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="text-4xl">{live.image}</div>
          <div className="flex gap-1">
            {live.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant={tag === 'Gratuit' ? 'secondary' : tag === 'Premium' ? 'default' : 'outline'}
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{live.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{live.description}</p>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="text-2xl">{live.instructor.avatar}</div>
          <div>
            <div className="font-medium">{live.instructor.name}</div>
            <div className="text-muted-foreground text-xs">{live.instructor.title}</div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
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
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{live.participants} inscrits</span>
              {live.maxParticipants && (
                <span className="text-muted-foreground">/ {live.maxParticipants}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              <span>{live.duration}</span>
            </div>
          </div>

          {live.status === 'completed' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{live.rating}/5</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{live.views} vues</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <div className="font-bold text-primary text-lg">{live.price}</div>
            {live.status === 'upcoming' && (
              <div className="text-xs text-muted-foreground">
                {getTimeUntilLive(live.date, live.time)}
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            {live.status === 'upcoming' && live.meetingLink && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleJoinLive(live)}
                className="flex-1"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Rejoindre
              </Button>
            )}
            <Button asChild className="gradient-primary flex-1">
              <Link to={`/live/${live.id}`}>
                {live.status === 'upcoming' ? (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Détails
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Regarder
                  </>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const handlePageChange = (tab: string, newPage: number) => {
    if (tab === 'upcoming' && newPage >= 1 && newPage <= totalPagesUpcoming) {
      setCurrentPageUpcoming(newPage);
    } else if (tab === 'past' && newPage >= 1 && newPage <= totalPagesPast) {
      setCurrentPagePast(newPage);
    }
  };

  const handleCreateLive = (newLive: any) => {
    setLives(prev => ({
      ...prev,
      upcoming: [...prev.upcoming, newLive]
    }));
  };

  const handleJoinLive = (live: any) => {
    if (live.meetingLink) {
      window.open(live.meetingLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="gradient-primary bg-clip-text text-dark">Lives & Webinaires</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Participez à nos événements en direct et accédez aux replays de nos meilleurs webinaires MLM.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Video className="w-4 h-4 mr-2" />
              Lives interactifs
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Experts reconnus
            </Badge>
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Play className="w-4 h-4 mr-2" />
              Replays disponibles
            </Badge>
          </div>
          
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="gradient-primary text-lg px-8 py-4"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Créer un Live
          </Button>
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
                placeholder="Rechercher un live ou webinaire..."
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
          </div>

          {/* Tabs */}
          <Tabs defaultValue="upcoming" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:w-96 mx-auto">
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Prochains Lives
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center gap-2">
                <Play className="w-4 h-4" />
                Replays
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">🔴 Prochains Lives</h2>
                <p className="text-muted-foreground">
                  {filteredUpcomingLives.length} événement{filteredUpcomingLives.length > 1 ? 's' : ''} à venir
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedUpcomingLives.map((live) => (
                  <LiveCard key={live.id} live={live} />
                ))}
              </div>

              {totalPagesUpcoming > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange('upcoming', currentPageUpcoming - 1)}
                    disabled={currentPageUpcoming === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPagesUpcoming }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPageUpcoming === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange('upcoming', page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange('upcoming', currentPageUpcoming + 1)}
                    disabled={currentPageUpcoming === totalPagesUpcoming}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">📺 Replays Disponibles</h2>
                <p className="text-muted-foreground">
                  {filteredPastLives.length} replay{filteredPastLives.length > 1 ? 's' : ''} disponible{filteredPastLives.length > 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPastLives.map((live) => (
                  <LiveCard key={live.id} live={live} />
                ))}
              </div>

              {totalPagesPast > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange('past', currentPagePast - 1)}
                    disabled={currentPagePast === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  {Array.from({ length: totalPagesPast }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPagePast === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange('past', page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange('past', currentPagePast + 1)}
                    disabled={currentPagePast === totalPagesPast}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary text-dark">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-bold">🎯 Ne manquez aucun événement</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Créez votre compte pour être notifié des prochains lives et accéder aux replays exclusifs.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
            Créer un compte gratuit
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <CreateLiveForm 
        open={showCreateForm} 
        onClose={() => setShowCreateForm(false)}
        onSubmit={handleCreateLive}
      />
    </div>
  );
};

export default LivesListeVitrine;