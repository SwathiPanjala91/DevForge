import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  description: string;
}

export async function getProblems() {
  const problemsRef = collection(db, "problems");
  const q = query(problemsRef, orderBy("difficulty"));
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Problem[];
}
