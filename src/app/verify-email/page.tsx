"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Mail, CheckCircle2, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default function VerifyEmailPage() {
  const { sendVerification, profile } = useAuth();
  const { showToast } = useToast();
  const [sending, setSending] = useState(false);

  const handleResend = async () => {
    setSending(true);
    try {
      await sendVerification();
      showToast("Verification email sent! Please check your inbox.", "success");
    } catch (err: any) {
      showToast(err.message || "Failed to send verification email", "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <GlassCard className="border border-primary/30 p-8 text-center flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center border border-primary shadow-lg">
            <Mail className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-extrabold text-white">Verify Student Email</h2>
          <p className="text-xs text-white/70 leading-relaxed">
            We sent a verification link to <span className="text-primary/80 font-mono font-bold">{profile?.email || "your email"}</span>. Please verify your account to unlock problem submissions.
          </p>

          <div className="flex flex-col gap-3 w-full mt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleResend}
              isLoading={sending}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Resend Verification Email
            </Button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
