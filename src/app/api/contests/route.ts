import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyAuthToken } from "@/lib/auth/verifyToken";

const INITIAL_CONTESTS = [
  {
    id: "c1",
    title: "DevForge Weekly 104",
    type: "Contest",
    description: "Algorithmic challenge focusing on Dynamic Programming and Graphs.",
    date: new Date(Date.now() + 86400000 * 2), // 2 days from now
    location: "Online Arena",
    capacity: 2000,
    registeredCount: 1240,
  },
  {
    id: "c2",
    title: "Algo Masters Sprint",
    type: "Sprint",
    description: "Speed coding contest featuring 4 fast-paced data structure problems.",
    date: new Date(Date.now() + 86400000 * 5), // 5 days from now
    location: "Online Arena",
    capacity: 1500,
    registeredCount: 890,
  },
  {
    id: "c3",
    title: "Freshman Code Cup",
    type: "Contest",
    description: "Exclusive competition for 1st & 2nd year engineering students.",
    date: new Date(Date.now() + 3600000 * 1), // 1 hour from now (Active)
    location: "Online Arena",
    capacity: 1000,
    registeredCount: 450,
  },
  {
    id: "c4",
    title: "DevForge Biweekly 21",
    type: "Contest",
    description: "Biweekly global coding contest with 4 problems.",
    date: new Date(Date.now() - 86400000 * 2), // 2 days ago (Past)
    location: "Online Arena",
    capacity: 2500,
    registeredCount: 2100,
  },
  {
    id: "c5",
    title: "Graph Theory Challenge",
    type: "Challenge",
    description: "Deep dive into Shortest Path, MST, and Network Flow algorithms.",
    date: new Date(Date.now() - 86400000 * 7), // 1 week ago (Past)
    location: "Online Arena",
    capacity: 2000,
    registeredCount: 1540,
  },
];

async function seedContestsIfEmpty() {
  const count = await prisma.event.count();
  if (count === 0) {
    for (const contest of INITIAL_CONTESTS) {
      await prisma.event.create({
        data: contest,
      });
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    await seedContestsIfEmpty();

    const verified = await verifyAuthToken(request);
    let registeredEventIds = new Set<string>();

    if (verified?.uid) {
      const user = await prisma.user.findUnique({
        where: { uid: verified.uid },
        include: { eventRegistrations: true },
      });
      if (user) {
        user.eventRegistrations.forEach((reg) => registeredEventIds.add(reg.eventId));
      }
    }

    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
    });

    const now = new Date();

    const contests = events.map((event) => {
      let status: "upcoming" | "active" | "past" = "upcoming";
      const eventTime = new Date(event.date).getTime();
      const diffMs = eventTime - now.getTime();

      if (diffMs < -7200000) {
        status = "past";
      } else if (diffMs <= 7200000 && diffMs >= -7200000) {
        status = "active";
      } else {
        status = "upcoming";
      }

      let startTimeFormatted = "";
      if (status === "active") {
        startTimeFormatted = "Active Now";
      } else if (status === "upcoming") {
        const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        startTimeFormatted = days <= 1 ? "Starts today" : `Starts in ${days} days`;
      } else {
        const daysAgo = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24));
        startTimeFormatted = `Ended ${daysAgo} days ago`;
      }

      return {
        id: event.id,
        title: event.title,
        status,
        startTime: startTimeFormatted,
        date: event.date,
        duration: "2 Hours",
        participants: event.registeredCount,
        prize: "2000 XP",
        isRegistered: registeredEventIds.has(event.id),
      };
    });

    return NextResponse.json({ success: true, contests });
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED" || error?.message?.includes("NEXT_PRERENDER_INTERRUPTED")) {
      throw error;
    }
    console.error("Error in GET /api/contests:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch contests" },
      { status: 500 }
    );
  }
}
