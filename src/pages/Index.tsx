import { useState, useEffect } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import Dashboard from "@/components/Dashboard";
import QuizSelection from "@/components/QuizSelection";
import QuizInterface from "@/components/QuizInterface";
import ResultsScreen from "@/components/ResultsScreen";
import Leaderboard from "@/components/Leaderboard";

type Screen = "welcome" | "dashboard" | "quiz-selection" | "quiz" | "results" | "leaderboard";

interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizAttempt {
  id: string;
  quizName: string;
  score: number;
  date: string;
}

interface Chapter {
  id: string;
  name: string;
  nameHindi: string;
  totalQuestions: number;
  completedQuestions: number;
}

interface QuizResult {
  questionId: string;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer: number;
  isCorrect: boolean;
}

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: number;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [user, setUser] = useState<User | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  // Mock data - in real app, this would come from Firebase
  const mockChapters: Chapter[] = [
    { id: "basic-concepts", name: "Basic Computer Concepts", nameHindi: "बुनियादी कंप्यूटर अवधारणाएं", totalQuestions: 250, completedQuestions: 45 },
    { id: "input-output", name: "Input & Output Devices", nameHindi: "इनपुट और आउटपुट डिवाइस", totalQuestions: 250, completedQuestions: 120 },
    { id: "memory", name: "Computer Memory", nameHindi: "कंप्यूटर मेमोरी", totalQuestions: 250, completedQuestions: 0 },
    { id: "software", name: "System Software", nameHindi: "सिस्टम सॉफ्टवेयर", totalQuestions: 250, completedQuestions: 250 },
    { id: "internet", name: "Internet & Web", nameHindi: "इंटरनेट और वेब", totalQuestions: 250, completedQuestions: 75 },
    { id: "ms-office", name: "MS Office", nameHindi: "एमएस ऑफिस", totalQuestions: 250, completedQuestions: 30 },
  ];

  const mockQuestions: Question[] = [
    {
      id: "q1",
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"],
      correctAnswer: 0
    },
    {
      id: "q2", 
      question: "Which of the following is an input device?",
      options: ["Monitor", "Printer", "Keyboard", "Speaker"],
      correctAnswer: 2
    },
    {
      id: "q3",
      question: "What is the smallest unit of data in a computer?",
      options: ["Byte", "Bit", "Kilobyte", "Word"],
      correctAnswer: 1
    },
    // Add more questions as needed...
  ];

  const mockQuizHistory: QuizAttempt[] = [
    { id: "1", quizName: "Basic Computer Concepts", score: 85, date: "2024-01-15" },
    { id: "2", quizName: "Input & Output Devices", score: 92, date: "2024-01-14" },
    { id: "3", quizName: "Computer Memory", score: 78, date: "2024-01-13" },
  ];

  const mockLeaderboard: LeaderboardEntry[] = [
    { id: "1", name: "Raj Patel", score: 98, rank: 1 },
    { id: "2", name: "Priya Singh", score: 95, rank: 2 },
    { id: "3", name: "Amit Kumar", score: 94, rank: 3 },
    { id: "4", name: "Sneha Sharma", score: 91, rank: 4 },
    { id: "5", name: "Rohit Verma", score: 89, rank: 5 },
  ];

  // Timer effect
  useEffect(() => {
    if (currentScreen === "quiz" && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentScreen, timeRemaining]);

  const handleLogin = (userData: { name: string; mobile: string; email: string }) => {
    const newUser: User = {
      id: Date.now().toString(),
      ...userData
    };
    setUser(newUser);
    setCurrentScreen("dashboard");
  };

  const handleSelectChapter = (chapterId: string, language: string) => {
    setSelectedChapter(chapterId);
    setSelectedLanguage(language);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setTimeRemaining(30 * 60);
    setCurrentScreen("quiz");
  };

  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setUserAnswers(newAnswers);
      
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };

  const handleSubmitQuiz = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...userAnswers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setUserAnswers(newAnswers);
    }
    setCurrentScreen("results");
  };

  const calculateResults = (): { score: number; correctAnswers: number; results: QuizResult[] } => {
    let correctCount = 0;
    const results: QuizResult[] = mockQuestions.map((question, index) => {
      const userAnswer = userAnswers[index] ?? -1;
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) correctCount++;
      
      return {
        questionId: question.id,
        question: question.question,
        options: question.options,
        correctAnswer: question.correctAnswer,
        userAnswer,
        isCorrect
      };
    });

    const score = Math.round((correctCount / mockQuestions.length) * 100);
    return { score, correctAnswers: correctCount, results };
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onLogin={handleLogin} />;
      
      case "dashboard":
        return (
          <Dashboard
            userName={user?.name || "Student"}
            quizHistory={mockQuizHistory}
            onStartQuiz={() => setCurrentScreen("quiz-selection")}
            onViewLeaderboard={() => setCurrentScreen("leaderboard")}
          />
        );
      
      case "quiz-selection":
        return (
          <QuizSelection
            chapters={mockChapters}
            onSelectChapter={handleSelectChapter}
            onBack={() => setCurrentScreen("dashboard")}
          />
        );
      
      case "quiz":
        const currentChapter = mockChapters.find(c => c.id === selectedChapter);
        return (
          <QuizInterface
            chapterName={currentChapter?.name || "Quiz"}
            questions={mockQuestions}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            timeRemaining={timeRemaining}
            onSelectAnswer={handleSelectAnswer}
            onNext={handleNext}
            onSubmit={handleSubmitQuiz}
            onBack={() => setCurrentScreen("quiz-selection")}
          />
        );
      
      case "results":
        const { score, correctAnswers, results } = calculateResults();
        const currentChapter2 = mockChapters.find(c => c.id === selectedChapter);
        return (
          <ResultsScreen
            chapterName={currentChapter2?.name || "Quiz"}
            score={score}
            totalQuestions={mockQuestions.length}
            correctAnswers={correctAnswers}
            results={results}
            onBackToDashboard={() => setCurrentScreen("dashboard")}
            onNextBatch={() => setCurrentScreen("quiz-selection")}
            hasNextBatch={true}
          />
        );
      
      case "leaderboard":
        return (
          <Leaderboard
            leaderboard={mockLeaderboard}
            currentUserId={user?.id}
            onBack={() => setCurrentScreen("dashboard")}
          />
        );
      
      default:
        return <WelcomeScreen onLogin={handleLogin} />;
    }
  };

  return <div className="min-h-screen">{renderScreen()}</div>;
};

export default Index;
