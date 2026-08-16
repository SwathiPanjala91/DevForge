import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit, doc, getDoc } from "firebase/firestore";
import { Problem, Event, UserProgress } from "@/types";

/**
 * Get dashboard stats for a student
 * Gracefully handles empty states.
 */
export async function getDashboardStats(userId: string) {
  try {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    if (!snap.exists()) return null;
    
    // Default to some logical base stats if empty
    return {
      xpThisWeek: 120, // Mocked for UI, ideally derived from xpTransactions
      collegeRank: 14,
      collegeRankChange: 3,
      branchRank: 3,
      branchRankChange: 1,
      problemsSolved: snap.data().problemsSolved || 34,
    };
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
}

/**
 * Get current learning progress (C Programming)
 */
export async function getLearningProgress(userId: string): Promise<UserProgress | null> {
  // In a real app, query `learningProgress` where userId = userId
  // Returning a mock for now to build the UI
  return {
    userId,
    courseId: "c-programming",
    completedTopicIds: ["1", "2", "3", "4", "5", "6", "7", "8"],
    currentTopicId: "6", // Loops in C
    percentage: 62,
    lastAccessed: new Date().toISOString(),
  };
}

/**
 * Get the daily challenge
 */
export async function getDailyChallenge() {
  return {
    id: "sum-of-n",
    title: "Sum of N Numbers",
    description: "Calculate the sum 1 + 2 + ... + N.",
    difficulty: "Easy",
    tags: ["Loops", "Math"],
    xpReward: 10,
    solvedPercentage: 68
  };
}

/**
 * Get Upcoming Events
 */
export async function getUpcomingEvents(): Promise<Event[]> {
  try {
    const eventsRef = collection(db, "events");
    const q = query(eventsRef, orderBy("date", "asc"), limit(2));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Return beautiful mock events for testing if empty
      return [
        {
          id: "contest-12",
          title: "Weekly Coding Contest #12",
          type: "Contest",
          description: "Compete globally",
          date: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
          location: "Online",
          registeredCount: 128,
        },
        {
          id: "workshop-1",
          title: "C Programming Workshop",
          type: "Workshop",
          description: "Learn advanced pointers",
          date: new Date(Date.now() + 86400000 * 6).toISOString(),
          location: "Seminar Hall, Block-1",
          registeredCount: 85,
        }
      ];
    }
    
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Event));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export async function getLeaderboardTop3() {
  return [
    { rank: 1, name: "Rahul Reddy", xp: 2850, avatar: null },
    { rank: 2, name: "Sushmitha D", xp: 2710, avatar: null },
    { rank: 3, name: "Aditya Verma", xp: 2550, avatar: null },
  ];
}
