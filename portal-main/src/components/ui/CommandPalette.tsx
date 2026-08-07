"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "./Modal";
import { Input } from "./Input";
import { Search, Code2, Trophy, BookOpen, Users, Settings, LayoutDashboard, ShieldCheck, ArrowRight } from "lucide-react";

export const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items = [
    { label: "Problems Directory", href: "/problems", category: "Practice", icon: Code2 },
    { label: "Two Sum Quantum Challenge", href: "/problems/p1", category: "Problem", icon: Code2 },
    { label: "Cyberpunk LRU Cache", href: "/problems/p2", category: "Problem", icon: Code2 },
    { label: "Global Hall of Fame Leaderboard", href: "/leaderboard", category: "Rankings", icon: Trophy },
    { label: "Data Structures & Algorithms Roadmap", href: "/learning", category: "Learn", icon: BookOpen },
    { label: "Developer Community Discussions", href: "/community", category: "Community", icon: Users },
    { label: "Student Dashboard", href: "/dashboard", category: "Personal", icon: LayoutDashboard },
    { label: "Account Settings", href: "/settings", category: "System", icon: Settings },
    { label: "Administrator Control Portal", href: "/admin", category: "Admin", icon: ShieldCheck },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.label.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredItems[selectedIndex].href);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="xl">
      <div className="flex flex-col gap-4">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-white/50 absolute left-4 pointer-events-none" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search problems, roadmaps, settings..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-card/80 border border-border rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 font-sans"
          />
          <kbd className="absolute right-4 text-[10px] font-mono text-white/50 bg-white/5 px-2 py-1 rounded border border-border">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto space-y-1 pr-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={idx}
                  onClick={() => handleSelect(item.href)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all cursor-pointer ${
                    isSelected ? "bg-primary/20 text-primary/80 border border-primary/30" : "text-white/70 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isSelected ? "text-primary" : "text-white/50"}`} />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight className="w-4 h-4 text-primary" />}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-white/50 font-mono">
              No matching platform commands found.
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
