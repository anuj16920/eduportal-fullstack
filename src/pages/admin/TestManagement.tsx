import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, FileQuestion, Edit, Trash2, Clock, Users, CheckCircle, Target, TrendingUp, Award } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const testData = [
  { id: 1, title: "Data Structures Midterm", course: "CS 201", questions: 20, duration: "60 min", totalAttempts: 45, avgScore: 78, status: "active" },
  { id: 2, title: "Algorithms Quiz 1", course: "CS 301", questions: 15, duration: "45 min", totalAttempts: 38, avgScore: 82, status: "active" },
  { id: 3, title: "Web Development Final", course: "CS 202", questions: 30, duration: "90 min", totalAttempts: 52, avgScore: 85, status: "inactive" },
  { id: 4, title: "Database Systems Quiz", course: "CS 203", questions: 10, duration: "30 min", totalAttempts: 41, avgScore: 76, status: "active" },
];

const TestManagement = () => {
  const { toast } = useToast();
  const [tests, setTests] = useState(testData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTest, setNewTest] = useState({
    title: "", course: "", duration: "", questions: ""
  });

  const handleCreateTest = () => {
    if (!newTest.title || !newTest.course || !newTest.duration) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    const test = {
      id: tests.length + 1,
      title: newTest.title,
      course: newTest.course,
      questions: parseInt(newTest.questions) || 10,
      duration: `${newTest.duration} min`,
      totalAttempts: 0,
      avgScore: 0,
      status: "active" as const
    };
    setTests([...tests, test]);
    setNewTest({ title: "", course: "", duration: "", questions: "" });
    setDialogOpen(false);
    toast({ title: "Success!", description: "Test created successfully" });
  };

  const handleDeleteTest = (id: number) => {
    setTests(tests.filter(t => t.id !== id));
    toast({ title: "Deleted", description: "Test removed successfully" });
  };

  const toggleTestStatus = (id: number) => {
    setTests(tests.map(t => 
      t.id === id ? { ...t, status: t.status === "active" ? "inactive" as const : "active" as const } : t
    ));
    toast({ title: "Updated", description: "Test status changed" });
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
              Test Management
            </h1>
            <p className="text-muted-foreground">Create and manage tests</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                  <Label>Test Title</Label>
                  <Input 
                    placeholder="Midterm Exam..." 
                    className="bg-secondary/30 border-border/50"
                    value={newTest.title}
                    onChange={(e) => setNewTest({...newTest, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Course</Label>
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
                      onChange={(e) => setNewTest({...newTest, duration: e.target.value})}
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
                <div className="space-y-3 p-4 rounded-lg bg-secondary/30 border border-border/30">
                  <h3 className="font-semibold text-foreground">Add Questions</h3>
                  <div>
                    <Label>Question 1</Label>
                    <Input placeholder="What is a data structure?" className="bg-background/50 border-border/50 mb-2" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="Option A" className="bg-background/50 border-border/50" />
                      <Input placeholder="Option B" className="bg-background/50 border-border/50" />
                      <Input placeholder="Option C" className="bg-background/50 border-border/50" />
                      <Input placeholder="Option D" className="bg-background/50 border-border/50" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Question
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/30">
                  <div>
                    <p className="font-medium text-foreground">Activate Test</p>
                    <p className="text-sm text-muted-foreground">Make test available to students</p>
                  </div>
                  <Switch />
                </div>
                <Button onClick={handleCreateTest} className="w-full bg-gradient-to-r from-primary to-cyan-glow">
                  Create Test
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center">
                <FileQuestion className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{testData.length}</p>
                <p className="text-sm text-muted-foreground">Total Tests</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Active Tests</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-glow to-accent flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">176</p>
                <p className="text-sm text-muted-foreground">Total Attempts</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">80%</p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6">All Tests</h2>
          <div className="space-y-4">
            {tests.map((test) => (
              <div
                key={test.id}
                className="p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg text-foreground">{test.title}</h3>
                      <Badge variant={test.status === 'active' ? 'default' : 'secondary'} className={
                        test.status === 'active' 
                          ? 'bg-green-500/20 text-green-500 border-green-500/30' 
                          : 'bg-muted/50 text-muted-foreground'
                      }>
                        {test.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {test.course}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <FileQuestion className="w-4 h-4" />
                        {test.questions} questions
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {test.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {test.totalAttempts} attempts
                      </span>
                      <span className="font-semibold text-primary">
                        Avg: {test.avgScore}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className={test.status === "active" ? "hover:bg-accent/10 hover:text-accent" : "hover:bg-green-500/10 hover:text-green-500"}
                      onClick={() => toggleTestStatus(test.id)}
                    >
                      {test.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDeleteTest(test.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Pass Rate</h3>
              </div>
            </div>
            <p className="text-3xl font-bold text-primary mb-2">85%</p>
            <p className="text-sm text-muted-foreground">Students passing tests</p>
          </Card>

          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Participation</h3>
              </div>
            </div>
            <p className="text-3xl font-bold text-accent mb-2">92%</p>
            <p className="text-sm text-muted-foreground">Average participation rate</p>
          </Card>

          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-glow to-accent flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Top Scorer</h3>
              </div>
            </div>
            <p className="text-3xl font-bold text-cyan-glow mb-2">98%</p>
            <p className="text-sm text-muted-foreground">Highest test score achieved</p>
          </Card>
        </div>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4">Test Analytics</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Recent Performance</h3>
              <div className="space-y-3">
                {["Data Structures", "Algorithms", "Web Development"].map((course, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{course}</span>
                      <span className="text-sm font-bold text-primary">{[82, 78, 88][i]}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-cyan-glow rounded-full"
                        style={{ width: `${[82, 78, 88][i]}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Question Distribution</h3>
              <div className="space-y-3">
                {[
                  { type: "Multiple Choice", count: 120, color: "from-primary to-cyan-glow" },
                  { type: "True/False", count: 45, color: "from-accent to-primary" },
                  { type: "Short Answer", count: 30, color: "from-cyan-glow to-accent" }
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/30 border border-border/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`} />
                        <span className="text-sm font-medium text-foreground">{item.type}</span>
                      </div>
                      <span className="text-sm font-bold text-primary">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4">Difficulty Analysis</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { level: "Easy", percentage: 35, color: "bg-green-500" },
              { level: "Medium", percentage: 45, color: "bg-accent" },
              { level: "Hard", percentage: 20, color: "bg-destructive" }
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">{item.level}</span>
                  <span className="text-sm font-bold text-primary">{item.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TestManagement;
