export type UserRole = 
  | "student" 
  | "super_admin" 
  | "club_admin" 
  | "problem_setter" 
  | "content_manager" 
  | "event_manager" 
  | "moderator";

export type EngineeringBranch = "IT" | "CSE" | "ECE" | "EEE" | "MECH" | "CIVIL";
export type AcademicYear = "1st Year" | "2nd Year" | "3rd Year" | "4th Year";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  username: string;
  rollNumber?: string;
  branch: EngineeringBranch;
  year: AcademicYear;
  semester?: string;
  section?: string;
  photoURL?: string;
  role: UserRole;
  department?: string;
  bio?: string;
  skills?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  leetcodeUrl?: string;
  codeforcesUrl?: string;
  hackerrankUrl?: string;
  xp: number;
  level: number;
  rank: number;
  collegeRank?: number;
  branchRank?: number;
  yearRank?: number;
  dailyStreak: number;
  longestStreak: number;
  problemsSolved: number;
  solvedProblemIds?: string[];
  isVerified: boolean;
  onboardingCompleted: boolean;
  isActive: boolean;
  isSuspended?: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  tags: string[];
  xpReward: number;
  acceptanceRate: number;
  totalSubmissions: number;
  totalAccepted: number;
  starterCode: Record<string, string>;
  testCases: Array<{ input: string; output: string; isHidden?: boolean }>;
  hints?: string[];
  editorial?: string;
  createdAt: string;
}

export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  code: string;
  language: string;
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Compile Error" | "Runtime Error";
  runtimeMs: number;
  memoryKb: number;
  passedTests: number;
  totalTests: number;
  xpEarned: number;
  createdAt: string;
}

export interface Contest {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: "Upcoming" | "Live" | "Ended";
  participantsCount: number;
  problemIds: string[];
}

export interface Event {
  id: string;
  title: string;
  type: "Workshop" | "Hackathon" | "Contest" | "Talk" | "Bootcamp";
  description: string;
  date: string;
  location: string;
  speaker?: string;
  capacity?: number;
  registeredCount: number;
  isRegistered?: boolean;
}

export interface AcademicSubject {
  id: string;
  branch: EngineeringBranch;
  year: AcademicYear;
  semester: string;
  subjectName: string;
  subjectCode: string;
  units: Array<{
    unitNumber: number;
    title: string;
    pdfUrl?: string;
    notesCount: number;
  }>;
  previousPapers: Array<{
    year: string;
    type: "Mid 1" | "Mid 2" | "Semester End";
    fileUrl: string;
  }>;
}

export interface Certificate {
  id: string;
  title: string;
  code: string;
  issuedDate: string;
  issuer: string;
  skills: string[];
  studentName?: string;
  studentRollNumber?: string;
}

export interface ForumPost {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  title: string;
  content: string;
  category: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  totalLessons: number;
  topics: Topic[];
}

export interface Topic {
  id: string;
  courseId: string;
  order: number;
  title: string;
  description: string;
  xpReward: number;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completedTopicIds: string[];
  currentTopicId: string | null;
  percentage: number;
  lastAccessed: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "achievement" | "info" | "warning" | "success";
  isRead: boolean;
  createdAt: string;
  link?: string;
}
