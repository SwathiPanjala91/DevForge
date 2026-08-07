"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Code2, Globe, Share2, Send, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/context/ToastContext";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const { showToast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast("Successfully subscribed to CyberCode Weekly Digest!", "success");
    setEmail("");
  };

  return (
    <footer className="relative z-20 pt-20 pb-10 border-t border-primary/20 bg-card/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-border">
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-card border border-primary/30 flex items-center justify-center text-primary">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                JNTUH UCEJ <span className="text-primary">CODING CLUB</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-md">
              The ultimate digital campus ecosystem for ambitious developers. Elevate software engineering skills, tackle algorithmic challenges, and join the top tech minds at JNTUH UCEJ.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                Systems Operational (99.99% Uptime)
              </div>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Platform</h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li><Link href="/" className="hover:text-primary/80 transition-colors">Home</Link></li>
                <li><Link href="/login" className="hover:text-primary/80 transition-colors">Authentication</Link></li>
                <li><span className="text-gray-600 cursor-not-allowed">Problems (Phase 2)</span></li>
                <li><span className="text-gray-600 cursor-not-allowed">Leaderboard (Phase 2)</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-4">Resources</h4>
              <ul className="space-y-2.5 text-sm text-white/50">
                <li><span className="text-gray-600 cursor-not-allowed">Dashboard (Phase 2)</span></li>
                <li><span className="text-gray-600 cursor-not-allowed">Learning Hub (Phase 2)</span></li>
                <li><span className="text-gray-600 cursor-not-allowed">Community (Phase 3)</span></li>
                <li><span className="text-gray-600 cursor-not-allowed">Admin Portal (Phase 2)</span></li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Join the Intel Digest</h4>
            <p className="text-xs text-white/50">Get weekly algorithms, contest updates, and platform news straight to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter developer email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" variant="primary" className="px-4 shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© 2024 JNTUH UCEJ Coding Club. Built for the students.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors"><Code2 className="w-4 h-4" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Globe className="w-4 h-4" /></a>
            <a href="#" className="hover:text-primary transition-colors"><Share2 className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
