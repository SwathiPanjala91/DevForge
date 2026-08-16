"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Award, Zap, Code, Star, Flame, Trophy, Crown, Target, Lock } from "lucide-react";
import { motion, Variants } from "framer-motion";

const ACHIEVEMENTS = [
  {
    id: 1,
    title: "First Problem",
    description: "Successfully solve your first coding problem on the platform.",
    icon: Code,
    unlockedAt: "Oct 12, 2023",
    progress: 100,
    color: "emerald",
  },
  {
    id: 2,
    title: "7 Day Streak",
    description: "Maintain a coding streak for 7 consecutive days.",
    icon: Flame,
    unlockedAt: "Oct 20, 2023",
    progress: 100,
    color: "amber",
  },
  {
    id: 3,
    title: "Rising Star",
    description: "Reach level 5 by earning XP from various challenges.",
    icon: Star,
    unlockedAt: "Nov 05, 2023",
    progress: 100,
    color: "purple",
  },
  {
    id: 4,
    title: "Top 100",
    description: "Enter the top 100 ranks on the global leaderboard.",
    icon: Trophy,
    unlockedAt: null,
    progress: 75,
    color: "cyan",
  },
  {
    id: 5,
    title: "Bug Squasher",
    description: "Solve 50 algorithmic problems with 0 runtime errors.",
    icon: Target,
    unlockedAt: null,
    progress: 40,
    color: "rose",
  },
  {
    id: 6,
    title: "Mastermind",
    description: "Complete all Advanced track algorithms.",
    icon: Crown,
    unlockedAt: null,
    progress: 10,
    color: "indigo",
  },
  {
    id: 7,
    title: "Speed Demon",
    description: "Solve an Easy problem in under 3 minutes.",
    icon: Zap,
    unlockedAt: "Dec 12, 2023",
    progress: 100,
    color: "amber",
  },
  {
    id: 8,
    title: "Contest Winner",
    description: "Place in the top 3 in any official coding contest.",
    icon: Award,
    unlockedAt: null,
    progress: 0,
    color: "yellow",
  },
];

export default function AchievementsPage() {
  const unlocked = ACHIEVEMENTS.filter((a) => a.unlockedAt !== null);
  const locked = ACHIEVEMENTS.filter((a) => a.unlockedAt === null);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  const getColorClasses = (color: string, isUnlocked: boolean) => {
    if (!isUnlocked) return "text-zinc-500 bg-zinc-800/50 border-zinc-700/50";
    const colors: Record<string, string> = {
      emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.15)]",
      amber: "text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_15px_rgba(251,191,36,0.15)]",
      purple: "text-purple-400 bg-purple-500/10 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
      cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.15)]",
      rose: "text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.15)]",
      indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.15)]",
      yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.15)]",
    };
    return colors[color] || "text-white bg-white/10 border-white/20";
  };

  const getProgressColor = (color: string) => {
    const colors: Record<string, string> = {
      emerald: "bg-emerald-500",
      amber: "bg-amber-500",
      purple: "bg-purple-500",
      cyan: "bg-cyan-500",
      rose: "bg-rose-500",
      indigo: "bg-indigo-500",
      yellow: "bg-yellow-500",
    };
    return colors[color] || "bg-white";
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500">
          Achievements
        </h1>
        <p className="text-muted-foreground mt-1 text-white/60">
          Unlock badges and show off your coding milestones.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-semibold text-white">Unlocked Badges</h2>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-medium">
              {unlocked.length} Earned
            </span>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {unlocked.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <motion.div key={achievement.id} variants={item}>
                  <GlassCard 
                    className={`h-full flex flex-col items-center text-center !bg-white/5 border border-white/10 relative overflow-hidden group`}
                    hoverEffect={true}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 from-white/0 to-white/10" />
                    
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border ${getColorClasses(achievement.color, true)}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                    <p className="text-sm text-white/60 flex-grow mb-4">{achievement.description}</p>
                    
                    <div className="w-full pt-4 border-t border-white/10 mt-auto">
                      <p className="text-xs text-white/40 font-medium uppercase tracking-wider">
                        Unlocked on {achievement.unlockedAt}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-semibold text-white/80">Locked Badges</h2>
            <span className="bg-white/10 text-white/60 text-xs px-2.5 py-1 rounded-full font-medium">
              {locked.length} Remaining
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {locked.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <GlassCard 
                  key={achievement.id}
                  className="h-full flex flex-col items-center text-center !bg-black/20 border-white/5 opacity-70"
                  hoverEffect={false}
                >
                  <div className="absolute top-3 right-3 text-white/20">
                    <Lock className="w-4 h-4" />
                  </div>
                  
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border text-zinc-500 bg-zinc-800/30 border-zinc-700/50">
                    <Icon className="w-8 h-8 opacity-50" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white/60 mb-2">{achievement.title}</h3>
                  <p className="text-sm text-white/40 flex-grow mb-4">{achievement.description}</p>
                  
                  <div className="w-full pt-4 mt-auto">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/40">Progress</span>
                      <span className="text-white/60">{achievement.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${getProgressColor(achievement.color)} opacity-50`} 
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
