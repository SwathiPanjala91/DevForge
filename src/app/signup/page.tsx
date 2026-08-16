"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, Lock, User, ArrowRight, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, loginWithGoogle } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      showToast("Please fill in all required fields", "warning");
      return;
    }
    if (password !== confirmPassword) {
      showToast("Passwords do not match", "warning");
      return;
    }
    if (password.length < 8) {
      showToast("Password must be at least 8 characters long", "warning");
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password, name);
      showToast("Account created successfully! Welcome to JNTUH UCEJ Coding Club.", "success");
      router.push("/onboarding");
    } catch (err: any) {
      showToast(err.message || "Failed to create account", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      showToast("Signed up with Google!", "success");
      router.push("/onboarding");
    } catch (err: any) {
      showToast(err.message || "Google sign-up error", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <GlassCard className="border border-primary/30 shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white">Join Platform</h2>
            <p className="text-xs text-white/50 mt-1 font-mono">Create your JNTUH UCEJ developer identity</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Alex Rivera"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4 text-primary" />}
              required
            />

            <Input
              label="Student Email"
              type="email"
              placeholder="alex@jntuhucej.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-primary" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4 text-primary" />}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4 text-primary" />}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="mt-2 w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Create Student Account (+250 XP)
            </Button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative bg-card px-3 text-xs text-white/50 font-mono">OR SIGN UP WITH</span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleGoogleSignUp}
            isLoading={isLoading}
            leftIcon={<Globe className="w-4 h-4 text-primary" />}
            className="w-full"
          >
            Google Identity
          </Button>

          <p className="text-xs text-center text-white/50 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Log In
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
