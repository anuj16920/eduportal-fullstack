import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Mail, GraduationCap } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const studentData = [
  { id: 1, name: "Alice Thompson", email: "alice.t@student.edu", rollNo: "CS2021001", class: "CS-A", year: "3rd Year", gpa: "3.8" },
  { id: 2, name: "Bob Martinez", email: "bob.m@student.edu", rollNo: "CS2021002", class: "CS-A", year: "3rd Year", gpa: "3.6" },
  { id: 3, name: "Charlie Brown", email: "charlie.b@student.edu", rollNo: "CS2021003", class: "CS-B", year: "3rd Year", gpa: "3.9" },
  { id: 4, name: "Diana Prince", email: "diana.p@student.edu", rollNo: "CS2022001", class: "CS-A", year: "2nd Year", gpa: "4.0" },
  { id: 5, name: "Ethan Hunt", email: "ethan.h@student.edu", rollNo: "CS2022002", class: "CS-B", year: "2nd Year", gpa: "3.7" },
  { id: 6, name: "Fiona Clark", email: "fiona.c@student.edu", rollNo: "CS2022003", class: "CS-A", year: "2nd Year", gpa: "3.5" },
];

const StudentManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState(studentData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "", email: "", rollNo: "", class: "", year: ""
  });
  
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.rollNo || !newStudent.class || !newStudent.year) {
      toast({ title: "Error", description: "All fields are required", variant: "destructive" });
      return;
    }
    const student = {
      id: students.length + 1,
      name: newStudent.name,
      email: newStudent.email,
      rollNo: newStudent.rollNo,
      class: newStudent.class,
      year: newStudent.year,
      gpa: "0.0"
    };
    setStudents([...students, student]);
    setNewStudent({ name: "", email: "", rollNo: "", class: "", year: "" });
    setDialogOpen(false);
    toast({ title: "Success!", description: "Student added successfully" });
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
    toast({ title: "Deleted", description: "Student removed successfully" });
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
              Student Management
            </h1>
            <p className="text-muted-foreground">Manage students and their enrollments</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-cyan-glow hover:shadow-glow transition-all">
                <Plus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border/50">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input 
                    placeholder="John Doe" 
                    className="bg-secondary/30 border-border/50"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    placeholder="john.doe@student.edu" 
                    className="bg-secondary/30 border-border/50"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Roll Number</Label>
                  <Input 
                    placeholder="CS2024001" 
                    className="bg-secondary/30 border-border/50"
                    value={newStudent.rollNo}
                    onChange={(e) => setNewStudent({...newStudent, rollNo: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Class</Label>
                  <Input 
                    placeholder="CS-A" 
                    className="bg-secondary/30 border-border/50"
                    value={newStudent.class}
                    onChange={(e) => setNewStudent({...newStudent, class: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Year</Label>
                  <Input 
                    placeholder="1st Year" 
                    className="bg-secondary/30 border-border/50"
                    value={newStudent.year}
                    onChange={(e) => setNewStudent({...newStudent, year: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddStudent} className="w-full bg-gradient-to-r from-primary to-cyan-glow">
                  Add Student
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name, email, or roll number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary/30 border-border/50"
              />
            </div>
          </div>

          <div className="rounded-lg border border-border/50 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30 hover:bg-secondary/40">
                  <TableHead>Roll No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-secondary/20">
                    <TableCell className="font-mono text-primary">{student.rollNo}</TableCell>
                    <TableCell className="font-medium text-foreground">{student.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{student.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {student.class}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-foreground">{student.year}</TableCell>
                    <TableCell>
                      <span className={`font-bold ${parseFloat(student.gpa) >= 3.7 ? 'text-green-500' : 'text-accent'}`}>
                        {student.gpa}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{students.length}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">3rd Year</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-glow to-accent flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-sm text-muted-foreground">2nd Year</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">3.75</p>
                <p className="text-sm text-muted-foreground">Avg GPA</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentManagement;
