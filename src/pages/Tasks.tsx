
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format, isWithinInterval, addDays, parseISO, differenceInHours } from 'date-fns';
import { ListTodo, Clock, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

const TaskCard: React.FC<{
  task: Task;
  onComplete: (id: string) => void;
}> = ({ task, onComplete }) => {
  const dueDate = parseISO(task.dueDate);
  const dueIn = differenceInHours(dueDate, new Date());
  const isUrgent = dueIn <= 24 && !task.completed;
  
  return (
    <Card className={cn(
      "animate-fade-in border-l-4",
      task.completed ? "border-l-sc-green opacity-60" : (
        isUrgent ? "border-l-sc-coral" : "border-l-sc-blue"
      )
    )}>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center">
            <h3 className={cn(
              "font-semibold",
              task.completed && "line-through"
            )}>{task.title}</h3>
            {isUrgent && !task.completed && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sc-coral/20 text-sc-coral">
                Urgent
              </span>
            )}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>Due: {format(dueDate, 'MMM d, yyyy')}</span>
          </div>
        </div>
        
        <Button 
          size="sm" 
          variant={task.completed ? "outline" : "default"} 
          onClick={() => onComplete(task.id)}
        >
          {task.completed ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-1 text-sc-green" /> Completed
            </>
          ) : (
            "Mark Complete"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

const AISuggestion: React.FC<{
  tasks: Task[];
}> = ({ tasks }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const generateSuggestions = () => {
      const newSuggestions = [];
      
      const pendingTasks = tasks.filter(task => !task.completed);
      const urgentTasks = pendingTasks.filter(task => {
        const dueDate = parseISO(task.dueDate);
        const dueIn = differenceInHours(dueDate, new Date());
        return dueIn <= 24;
      });
      
      if (urgentTasks.length > 0) {
        newSuggestions.push(`You have ${urgentTasks.length} urgent ${urgentTasks.length === 1 ? 'task' : 'tasks'} due in the next 24 hours.`);
      }
      
      if (pendingTasks.length > 3) {
        newSuggestions.push("Consider breaking down your tasks into smaller chunks for better productivity.");
      }
      
      if (pendingTasks.length > 0) {
        newSuggestions.push("Try using the Pomodoro technique: 25 minutes of focused work followed by a 5-minute break.");
      }
      
      if (pendingTasks.length === 0) {
        newSuggestions.push("All your tasks are completed! Great job!");
      } else {
        newSuggestions.push("Consider working on your most challenging task first thing in the morning.");
      }
      
      setSuggestions(newSuggestions);
    };
    
    generateSuggestions();
  }, [tasks]);

  return (
    <Card className="bg-gradient-to-r from-sc-purple/10 to-sc-teal/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-sc-yellow animate-pulse-gentle" />
          AI Suggestions
        </CardTitle>
        <CardDescription>Personalized tips to improve your productivity</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start">
              <div className="h-2 w-2 mt-1.5 rounded-full bg-sc-purple mr-2"></div>
              <span className="text-sm">{suggestion}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const Tasks = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete Math Assignment',
      dueDate: addDays(new Date(), 1).toISOString(),
      completed: false
    },
    {
      id: '2',
      title: 'Research Paper on Environmental Science',
      dueDate: addDays(new Date(), 3).toISOString(),
      completed: false
    },
    {
      id: '3',
      title: 'Study for History Quiz',
      dueDate: addDays(new Date(), 5).toISOString(),
      completed: true
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !dueDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      dueDate: new Date(dueDate).toISOString(),
      completed: false
    };
    
    setTasks([newTask, ...tasks]);
    
    toast({
      title: "Task Added!",
      description: "Your task has been added to your list."
    });
    
    // Reset form
    setTitle('');
    setDueDate('');
  };

  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ));
    
    const task = tasks.find(t => t.id === id);
    
    toast({
      title: task?.completed ? "Task Marked as Incomplete" : "Task Completed!",
      description: task?.completed 
        ? "The task has been moved back to your active list." 
        : "Great job! Keep up the good work."
    });
  };

  // Filter tasks
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <ListTodo className="h-8 w-8 mr-3 text-sc-purple" />
          <h1 className="text-3xl font-bold">Task Manager</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Task</CardTitle>
                <CardDescription>
                  Keep track of your assignments and deadlines
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Complete Math Assignment" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="sm:w-1/3 space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input 
                      id="dueDate" 
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <Button type="submit" className="w-full sm:w-auto">Add Task</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Your Tasks</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="mr-2">{pendingTasks.length} pending</span>•
                  <span className="ml-2">{completedTasks.length} completed</span>
                </div>
              </div>
              
              <ScrollArea className="h-[calc(100vh-380px)] pr-4">
                {pendingTasks.length === 0 && completedTasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/30 rounded-lg">
                    <ListTodo className="h-12 w-12 mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No tasks yet. Add your first task above!</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {pendingTasks.length > 0 && (
                      <div className="space-y-3">
                        <div className="sticky top-0 bg-background py-1">
                          <h3 className="text-sm font-medium text-muted-foreground uppercase">Pending Tasks</h3>
                          <Separator className="mt-1" />
                        </div>
                        {pendingTasks.map((task) => (
                          <TaskCard key={task.id} task={task} onComplete={handleCompleteTask} />
                        ))}
                      </div>
                    )}
                    
                    {completedTasks.length > 0 && (
                      <div className="space-y-3">
                        <div className="sticky top-0 bg-background py-1">
                          <h3 className="text-sm font-medium text-muted-foreground uppercase">Completed Tasks</h3>
                          <Separator className="mt-1" />
                        </div>
                        {completedTasks.map((task) => (
                          <TaskCard key={task.id} task={task} onComplete={handleCompleteTask} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <AISuggestion tasks={tasks} />
            
            <div className="mt-6 bg-gradient-to-br from-sc-blue/20 to-sc-teal/20 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <AlertCircle className="h-5 w-5 mr-2 text-sc-blue" />
                <h3 className="font-medium">Did you know?</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Breaking down large tasks into smaller, manageable chunks can make them feel less 
                overwhelming and increase your productivity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
