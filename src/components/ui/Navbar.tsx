"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { AiAssistantModal } from "@/components/ai/AiAssistantModal";
import { 
  Code2, 
  Sparkles, 
  Trophy, 
  BookOpen, 
  Users, 
  LayoutDashboard, 
  ShieldCheck, 
  LogOut, 
  User as UserIcon, 
  Settings, 
  Menu, 
  X,
  Search,
  Flame,
  GraduationCap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { profile, isAdmin, logout } = useAuth();
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navLinks: Array<{ label: string; href: string; icon: any }> = [
    // Phase 1 contains only the public landing page and authentication.
    // Future phases will add: Problems, Leaderboard, Learning, Community, etc.
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-3 transition-all duration-300">
        <div className="max-w-7xl mx-auto glass rounded-2xl px-5 py-3 flex items-center justify-between border border-border shadow-xl backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-card border border-primary/30 flex items-center justify-center text-primary group-hover:border-primary transition-colors shadow-md">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                JNTUH UCEJ <span className="text-primary font-mono text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 border border-primary/20">CODING CLUB</span>
              </span>
              <span className="text-[10px] text-white/50 tracking-wider uppercase block -mt-0.5 font-mono">
                Learn • Code • Compete • Rise
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1 rounded-xl bg-card/60 border border-white/5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-primary/20 text-primary/80 border border-primary/30"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-primary" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Command Palette Button (Cmd + K) */}
            <button
              onClick={() => setIsCommandOpen(true)}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card/80 border border-border text-xs text-white/50 hover:text-white hover:border-border/50 transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-primary" />
              <span>Search platform...</span>
              <kbd className="text-[10px] font-mono bg-white/5 px-1.5 py-0.5 rounded border border-border text-white/50">
                ⌘K
              </kbd>
            </button>

            {/* AI Assistant Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAiOpen(true)}
              leftIcon={<Sparkles className="w-3.5 h-3.5 text-primary" />}
              className="hidden sm:inline-flex"
            >
              Ask AI Mentor
            </Button>

            {profile ? (
              <div className="relative">
                {/* User Menu Trigger */}
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 p-1 rounded-xl glass border border-border hover:border-blue-500/40 transition-all cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary/80 font-bold overflow-hidden border border-primary/30">
                    {profile.photoURL ? (
                      <img src={profile.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span>{profile.displayName?.charAt(0) || "U"}</span>
                    )}
                  </div>
                  <div className="hidden lg:flex flex-col items-start pr-2">
                    <span className="text-xs font-semibold text-white max-w-[110px] truncate">
                      {profile.displayName}
                    </span>
                    <span className="text-[10px] text-primary font-mono flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-400 fill-amber-400" /> {profile.xp || 0} XP
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-60 glass-card rounded-2xl p-2 shadow-2xl border border-border z-50"
                    >
                      <div className="px-3 py-2 border-b border-border mb-1">
                        <p className="text-sm font-bold text-white truncate">{profile.displayName}</p>
                        <p className="text-xs text-primary/80 font-mono mt-0.5">
                          {profile.branch || "IT"} • {profile.year || "3rd Year"}
                        </p>
                        {profile.rollNumber && (
                          <p className="text-[10px] text-white/50 font-mono">Roll: {profile.rollNumber}</p>
                        )}
                        <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-primary/20 text-primary/80 uppercase mt-1">
                          Role: {profile.role}
                        </span>
                      </div>

                      {/* Dashboard, Profile, and Admin links are in Phase 2+ */}

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all mt-1 border-t border-white/5 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">
                    Join Platform
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white glass rounded-xl border border-border cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Sheet */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden max-w-7xl mx-auto mt-2 glass-card rounded-2xl p-4 border border-border overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-sm font-medium text-white/90 hover:text-primary/80 hover:bg-white/5 flex items-center gap-3"
                    >
                      <Icon className="w-4 h-4 text-primary" /> {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CommandPalette isOpen={isCommandOpen} onClose={() => setIsCommandOpen(false)} />
      <AiAssistantModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </>
  );
};
