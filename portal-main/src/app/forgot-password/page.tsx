"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      await resetPassword(email);
      setSubmitted(true);
      showToast("Reset password link dispatched to your email address!", "success");
    } catch (err: any) {
      showToast(err.message || "Failed to process password recovery", "error");
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
          <Link href="/login" className="inline-flex items-center gap-2 text-xs text-primary hover:underline mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>

          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-extrabold text-white">Reset Password</h2>
                <p className="text-xs text-white/50 mt-1">Enter your registered email to receive a recovery link.</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Registered Email"
                  type="email"
                  placeholder="alex@cybercode.dev"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4 text-primary" />}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  Send Recovery Link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-secondary flex items-center justify-center border border-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Link Sent!</h3>
              <p className="text-xs text-white/70">
                Check your inbox at <span className="text-cyan-300 font-bold">{email}</span> for instructions to reset your password.
              </p>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </div>
  );
}
