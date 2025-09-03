import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Image, 
  Video, 
  Smile,
  MapPin,
  Users,
  TrendingUp
} from 'lucide-react';

const Communaute = () => {
  const [newPost, setNewPost] = useState('');

  const posts = [
    {
      id: 1,
      author: {
        name: 'Marie Kouassi',
        avatar: '/api/placeholder/40/40',
        location: 'Abidjan, Côte d\'Ivoire',
        verified: true
      },
      timestamp: '2 heures',
      content: 'Excellents résultats ce mois-ci ! Merci à toute mon équipe pour leur dévouement. Ensemble, nous atteignons nos objectifs 🎉 #TeamWork #LongrichFamily',
      image: '/api/placeholder/500/300',
      likes: 24,
      comments: 8,
      shares: 3,
      hashtags: ['TeamWork', 'LongrichFamily']
    },
    {
      id: 2,
      author: {
        name: 'Jean Baptiste',
        avatar: '/api/placeholder/40/40',
        location: 'Dakar, Sénégal',
        verified: true
      },
      timestamp: '5 heures',
      content: 'Formation de leadership ce weekend à Dakar ! Qui veut se joindre à nous ? Places limitées disponibles. Contact en MP.',
      likes: 18,
      comments: 12,
      shares: 6,
      hashtags: ['Formation', 'Leadership']
    },
    {
      id: 3,
      author: {
        name: 'Aminata Traoré',
        avatar: '/api/placeholder/40/40',
        location: 'Bamako, Mali',
        verified: false
      },
      timestamp: '1 jour',
      content: 'Nouvelle dans la communauté ! Heureuse de faire partie de cette grande famille Longrich. Hâte de partager cette aventure avec vous tous ! 🌟',
      likes: 45,
      comments: 23,
      shares: 8,
      hashtags: ['Nouvelle', 'Bienvenue']
    }
  ];

  const trendingTopics = [
    { tag: 'LongrichFamily', posts: 1247 },
    { tag: 'TeamWork', posts: 892 },
    { tag: 'Formation', posts: 567 },
    { tag: 'Success', posts: 445 }
  ];

  const suggestedUsers = [
    { name: 'Fatou Diallo', location: 'Conakry', followers: '2.1k', mutual: 12 },
    { name: 'Pierre Koné', location: 'Ouagadougou', followers: '1.8k', mutual: 8 },
    { name: 'Khadija Ben', location: 'Casablanca', followers: '3.4k', mutual: 15 }
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4" />
                Tendances
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">#{topic.tag}</span>
                  <span className="text-xs text-muted-foreground">{topic.posts}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4" />
                Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {suggestedUsers.map((user, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.location}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full text-xs">
                    Suivre
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              Communauté Longrich
            </h1>
            <p className="text-muted-foreground">
              Partagez vos expériences et connectez-vous avec la famille Longrich
            </p>
          </div>

          {/* Create Post */}
          <Card className="gradient-card">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Partagez votre expérience avec la communauté..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[80px] resize-none border-none bg-muted/50 focus:bg-background transition-colors"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Image className="w-4 h-4 mr-1" />
                      Photo
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4 mr-1" />
                      Vidéo
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button className="gradient-primary">
                    Publier
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="gradient-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Post Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>
                            {post.author.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{post.author.name}</p>
                            {post.author.verified && (
                              <Badge variant="secondary" className="text-xs">Vérifié</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{post.author.location}</span>
                            <span>•</span>
                            <span>{post.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="space-y-3">
                      <p className="text-foreground leading-relaxed">{post.content}</p>
                      {post.image && (
                        <div className="rounded-lg overflow-hidden">
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      {post.hashtags && (
                        <div className="flex flex-wrap gap-2">
                          {post.hashtags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-6">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                          <Heart className="w-4 h-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-blue-500">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
                          <Share className="w-4 h-4 mr-1" />
                          {post.shares}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block space-y-4">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="text-sm">Activité récente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p><span className="font-medium">Sarah J.</span> a rejoint la communauté</p>
                <p><span className="font-medium">Pierre K.</span> a publié une formation</p>
                <p><span className="font-medium">Marie D.</span> a organisé un live</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Communaute;