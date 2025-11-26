import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, Plus, Users } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const FacultyChat = () => {
  const { toast } = useToast();
  const [groups, setGroups] = useState([
    { id: 1, name: "CS 201 - Data Structures", members: 45, unread: 3 },
    { id: 2, name: "CS 301 - Algorithms", members: 38, unread: 0 },
    { id: 3, name: "Faculty Meeting", members: 12, unread: 5 },
  ]);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [messages, setMessages] = useState([
    { id: 1, sender: "Student A", text: "Professor, can you explain binary trees again?", time: "10:30 AM" },
    { id: 2, sender: "You", text: "Sure! Let me share a tutorial link.", time: "10:32 AM" },
    { id: 3, sender: "Student B", text: "When is the next assignment due?", time: "10:35 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [newGroup, setNewGroup] = useState({ name: "", members: "" });

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([...messages, { 
      id: messages.length + 1, 
      sender: "You", 
      text: newMessage, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setNewMessage("");
  };

  const handleCreateGroup = () => {
    if (!newGroup.name) {
      toast({ title: "Error", description: "Please enter group name", variant: "destructive" });
      return;
    }
    setGroups([...groups, { id: groups.length + 1, ...newGroup, members: parseInt(newGroup.members) || 0, unread: 0 }]);
    setNewGroup({ name: "", members: "" });
    toast({ title: "Success", description: "Group created successfully!" });
  };

  return (
    <DashboardLayout role="faculty">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
              Messages
            </h1>
            <p className="text-muted-foreground">Communicate with your students</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-cyan-glow hover:shadow-glow transition-all">
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border/50">
              <DialogHeader>
                <DialogTitle>Create New Group</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Group Name *</Label>
                  <Input 
                    placeholder="CS 202 - Web Development" 
                    className="bg-secondary/30 border-border/50"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Number of Members</Label>
                  <Input 
                    type="number" 
                    placeholder="40" 
                    className="bg-secondary/30 border-border/50"
                    value={newGroup.members}
                    onChange={(e) => setNewGroup({...newGroup, members: e.target.value})}
                  />
                </div>
                <Button onClick={handleCreateGroup} className="w-full bg-gradient-to-r from-primary to-cyan-glow">
                  Create Group
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Groups
            </h2>
            <div className="space-y-2">
              {groups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => setSelectedGroup(group)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedGroup.id === group.id
                      ? 'bg-primary/20 border border-primary/50'
                      : 'bg-secondary/30 border border-border/30 hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-sm text-foreground">{group.name}</h3>
                      <p className="text-xs text-muted-foreground">{group.members} members</p>
                    </div>
                    {group.unread > 0 && (
                      <Badge className="bg-primary text-white">{group.unread}</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm flex flex-col h-[600px]">
            <div className="p-4 border-b border-border/50 flex items-center gap-3 bg-secondary/20">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">{selectedGroup.name}</h2>
                <p className="text-xs text-muted-foreground">{selectedGroup.members} members</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'You' ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className={msg.sender === 'You' ? 'bg-primary text-white' : 'bg-secondary'}>
                      {msg.sender[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[70%] ${
                      msg.sender === 'You'
                        ? 'bg-gradient-to-br from-primary to-cyan-glow text-white'
                        : 'bg-secondary/50 text-foreground'
                    } rounded-lg p-3`}
                  >
                    <p className="text-xs font-semibold mb-1">{msg.sender}</p>
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border/50 bg-secondary/20">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 bg-secondary/30 border-border/50"
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} className="bg-gradient-to-r from-primary to-cyan-glow">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FacultyChat;
