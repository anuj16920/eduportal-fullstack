import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Clock, CheckCircle, Upload } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const StudentAssignments = () => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Binary Search Implementation", course: "CS 201", deadline: "2025-12-01", status: "pending" },
    { id: 2, title: "Database Design Project", course: "CS 203", deadline: "2025-12-05", status: "pending" },
    { id: 3, title: "React Component Design", course: "CS 202", deadline: "2025-11-28", status: "submitted", grade: 92 },
  ]);
  const [submission, setSubmission] = useState("");

  const handleSubmit = (id: number) => {
    setAssignments(assignments.map(a => a.id === id ? {...a, status: "submitted"} : a));
    setSubmission("");
    toast({ title: "Success", description: "Assignment submitted successfully!" });
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
            My Assignments
          </h1>
          <p className="text-muted-foreground">Track and submit your assignments</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{assignments.filter(a => a.status === 'pending').length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{assignments.filter(a => a.status === 'submitted').length}</p>
                <p className="text-sm text-muted-foreground">Submitted</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-glow to-accent flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">90%</p>
                <p className="text-sm text-muted-foreground">Average Grade</p>
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
                  <div className="flex gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      assignment.status === 'submitted' 
                        ? 'bg-gradient-to-br from-green-500 to-green-600' 
                        : 'bg-gradient-to-br from-primary to-cyan-glow'
                    }`}>
                      {assignment.status === 'submitted' ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <FileText className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{assignment.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                          {assignment.course}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Due: {assignment.deadline}
                        </span>
                        {assignment.status === 'submitted' && assignment.grade && (
                          <span className="text-green-500 font-semibold">Grade: {assignment.grade}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {assignment.status === 'pending' ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-primary to-cyan-glow hover:shadow-glow">
                          <Upload className="w-4 h-4 mr-2" />
                          Submit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-card border-border/50">
                        <DialogHeader>
                          <DialogTitle>Submit Assignment</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Your Submission</Label>
                            <Textarea 
                              placeholder="Paste your code or write your answer here..." 
                              className="bg-secondary/30 border-border/50 min-h-[200px]"
                              value={submission}
                              onChange={(e) => setSubmission(e.target.value)}
                            />
                          </div>
                          <Button 
                            onClick={() => handleSubmit(assignment.id)} 
                            className="w-full bg-gradient-to-r from-primary to-cyan-glow"
                          >
                            Submit Assignment
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                      Submitted
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentAssignments;
