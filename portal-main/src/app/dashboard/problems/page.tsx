"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Filter, CheckCircle2, Circle, Clock, Code2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const MOCK_PROBLEMS = [
  { id: "two-sum", title: "Two Sum", difficulty: "Easy", topic: "Arrays", status: "Solved", acceptance: "48%" },
  { id: "add-two-numbers", title: "Add Two Numbers", difficulty: "Medium", topic: "Linked List", status: "Attempted", acceptance: "39%" },
  { id: "longest-substring", title: "Longest Substring Without Repeating Characters", difficulty: "Medium", topic: "Strings", status: "Unsolved", acceptance: "33%" },
  { id: "median-two-sorted", title: "Median of Two Sorted Arrays", difficulty: "Hard", topic: "Binary Search", status: "Unsolved", acceptance: "36%" },
  { id: "longest-palindromic", title: "Longest Palindromic Substring", difficulty: "Medium", topic: "Dynamic Programming", status: "Solved", acceptance: "32%" },
  { id: "zigzag-conversion", title: "Zigzag Conversion", difficulty: "Medium", topic: "Strings", status: "Unsolved", acceptance: "44%" },
  { id: "reverse-integer", title: "Reverse Integer", difficulty: "Medium", topic: "Math", status: "Unsolved", acceptance: "27%" },
  { id: "string-to-integer", title: "String to Integer (atoi)", difficulty: "Medium", topic: "Strings", status: "Unsolved", acceptance: "16%" },
  { id: "palindrome-number", title: "Palindrome Number", difficulty: "Easy", topic: "Math", status: "Solved", acceptance: "53%" },
  { id: "regular-expression", title: "Regular Expression Matching", difficulty: "Hard", topic: "Dynamic Programming", status: "Unsolved", acceptance: "28%" },
];

export default function ProblemsPage() {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [topicFilter, setTopicFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredProblems = MOCK_PROBLEMS.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (difficultyFilter !== "All" && p.difficulty !== difficultyFilter) return false;
    if (topicFilter !== "All" && p.topic !== topicFilter) return false;
    if (statusFilter !== "All" && p.status !== statusFilter) return false;
    return true;
  });

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Easy": return "text-emerald-400 bg-emerald-400/10 border-emerald-500/20";
      case "Medium": return "text-amber-400 bg-amber-400/10 border-amber-500/20";
      case "Hard": return "text-rose-400 bg-rose-400/10 border-rose-500/20";
      default: return "text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Solved": return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case "Attempted": return <Clock className="w-5 h-5 text-amber-400" />;
      default: return <Circle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-white flex items-center gap-3">
            <Code2 className="w-10 h-10 text-cyan-400" />
            Problems Hub
          </h1>
          <p className="text-white/60 text-lg">Master algorithms and data structures to elevate your coding skills.</p>
        </div>
        <Button variant="glow" leftIcon={<Filter className="w-4 h-4" />}>
          Pick Random
        </Button>
      </div>

      <GlassCard className="!p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 w-full relative">
          <Input 
            placeholder="Search problems by title..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-white/50" />}
            className="bg-white/5 border-white/10"
          />
        </div>
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <select 
            className="glass-input rounded-xl px-4 py-3 text-sm font-medium text-white/90 bg-slate-900 border border-white/10 focus:outline-none appearance-none min-w-[140px] cursor-pointer"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select 
            className="glass-input rounded-xl px-4 py-3 text-sm font-medium text-white/90 bg-slate-900 border border-white/10 focus:outline-none appearance-none min-w-[140px] cursor-pointer"
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
          >
            <option value="All">All Topics</option>
            <option value="Arrays">Arrays</option>
            <option value="Strings">Strings</option>
            <option value="Linked List">Linked List</option>
            <option value="Binary Search">Binary Search</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
            <option value="Math">Math</option>
          </select>
          <select 
            className="glass-input rounded-xl px-4 py-3 text-sm font-medium text-white/90 bg-slate-900 border border-white/10 focus:outline-none appearance-none min-w-[140px] cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Solved">Solved</option>
            <option value="Attempted">Attempted</option>
            <option value="Unsolved">Unsolved</option>
          </select>
        </div>
      </GlassCard>

      <GlassCard className="!p-0 overflow-hidden border border-white/10 shadow-2xl">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="px-6 py-5 text-xs font-bold text-white/50 uppercase tracking-wider w-16 text-center">Status</th>
                <th className="px-6 py-5 text-xs font-bold text-white/50 uppercase tracking-wider">Title</th>
                <th className="px-6 py-5 text-xs font-bold text-white/50 uppercase tracking-wider">Acceptance</th>
                <th className="px-6 py-5 text-xs font-bold text-white/50 uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-5 text-xs font-bold text-white/50 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProblems.length > 0 ? (
                filteredProblems.map((p, idx) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={p.id} 
                    className="hover:bg-white/5 transition-colors group cursor-pointer"
                  >
                    <td className="px-6 py-5 flex justify-center items-center h-full mt-2">
                      {getStatusIcon(p.status)}
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/dashboard/problems/${p.id}`} className="font-semibold text-white/90 group-hover:text-cyan-400 transition-colors text-base block mb-1">
                        {p.title}
                      </Link>
                      <div className="text-xs text-white/40 font-medium">{p.topic}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-white/70">{p.acceptance}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold border tracking-wide inline-block ${getDifficultyColor(p.difficulty)}`}>
                        {p.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/dashboard/problems/${p.id}`}>
                        <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />} className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-400">
                          Solve
                        </Button>
                      </Link>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-white/50 gap-4">
                      <Search className="w-12 h-12 text-white/20" />
                      <p className="text-lg">No problems found matching your filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
