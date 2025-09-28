import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, Target } from "lucide-react";

interface WelcomeScreenProps {
  onLogin: (userData: { name: string; mobile: string; email: string }) => void;
}

export default function WelcomeScreen({ onLogin }: WelcomeScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.mobile && formData.email) {
      onLogin(formData);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10"></div>
      
      <div className="w-full max-w-4xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-gradient-primary p-6 rounded-full shadow-glow">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-warning p-2 rounded-full animate-glow">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            CCC Quiz World
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Master the Course on Computer Concepts with our comprehensive quiz platform. 
            Practice with 250+ questions per chapter and track your progress!
          </p>
          
          <div className="flex justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>Multiple Chapters</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Target className="w-5 h-5 text-success" />
              <span>250+ Questions</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="w-5 h-5 text-secondary" />
              <span>AI Explanations</span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="max-w-md mx-auto bg-gradient-card border-border shadow-card animate-scale-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Get Started</CardTitle>
            <CardDescription>
              Enter your details to begin your CCC preparation journey
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="bg-muted border-border focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  required
                  className="bg-muted border-border focus:border-primary"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email ID *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="bg-muted border-border focus:border-primary"
                />
              </div>
              
              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full mt-6"
              >
                Start Learning
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}