"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  Code2, 
  Trophy, 
  BookOpen, 
  Users, 
  Calendar, 
  Award, 
  Settings, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Flame,
  User as UserIcon,
  LogOut,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";

export const Sidebar: React.FC<{ mode?: "student" | "admin" }> = ({ mode = "student" }) => {
  const pathname = usePathname();
  const { profile, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const studentLinks = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Problems Bank", href: "/problems", icon: Code2 },
    { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
    { label: "Learning Hub", href: "/learning", icon: BookOpen },
    { label: "Academic Hub", href: "/learning", icon: GraduationCap },
    { label: "Community Forum", href: "/community", icon: Users },
    { label: "Verified Credentials", href: "/certificates", icon: Award },
    { label: "Student Portfolio", href: "/profile", icon: UserIcon },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  const adminLinks = [
    { label: "Overview Telemetry", href: "/admin", icon: LayoutDashboard },
    { label: "Student Roster", href: "/admin/students", icon: Users },
    { label: "Problem Bank CRUD", href: "/admin/problems", icon: Code2 },
    { label: "Contest Manager", href: "/admin/contests", icon: Trophy },
    { label: "Event Manager", href: "/admin/events", icon: Calendar },
    { label: "Broadcast Manager", href: "/admin/announcements", icon: Users },
    { label: "System Activity", href: "/admin/activity", icon: ShieldCheck },
    { label: "Permissions & Admins", href: "/admin/admins", icon: ShieldCheck },
    { label: "Platform Settings", href: "/admin/settings", icon: Settings },
  ];

  const links = mode === "admin" ? adminLinks : studentLinks;

  return (
    <motion.aside
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="hidden md:flex flex-col justify-between glass-card rounded-3xl p-4 border border-border shrink-0 sticky top-24 h-[calc(100vh-120px)] shadow-2xl z-40"
    >
      <div className="flex flex-col gap-6">
        {/* Header & Toggle */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          {!collapsed && (
            <span className="text-xs font-mono font-bold tracking-wider text-primary uppercase">
              {mode === "admin" ? "ADMINISTRATOR" : "STUDENT PORTAL"}
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white border border-border transition-colors mx-auto cursor-pointer"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5">
          {links.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? mode === "admin"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-primary/20 text-primary/80 border border-primary/30"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? (mode === "admin" ? "text-amber-400" : "text-primary") : "text-white/50"}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile Mini Summary */}
      <div className="pt-3 border-t border-border flex flex-col gap-2">
        {!collapsed && (
          <div className="p-3 rounded-2xl bg-card/80 border border-border flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/50 flex items-center gap-1">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" /> Daily Streak
              </span>
              <span className="font-mono text-white font-bold">{profile?.dailyStreak || 14} Days</span>
            </div>
            <div className="w-full bg-card rounded-full h-1.5 overflow-hidden border border-amber-500/20">
              <div className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full w-[70%]" />
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors w-full cursor-pointer"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
};
