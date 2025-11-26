import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, FileQuestion, Edit, Trash2, Clock, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const FacultyTests = () => {
  const { toast } = useToast();
  const [tests, setTests] = useState([
    { id: 1, title: "Data Structures Midterm", course: "CS 201", questions: 20, duration: "60 min", attempts: 45, status: "active" },
    { id: 2, title: "Algorithms Quiz 1", course: "CS 301", questions: 15, duration: "45 min", attempts: 38, status: "active" },
  ]);
  const [newTest, setNewTest] = useState({ title: "", course: "", duration: "", questions: "" });

  const handleCreateTest = () => {
    if (!newTest.title || !newTest.course) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    const test = {
      id: tests.length + 1,
      title: newTest.title,
      course: newTest.course,
      questions: parseInt(newTest.questions) || 0,
      duration: newTest.duration,
      attempts: 0,
      status: "active"
    };
    setTests([...tests, test]);
    setNewTest({ title: "", course: "", duration: "", questions: "" });
    toast({ title: "Success", description: "Test created successfully!" });
  };

  const handleDelete = (id: number) => {
    setTests(tests.filter(t => t.id !== id));
    toast({ title: "Success", description: "Test deleted successfully!" });
  };

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
              My Tests
            </h1>
            <p className="text-muted-foreground">Create and manage tests</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-cyan-glow hover:shadow-glow transition-all">
                <Plus className="w-4 h-4 mr-2" />
                Create Test
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border/50 max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Test</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Test Title *</Label>
                  <Input 
                    placeholder="Midterm Exam..." 
                    className="bg-secondary/30 border-border/50"
                    value={newTest.title}
                    onChange={(e) => setNewTest({...newTest, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Course *</Label>
                    <Input 
                      placeholder="CS 201" 
                      className="bg-secondary/30 border-border/50"
                      value={newTest.course}
                      onChange={(e) => setNewTest({...newTest, course: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Duration (minutes)</Label>
                    <Input 
                      type="number" 
                      placeholder="60" 
                      className="bg-secondary/30 border-border/50"
                      value={newTest.duration}
                      onChange={(e) => setNewTest({...newTest, duration: e.target.value + " min"})}
                    />
                  </div>
                </div>
                <div>
                  <Label>Total Questions</Label>
                  <Input 
                    type="number" 
                    placeholder="20" 
                    className="bg-secondary/30 border-border/50"
                    value={newTest.questions}
                    onChange={(e) => setNewTest({...newTest, questions: e.target.value})}
                  />
                </div>
                <Button onClick={handleCreateTest} className="w-full bg-gradient-to-r from-primary to-cyan-glow">
                  Create Test
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center">
                <FileQuestion className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{tests.length}</p>
                <p className="text-sm text-muted-foreground">Total Tests</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{tests.reduce((acc, t) => acc + t.attempts, 0)}</p>
                <p className="text-sm text-muted-foreground">Total Attempts</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-glow to-accent flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{tests.filter(t => t.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active Tests</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6">My Tests</h2>
          <div className="space-y-4">
            {tests.map((test) => (
              <div
                key={test.id}
                className="p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg text-foreground">{test.title}</h3>
                      <Badge className="bg-green-500/20 text-green-500 border-green-500/30">{test.status}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {test.course}
                      </Badge>
                      <span>{test.questions} questions</span>
                      <span>{test.duration}</span>
                      <span>{test.attempts} attempts</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(test.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FacultyTests;
