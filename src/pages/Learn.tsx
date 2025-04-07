
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Bookmark, GraduationCap, Book } from 'lucide-react';

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
    </Layout>
  );
};

export default Learn;
