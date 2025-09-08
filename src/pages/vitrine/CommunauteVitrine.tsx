import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunauteVitrine = () => {
  return (
    <div className="min-h-screen bg-background">

      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="gradient-primary bg-clip-text text-transparent">Communauté</span>
            <br />d'Entrepreneurs
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Rejoignez 10,000+ entrepreneurs MLM qui s'entraident et développent leur réseau ensemble.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="gradient-card text-center">
              <CardContent className="p-6 space-y-4">
                <MessageCircle className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-xl font-semibold">Messagerie Privée</h3>
                <p className="text-muted-foreground">Échangez avec des stockistes de votre région</p>
              </CardContent>
            </Card>
            <Card className="gradient-card text-center">
              <CardContent className="p-6 space-y-4">
                <Users className="w-12 h-12 mx-auto text-secondary" />
                <h3 className="text-xl font-semibold">Forum d'Entraide</h3>
                <p className="text-muted-foreground">Partagez vos succès et obtenez des conseils</p>
              </CardContent>
            </Card>
            <Card className="gradient-card text-center">
              <CardContent className="p-6 space-y-4">
                <TrendingUp className="w-12 h-12 mx-auto text-accent" />
                <h3 className="text-xl font-semibold">Networking</h3>
                <p className="text-muted-foreground">Développez votre réseau professionnel</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-bold">Prêt à Rejoindre la Communauté ?</h2>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
            Accéder à la Communauté <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CommunauteVitrine;