import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Upload, Video, FileText, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const tutorialData = [
  { id: 1, title: "Introduction to Data Structures", type: "video", course: "CS 201", duration: "45 min", views: 234, uploadedBy: "Dr. Sarah Johnson" },
  { id: 2, title: "Sorting Algorithms Explained", type: "video", course: "CS 301", duration: "38 min", views: 189, uploadedBy: "Prof. Mike Chen" },
  { id: 3, title: "Graph Theory Basics", type: "pdf", course: "CS 201", duration: "12 pages", views: 156, uploadedBy: "Dr. Sarah Johnson" },
  { id: 4, title: "Dynamic Programming Tutorial", type: "video", course: "CS 301", duration: "52 min", views: 203, uploadedBy: "Prof. Mike Chen" },
  { id: 5, title: "Binary Search Trees", type: "pdf", course: "CS 201", duration: "18 pages", views: 178, uploadedBy: "Dr. Sarah Johnson" },
];

const TutorialManagement = () => {
  const { toast } = useToast();
  const [tutorials, setTutorials] = useState(tutorialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTutorial, setNewTutorial] = useState({
    title: "", course: "", description: "", type: "video"
  });

  const handleUploadTutorial = () => {
    if (!newTutorial.title || !newTutorial.course) {
      toast({ title: "Error", description: "Title and course are required", variant: "destructive" });
      return;
    }
    const tutorial = {
      id: tutorials.length + 1,
      title: newTutorial.title,
      type: newTutorial.type,
      course: newTutorial.course,
      duration: newTutorial.type === "video" ? "30 min" : "10 pages",
      views: 0,
      uploadedBy: "Admin"
    };
    setTutorials([...tutorials, tutorial]);
    setNewTutorial({ title: "", course: "", description: "", type: "video" });
    setDialogOpen(false);
    toast({ title: "Success!", description: "Tutorial uploaded successfully" });
  };

  const handleDeleteTutorial = (id: number) => {
    setTutorials(tutorials.filter(t => t.id !== id));
    toast({ title: "Deleted", description: "Tutorial removed successfully" });
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
              Tutorial Management
            </h1>
            <p className="text-muted-foreground">Upload and manage tutorial content</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                  <Input 
                    placeholder="Introduction to..." 
                    className="bg-secondary/30 border-border/50"
                    value={newTutorial.title}
                    onChange={(e) => setNewTutorial({...newTutorial, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Course</Label>
                  <Input 
                    placeholder="CS 201" 
                    className="bg-secondary/30 border-border/50"
                    value={newTutorial.course}
                    onChange={(e) => setNewTutorial({...newTutorial, course: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <select 
                    className="w-full p-2 rounded-md bg-secondary/30 border border-border/50 text-foreground"
                    value={newTutorial.type}
                    onChange={(e) => setNewTutorial({...newTutorial, type: e.target.value})}
                  >
                    <option value="video">Video</option>
                    <option value="pdf">PDF</option>
                  </select>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea 
                    placeholder="Tutorial description..." 
                    className="bg-secondary/30 border-border/50 min-h-[100px]"
                    value={newTutorial.description}
                    onChange={(e) => setNewTutorial({...newTutorial, description: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Upload File</Label>
                  <div className="mt-2 border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-secondary/20">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">Video (MP4, MOV) or PDF files</p>
                  </div>
                </div>
                <Button onClick={handleUploadTutorial} className="w-full bg-gradient-to-r from-primary to-cyan-glow">
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
                <p className="text-2xl font-bold text-foreground">3</p>
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
                <p className="text-2xl font-bold text-foreground">2</p>
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
                <p className="text-2xl font-bold text-foreground">960</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-6">All Tutorials</h2>
          <div className="space-y-4">
            {tutorials.map((tutorial) => (
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
                        <span>By {tutorial.uploadedBy}</span>
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDeleteTutorial(tutorial.id)}
                    >
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

export default TutorialManagement;
