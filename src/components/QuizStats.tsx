import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Target, Clock, Award } from "lucide-react";

interface QuizStatsProps {
  chapterName: string;
  totalQuestions: number;
  completedQuestions: number;
  questionsInBatch: number;
  difficulty: string;
}

export default function QuizStats({ 
  chapterName, 
  totalQuestions, 
  completedQuestions, 
  questionsInBatch,
  difficulty 
}: QuizStatsProps) {
  const progressPercentage = Math.round((completedQuestions / totalQuestions) * 100);
  const remainingQuestions = totalQuestions - completedQuestions;

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Chapter Statistics
        </CardTitle>
        <CardDescription>
          Your progress in {chapterName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress Overview */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="text-foreground font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-center mb-1">
                <Target className="h-4 w-4 text-success mr-1" />
              </div>
              <div className="text-lg font-bold text-foreground">{completedQuestions}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <div className="flex items-center justify-center mb-1">
                <Clock className="h-4 w-4 text-warning mr-1" />
              </div>
              <div className="text-lg font-bold text-foreground">{remainingQuestions}</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
          </div>

          {/* Current Batch Info */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Current Batch</span>
            </div>
            <Badge variant="default">{questionsInBatch} Questions</Badge>
          </div>

          {/* Difficulty Level */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Difficulty Level</span>
            <Badge 
              variant={
                difficulty === 'easy' ? 'default' : 
                difficulty === 'medium' ? 'secondary' : 
                'outline'
              }
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}