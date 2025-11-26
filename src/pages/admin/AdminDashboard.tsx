import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Users, BookOpen, FileText, TrendingUp, Clock, CheckCircle } from "lucide-react";

const stats = [
  { title: "Total Students", value: "1,234", change: "+12%", icon: Users, color: "from-primary to-cyan-glow" },
  { title: "Faculty Members", value: "48", change: "+3", icon: Users, color: "from-accent to-primary" },
  { title: "Active Courses", value: "23", change: "+2", icon: BookOpen, color: "from-cyan-glow to-accent" },
  { title: "Pending Tests", value: "8", change: "-4", icon: FileText, color: "from-primary to-accent" },
];

const recentActivities = [
  { user: "Dr. Sarah Johnson", action: "Created new tutorial", course: "Data Structures", time: "2 hours ago" },
  { user: "Prof. Mike Chen", action: "Published test", course: "Algorithms", time: "4 hours ago" },
  { user: "Emily Davis", action: "Submitted assignment", course: "Web Development", time: "5 hours ago" },
  { user: "Dr. James Wilson", action: "Updated course materials", course: "Machine Learning", time: "Yesterday" },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card
                key={stat.title}
                className="p-6 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-neon transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} p-3 group-hover:shadow-glow transition-all`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </Card>
            );
          })}
        </div>

        {/* Activity Feed */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Activities
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action} • {activity.course}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Quick Stats
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Course Completion Rate</span>
                  <span className="text-sm font-bold text-primary">87%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[87%] bg-gradient-to-r from-primary to-cyan-glow rounded-full" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Average Test Score</span>
                  <span className="text-sm font-bold text-accent">82%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[82%] bg-gradient-to-r from-accent to-primary rounded-full" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Assignment Submission</span>
                  <span className="text-sm font-bold text-cyan-glow">94%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[94%] bg-gradient-to-r from-cyan-glow to-accent rounded-full" />
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-cyan-glow/10 border border-primary/30">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">All systems operational</p>
                    <p className="text-xs text-muted-foreground">Platform running smoothly</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
