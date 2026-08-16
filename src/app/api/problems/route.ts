import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyAuthToken } from "@/lib/auth/verifyToken";

const SEED_PROBLEMS = [
  {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    tags: ["Arrays", "Hash Table"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    xpReward: 50,
    acceptanceRate: 48.5,
  },
  {
    slug: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    tags: ["Linked List", "Math"],
    description: "You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.",
    xpReward: 100,
    acceptanceRate: 39.2,
  },
  {
    slug: "palindrome-number",
    title: "Palindrome Number",
    difficulty: "Easy",
    category: "Math",
    tags: ["Math"],
    description: "Given an integer x, return true if x is a palindrome, and false otherwise.",
    xpReward: 50,
    acceptanceRate: 53.1,
  },
  {
    slug: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Strings",
    tags: ["Strings", "Sliding Window"],
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    xpReward: 100,
    acceptanceRate: 33.8,
  },
];

async function seedProblemsIfEmpty() {
  const count = await prisma.problem.count();
  if (count === 0) {
    for (const prob of SEED_PROBLEMS) {
      await prisma.problem.create({
        data: prob,
      });
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    await seedProblemsIfEmpty();

    const verified = await verifyAuthToken(request);
    const userSubmissionsMap = new Map<string, { hasAccepted: boolean; total: number }>();

    if (verified?.uid) {
      const user = await prisma.user.findUnique({
        where: { uid: verified.uid },
        include: { submissions: true },
      });
      if (user) {
        user.submissions.forEach((sub) => {
          const current = userSubmissionsMap.get(sub.problemId) || { hasAccepted: false, total: 0 };
          current.total += 1;
          if (sub.status === "Accepted") current.hasAccepted = true;
          userSubmissionsMap.set(sub.problemId, current);
        });
      }
    }

    const problems = await prisma.problem.findMany({
      orderBy: { createdAt: "asc" },
    });

    const result = problems.map((p) => {
      const subInfo = userSubmissionsMap.get(p.id);
      let status = "Unsolved";
      if (subInfo?.hasAccepted) {
        status = "Solved";
      } else if (subInfo && subInfo.total > 0) {
        status = "Attempted";
      }

      return {
        id: p.slug,
        problemId: p.id,
        slug: p.slug,
        title: p.title,
        difficulty: p.difficulty,
        topic: p.category,
        status,
        acceptance: `${p.acceptanceRate}%`,
        xpReward: p.xpReward,
      };
    });

    return NextResponse.json({ success: true, problems: result });
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED" || error?.message?.includes("NEXT_PRERENDER_INTERRUPTED")) {
      throw error;
    }
    console.error("Error in GET /api/problems:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch problems" },
      { status: 500 }
    );
  }
}
