import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, Video, FileText, Plus, Eye, Edit, Trash2 } from "lucide-react";

const tutorialData = [
  { id: 1, title: "Introduction to Data Structures", type: "video", course: "CS 201", duration: "45 min", views: 234 },
  { id: 2, title: "Sorting Algorithms Explained", type: "video", course: "CS 301", duration: "38 min", views: 189 },
  { id: 3, title: "Graph Theory Basics", type: "pdf", course: "CS 201", duration: "12 pages", views: 156 },
];

const FacultyTutorials = () => {
  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
              My Tutorials
            </h1>
            <p className="text-muted-foreground">Upload and manage your tutorial content</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-cyan-glow hover:shadow-glow transition-all">
                <Plus className="w-4 h-4 mr-2" />
                Upload Tutorial
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border/50 max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload New Tutorial</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Tutorial Title</Label>
                  <Input placeholder="Introduction to..." className="bg-secondary/30 border-border/50" />
                </div>
                <div>
                  <Label>Course</Label>
                  <Input placeholder="CS 201" className="bg-secondary/30 border-border/50" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Tutorial description..." className="bg-secondary/30 border-border/50 min-h-[100px]" />
                </div>
                <div>
                  <Label>Upload File</Label>
                  <div className="mt-2 border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-secondary/20">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">Video (MP4, MOV) or PDF files</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-cyan-glow">
                  Upload Tutorial
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">2</p>
                <p className="text-sm text-muted-foreground">Video Tutorials</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">1</p>
                <p className="text-sm text-muted-foreground">PDF Notes</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-glow to-accent flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">579</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6">My Tutorials</h2>
          <div className="space-y-4">
            {tutorialData.map((tutorial) => (
              <div
                key={tutorial.id}
                className="p-4 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      tutorial.type === 'video' 
                        ? 'bg-gradient-to-br from-primary to-cyan-glow' 
                        : 'bg-gradient-to-br from-accent to-primary'
                    }`}>
                      {tutorial.type === 'video' ? (
                        <Video className="w-6 h-6 text-white" />
                      ) : (
                        <FileText className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{tutorial.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                          {tutorial.course}
                        </Badge>
                        <span>{tutorial.duration}</span>
                        <span>{tutorial.views} views</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-destructive/10 hover:text-destructive">
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

export default FacultyTutorials;
