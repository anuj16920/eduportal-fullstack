import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BookOpen, FileText, ClipboardList, Calendar, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { title: "Active Courses", value: "6", icon: BookOpen, color: "from-primary to-cyan-glow" },
  { title: "Pending Tests", value: "2", icon: FileText, color: "from-accent to-primary" },
  { title: "Assignments Due", value: "3", icon: ClipboardList, color: "from-cyan-glow to-accent" },
  { title: "Overall Grade", value: "A", icon: Award, color: "from-primary to-accent" },
];

const todaysTasks = [
  { title: "Complete Data Structures Assignment", course: "CS 201", deadline: "6:00 PM", type: "assignment" },
  { title: "Watch Algorithms Tutorial #5", course: "CS 301", deadline: "End of day", type: "tutorial" },
  { title: "Prepare for Database Quiz", course: "CS 202", deadline: "Tomorrow", type: "test" },
];

const recentCourses = [
  { name: "Data Structures", progress: 75, instructor: "Dr. Sarah Johnson", nextClass: "Today, 2:00 PM" },
  { name: "Algorithms", progress: 60, instructor: "Prof. Mike Chen", nextClass: "Tomorrow, 10:00 AM" },
  { name: "Web Development", progress: 85, instructor: "Dr. Emily Davis", nextClass: "Dec 25, 3:00 PM" },
];

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
            My Learning Dashboard
          </h1>
          <p className="text-muted-foreground">Track your progress and stay on top of your courses</p>
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

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Today's Tasks
            </h2>
            <div className="space-y-3">
              {todaysTasks.map((task, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">{task.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {task.course} • Due {task.deadline}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Start
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming
            </h2>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm font-medium text-foreground">Quiz: Database Systems</p>
                <p className="text-xs text-muted-foreground mt-1">Tomorrow, 11:00 AM</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                <p className="text-sm font-medium text-foreground">Assignment: Web Dev Project</p>
                <p className="text-xs text-muted-foreground mt-1">Dec 26, 11:59 PM</p>
              </div>
              <div className="p-3 rounded-lg bg-cyan-glow/10 border border-cyan-glow/30">
                <p className="text-sm font-medium text-foreground">Tutorial: Machine Learning</p>
                <p className="text-xs text-muted-foreground mt-1">Dec 27, 2:00 PM</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6">My Courses</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recentCourses.map((course) => (
              <div
                key={course.name}
                className="p-6 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 transition-all group"
              >
                <h3 className="font-bold text-lg mb-2 text-foreground">{course.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-semibold text-primary">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-cyan-glow rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-3">Next class: {course.nextClass}</p>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-primary/10 group-hover:border-primary transition-colors"
                >
                  Continue Learning
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
