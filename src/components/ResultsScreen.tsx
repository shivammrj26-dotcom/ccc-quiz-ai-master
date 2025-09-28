import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, CheckCircle, XCircle, HelpCircle, ArrowRight, Home, Sparkles } from "lucide-react";
import { useState } from "react";

interface QuizResult {
  questionId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer: number;
  isCorrect: boolean;
}

interface ResultsScreenProps {
  chapterName: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  results: QuizResult[];
  onBackToDashboard: () => void;
  onNextBatch: () => void;
  hasNextBatch: boolean;
}

export default function ResultsScreen({
  chapterName,
  score,
  totalQuestions,
  correctAnswers,
  results,
  onBackToDashboard,
  onNextBatch,
  hasNextBatch
}: ResultsScreenProps) {
  const [selectedExplanationLang, setSelectedExplanationLang] = useState("english");
  const [explanationModal, setExplanationModal] = useState<{
    isOpen: boolean;
    question: QuizResult | null;
  }>({ isOpen: false, question: null });

  const getScoreMessage = () => {
    if (score >= 90) return { message: "Excellent Work!", emoji: "🏆", variant: "success" as const };
    if (score >= 80) return { message: "Great Job!", emoji: "🎉", variant: "success" as const };
    if (score >= 70) return { message: "Good Progress!", emoji: "👍", variant: "warning" as const };
    if (score >= 60) return { message: "Keep Practicing!", emoji: "💪", variant: "warning" as const };
    return { message: "Don't Give Up!", emoji: "🌟", variant: "default" as const };
  };

  const scoreInfo = getScoreMessage();

  const handleExplainAnswer = (question: QuizResult) => {
    setExplanationModal({ isOpen: true, question });
  };

  // Mock AI explanation function - in real app, this would call Gemini API
  const getAIExplanation = (question: QuizResult) => {
    return `The correct answer is "${question.options[question.correctAnswer]}" because this option represents the fundamental concept accurately. The other options are incorrect as they either provide incomplete information or misstate key facts related to computer concepts.`;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Results Summary */}
        <Card className="mb-8 bg-gradient-card border-border shadow-glow animate-scale-in">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{scoreInfo.emoji}</div>
            <CardTitle className="text-3xl mb-2">{scoreInfo.message}</CardTitle>
            <CardDescription className="text-lg">
              You've completed the quiz for <strong>{chapterName}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">{score}%</div>
                <div className="text-sm text-muted-foreground">Final Score</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-success">{correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-foreground">{totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Total Questions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in">
          <Button variant="outline" size="lg" onClick={onBackToDashboard} className="flex-1">
            <Home className="mr-2 h-5 w-5" />
            Back to Dashboard
          </Button>
          {hasNextBatch && (
            <Button variant="hero" size="lg" onClick={onNextBatch} className="flex-1">
              <ArrowRight className="mr-2 h-5 w-5" />
              Start Next Batch
            </Button>
          )}
        </div>

        {/* Review Answers */}
        <Card className="bg-gradient-card border-border shadow-card animate-slide-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Review Your Answers
            </CardTitle>
            <CardDescription>
              Go through each question to understand the correct answers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div 
                  key={result.questionId}
                  className="p-4 rounded-lg bg-muted/30 border border-border space-y-3"
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          Question {index + 1}
                        </Badge>
                        {result.isCorrect ? (
                          <CheckCircle className="h-4 w-4 text-success" />
                        ) : (
                          <XCircle className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground mb-3">
                        {result.question}
                      </p>
                    </div>
                    
                    <Dialog
                      open={explanationModal.isOpen && explanationModal.question?.questionId === result.questionId}
                      onOpenChange={(open) => {
                        if (!open) setExplanationModal({ isOpen: false, question: null });
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExplainAnswer(result)}
                        >
                          <HelpCircle className="h-3 w-3 mr-1" />
                          Explain
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>AI Explanation</DialogTitle>
                          <DialogDescription>
                            Understanding why this is the correct answer
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm text-muted-foreground">Language:</span>
                            <Select value={selectedExplanationLang} onValueChange={setSelectedExplanationLang}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="hindi">हिंदी</SelectItem>
                                <SelectItem value="gujarati">ગુજરાતી</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm leading-relaxed">
                              {getAIExplanation(result)}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.options.map((option, optionIndex) => {
                      const isCorrect = optionIndex === result.correctAnswer;
                      const isUserAnswer = optionIndex === result.userAnswer;
                      
                      let variant: "outline" | "correct" | "incorrect" = "outline";
                      if (isCorrect) variant = "correct";
                      else if (isUserAnswer && !isCorrect) variant = "incorrect";

                      return (
                        <Button
                          key={optionIndex}
                          variant={variant}
                          size="sm"
                          className="justify-start text-left h-auto p-3 whitespace-normal cursor-default"
                        >
                          <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mr-2 text-xs font-bold flex-shrink-0">
                            {String.fromCharCode(65 + optionIndex)}
                          </span>
                          <span className="flex-1">{option}</span>
                          {isCorrect && <CheckCircle className="h-4 w-4 ml-2 flex-shrink-0" />}
                          {isUserAnswer && !isCorrect && <XCircle className="h-4 w-4 ml-2 flex-shrink-0" />}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}