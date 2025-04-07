
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Award, ListTodo, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavCard = ({ 
  to, 
  title, 
  description, 
  icon, 
  className 
}: { 
  to: string; 
  title: string; 
  description: string;
  icon: React.ReactNode;
  className: string;
}) => (
  <Link 
    to={to} 
    className={cn("nav-card", className, "animate-fade-in")}
  >
    <div className="mb-4 p-3 rounded-full bg-white/30">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-sm opacity-90 text-center">{description}</p>
  </Link>
);

const Index = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8">
        <div className="max-w-4xl text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sc-blue via-sc-purple to-sc-teal bg-clip-text text-transparent">
            Welcome to Smart Student Companion
          </h1>
          <p className="text-xl text-muted-foreground">
            Your personal assistant for academic success and organization
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <NavCard 
            to="/achievements" 
            title="Achievements" 
            description="Track and showcase your academic and extracurricular accomplishments"
            icon={<Award size={32} />}
            className="nav-card-1"
          />
          
          <NavCard 
            to="/tasks" 
            title="Task Manager" 
            description="Organize your assignments and never miss a deadline"
            icon={<ListTodo size={32} />}
            className="nav-card-2"
          />
          
          <NavCard 
            to="/learn" 
            title="Learn" 
            description="Access study materials and educational resources"
            icon={<BookOpen size={32} />}
            className="nav-card-3"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
