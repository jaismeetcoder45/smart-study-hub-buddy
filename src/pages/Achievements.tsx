
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Award, File, Upload } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  category: string;
  description: string;
  proofFile?: File | null;
  hasProof: boolean;
}

const AchievementCard: React.FC<{achievement: Achievement}> = ({ achievement }) => {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{achievement.title}</CardTitle>
            <CardDescription>Category: {achievement.category}</CardDescription>
          </div>
          <div className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
            {achievement.hasProof ? 'Proof Uploaded' : 'No Proof'}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{achievement.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end pt-0">
        {achievement.hasProof && (
          <Button variant="outline" size="sm" className="text-xs">
            <File className="h-3 w-3 mr-1" />
            View Proof
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const Achievements = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Dean\'s List',
      category: 'Academic',
      description: 'Achieved Dean\'s List status for maintaining a GPA of 3.8 in the Fall semester.',
      hasProof: true
    },
    {
      id: '2',
      title: 'Basketball Tournament',
      category: 'Sports',
      description: 'Runner-up in the inter-college basketball tournament.',
      hasProof: false
    }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !category || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title,
      category,
      description,
      proofFile: file,
      hasProof: !!file
    };
    
    setAchievements([newAchievement, ...achievements]);
    
    toast({
      title: "Achievement Added!",
      description: "Your achievement has been recorded successfully."
    });
    
    // Reset form
    setTitle('');
    setCategory('');
    setDescription('');
    setFile(null);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Award className="h-8 w-8 mr-3 text-sc-purple" />
          <h1 className="text-3xl font-bold">Achievements</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Add New Achievement</CardTitle>
                <CardDescription>
                  Record your academic, sports, or extracurricular achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Achievement Title</Label>
                    <Input 
                      id="title" 
                      placeholder="e.g., Dean's List, Tournament Winner" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Sports">Sports</SelectItem>
                        <SelectItem value="Extra-Curricular">Extra-Curricular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Describe your achievement" 
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="proof">Upload Proof (Optional)</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="proof"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG or PDF (MAX. 10MB)
                          </p>
                        </div>
                        <Input 
                          id="proof" 
                          type="file" 
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    {file && (
                      <p className="text-xs text-muted-foreground">
                        Selected file: {file.name}
                      </p>
                    )}
                  </div>
                  
                  <Button type="submit" className="w-full">Add Achievement</Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-7">
            <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
            {achievements.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-muted/30 rounded-lg">
                <Award className="h-12 w-12 mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No achievements yet. Add your first one!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Achievements;
