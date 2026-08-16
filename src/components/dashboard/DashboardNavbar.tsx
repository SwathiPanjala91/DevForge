"use client";

import { useAuth } from "@/context/AuthContext";
import { Bell, Search, Flame, Sparkles, ChevronDown } from "lucide-react";

export default function DashboardNavbar() {
  const { profile } = useAuth();

  return (
    <header className="h-20 border-b border-border flex items-center justify-between px-8 bg-card/50 backdrop-blur-xl z-50 sticky top-0">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-primary transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search problems, topics, lessons..."
            className="w-full bg-black/40 border border-white/5 rounded-2xl py-2.5 pl-12 pr-14 text-sm focus:outline-none focus:border-primary/50 focus:bg-black/60 transition-all placeholder:text-white/20"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-white/40 border border-white/10">Ctrl</kbd>
            <kbd className="px-2 py-1 rounded bg-white/5 text-[10px] font-mono text-white/40 border border-white/10">K</kbd>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Streak */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <Flame className="w-5 h-5 text-amber-500 fill-amber-500 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-white group-hover:text-amber-500 transition-colors">{profile?.dailyStreak || profile?.streak || 0}</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-white/50 hover:text-white transition-colors group">
          <Bell size={20} className="group-hover:animate-swing" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-[#0B0B0B]">
            3
          </span>
        </button>

        {/* XP Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-bold">{profile?.xp || 0} XP</span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
            {profile?.photoURL ? (
              <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              profile?.name?.charAt(0) || "U"
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
        </div>
      </div>
    </header>
  );
}
