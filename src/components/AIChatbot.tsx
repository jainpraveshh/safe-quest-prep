import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m EduShield AI, your disaster preparedness assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-support-chat', {
        body: { message: userMessage.content }
      });

      if (error) {
        console.error('Error sending message:', error);
        
        // Provide helpful emergency tips as fallback
        const fallbackTips = {
          'earthquake': 'During an earthquake: DROP to hands and knees, take COVER under a sturdy desk/table, HOLD ON until shaking stops. Stay away from windows and heavy objects.',
          'fire': 'During a fire: Stay low to avoid smoke, check doors before opening (use back of hand), have 2 escape routes planned, never use elevators.',
          'flood': 'During floods: Move to higher ground immediately, avoid walking/driving through flood water, listen to emergency broadcasts, stay away from electrical lines.',
          'cyclone': 'During cyclones: Stay indoors away from windows, have emergency supplies ready, listen to weather updates, avoid going outside until all-clear is given.',
          'general': 'Key safety tips: Have an emergency kit ready, know your evacuation routes, stay informed through official channels, practice safety drills regularly.'
        };
        
        let responseContent = 'I\'m currently offline, but here are some key safety tips:\n\n';
        
        const userQuery = userMessage.content.toLowerCase();
        if (userQuery.includes('earthquake')) {
          responseContent += fallbackTips.earthquake;
        } else if (userQuery.includes('fire')) {
          responseContent += fallbackTips.fire;
        } else if (userQuery.includes('flood')) {
          responseContent += fallbackTips.flood;
        } else if (userQuery.includes('cyclone')) {
          responseContent += fallbackTips.cyclone;
        } else {
          responseContent += fallbackTips.general;
        }
        
        responseContent += '\n\nFor immediate emergencies, dial:\n🚨 Police: 100\n🚑 Ambulance: 108\n🔥 Fire: 101';
        
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: responseContent,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // This is now handled in the if (error) block above
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg animate-pulse"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 z-50 flex flex-col bg-background border border-border rounded-lg shadow-2xl">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5" />
          EduShield AI
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="h-6 w-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              }`}
            >
              <div className="flex items-center gap-1 mb-1">
                {message.type === 'ai' ? (
                  <Bot className="w-3 h-3" />
                ) : (
                  <User className="w-3 h-3" />
                )}
                <Badge variant="outline" className="text-xs">
                  {formatTime(message.timestamp)}
                </Badge>
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-3 py-2 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about disaster safety..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};