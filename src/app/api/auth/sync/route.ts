import { NextRequest, NextResponse } from "next/server";
import { syncUserDB } from "@/lib/db/service";
import { verifyAuthToken } from "@/lib/auth/verifyToken";

export async function POST(request: NextRequest) {
  try {
    const verified = await verifyAuthToken(request);
    const body = await request.json();

    const uid = verified?.uid || body?.uid;
    const email = verified?.email || body?.email;

    if (!uid || !email) {
      return NextResponse.json(
        { error: "Missing required fields: valid authentication or uid/email are required" },
        { status: 400 }
      );
    }

    const syncData = {
      ...body,
      uid,
      email,
    };

    const user = await syncUserDB(syncData);
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED" || error?.message?.includes("NEXT_PRERENDER_INTERRUPTED")) {
      throw error;
    }
    console.error("Error in /api/auth/sync route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to sync user to database" },
      { status: 500 }
    );
  }
}
