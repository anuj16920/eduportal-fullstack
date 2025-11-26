import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Play, BookOpen, Clock, CheckCircle } from "lucide-react";

const tutorialData = [
  { id: 1, title: "Introduction to Data Structures", course: "CS 201", duration: "45 min", progress: 100, instructor: "Dr. Sarah Johnson" },
  { id: 2, title: "Sorting Algorithms Explained", course: "CS 301", duration: "38 min", progress: 65, instructor: "Prof. Mike Chen" },
  { id: 3, title: "Graph Theory Basics", course: "CS 201", duration: "30 min", progress: 0, instructor: "Dr. Sarah Johnson" },
  { id: 4, title: "Dynamic Programming Tutorial", course: "CS 301", duration: "52 min", progress: 35, instructor: "Prof. Mike Chen" },
];

const StudentTutorials = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
            Tutorials
          </h1>
          <p className="text-muted-foreground">Access your learning materials</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{tutorialData.length}</p>
                <p className="text-sm text-muted-foreground">Total Tutorials</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-glow to-accent flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6">Available Tutorials</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {tutorialData.map((tutorial) => (
              <div
                key={tutorial.id}
                className="p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 transition-all group"
              >
                <div className="flex gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center flex-shrink-0">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{tutorial.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {tutorial.course}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {tutorial.duration}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">By {tutorial.instructor}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-semibold text-primary">{tutorial.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-cyan-glow rounded-full transition-all"
                      style={{ width: `${tutorial.progress}%` }}
                    />
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary/10 group-hover:border-primary transition-colors"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {tutorial.progress === 0 ? 'Start Tutorial' : tutorial.progress === 100 ? 'Review' : 'Continue'}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentTutorials;
