export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  questions: Question[];
}

export interface UserProgress {
  moduleId: string;
  completedQuestions: string[];
  score: number;
  totalPoints: number;
  completed: boolean;
  lastAccessed: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface UserStats {
  totalScore: number;
  modulesCompleted: number;
  questionsAnswered: number;
  correctAnswers: number;
  streak: number;
  level: number;
  achievements: Achievement[];
  progress: UserProgress[];
}
