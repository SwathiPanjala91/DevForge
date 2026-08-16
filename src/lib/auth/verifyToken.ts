import { NextRequest } from "next/server";

export interface VerifiedAuthUser {
  uid: string;
  email: string;
}

export async function verifyAuthToken(req: NextRequest): Promise<VerifiedAuthUser | null> {
  try {
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const idToken = authHeader.split("Bearer ")[1]?.trim();
    if (!idToken) return null;

    const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
    if (!apiKey) {
      console.error("Missing NEXT_PUBLIC_FIREBASE_API_KEY for token verification");
      return null;
    }

    // Call Google Firebase Identity Toolkit API to verify token server-side
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );

    if (!response.ok) {
      const errData = await response.json();
      console.warn("Firebase token verification failed server-side:", errData);
      return null;
    }

    const data = await response.json();
    const user = data.users?.[0];
    if (!user || !user.localId) {
      return null;
    }

    return {
      uid: user.localId,
      email: user.email || "",
    };
  } catch (error: any) {
    if (error?.digest === "NEXT_PRERENDER_INTERRUPTED" || error?.message?.includes("NEXT_PRERENDER_INTERRUPTED")) {
      throw error;
    }
    console.error("Error verifying Firebase auth token server-side:", error);
    return null;
  }
}
