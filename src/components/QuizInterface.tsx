import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizInterfaceProps {
  chapterName: string;
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  timeRemaining: number;
  onSelectAnswer: (answerIndex: number) => void;
  onNext: () => void;
  onSubmit: () => void;
  onBack: () => void;
}

export default function QuizInterface({
  chapterName,
  questions,
  currentQuestionIndex,
  selectedAnswer,
  timeRemaining,
  onSelectAnswer,
  onNext,
  onSubmit,
  onBack
}: QuizInterfaceProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Selection
          </Button>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-sm">
              <Clock className="mr-1 h-3 w-3" />
              {formatTime(timeRemaining)}
            </Badge>
            <Badge variant="default" className="text-sm">
              <BookOpen className="mr-1 h-3 w-3" />
              {chapterName}
            </Badge>
          </div>
        </div>

        {/* Progress Section */}
        <Card className="mb-6 bg-gradient-card border-border shadow-card animate-slide-in">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">
                Question {currentQuestionIndex + 1} of {questions.length}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="mb-6 bg-gradient-card border-border shadow-card animate-scale-in">
          <CardHeader>
            <CardTitle className="text-xl leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "quiz"}
                  size="lg"
                  className={`w-full text-left justify-start p-4 h-auto whitespace-normal ${
                    selectedAnswer === index ? 'ring-2 ring-primary shadow-glow' : ''
                  }`}
                  onClick={() => onSelectAnswer(index)}
                >
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center animate-fade-in">
          <div className="text-sm text-muted-foreground">
            {selectedAnswer !== null ? "Answer selected" : "Please select an answer to continue"}
          </div>
          
          <Button
            variant="hero"
            size="lg"
            onClick={isLastQuestion ? onSubmit : onNext}
            disabled={selectedAnswer === null}
            className="min-w-[120px]"
          >
            {isLastQuestion ? "Submit Quiz" : "Next Question"}
          </Button>
        </div>

        {/* Instructions */}
        <Card className="mt-6 bg-muted/30 border-border">
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• Select one answer from the options above</p>
              <p>• You can change your answer before clicking Next</p>
              <p>• All questions must be answered to complete the quiz</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}