import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award, ArrowLeft, Crown } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: number;
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  currentUserId?: string;
  onBack: () => void;
}

export default function Leaderboard({ leaderboard, currentUserId, onBack }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <Trophy className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getRankBadgeVariant = (rank: number) => {
    if (rank <= 3) return "default";
    if (rank <= 10) return "secondary";
    return "outline";
  };

  const getRowClassName = (entry: LeaderboardEntry) => {
    const baseClass = "flex items-center justify-between p-4 rounded-lg transition-all duration-300";
    
    if (entry.id === currentUserId) {
      return `${baseClass} bg-primary/10 border-2 border-primary shadow-glow`;
    }
    
    if (entry.rank <= 3) {
      return `${baseClass} bg-gradient-to-r from-warning/10 to-primary/10 border border-warning/30`;
    }
    
    return `${baseClass} bg-muted/30 border border-border hover:bg-accent/50`;
  };

  const topThree = leaderboard.slice(0, 3);
  const others = leaderboard.slice(3);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-primary p-4 rounded-full shadow-glow">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              Leaderboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Top performers in CCC Quiz World
            </p>
          </div>
        </div>

        {/* Top 3 Podium */}
        {topThree.length > 0 && (
          <div className="mb-8 animate-scale-in">
            <h2 className="text-2xl font-semibold text-center mb-6 text-foreground">
              🏆 Hall of Fame 🏆
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {topThree.map((entry, index) => (
                <Card 
                  key={entry.id}
                  className={`text-center transform transition-all duration-500 hover:scale-105 ${
                    entry.rank === 1 ? 'bg-gradient-to-b from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 shadow-glow' :
                    entry.rank === 2 ? 'bg-gradient-to-b from-gray-400/20 to-gray-500/10 border-gray-400/30' :
                    'bg-gradient-to-b from-amber-600/20 to-amber-700/10 border-amber-600/30'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-center mb-2">
                      {getRankIcon(entry.rank)}
                    </div>
                    <CardTitle className="text-lg">{entry.name}</CardTitle>
                    <CardDescription>
                      <Badge variant={getRankBadgeVariant(entry.rank)} className="text-sm">
                        Rank #{entry.rank}
                      </Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {entry.score}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Best Score
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <Card className="bg-gradient-card border-border shadow-card animate-slide-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Complete Rankings
            </CardTitle>
            <CardDescription>
              All participants ranked by their highest quiz scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No scores yet</h3>
                <p className="text-muted-foreground">Be the first to complete a quiz and claim the top spot!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div 
                    key={entry.id}
                    className={getRowClassName(entry)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(entry.rank)}
                        <Badge variant={getRankBadgeVariant(entry.rank)}>
                          #{entry.rank}
                        </Badge>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">
                          {entry.name}
                          {entry.id === currentUserId && (
                            <span className="text-primary ml-2">(You)</span>
                          )}
                        </h4>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-foreground">
                        {entry.score}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Best Score
                      </div>
                    </div>
                  </div>
                ))}
                
                {leaderboard.length >= 100 && (
                  <div className="text-center pt-4 text-sm text-muted-foreground">
                    Showing top 100 participants
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 animate-fade-in">
          <Card className="bg-gradient-card border-border text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground mb-1">
                {leaderboard.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Participants
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground mb-1">
                {leaderboard.length > 0 ? Math.round(leaderboard.reduce((sum, entry) => sum + entry.score, 0) / leaderboard.length) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">
                Average Score
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-card border-border text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground mb-1">
                {leaderboard.length > 0 ? Math.max(...leaderboard.map(e => e.score)) : 0}%
              </div>
              <div className="text-sm text-muted-foreground">
                Highest Score
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}