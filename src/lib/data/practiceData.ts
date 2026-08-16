export interface Concept {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Lab {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeEstimate: string; // e.g. "30 mins"
  isCompleted: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  status: 'Pending' | 'Completed';
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  concepts: Concept[];
  labs: Lab[];
  assignments: Assignment[];
}

export interface LearningTrack {
  id: string;
  title: string;
  description: string;
  status: 'ACTIVE' | 'COMING SOON';
  progress?: number;
  totalModules?: number;
  completedModules?: number;
  modules?: Module[];
  icon?: string;
}

export const practiceData: LearningTrack[] = [
  {
    id: 'track-c',
    title: 'C Programming',
    description: 'Master the fundamentals of C programming, from memory management to data structures.',
    status: 'ACTIVE',
    progress: 62,
    totalModules: 12,
    completedModules: 5,
    icon: 'c-icon',
    modules: [
      { id: 'm01', slug: 'intro', title: '01. Introduction to C', description: 'Basics of C', concepts: [], labs: [], assignments: [] },
      { id: 'm02', slug: 'variables', title: '02. Variables & Data Types', description: 'Data types in C', concepts: [], labs: [], assignments: [] },
      { id: 'm03', slug: 'operators', title: '03. Operators', description: 'Operators in C', concepts: [], labs: [], assignments: [] },
      { id: 'm04', slug: 'control-flow', title: '04. Control Flow', description: 'If/else, switch', concepts: [], labs: [], assignments: [] },
      {
        id: 'm05',
        slug: 'loops',
        title: '05. Loops',
        description: 'Master while, do-while, and for loops in C programming.',
        concepts: [
          { id: 'c01', title: 'Introduction to Loops', isCompleted: true },
          { id: 'c02', title: 'The While Loop', isCompleted: true },
          { id: 'c03', title: 'The Do-While Loop', isCompleted: true },
          { id: 'c04', title: 'The For Loop', isCompleted: false },
          { id: 'c05', title: 'Break and Continue Statements', isCompleted: false },
          { id: 'c06', title: 'Nested Loops', isCompleted: false },
        ],
        labs: [
          { id: 'l01', title: 'Basic While Loop Implementation', difficulty: 'Beginner', timeEstimate: '15 mins', isCompleted: true },
          { id: 'l02', title: 'Number Guessing Game with Do-While', difficulty: 'Beginner', timeEstimate: '20 mins', isCompleted: true },
          { id: 'l03', title: 'Factorial Calculator with For Loop', difficulty: 'Intermediate', timeEstimate: '30 mins', isCompleted: false },
          { id: 'l04', title: 'Pattern Generation using Nested Loops', difficulty: 'Advanced', timeEstimate: '45 mins', isCompleted: false },
        ],
        assignments: [
          { id: 'a01', title: 'Prime Number Generator', description: 'Write a program to generate all prime numbers up to N using loops.', status: 'Pending' }
        ]
      },
      { id: 'm06', slug: 'functions', title: '06. Functions', description: 'Functions in C', concepts: [], labs: [], assignments: [] },
      { id: 'm07', slug: 'arrays', title: '07. Arrays', description: 'Arrays in C', concepts: [], labs: [], assignments: [] },
      { id: 'm08', slug: 'pointers', title: '08. Pointers', description: 'Pointers in C', concepts: [], labs: [], assignments: [] },
      { id: 'm09', slug: 'strings', title: '09. Strings', description: 'Strings in C', concepts: [], labs: [], assignments: [] },
      { id: 'm10', slug: 'structs', title: '10. Structures', description: 'Structs and Unions', concepts: [], labs: [], assignments: [] },
      { id: 'm11', slug: 'file-io', title: '11. File I/O', description: 'File handling', concepts: [], labs: [], assignments: [] },
      { id: 'm12', slug: 'dynamic-memory', title: '12. Dynamic Memory', description: 'malloc, calloc, free', concepts: [], labs: [], assignments: [] },
    ]
  },
  {
    id: 'track-java',
    title: 'Java',
    description: 'Object-oriented programming with Java.',
    status: 'COMING SOON',
    icon: 'java-icon'
  },
  {
    id: 'track-python',
    title: 'Python',
    description: 'Learn Python for data science and web development.',
    status: 'COMING SOON',
    icon: 'python-icon'
  },
  {
    id: 'track-cpp',
    title: 'C++',
    description: 'Advanced systems programming with C++.',
    status: 'COMING SOON',
    icon: 'cpp-icon'
  }
];
