import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Clock, Users, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const FacultyAssignments = () => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Binary Search Implementation", course: "CS 201", deadline: "2025-12-01", submissions: 28, total: 45 },
    { id: 2, title: "Database Design Project", course: "CS 203", deadline: "2025-12-05", submissions: 35, total: 40 },
  ]);
  const [newAssignment, setNewAssignment] = useState({ title: "", course: "", deadline: "", description: "" });

  const handleCreate = () => {
    if (!newAssignment.title || !newAssignment.course || !newAssignment.deadline) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }
    const assignment = {
      id: assignments.length + 1,
      ...newAssignment,
      submissions: 0,
      total: 45
    };
    setAssignments([...assignments, assignment]);
    setNewAssignment({ title: "", course: "", deadline: "", description: "" });
    toast({ title: "Success", description: "Assignment created successfully!" });
  };

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
              My Assignments
            </h1>
            <p className="text-muted-foreground">Create and manage assignments</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-cyan-glow hover:shadow-glow transition-all">
                <Plus className="w-4 h-4 mr-2" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border/50 max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Assignment Title *</Label>
                  <Input 
                    placeholder="Binary Search Implementation..." 
                    className="bg-secondary/30 border-border/50"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Course *</Label>
                    <Input 
                      placeholder="CS 201" 
                      className="bg-secondary/30 border-border/50"
                      value={newAssignment.course}
                      onChange={(e) => setNewAssignment({...newAssignment, course: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Deadline *</Label>
                    <Input 
                      type="date" 
                      className="bg-secondary/30 border-border/50"
                      value={newAssignment.deadline}
                      onChange={(e) => setNewAssignment({...newAssignment, deadline: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea 
                    placeholder="Assignment details..." 
                    className="bg-secondary/30 border-border/50 min-h-[100px]"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  />
                </div>
                <Button onClick={handleCreate} className="w-full bg-gradient-to-r from-primary to-cyan-glow">
                  Create Assignment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{assignments.length}</p>
                <p className="text-sm text-muted-foreground">Total Assignments</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{assignments.reduce((acc, a) => acc + a.submissions, 0)}</p>
                <p className="text-sm text-muted-foreground">Submissions</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-glow to-accent flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">85%</p>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6">All Assignments</h2>
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-2">{assignment.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {assignment.course}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Due: {assignment.deadline}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {assignment.submissions}/{assignment.total} submitted
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary">
                    View Submissions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default FacultyAssignments;
