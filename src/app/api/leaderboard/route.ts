import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      orderBy: { xp: "desc" },
      take: 50,
      select: {
        id: true,
        displayName: true,
        username: true,
        xp: true,
        level: true,
        branch: true,
        year: true,
        photoURL: true,
      },
    });

    const leaderboard = users.map((u, idx) => ({
      id: u.id,
      rank: idx + 1,
      name: u.displayName || u.username,
      xp: u.xp,
      level: u.level,
      branch: u.branch,
      year: u.year,
      avatar: (u.displayName || u.username).slice(0, 2).toUpperCase(),
    }));

    return NextResponse.json({ success: true, leaderboard });
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED" || error?.message?.includes("NEXT_PRERENDER_INTERRUPTED")) {
      throw error;
    }
    console.error("Error in GET /api/leaderboard:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
