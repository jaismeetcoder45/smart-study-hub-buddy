
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Bookmark, GraduationCap, Book, MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const LearnCard = ({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string;
  icon: React.ReactNode;
}) => (
  <Card className="animate-fade-in hover:shadow-md transition-all">
    <CardHeader className="pb-2">
      <div className="flex items-center">
        <div className="mr-3 p-2 rounded-md bg-muted">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
);

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hi there! How can I help you learn today?' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Add user message
      setMessages([...messages, { type: 'user', content: inputValue }]);
      
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          content: "I'm here to help with your learning journey! If you have questions about study materials or learning paths, feel free to ask."
        }]);
      }, 1000);
      
      setInputValue('');
    }
  };

  return (
    <>
      {/* Chat bubble button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed left-6 bottom-6 z-50 h-14 w-14 rounded-full shadow-lg flex items-center justify-center",
          "bg-sc-purple hover:bg-sc-purple/90 text-white",
          isOpen && "hidden"
        )}
        size="icon"
      >
        <MessageCircle size={24} />
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed left-6 bottom-6 z-50 w-80 md:w-96 rounded-xl shadow-lg bg-white border border-border overflow-hidden animate-fade-in">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-sc-purple/90 to-sc-purple/70 text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle size={20} className="mr-2" />
              <h3 className="font-medium">Learning Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full text-white hover:bg-white/20"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Chat messages */}
          <ScrollArea className="h-64 p-4 bg-gradient-to-b from-sc-purple/5 to-sc-teal/5">
            <div className="flex flex-col gap-3">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "max-w-[80%] p-3 rounded-lg",
                    message.type === 'bot' 
                      ? "bg-muted self-start rounded-bl-none" 
                      : "bg-sc-purple/20 self-end rounded-br-none"
                  )}
                >
                  {message.content}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 rounded-md border focus:outline-none focus:ring-1 focus:ring-sc-purple"
            />
            <Button type="submit" className="bg-sc-purple hover:bg-sc-purple/90 text-white">
              Send
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

const Learn = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <BookOpen className="h-8 w-8 mr-3 text-sc-purple" />
          <h1 className="text-3xl font-bold">Learn</h1>
        </div>
        
        <div className="mb-10">
          <p className="text-lg text-muted-foreground mb-6">
            Access educational resources, study materials, and learning paths to enhance your academic journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LearnCard 
              title="Study Materials" 
              description="Access textbooks, notes, and practice problems for all your subjects."
              icon={<Book className="h-5 w-5 text-sc-blue" />}
            />
            <LearnCard 
              title="Learning Paths" 
              description="Follow guided learning paths created by education experts."
              icon={<Bookmark className="h-5 w-5 text-sc-purple" />}
            />
            <LearnCard 
              title="Educational Videos" 
              description="Watch video lectures and tutorials on various topics."
              icon={<GraduationCap className="h-5 w-5 text-sc-teal" />}
            />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-sc-purple/10 via-sc-blue/10 to-sc-teal/10 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Coming Soon!</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're working on bringing more learning resources to help you excel in your studies.
            Check back soon for updates!
          </p>
        </div>
      </div>
      
      {/* Chatbot component */}
      <ChatBot />
    </Layout>
  );
};

export default Learn;
