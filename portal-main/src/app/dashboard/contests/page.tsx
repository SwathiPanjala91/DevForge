"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Trophy, Calendar, Clock, Users, ChevronRight, Award, History, Play } from "lucide-react";
import { motion } from "framer-motion";

type ContestStatus = "upcoming" | "active" | "past";

interface Contest {
  id: string;
  title: string;
  status: ContestStatus;
  startTime: string;
  duration: string;
  participants: number;
  prize?: string;
}

const MOCK_CONTESTS: Contest[] = [
  { id: "c1", title: "DevForge Weekly 104", status: "upcoming", startTime: "Starts in 2 days", duration: "2 Hours", participants: 1240, prize: "2000 XP" },
  { id: "c2", title: "Algo Masters Sprint", status: "upcoming", startTime: "Starts in 5 days", duration: "1.5 Hours", participants: 890 },
  { id: "c3", title: "Freshman Code Cup", status: "active", startTime: "Ends in 45 mins", duration: "3 Hours", participants: 450, prize: "5000 XP" },
  { id: "c4", title: "DevForge Biweekly 21", status: "past", startTime: "Ended 2 days ago", duration: "2 Hours", participants: 2100 },
  { id: "c5", title: "Graph Theory Challenge", status: "past", startTime: "Ended 1 week ago", duration: "4 Hours", participants: 1540 },
];

export default function ContestsPage() {
  const [activeTab, setActiveTab] = useState<ContestStatus | "all">("all");

  const filteredContests = MOCK_CONTESTS.filter(c => activeTab === "all" || c.status === activeTab);

  const renderContestCard = (contest: Contest, idx: number) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.1 }}
        key={contest.id}
      >
        <GlassCard className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center p-6 group hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden">
          {/* Subtle background glow for active/upcoming */}
          {contest.status === "active" && (
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-transparent blur-2xl z-0 pointer-events-none opacity-50" />
          )}
          {contest.status === "upcoming" && (
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-transparent blur-2xl z-0 pointer-events-none opacity-50" />
          )}
          
          <div className="flex gap-5 items-center z-10">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg
              ${contest.status === "active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : 
                contest.status === "upcoming" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : 
                "bg-slate-800 text-white/50 border border-white/10"}
            `}>
              {contest.status === "active" ? <Play className="w-6 h-6" /> : 
               contest.status === "upcoming" ? <Calendar className="w-6 h-6" /> : 
               <History className="w-6 h-6" />}
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{contest.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
                <span className={`flex items-center gap-1.5 ${contest.status === "active" ? "text-emerald-400" : "text-white/60"}`}>
                  <Clock className="w-4 h-4" />
                  {contest.startTime}
                </span>
                <span className="text-white/40">•</span>
                <span className="flex items-center gap-1.5 text-white/60">
                  <Users className="w-4 h-4" />
                  {contest.participants.toLocaleString()} Enrolled
                </span>
                {contest.prize && (
                  <>
                    <span className="text-white/40">•</span>
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <Award className="w-4 h-4" />
                      {contest.prize}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-end z-10">
            {contest.status === "active" ? (
              <Button variant="primary" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]" rightIcon={<ChevronRight className="w-4 h-4" />}>
                Enter Arena
              </Button>
            ) : contest.status === "upcoming" ? (
              <Button variant="glow" className="w-full md:w-auto" rightIcon={<Trophy className="w-4 h-4" />}>
                Register Now
              </Button>
            ) : (
              <Button variant="ghost" className="w-full md:w-auto text-white/50 hover:text-white" rightIcon={<ChevronRight className="w-4 h-4" />}>
                View Leaderboard
              </Button>
            )}
          </div>
        </GlassCard>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
        <div className="z-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-white flex items-center gap-3">
            <Trophy className="w-10 h-10 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]" />
            Compete & Conquer
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Test your skills against peers in real-time coding competitions. Climb the leaderboard and earn exclusive rewards.
          </p>
        </div>
        <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-white/10 z-10">
          <button 
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "all" ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-white/50 hover:text-white"}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab("active")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "active" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-white/50 hover:text-white"}`}
          >
            Active
          </button>
          <button 
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "upcoming" ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-white/50 hover:text-white"}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab("past")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "past" ? "bg-slate-700 text-white" : "text-white/50 hover:text-white"}`}
          >
            Past
          </button>
        </div>
      </div>

      {/* Contests List */}
      <div className="flex flex-col gap-4">
        {filteredContests.length > 0 ? (
          filteredContests.map((c, i) => renderContestCard(c, i))
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-20 px-6 text-center"
          >
            <GlassCard className="max-w-md mx-auto !p-10 flex flex-col items-center border-dashed border-2 border-white/10 bg-slate-900/30">
              <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6">
                <Trophy className="w-10 h-10 text-cyan-400 opacity-50" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Contests Found</h3>
              <p className="text-white/50 mb-8">
                {activeTab === "active" ? "There are no active contests right now. Check back later or view upcoming ones." :
                 activeTab === "upcoming" ? "No upcoming contests scheduled. Keep practicing in the Problems section!" :
                 "We couldn't find any contests matching your criteria."}
              </p>
              <Button variant="glow" onClick={() => setActiveTab("all")}>
                View All Contests
              </Button>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}
