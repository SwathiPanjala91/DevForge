import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { verifyAuthToken } from "@/lib/auth/verifyToken";
import { syncUserDB } from "@/lib/db/service";

export async function POST(request: NextRequest) {
  try {
    const verified = await verifyAuthToken(request);
    if (!verified || !verified.uid) {
      return NextResponse.json(
        { error: "Authentication required. Please sign in to register for contests." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { eventId } = body;

    if (!eventId) {
      return NextResponse.json(
        { error: "Missing required eventId" },
        { status: 400 }
      );
    }

    // 1. Ensure user exists in PostgreSQL User table using verified UID
    let user = await prisma.user.findUnique({
      where: { uid: verified.uid },
    });

    if (!user) {
      user = await syncUserDB({
        uid: verified.uid,
        email: verified.email,
      });
    }

    // 2. Check if contest exists in PostgreSQL Event table
    const contest = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!contest) {
      return NextResponse.json(
        { error: "Contest not found" },
        { status: 404 }
      );
    }

    // 3. Check for existing registration in PostgreSQL
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId: user.id,
          eventId: contest.id,
        },
      },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { error: "You are already registered for this contest." },
        { status: 400 }
      );
    }

    // 4. Create EventRegistration record & increment registeredCount in PostgreSQL
    const registration = await prisma.eventRegistration.create({
      data: {
        userId: user.id,
        eventId: contest.id,
      },
    });

    const updatedContest = await prisma.event.update({
      where: { id: contest.id },
      data: {
        registeredCount: { increment: 1 },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully registered for ${contest.title}!`,
      registration,
      registeredCount: updatedContest.registeredCount,
    });
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED" || error?.message?.includes("NEXT_PRERENDER_INTERRUPTED")) {
      throw error;
    }
    console.error("Error in POST /api/contests/register:", error);
    return NextResponse.json(
      { error: error.message || "Failed to register for contest" },
      { status: 500 }
    );
  }
}
