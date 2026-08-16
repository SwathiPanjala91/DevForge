"use client";

import React, { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAuth } from "@/context/AuthContext";
import { getDashboardStats } from "@/lib/dataService";
import { 
  User, Mail, BookOpen, GraduationCap, 
  Trophy, Star, Award, Code, Activity, 
  Calendar, Shield, Edit2, Link as LinkIcon
} from "lucide-react";

export default function ProfilePage() {
  const { profile, user } = useAuth();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (user?.uid) {
      getDashboardStats(user.uid).then(data => {
        if (data) setStats(data);
      });
    }
  }, [user]);

  if (!profile) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-24 h-24 bg-white/10 rounded-full mb-4"></div>
          <div className="h-6 w-32 bg-white/10 rounded mb-2"></div>
          <div className="h-4 w-48 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  const joinDate = new Date(profile.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const skills = ["C", "C++", "Python", "Data Structures", "Algorithms", "React"];

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      {/* Header / Banner */}
      <div className="relative rounded-2xl overflow-hidden h-48 md:h-64 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
        
        {/* Avatar positioned halfway out of banner */}
        <div className="absolute -bottom-16 left-8 flex items-end">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-slate-950 bg-slate-900 flex items-center justify-center overflow-hidden">
              {profile.photoURL ? (
                <img src={profile.photoURL} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {profile.name?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>
            <button className="absolute bottom-1 right-1 p-2 bg-cyan-500 rounded-full text-slate-900 hover:bg-cyan-400 transition-colors shadow-lg">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - User Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="px-2">
            <h1 className="text-2xl font-bold text-white">{profile.name}</h1>
            <p className="text-cyan-400 font-medium">@{profile.displayName || profile.name?.split(' ')[0].toLowerCase() || "student"}</p>
            
            <p className="text-white/70 mt-4 text-sm leading-relaxed">
              Passionate software engineering student eager to learn algorithms and build scalable applications. Always ready for a new coding challenge!
            </p>
            
            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-white/60">
                <Mail className="w-4 h-4 mr-3 text-white/40" />
                {profile.email}
              </div>
              <div className="flex items-center text-sm text-white/60">
                <GraduationCap className="w-4 h-4 mr-3 text-white/40" />
                {profile.branch || "Computer Science"} • {profile.year || "3rd Year"}
              </div>
              <div className="flex items-center text-sm text-white/60">
                <BookOpen className="w-4 h-4 mr-3 text-white/40" />
                Roll: {profile.rollNumber || "Not specified"}
              </div>
              <div className="flex items-center text-sm text-white/60">
                <Calendar className="w-4 h-4 mr-3 text-white/40" />
                Joined {joinDate}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <button className="p-2 bg-white/5 border border-white/10 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <LinkIcon className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white/5 border border-white/10 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <LinkIcon className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white/5 border border-white/10 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <LinkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <GlassCard className="p-5">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-white/70">
                  {skill}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column - Stats & Activity */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
              <Star className="w-6 h-6 text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-white">{profile.level}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Level</div>
            </GlassCard>
            <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
              <Activity className="w-6 h-6 text-emerald-400 mb-2" />
              <div className="text-2xl font-bold text-white">{profile.xp}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Total XP</div>
            </GlassCard>
            <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
              <Code className="w-6 h-6 text-cyan-400 mb-2" />
              <div className="text-2xl font-bold text-white">{stats?.problemsSolved || 0}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Problems</div>
            </GlassCard>
            <GlassCard className="p-4 flex flex-col items-center justify-center text-center">
              <Trophy className="w-6 h-6 text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-white">#{stats?.collegeRank || '--'}</div>
              <div className="text-xs text-white/50 uppercase tracking-wider mt-1">Global Rank</div>
            </GlassCard>
          </div>

          {/* Current Rank & Next Level */}
          <GlassCard className="p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl"></div>
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Level Progress</h2>
              <span className="text-sm text-cyan-400 font-medium">Rank: Novice</span>
            </div>
            
            <div className="flex items-end justify-between mb-2">
              <div>
                <span className="text-3xl font-bold text-white">{profile.xp}</span>
                <span className="text-white/50 ml-2">XP</span>
              </div>
              <div className="text-sm text-white/50">
                1000 XP to next level
              </div>
            </div>
            
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative"
                style={{ width: `${(profile.xp % 1000) / 10}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </GlassCard>

          {/* Recent Activity */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
              <button className="text-xs text-cyan-400 hover:text-cyan-300">View All</button>
            </div>
            
            <div className="space-y-6">
              {[
                { title: "Solved 'Two Sum'", time: "2 hours ago", type: "problem", xp: "+10 XP" },
                { title: "Earned '7 Day Streak' Badge", time: "1 day ago", type: "badge", xp: "+50 XP" },
                { title: "Solved 'Reverse Linked List'", time: "2 days ago", type: "problem", xp: "+15 XP" },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg mt-0.5 ${
                    activity.type === 'problem' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    {activity.type === 'problem' ? <Code className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-white/90">{activity.title}</h4>
                    <p className="text-xs text-white/50 mt-1">{activity.time}</p>
                  </div>
                  <div className="text-sm font-medium text-emerald-400">
                    {activity.xp}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}
