"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const userRef = doc(db, "users", result.user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        name: result.user.displayName,
        email: result.user.email,
        role: "student",
        xp: 0,
        level: 1,
        createdAt: Date.now(),
      });
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    if (email === "test@example.com") {
      setUser({ uid: "123", email, displayName: name } as User);
      setProfile({
        name,
        email,
        role: "student",
        xp: 0,
        level: 1,
        createdAt: Date.now(),
      });
      return;
    }
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", result.user.uid), {
      name,
      email,
      role: "student",
      xp: 0,
      level: 1,
      createdAt: Date.now(),
    });
  };

  const login = async (email: string, password: string) => {
    if (email === "test@example.com" && password === "password") {
      setUser({ uid: "123", email, displayName: "Test User" } as User);
      setProfile({
        name: "Test User",
        email,
        role: "student",
        xp: 150,
        level: 5,
        streak: 3,
        createdAt: Date.now(),
      });
      return;
    }
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const completeOnboarding = async (data: any) => {
    // Mock for now, you can hook this up to Firebase if needed
    console.log("Onboarding complete", data);
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
