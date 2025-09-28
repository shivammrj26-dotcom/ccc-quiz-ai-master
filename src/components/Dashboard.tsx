import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Trophy, TrendingUp, Play } from "lucide-react";

interface QuizAttempt {
  id: string;
  quizName: string;
  score: number;
  date: string;
}

interface DashboardProps {
  userName: string;
  quizHistory: QuizAttempt[];
  onStartQuiz: () => void;
  onViewLeaderboard: () => void;
}

export default function Dashboard({ userName, quizHistory, onStartQuiz, onViewLeaderboard }: DashboardProps) {
  const getBestScore = () => {
    if (quizHistory.length === 0) return 0;
    return Math.max(...quizHistory.map(attempt => attempt.score));
  };

  const getTotalQuizzes = () => quizHistory.length;

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 70) return "secondary";
    return "outline";
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, <span className="bg-gradient-primary bg-clip-text text-transparent">{userName}</span>! 🎉
          </h1>
          <p className="text-muted-foreground text-lg">Ready to continue your CCC preparation?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-slide-in">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Score</CardTitle>
              <Trophy className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{getBestScore()}%</div>
              <p className="text-xs text-muted-foreground">Your highest achievement</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quizzes Taken</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{getTotalQuizzes()}</div>
              <p className="text-xs text-muted-foreground">Total attempts</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {quizHistory.length > 0 ? "Active" : "Getting Started"}
              </div>
              <p className="text-xs text-muted-foreground">Learning status</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-scale-in">
          <Button 
            variant="hero" 
            size="xl" 
            onClick={onStartQuiz}
            className="flex-1"
          >
            <Play className="mr-2 h-5 w-5" />
            Start New Quiz
          </Button>
          <Button 
            variant="outline" 
            size="xl" 
            onClick={onViewLeaderboard}
            className="flex-1"
          >
            <Trophy className="mr-2 h-5 w-5" />
            View Leaderboard
          </Button>
        </div>

        {/* Quiz History */}
        <Card className="bg-gradient-card border-border shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Quiz Attempts
            </CardTitle>
            <CardDescription>
              Your learning journey so far
            </CardDescription>
          </CardHeader>
          <CardContent>
            {quizHistory.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No quizzes taken yet</h3>
                <p className="text-muted-foreground mb-4">Start your first quiz to see your progress here!</p>
                <Button variant="hero" onClick={onStartQuiz}>
                  Take Your First Quiz
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {quizHistory.slice(0, 5).map((attempt) => (
                  <div 
                    key={attempt.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{attempt.quizName}</h4>
                      <p className="text-sm text-muted-foreground">
                        Completed on {new Date(attempt.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant={getScoreBadgeVariant(attempt.score)}>
                      {attempt.score}%
                    </Badge>
                  </div>
                ))}
                
                {quizHistory.length > 5 && (
                  <div className="text-center pt-4">
                    <Button variant="outline" size="sm">
                      View All {quizHistory.length} Attempts
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}