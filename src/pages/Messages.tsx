import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { Navbar } from '@/components/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  File, 
  Image, 
  MoreVertical, 
  Paperclip, 
  Search, 
  Send, 
  Smile 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const chatList = [
  {
    id: 1,
    name: 'Netflix Premium',
    avatar: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png',
    lastMessage: 'Payment received for April',
    time: '10:30 AM',
    unread: 2,
    isGroup: true,
    members: ['John', 'Sarah', 'Michael', 'You']
  },
  {
    id: 2,
    name: 'Spotify Family',
    avatar: 'https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Spotify-512.png',
    lastMessage: 'Can you add my cousin to the plan?',
    time: 'Yesterday',
    unread: 0,
    isGroup: true,
    members: ['Jane', 'David', 'You']
  },
  {
    id: 3,
    name: 'Support Team',
    avatar: 'https://github.com/shadcn.png',
    lastMessage: 'How can we help you today?',
    time: 'Apr 10',
    unread: 0,
    isGroup: false
  }
];

const messages = [
  {
    id: 1,
    senderId: 'other',
    senderName: 'John',
    message: 'Hi everyone! Just wanted to check if everyone has access to the Netflix account?',
    time: '10:00 AM'
  },
  {
    id: 2,
    senderId: 'me',
    senderName: 'You',
    message: 'Yes, I can access it fine. Thanks for setting this up!',
    time: '10:05 AM'
  },
  {
    id: 3,
    senderId: 'other',
    senderName: 'Sarah',
    message: 'I was having trouble logging in yesterday, but it seems to be working now.',
    time: '10:15 AM'
  },
  {
    id: 4,
    senderId: 'other',
    senderName: 'Michael',
    message: 'All good here. By the way, when is the next payment due?',
    time: '10:20 AM'
  },
  {
    id: 5,
    senderId: 'other',
    senderName: 'John',
    message: 'Payment is due on the 15th of each month. I\'ll send a reminder a few days before.',
    time: '10:25 AM'
  },
  {
    id: 6,
    senderId: 'other',
    senderName: 'John',
    message: 'Payment received for April. Thanks everyone!',
    time: '10:30 AM'
  },
];

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(chatList[0]);
  const [messageInput, setMessageInput] = useState('');
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (messageInput.trim().length === 0) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
    
    setMessageInput('');
  };

  return (
    <div className="min-h-screen flex">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          
          <main className="flex-1 flex overflow-hidden">
            {/* Chat list sidebar */}
            <div className="w-full sm:w-80 border-r flex flex-col">
              <div className="p-4 border-b">
                <h2 className="font-semibold text-lg mb-2">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-8 bg-background"
                  />
                </div>
              </div>
              
              <ScrollArea className="flex-1">
                {chatList.map((chat) => (
                  <div 
                    key={chat.id}
                    onClick={() => setSelectedChat(chat)}
                    className={`p-3 flex items-center gap-3 cursor-pointer transition-colors hover:bg-accent ${
                      selectedChat.id === chat.id ? 'bg-accent' : ''
                    }`}
                  >
                    <Avatar>
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <p className="font-medium truncate">{chat.name}</p>
                        <span className="text-xs text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge className="bg-familyPlan-burgundy">{chat.unread}</Badge>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </div>
            
            {/* Chat content */}
            <div className="hidden sm:flex flex-1 flex-col">
              {/* Chat header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedChat.avatar} />
                    <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{selectedChat.name}</h3>
                    {selectedChat.isGroup && (
                      <p className="text-xs text-muted-foreground">
                        {selectedChat.members.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-3 ${
                          msg.senderId === 'me' 
                            ? 'bg-familyPlan-burgundy text-white rounded-br-none' 
                            : 'bg-accent rounded-bl-none'
                        }`}
                      >
                        {msg.senderId !== 'me' && (
                          <p className="text-xs font-medium mb-1">{msg.senderName}</p>
                        )}
                        <p>{msg.message}</p>
                        <p className={`text-xs mt-1 ${msg.senderId === 'me' ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message input */}
              <div className="p-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Image className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <File className="h-5 w-5" />
                  </Button>
                  <Input 
                    placeholder="Type a message..." 
                    className="flex-1"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button 
                    className="bg-familyPlan-burgundy hover:bg-familyPlan-burgundy/90 rounded-full" 
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={messageInput.trim().length === 0}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Empty state for mobile */}
            <div className="flex-1 sm:hidden flex flex-col items-center justify-center p-4 text-center">
              <ArrowRight className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">Choose a chat from the list to start messaging</p>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Messages;
