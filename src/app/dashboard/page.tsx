"use client";

import React, { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAuth } from "@/context/AuthContext";
import { 
  Star, Crown, Target, BarChart2, Trophy, 
  ArrowRight, BookOpen, Calendar, Zap 
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { 
  getDashboardStats, 
  getLearningProgress, 
  getDailyChallenge,
  getUpcomingEvents,
  getLeaderboardTop3 
} from "@/lib/dataService";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function DashboardPage() {
  const { profile, user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [challenge, setChallenge] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [top3, setTop3] = useState<any[]>([]);

  useEffect(() => {
    if (user?.uid) {
      Promise.all([
        getDashboardStats(user.uid),
        getLearningProgress(user.uid),
        getDailyChallenge(),
        getUpcomingEvents(),
        getLeaderboardTop3()
      ]).then(([st, pr, ch, ev, top]) => {
        setStats(st);
        setProgress(pr);
        setChallenge(ch);
        setEvents(ev);
        setTop3(top);
        setLoading(false);
      });
    } else {
      // Simulate loading for guests/tests
      setTimeout(() => setLoading(false), 500);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
          Good evening, {profile?.name?.split(' ')[0] || "Developer"}! 👋
        </h1>
        <p className="text-white/50 mt-1 text-sm">Keep learning. Keep coding. Keep growing.</p>
      </motion.div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* XP Card */}
        <GlassCard className="p-5 flex flex-col justify-between border-white/5 hover:border-white/10 transition-colors bg-card/40">
          <div className="flex items-start gap-4 mb-2">
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)] shrink-0">
              <Star className="w-5 h-5 fill-orange-500" />
            </div>
            <div>
              <h3 className="text-white/50 text-xs font-semibold mb-1">XP</h3>
              <p className="text-3xl font-bold leading-none">{profile?.xp || 2840}</p>
            </div>
          </div>
          <p className="text-emerald-400 text-xs font-medium pl-14">+{stats?.xpThisWeek || 120} this week</p>
        </GlassCard>

        {/* Level Card */}
        <GlassCard className="p-5 flex flex-col justify-between border-white/5 hover:border-white/10 transition-colors bg-card/40 relative overflow-hidden">
          <div className="flex items-start gap-4 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)] shrink-0">
              <Crown className="w-5 h-5 fill-purple-400" />
            </div>
            <div className="w-full">
              <h3 className="text-white/50 text-xs font-semibold mb-1">Level</h3>
              <p className="text-3xl font-bold leading-none">{profile?.level || 12}</p>
            </div>
          </div>
          <div className="pl-14">
            <p className="text-white/40 text-[10px] mb-2">{1000 - ((profile?.xp || 0) % 1000)} XP to level {(profile?.level || 12) + 1}</p>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-purple-500 w-[60%]" />
            </div>
          </div>
        </GlassCard>

        {/* Problems Solved */}
        <GlassCard className="p-5 flex flex-col justify-between border-white/5 hover:border-white/10 transition-colors bg-card/40">
          <div className="flex items-start gap-4 mb-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)] shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white/50 text-xs font-semibold mb-1">Problems Solved</h3>
              <p className="text-3xl font-bold leading-none">{stats?.problemsSolved || 34}</p>
            </div>
          </div>
          <p className="text-white/40 text-xs font-medium pl-14">Across all topics</p>
        </GlassCard>

        {/* Ranks (Split Card) */}
        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="p-4 flex flex-col justify-between border-white/5 bg-card/40">
            <div className="flex flex-col gap-1">
              <BarChart2 className="w-5 h-5 text-blue-400 mb-1" />
              <h3 className="text-white/50 text-[10px] font-semibold">Rank (College)</h3>
              <p className="text-2xl font-bold">#{stats?.collegeRank || 14}</p>
              <p className="text-emerald-400 text-[10px] font-medium">↑ {stats?.collegeRankChange || 3} this week</p>
            </div>
          </GlassCard>
          <GlassCard className="p-4 flex flex-col justify-between border-white/5 bg-card/40">
            <div className="flex flex-col gap-1">
              <Trophy className="w-5 h-5 text-purple-400 mb-1" />
              <h3 className="text-white/50 text-[10px] font-semibold">Rank (IT Branch)</h3>
              <p className="text-2xl font-bold">#{stats?.branchRank || 3}</p>
              <p className="text-emerald-400 text-[10px] font-medium">↑ {stats?.branchRankChange || 1} this week</p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <GlassCard className="lg:col-span-2 p-6 border-white/5 bg-card/40 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden group">
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="w-full sm:w-auto flex justify-between sm:hidden mb-4">
             <h3 className="font-bold text-lg">Continue Learning</h3>
             <Link href="/dashboard/practice/c" className="text-xs text-white/50 hover:text-white flex items-center gap-1">View Roadmap <ArrowRight className="w-3 h-3" /></Link>
          </div>

          {/* Circle Progress */}
          <div className="relative w-32 h-32 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" 
                className="text-primary transition-all duration-1000" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * (progress?.percentage || 62)) / 100} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">{progress?.percentage || 62}%</span>
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="hidden sm:flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Continue Learning</h3>
              <Link href="/dashboard/practice/c" className="text-xs text-white/50 hover:text-white flex items-center gap-1">View Roadmap <ArrowRight className="w-3 h-3" /></Link>
            </div>
            
            <h4 className="text-sm text-white/60 mb-1">C Programming</h4>
            <h2 className="text-2xl font-bold mb-4">Loops in C</h2>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-primary w-[60%]" />
              </div>
              <span className="text-xs text-white/50 shrink-0">8 / 13 lessons completed</span>
            </div>

            <Link href="/dashboard/practice/c/loops/for-loop">
              <Button variant="primary" className="bg-primary/90 hover:bg-primary px-6 rounded-xl text-sm h-10 w-full sm:w-auto flex justify-center">
                Continue Lesson <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </GlassCard>

        {/* Daily Challenge */}
        <GlassCard className="p-6 border-white/5 bg-card/40 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-bold text-lg">Daily Challenge</h3>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">Easy</span>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-bold mb-1">{challenge?.title || "Sum of N Numbers"}</h4>
              <p className="text-xs text-white/50 line-clamp-2">{challenge?.description || "Calculate the sum 1 + 2 + ... + N."}</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            {(challenge?.tags || ["Loops", "Math"]).map((tag: string) => (
              <span key={tag} className="px-2 py-1 bg-white/5 text-[10px] text-white/60 rounded border border-white/10">{tag}</span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="text-[10px] text-white/50">
              <span className="text-purple-400 font-bold">+{challenge?.xpReward || 10} XP</span> • {challenge?.solvedPercentage || 68}% solved
            </div>
            <Button variant="primary" className="bg-purple-600 hover:bg-purple-500 text-xs h-8 px-4 rounded-lg">
              Solve Challenge <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </GlassCard>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Your Progress */}
        <GlassCard className="p-6 border-white/5 bg-card/40">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-lg">Your Progress</h3>
              <p className="text-[10px] text-white/40">Topic-wise Learning Progress</p>
            </div>
            <select className="bg-transparent text-xs text-white/50 outline-none cursor-pointer">
              <option>This Month</option>
              <option>All Time</option>
            </select>
          </div>

          <div className="space-y-5">
            {[
              { label: "C Fundamentals", pct: 100, color: "bg-emerald-400" },
              { label: "Control Flow", pct: 75, color: "bg-blue-400" },
              { label: "Arrays", pct: 60, color: "bg-amber-400" },
              { label: "Functions", pct: 45, color: "bg-purple-400" },
              { label: "Pointers", pct: 20, color: "bg-rose-400" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0 ${item.color.replace('bg-', 'text-')}`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-xs font-semibold">{item.label}</span>
                    <span className="text-[10px] text-white/50 font-mono">{item.pct}%</span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center border-t border-white/5 pt-4">
            <Link href="/dashboard/practice/c" className="text-xs text-white/50 hover:text-white flex items-center gap-1">View All Topics <ArrowRight className="w-3 h-3" /></Link>
          </div>
        </GlassCard>

        {/* Your Rankings */}
        <GlassCard className="p-6 border-white/5 bg-card/40">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg">Your Rankings</h3>
            <Link href="/dashboard/leaderboard" className="text-xs text-white/50 hover:text-white flex items-center gap-1">View Full Leaderboard <ArrowRight className="w-3 h-3" /></Link>
          </div>

          <div className="flex items-end justify-center gap-4 mb-10 mt-6 relative h-32">
            {/* 2nd Place */}
            <div className="flex flex-col items-center relative z-10 w-24">
              <div className="w-6 h-6 rounded-full bg-white/20 text-white text-[10px] font-bold flex items-center justify-center absolute -top-3 z-20 border border-white/30 backdrop-blur-sm">2</div>
              <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden border-2 border-white/20 mb-2">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Sush`} alt="Avatar" />
              </div>
              <p className="text-[10px] font-bold truncate w-full text-center">Sushmitha D</p>
              <p className="text-[9px] text-white/50 font-mono">2710 XP</p>
              <div className="w-full h-16 bg-gradient-to-t from-white/10 to-transparent mt-2 rounded-t-lg border-t border-x border-white/10" />
            </div>

            {/* 1st Place */}
            <div className="flex flex-col items-center relative z-20 w-28">
              <div className="w-7 h-7 rounded-full bg-amber-400 text-black text-[11px] font-bold flex items-center justify-center absolute -top-3.5 z-20 shadow-[0_0_15px_rgba(251,191,36,0.5)] border-2 border-[#1a1a1a]">1</div>
              <div className="w-14 h-14 rounded-full bg-white/10 overflow-hidden border-2 border-amber-400 mb-2 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul`} alt="Avatar" />
              </div>
              <p className="text-xs font-bold truncate w-full text-center text-amber-400">Rahul Reddy</p>
              <p className="text-[10px] text-white/70 font-mono">2850 XP</p>
              <div className="w-full h-24 bg-gradient-to-t from-amber-500/20 to-amber-500/5 mt-2 rounded-t-lg border-t-2 border-x border-amber-500/50 shadow-[0_-10px_20px_rgba(251,191,36,0.1)]" />
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col items-center relative z-10 w-24">
              <div className="w-6 h-6 rounded-full bg-orange-700/80 text-white text-[10px] font-bold flex items-center justify-center absolute -top-3 z-20 border border-orange-500/50 backdrop-blur-sm">3</div>
              <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden border-2 border-orange-700/50 mb-2">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya`} alt="Avatar" />
              </div>
              <p className="text-[10px] font-bold truncate w-full text-center">Aditya Verma</p>
              <p className="text-[9px] text-white/50 font-mono">2550 XP</p>
              <div className="w-full h-12 bg-gradient-to-t from-orange-700/20 to-transparent mt-2 rounded-t-lg border-t border-x border-orange-700/30" />
            </div>
          </div>

          {/* Current User Rank */}
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-lg font-bold w-6 text-center">14</span>
              <div className="w-8 h-8 rounded-full bg-white/10 overflow-hidden border border-white/20">
                 {profile?.photoURL ? (
                    <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xs">{profile?.name?.charAt(0) || "U"}</div>
                  )}
              </div>
              <div>
                <p className="text-xs font-bold">{profile?.name || "Manish Kumar"}</p>
                <p className="text-[10px] text-white/40">IT • 4th Year</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-purple-400 font-mono">{profile?.xp || 2840} XP</p>
              <p className="text-[9px] text-emerald-400">↑ 3 this week</p>
            </div>
          </div>
        </GlassCard>

        {/* Upcoming Events */}
        <GlassCard className="p-6 border-white/5 bg-card/40 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Upcoming Events</h3>
            <Link href="/dashboard/events" className="text-xs text-white/50 hover:text-white flex items-center gap-1">View All <ArrowRight className="w-3 h-3" /></Link>
          </div>

          <div className="space-y-4 flex-1">
            {events.length > 0 ? events.map((event) => (
              <div key={event.id} className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/10">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                  {event.type === 'Contest' ? <Trophy className="w-5 h-5 text-purple-400" /> : <BookOpen className="w-5 h-5 text-blue-400" />}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors">{event.title}</h4>
                  <div className="flex flex-col gap-1 text-[10px] text-white/50">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} • {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {event.registeredCount} participants</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button variant="outline" size="sm" className="h-7 text-[10px] px-3">
                    {event.type === 'Contest' ? 'Register' : 'Join'}
                  </Button>
                </div>
              </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center text-white/40">
                <Calendar className="w-8 h-8 mb-2 opacity-20" />
                <p className="text-sm">No upcoming events</p>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-center border-t border-white/5 pt-4">
             <Link href="/dashboard/calendar" className="text-xs text-white/50 hover:text-white flex items-center gap-1"><Calendar className="w-3 h-3" /> View Calendar <ArrowRight className="w-3 h-3" /></Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
