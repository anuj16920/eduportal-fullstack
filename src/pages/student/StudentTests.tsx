import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileQuestion, Clock, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const StudentTests = () => {
  const [tests] = useState([
    { id: 1, title: "Data Structures Midterm", course: "CS 201", questions: 20, duration: "60 min", status: "available", deadline: "2025-12-01" },
    { id: 2, title: "Algorithms Quiz 1", course: "CS 301", questions: 15, duration: "45 min", status: "available", deadline: "2025-12-03" },
    { id: 3, title: "Web Development Quiz", course: "CS 202", questions: 10, duration: "30 min", status: "completed", score: 85 },
  ]);

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
            My Tests
          </h1>
          <p className="text-muted-foreground">Take tests and view your results</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center">
                <FileQuestion className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{tests.filter(t => t.status === 'available').length}</p>
                <p className="text-sm text-muted-foreground">Available Tests</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{tests.filter(t => t.status === 'completed').length}</p>
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
                <p className="text-2xl font-bold text-foreground">82%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6">Available Tests</h2>
          <div className="space-y-4">
            {tests.map((test) => (
              <div
                key={test.id}
                className="p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      test.status === 'completed' 
                        ? 'bg-gradient-to-br from-green-500 to-green-600' 
                        : 'bg-gradient-to-br from-primary to-cyan-glow'
                    }`}>
                      {test.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <FileQuestion className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{test.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                          {test.course}
                        </Badge>
                        <span>{test.questions} questions</span>
                        <span>{test.duration}</span>
                        {test.status === 'available' && (
                          <span className="text-yellow-500">Due: {test.deadline}</span>
                        )}
                        {test.status === 'completed' && (
                          <span className="text-green-500 font-semibold">Score: {test.score}%</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {test.status === 'available' ? (
                    <Button className="bg-gradient-to-r from-primary to-cyan-glow hover:shadow-glow">
                      Start Test
                    </Button>
                  ) : (
                    <Button variant="outline" className="hover:bg-primary/10 hover:text-primary">
                      View Results
                    </Button>
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

export default StudentTests;
