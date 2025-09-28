import { useState, useEffect } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import Dashboard from "@/components/Dashboard";
import QuizSelection from "@/components/QuizSelection";
import QuizInterface from "@/components/QuizInterface";
import ResultsScreen from "@/components/ResultsScreen";
import Leaderboard from "@/components/Leaderboard";
import { getQuestionsByChapter, type Question as QuestionType } from "@/data/questionBank";

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
  const [currentQuestions, setCurrentQuestions] = useState<QuestionType[]>([]);

  // Complete CCC Course Chapters
  const mockChapters: Chapter[] = [
    { 
      id: "intro-computer", 
      name: "Introduction to Computer", 
      nameHindi: "कंप्यूटर का परिचय", 
      totalQuestions: 250, 
      completedQuestions: 0 
    },
    { 
      id: "operating-system", 
      name: "Introduction to Operating System", 
      nameHindi: "ऑपरेटिंग सिस्टम का परिचय", 
      totalQuestions: 250, 
      completedQuestions: 0 
    },
    { 
      id: "word-processing", 
      name: "Word Processing", 
      nameHindi: "वर्ड प्रोसेसिंग", 
      totalQuestions: 250, 
      completedQuestions: 0 
    },
    { 
      id: "spreadsheet", 
      name: "Spreadsheet", 
      nameHindi: "स्प्रेडशीट", 
      totalQuestions: 250, 
      completedQuestions: 0 
    },
    { 
      id: "presentation", 
      name: "Presentation (Impress)", 
      nameHindi: "प्रेजेंटेशन (इम्प्रेस)", 
      totalQuestions: 250, 
      completedQuestions: 0 
    },
    { 
      id: "internet-www", 
      name: "Introduction to Internet and WWW", 
      nameHindi: "इंटरनेट और WWW का परिचय", 
      totalQuestions: 250, 
      completedQuestions: 0 
    },
    { 
      id: "email-social", 
      name: "E-mail, Social Networking and e-Governance", 
      nameHindi: "ई-मेल, सोशल नेटवर्किंग और ई-गवर्नेंस", 
      totalQuestions: 250, 
      completedQuestions: 0 
    },
    { 
      id: "digital-financial", 
      name: "Digital Financial Tools and Applications", 
      nameHindi: "डिजिटल वित्तीय उपकरण और अनुप्रयोग", 
      totalQuestions: 250, 
      completedQuestions: 0 
    },
    { 
      id: "cyber-security", 
      name: "Overview of Cyber Security", 
      nameHindi: "साइबर सुरक्षा का अवलोकन", 
      totalQuestions: 250, 
      completedQuestions: 0 
    },
    { 
      id: "future-skills-ai", 
      name: "Future Skills and Artificial Intelligence", 
      nameHindi: "भविष्य के कौशल और कृत्रिम बुद्धिमत्ता", 
      totalQuestions: 250, 
      completedQuestions: 0 
    }
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
    const questions = getQuestionsByChapter(chapterId, 50); // Get 50 questions for this batch
    setCurrentQuestions(questions);
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
    const results: QuizResult[] = currentQuestions.map((question, index) => {
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

    const score = Math.round((correctCount / currentQuestions.length) * 100);
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
            questions={currentQuestions}
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
            totalQuestions={currentQuestions.length}
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
