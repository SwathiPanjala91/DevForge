"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, Lock, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please enter your email and password", "warning");
      return;
    }
    setIsLoading(true);
    try {
      await login(email, password);
      showToast("Logged in successfully! Welcome back.", "success");
      router.push("/dashboard");
    } catch (err: any) {
      showToast(err.message || "Failed to log in", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await loginWithGoogle();
      showToast("Logged in with Google!", "success");
      router.push("/dashboard");
    } catch (err: any) {
      showToast(err.message || "Google sign-in error", "error");
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
            <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
            <p className="text-xs text-white/50 mt-1 font-mono">Sign in to access your developer portal</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-white/50 cursor-pointer">
                <input type="checkbox" className="rounded bg-card border-border text-primary" defaultChecked />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="mt-2 w-full"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Platform
            </Button>
          </form>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <span className="relative bg-card px-3 text-xs text-white/50 font-mono">OR CONTINUE WITH</span>
          </div>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleGoogleLogin}
            isLoading={isLoading}
            leftIcon={<Globe className="w-4 h-4 text-primary" />}
            className="w-full"
          >
            Google Identity
          </Button>

          <p className="text-xs text-center text-white/50 mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary font-bold hover:underline">
              Sign Up Free
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
