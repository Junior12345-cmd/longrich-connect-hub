import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  Plus, 
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Smile,
  Send,
  Circle,
  CheckCheck
} from 'lucide-react';

const Messagerie = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Marie Kouassi',
      lastMessage: 'Parfait ! Merci pour l\'info',
      timestamp: '14:30',
      unread: 2,
      online: true,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      name: 'Jean Baptiste',
      lastMessage: 'On se voit demain pour la formation ?',
      timestamp: '13:45',
      unread: 0,
      online: true,
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      name: 'Équipe Abidjan',
      lastMessage: 'Sarah: Super événement hier !',
      timestamp: '12:20',
      unread: 5,
      online: false,
      avatar: '/api/placeholder/40/40',
      isGroup: true
    },
    {
      id: 4,
      name: 'Aminata Traoré',
      lastMessage: 'Merci pour ton aide',
      timestamp: 'Hier',
      unread: 0,
      online: false,
      avatar: '/api/placeholder/40/40'
    }
  ];

  const currentMessages = [
    {
      id: 1,
      sender: 'Marie Kouassi',
      content: 'Salut ! J\'ai vu ton post sur la nouvelle formation',
      timestamp: '14:25',
      isMe: false,
      status: 'read'
    },
    {
      id: 2,
      sender: 'Moi',
      content: 'Oui ! C\'est vraiment intéressant. Tu comptes t\'inscrire ?',
      timestamp: '14:27',
      isMe: true,
      status: 'read'
    },
    {
      id: 3,
      sender: 'Marie Kouassi',
      content: 'Absolument ! On peut s\'inscrire ensemble si tu veux',
      timestamp: '14:28',
      isMe: false,
      status: 'read'
    },
    {
      id: 4,
      sender: 'Moi',
      content: 'Parfait ! Merci pour l\'info',
      timestamp: '14:30',
      isMe: true,
      status: 'delivered'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logic to send message
      setNewMessage('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)]">
        
        {/* Conversations List */}
        <div className="lg:w-1/3 space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
              Messages
            </h1>
            <p className="text-muted-foreground">
              Restez connecté avec votre communauté
            </p>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Rechercher..." className="pl-10" />
            </div>
            <Button size="icon" className="gradient-primary">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <Card className="gradient-card h-full">
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedChat(conversation.id)}
                    className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors border-b border-border last:border-b-0 ${
                      selectedChat === conversation.id ? 'bg-primary/10' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback>
                              {conversation.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <Circle className="absolute -bottom-1 -right-1 w-3 h-3 fill-green-500 text-green-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium truncate">{conversation.name}</p>
                            <div className="flex items-center gap-2">
                              {conversation.unread > 0 && (
                                <Badge variant="default" className="text-xs min-w-[20px] h-5">
                                  {conversation.unread}
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {conversation.timestamp}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:w-2/3 flex flex-col">
          <Card className="gradient-card flex-1 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src="/api/placeholder/40/40" />
                      <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <Circle className="absolute -bottom-1 -right-1 w-3 h-3 fill-green-500 text-green-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Marie Kouassi</CardTitle>
                    <p className="text-sm text-muted-foreground">En ligne</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isMe
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs opacity-70">{message.timestamp}</span>
                        {message.isMe && (
                          <CheckCheck className={`w-3 h-3 ${
                            message.status === 'read' ? 'text-blue-400' : 'opacity-70'
                          }`} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-end gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} className="gradient-primary">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messagerie;