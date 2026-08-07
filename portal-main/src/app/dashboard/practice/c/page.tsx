"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Code, BookOpen, CheckCircle, Terminal, Flag } from "lucide-react";

const cModules = [
  { slug: "basics", number: 1, title: "Introduction & Basics", description: "Variables, Data Types, and Basic I/O", conceptsCount: 4, labsCount: 3, assignmentsCount: 1, status: "Completed" },
  { slug: "control-flow", number: 2, title: "Control Flow", description: "If/Else, Switch, Loops (for, while, do-while)", conceptsCount: 5, labsCount: 4, assignmentsCount: 1, status: "In Progress" },
  { slug: "functions", number: 3, title: "Functions", description: "Declaration, Definition, Scope, and Recursion", conceptsCount: 4, labsCount: 3, assignmentsCount: 1, status: "Not Started" },
  { slug: "arrays-strings", number: 4, title: "Arrays & Strings", description: "1D/2D Arrays, String Manipulation", conceptsCount: 6, labsCount: 5, assignmentsCount: 1, status: "Not Started" },
  { slug: "pointers", number: 5, title: "Pointers Fundamentals", description: "Addresses, Dereferencing, Pointer Arithmetic", conceptsCount: 5, labsCount: 4, assignmentsCount: 1, status: "Not Started" },
  { slug: "memory-management", number: 6, title: "Dynamic Memory", description: "malloc, calloc, realloc, free", conceptsCount: 4, labsCount: 3, assignmentsCount: 1, status: "Not Started" },
  { slug: "structs-unions", number: 7, title: "Structs & Unions", description: "Custom Data Types, Typedef, Enums", conceptsCount: 4, labsCount: 3, assignmentsCount: 1, status: "Not Started" },
  { slug: "file-handling", number: 8, title: "File I/O", description: "Reading/Writing text and binary files", conceptsCount: 3, labsCount: 2, assignmentsCount: 1, status: "Not Started" },
  { slug: "preprocessor", number: 9, title: "Preprocessor Directives", description: "Macros, Conditional Compilation", conceptsCount: 3, labsCount: 2, assignmentsCount: 1, status: "Not Started" },
  { slug: "advanced-pointers", number: 10, title: "Advanced Pointers", description: "Function Pointers, Pointers to Pointers", conceptsCount: 4, labsCount: 3, assignmentsCount: 1, status: "Not Started" },
  { slug: "data-structures", number: 11, title: "Basic Data Structures", description: "Linked Lists, Stacks, Queues in C", conceptsCount: 5, labsCount: 4, assignmentsCount: 1, status: "Not Started" },
  { slug: "system-calls", number: 12, title: "System Calls & Processes", description: "fork, exec, wait, pipes", conceptsCount: 4, labsCount: 3, assignmentsCount: 1, status: "Not Started" },
];

