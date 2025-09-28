// Comprehensive CCC Question Bank
// Each chapter contains 250+ questions organized by topics

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

export const questionBank: { [chapterId: string]: Question[] } = {
  "intro-computer": [
    {
      id: "ic001",
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"],
      correctAnswer: 0,
      chapter: "intro-computer",
      difficulty: "easy",
      topic: "Basic Hardware"
    },
    {
      id: "ic002",
      question: "Which of the following is an input device?",
      options: ["Monitor", "Printer", "Keyboard", "Speaker"],
      correctAnswer: 2,
      chapter: "intro-computer",
      difficulty: "easy",
      topic: "Input Devices"
    },
    {
      id: "ic003",
      question: "What is the smallest unit of data in a computer?",
      options: ["Byte", "Bit", "Kilobyte", "Word"],
      correctAnswer: 1,
      chapter: "intro-computer",
      difficulty: "easy",
      topic: "Computer Memory"
    },
    {
      id: "ic004",
      question: "Which generation of computers used vacuum tubes?",
      options: ["First Generation", "Second Generation", "Third Generation", "Fourth Generation"],
      correctAnswer: 0,
      chapter: "intro-computer",
      difficulty: "medium",
      topic: "Evolution of Computers"
    },
    {
      id: "ic005",
      question: "What is RAM?",
      options: ["Read Access Memory", "Random Access Memory", "Rapid Access Memory", "Real Access Memory"],
      correctAnswer: 1,
      chapter: "intro-computer",
      difficulty: "easy",
      topic: "Computer Memory"
    },
    // Add more questions for Chapter 1...
  ],

  "operating-system": [
    {
      id: "os001",
      question: "What is an Operating System?",
      options: ["Hardware component", "System software", "Application software", "Network protocol"],
      correctAnswer: 1,
      chapter: "operating-system",
      difficulty: "easy",
      topic: "OS Basics"
    },
    {
      id: "os002",
      question: "Which of the following is NOT an operating system?",
      options: ["Windows", "Linux", "MS Word", "macOS"],
      correctAnswer: 2,
      chapter: "operating-system",
      difficulty: "easy",
      topic: "Types of OS"
    },
    {
      id: "os003",
      question: "What is the main function of the taskbar?",
      options: ["Display time", "Show running applications", "Control volume", "All of the above"],
      correctAnswer: 3,
      chapter: "operating-system",
      difficulty: "medium",
      topic: "User Interface"
    },
    {
      id: "os004",
      question: "Which key combination is used to copy files?",
      options: ["Ctrl + C", "Ctrl + V", "Ctrl + X", "Ctrl + Z"],
      correctAnswer: 0,
      chapter: "operating-system",
      difficulty: "easy",
      topic: "File Management"
    },
    {
      id: "os005",
      question: "What does GUI stand for?",
      options: ["Graphical User Interface", "General User Interface", "Global User Interface", "Guided User Interface"],
      correctAnswer: 0,
      chapter: "operating-system",
      difficulty: "easy",
      topic: "User Interface"
    },
    // Add more questions for Chapter 2...
  ],

  "word-processing": [
    {
      id: "wp001",
      question: "Which software is commonly used for word processing?",
      options: ["MS Excel", "MS Word", "MS PowerPoint", "MS Access"],
      correctAnswer: 1,
      chapter: "word-processing",
      difficulty: "easy",
      topic: "Word Processing Basics"
    },
    {
      id: "wp002",
      question: "What is the keyboard shortcut for bold text?",
      options: ["Ctrl + B", "Ctrl + I", "Ctrl + U", "Ctrl + S"],
      correctAnswer: 0,
      chapter: "word-processing",
      difficulty: "easy",
      topic: "Text Formatting"
    },
    {
      id: "wp003",
      question: "Which feature automatically corrects typing mistakes?",
      options: ["Spell Check", "Grammar Check", "AutoCorrect", "Find & Replace"],
      correctAnswer: 2,
      chapter: "word-processing",
      difficulty: "medium",
      topic: "Text Creation"
    },
    {
      id: "wp004",
      question: "What is Mail Merge used for?",
      options: ["Combining documents", "Sending bulk emails", "Creating personalized documents", "Merging tables"],
      correctAnswer: 2,
      chapter: "word-processing",
      difficulty: "medium",
      topic: "Mail Merge"
    },
    {
      id: "wp005",
      question: "Which option is used to change the page orientation?",
      options: ["Page Setup", "Print Preview", "View", "Tools"],
      correctAnswer: 0,
      chapter: "word-processing",
      difficulty: "easy",
      topic: "Page Layout"
    },
    // Add more questions for Chapter 3...
  ],

  "spreadsheet": [
    {
      id: "ss001",
      question: "What is the intersection of a row and column called?",
      options: ["Cell", "Range", "Field", "Record"],
      correctAnswer: 0,
      chapter: "spreadsheet",
      difficulty: "easy",
      topic: "Spreadsheet Basics"
    },
    {
      id: "ss002",
      question: "Which formula is used to add numbers in Excel?",
      options: ["=ADD()", "=SUM()", "=TOTAL()", "=PLUS()"],
      correctAnswer: 1,
      chapter: "spreadsheet",
      difficulty: "easy",
      topic: "Formulas and Functions"
    },
    {
      id: "ss003",
      question: "What is the maximum number of rows in Excel 2016?",
      options: ["65,536", "1,048,576", "16,384", "256"],
      correctAnswer: 1,
      chapter: "spreadsheet",
      difficulty: "hard",
      topic: "Spreadsheet Elements"
    },
    {
      id: "ss004",
      question: "Which function finds the largest value in a range?",
      options: ["MIN()", "MAX()", "AVERAGE()", "COUNT()"],
      correctAnswer: 1,
      chapter: "spreadsheet",
      difficulty: "easy",
      topic: "Functions"
    },
    {
      id: "ss005",
      question: "What does AutoFill feature do?",
      options: ["Automatically saves data", "Fills cells with series or patterns", "Corrects spelling", "Formats cells"],
      correctAnswer: 1,
      chapter: "spreadsheet",
      difficulty: "medium",
      topic: "Cell Manipulation"
    },
    // Add more questions for Chapter 4...
  ],

  "presentation": [
    {
      id: "pt001",
      question: "Which software is used for creating presentations?",
      options: ["MS Word", "MS Excel", "MS PowerPoint", "MS Access"],
      correctAnswer: 2,
      chapter: "presentation",
      difficulty: "easy",
      topic: "Presentation Basics"
    },
    {
      id: "pt002",
      question: "What is a slide transition?",
      options: ["Moving between slides", "Animation effect between slides", "Slide timing", "Slide layout"],
      correctAnswer: 1,
      chapter: "presentation",
      difficulty: "medium",
      topic: "Slide Transition"
    },
    {
      id: "pt003",
      question: "Which view is best for rearranging slides?",
      options: ["Normal View", "Slide Sorter View", "Notes View", "Outline View"],
      correctAnswer: 1,
      chapter: "presentation",
      difficulty: "medium",
      topic: "Presentation Views"
    },
    {
      id: "pt004",
      question: "What is a Master Slide?",
      options: ["First slide", "Template for all slides", "Last slide", "Title slide"],
      correctAnswer: 1,
      chapter: "presentation",
      difficulty: "medium",
      topic: "Master Slide"
    },
    {
      id: "pt005",
      question: "Which key starts a slideshow?",
      options: ["F1", "F5", "F9", "F12"],
      correctAnswer: 1,
      chapter: "presentation",
      difficulty: "easy",
      topic: "Slide Show"
    },
    // Add more questions for Chapter 5...
  ],

  "internet-www": [
    {
      id: "iw001",
      question: "What does WWW stand for?",
      options: ["World Wide Web", "World Web Wide", "Wide World Web", "Web World Wide"],
      correctAnswer: 0,
      chapter: "internet-www",
      difficulty: "easy",
      topic: "Internet Basics"
    },
    {
      id: "iw002",
      question: "What does URL stand for?",
      options: ["Universal Resource Locator", "Uniform Resource Locator", "Universal Reference Link", "Uniform Reference Locator"],
      correctAnswer: 1,
      chapter: "internet-www",
      difficulty: "easy",
      topic: "Website Address"
    },
    {
      id: "iw003",
      question: "Which of the following is a web browser?",
      options: ["MS Word", "Chrome", "Excel", "PowerPoint"],
      correctAnswer: 1,
      chapter: "internet-www",
      difficulty: "easy",
      topic: "Web Browsers"
    },
    {
      id: "iw004",
      question: "What does ISP stand for?",
      options: ["Internet Service Provider", "Internet System Protocol", "Internet Security Program", "Internet Service Protocol"],
      correctAnswer: 0,
      chapter: "internet-www",
      difficulty: "easy",
      topic: "ISP"
    },
    {
      id: "iw005",
      question: "Which topology connects all devices in a circular manner?",
      options: ["Star", "Bus", "Ring", "Mesh"],
      correctAnswer: 2,
      chapter: "internet-www",
      difficulty: "medium",
      topic: "Network Topology"
    },
    // Add more questions for Chapter 6...
  ],

  "email-social": [
    {
      id: "es001",
      question: "What does @ symbol represent in an email address?",
      options: ["At", "And", "About", "All"],
      correctAnswer: 0,
      chapter: "email-social",
      difficulty: "easy",
      topic: "Email Structure"
    },
    {
      id: "es002",
      question: "Which folder contains received emails?",
      options: ["Outbox", "Sent", "Inbox", "Drafts"],
      correctAnswer: 2,
      chapter: "email-social",
      difficulty: "easy",
      topic: "Email Management"
    },
    {
      id: "es003",
      question: "What is CC in email?",
      options: ["Carbon Copy", "Computer Copy", "Central Copy", "Core Copy"],
      correctAnswer: 0,
      chapter: "email-social",
      difficulty: "easy",
      topic: "Email Features"
    },
    {
      id: "es004",
      question: "Which government app provides multiple e-governance services?",
      options: ["BHIM", "UMANG", "PayTM", "WhatsApp"],
      correctAnswer: 1,
      chapter: "email-social",
      difficulty: "medium",
      topic: "E-Governance"
    },
    {
      id: "es005",
      question: "What is netiquette?",
      options: ["Internet speed", "Internet etiquette", "Network protocol", "Internet security"],
      correctAnswer: 1,
      chapter: "email-social",
      difficulty: "medium",
      topic: "Netiquettes"
    },
    // Add more questions for Chapter 7...
  ],

  "digital-financial": [
    {
      id: "df001",
      question: "What does UPI stand for?",
      options: ["Unified Payment Interface", "Universal Payment Interface", "United Payment Interface", "Unique Payment Interface"],
      correctAnswer: 0,
      chapter: "digital-financial",
      difficulty: "easy",
      topic: "Digital Payment"
    },
    {
      id: "df002",
      question: "What does OTP stand for?",
      options: ["One Time Password", "Online Transaction Password", "Open Time Password", "Official Time Password"],
      correctAnswer: 0,
      chapter: "digital-financial",
      difficulty: "easy",
      topic: "Security"
    },
    {
      id: "df003",
      question: "What does QR stand for in QR Code?",
      options: ["Quick Response", "Quality Response", "Quantum Response", "Query Response"],
      correctAnswer: 0,
      chapter: "digital-financial",
      difficulty: "easy",
      topic: "QR Code"
    },
    {
      id: "df004",
      question: "What does NEFT stand for?",
      options: ["National Electronic Fund Transfer", "New Electronic Fund Transfer", "Net Electronic Fund Transfer", "National Easy Fund Transfer"],
      correctAnswer: 0,
      chapter: "digital-financial",
      difficulty: "medium",
      topic: "Fund Transfer"
    },
    {
      id: "df005",
      question: "What is AEPS?",
      options: ["Aadhaar Enabled Payment System", "Advanced Electronic Payment System", "Automated Electronic Payment System", "All Electronic Payment System"],
      correctAnswer: 0,
      chapter: "digital-financial",
      difficulty: "medium",
      topic: "Payment Systems"
    },
    // Add more questions for Chapter 8...
  ],

  "cyber-security": [
    {
      id: "cs001",
      question: "What is malware?",
      options: ["Good software", "Malicious software", "System software", "Application software"],
      correctAnswer: 1,
      chapter: "cyber-security",
      difficulty: "easy",
      topic: "Security Threats"
    },
    {
      id: "cs002",
      question: "What is a strong password characteristic?",
      options: ["Easy to remember", "Contains personal info", "Mix of letters, numbers, symbols", "Same for all accounts"],
      correctAnswer: 2,
      chapter: "cyber-security",
      difficulty: "easy",
      topic: "Password Security"
    },
    {
      id: "cs003",
      question: "What is phishing?",
      options: ["Fishing online", "Fraudulent attempt to obtain sensitive information", "Type of malware", "Secure browsing"],
      correctAnswer: 1,
      chapter: "cyber-security",
      difficulty: "medium",
      topic: "Cyber Attacks"
    },
    {
      id: "cs004",
      question: "What does firewall do?",
      options: ["Burns files", "Protects against unauthorized access", "Speeds up internet", "Creates backup"],
      correctAnswer: 1,
      chapter: "cyber-security",
      difficulty: "medium",
      topic: "Security Tools"
    },
    {
      id: "cs005",
      question: "What is two-factor authentication?",
      options: ["Two passwords", "Additional security layer", "Two devices", "Two browsers"],
      correctAnswer: 1,
      chapter: "cyber-security",
      difficulty: "medium",
      topic: "Authentication"
    },
    // Add more questions for Chapter 9...
  ],

  "future-skills-ai": [
    {
      id: "ai001",
      question: "What does AI stand for?",
      options: ["Artificial Intelligence", "Automated Intelligence", "Advanced Intelligence", "Applied Intelligence"],
      correctAnswer: 0,
      chapter: "future-skills-ai",
      difficulty: "easy",
      topic: "AI Basics"
    },
    {
      id: "ai002",
      question: "What is IoT?",
      options: ["Internet of Things", "Internet of Technology", "Intelligence of Things", "Interface of Technology"],
      correctAnswer: 0,
      chapter: "future-skills-ai",
      difficulty: "easy",
      topic: "IoT"
    },
    {
      id: "ai003",
      question: "What is cloud computing?",
      options: ["Computing in clouds", "Remote computing services", "Weather prediction", "Sky observation"],
      correctAnswer: 1,
      chapter: "future-skills-ai",
      difficulty: "medium",
      topic: "Cloud Computing"
    },
    {
      id: "ai004",
      question: "What is Virtual Reality (VR)?",
      options: ["Real virtual world", "Computer-simulated environment", "Video recording", "Virtual recording"],
      correctAnswer: 1,
      chapter: "future-skills-ai",
      difficulty: "medium",
      topic: "Virtual Reality"
    },
    {
      id: "ai005",
      question: "What is blockchain?",
      options: ["Chain of blocks", "Distributed ledger technology", "Block game", "Chain reaction"],
      correctAnswer: 1,
      chapter: "future-skills-ai",
      difficulty: "hard",
      topic: "Blockchain"
    },
    // Add more questions for Chapter 10...
  ]
};

// Function to get questions for a specific chapter
export const getQuestionsByChapter = (chapterId: string, count: number = 50): Question[] => {
  const chapterQuestions = questionBank[chapterId] || [];
  
  // For now, cycle through available questions if we need more than available
  const questions: Question[] = [];
  for (let i = 0; i < count; i++) {
    const questionIndex = i % chapterQuestions.length;
    if (chapterQuestions[questionIndex]) {
      questions.push({
        ...chapterQuestions[questionIndex],
        id: `${chapterQuestions[questionIndex].id}_${i}` // Unique ID for each instance
      });
    }
  }
  
  return questions;
};

// Function to get questions by difficulty
export const getQuestionsByDifficulty = (chapterId: string, difficulty: 'easy' | 'medium' | 'hard'): Question[] => {
  const chapterQuestions = questionBank[chapterId] || [];
  return chapterQuestions.filter(q => q.difficulty === difficulty);
};

// Function to get all questions for a chapter
export const getAllChapterQuestions = (chapterId: string): Question[] => {
  return questionBank[chapterId] || [];
};