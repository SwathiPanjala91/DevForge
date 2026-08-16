"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Trophy, Medal, Star, Filter, Search, Award } from "lucide-react";
import { motion } from "framer-motion";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

interface LeaderboardUser {
  id: string | number;
  rank: number;
  name: string;
  xp: number;
  branch: string;
  year: string;
  level: number;
  avatar: string;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("All-Time");
  const [branchFilter, setBranchFilter] = useState("All Branches");
  const [yearFilter, setYearFilter] = useState("All Years");

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.leaderboard)) {
          setLeaderboard(data.leaderboard);
        }
      })
      .catch((err) => console.error("Error fetching leaderboard:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredLeaderboard = leaderboard.filter((item) => {
    if (branchFilter !== "All Branches" && item.branch !== branchFilter) return false;
    if (yearFilter !== "All Years" && item.year !== yearFilter) return false;
    return true;
  });

  const top3 = filteredLeaderboard.slice(0, 3);
  const rest = filteredLeaderboard.slice(3);

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
              className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/80 focus:outline-none cursor-pointer"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option value="All Branches">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
            </select>

            <select
              className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white/80 focus:outline-none cursor-pointer"
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

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {top3.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {top3.map((user, index) => {
                const ranks = [2, 1, 3]; // 2nd, 1st, 3rd display order
                const displayUser = top3[ranks[index] - 1] || user;
                const isFirst = displayUser.rank === 1;

                return (
                  <GlassCard
                    key={displayUser.id || index}
                    className={`flex flex-col items-center p-6 relative overflow-hidden ${
                      isFirst ? "border-amber-500/50 bg-amber-500/5 md:-translate-y-4" : ""
                    }`}
                  >
                    <div className="absolute top-4 right-4">
                      {displayUser.rank === 1 && <Trophy className="w-8 h-8 text-amber-400 drop-shadow-md" />}
                      {displayUser.rank === 2 && <Medal className="w-8 h-8 text-slate-300 drop-shadow-md" />}
                      {displayUser.rank === 3 && <Award className="w-8 h-8 text-amber-600 drop-shadow-md" />}
                    </div>

                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg mb-4 border-2 border-white/20">
                      {displayUser.avatar}
                    </div>

                    <h3 className="text-xl font-bold text-white">{displayUser.name}</h3>
                    <p className="text-sm text-white/60 mb-3">
                      {displayUser.branch} • {displayUser.year}
                    </p>

                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-bold text-amber-400">{displayUser.xp.toLocaleString()} XP</span>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          )}

          {/* Full Table */}
          <GlassCard className="!p-0 overflow-hidden border border-white/10 shadow-xl">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-xs text-white/50 uppercase tracking-wider">
                    <th className="px-6 py-4 w-16 text-center">Rank</th>
                    <th className="px-6 py-4">Developer</th>
                    <th className="px-6 py-4">Branch & Year</th>
                    <th className="px-6 py-4">Level</th>
                    <th className="px-6 py-4 text-right">XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {filteredLeaderboard.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-center font-bold text-white/70">#{item.rank}</td>
                      <td className="px-6 py-4 font-semibold text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xs font-bold">
                          {item.avatar}
                        </div>
                        {item.name}
                      </td>
                      <td className="px-6 py-4 text-white/60">
                        {item.branch} • {item.year}
                      </td>
                      <td className="px-6 py-4 text-white/80">Level {item.level}</td>
                      <td className="px-6 py-4 text-right font-bold text-amber-400">
                        {item.xp.toLocaleString()} XP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </>
      )}
    </div>
  );
}
