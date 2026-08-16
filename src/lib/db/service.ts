import { prisma } from "./prisma";

export interface SyncUserData {
  uid: string;
  email: string;
  displayName?: string | null;
  name?: string | null;
  photoURL?: string | null;
  role?: string | null;
  branch?: string | null;
  year?: string | null;
  rollNumber?: string | null;
  xp?: number | null;
  level?: number | null;
  onboardingCompleted?: boolean | null;
  section?: string | null;
  department?: string | null;
  bio?: string | null;
}

export async function syncUserDB(data: SyncUserData) {
  if (!data || !data.uid || !data.email) {
    throw new Error("Missing required user data for sync (uid and email are required)");
  }

  const displayName = data.displayName || data.name || data.email.split("@")[0] || "Developer";
  const baseUsername = data.email.split("@")[0].replace(/[^a-zA-Z0-9_]/g, "") || "user";
  const defaultUsername = `${baseUsername}_${data.uid.slice(0, 5)}`;

  // Find existing user if any to preserve custom username or onboarding details
  const existingUser = await prisma.user.findUnique({
    where: { uid: data.uid },
  });

  const username = existingUser?.username || defaultUsername;
  const branch = data.branch || existingUser?.branch || "General";
  const year = data.year || existingUser?.year || "1st Year";
  const role = data.role || existingUser?.role || "student";
  const rollNumber = data.rollNumber || existingUser?.rollNumber || null;
  const section = data.section || existingUser?.section || null;
  const department = data.department || existingUser?.department || null;
  const bio = data.bio || existingUser?.bio || null;
  const onboardingCompleted = data.onboardingCompleted ?? existingUser?.onboardingCompleted ?? false;
  const photoURL = data.photoURL || existingUser?.photoURL || null;

  const now = new Date();

  return await prisma.user.upsert({
    where: { uid: data.uid },
    update: {
      email: data.email,
      displayName: displayName,
      photoURL: photoURL,
      branch: branch,
      year: year,
      role: role,
      rollNumber: rollNumber,
      section: section,
      department: department,
      bio: bio,
      onboardingCompleted: onboardingCompleted,
      lastLoginAt: now,
    },
    create: {
      id: `usr_${data.uid}`,
      uid: data.uid,
      email: data.email,
      displayName: displayName,
      username: username,
      branch: branch,
      year: year,
      role: role,
      rollNumber: rollNumber,
      section: section,
      department: department,
      bio: bio,
      onboardingCompleted: onboardingCompleted,
      photoURL: photoURL,
      xp: data.xp ?? 0,
      level: data.level ?? 1,
      lastLoginAt: now,
    },
  });
}
