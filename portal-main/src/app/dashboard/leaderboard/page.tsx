"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Trophy, Medal, Star, Filter, Search, Award } from "lucide-react";
import { motion } from "framer-motion";

const MOCK_LEADERBOARD = [
  { id: 1, name: "Rahul Reddy", xp: 2850, branch: "CSE", year: "3rd", level: 14, avatar: "RR" },
  { id: 2, name: "Sushmitha D", xp: 2710, branch: "CSE", year: "3rd", level: 13, avatar: "SD" },
  { id: 3, name: "Aditya Verma", xp: 2550, branch: "IT", year: "2nd", level: 12, avatar: "AV" },
  { id: 4, name: "Neha Sharma", xp: 2400, branch: "ECE", year: "4th", level: 11, avatar: "NS" },
  { id: 5, name: "Vikas Kumar", xp: 2350, branch: "CSE", year: "3rd", level: 11, avatar: "VK" },
  { id: 6, name: "Pooja Singh", xp: 2200, branch: "IT", year: "2nd", level: 10, avatar: "PS" },
  { id: 7, name: "Amit Patel", xp: 2150, branch: "MECH", year: "4th", level: 10, avatar: "AP" },
  { id: 8, name: "Sneha Gupta", xp: 2100, branch: "CSE", year: "1st", level: 9, avatar: "SG" },
  { id: 9, name: "Ravi Teja", xp: 2050, branch: "ECE", year: "3rd", level: 9, avatar: "RT" },
  { id: 10, name: "Anjali Desai", xp: 2000, branch: "CSE", year: "2nd", level: 8, avatar: "AD" },
];

export default function LeaderboardPage() {
  const [timeFilter, setTimeFilter] = useState("All-Time");
  const [branchFilter, setBranchFilter] = useState("All Branches");
  const [yearFilter, setYearFilter] = useState("All Years");

  const top3 = MOCK_LEADERBOARD.slice(0, 3);
  const rest = MOCK_LEADERBOARD.slice(3);

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
            Global Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1 text-white/60">
            See how you stack up against the best developers.
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
            {["Weekly", "Monthly", "All-Time"].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  timeFilter === filter
                    ? "bg-cyan-500/20 text-cyan-300"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <select 
              className="bg-white/5 border border-white/10 text-white/80 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option value="All Branches">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
            </select>
            
            <select 
              className="bg-white/5 border border-white/10 text-white/80 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="All Years">All Years</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Podium for Top 3 */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-8 mt-12 mb-16 h-72">
        {/* Rank 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center w-full md:w-1/4"
        >
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-zinc-300 to-zinc-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold text-zinc-300">
                {top3[1].avatar}
              </div>
            </div>
            <div className="absolute -bottom-3 -right-2 bg-zinc-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 border-slate-900 shadow-lg shadow-zinc-500/50">
              #2
            </div>
          </div>
          <GlassCard className="w-full h-32 flex flex-col items-center justify-center text-center !bg-zinc-500/10 !border-zinc-400/20 rounded-t-xl rounded-b-none border-b-0" hoverEffect={false}>
            <p className="font-semibold text-zinc-300 truncate w-full">{top3[1].name}</p>
            <p className="text-sm text-zinc-400 mt-1">{top3[1].xp} XP</p>
            <p className="text-xs text-white/40 mt-1">{top3[1].branch} • {top3[1].year}</p>
          </GlassCard>
        </motion.div>

        {/* Rank 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="flex flex-col items-center w-full md:w-1/3"
        >
          <div className="relative mb-4">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-amber-400">
              <Trophy className="w-10 h-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
            </div>
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-orange-600 p-[3px]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-3xl font-bold text-amber-400">
                {top3[0].avatar}
              </div>
            </div>
            <div className="absolute -bottom-4 -right-2 bg-amber-400 text-slate-900 w-10 h-10 rounded-full flex items-center justify-center font-bold text-base border-4 border-slate-900 shadow-lg shadow-amber-500/50">
              #1
            </div>
          </div>
          <GlassCard className="w-full h-40 flex flex-col items-center justify-center text-center !bg-amber-500/10 !border-amber-400/30 rounded-t-xl rounded-b-none border-b-0" glowColor="amber" hoverEffect={false}>
            <p className="font-bold text-amber-400 text-lg truncate w-full">{top3[0].name}</p>
            <p className="text-sm text-amber-200/80 font-medium mt-1">{top3[0].xp} XP</p>
            <p className="text-xs text-white/40 mt-2">{top3[0].branch} • {top3[0].year}</p>
          </GlassCard>
        </motion.div>

        {/* Rank 3 */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center w-full md:w-1/4"
        >
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-300 to-amber-700 p-[2px]">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold text-orange-400">
                {top3[2].avatar}
              </div>
            </div>
            <div className="absolute -bottom-3 -right-2 bg-orange-400 text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 border-slate-900 shadow-lg shadow-orange-500/50">
              #3
            </div>
          </div>
          <GlassCard className="w-full h-24 flex flex-col items-center justify-center text-center !bg-orange-500/10 !border-orange-400/20 rounded-t-xl rounded-b-none border-b-0" hoverEffect={false}>
            <p className="font-semibold text-orange-300 truncate w-full">{top3[2].name}</p>
            <p className="text-sm text-orange-200 mt-1">{top3[2].xp} XP</p>
            <p className="text-xs text-white/40 mt-1">{top3[2].branch} • {top3[2].year}</p>
          </GlassCard>
        </motion.div>
      </div>

      {/* Rest of the leaderboard */}
      <GlassCard className="p-0 overflow-hidden bg-white/5 border-white/10" hoverEffect={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-white/5 text-white/60 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 rounded-tl-xl font-medium">Rank</th>
                <th className="px-6 py-4 font-medium">Student</th>
                <th className="px-6 py-4 font-medium">Branch</th>
                <th className="px-6 py-4 font-medium">Year</th>
                <th className="px-6 py-4 font-medium">Level</th>
                <th className="px-6 py-4 rounded-tr-xl font-medium text-right">XP</th>
              </tr>
            </thead>
            <tbody>
              {rest.map((user, index) => (
                <tr 
                  key={user.id} 
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4 font-medium text-white/70">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-white/80 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                      #{user.id}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                        {user.avatar}
                      </div>
                      <div className="font-medium text-white group-hover:text-cyan-300 transition-colors">
                        {user.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white/60">{user.branch}</td>
                  <td className="px-6 py-4 text-white/60">{user.year}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 text-xs font-medium text-white/80">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      Lvl {user.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-cyan-400 font-medium">
                    {user.xp.toLocaleString()} XP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
