import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, BookOpen, Globe, ArrowLeft, Play } from "lucide-react";

interface Chapter {
  id: string;
  name: string;
  nameHindi: string;
  totalQuestions: number;
  completedQuestions: number;
}

interface QuizSelectionProps {
  chapters: Chapter[];
  onSelectChapter: (chapterId: string, language: string) => void;
  onBack: () => void;
}

export default function QuizSelection({ chapters, onSelectChapter, onBack }: QuizSelectionProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("english");

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  const isChapterCompleted = (completed: number, total: number) => {
    return completed >= total;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Choose Your Chapter
            </h1>
            <p className="text-muted-foreground text-lg mt-2">
              Select a chapter and language to start practicing
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="h-4 w-4" />
              Language:
            </div>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-in">
          {chapters.map((chapter, index) => {
            const progress = getProgressPercentage(chapter.completedQuestions, chapter.totalQuestions);
            const isCompleted = isChapterCompleted(chapter.completedQuestions, chapter.totalQuestions);
            
            return (
              <Card 
                key={chapter.id}
                className={`bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105 ${
                  isCompleted ? 'opacity-75' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-foreground">
                        {selectedLanguage === "hindi" ? chapter.nameHindi : chapter.name}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {chapter.completedQuestions} / {chapter.totalQuestions} Questions Completed
                      </CardDescription>
                    </div>
                    {isCompleted && (
                      <Badge variant="default" className="bg-success">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground font-medium">{progress}%</span>
                      </div>
                      <Progress 
                        value={progress} 
                        className="h-2"
                      />
                    </div>

                    {/* Statistics */}
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <BookOpen className="h-3 w-3" />
                        Total: {chapter.totalQuestions}
                      </div>
                      <div className="text-success font-medium">
                        Remaining: {chapter.totalQuestions - chapter.completedQuestions}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      variant={isCompleted ? "outline" : "hero"}
                      size="lg"
                      className="w-full"
                      onClick={() => onSelectChapter(chapter.id, selectedLanguage)}
                      disabled={isCompleted}
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          {chapter.completedQuestions === 0 ? 'Start' : 'Continue'}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Info Card */}
        <Card className="mt-8 bg-gradient-card border-border shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Choose Chapter</h4>
                  <p className="text-muted-foreground">Select any chapter to start practicing</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Answer Questions</h4>
                  <p className="text-muted-foreground">Practice with 50 questions per batch</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Track Progress</h4>
                  <p className="text-muted-foreground">Monitor your learning journey</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}