export default function CProgrammingTrack() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const toggleModule = (slug: string) => {
    setExpandedModule(expandedModule === slug ? null : slug);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6 md:p-12 font-sans selection:bg-cyan-500/30">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-zinc-900/50 border border-zinc-800 px-3 py-1 rounded-full mb-4">
            <Code className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium tracking-wide text-zinc-300">PRACTICE TRACK</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            C PROGRAMMING
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Learn the language. Practice every concept. Forge the skill. Master system-level programming from basic variables to advanced pointers and memory management.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-zinc-900/50 border border-zinc-800/50 p-6 rounded-xl flex flex-col justify-center">
            <div className="text-zinc-500 text-sm font-medium mb-1">Progress</div>
            <div className="text-3xl font-bold text-cyan-400">12%</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 p-6 rounded-xl flex flex-col justify-center">
            <div className="text-zinc-500 text-sm font-medium mb-1">Modules</div>
            <div className="text-3xl font-bold text-white">1 / 12</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 p-6 rounded-xl flex flex-col justify-center">
            <div className="text-zinc-500 text-sm font-medium mb-1">Labs</div>
            <div className="text-3xl font-bold text-white">3 / 39</div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 p-6 rounded-xl flex flex-col justify-center">
            <div className="text-zinc-500 text-sm font-medium mb-1">Assignments</div>
            <div className="text-3xl font-bold text-white">1 / 12</div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Course Modules</h2>
          
          <div className="space-y-3">
            {cModules.map((mod) => {
              const isExpanded = expandedModule === mod.slug;
              
              const statusColors = {
                "Completed": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
                "In Progress": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
                "Not Started": "text-zinc-500 bg-zinc-800/30 border-zinc-700/50"
              };

              return (
                <div 
                  key={mod.slug} 
                  className={`border rounded-xl transition-colors duration-200 overflow-hidden ${isExpanded ? 'bg-zinc-900/80 border-zinc-700' : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'}`}
                >
                  <div 
                    className="p-6 cursor-pointer flex items-center justify-between"
                    onClick={() => toggleModule(mod.slug)}
                  >
                    <div className="flex items-center space-x-6">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-zinc-800/50 text-xl font-bold text-zinc-400 border border-zinc-700/50 shrink-0">
                        {mod.number}
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="text-lg font-bold text-white">{mod.title}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${statusColors[mod.status as keyof typeof statusColors]}`}>
                            {mod.status}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-400">{mod.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-8">
                      <div className="hidden md:flex items-center space-x-6 text-sm text-zinc-500">
                        <div className="flex items-center space-x-1.5"><BookOpen className="w-4 h-4"/> <span>{mod.conceptsCount}</span></div>
                        <div className="flex items-center space-x-1.5"><Terminal className="w-4 h-4"/> <span>{mod.labsCount}</span></div>
                        <div className="flex items-center space-x-1.5"><Flag className="w-4 h-4"/> <span>{mod.assignmentsCount}</span></div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-zinc-800/50 grid grid-cols-1 md:grid-cols-3 gap-4">
                          
                          {/* Learn */}
                          <Link href={`/dashboard/practice/c/${mod.slug}`} className="block group">
                            <div className="h-full bg-zinc-950 rounded-lg p-5 border border-zinc-800/50 group-hover:border-cyan-500/50 transition-colors">
                              <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center mb-3">
                                <BookOpen className="w-4 h-4 text-cyan-400" />
                              </div>
                              <h4 className="font-bold text-white mb-1">LEARN</h4>
                              <p className="text-xs text-zinc-400 mb-4">Study {mod.conceptsCount} concepts</p>
                              <div className="text-sm text-cyan-400 group-hover:text-cyan-300 flex items-center">
                                View Concepts →
                              </div>
                            </div>
                          </Link>

                          {/* Practice Labs */}
                          <Link href={`/dashboard/practice/c/${mod.slug}#labs`} className="block group">
                            <div className="h-full bg-zinc-950 rounded-lg p-5 border border-zinc-800/50 group-hover:border-purple-500/50 transition-colors">
                              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center mb-3">
                                <Terminal className="w-4 h-4 text-purple-400" />
                              </div>
                              <h4 className="font-bold text-white mb-1">PRACTICE LABS</h4>
                              <p className="text-xs text-zinc-400 mb-4">Complete {mod.labsCount} interactive labs</p>
                              <div className="text-sm text-purple-400 group-hover:text-purple-300 flex items-center">
                                Start Labs →
                              </div>
                            </div>
                          </Link>

                          {/* Module Checkpoint */}
                          <Link href={`/dashboard/practice/c/${mod.slug}/assignment`} className="block group">
                            <div className="h-full bg-zinc-950 rounded-lg p-5 border border-zinc-800/50 group-hover:border-amber-500/50 transition-colors relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl -mr-10 -mt-10 group-hover:bg-amber-500/10 transition-colors" />
                              <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center mb-3 relative z-10">
                                <Flag className="w-4 h-4 text-amber-400" />
                              </div>
                              <h4 className="font-bold text-white mb-1 relative z-10">MODULE CHECKPOINT</h4>
                              <p className="text-xs text-zinc-400 mb-4 relative z-10">1 Mastery Assignment</p>
                              <div className="text-sm text-amber-400 group-hover:text-amber-300 flex items-center relative z-10">
                                Take Assignment →
                              </div>
                            </div>
                          </Link>
                          
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
