"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  BookOpen, 
  Target, 
  Code2, 
  Trophy, 
  Medal, 
  Bookmark, 
  Star, 
  User, 
  Users, 
  Settings,
  Flame,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { icon: Home, label: "Home", href: "/dashboard" },
  { icon: Target, label: "Practice", href: "/dashboard/practice" },
  { icon: Code2, label: "Problems", href: "/dashboard/problems" },
  { icon: Trophy, label: "Contests", href: "/dashboard/contests" },
  { icon: Medal, label: "Leaderboard", href: "/dashboard/leaderboard" },
  { icon: Bookmark, label: "Bookmarks", href: "/dashboard/bookmarks" },
  { icon: Star, label: "Achievements", href: "/dashboard/achievements" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Users, label: "Community", href: "/dashboard/community" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { profile } = useAuth();

  return (
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-xl flex flex-col justify-between h-screen sticky top-0 custom-scrollbar overflow-y-auto">
      <div className="p-6 pb-2">
        <Link href="/dashboard" className="flex flex-col gap-1 mb-8 group">
          <span className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center border border-primary/30 group-hover:border-primary transition-colors">
              <Code2 className="w-5 h-5" />
            </div>
            Dev<span className="text-primary">Forge</span>
          </span>
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono ml-10">
            JNTUH UCEJ Coding Club
          </span>
        </Link>
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium",
                pathname === item.href
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon size={18} className={pathname === item.href ? "text-primary" : "text-white/40"} />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-6 pt-2 mt-auto space-y-4">
        {/* Level Widget */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-2xl relative overflow-hidden group cursor-pointer hover:border-primary/30 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
          <div className="relative z-10 flex items-center justify-between mb-2">
            <div>
              <p className="font-bold text-white">Level {profile?.level || 1}</p>
              <p className="text-xs text-white/50 font-mono">{profile?.xp || 0} / {(profile?.level || 1) * 1000} XP</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden w-full relative z-10">
            <div 
              className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-1000"
              style={{ width: `${((profile?.xp || 0) / ((profile?.level || 1) * 1000)) * 100}%` }}
            />
          </div>
        </div>

        {/* Streak Widget */}
        <div className="p-4 rounded-2xl bg-card border border-border flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
          <div className="flex items-center gap-3 relative z-10 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
              <Flame className="w-5 h-5 fill-amber-500/50" />
            </div>
            <div>
              <p className="text-lg font-bold text-white leading-tight">{profile?.dailyStreak || profile?.streak || 0}</p>
              <p className="text-xs text-white/50 font-mono">Day Streak</p>
            </div>
          </div>
          <div className="flex justify-between items-center relative z-10">
            {['M','T','W','T','F','S','S'].map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                  i < ((profile?.dailyStreak || 0) % 7) || (profile?.dailyStreak && profile.dailyStreak >= 7)
                    ? "bg-primary text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    : "bg-white/5 text-white/30"
                )}>
                  {day}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
