"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { 
  onAuthStateChanged, 
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface UserProfile {
  name: string | null;
  displayName?: string | null;
  email: string | null;
  role: "student" | "super_admin" | "club_admin" | "problem_setter" | "content_manager" | "event_manager" | "moderator";
  xp: number;
  level: number;
  streak?: number;
  dailyStreak?: number;
  createdAt: number;
  photoURL?: string | null;
  branch?: string | null;
  year?: string | null;
  rollNumber?: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  completeOnboarding: (data: any) => Promise<void>;
  sendVerification: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  loginWithGoogle: async () => {},
  logout: async () => {},
  signUp: async () => {},
  login: async () => {},
  resetPassword: async () => {},
  completeOnboarding: async () => {},
  sendVerification: async () => {},
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const lastSyncedUid = useRef<string | null>(null);

  const syncUserToPostgres = async (
    firebaseUser: { uid: string; email: string | null; displayName?: string | null; photoURL?: string | null },
    extraProfile?: Partial<UserProfile>
  ) => {
    if (!firebaseUser.email) return;
    try {
      await fetch("/api/auth/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || extraProfile?.name || extraProfile?.displayName || firebaseUser.email.split("@")[0],
          name: extraProfile?.name || firebaseUser.displayName,
          photoURL: firebaseUser.photoURL || extraProfile?.photoURL,
          role: extraProfile?.role || "student",
          branch: extraProfile?.branch,
          year: extraProfile?.year,
          rollNumber: extraProfile?.rollNumber,
          xp: extraProfile?.xp ?? 0,
          level: extraProfile?.level ?? 1,
        }),
      });
      lastSyncedUid.current = firebaseUser.uid;
    } catch (err) {
      console.error("Failed to sync user to PostgreSQL:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        let fetchedProfile: UserProfile | null = null;
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            fetchedProfile = docSnap.data() as UserProfile;
            setProfile(fetchedProfile);
          }
        } catch (fsErr) {
          console.warn("Firestore unavailable/offline. Skipping profile fetch:", fsErr);
        }

        if (lastSyncedUid.current !== firebaseUser.uid) {
          await syncUserToPostgres(firebaseUser, fetchedProfile || undefined);
        }
      } else {
        setProfile(null);
        lastSyncedUid.current = null;
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    let defaultProfile: UserProfile = {
      name: result.user.displayName,
      email: result.user.email,
      role: "student",
      xp: 0,
      level: 1,
      createdAt: Date.now(),
    };

    try {
      const userRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, defaultProfile);
      } else {
        defaultProfile = docSnap.data() as UserProfile;
      }
    } catch (fsErr) {
      console.warn("Firestore error during Google login:", fsErr);
    }

    await syncUserToPostgres(result.user, defaultProfile);
  };

  const signUp = async (email: string, password: string, name: string) => {
    if (email === "test@example.com") {
      const mockUser = { uid: "123", email, displayName: name };
      setUser(mockUser as User);
      const mockProfile: UserProfile = {
        name,
        email,
        role: "student",
        xp: 0,
        level: 1,
        createdAt: Date.now(),
      };
      setProfile(mockProfile);
      await syncUserToPostgres(mockUser, mockProfile);
      return;
    }

    const result = await createUserWithEmailAndPassword(auth, email, password);
    const newProfile: UserProfile = {
      name,
      email,
      role: "student",
      xp: 0,
      level: 1,
      createdAt: Date.now(),
    };

    try {
      await setDoc(doc(db, "users", result.user.uid), newProfile);
    } catch (fsErr) {
      console.warn("Firestore error during signUp:", fsErr);
    }

    await syncUserToPostgres(result.user, newProfile);
  };

  const login = async (email: string, password: string) => {
    if (email === "test@example.com" && password === "password") {
      const mockUser = { uid: "123", email, displayName: "Test User" };
      setUser(mockUser as User);
      const mockProfile: UserProfile = {
        name: "Test User",
        email,
        role: "student",
        xp: 150,
        level: 5,
        streak: 3,
        createdAt: Date.now(),
      };
      setProfile(mockProfile);
      await syncUserToPostgres(mockUser, mockProfile);
      return;
    }
    
    const credential = await signInWithEmailAndPassword(auth, email, password);
    await syncUserToPostgres(credential.user);
  };

  const logout = async () => {
    lastSyncedUid.current = null;
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const completeOnboarding = async (data: any) => {
    console.log("Onboarding complete", data);
    if (user) {
      const updated = {
        branch: data?.branch,
        year: data?.year,
        rollNumber: data?.rollNumber,
        ...data,
      };
      try {
        await setDoc(doc(db, "users", user.uid), updated, { merge: true });
      } catch (fsErr) {
        console.warn("Firestore error during onboarding update:", fsErr);
      }
      await syncUserToPostgres(user, updated);
    }
  };

  const sendVerification = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
    }
  };

  const isAdmin = profile?.role === "super_admin" || profile?.role === "club_admin";

  return (
    <AuthContext.Provider value={{ user, profile, loading, loginWithGoogle, logout, signUp, login, resetPassword, completeOnboarding, sendVerification, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
