import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Bot, Send, User } from "lucide-react";
import { useState } from "react";

const chatHistory = [
  { id: 1, sender: "bot", message: "Hello! I'm your AI learning assistant. How can I help you today?" },
  { id: 2, sender: "user", message: "Can you explain binary search trees?" },
  { id: 3, sender: "bot", message: "A Binary Search Tree (BST) is a data structure where each node has at most two children. The left child contains values less than the parent, and the right child contains values greater than the parent. This property makes searching efficient with O(log n) time complexity in balanced trees." },
];

const StudentChatbot = () => {
  const [messages, setMessages] = useState(chatHistory);
  const [inputText, setInputText] = useState("");

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary via-cyan-glow to-accent bg-clip-text text-transparent">
            AI Chatbot
          </h1>
          <p className="text-muted-foreground">Get instant help with your studies</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm flex flex-col h-[600px]">
            <div className="p-4 border-b border-border/50 flex items-center gap-3 bg-secondary/20">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-glow flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-foreground">AI Learning Assistant</h2>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className={msg.sender === 'bot' ? 'bg-gradient-to-br from-primary to-cyan-glow text-white' : 'bg-secondary'}>
                      {msg.sender === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[70%] ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-br from-primary to-cyan-glow text-white'
                        : 'bg-secondary/50 text-foreground'
                    } rounded-lg p-3`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border/50 bg-secondary/20">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Ask me anything about your courses..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-secondary/30 border-border/50"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && inputText.trim()) {
                      setMessages([...messages, { id: messages.length + 1, sender: 'user', message: inputText }]);
                      setInputText("");
                      setTimeout(() => {
                        setMessages(prev => [...prev, { 
                          id: prev.length + 1, 
                          sender: 'bot', 
                          message: "I understand your question. Let me help you with that..." 
                        }]);
                      }, 1000);
                    }
                  }}
                />
                <Button className="bg-gradient-to-r from-primary to-cyan-glow">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-6">Quick Topics</h2>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary">
                Data Structures
              </Button>
              <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary">
                Algorithms
              </Button>
              <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary">
                Web Development
              </Button>
              <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary">
                Database Systems
              </Button>
            </div>

            <h2 className="text-xl font-bold mt-8 mb-4">Suggested Questions</h2>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 transition-colors cursor-pointer">
                <p className="text-sm text-foreground">What is the time complexity of quicksort?</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 transition-colors cursor-pointer">
                <p className="text-sm text-foreground">Explain the difference between stack and queue</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/30 hover:border-primary/50 transition-colors cursor-pointer">
                <p className="text-sm text-foreground">How does dynamic programming work?</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentChatbot;
