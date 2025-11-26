import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BookOpen, FileText, ClipboardList, Users, Calendar, TrendingUp } from "lucide-react";

const stats = [
  { title: "Active Tutorials", value: "12", icon: BookOpen, color: "from-primary to-cyan-glow" },
  { title: "Pending Tests", value: "3", icon: FileText, color: "from-accent to-primary" },
  { title: "Assignments to Grade", value: "24", icon: ClipboardList, color: "from-cyan-glow to-accent" },
  { title: "Total Students", value: "156", icon: Users, color: "from-primary to-accent" },
];

const upcomingTasks = [
  { task: "Grade Data Structures Assignment", deadline: "Today, 5:00 PM", priority: "high" },
  { task: "Prepare Algorithms Quiz", deadline: "Tomorrow, 10:00 AM", priority: "medium" },
  { task: "Upload Tutorial Videos", deadline: "Dec 25, 2024", priority: "low" },
  { task: "Review Student Submissions", deadline: "Dec 26, 2024", priority: "medium" },
];

const FacultyDashboard = () => {
  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
            Faculty Dashboard
          </h1>
          <p className="text-muted-foreground">Manage your courses and students</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className="p-6 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-3 mb-4 group-hover:shadow-glow transition-all`}>
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming Tasks
            </h2>
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">{task.task}</p>
                      <p className="text-sm text-muted-foreground">{task.deadline}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        task.priority === "high"
                          ? "bg-destructive/20 text-destructive"
                          : task.priority === "medium"
                          ? "bg-accent/20 text-accent"
                          : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Class Performance
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Data Structures</span>
                  <span className="text-sm font-bold text-primary">92%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[92%] bg-gradient-to-r from-primary to-cyan-glow rounded-full" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Algorithms</span>
                  <span className="text-sm font-bold text-accent">88%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[88%] bg-gradient-to-r from-accent to-primary rounded-full" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Web Development</span>
                  <span className="text-sm font-bold text-cyan-glow">95%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[95%] bg-gradient-to-r from-cyan-glow to-accent rounded-full" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyDashboard;
