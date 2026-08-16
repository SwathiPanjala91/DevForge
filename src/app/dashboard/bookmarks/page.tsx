"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Bookmark, Code2, BookOpen, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function BookmarksPage() {
  const [activeTab, setActiveTab] = useState<"problems" | "learning">("problems");

  // Mock data for UI demonstration
  const [bookmarkedProblems, setBookmarkedProblems] = useState([
    { id: "p1", title: "Two Sum", difficulty: "Easy", topic: "Arrays" },
    { id: "p2", title: "Merge K Sorted Lists", difficulty: "Hard", topic: "Linked Lists" },
  ]);

  const [bookmarkedLearning, setBookmarkedLearning] = useState([
    { id: "t1", title: "Pointers and Memory", course: "C Programming" },
  ]);

  const removeProblem = (id: string) => {
    setBookmarkedProblems(bookmarkedProblems.filter(p => p.id !== id));
  };

  const removeLearning = (id: string) => {
    setBookmarkedLearning(bookmarkedLearning.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <Bookmark className="text-primary w-8 h-8" /> Bookmarks
        </h1>
        <p className="text-white/50 mt-2">Saved problems and learning topics for quick access.</p>
      </div>

      <div className="flex items-center gap-4 border-b border-border">
        <button
          onClick={() => setActiveTab("problems")}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === "problems" ? "border-primary text-primary" : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          Problems ({bookmarkedProblems.length})
        </button>
        <button
          onClick={() => setActiveTab("learning")}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            activeTab === "learning" ? "border-primary text-primary" : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          Learning Resources ({bookmarkedLearning.length})
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "problems" ? (
          <div className="grid gap-4">
            {bookmarkedProblems.length > 0 ? bookmarkedProblems.map(p => (
              <GlassCard key={p.id} className="p-4 flex items-center justify-between group border-white/5 hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">{p.title}</h3>
                    <div className="flex items-center gap-2 text-xs mt-1 text-white/50">
                      <span className={p.difficulty === "Easy" ? "text-emerald-400" : "text-rose-400"}>{p.difficulty}</span>
                      <span>•</span>
                      <span>{p.topic}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/dashboard/problems/${p.id}`}>
                    <Button variant="primary" size="sm">Solve</Button>
                  </Link>
                  <button onClick={() => removeProblem(p.id)} className="p-2 text-white/30 hover:text-rose-400 transition-colors bg-white/5 rounded-lg hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </GlassCard>
            )) : (
              <div className="text-center py-20 text-white/40">
                <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No bookmarked problems.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {bookmarkedLearning.length > 0 ? bookmarkedLearning.map(t => (
              <GlassCard key={t.id} className="p-4 flex items-center justify-between group border-white/5 hover:border-secondary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold">{t.title}</h3>
                    <p className="text-xs text-white/50 mt-1">{t.course}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/dashboard/learn/c/${t.id}`}>
                    <Button variant="outline" size="sm">Review</Button>
                  </Link>
                  <button onClick={() => removeLearning(t.id)} className="p-2 text-white/30 hover:text-rose-400 transition-colors bg-white/5 rounded-lg hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </GlassCard>
            )) : (
              <div className="text-center py-20 text-white/40">
                <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No bookmarked learning resources.</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
