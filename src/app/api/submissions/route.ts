import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyAuthToken } from "@/lib/auth/verifyToken";
import { syncUserDB } from "@/lib/db/service";

export async function POST(request: NextRequest) {
  try {
    const verified = await verifyAuthToken(request);
    if (!verified || !verified.uid) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in to submit code." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { problemSlug, code, language, status = "Accepted", runtimeMs = 2, memoryKb = 41800, passedTests = 3, totalTests = 3 } = body;

    if (!problemSlug || !code || !language) {
      return NextResponse.json(
        { error: "Missing required fields: problemSlug, code, and language are required" },
        { status: 400 }
      );
    }

    // 1. Fetch authenticated user from PostgreSQL
    let user = await prisma.user.findUnique({
      where: { uid: verified.uid },
    });

    if (!user) {
      user = await syncUserDB({
        uid: verified.uid,
        email: verified.email,
      });
    }

    // 2. Fetch problem from PostgreSQL
    let problem = await prisma.problem.findUnique({
      where: { slug: problemSlug },
    });

    if (!problem) {
      // Fallback: seed or create problem if missing
      problem = await prisma.problem.create({
        data: {
          slug: problemSlug,
          title: problemSlug.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
          difficulty: "Easy",
          category: "Algorithms",
          description: "Problem description",
          tags: ["Algorithms"],
          xpReward: 50,
        },
      });
    }

    // 3. Check if user already has a previous Accepted submission for this problem
    const previousAccepted = await prisma.submission.findFirst({
      where: {
        userId: user.id,
        problemId: problem.id,
        status: "Accepted",
      },
    });

    const isFirstAccepted = status === "Accepted" && !previousAccepted;
    const xpEarned = isFirstAccepted ? (problem.xpReward || 50) : 0;

    // 4. Create Submission in PostgreSQL
    const submission = await prisma.submission.create({
      data: {
        userId: user.id,
        problemId: problem.id,
        code,
        language,
        status,
        runtimeMs: Number(runtimeMs) || 0,
        memoryKb: Number(memoryKb) || 0,
        passedTests: Number(passedTests) || 0,
        totalTests: Number(totalTests) || 0,
        xpEarned,
      },
    });

    // 5. Update Problem statistics
    await prisma.problem.update({
      where: { id: problem.id },
      data: {
        totalSubmissions: { increment: 1 },
        totalAccepted: status === "Accepted" ? { increment: 1 } : undefined,
      },
    });

    // 6. Update User XP & problemsSolved ONLY if first accepted solution
    if (isFirstAccepted) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          problemsSolved: { increment: 1 },
          xp: { increment: xpEarned },
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: isFirstAccepted
        ? `Submission accepted! First time solved (+${xpEarned} XP)`
        : status === "Accepted"
        ? "Submission accepted! (Previously solved problem - 0 duplicate XP awarded)"
        : "Submission stored in PostgreSQL database.",
      submission,
      isFirstAccepted,
      xpEarned,
    });
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED" || error?.message?.includes("NEXT_PRERENDER_INTERRUPTED")) {
      throw error;
    }
    console.error("Error in POST /api/submissions:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save submission" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const verified = await verifyAuthToken(request);
    if (!verified || !verified.uid) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const problemSlug = searchParams.get("problemSlug");

    const user = await prisma.user.findUnique({
      where: { uid: verified.uid },
    });

    if (!user) {
      return NextResponse.json({ success: true, submissions: [] });
    }

    let whereClause: any = { userId: user.id };
    if (problemSlug) {
      const problem = await prisma.problem.findUnique({
        where: { slug: problemSlug },
      });
      if (problem) {
        whereClause.problemId = problem.id;
      }
    }

    const submissions = await prisma.submission.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      include: {
        problem: {
          select: { title: true, slug: true, difficulty: true },
        },
      },
      take: 20,
    });

    return NextResponse.json({ success: true, submissions });
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED" || error?.message?.includes("NEXT_PRERENDER_INTERRUPTED")) {
      throw error;
    }
    console.error("Error in GET /api/submissions:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}
