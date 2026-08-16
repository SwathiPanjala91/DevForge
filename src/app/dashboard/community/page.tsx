"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Users, MessageSquare, Megaphone, Hash } from "lucide-react";
import { motion } from "framer-motion";

export default function CommunityPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <Users className="text-primary w-8 h-8" /> Community
        </h1>
        <p className="text-white/50 mt-2">Connect, discuss, and learn with fellow developers.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <GlassCard className="p-6 border-white/5 bg-card/40">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-secondary" /> Recent Discussions
            </h2>
            <div className="text-center py-16 text-white/40">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>No active discussions yet.</p>
              <p className="text-xs mt-2">Start a new topic to get the conversation going!</p>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <GlassCard className="p-6 border-white/5 bg-card/40">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Megaphone className="w-5 h-5 text-accent" /> Announcements
            </h2>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                <h4 className="font-bold text-sm text-primary mb-1">Welcome to DevForge!</h4>
                <p className="text-xs text-white/60 mb-2">The new student dashboard is live. Explore the learning tracks and start earning XP.</p>
                <span className="text-[10px] text-white/40">Admin • 2 hours ago</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 border-white/5 bg-card/40">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Hash className="w-5 h-5 text-purple-400" /> Popular Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {["C Programming", "Algorithms", "Help", "Interview Prep", "Project Showcase"].map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer text-xs text-white/60 rounded border border-white/10">{tag}</span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
