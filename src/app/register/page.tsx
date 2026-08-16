"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { UserRole } from "@/types";
import { Mail, Lock, User, AtSign, ArrowRight, ShieldCheck, Check, X } from "lucide-react";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password Strength Checker
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isPasswordValid = hasMinLength && hasNumber;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username || !email || !password || !confirmPassword) {
      showToast("Please fill in all required fields", "warning");
      return;
    }
    if (password !== confirmPassword) {
      showToast("Passwords do not match", "warning");
      return;
    }
    if (!isPasswordValid) {
      showToast("Password must be at least 8 characters long and contain a number", "warning");
      return;
    }
    if (!termsAccepted) {
      showToast("Please accept the terms and conditions to proceed", "warning");
      return;
    }

    setIsLoading(true);
    try {
      await signUp(email, password, name);
      showToast("Account created successfully! Welcome to the platform.", "success");
      router.push("/onboarding");
    } catch (err: any) {
      showToast(err.message || "Failed to create account", "error");
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
          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-white">Create Account</h2>
            <p className="text-xs text-white/50 mt-1 font-mono">Join 48,000+ developers & earn 250 XP bonus</p>
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
              label="Unique Username"
              type="text"
              placeholder="alexrivera"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, ""))}
              leftIcon={<AtSign className="w-4 h-4 text-primary" />}
              required
            />

            <Input
              label="Developer Email"
              type="email"
              placeholder="alex@cybercode.dev"
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

            {/* Password Strength Requirements */}
            {password.length > 0 && (
              <div className="p-3 rounded-xl bg-card/80 border border-border text-xs space-y-1 font-mono">
                <div className={`flex items-center gap-2 ${hasMinLength ? "text-secondary" : "text-white/50"}`}>
                  {hasMinLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />} At least 8 characters
                </div>
                <div className={`flex items-center gap-2 ${hasNumber ? "text-secondary" : "text-white/50"}`}>
                  {hasNumber ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />} Contains at least one number
                </div>
              </div>
            )}

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4 text-primary" />}
              required
            />

            <label className="flex items-center gap-2 text-xs text-white/70 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="rounded bg-card border-border text-primary accent-cyan-500"
              />
              <span>I agree to the Terms of Service & Privacy Policy</span>
            </label>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="mt-2 w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Register Account (+250 XP)
            </Button>
          </form>

          <p className="text-xs text-center text-white/50 mt-6">
            Already have a student account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">
              Log In
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
