import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, ClipboardList, Calendar, Users, CheckCircle, Clock, Eye } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const assignmentData = [
  { 
    id: 1, 
    title: "Binary Tree Implementation", 
    course: "CS 201", 
    deadline: "Dec 30, 2024", 
    submissions: 32, 
    total: 45, 
    avgGrade: "85%",
    status: "ongoing"
  },
  { 
    id: 2, 
    title: "Sorting Algorithm Analysis", 
    course: "CS 301", 
    deadline: "Dec 28, 2024", 
    submissions: 28, 
    total: 38, 
    avgGrade: "78%",
    status: "ongoing"
  },
  { 
    id: 3, 
    title: "Web Portfolio Project", 
    course: "CS 202", 
    deadline: "Dec 25, 2024", 
    submissions: 52, 
    total: 52, 
    avgGrade: "92%",
    status: "completed"
  },
  { 
    id: 4, 
    title: "Database Design Project", 
    course: "CS 203", 
    deadline: "Jan 5, 2025", 
    submissions: 12, 
    total: 41, 
    avgGrade: "-",
    status: "ongoing"
  },
];

const AssignmentManagement = () => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState(assignmentData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: "", course: "", deadline: "", description: "", totalMarks: ""
  });

  const handleCreateAssignment = () => {
    if (!newAssignment.title || !newAssignment.course || !newAssignment.deadline) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    const assignment = {
      id: assignments.length + 1,
      title: newAssignment.title,
      course: newAssignment.course,
      deadline: new Date(newAssignment.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      submissions: 0,
      total: 45,
      avgGrade: "-",
      status: "ongoing" as const
    };
    setAssignments([...assignments, assignment]);
    setNewAssignment({ title: "", course: "", deadline: "", description: "", totalMarks: "" });
    setDialogOpen(false);
    toast({ title: "Success!", description: "Assignment created successfully" });
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
              Assignment Management
            </h1>
            <p className="text-muted-foreground">Create and grade assignments</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                  <Label>Assignment Title</Label>
                  <Input 
                    placeholder="Project title..." 
                    className="bg-secondary/30 border-border/50"
                    value={newAssignment.title}
                    onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Course</Label>
                    <Input 
                      placeholder="CS 201" 
                      className="bg-secondary/30 border-border/50"
                      value={newAssignment.course}
                      onChange={(e) => setNewAssignment({...newAssignment, course: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Deadline</Label>
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
                    placeholder="Assignment instructions and requirements..." 
                    className="bg-secondary/30 border-border/50 min-h-[120px]"
                    value={newAssignment.description}
                    onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Total Marks</Label>
                  <Input 
                    type="number" 
                    placeholder="100" 
                    className="bg-secondary/30 border-border/50"
                    value={newAssignment.totalMarks}
                    onChange={(e) => setNewAssignment({...newAssignment, totalMarks: e.target.value})}
                  />
                </div>
                <Button onClick={handleCreateAssignment} className="w-full bg-gradient-to-r from-primary to-cyan-glow">
                  Create Assignment
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{assignmentData.length}</p>
                <p className="text-sm text-muted-foreground">Total Assignments</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">Ongoing</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-glow to-accent flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">124</p>
                <p className="text-sm text-muted-foreground">Submissions</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">85%</p>
                <p className="text-sm text-muted-foreground">Avg Score</p>
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
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg text-foreground">{assignment.title}</h3>
                      <Badge variant={assignment.status === 'ongoing' ? 'default' : 'secondary'} className={
                        assignment.status === 'ongoing' 
                          ? 'bg-accent/20 text-accent border-accent/30' 
                          : 'bg-green-500/20 text-green-500 border-green-500/30'
                      }>
                        {assignment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {assignment.course}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Due: {assignment.deadline}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {assignment.submissions}/{assignment.total} submitted
                      </span>
                      {assignment.avgGrade !== '-' && (
                        <span className="font-semibold text-primary">
                          Avg: {assignment.avgGrade}
                        </span>
                      )}
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-cyan-glow rounded-full transition-all"
                        style={{ width: `${(assignment.submissions / assignment.total) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary hover:border-primary">
                      <Eye className="w-4 h-4 mr-2" />
                      View Submissions
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

export default AssignmentManagement;
